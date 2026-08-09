import { NextResponse } from "next/server";
import {
  getHubSpotPortalId,
  getPlacementReportFormGuid,
  getGatedDocumentFormGuid,
} from "@/data/hubspot";
import {
  PLACEMENT_REPORT_ACCESS_COOKIE,
  getPlacementReportEdition,
} from "@/data/placementReportAccess";
import { getGatedDocumentById } from "@/data/gatedDocuments";
import { buildHubSpotSubmissionContext, resolveHubSpotPageUri } from "@/lib/hubspot/context";
import { submitToHubSpot, type HubSpotSubmissionField } from "@/lib/hubspot/submit";
import {
  forwardWebsiteLeadToCrm,
  getCrmSessionIdFromRequest,
  type TargetResult,
} from "@/lib/crm/website-lead";
import {
  getSubmitTargets,
  shouldSubmitToCrm,
  shouldSubmitToHubSpot,
} from "@/lib/leads/submit-targets";
import { parseLeadFields } from "@/lib/tracking/parse-lead-fields";

const HUBSPOT_UTK_COOKIE = /(?:^|;\s*)hubspotutk=([^;]*)/;

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

function getHubspotUtkFromRequest(request: Request, bodyHutk?: string): string | undefined {
  if (bodyHutk?.trim()) return bodyHutk.trim();
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(HUBSPOT_UTK_COOKIE);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

type SubmitBody = {
  edition?: string;
  document?: string;
  fields?: HubSpotSubmissionField[];
  pageUri?: string;
  pageName?: string;
  hutk?: string;
  session_id?: string;
};

function skipped(reason: string): TargetResult {
  return { ok: false, error: reason };
}

export async function POST(request: Request) {
  let body: SubmitBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const edition = body.edition ? getPlacementReportEdition(body.edition) : undefined;
  const gatedDocument = body.document ? getGatedDocumentById(body.document) : undefined;

  if (!edition && !gatedDocument) {
    return NextResponse.json(
      { error: "A valid report edition or document is required" },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.fields) || body.fields.length === 0) {
    return NextResponse.json({ error: "Form fields are required" }, { status: 400 });
  }

  const targets = getSubmitTargets();
  const wantCrm = shouldSubmitToCrm(targets);
  const wantHubSpot = shouldSubmitToHubSpot(targets);
  const portalId = getHubSpotPortalId();
  const formGuid = edition ? getPlacementReportFormGuid() : getGatedDocumentFormGuid();

  let hubspot: TargetResult = skipped(
    wantHubSpot ? "HubSpot not attempted" : "Skipped by SUBMIT_TARGETS",
  );
  let crm: TargetResult = skipped(
    wantCrm ? "CRM not attempted" : "Skipped by SUBMIT_TARGETS",
  );

  if (wantHubSpot) {
    if (!portalId || !formGuid) {
      hubspot = { ok: false, status: 503, error: "Download form is not configured" };
    } else {
      try {
        await submitToHubSpot({
          portalId,
          formGuid,
          fields: body.fields,
          context: buildHubSpotSubmissionContext({
            pageUri: body.pageUri,
            pageName: body.pageName,
            hutk: getHubspotUtkFromRequest(request, body.hutk),
            ipAddress: getClientIp(request),
          }),
        });
        hubspot = { ok: true, status: 200 };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "HubSpot submission failed";
        console.error("HubSpot submission failed:", error);
        hubspot = { ok: false, status: 502, error: message };
      }
    }
  }

  if (wantCrm) {
    const lead = parseLeadFields(body.fields);
    const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
    if (!name || !lead.phone) {
      crm = { ok: false, error: "Name and phone are required for CRM submission" };
    } else {
      crm = await forwardWebsiteLeadToCrm({
        name,
        phone: lead.phone,
        email: lead.email ?? null,
        course_id: null,
        source: edition
          ? `website:placement-report:${edition.id}`
          : `website:document:${gatedDocument!.id}`,
        linkedin: null,
        session_id:
          body.session_id?.trim() || getCrmSessionIdFromRequest(request) || null,
      });
    }
  }

  // Downloads should still succeed for the user even if one CRM/HubSpot side fails.
  const downloadUrl = edition
    ? `/api/placement-report/download?edition=${encodeURIComponent(edition.id)}`
    : gatedDocument!.pdfHref;

  const response = NextResponse.json({
    ok: true,
    downloadUrl,
    editionId: edition?.id,
    documentId: gatedDocument?.id,
    pageUri: resolveHubSpotPageUri(body.pageUri) ?? body.pageUri,
    targets,
    crm,
    hubspot,
  });

  if (edition) {
    response.cookies.set(PLACEMENT_REPORT_ACCESS_COOKIE, edition.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });
  }

  return response;
}

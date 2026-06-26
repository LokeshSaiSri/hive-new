import { NextResponse } from "next/server";
import { getHubSpotPortalId, getPlacementReportFormGuid } from "@/data/hubspot";
import {
  PLACEMENT_REPORT_ACCESS_COOKIE,
  getPlacementReportEdition,
} from "@/data/placementReportAccess";
import { getGatedDocumentById } from "@/data/gatedDocuments";
import { buildHubSpotSubmissionContext, resolveHubSpotPageUri } from "@/lib/hubspot/context";
import { submitToHubSpot, type HubSpotSubmissionField } from "@/lib/hubspot/submit";

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
  /** Alternative to `edition` — a gated handbook/brochure document id. */
  document?: string;
  fields?: HubSpotSubmissionField[];
  pageUri?: string;
  pageName?: string;
  hutk?: string;
};

export async function POST(request: Request) {
  let body: SubmitBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Resolve the download target — either a gated placement edition (served via
  // the cookie-gated download route) or a public handbook/brochure document.
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

  const portalId = getHubSpotPortalId();
  const formGuid = getPlacementReportFormGuid();

  if (!portalId || !formGuid) {
    return NextResponse.json(
      { error: "Download form is not configured" },
      { status: 503 },
    );
  }

  try {
    const hubspotContext = buildHubSpotSubmissionContext({
      pageUri: body.pageUri,
      pageName: body.pageName,
      hutk: getHubspotUtkFromRequest(request, body.hutk),
      ipAddress: getClientIp(request),
    });

    await submitToHubSpot({
      portalId,
      formGuid,
      fields: body.fields,
      context: hubspotContext,
    });

    const downloadUrl = edition
      ? `/api/placement-report/download?edition=${encodeURIComponent(edition.id)}`
      : gatedDocument!.pdfHref;

    const response = NextResponse.json({
      ok: true,
      downloadUrl,
      editionId: edition?.id,
      documentId: gatedDocument?.id,
      pageUri: resolveHubSpotPageUri(body.pageUri) ?? body.pageUri,
    });

    // Only placement-report PDFs are middleware-gated, so set the access cookie
    // for them. Handbook/brochure PDFs are public and download directly.
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
  } catch (error) {
    console.error("Download form submission failed:", error);
    return NextResponse.json({ error: "Could not submit form" }, { status: 502 });
  }
}

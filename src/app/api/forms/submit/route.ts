import { NextResponse } from "next/server";
import { getHubSpotFormGuid, getHubSpotPortalId } from "@/data/hubspot";
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
import { trackLeadConversion } from "@/lib/tracking/server-events";
import type { LeadTrackingContext } from "@/lib/tracking/types";
import type { ProgramSlug } from "@/data/programPages/types";
import { buildThankYouUrl } from "@/data/formThankYou";
import { parseLeadFields } from "@/lib/tracking/parse-lead-fields";
import { HUBSPOT_CONTACT_FIELDS } from "@/data/hubspot";

const PROGRAM_SLUGS = new Set<ProgramSlug>([
  "pgp",
  "ai-marketing",
  "ug",
  "fellowship-gtm-revenue-ai",
]);
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
  course?: string;
  fields?: HubSpotSubmissionField[];
  pageUri?: string;
  pageName?: string;
  hutk?: string;
  session_id?: string;
  tracking?: LeadTrackingContext;
};

function skipped(reason: string): TargetResult {
  return { ok: false, error: reason };
}

/** Legacy HubSpot route — dual-writes with CRM under SUBMIT_TARGETS. Prefer /api/admissions. */
export async function POST(request: Request) {
  let body: SubmitBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const course = body.course;
  if (!course || !PROGRAM_SLUGS.has(course as ProgramSlug)) {
    return NextResponse.json({ error: "A valid course is required" }, { status: 400 });
  }

  if (!Array.isArray(body.fields) || body.fields.length === 0) {
    return NextResponse.json({ error: "Form fields are required" }, { status: 400 });
  }

  const targets = getSubmitTargets();
  const wantCrm = shouldSubmitToCrm(targets);
  const wantHubSpot = shouldSubmitToHubSpot(targets);
  const courseSlug = course as ProgramSlug;
  const lead = parseLeadFields(body.fields);
  const fieldMap = new Map(body.fields.map((field) => [field.name, field.value.trim()]));
  const sessionId =
    body.session_id?.trim() || getCrmSessionIdFromRequest(request) || null;
  const trackingPageUri = resolveHubSpotPageUri(body.pageUri) ?? body.pageUri;
  const eventId = body.tracking?.eventId ?? crypto.randomUUID();

  let hubspot: TargetResult = skipped(
    wantHubSpot ? "HubSpot not attempted" : "Skipped by SUBMIT_TARGETS",
  );
  let crm: TargetResult = skipped(
    wantCrm ? "CRM not attempted" : "Skipped by SUBMIT_TARGETS",
  );
  let hubspotRedirectUri: string | undefined;

  if (wantHubSpot) {
    const portalId = getHubSpotPortalId();
    const formGuid = getHubSpotFormGuid(courseSlug);
    if (!portalId || !formGuid) {
      hubspot = {
        ok: false,
        status: 503,
        error: "HubSpot form is not configured for this programme",
      };
    } else {
      try {
        const hubspotResult = await submitToHubSpot({
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
        hubspotRedirectUri = hubspotResult.redirectUri;
        hubspot = { ok: true, status: 200 };

        try {
          await trackLeadConversion({
            course: courseSlug,
            fields: body.fields,
            tracking: { ...body.tracking, eventId },
            pageUri: trackingPageUri,
            pageName: body.pageName,
            ipAddress: getClientIp(request),
          });
        } catch (error) {
          console.error("Lead conversion tracking failed in API route:", error);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "HubSpot submission failed";
        console.error("HubSpot form submission failed:", error);
        hubspot = { ok: false, status: 502, error: message };
      }
    }
  }

  if (wantCrm) {
    const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
    if (!name || !lead.phone) {
      crm = { ok: false, error: "Name and phone are required for CRM submission" };
    } else {
      crm = await forwardWebsiteLeadToCrm({
        name,
        phone: lead.phone,
        email: lead.email ?? null,
        course_id: null,
        source: lead.programme ? `website:${lead.programme}` : `website:${courseSlug}`,
        linkedin: fieldMap.get(HUBSPOT_CONTACT_FIELDS.linkedin) || null,
        session_id: sessionId,
      });
    }
  }

  const anyOk =
    (wantHubSpot && hubspot.ok) ||
    (wantCrm && crm.ok) ||
    (!wantHubSpot && !wantCrm);

  const thankYouUrl = buildThankYouUrl(courseSlug, eventId, hubspotRedirectUri);

  return NextResponse.json(
    {
      ok: anyOk,
      thankYouUrl,
      eventId,
      targets,
      crm,
      hubspot,
      ...(anyOk ? {} : { error: "Could not submit application" }),
    },
    { status: anyOk ? 200 : 502 },
  );
}

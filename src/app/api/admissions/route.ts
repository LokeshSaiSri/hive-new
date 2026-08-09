import { NextResponse } from "next/server";
import { getHubSpotFormGuid, getHubSpotPortalId } from "@/data/hubspot";
import { buildThankYouUrl } from "@/data/formThankYou";
import type { ProgramSlug } from "@/data/programPages/types";
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
import { trackLeadConversion } from "@/lib/tracking/server-events";
import type { LeadTrackingContext } from "@/lib/tracking/types";
import { HUBSPOT_CONTACT_FIELDS } from "@/data/hubspot";

const PROGRAM_SLUGS = new Set<ProgramSlug>([
  "pgp",
  "ai-marketing",
  "ug",
  "fellowship-gtm-revenue-ai",
]);
const HUBSPOT_UTK_COOKIE = /(?:^|;\s*)hubspotutk=([^;]*)/;

type AdmissionsBody = {
  name?: string;
  phone?: string;
  email?: string | null;
  course?: string;
  course_id?: string | null;
  cohort_id?: string | null;
  source?: string | null;
  linkedin?: string | null;
  years_experience?: number | string | null;
  preferred_industry?: string | null;
  intent_score?: number | null;
  session_id?: string | null;
  fields?: HubSpotSubmissionField[];
  pageUri?: string;
  pageName?: string;
  hutk?: string;
  tracking?: LeadTrackingContext;
};

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

function skipped(reason: string): TargetResult {
  return { ok: false, error: reason };
}

export async function POST(request: Request) {
  let body: AdmissionsBody;

  try {
    body = (await request.json()) as AdmissionsBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const targets = getSubmitTargets();
  const wantCrm = shouldSubmitToCrm(targets);
  const wantHubSpot = shouldSubmitToHubSpot(targets);

  const fields = Array.isArray(body.fields) ? body.fields : [];
  const parsed = fields.length > 0 ? parseLeadFields(fields) : null;
  const fieldMap = new Map(fields.map((field) => [field.name, field.value.trim()]));

  const name =
    body.name?.trim() ||
    [parsed?.firstName, parsed?.lastName].filter(Boolean).join(" ").trim();
  const phone = body.phone?.trim() || parsed?.phone?.trim() || "";
  const email = body.email ?? parsed?.email ?? null;
  const linkedin =
    body.linkedin ?? fieldMap.get(HUBSPOT_CONTACT_FIELDS.linkedin) ?? null;

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const courseSlug =
    (body.course && PROGRAM_SLUGS.has(body.course as ProgramSlug)
      ? (body.course as ProgramSlug)
      : undefined) ??
    (body.course_id && PROGRAM_SLUGS.has(body.course_id as ProgramSlug)
      ? (body.course_id as ProgramSlug)
      : undefined);

  const sessionId =
    body.session_id?.trim() || getCrmSessionIdFromRequest(request) || null;
  const eventId = body.tracking?.eventId ?? crypto.randomUUID();
  const trackingPageUri = resolveHubSpotPageUri(body.pageUri) ?? body.pageUri;

  let hubspot: TargetResult = skipped(
    wantHubSpot ? "HubSpot not attempted" : "Skipped by SUBMIT_TARGETS",
  );
  let crm: TargetResult = skipped(
    wantCrm ? "CRM not attempted" : "Skipped by SUBMIT_TARGETS",
  );
  let hubspotRedirectUri: string | undefined;

  if (wantHubSpot) {
    if (!courseSlug) {
      hubspot = {
        ok: false,
        error: "A valid course is required for HubSpot submission",
      };
    } else if (!Array.isArray(body.fields) || body.fields.length === 0) {
      hubspot = { ok: false, error: "Form fields are required for HubSpot submission" };
    } else {
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
            console.error("Lead conversion tracking failed in admissions route:", error);
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "HubSpot submission failed";
          console.error("HubSpot form submission failed:", error);
          hubspot = { ok: false, status: 502, error: message };
        }
      }
    }
  }

  if (wantCrm) {
    const programmeLabel =
      parsed?.programme ||
      (courseSlug ? courseSlug : undefined) ||
      (typeof body.course_id === "string" && body.course_id.trim()
        ? body.course_id.trim()
        : undefined);

    crm = await forwardWebsiteLeadToCrm({
      name,
      phone,
      email,
      course_id: body.course_id ?? null,
      cohort_id: body.cohort_id ?? null,
      source: body.source?.trim() || (programmeLabel ? `website:${programmeLabel}` : "website"),
      linkedin,
      years_experience: body.years_experience ?? null,
      preferred_industry: body.preferred_industry ?? null,
      intent_score: body.intent_score ?? null,
      session_id: sessionId,
    });
  }

  const anyOk =
    (wantHubSpot && hubspot.ok) ||
    (wantCrm && crm.ok) ||
    (!wantHubSpot && !wantCrm);

  const thankYouUrl = courseSlug
    ? buildThankYouUrl(courseSlug, eventId, hubspotRedirectUri)
    : undefined;

  const status = anyOk ? 200 : 502;
  return NextResponse.json(
    {
      ok: anyOk,
      eventId,
      thankYouUrl,
      targets,
      crm,
      hubspot,
      ...(anyOk ? {} : { error: "Could not submit application to any configured target" }),
    },
    { status },
  );
}

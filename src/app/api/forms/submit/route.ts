import { NextResponse } from "next/server";
import { getHubSpotFormGuid, getHubSpotPortalId } from "@/data/hubspot";
import { buildHubSpotSubmissionContext, resolveHubSpotPageUri } from "@/lib/hubspot/context";
import { submitToHubSpot, type HubSpotSubmissionField } from "@/lib/hubspot/submit";
import { trackLeadConversion } from "@/lib/tracking/server-events";
import type { LeadTrackingContext } from "@/lib/tracking/types";
import type { ProgramSlug } from "@/data/programPages/types";
import { buildThankYouUrl } from "@/data/formThankYou";

const PROGRAM_SLUGS = new Set<ProgramSlug>(["pgp", "ai-marketing", "ug"]);
const HUBSPOT_UTK_COOKIE = /(?:^|;\s*)hubspotutk=([^;]*)/;

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
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
  tracking?: LeadTrackingContext;
};

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

  const portalId = getHubSpotPortalId();
  const formGuid = getHubSpotFormGuid(course as ProgramSlug);

  if (!portalId || !formGuid) {
    return NextResponse.json(
      { error: "HubSpot form is not configured for this programme" },
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

    const hubspotResult = await submitToHubSpot({
      portalId,
      formGuid,
      fields: body.fields,
      context: hubspotContext,
    });

    const trackingPageUri = resolveHubSpotPageUri(body.pageUri) ?? body.pageUri;
    const eventId = body.tracking?.eventId ?? crypto.randomUUID();

    try {
      await trackLeadConversion({
        course: course as ProgramSlug,
        fields: body.fields,
        tracking: { ...body.tracking, eventId },
        pageUri: trackingPageUri,
        pageName: body.pageName,
        ipAddress: getClientIp(request),
      });
    } catch (error) {
      console.error("Lead conversion tracking failed in API route:", error);
    }

    const thankYouUrl = buildThankYouUrl(
      course as ProgramSlug,
      eventId,
      hubspotResult.redirectUri,
    );

    return NextResponse.json({ ok: true, thankYouUrl, eventId });
  } catch (error) {
    console.error("HubSpot form submission failed:", error);
    return NextResponse.json({ error: "Could not submit application" }, { status: 502 });
  }
}

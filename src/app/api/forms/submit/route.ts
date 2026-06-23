import { NextResponse } from "next/server";
import { getHubSpotFormGuid, getHubSpotPortalId } from "@/data/hubspot";
import { submitToHubSpot, type HubSpotSubmissionField } from "@/lib/hubspot/submit";
import type { ProgramSlug } from "@/data/programPages/types";

const PROGRAM_SLUGS = new Set<ProgramSlug>(["pgp", "ai-marketing", "ug"]);

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

type SubmitBody = {
  course?: string;
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
    await submitToHubSpot({
      portalId,
      formGuid,
      fields: body.fields,
      context: {
        pageUri: body.pageUri,
        pageName: body.pageName,
        hutk: body.hutk,
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("HubSpot form submission failed:", error);
    return NextResponse.json({ error: "Could not submit application" }, { status: 502 });
  }
}

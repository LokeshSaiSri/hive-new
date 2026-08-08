import { NextResponse } from "next/server";

type AdmissionsBody = {
  name?: string;
  phone?: string;
  email?: string | null;
  course_id?: string | null;
  cohort_id?: string | null;
  source?: string | null;
  linkedin?: string | null;
  years_experience?: number | string | null;
  preferred_industry?: string | null;
  intent_score?: number | null;
  session_id?: string | null;
};

function getSessionIdFromCookie(request: Request): string | undefined {
  const cookie = request.headers.get("cookie");
  const match = cookie?.match(/(?:^|;\s*)hs_session_id=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export async function POST(request: Request) {
  let body: AdmissionsBody;

  try {
    body = (await request.json()) as AdmissionsBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const crmBase = process.env.CRM_BASE_URL?.replace(/\/+$/, "");
  if (!crmBase) {
    return NextResponse.json({ error: "CRM is not configured" }, { status: 503 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.CRM_TRACK_API_KEY) {
    headers.Authorization = `Bearer ${process.env.CRM_TRACK_API_KEY}`;
  }

  try {
    const response = await fetch(`${crmBase}/api/leads/website`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name,
        phone,
        email: body.email ?? null,
        course_id: body.course_id ?? null,
        cohort_id: body.cohort_id ?? null,
        source: body.source ?? "website",
        linkedin: body.linkedin ?? null,
        years_experience: body.years_experience ?? null,
        preferred_industry: body.preferred_industry ?? null,
        intent_score: body.intent_score ?? null,
        session_id: body.session_id || getSessionIdFromCookie(request) || null,
      }),
      cache: "no-store",
    });

    const text = await response.text();
    let result: unknown;
    try {
      result = text ? JSON.parse(text) : { ok: response.ok };
    } catch {
      result = { ok: response.ok, detail: text };
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("CRM admissions proxy failed:", error);
    return NextResponse.json({ error: "Could not reach CRM" }, { status: 502 });
  }
}

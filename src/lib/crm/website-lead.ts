export type WebsiteLeadPayload = {
  name: string;
  phone: string;
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

export type TargetResult = {
  ok: boolean;
  status?: number;
  id?: string;
  error?: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** CRM course_id is a UUID; website programme slugs must not be sent as course_id. */
export function asCrmCourseId(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return UUID_RE.test(trimmed) ? trimmed : null;
}

export function getCrmSessionIdFromRequest(request: Request): string | undefined {
  const cookie = request.headers.get("cookie");
  const match = cookie?.match(/(?:^|;\s*)hs_session_id=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export async function forwardWebsiteLeadToCrm(
  payload: WebsiteLeadPayload,
): Promise<TargetResult> {
  const crmBase = process.env.CRM_BASE_URL?.replace(/\/+$/, "");
  const apiKey = process.env.CRM_TRACK_API_KEY;

  if (!crmBase) {
    console.error("CRM_BASE_URL is not configured");
    return { ok: false, error: "CRM_BASE_URL is not configured" };
  }
  if (!apiKey) {
    console.error("CRM_TRACK_API_KEY is not configured");
    return { ok: false, error: "CRM_TRACK_API_KEY is not configured" };
  }

  try {
    const response = await fetch(`${crmBase}/api/leads/website`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email ?? null,
        course_id: asCrmCourseId(payload.course_id),
        cohort_id: asCrmCourseId(payload.cohort_id),
        source: payload.source ?? "website",
        linkedin: payload.linkedin ?? null,
        years_experience: payload.years_experience ?? null,
        preferred_industry: payload.preferred_industry ?? null,
        intent_score: payload.intent_score ?? null,
        session_id: payload.session_id ?? null,
      }),
      cache: "no-store",
    });

    const text = await response.text();
    let parsed: { id?: string; lead_id?: string; error?: string } | null = null;
    try {
      parsed = text ? (JSON.parse(text) as { id?: string; lead_id?: string; error?: string }) : null;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const error = parsed?.error || text || `CRM responded ${response.status}`;
      console.error("CRM lead submission failed:", error);
      return { ok: false, status: response.status, error };
    }

    return {
      ok: true,
      status: response.status,
      id: parsed?.id ?? parsed?.lead_id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not reach CRM";
    console.error("CRM lead submission failed:", error);
    return { ok: false, error: message };
  }
}

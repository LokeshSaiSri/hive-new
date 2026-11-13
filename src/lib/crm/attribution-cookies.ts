/**
 * First-touch attribution, website side.
 *
 * hs_ft: set by src/proxy.ts on a browser's first page view and never
 * overwritten. Holds where that first visit came from (UTMs, referring site,
 * landing page, time). Sent with every form so the CRM knows how the person
 * first found us, even if later visits came through an ad.
 *
 * _ga / _ga_<stream>: Google Analytics' own cookies. Their ids go to the CRM
 * with the form, so the CRM can report the lead's stages (R1, offer,
 * admission) back into GA4 / Looker Studio for the same visitor.
 */

export const FIRST_TOUCH_COOKIE = "hs_ft";
const GA_STREAM = "4V5EQ77YLK";

type CookieReader = { get(name: string): { value: string } | undefined };

const clip = (v: string | null | undefined, max = 120) => {
  const s = (v ?? "").trim();
  return s ? s.slice(0, max) : undefined;
};

const OWN_HOSTS = ["hiveschool.co", "hiveschool.in"];

function referrerHost(referer: string | null, pageHost: string): string | undefined {
  if (!referer) return undefined;
  try {
    const u = new URL(referer);
    // Android apps send android-app://com.linkedin.android/
    const host = (u.hostname || u.pathname.replace(/^\/+/, "").split("/")[0] || "").toLowerCase().replace(/^www\./, "");
    if (!host || host === pageHost || OWN_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return undefined;
    return host.slice(0, 120);
  } catch {
    return undefined;
  }
}

/** The first-visit record for this request (the proxy only stores it when the browser has none) */
export function buildFirstTouch(url: URL, referer: string | null, seenBefore: boolean): string {
  const q = url.searchParams;
  const ck = q.get("gclid")
    ? "gclid"
    : q.get("fbclid")
      ? "fbclid"
      : q.get("li_fat_id")
        ? "li_fat_id"
        : q.get("ttclid")
          ? "ttclid"
          : undefined;
  const ft = {
    s: clip(q.get("utm_source")),
    m: clip(q.get("utm_medium")),
    c: clip(q.get("utm_campaign")),
    ct: clip(q.get("utm_content")),
    t: clip(q.get("utm_term")),
    r: referrerHost(referer, url.hostname.toLowerCase().replace(/^www\./, "")),
    l: clip(url.pathname, 200),
    at: new Date().toISOString(),
    ck,
    // The browser was here before this cookie existed: this may not be its first visit
    pre: seenBefore ? 1 : undefined,
  };
  return JSON.stringify(ft);
}

function readCookie(header: string | null, name: string): string | undefined {
  const m = header?.match(new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`));
  if (!m?.[1]) return undefined;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
}

/** "GA1.1.123456789.1712345678" → "123456789.1712345678" */
export function gaClientIdFrom(value: string | undefined): string | undefined {
  const m = value?.match(/^GA\d\.\d+\.(\d+\.\d+)$/);
  return m?.[1];
}

/** "GS1.1.1712345678.5.1…" or "GS2.1.s1712345678$o5…" → "1712345678" */
export function gaSessionIdFrom(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const v2 = value.match(/^GS2\.\d+\.s(\d+)/);
  if (v2) return v2[1];
  const v1 = value.match(/^GS1\.\d+\.(\d+)\./);
  return v1?.[1];
}

/** What a form route sends to the CRM for attribution */
export function getAttributionFromRequest(request: Request): {
  ga_client_id: string | null;
  ga_session_id: string | null;
  first_touch: string | null;
} {
  const header = request.headers.get("cookie");
  return {
    ga_client_id: gaClientIdFrom(readCookie(header, "_ga")) ?? null,
    ga_session_id: gaSessionIdFrom(readCookie(header, `_ga_${GA_STREAM}`)) ?? null,
    first_touch: readCookie(header, FIRST_TOUCH_COOKIE)?.slice(0, 1500) ?? null,
  };
}

export function hasCookie(cookies: CookieReader, name: string) {
  return !!cookies.get(name)?.value;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GATED_PLACEMENT_REPORT_PATHS,
  PLACEMENT_REPORT_ACCESS_COOKIE,
} from "@/data/placementReportAccess";
import { verifyAdminToken } from "@/lib/admin/auth";
import { FIRST_TOUCH_COOKIE, buildFirstTouch } from "@/lib/crm/attribution-cookies";

const ADMIN_SLUG = "hive-control-hub";
const UNLOCK_COOKIE = "hive_admin_unlock";

const VISITOR_COOKIE = "hs_session_id"; // read by /hive-track.js and the form routes
const VISITOR_REFRESHED = "hs_vr";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const YEAR = 365 * 24 * 60 * 60;

/**
 * Keep the browser id (hs_session_id) as a server-set cookie. Safari caps
 * cookies written by JavaScript at 7 days (24h after an ad click), so leads
 * coming back later looked like strangers in the CRM. Refreshed at most once
 * a day per browser; the value never changes once set.
 */
function keepVisitorCookie(request: NextRequest, response: NextResponse) {
  if (request.cookies.get(VISITOR_REFRESHED)?.value === "1") return response;
  const current = request.cookies.get(VISITOR_COOKIE)?.value;
  const id = current && UUID_RE.test(current) ? current : crypto.randomUUID();
  const secure = request.nextUrl.protocol === "https:";
  response.cookies.set(VISITOR_COOKIE, id, { path: "/", maxAge: YEAR, sameSite: "lax", secure, httpOnly: false });
  response.cookies.set(VISITOR_REFRESHED, "1", { path: "/", maxAge: 24 * 60 * 60, sameSite: "lax", secure, httpOnly: true });
  return response;
}

/**
 * First-touch attribution: on a browser's first page view, remember where that
 * visit came from (hs_ft, 1 year, never overwritten). Forms send it to the CRM.
 * Set here, not in JavaScript, so Safari keeps it, and from the document
 * request so the referrer is the real outside site.
 */
function keepFirstTouchCookie(request: NextRequest, response: NextResponse) {
  if (request.cookies.get(FIRST_TOUCH_COOKIE)?.value) return response;
  // Client-side navigations and prefetches aren't a new arrival
  if (request.headers.get("rsc") || request.headers.get("next-router-prefetch") || request.headers.get("purpose") === "prefetch") {
    return response;
  }
  const seenBefore = !!request.cookies.get(VISITOR_COOKIE)?.value;
  const value = buildFirstTouch(request.nextUrl, request.headers.get("referer"), seenBefore);
  response.cookies.set(FIRST_TOUCH_COOKIE, value, {
    path: "/",
    maxAge: YEAR,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    httpOnly: true,
  });
  return response;
}

export function proxy(request: NextRequest) {
  const response = route(request);
  // Pages only (not admin, redirects or 404s)
  if (response.status === 200 && !request.nextUrl.pathname.startsWith(`/${ADMIN_SLUG}`)) {
    return keepVisitorCookie(request, keepFirstTouchCookie(request, response));
  }
  return response;
}

function route(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ── Admin route protection ───────────────────────────────────────────────
  // Unauthenticated visitors get a 404 — the portal is invisible.
  // Login only opens after the keyboard shortcut unlocks a short-lived cookie
  // (Ctrl/Cmd + Shift + H on the public site).
  if (pathname.startsWith(`/${ADMIN_SLUG}`)) {
    const hideAdmin = () =>
      NextResponse.rewrite(new URL("/__admin-hidden-404", request.url), { status: 404 });

    const token = request.cookies.get("hive_admin_token")?.value;
    const isAuthed = !!token && verifyAdminToken(token) !== null;
    const unlocked = request.cookies.get(UNLOCK_COOKIE)?.value === "1";

    if (pathname === `/${ADMIN_SLUG}/login`) {
      // Login is only reachable after the keyboard unlock cookie is set.
      // Do not auto-redirect to the dashboard here — unlock clears the session
      // so the password form is always shown.
      if (!unlocked) {
        return hideAdmin();
      }
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }

    if (!isAuthed) {
      return hideAdmin();
    }

    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  // ── Placement report gate ─────────────────────────────────────────────────
  const editionId = GATED_PLACEMENT_REPORT_PATHS[pathname];

  if (!editionId) {
    return NextResponse.next();
  }

  const grantedEdition = request.cookies.get(PLACEMENT_REPORT_ACCESS_COOKIE)?.value;
  if (grantedEdition === editionId) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/download-placement-form";
  redirectUrl.searchParams.set("edition", editionId);
  redirectUrl.searchParams.set("file", pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/hive-control-hub/:path*",
    "/HiveSchool Placement Report 2025-26.pdf",
    "/HIVESCHOOL-Brochure-Digital.pdf",
    // Every page (not API, Next assets or files) — for the browser id cookie
    "/((?!api/|_next/|_vercel/|.*\\..*).*)",
  ],
};

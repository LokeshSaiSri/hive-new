import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GATED_PLACEMENT_REPORT_PATHS,
  PLACEMENT_REPORT_ACCESS_COOKIE,
} from "@/data/placementReportAccess";
import { verifyAdminToken } from "@/lib/admin/auth";

const ADMIN_SLUG = "hive-control-hub";
const UNLOCK_COOKIE = "hive_admin_unlock";

export function proxy(request: NextRequest) {
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
      if (isAuthed) {
        return NextResponse.redirect(new URL(`/${ADMIN_SLUG}`, request.url));
      }
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
  ],
};

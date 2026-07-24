import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GATED_PLACEMENT_REPORT_PATHS,
  PLACEMENT_REPORT_ACCESS_COOKIE,
  placementReportDownloadPath,
} from "@/data/placementReportAccess";
import { verifyAdminToken } from "@/lib/admin/auth";

const ADMIN_SLUG = "hive-control-hub";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin route protection ───────────────────────────────────────────────
  if (pathname.startsWith(`/${ADMIN_SLUG}`)) {
    // Login page is always accessible
    if (pathname === `/${ADMIN_SLUG}/login`) {
      return NextResponse.next();
    }

    // Verify JWT cookie
    const token = request.cookies.get("hive_admin_token")?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.redirect(new URL(`/${ADMIN_SLUG}/login`, request.url));
    }

    // Authenticated — add noindex header so crawlers skip admin
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

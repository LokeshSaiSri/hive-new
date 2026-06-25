import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GATED_PLACEMENT_REPORT_PATHS,
  PLACEMENT_REPORT_ACCESS_COOKIE,
  placementReportDownloadPath,
} from "@/data/placementReportAccess";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
    "/HiveSchool Placement Report 2025-26.pdf",
    "/HIVESCHOOL-Brochure-Digital.pdf",
  ],
};

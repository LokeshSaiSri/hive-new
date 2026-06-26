import { NextResponse } from "next/server";
import { PLACEMENT_REPORT_ACCESS_COOKIE } from "@/data/placementReportAccess";
import { getPlacementReportEdition } from "@/data/placementReportAccess";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const editionId = searchParams.get("edition");

  if (!editionId) {
    return NextResponse.json({ error: "Edition is required" }, { status: 400 });
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${PLACEMENT_REPORT_ACCESS_COOKIE}=([^;]*)`),
  );
  const grantedEdition = match?.[1] ? decodeURIComponent(match[1]) : undefined;

  if (grantedEdition !== editionId) {
    return NextResponse.json({ error: "Complete the form to download this report" }, { status: 403 });
  }

  const edition = getPlacementReportEdition(editionId);
  if (!edition) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.redirect(new URL(edition.pdfHref, request.url));
}

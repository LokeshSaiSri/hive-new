import { NextResponse } from "next/server";
import { PLACEMENT_REPORT_ACCESS_COOKIE } from "@/data/placementReportAccess";
import { readPlacementReportFile } from "@/lib/placementReport/download";

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

  try {
    const file = await readPlacementReportFile(editionId);
    if (!file) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return new NextResponse(file.buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file.filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Placement report download failed:", error);
    return NextResponse.json({ error: "Could not load report" }, { status: 500 });
  }
}

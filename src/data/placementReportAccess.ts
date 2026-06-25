import type { PlacementReportEdition } from "@/data/placementReports";
import { placementReportEditions } from "@/data/placementReports";

export const PLACEMENT_REPORT_ACCESS_COOKIE = "placement_report_access";

/** Public paths blocked until the download form is submitted. */
export const GATED_PLACEMENT_REPORT_PATHS: Record<string, string> = {
  "/HiveSchool Placement Report 2025-26.pdf": "year-2",
  "/HIVESCHOOL-Brochure-Digital.pdf": "year-1",
};

export function placementReportDownloadPath(editionId: string): string {
  return `/download-placement-form?edition=${encodeURIComponent(editionId)}`;
}

export function getPlacementReportEdition(
  editionId: string | null | undefined,
): PlacementReportEdition | undefined {
  if (!editionId) return placementReportEditions[0];
  return placementReportEditions.find((edition) => edition.id === editionId);
}

export function getPlacementReportEditionForPath(pathname: string): string | undefined {
  return GATED_PLACEMENT_REPORT_PATHS[pathname];
}

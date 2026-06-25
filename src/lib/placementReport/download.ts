import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPlacementReportEdition } from "@/data/placementReportAccess";

export async function readPlacementReportFile(editionId: string) {
  const edition = getPlacementReportEdition(editionId);
  if (!edition) {
    return null;
  }

  const filePath = path.join(process.cwd(), "public", edition.pdfHref.replace(/^\//, ""));
  const buffer = await readFile(filePath);
  const filename = path.basename(edition.pdfHref);

  return { buffer, filename, edition };
}

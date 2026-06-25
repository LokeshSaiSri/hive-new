import { asset } from "@/lib/assets";
import { placementReportDownloadPath } from "@/data/placementReportAccess";

export type PlacementReportPage = { type: "image"; src: string; alt: string };

export type PlacementReportEdition = {
  id: string;
  edition: string;
  year: string;
  label: string;
  subtitle: string;
  avgCtc: string;
  highest: string;
  median?: string;
  jump?: string;
  coverImage: string;
  pdfHref: string;
  /** Gated download form — PDF is not linked directly in the UI. */
  downloadHref: string;
  pages: PlacementReportPage[];
};

const year2Pages: PlacementReportPage[] = Array.from({ length: 23 }, (_, index) => ({
  type: "image" as const,
  src: asset(
    `images/placement-reports/year-2/pages/page-${String(index + 1).padStart(2, "0")}.jpg`,
  ),
  alt: `Placement Report 2025–26 · page ${index + 1}`,
}));

const brochurePages: PlacementReportPage[] = Array.from({ length: 20 }, (_, index) => ({
  type: "image" as const,
  src: asset(
    `images/placement-reports/brochure/pages/page-${String(index + 1).padStart(2, "0")}.jpg`,
  ),
  alt: `HiveSchool Placement Handbook 2024–25 · page ${index + 1}`,
}));

/** Year 2 (2025–26) first, then 2024–25 handbook brochure. */
export const placementReportEditions: PlacementReportEdition[] = [
  {
    id: "year-2",
    edition: "Edition 02",
    year: "2025–26",
    label: "Year 2",
    subtitle: "PGP Cohort 1 · Residential",
    avgCtc: "₹16.47L",
    highest: "₹27.8L",
    median: "₹15L",
    jump: "+184%",
    coverImage: asset("images/placement-reports/year-2-pdf-cover.jpg"),
    pdfHref: "/HiveSchool Placement Report 2025-26.pdf",
    downloadHref: placementReportDownloadPath("year-2"),
    pages: year2Pages,
  },
  {
    id: "year-1",
    edition: "Edition 01",
    year: "2024–25",
    label: "Year 1",
    subtitle: "Annual placement handbook",
    avgCtc: "₹14.76L",
    highest: "₹30L",
    coverImage: asset("images/placement-reports/brochure-cover.jpg"),
    pdfHref: "/HIVESCHOOL-Brochure-Digital.pdf",
    downloadHref: placementReportDownloadPath("year-1"),
    pages: brochurePages,
  },
];

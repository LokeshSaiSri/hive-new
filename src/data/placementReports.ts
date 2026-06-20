import { asset } from "@/lib/assets";

export type PlacementReportPage =
  | { type: "image"; src: string; alt: string }
  | { type: "designed"; id: "year1-cover" | "year1-stats" | "year1-outcomes" | "year1-back" };

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
  pages: PlacementReportPage[];
};

const year2Pages: PlacementReportPage[] = Array.from({ length: 23 }, (_, index) => ({
  type: "image" as const,
  src: asset(
    `images/placement-reports/year-2/pages/page-${String(index + 1).padStart(2, "0")}.jpg`,
  ),
  alt: `Placement Report 2025–26 · page ${index + 1}`,
}));

export const placementReportEditions: PlacementReportEdition[] = [
  {
    id: "year-1",
    edition: "Edition 01",
    year: "2024–25",
    label: "Year 1",
    subtitle: "Inaugural online cohort",
    avgCtc: "₹14.76L",
    highest: "₹30L",
    coverImage: asset("images/placement-reports/year-1-cover.jpg"),
    pdfHref: "/pgp/placements",
    pages: [
      { type: "designed", id: "year1-cover" },
      { type: "designed", id: "year1-stats" },
      { type: "designed", id: "year1-outcomes" },
      { type: "designed", id: "year1-back" },
    ],
  },
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
    pages: year2Pages,
  },
];

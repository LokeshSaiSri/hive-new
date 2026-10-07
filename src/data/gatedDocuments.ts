import { cdnAsset } from "@/lib/assets";

export type GatedDocument = {
  id: string;
  /** Site path used to intercept the download click and open the gate. */
  pdfHref: string;
  /** Actual file URL after the form is submitted. Defaults to pdfHref. */
  fileHref?: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Value sent to HubSpot's "programme of interest" field. */
  hubspotLabel: string;
  coverImage?: string;
};

/**
 * Direct PDF downloads that are gated behind the lead-capture form popup.
 * These reuse the same HubSpot form as the placement report.
 */
export const gatedDocuments: GatedDocument[] = [
  {
    id: "pgp-handbook",
    pdfHref: "/PGP-Offline-Brochure.pdf",
    eyebrow: "PGP Handbook",
    title: "Get the PGP handbook",
    description: "Share your details and we'll start the download immediately.",
    hubspotLabel: "Handbook — PGP 4-Month Roadmap",
  },
  {
    id: "ai-marketing-brochure",
    pdfHref: "/AI-Marketing-Fellowship-Brochure.pdf",
    eyebrow: "Fellowship Brochure",
    title: "Get the fellowship brochure",
    description: "Share your details and we'll start the download immediately.",
    hubspotLabel: "Brochure — AI Marketing Fellowship",
  },
  {
    id: "ug-brochure",
    pdfHref: "/Hive-UG-Program-Brochure.pdf",
    eyebrow: "UG Brochure",
    title: "Get the undergraduate brochure",
    description: "Share your details and we'll start the download immediately.",
    hubspotLabel: "Brochure — Undergraduate Programme",
  },
  {
    id: "salespreneur-report",
    pdfHref: "/Interim-Placement-Report.pdf",
    fileHref: cdnAsset("docs/Interim-Placement-Report.pdf"),
    eyebrow: "Interim Placement Report",
    title: "Get the Interim placement report",
    description:
      "Share your details and we'll start the download — PGP Cohort Interim placements.",
    hubspotLabel: "Report — Interim Placement",
    coverImage: cdnAsset("images/misc/salespreneur-cohort.jpg"),
  },
];

export function getGatedDocumentById(id: string | null | undefined): GatedDocument | undefined {
  if (!id) return undefined;
  return gatedDocuments.find((doc) => doc.id === id);
}

export function getGatedDocumentByHref(pathname: string): GatedDocument | undefined {
  return gatedDocuments.find((doc) => doc.pdfHref === pathname);
}

export function getGatedDocumentFileHref(doc: GatedDocument): string {
  return doc.fileHref ?? doc.pdfHref;
}

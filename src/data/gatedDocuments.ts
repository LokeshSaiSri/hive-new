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
  /** Value sent to HubSpot (message field) as the requested document. */
  hubspotLabel: string;
  /**
   * Name used in the CRM lead source (website:document:<this>). The CRM reads the programme from
   * this text (e.g. "pgp"), so name the programme in it. Defaults to the document id.
   */
  crmSourceId?: string;
  coverImage?: string;
};

/**
 * The current interim placement report (PGP C2, Interim Update 1, October 2026).
 * Each edition gets its own file name on the CDN, so a new report never serves a stale cached copy.
 * Used by the top banner, the report strip and the download form.
 */
export const INTERIM_REPORT_FILE = cdnAsset("docs/Interim-Placement-Report-C2-Update-1-r2.pdf");

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
    fileHref: INTERIM_REPORT_FILE,
    eyebrow: "Interim Placement Report",
    title: "Get the Interim placement report",
    description:
      "Share your details and we'll start the download — PGP Cohort 2, Interim Update 1 (October 2026).",
    hubspotLabel: "Report — PGP Interim Placement",
    crmSourceId: "pgp-interim-report",
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

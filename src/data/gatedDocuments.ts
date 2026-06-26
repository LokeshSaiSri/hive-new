export type GatedDocument = {
  id: string;
  /** Public PDF path served from /public. */
  pdfHref: string;
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
    pdfHref: "/4-Month-Roadmap-Brand-x-Revenue.pdf",
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
];

export function getGatedDocumentById(id: string | null | undefined): GatedDocument | undefined {
  if (!id) return undefined;
  return gatedDocuments.find((doc) => doc.id === id);
}

export function getGatedDocumentByHref(pathname: string): GatedDocument | undefined {
  return gatedDocuments.find((doc) => doc.pdfHref === pathname);
}

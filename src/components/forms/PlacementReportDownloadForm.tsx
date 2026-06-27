"use client";

import { DownloadGateForm } from "@/components/forms/DownloadGateForm";
import type { PlacementReportEdition } from "@/data/placementReports";
import { mapPlacementReportFields } from "@/lib/hubspot/fields";
import { getHubspotUtk, triggerFileDownload } from "@/lib/downloadFile";

type PlacementReportDownloadFormProps = {
  edition: PlacementReportEdition;
  /** Tighter layout for the popup modal — hides the tall cover on mobile. */
  compact?: boolean;
};

export function PlacementReportDownloadForm({
  edition,
  compact = false,
}: PlacementReportDownloadFormProps) {
  const filename = edition.pdfHref.split("/").pop() ?? "placement-report.pdf";
  const gatedDownloadUrl = `/api/placement-report/download?edition=${encodeURIComponent(edition.id)}`;

  return (
    <DownloadGateForm
      compact={compact}
      eyebrow="Placement report"
      title="Get the full PDF"
      description="Share your details and we'll start the download immediately."
      submitLabel="Download placement report"
      cover={{
        image: edition.coverImage,
        alt: `${edition.label} placement report cover`,
        tag: edition.edition,
        caption: `${edition.label} · ${edition.year}`,
      }}
      onSubmit={async (form) => {
        const response = await fetch("/api/placement-report/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            edition: edition.id,
            fields: mapPlacementReportFields({
              ...form,
              editionLabel: `${edition.label} · ${edition.year}`,
            }),
            pageUri: window.location.href,
            pageName: document.title,
            hutk: getHubspotUtk(),
          }),
        });

        const data = (await response.json()) as { downloadUrl?: string; error?: string };
        if (!response.ok || !data.downloadUrl) {
          throw new Error(data.error ?? "Could not submit form. Please try again.");
        }

        // Trigger the file download in the background without awaiting it,
        // so the UI immediately advances to the 'Download started' success state.
        triggerFileDownload(data.downloadUrl, filename).catch(console.error);
      }}
      onDownloadAgain={() => triggerFileDownload(gatedDownloadUrl, filename)}
    />
  );
}

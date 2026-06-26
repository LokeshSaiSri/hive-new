"use client";

import { DownloadGateForm } from "@/components/forms/DownloadGateForm";
import type { GatedDocument } from "@/data/gatedDocuments";
import { mapDocumentDownloadFields } from "@/lib/hubspot/fields";
import { getHubspotUtk, triggerFileDownload } from "@/lib/downloadFile";

type DocumentDownloadFormProps = {
  document: GatedDocument;
  compact?: boolean;
};

export function DocumentDownloadForm({ document: doc, compact = false }: DocumentDownloadFormProps) {
  const filename = doc.pdfHref.split("/").pop() ?? "download.pdf";

  return (
    <DownloadGateForm
      compact={compact}
      eyebrow={doc.eyebrow}
      title={doc.title}
      description={doc.description}
      submitLabel="Download now"
      cover={
        doc.coverImage
          ? { image: doc.coverImage, alt: `${doc.eyebrow} cover`, tag: doc.eyebrow }
          : undefined
      }
      onSubmit={async (form) => {
        const response = await fetch("/api/placement-report/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            document: doc.id,
            fields: mapDocumentDownloadFields({
              ...form,
              documentLabel: doc.hubspotLabel,
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

        await triggerFileDownload(data.downloadUrl, filename);
      }}
      onDownloadAgain={() => triggerFileDownload(doc.pdfHref, filename)}
    />
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import type { PlacementReportEdition } from "@/data/placementReports";
import { mapPlacementReportFields } from "@/lib/hubspot/fields";

type PlacementReportDownloadFormProps = {
  edition: PlacementReportEdition;
};

function getHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

async function triggerFileDownload(url: string, filename: string) {
  const response = await fetch(url, { credentials: "same-origin" });
  if (!response.ok) {
    throw new Error("Could not download report. Please try again.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export function PlacementReportDownloadForm({ edition }: PlacementReportDownloadFormProps) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(undefined);
    setSubmitting(true);

    try {
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

      const filename = edition.pdfHref.split("/").pop() ?? "placement-report.pdf";
      await triggerFileDownload(data.downloadUrl, filename);
      setDownloaded(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit form. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <Image
          src={edition.coverImage}
          alt={`${edition.label} placement report cover`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 360px"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
            {edition.edition}
          </p>
          <p className="mt-1 text-xl font-semibold text-white">
            {edition.label} · {edition.year}
          </p>
        </div>
      </div>

      <div>
        {downloaded ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              Download started
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">Your report is on the way.</h2>
            <p className="mt-3 text-white/65">
              If the download did not start, use the button below. You can also browse the flipbook
              on the placements page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PillButton
                variant="highlight"
                tone="dark"
                onClick={() =>
                  void triggerFileDownload(
                    `/api/placement-report/download?edition=${encodeURIComponent(edition.id)}`,
                    edition.pdfHref.split("/").pop() ?? "placement-report.pdf",
                  )
                }
              >
                Download again
              </PillButton>
              <PillButton variant="secondary" tone="dark" href="/placements">
                Browse placements
              </PillButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              Placement report
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">Get the full PDF</h2>
            <p className="mt-3 text-white/65">
              Share your details and we&apos;ll start the download immediately.
            </p>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Full name
                </span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Phone
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                  autoComplete="tel"
                />
              </label>
            </div>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            <PillButton
              type="submit"
              variant="highlight"
              tone="dark"
              className="mt-6 w-full"
              disabled={submitting}
            >
              {submitting ? "Preparing download…" : "Download placement report"}
            </PillButton>
          </form>
        )}
      </div>
    </div>
  );
}

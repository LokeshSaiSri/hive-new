"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlacementReportDownloadForm } from "@/components/forms/PlacementReportDownloadForm";
import { DocumentDownloadForm } from "@/components/forms/DocumentDownloadForm";
import {
  getPlacementReportEdition,
  placementReportDownloadPath,
} from "@/data/placementReportAccess";
import { placementReportEditions } from "@/data/placementReports";
import { getGatedDocumentByHref, getGatedDocumentById } from "@/data/gatedDocuments";

const FORM_PATHNAME = "/download-placement-form";

type OpenTarget =
  | { kind: "edition"; id: string }
  | { kind: "document"; id: string };

export function PlacementReportModal() {
  const [target, setTarget] = useState<OpenTarget | null>(null);
  // Tracks whether we pushed a history entry so closing can restore the URL.
  const pushedHistory = useRef(false);

  const close = useCallback(() => {
    if (pushedHistory.current) {
      pushedHistory.current = false;
      // Restores the previous URL (and triggers our popstate handler).
      window.history.back();
      return;
    }
    setTarget(null);
  }, []);

  const open = useCallback((next: OpenTarget) => {
    setTarget(next);
    // Placement editions have a standalone form page, so mirror that URL in the
    // address bar (shareable + refresh fallback). Handbooks are public PDFs with
    // no standalone page, so we leave the URL untouched.
    if (next.kind === "edition") {
      window.history.pushState(
        { placementReportModal: next.id },
        "",
        placementReportDownloadPath(next.id),
      );
      pushedHistory.current = true;
    }
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const node = event.target;
      if (!(node instanceof Element)) return;

      const anchor = node.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      let next: OpenTarget | null = null;

      if (anchor.pathname === FORM_PATHNAME) {
        const editionId =
          new URLSearchParams(anchor.search).get("edition") ?? placementReportEditions[0]?.id;
        if (editionId) next = { kind: "edition", id: editionId };
      } else {
        const doc = getGatedDocumentByHref(anchor.pathname);
        if (doc) next = { kind: "document", id: doc.id };
      }

      if (!next) return;

      // Capture phase + stopPropagation so Next.js <Link>'s own click handler
      // never runs and triggers a client-side navigation / new tab.
      event.preventDefault();
      event.stopPropagation();
      open(next);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  useEffect(() => {
    const onPopState = () => {
      pushedHistory.current = false;
      setTarget(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!target) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [target, close]);

  if (!target) return null;

  const edition =
    target.kind === "edition"
      ? getPlacementReportEdition(target.id) ?? placementReportEditions[0]
      : undefined;
  const gatedDocument = target.kind === "document" ? getGatedDocumentById(target.id) : undefined;

  if (!edition && !gatedDocument) return null;

  const ariaLabel = edition
    ? `${edition.label} placement report download`
    : `${gatedDocument!.eyebrow} download`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[120] flex items-stretch justify-center overflow-y-auto bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
      data-lenis-prevent
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="relative my-auto h-fit min-h-full w-full max-w-4xl border border-white/10 bg-[#04070d] p-5 pt-14 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:min-h-0 sm:rounded-3xl sm:p-10 sm:pt-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/70 transition hover:border-white/40 hover:text-white sm:right-4 sm:top-4"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {edition ? (
          <PlacementReportDownloadForm edition={edition} compact />
        ) : (
          <DocumentDownloadForm document={gatedDocument!} compact />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { isValidEmail } from "@/lib/validateEmail";

type DownloadFormValues = { fullName: string; email: string; phone: string };

type DownloadGateFormProps = {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  cover?: { image: string; alt: string; caption?: string; tag?: string };
  /** Tighter layout for the popup modal — hides the tall cover on mobile. */
  compact?: boolean;
  /** Submits the lead + triggers the download. Throws on failure. */
  onSubmit: (values: DownloadFormValues) => Promise<void>;
  /** Re-trigger the download from the success state. */
  onDownloadAgain?: () => void | Promise<void>;
};

export function DownloadGateForm({
  eyebrow,
  title,
  description,
  submitLabel,
  cover,
  compact = false,
  onSubmit,
  onDownloadAgain,
}: DownloadGateFormProps) {
  const [form, setForm] = useState<DownloadFormValues>({ fullName: "", email: "", phone: "" });
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setError(undefined);
    setSubmitting(true);

    try {
      await onSubmit(form);
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

  const hasCover = Boolean(cover);

  return (
    <div
      className={
        hasCover
          ? "grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
          : "mx-auto w-full max-w-xl"
      }
    >
      {cover && (
        <div
          className={`relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${
            compact ? "hidden lg:block" : ""
          }`}
        >
          <Image
            src={cover.image}
            alt={cover.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 80vw, 360px"
            priority
          />
          {(cover.tag || cover.caption) && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
              {cover.tag && (
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                  {cover.tag}
                </p>
              )}
              {cover.caption && (
                <p className="mt-1 text-xl font-semibold text-white">{cover.caption}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div>
        {downloaded ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              Download started
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">It&apos;s on the way.</h2>
            <p className="mt-3 text-white/65">
              If the download did not start, use the button below.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {onDownloadAgain && (
                <PillButton
                  variant="highlight"
                  tone="dark"
                  onClick={() => void onDownloadAgain()}
                >
                  Download again
                </PillButton>
              )}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            data-hs-cf-bound="true"
            className={`rounded-2xl border border-white/10 bg-white/[0.04] ${
              compact ? "p-5 sm:p-8" : "p-8"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              {eyebrow}
            </p>
            <h2 className={`mt-3 font-bold text-white ${compact ? "text-2xl sm:text-3xl" : "text-3xl"}`}>
              {title}
            </h2>
            <p className="mt-3 text-white/65">{description}</p>

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
                  onChange={(event) => {
                    const digits = event.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm((current) => ({ ...current, phone: digits }));
                  }}
                  className="w-full rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                  autoComplete="tel"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
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
              {submitting ? "Preparing download…" : submitLabel}
            </PillButton>
          </form>
        )}
      </div>
    </div>
  );
}

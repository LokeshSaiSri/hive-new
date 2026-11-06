"use client";

import { useState, useId } from "react";
import { validateEntry } from "@/lib/young-ceo/validate";
import type { EntryFieldErrors } from "@/lib/young-ceo/validate";

type Values = {
  name: string;
  email: string;
  phone: string;
  school: string;
  age: string;
  pitchUrl: string;
  website: string; // honeypot
  consent: boolean;
};

const empty: Values = { name: "", email: "", phone: "", school: "", age: "", pitchUrl: "", website: "", consent: false };

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition-all duration-200 placeholder:text-ink/30 disabled:opacity-60";
const inputOk = "border-ink/20 focus:border-ink focus:shadow-[0_0_0_3px_rgba(255,207,0,0.55)]";
const inputBad = "border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]";

function Field({
  id, label, error, hint, children,
}: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-ink/60">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs leading-snug text-ink/55">{hint}</p>}
      {error && <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

export function YoungCeoApplyForm() {
  const uid = useId();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<EntryFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [serverError, setServerError] = useState("");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const check = validateEntry({ ...v, consent: v.consent });
    if (!check.ok) {
      setErrors(check.fields);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/young-ceo/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, age: Number(v.age) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        return;
      }
      if (data.fields) setErrors(data.fields);
      setServerError(data.error || "Something went wrong. Please try again.");
    } catch {
      setServerError("Could not reach the server. Check your connection and try again.");
    }
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-10" role="status">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-7 w-7 text-ink">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-ink">You are in.</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Thanks, <strong className="text-ink">{v.name.trim().split(" ")[0]}</strong>. We have your registration and will
          email you at <strong className="text-ink">{v.email.trim()}</strong> with the next steps. Entries close on 20
          December.
        </p>
      </div>
    );
  }

  const busy = status === "submitting";
  const cls = (bad?: string) => `${inputBase} ${bad ? inputBad : inputOk}`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-3xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-8"
      aria-label="Young CEO Challenge registration"
    >
      <h3 className="text-2xl font-bold tracking-tight text-ink">Enter the challenge</h3>
      <p className="mb-6 mt-1 text-sm text-ink/60">
        Free. Takes two minutes. Class 12 in 2027 and 2026 pass-outs, any board, anywhere in India.
      </p>

      <div className="flex flex-col gap-4">
        <Field id={`${uid}-name`} label="Full name" error={errors.name}>
          <input id={`${uid}-name`} className={cls(errors.name)} type="text" autoComplete="name" maxLength={100}
            value={v.name} disabled={busy} onChange={(e) => set("name", e.target.value)} />
        </Field>

        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input id={`${uid}-email`} className={cls(errors.email)} type="email" autoComplete="email" inputMode="email"
            maxLength={200} value={v.email} disabled={busy} onChange={(e) => set("email", e.target.value)} />
        </Field>

        <Field id={`${uid}-phone`} label="Phone number" error={errors.phone}>
          <input id={`${uid}-phone`} className={cls(errors.phone)} type="tel" autoComplete="tel" inputMode="tel"
            placeholder="10-digit mobile" maxLength={16} value={v.phone} disabled={busy}
            onChange={(e) => set("phone", e.target.value)} />
        </Field>

        <div className="grid grid-cols-[1fr_6.5rem] gap-3">
          <Field id={`${uid}-school`} label="School" error={errors.school}>
            <input id={`${uid}-school`} className={cls(errors.school)} type="text" autoComplete="organization"
              maxLength={150} value={v.school} disabled={busy} onChange={(e) => set("school", e.target.value)} />
          </Field>
          <Field id={`${uid}-age`} label="Age" error={errors.age}>
            <input id={`${uid}-age`} className={cls(errors.age)} type="number" inputMode="numeric" min={14} max={22}
              value={v.age} disabled={busy} onChange={(e) => set("age", e.target.value)} />
          </Field>
        </div>

        <Field
          id={`${uid}-pitch`}
          label="Elevator pitch link"
          error={errors.pitchUrl}
          hint="Your 60 to 90 second pitch on YouTube (unlisted), Google Drive or Instagram. Make sure anyone with the link can view it."
        >
          <input id={`${uid}-pitch`} className={cls(errors.pitchUrl)} type="url" inputMode="url" placeholder="https://"
            maxLength={500} value={v.pitchUrl} disabled={busy} onChange={(e) => set("pitchUrl", e.target.value)} />
        </Field>

        {/* Honeypot: hidden from people, bots fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Leave this empty
            <input type="text" tabIndex={-1} autoComplete="off" value={v.website}
              onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>

        <div>
          <label className={`flex cursor-pointer items-start gap-3 text-[13.5px] leading-snug ${errors.consent ? "text-red-600" : "text-ink/65"}`}>
            <input type="checkbox" className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#060f32]" checked={v.consent}
              disabled={busy} onChange={(e) => set("consent", e.target.checked)} />
            <span>
              I am in Class 12 in 2027 or a 2026 pass-out. If I am under 18, my parent or guardian knows about and agrees
              to my entry. HiveSchool may contact me about the challenge.
            </span>
          </label>
          {errors.consent && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.consent}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-light-blue disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "Submitting…" : "Register free"}
      </button>

      {serverError && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
          {serverError}
        </p>
      )}
    </form>
  );
}

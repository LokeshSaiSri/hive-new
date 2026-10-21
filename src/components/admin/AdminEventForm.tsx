"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { R2ImageUploader } from "@/components/admin/R2ImageUploader";
import type { EventDescriptionLink, EventQuestion } from "@/lib/events/custom-fields";
import { dateToIstLocalInput } from "@/lib/timezone";
import { EVENT_PROGRAMS, buildEventSlug, programFromSlug, slugWithoutProgram } from "@/lib/events/slug";

type EventFormData = {
  title: string;
  tagline: string;
  description: string;
  posterUrls: string[];
  date: string;
  endDate: string;
  venue: string;
  venueLink: string;
  isOnline: boolean;
  capacity: string;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string;
  questions: EventQuestion[];
  descriptionLinks: EventDescriptionLink[];
  /** Page address: programme prefix + slug (blank = from the title) */
  program: string;
  slug: string;
};

type Props = {
  initialData?: Partial<Omit<EventFormData, "posterUrls">> & {
    _id?: string;
    tags?: string[] | string;
    posterUrl?: string;
    posterUrls?: string[];
    isOnline?: boolean;
  };
  mode: "create" | "edit";
};

function FormField({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
        {label}
        {required && <span className="ml-0.5 text-blue-glow">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[10px] text-white/30">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-electric-blue/60 focus:bg-electric-blue/5 focus:shadow-[0_0_0_3px_rgba(30,68,226,0.12)]";

export function AdminEventForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<EventFormData>({
    title: initialData?.title ?? "",
    tagline: initialData?.tagline ?? "",
    description: initialData?.description ?? "",
    posterUrls:
      initialData?.posterUrls && initialData.posterUrls.length > 0
        ? initialData.posterUrls
        : initialData?.posterUrl
        ? [initialData.posterUrl]
        : [],
    date: initialData?.date ? dateToIstLocalInput(initialData.date) : "",
    endDate: initialData?.endDate ? dateToIstLocalInput(initialData.endDate) : "",
    venue: initialData?.venue ?? "",
    venueLink: initialData?.venueLink ?? "",
    isOnline: initialData?.isOnline ?? false,
    capacity: initialData?.capacity?.toString() ?? "",
    isPublished: initialData?.isPublished ?? false,
    isFeatured: initialData?.isFeatured ?? false,
    tags: Array.isArray(initialData?.tags)
      ? (initialData.tags as string[]).join(", ")
      : (initialData?.tags as string | undefined) ?? "",
    questions: initialData?.questions ?? [],
    descriptionLinks: initialData?.descriptionLinks ?? [],
    program: initialData?.slug ? programFromSlug(initialData.slug) : "",
    slug: initialData?.slug ? slugWithoutProgram(initialData.slug) : "",
  });
  const startSlug = initialData?.slug ?? "";
  const previewSlug = buildEventSlug(form.program, form.slug, form.title || "event-name");

  function set<K extends keyof EventFormData>(key: K, val: EventFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const incompleteQuestion = form.questions.find(
      (question) =>
        !question.label.trim() ||
        (question.type === "dropdown" && question.options.every((option) => !option.trim())),
    );
    if (incompleteQuestion) {
      setError("Each question needs a label. A dropdown needs at least one option.");
      setSaving(false);
      return;
    }

    const invalidLink = form.descriptionLinks.find((link) => {
      const label = link.label.trim();
      const url = link.url.trim();
      if (!label && !url) return false;
      if (!label || !url) return true;
      try {
        const parsed = new URL(url);
        return parsed.protocol !== "http:" && parsed.protocol !== "https:";
      } catch {
        return true;
      }
    });
    if (invalidLink) {
      setError("Each description link needs a label and an http or https URL.");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      posterUrls: form.posterUrls,
      posterUrl: form.posterUrls[0] ?? "",
      date: form.date,
      endDate: form.endDate || undefined,
      venue: form.venue.trim(),
      venueLink: form.venueLink.trim(),
      isOnline: form.isOnline,
      capacity: form.capacity ? parseInt(form.capacity, 10) : undefined,
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      questions: form.questions,
      descriptionLinks: form.descriptionLinks.filter((link) => link.label.trim() && link.url.trim()),
      // On edit the address only changes when someone changes the programme or slug
      ...(mode === "create" || previewSlug !== startSlug ? { program: form.program, slug: form.slug.trim() } : {}),
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/events"
          : `/api/admin/events/${initialData?._id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }

      router.push("/hive-control-hub/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <div className="card-premium-dark rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Event Details</h3>

        <FormField label="Title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Annual GTM Summit 2026"
            className={inputClass}
            required
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
          <FormField label="Programme" hint="Goes at the front of the page address">
            <select value={form.program} onChange={(e) => set("program", e.target.value)} className={inputClass}>
              {EVENT_PROGRAMS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0b0f26]">
                  {p.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField
            label="URL slug"
            hint={
              mode === "edit" && previewSlug !== startSlug
                ? `New address: hiveschool.co/events/${previewSlug}. Links already shared to the old address will stop working.`
                : `Page address: hiveschool.co/events/${previewSlug} · leave blank to use the title`
            }
          >
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="founders-meetup-delhi"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Tagline" hint="Short one-liner shown in cards">
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            placeholder="Where revenue leaders meet"
            className={inputClass}
          />
        </FormField>

        <FormField
          label="Description"
          required
          hint="Blank lines start a new paragraph. You can also write [label](https://…) inside the text."
        >
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={6}
            placeholder="Tell attendees what this event is about..."
            className={`${inputClass} resize-y`}
            required
          />
        </FormField>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Links in the description</p>
              <p className="text-xs text-white/40">Shown under the about copy as clickable links.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                set("descriptionLinks", [...form.descriptionLinks, { label: "", url: "" }])
              }
              className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Add link
            </button>
          </div>
          {form.descriptionLinks.map((link, index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const next = [...form.descriptionLinks];
                  next[index] = { ...link, label: e.target.value };
                  set("descriptionLinks", next);
                }}
                placeholder="Link label"
                className={inputClass}
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => {
                  const next = [...form.descriptionLinks];
                  next[index] = { ...link, url: e.target.value };
                  set("descriptionLinks", next);
                }}
                placeholder="https://"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  set(
                    "descriptionLinks",
                    form.descriptionLinks.filter((_, i) => i !== index),
                  )
                }
                className="rounded-xl border border-white/12 px-3 py-2 text-xs text-white/50 hover:text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Date & Venue */}
      <div className="card-premium-dark rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Schedule & Location</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Start Date & Time" required hint="India time (IST)">
            <input
              type="datetime-local"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={inputClass}
              required
            />
          </FormField>

          <FormField label="End Date & Time (Optional)" hint="India time (IST)">
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="flex gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
          {([
            { value: false, label: "In person" },
            { value: true, label: "Online" },
          ] as const).map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => {
                set("isOnline", opt.value);
                if (opt.value && !form.venue.trim()) set("venue", "Online");
              }}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                form.isOnline === opt.value
                  ? "bg-electric-blue text-white shadow-[0_4px_16px_rgba(30,68,226,0.35)]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <FormField
          label={form.isOnline ? "Platform / Label" : "Venue"}
          required
          hint={form.isOnline ? "e.g. Zoom, Google Meet, Virtual Event" : undefined}
        >
          <input
            type="text"
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
            placeholder={form.isOnline ? "Zoom" : "The Circle, HiveSchool Campus, Gurugram"}
            className={inputClass}
            required
          />
        </FormField>

        <FormField
          label={form.isOnline ? "Join Link (Zoom / Meet URL)" : "Venue Link (Google Maps URL)"}
          hint={form.isOnline ? "Attendees will open this to join the session" : undefined}
        >
          <input
            type="url"
            value={form.venueLink}
            onChange={(e) => set("venueLink", e.target.value)}
            placeholder={form.isOnline ? "https://zoom.us/j/..." : "https://maps.google.com/..."}
            className={inputClass}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Capacity (leave blank for unlimited)">
            <input
              type="number"
              min={1}
              value={form.capacity}
              onChange={(e) => set("capacity", e.target.value)}
              placeholder="100"
              className={inputClass}
            />
          </FormField>

          <FormField label="Tags (comma-separated)" hint="e.g. Workshop, GTM, AI">
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="Workshop, Networking"
              className={inputClass}
            />
          </FormField>
        </div>
      </div>

      {/* Poster */}
      <div className="card-premium-dark rounded-2xl p-6">
        <h3 className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-white/40">Event Posters</h3>
        <p className="mb-4 text-xs text-white/40">
          Add one or more images. When multiple are added, they auto-slide on the event page.
        </p>
        <R2ImageUploader
          values={form.posterUrls}
          onChange={(urls) => set("posterUrls", urls)}
          disabled={saving}
        />
      </div>

      <div className="card-premium-dark space-y-4 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Registration questions</h3>
            <p className="mt-1 text-xs text-white/40">
              Extra questions on the public form. Use a dropdown when the answer should be one of a fixed list.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              set("questions", [
                ...form.questions,
                { id: crypto.randomUUID(), label: "", type: "text", required: false, options: [] },
              ])
            }
            className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            Add question
          </button>
        </div>

        {form.questions.length === 0 && (
          <p className="text-sm text-white/35">No custom questions yet. Name, email, phone, and LinkedIn stay on every form.</p>
        )}

        {form.questions.map((question, index) => (
          <div key={question.id} className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
              <input
                type="text"
                value={question.label}
                onChange={(e) => {
                  const next = [...form.questions];
                  next[index] = { ...question, label: e.target.value };
                  set("questions", next);
                }}
                placeholder="Question"
                className={inputClass}
              />
              <select
                value={question.type}
                onChange={(e) => {
                  const type = e.target.value === "dropdown" ? "dropdown" : "text";
                  const next = [...form.questions];
                  next[index] = {
                    ...question,
                    type,
                    options: type === "dropdown" ? question.options : [],
                  };
                  set("questions", next);
                }}
                className={inputClass}
              >
                <option value="text">Short answer</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </div>

            {question.type === "dropdown" && (
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const options = [...question.options];
                        options[optionIndex] = e.target.value;
                        const next = [...form.questions];
                        next[index] = { ...question, options };
                        set("questions", next);
                      }}
                      placeholder={`Option ${optionIndex + 1}`}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...form.questions];
                        next[index] = {
                          ...question,
                          options: question.options.filter((_, i) => i !== optionIndex),
                        };
                        set("questions", next);
                      }}
                      className="rounded-xl border border-white/12 px-3 text-xs text-white/50 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next = [...form.questions];
                    next[index] = { ...question, options: [...question.options, ""] };
                    set("questions", next);
                  }}
                  className="text-xs font-semibold text-blue-glow hover:underline"
                >
                  Add option
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => {
                    const next = [...form.questions];
                    next[index] = { ...question, required: e.target.checked };
                    set("questions", next);
                  }}
                  className="accent-[#1e44e2]"
                />
                Required
              </label>
              <button
                type="button"
                onClick={() => set("questions", form.questions.filter((_, i) => i !== index))}
                className="text-xs text-white/40 hover:text-white"
              >
                Remove question
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Publishing */}
      <div className="card-premium-dark rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Publishing</h3>

        {[
          { key: "isPublished" as const, label: "Published", desc: "Visible on the public events page" },
          { key: "isFeatured" as const, label: "Featured", desc: "Highlighted at the top of the page" },
        ].map(({ key, label, desc }) => (
          <label key={key} className="flex cursor-pointer items-center gap-4">
            <button
              type="button"
              role="switch"
              aria-checked={form[key]}
              onClick={() => set(key, !form[key])}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${
                form[key] ? "bg-electric-blue" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-white/40">{desc}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/hive-control-hub/events")}
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(30,68,226,0.35)] transition-all duration-200 hover:bg-light-blue disabled:opacity-60"
        >
          {saving ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving…
            </>
          ) : mode === "create" ? "Create Event →" : "Save Changes →"}
        </button>
      </div>
    </form>
  );
}

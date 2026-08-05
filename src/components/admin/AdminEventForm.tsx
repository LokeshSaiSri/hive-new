"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { R2ImageUploader } from "@/components/admin/R2ImageUploader";
import { dateToIstLocalInput } from "@/lib/timezone";

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
  });

  function set<K extends keyof EventFormData>(key: K, val: EventFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

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

        <FormField label="Tagline" hint="Short one-liner shown in cards">
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            placeholder="Where revenue leaders meet"
            className={inputClass}
          />
        </FormField>

        <FormField label="Description" required hint="Markdown supported (blank lines = new paragraphs)">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={6}
            placeholder="Tell attendees what this event is about..."
            className={`${inputClass} resize-y`}
            required
          />
        </FormField>
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

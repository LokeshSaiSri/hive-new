"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { R2ImageUploader } from "@/components/admin/R2ImageUploader";
import { dateToIstLocalInput } from "@/lib/timezone";

type BlogFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string;
};

type Props = {
  initialData?: Partial<BlogFormData> & { _id?: string; tags?: string[] | string };
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

export function AdminBlogForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<BlogFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    author: initialData?.author ?? "Hive Admin",
    publishedAt: initialData?.publishedAt 
      ? dateToIstLocalInput(initialData.publishedAt) 
      : dateToIstLocalInput(new Date().toISOString()),
    isPublished: initialData?.isPublished ?? false,
    isFeatured: initialData?.isFeatured ?? false,
    tags: Array.isArray(initialData?.tags)
      ? (initialData.tags as string[]).join(", ")
      : (initialData?.tags as string | undefined) ?? "",
  });

  function set<K extends keyof BlogFormData>(key: K, val: BlogFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      coverImage: form.coverImage,
      author: form.author.trim(),
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : new Date().toISOString(),
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
          ? "/api/admin/blogs"
          : `/api/admin/blogs/${initialData?._id}`;
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

      router.push("/hive-control-hub/blogs");
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
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Blog Details</h3>

        <FormField label="Title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="The Future of AI in Sales"
            className={inputClass}
            required
          />
        </FormField>

        <FormField label="Slug" hint="Leave blank to auto-generate from title">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="future-of-ai-sales"
            className={inputClass}
          />
        </FormField>

        <FormField label="Excerpt" hint="Short summary for the blog card">
          <textarea
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={3}
            placeholder="A brief overview..."
            className={`${inputClass} resize-y`}
          />
        </FormField>

        <FormField label="Content (Markdown)" required hint="Markdown is supported. Use ## for headings.">
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            rows={15}
            placeholder="Start writing..."
            className={`${inputClass} resize-y font-mono`}
            required
          />
        </FormField>
      </div>

      <div className="card-premium-dark rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Metadata</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Author" required>
            <input
              type="text"
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              className={inputClass}
              required
            />
          </FormField>

          <FormField label="Publish Date" required>
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => set("publishedAt", e.target.value)}
              className={inputClass}
              required
            />
          </FormField>
        </div>

        <FormField label="Tags (comma-separated)">
          <input
            type="text"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="AI, Sales, Tech"
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Cover Image */}
      <div className="card-premium-dark rounded-2xl p-6">
        <h3 className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-white/40">Cover Image</h3>
        <p className="mb-4 text-xs text-white/40">
          Upload a hero image for this blog post.
        </p>
        <R2ImageUploader
          values={form.coverImage ? [form.coverImage] : []}
          onChange={(urls) => set("coverImage", urls[0] || "")}
          disabled={saving}
        />
      </div>

      {/* Publishing & Featured */}
      <div className="card-premium-dark rounded-2xl p-6 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Publishing Options</h3>

        <div className="flex flex-col gap-5">
          {/* Published Toggle */}
          <label className="flex cursor-pointer items-center gap-4">
            <button
              type="button"
              role="switch"
              aria-checked={form.isPublished}
              onClick={() => set("isPublished", !form.isPublished)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
                form.isPublished ? "bg-electric-blue" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form.isPublished ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">Published</p>
              <p className="text-xs text-white/40">Visible on the public blogs page</p>
            </div>
          </label>

          {/* Featured Toggle */}
          <label className="flex cursor-pointer items-center gap-4">
            <button
              type="button"
              role="switch"
              aria-checked={form.isFeatured}
              onClick={() => set("isFeatured", !form.isFeatured)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
                form.isFeatured ? "bg-accent" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form.isFeatured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">Featured</p>
              <p className="text-xs text-white/40">Pin to the massive hero carousel on the index page</p>
            </div>
          </label>
        </div>
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
          onClick={() => router.push("/hive-control-hub/blogs")}
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(30,68,226,0.35)] transition-all duration-200 hover:bg-light-blue disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Create Blog →" : "Save Changes →"}
        </button>
      </div>
    </form>
  );
}

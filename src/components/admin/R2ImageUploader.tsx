"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
};

export function R2ImageUploader({ value, onChange, disabled }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const upload = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);
      setProgress(10);

      try {
        // 1. Get presigned URL from admin API
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        });

        if (!res.ok) {
          throw new Error("Failed to get upload URL");
        }

        const { uploadUrl, publicUrl } = await res.json();
        setProgress(40);

        // 2. Upload directly to R2
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadRes.ok) {
          throw new Error("Upload failed");
        }

        setProgress(100);
        onChange(publicUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 800);
      }
    },
    [onChange]
  );

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB");
      return;
    }
    upload(file);
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
        Event Poster
      </label>

      {/* Preview */}
      {value && (
        <div className="mb-3 relative overflow-hidden rounded-xl">
          <Image
            src={value}
            alt="Event poster preview"
            width={600}
            height={338}
            className="w-full object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/80 text-white backdrop-blur-sm hover:bg-red-500"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Drop zone */}
      <label
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 cursor-pointer ${
          dragging
            ? "border-electric-blue bg-electric-blue/10"
            : "border-white/15 hover:border-white/30 hover:bg-white/3"
        } ${disabled || uploading ? "pointer-events-none opacity-50" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled || uploading}
        />

        {uploading ? (
          <>
            <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-electric-blue transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/50">Uploading to Cloudflare R2…</p>
          </>
        ) : (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-white/50">
                <path d="M10 13V5M7 8l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 13.5A4 4 0 005 17.5h10a4 4 0 001.5-7.7" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/70">
                {value ? "Replace poster" : "Drop image here or click to upload"}
              </p>
              <p className="mt-1 text-xs text-white/35">JPEG, PNG, WebP · Max 10 MB · 16:9 recommended</p>
            </div>
          </>
        )}
      </label>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

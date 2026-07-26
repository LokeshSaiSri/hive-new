"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

type Props = {
  values: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
};

export function R2ImageUploader({ values, onChange, disabled }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const uploadOne = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }
    if (!data.publicUrl) {
      throw new Error("Upload succeeded but no URL returned");
    }

    return data.publicUrl as string;
  }, []);

  const uploadFiles = useCallback(
    async (files: File[]) => {
      setError("");
      setUploading(true);
      setProgress(0);

      const uploaded: string[] = [];
      try {
        for (let i = 0; i < files.length; i++) {
          setProgress(Math.round((i / files.length) * 100) + 5);
          const url = await uploadOne(files[i]);
          uploaded.push(url);
        }
        setProgress(100);
        onChange([...values, ...uploaded]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        if (uploaded.length > 0) onChange([...values, ...uploaded]);
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 800);
      }
    },
    [onChange, uploadOne, values]
  );

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files: File[] = [];
    for (const file of Array.from(fileList)) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload image files only (JPEG, PNG, WebP)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Each image must be under 10 MB");
        return;
      }
      files.push(file);
    }
    uploadFiles(files);
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= values.length) return;
    const next = [...values];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      {/* Existing images */}
      {values.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {values.map((url, i) => (
            <div key={url + i} className="group relative overflow-hidden rounded-xl border border-white/10">
              <Image
                src={url}
                alt={`Poster ${i + 1}`}
                width={300}
                height={200}
                className="aspect-[3/2] w-full object-cover"
              />

              {/* Order badge */}
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                {i === 0 ? "Cover" : `#${i + 1}`}
              </span>

              {/* Controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 disabled:opacity-30"
                    aria-label="Move left"
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                      <path d="M7.5 2.5L4 6l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === values.length - 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 disabled:opacity-30"
                    aria-label="Move right"
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                      <path d="M4.5 2.5L8 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/80 text-white backdrop-blur-sm transition hover:bg-red-500"
                  aria-label="Remove image"
                >
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                    <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
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
          multiple
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
            <p className="text-xs text-white/50">Uploading…</p>
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
                {values.length > 0 ? "Add more images" : "Drop images here or click to upload"}
              </p>
              <p className="mt-1 text-xs text-white/35">
                JPEG, PNG, WebP · Max 10 MB each · Multiple allowed · First image is the cover
              </p>
            </div>
          </>
        )}
      </label>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

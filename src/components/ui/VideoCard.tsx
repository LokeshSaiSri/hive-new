"use client";

import { useState } from "react";
import { useVideo } from "@/components/providers/VideoProvider";
import { youtubeThumbnail } from "@/lib/youtube";

type VideoCardProps = {
  videoId: string;
  caption?: string;
  badge?: string;
  className?: string;
  large?: boolean;
  flush?: boolean;
  /** Fill parent height — for side-by-side layouts */
  fill?: boolean;
  thumbnailQuality?: "maxresdefault" | "hqdefault";
};

export function VideoCard({
  videoId,
  caption,
  badge,
  className = "",
  large = false,
  flush = false,
  fill = false,
  thumbnailQuality,
}: VideoCardProps) {
  const { openVideo } = useVideo();
  const [quality, setQuality] = useState<"maxresdefault" | "hqdefault">(
    thumbnailQuality ?? "maxresdefault",
  );
  const imgSrc = youtubeThumbnail(videoId, quality);

  return (
    <div className={className}>
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => openVideo(videoId)}
        className={`group relative w-full overflow-hidden ${fill ? "h-full min-h-[260px] hover:opacity-95" : "hover-lift-card"
          } ${flush ? "rounded-none" : "rounded-2xl"} ${large ? "shadow-xl" : ""}`}
        aria-label={caption ?? "Play video"}
      >
        <div
          className={`relative w-full overflow-hidden bg-ink ${fill
              ? "h-full min-h-[260px]"
              : large
                ? "aspect-[16/9] sm:aspect-[21/9]"
                : "aspect-video"
            }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={quality}
            src={imgSrc}
            alt={caption ?? "Video thumbnail"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            onError={() => {
              if (quality !== "hqdefault") setQuality("hqdefault");
            }}
          />
          <div className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15" />
          {badge && (
            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink backdrop-blur-sm">
              {badge}
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/95 text-ink shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5 h-6 w-6 sm:h-7 sm:w-7"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>
      </button>
      {caption && (
        <p className="mt-3 line-clamp-2 text-xs font-semibold uppercase tracking-[0.15em] text-mid-gray">
          {caption}
        </p>
      )}
    </div>
  );
}

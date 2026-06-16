"use client";

import Image from "next/image";
import { useVideo } from "@/components/providers/VideoProvider";
import { PillButton } from "@/components/ui/PillButton";
import { youtubeThumbnail } from "@/lib/youtube";
import type { FeaturePanel } from "@/data/features";

export function FeatureShowcase({
  panel,
  reversed = false,
  compact = false,
  dark = false,
}: {
  panel: FeaturePanel;
  reversed?: boolean;
  compact?: boolean;
  dark?: boolean;
}) {
  const { openVideo } = useVideo();

  return (
    <div
      className={`grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => openVideo(panel.videoId)}
        className={`group relative w-full overflow-hidden rounded-2xl border hover-lift-card ${
          dark ? "border-white/10" : "border-transparent"
        } ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        <Image
          src={youtubeThumbnail(panel.videoId)}
          alt={panel.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = youtubeThumbnail(panel.videoId, "hqdefault");
          }}
        />
        <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/20" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-ink sm:h-8 sm:w-8">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>

      <div className="min-w-0">
        <p
          className={`text-xs font-bold uppercase tracking-[0.25em] ${
            dark ? "text-white/50" : "text-light-blue"
          }`}
        >
          {panel.eyebrow}
        </p>
        <h3
          className={`mt-3 font-bold ${
            compact
              ? "text-2xl leading-tight sm:text-3xl lg:text-4xl"
              : "text-section"
          }`}
        >
          <span className={dark ? "gradient-headline-dark" : "gradient-headline-light"}>
            {panel.title}
          </span>
        </h3>
        <p
          className={`mt-4 leading-relaxed ${
            dark ? "text-white/60" : "text-mid-gray"
          } ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}
        >
          {panel.description}
        </p>

        {panel.bullets && (
          <ul className="mt-6 space-y-3">
            {panel.bullets.map((b) => (
              <li key={b.number} className="flex gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    dark ? "bg-white/15 text-white" : "bg-white text-ink"
                  }`}
                >
                  {b.number}
                </span>
                <span
                  className={`pt-0.5 text-sm leading-relaxed sm:text-base ${
                    dark ? "text-white/85" : "text-ink"
                  }`}
                >
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {panel.ctaLabel && (
          <div className="mt-6">
            <PillButton
              variant="primary"
              tone={dark ? "dark" : "light"}
              href={panel.ctaHref}
              onClick={
                !panel.ctaHref ? () => openVideo(panel.videoId) : undefined
              }
            >
              {panel.ctaLabel}
            </PillButton>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useVideo } from "@/components/providers/VideoProvider";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { youtubePreviewEmbedUrl, youtubeThumbnail } from "@/lib/youtube";

type CampusVideoHeroProps = {
  videoId: string;
  posterSrc?: string;
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
  description?: string;
  caption?: string;
  fullScreen?: boolean;
  inlinePreview?: boolean;
};

export function CampusVideoHero({
  videoId,
  posterSrc,
  eyebrow = "Offline Campus",
  statement = "Experience",
  emphasis = "Our Campus",
  description,
  caption,
  fullScreen = false,
  inlinePreview = true,
}: CampusVideoHeroProps) {
  const { openVideo } = useVideo();
  const { ref, inView } = useInViewOnce<HTMLButtonElement>("200px");
  const [previewReady, setPreviewReady] = useState(false);
  const [posterUrl, setPosterUrl] = useState(posterSrc ?? youtubeThumbnail(videoId));

  useEffect(() => {
    setPreviewReady(false);
    setPosterUrl(posterSrc ?? youtubeThumbnail(videoId));
  }, [videoId, posterSrc]);

  useEffect(() => {
    if (!inlinePreview || !inView) return;
    const readyFallback = window.setTimeout(() => setPreviewReady(true), 2200);
    return () => window.clearTimeout(readyFallback);
  }, [videoId, inlinePreview, inView]);

  return (
    <button
      ref={ref}
      type="button"
      suppressHydrationWarning
      onClick={() => openVideo(videoId)}
      className={`campus-video-hero group relative block w-full overflow-hidden text-left ${
        fullScreen ? "min-h-[100svh] h-[100svh]" : ""
      }`}
      aria-label="Watch campus video"
    >
      <div
        className={`relative w-full ${
          fullScreen ? "absolute inset-0 h-full" : "aspect-[16/9] lg:aspect-[21/9]"
        }`}
      >
        <Image
          src={posterUrl}
          alt=""
          fill
          loading={fullScreen ? "eager" : "lazy"}
          className={`object-cover transition-all duration-700 group-hover:scale-[1.02] ${
            inlinePreview && previewReady ? "opacity-0" : "opacity-100"
          }`}
          sizes="100vw"
          onError={() => setPosterUrl(youtubeThumbnail(videoId, "hqdefault"))}
        />

        {inlinePreview && inView && (
          <div className="campus-video-hero__preview pointer-events-none absolute inset-0 overflow-hidden">
            <iframe
              src={youtubePreviewEmbedUrl(videoId)}
              title=""
              tabIndex={-1}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className={`campus-video-hero__preview-iframe transition-opacity duration-700 ${
                previewReady ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setPreviewReady(true)}
            />
          </div>
        )}

        <div className="campus-video-hero__scrim pointer-events-none absolute inset-0" aria-hidden />

        <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col p-5 sm:p-8 lg:p-10">
          <div className={`max-w-2xl ${fullScreen ? "mt-[max(5rem,12vh)]" : ""}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-white">
              {statement}{" "}
              <span className="gradient-headline-dark font-serif font-medium">{emphasis}</span>
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
                {description}
              </p>
            )}
          </div>

          {caption && !fullScreen && (
            <p className="mt-auto ml-auto max-w-md text-right text-sm leading-relaxed text-white/75 sm:text-base">
              {caption}
            </p>
          )}
        </div>

        <span className="absolute inset-0 z-[2] flex items-center justify-center">
          <span className="inline-flex items-center gap-3 sm:gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-6 w-6 sm:h-7 sm:w-7" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-[0.08em] text-white sm:text-base">
              Watch Video
            </span>
          </span>
        </span>
      </div>
    </button>
  );
}

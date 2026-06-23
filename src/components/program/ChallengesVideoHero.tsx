"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { useVideo } from "@/components/providers/VideoProvider";
import { challenges, type Challenge } from "@/data/challenges";
import { youtubePreviewEmbedUrl, youtubeThumbnail } from "@/lib/youtube";

function ChallengeThumb({
  challenge,
  active,
  onSelect,
}: {
  challenge: Challenge;
  active: boolean;
  onSelect: () => void;
}) {
  const [quality, setQuality] = useState<"maxresdefault" | "hqdefault">(
    challenge.thumbnailQuality ?? "maxresdefault",
  );

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`challenges-video-thumb group ${active ? "is-active" : ""}`}
      aria-label={challenge.caption}
      aria-pressed={active}
    >
      <span className="challenges-video-thumb__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youtubeThumbnail(challenge.videoId, quality)}
          alt=""
          className="challenges-video-thumb__img"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (quality !== "hqdefault") setQuality("hqdefault");
          }}
        />
        <span className="challenges-video-thumb__scrim" aria-hidden />
        <span className="challenges-video-thumb__play" aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="challenges-video-thumb__caption">{challenge.caption}</span>
    </button>
  );
}

export function ChallengesVideoHero({ className }: { className?: string } = {}) {
  const { openVideo } = useVideo();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewReady, setPreviewReady] = useState(false);
  const [posterUrl, setPosterUrl] = useState(
    youtubeThumbnail(challenges[0].videoId, challenges[0].thumbnailQuality ?? "maxresdefault"),
  );

  const active = challenges[activeIndex];

  useEffect(() => {
    setPreviewReady(false);
    setPosterUrl(
      youtubeThumbnail(active.videoId, active.thumbnailQuality ?? "maxresdefault"),
    );

    const readyFallback = window.setTimeout(() => setPreviewReady(true), 2200);
    return () => window.clearTimeout(readyFallback);
  }, [active.videoId, active.thumbnailQuality]);

  return (
    <section id="challenges" className={`challenges-video-hero panel-bleed ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => openVideo(active.videoId)}
        className="challenges-video-hero__stage group"
        aria-label={`Play ${active.caption}`}
      >
        <div className="challenges-video-hero__media">
          <Image
            src={posterUrl}
            alt=""
            fill
            priority
            unoptimized
            className={`object-cover transition-all duration-700 group-hover:scale-[1.02] ${
              previewReady && !prefersReducedMotion ? "opacity-0" : "opacity-100"
            }`}
            sizes="100vw"
            onError={() => setPosterUrl(youtubeThumbnail(active.videoId, "hqdefault"))}
          />

          {!prefersReducedMotion && (
            <div className="campus-video-hero__preview pointer-events-none absolute inset-0 overflow-hidden">
              <iframe
                key={active.videoId}
                src={youtubePreviewEmbedUrl(active.videoId)}
                title=""
                tabIndex={-1}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className={`campus-video-hero__preview-iframe transition-opacity duration-700 ${
                  previewReady ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setPreviewReady(true)}
              />
            </div>
          )}

          <div className="challenges-video-hero__scrim pointer-events-none absolute inset-0" aria-hidden />
        </div>

        <div className="challenges-video-hero__copy pointer-events-none">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            Live challenges
          </p>
          <h2 className="mt-3 max-w-[14ch] text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[0.98] tracking-tight text-white sm:max-w-none">
            Real brands,{" "}
            <span className="gradient-headline-dark font-serif font-medium">real briefs.</span>
          </h2>
          <p className="mt-4 hidden max-w-md text-sm leading-relaxed text-white/68 sm:block sm:text-base">
            {active.caption}
          </p>
        </div>

        <span className="challenges-video-hero__play">
          <span className="inline-flex items-center gap-3 sm:gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-6 w-6 sm:h-7 sm:w-7" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-[0.08em] text-white sm:text-base">
              Watch challenge
            </span>
          </span>
        </span>
      </button>

      <div className="challenges-video-hero__strip">
        <HorizontalScroller
          marquee
          marqueeAlways
          marqueeSpeed="slow"
          marqueePauseOnHover={false}
          clipOverflow={false}
          bleed={false}
          slideClassName="challenges-video-hero__slide"
          className="challenges-video-hero__scroller"
        >
          {challenges.map((challenge, index) => (
            <ChallengeThumb
              key={challenge.videoId + challenge.caption}
              challenge={challenge}
              active={index === activeIndex}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { InsightVideo } from "@/data/coursePages/online-pgp";
import { easeHive } from "@/lib/motion";

type LaunchpadInsightsReelsProps = {
  videos: InsightVideo[];
  className?: string;
};

/** Embed a YouTube video in a 16:9 horizontal container */
function YoutubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        loading="lazy"
      />
    </div>
  );
}

/** Horizontal card for the right-side vertical scrolling playlist */
function InsightListCard({
  video,
  isActive,
  onClick,
}: {
  video: InsightVideo;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      aria-selected={isActive}
      className={`flex w-full items-start gap-4 rounded-xl border p-3 text-left transition-all duration-300 ${
        isActive
          ? "border-blue-glow/30 bg-white/[0.06]"
          : "border-transparent hover:bg-white/[0.04]"
      }`}
    >
      <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md bg-ink">
        <img
          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity ${isActive ? "opacity-100" : "opacity-80"}`}
        />
        {!isActive && <div className="absolute inset-0 bg-black/20" />}
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="line-clamp-3 text-sm font-medium leading-snug text-white/90">
          {video.title}
        </h3>
      </div>
    </button>
  );
}

export function LaunchpadInsightsReels({ videos, className }: LaunchpadInsightsReelsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const selectVideo = useCallback((index: number) => {
    setActive(index);
  }, []);

  if (!videos || videos.length === 0) return null;

  const current = videos[active];

  return (
    <section
      id="insights"
      className={`program-section hive-dark-band section-py overflow-hidden ${className ?? ""}`}
    >
      <div className="section-container">
        <ScrollReveal>
          <div className="mb-10 lg:mb-14 text-left max-w-3xl">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-[1.1]">
              Insights from <em className="font-serif font-medium not-italic text-blue-100">Industry Leaders</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              A curated knowledge bank of stories, lessons, and experiences from SaaS, tech, and startup leaders designed for Hive students to learn and apply.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
          {/* Main Video Player */}
          <ScrollReveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: easeHive }}
                className="relative"
              >
                <YoutubeEmbed videoId={current.id} title={current.title} />
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          {/* Vertical Scrolling Playlist */}
          <ScrollReveal delay={0.1}>
            <div 
              className="flex max-h-[500px] flex-col gap-2 overflow-y-auto rounded-2xl bg-white/[0.02] p-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`
                .flex.max-h-\\[500px\\]::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {videos.map((video, index) => (
                <InsightListCard
                  key={video.id}
                  video={video}
                  isActive={index === active}
                  onClick={() => selectVideo(index)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

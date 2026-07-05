"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { easeHive } from "@/lib/motion";
import Link from "next/link";

const SWIPE_THRESHOLD_PX = 48;
const SLIDE_OFFSET_PX = 28;

function wrapIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

function getSlideDirection(from: number, to: number, total: number): 1 | -1 {
  if (total <= 1 || from === to) return 1;
  const forward = (to - from + total) % total;
  const backward = (from - to + total) % total;
  return forward <= backward ? 1 : -1;
}

export type YoutubeReel = {
  id: string;
  caption: string;
};

type YoutubeBackCardProps = {
  reel: YoutubeReel;
  side: "left" | "right";
  onSelect: () => void;
};

function YoutubeBackCard({ reel, side, onSelect }: YoutubeBackCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`reel-back-card reel-back-card--${side}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.button
          type="button"
          key={reel.id}
          suppressHydrationWarning
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
          aria-label={`View next short`}
          className="reel-back-card-hit"
          initial={{ opacity: prefersReducedMotion ? 1 : 0.55 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: prefersReducedMotion ? 1 : 0.55 }}
          transition={{ duration: 0.22, ease: easeHive }}
        >
          <div className="reel-back-card-screen overflow-hidden">
            <div className="absolute inset-0 bg-ink" />
            <img 
              src={`https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-ink/35" aria-hidden />
          </div>
        </motion.button>
      </AnimatePresence>
    </div>
  );
}

type YoutubePhoneShowcaseProps = {
  reels: YoutubeReel[];
  embedded?: boolean;
};

export function YoutubePhoneShowcase({
  reels,
  embedded = false,
}: YoutubePhoneShowcaseProps) {
  const { ref: containerRef, inView } = useInViewOnce<HTMLDivElement>(
    embedded ? "120px" : "320px",
  );

  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const activeIndexRef = useRef(0);
  const pointerStartX = useRef<number | null>(null);
  const suppressClickRef = useRef(false);

  const total = reels.length;
  const reel = reels[activeIndex];
  const shouldLoadVideo = inView && reel;

  activeIndexRef.current = activeIndex;

  const selectReel = useCallback(
    (index: number, direction?: 1 | -1) => {
      if (total <= 0) return;
      const next = wrapIndex(index, total);
      const current = activeIndexRef.current;
      if (next === current) return;

      setSlideDirection(direction ?? getSlideDirection(current, next, total));
      setActiveIndex(next);
    },
    [total],
  );

  const goNext = useCallback(
    () => selectReel(activeIndexRef.current + 1, 1),
    [selectReel],
  );

  const goPrev = useCallback(
    () => selectReel(activeIndexRef.current - 1, -1),
    [selectReel],
  );

  const handleScreenPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStartX.current = event.clientX;
  }, []);

  const handleScreenPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const startX = pointerStartX.current;
      pointerStartX.current = null;
      if (startX === null) return;

      const delta = event.clientX - startX;

      if (total > 1 && delta > SWIPE_THRESHOLD_PX) {
        suppressClickRef.current = true;
        goPrev();
        return;
      }

      if (total > 1 && delta < -SWIPE_THRESHOLD_PX) {
        suppressClickRef.current = true;
        goNext();
        return;
      }
    },
    [goNext, goPrev, total],
  );

  const handleScreenClick = useCallback(() => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
  }, []);

  if (!reel || total === 0) return null;

  const prevReel = reels[wrapIndex(activeIndex - 1, total)];
  const nextReel = reels[wrapIndex(activeIndex + 1, total)];

  return (
    <div
      ref={containerRef}
      className={`reel-showcase mx-auto flex w-full flex-col items-center ${
        embedded ? "reel-showcase--embedded" : "max-w-5xl"
      }`}
    >
      <div className="reel-stage">
        <div className="reel-stage-track">
          {total > 1 && (
            <>
              <YoutubeBackCard reel={prevReel} side="left" onSelect={() => goPrev()} />
              <YoutubeBackCard reel={nextReel} side="right" onSelect={() => goNext()} />
            </>
          )}

          <div className="reel-phone-shell">
            <div className="reel-phone-bezel" aria-hidden />
            <div className="reel-phone-notch" aria-hidden />

            <div
              suppressHydrationWarning
              className="reel-phone-screen relative"
            >
              <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                <motion.div
                  key={reel.id}
                  custom={slideDirection}
                  className="absolute inset-0 bg-ink"
                  variants={{
                    enter: (dir: 1 | -1) => ({
                      x: prefersReducedMotion ? 0 : dir * SLIDE_OFFSET_PX,
                      opacity: prefersReducedMotion ? 1 : 0.55,
                    }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir: 1 | -1) => ({
                      x: prefersReducedMotion ? 0 : dir * -SLIDE_OFFSET_PX,
                      opacity: prefersReducedMotion ? 1 : 0.55,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: easeHive }}
                >
                  {shouldLoadVideo && (
                    <iframe
                      src={`https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.id}&modestbranding=1&playsinline=1&rel=0`}
                      className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      tabIndex={-1}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Transparent overlay to catch swipes and prevent iframe interaction */}
              <div 
                className="absolute inset-0 z-10 touch-pan-y" 
                onPointerDown={handleScreenPointerDown}
                onPointerUp={handleScreenPointerUp}
                onClick={handleScreenClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-md text-center flex flex-col items-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
          {reel.caption}
        </p>
        <Link
          href={`https://www.youtube.com/shorts/${reel.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.12]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-red-500" aria-hidden>
            <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15V9l5.2,3L10,15z" />
          </svg>
          Watch on YouTube
        </Link>
      </div>

      {total > 1 && (
        <div
          className={`flex items-center gap-2.5 ${embedded ? "mt-4" : "mt-7"}`}
          role="tablist"
          aria-label="Reels"
        >
          {reels.map((item, index) => (
            <button
              key={item.id}
              type="button"
              suppressHydrationWarning
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={item.caption}
              onClick={() => selectReel(index)}
              className={`reel-showcase-dot ${index === activeIndex ? "reel-showcase-dot--active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

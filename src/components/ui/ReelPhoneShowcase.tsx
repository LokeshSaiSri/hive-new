"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getReelsByIds, pgpReels, type PgpReel } from "@/data/reels";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { easeHive } from "@/lib/motion";

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

type ReelBackCardProps = {
  reel: PgpReel;
  side: "left" | "right";
  onSelect: () => void;
};

function ReelBackCard({ reel, side, onSelect }: ReelBackCardProps) {
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
          aria-label={`View reel: ${reel.caption}`}
          className="reel-back-card-hit"
          initial={{ opacity: prefersReducedMotion ? 1 : 0.55 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: prefersReducedMotion ? 1 : 0.55 }}
          transition={{ duration: 0.22, ease: easeHive }}
        >
          <div className="reel-back-card-screen">
            <Image
              src={reel.image}
              alt={reel.caption}
              fill
              loading="lazy"
              className="object-cover object-center"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-ink/35" aria-hidden />
          </div>
        </motion.button>
      </AnimatePresence>
    </div>
  );
}

type ReelPhoneShowcaseProps = {
  reels?: PgpReel[];
  reelIds?: string[];
  variant?: "full" | "embedded";
  /** Stable key so embedded instances reset only when the panel changes */
  instanceKey?: string;
};

export function ReelPhoneShowcase({
  reels: reelsProp,
  reelIds,
  variant = "full",
  instanceKey,
}: ReelPhoneShowcaseProps) {
  const { ref: containerRef, inView } = useInViewOnce<HTMLDivElement>(
    variant === "embedded" ? "120px" : "320px",
  );

  const reels = useMemo(
    () => reelsProp ?? (reelIds ? getReelsByIds(reelIds) : pgpReels),
    [reelsProp, reelIds],
  );
  const reelsKey =
    instanceKey ?? reelIds?.join(",") ?? reels.map((item) => item.id).join(",");
  const embedded = variant === "embedded";
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeIndexRef = useRef(0);
  const pointerStartX = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const isPausedRef = useRef(false);
  const soundOnRef = useRef(false);

  const total = reels.length;
  const reel = reels[activeIndex];
  const shouldLoadVideo = inView && reel;

    // eslint-disable-next-line react-hooks/refs
  activeIndexRef.current = activeIndex;
    // eslint-disable-next-line react-hooks/refs
  isPausedRef.current = isPaused;
    // eslint-disable-next-line react-hooks/refs
  soundOnRef.current = soundOn;

  const selectReel = useCallback(
    (index: number, fromUser = false, direction?: 1 | -1) => {
      if (total <= 0) return;
      const next = wrapIndex(index, total);
      const current = activeIndexRef.current;
      if (next === current) return;

      setSlideDirection(direction ?? getSlideDirection(current, next, total));

      if (fromUser) {
        setSoundOn(true);
        soundOnRef.current = true;
      }
      setIsPaused(false);
      isPausedRef.current = false;
      setActiveIndex(next);
    },
    [total],
  );

  const goNext = useCallback(
    (fromUser = false) => selectReel(activeIndexRef.current + 1, fromUser, 1),
    [selectReel],
  );

  const goPrev = useCallback(
    (fromUser = false) => selectReel(activeIndexRef.current - 1, fromUser, -1),
    [selectReel],
  );

  const syncVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !soundOnRef.current;

    if (isPausedRef.current) {
      video.pause();
      return;
    }

    try {
      await video.play();
    } catch {
      video.muted = true;
      setSoundOn(false);
      soundOnRef.current = false;
      try {
        await video.play();
      } catch {
        /* leave paused state to user */
      }
    }
  }, []);

  const togglePlayback = useCallback(() => {
    if (!soundOnRef.current) {
      setSoundOn(true);
      soundOnRef.current = true;
      setIsPaused(false);
      isPausedRef.current = false;
    } else {
      setIsPaused((paused) => {
        const next = !paused;
        isPausedRef.current = next;
        return next;
      });
    }
  }, []);

  const handleScreenPointerDown = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStartX.current = event.clientX;
  }, []);

  const handleScreenPointerUp = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const startX = pointerStartX.current;
      pointerStartX.current = null;
      if (startX === null) return;

      const delta = event.clientX - startX;

      if (total > 1 && delta > SWIPE_THRESHOLD_PX) {
        suppressClickRef.current = true;
        goPrev(true);
        return;
      }

      if (total > 1 && delta < -SWIPE_THRESHOLD_PX) {
        suppressClickRef.current = true;
        goNext(true);
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
    togglePlayback();
  }, [togglePlayback]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
    setIsPaused(false);
    setSoundOn(false);
    activeIndexRef.current = 0;
    isPausedRef.current = false;
    soundOnRef.current = false;
  }, [reelsKey]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    let cancelled = false;

    const onReady = () => {
      if (!cancelled) void syncVideo();
    };

    video.pause();
    video.currentTime = 0;
    video.addEventListener("loadeddata", onReady, { once: true });
    video.load();

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onReady);
    };
  }, [reel?.id, reel?.video, shouldLoadVideo, syncVideo]);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    void syncVideo();
  }, [isPaused, soundOn, shouldLoadVideo, syncVideo]);

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
              <ReelBackCard reel={prevReel} side="left" onSelect={() => goPrev(true)} />
              <ReelBackCard reel={nextReel} side="right" onSelect={() => goNext(true)} />
            </>
          )}

          <div className="reel-phone-shell">
            <div className="reel-phone-bezel" aria-hidden />
            <div className="reel-phone-notch" aria-hidden />

            <button
              type="button"
              suppressHydrationWarning
              className="reel-phone-screen"
              onPointerDown={handleScreenPointerDown}
              onPointerUp={handleScreenPointerUp}
              onClick={handleScreenClick}
              aria-label={isPaused ? "Play reel" : "Pause reel"}
            >
              <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                <motion.div
                  key={reel.id}
                  custom={slideDirection}
                  className="absolute inset-0"
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
                  {shouldLoadVideo ? (
                    <video
                      ref={videoRef}
                      src={reel.video}
                      poster={reel.image}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      loop
                      playsInline
                      preload="none"
                      muted={!soundOn}
                      aria-hidden
                    />
                  ) : (
                    <Image
                      src={reel.image}
                      alt=""
                      fill
                      loading="lazy"
                      className="object-cover object-center"
                      sizes="280px"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {isPaused && shouldLoadVideo && (
                <span className="reel-pause-btn" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-7 w-7">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {!embedded && (
        <div className="mt-8 max-w-md text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            {reel.tag}
          </p>
          <p className="mt-2 text-lg font-semibold leading-snug text-white sm:text-xl">
            {reel.caption}
          </p>
        </div>
      )}

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
              onClick={() => selectReel(index, true)}
              className={`reel-showcase-dot ${index === activeIndex ? "reel-showcase-dot--active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

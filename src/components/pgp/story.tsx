"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Scrollytelling primitives for the PGP page.
 *
 * A "story" is a tall box with a sticky stage inside it. As the visitor scrolls through the
 * tall box the stage stays pinned and `progress` runs from 0 to 1. Everything on the stage is
 * driven from that number, so nothing needs a click.
 *
 * Pinned stages must not sit inside an ancestor with overflow hidden (it would stop them
 * sticking). Sections that use them opt out of `.hive-dark-band`'s overflow with `!overflow-visible`.
 */

/** Space taken by the fixed header and the in-page menu. */
export const STAGE_TOP = "top-[6.9rem] sm:top-[8.2rem]";
export const STAGE_HEIGHT = "h-[calc(100svh-6.9rem)] sm:h-[calc(100svh-8.2rem)]";

type StoryStageProps = {
  /** Total scroll length of the story, in viewport heights. */
  vh: number;
  children: (progress: MotionValue<number>) => ReactNode;
  /** Shown instead of the pinned stage when the visitor prefers reduced motion. */
  reducedFallback?: ReactNode;
  className?: string;
};

export function StoryStage({ vh, children, reducedFallback, className = "" }: StoryStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 120px", "end end"] });
  const finished = useMotionValue(1);

  if (reduce) {
    return <div className={className}>{reducedFallback ?? children(finished)}</div>;
  }

  return (
    <div ref={ref} style={{ height: `${vh}svh` }}>
      <div className={`sticky ${STAGE_TOP} ${STAGE_HEIGHT} overflow-hidden ${className}`}>{children(scrollYProgress)}</div>
    </div>
  );
}

/** Maps story progress to 0..1 inside a window of it. */
export function useWindow(progress: MotionValue<number>, from: number, to: number) {
  return useTransform(progress, [from, to], [0, 1], { clamp: true });
}

/* ── Word-by-word reveal ─────────────────────────────────────────────────── */

function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1], { clamp: true });
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

/** Words light up one by one as `progress` moves through `range`. */
export function ScrollWords({
  text,
  progress,
  range = [0, 1],
  className = "",
}: {
  text: string;
  progress: MotionValue<number>;
  range?: [number, number];
  className?: string;
}) {
  const words = text.split(" ");
  const span = range[1] - range[0];
  return (
    <p className={className}>
      {words.map((w, i) => {
        const start = range[0] + (i / words.length) * span;
        const end = range[0] + ((i + 1) / words.length) * span;
        return <Word key={`${w}-${i}`} word={w} progress={progress} start={start} end={end} />;
      })}
    </p>
  );
}

/** Same, for text in the normal page flow: lights up as it scrolls through the viewport. */
export function ScrollWordsAuto({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const done = useMotionValue(1);

  return (
    <div ref={ref}>
      <ScrollWords text={text} progress={reduce ? done : scrollYProgress} className={className} />
    </div>
  );
}

/* ── Horizontal travel ───────────────────────────────────────────────────── */

/**
 * A row of cards that slides sideways as `progress` runs. The first and last card are
 * centred at progress 0 and 1, so card `i` of `n` sits dead centre at progress i / (n - 1).
 */
export function HorizontalTrack({
  progress,
  children,
  gap = 20,
  className = "",
}: {
  progress: MotionValue<number>;
  children: ReactNode;
  gap?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ shift: 0, pad: 0 });

  useLayoutEffect(() => {
    const track = trackRef.current;
    const stage = track?.parentElement;
    if (!track || !stage) return;

    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      const last = track.lastElementChild as HTMLElement | null;
      if (!first || !last) return;
      const stageW = stage.clientWidth;
      const pad = Math.max(0, (stageW - first.offsetWidth) / 2);
      // Distance between the centre of the first card and the centre of the last.
      const travel = last.offsetLeft + last.offsetWidth / 2 - (first.offsetLeft + first.offsetWidth / 2);
      setM({ shift: travel, pad });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const x = useTransform(progress, (v) => -m.shift * v);

  return (
    <motion.div
      ref={trackRef}
      style={{ x, paddingLeft: m.pad, paddingRight: m.pad, columnGap: gap, transformStyle: "preserve-3d" }}
      className={`flex w-max items-stretch ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Opacity and scale of card `index` of `count`, peaking when the track has it centred. */
export function useFocus(progress: MotionValue<number>, index: number, count: number) {
  const dist = useTransform(progress, (v) => Math.min(1, Math.abs(v * (count - 1) - index)));
  const scale = useTransform(dist, [0, 1], [1, 0.92]);
  const opacity = useTransform(dist, [0, 1], [1, 0.4]);
  return { scale, opacity, dist };
}

/**
 * Gives a track a rhythm: each card holds still for a beat, then the track swings quickly to the
 * next. Raw scroll progress runs 0..1 across `count` cards; the result does too, but eased between cards.
 * `dwell` is the share of each step spent holding (0.45 = hold for 45% of the scroll between two cards).
 */
export function useSnappedProgress(progress: MotionValue<number>, count: number, dwell = 0.45) {
  return useTransform(progress, (v) => {
    const p = Math.max(0, Math.min(1, v)) * (count - 1);
    const i = Math.min(count - 2, Math.floor(p));
    const f = p - i;
    const a = dwell / 2;
    const g = Math.max(0, Math.min(1, (f - a) / (1 - 2 * a)));
    const e = g * g * g * (g * (g * 6 - 15) + 10); // smootherstep
    return (i + e) / (count - 1);
  });
}

/**
 * Depth for a row of cards on a track, like a cover-flow. Put `perspective` on the track's parent
 * and feed this the *snapped* progress. The card at the centre faces you and sits slightly forward;
 * its neighbours turn inward to face it and recede, all toward one shared vanishing point.
 * `signed` is -1..1 around the centre (positive = already passed, on the left).
 */
export function useCarousel(progress: MotionValue<number>, index: number, count: number) {
  const signed = useTransform(progress, (v) => Math.max(-1.6, Math.min(1.6, v * (count - 1) - index)));
  const rotateY = useTransform(signed, [-1, 0, 1], [-38, 0, 38]);
  const z = useTransform(signed, (v) => 36 - Math.min(1, Math.abs(v)) * 230);
  const scale = useTransform(signed, [-1, 0, 1], [0.97, 1, 0.97]);
  const opacity = useTransform(signed, [-1.4, -1, 0, 1, 1.4], [0.15, 0.5, 1, 0.5, 0.15]);
  const drift = useTransform(signed, [-1, 1], [70, -70]);
  return { signed, rotateY, z, scale, opacity, drift };
}

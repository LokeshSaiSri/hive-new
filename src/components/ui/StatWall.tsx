"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { MegaStat } from "@/data/stats";

const HIGHLIGHT_STATS = new Set(["Average CTC", "Highest CTC", "Average Salary Jump"]);

function parseStatValue(value: string) {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value, decimals: 0 };
  const numStr = match[2];
  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    decimals: numStr.includes(".") ? numStr.split(".")[1].length : 0,
  };
}

function StatCell({ stat }: { stat: MegaStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(stat.value);
  const hasAnimated = useRef(false);
  const highlighted = HIGHLIGHT_STATS.has(stat.title);

  const parsed = useMemo(() => parseStatValue(stat.value), [stat.value]);
  const { prefix, number, suffix, decimals } = parsed;
  const isNumeric = number > 0 || /^\d/.test(stat.value.replace(/^[^\d]*/, ""));

  useEffect(() => {
    if (!isInView || prefersReducedMotion || !isNumeric) {
      setDisplay(stat.value);
      return;
    }
    if (hasAnimated.current) return;

    hasAnimated.current = true;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p >= 1) {
        setDisplay(stat.value);
        return;
      }
      setDisplay(`${prefix}${(number * eased).toFixed(decimals)}${suffix}`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, prefersReducedMotion, isNumeric, stat.value, prefix, number, suffix, decimals]);

  const label = stat.shortLabel ?? stat.title;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center px-4 py-9 text-center sm:px-5 sm:py-11 ${
        highlighted ? "bg-white/[0.06]" : "bg-black/10"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
        {label}
      </p>
      {highlighted && (
        <span className="mt-2 h-px w-6 bg-electric-blue/70" aria-hidden />
      )}
      <p
        className={`mt-3 font-bold leading-none tracking-tight ${
          highlighted
            ? "text-[clamp(1.5rem,3.2vw,2.35rem)] text-white"
            : "text-[clamp(1.35rem,2.8vw,2rem)] text-white/95"
        }`}
      >
        {display}
      </p>
      <p className="mt-3 hidden max-w-[11rem] text-[11px] leading-snug text-white/35 lg:block">
        {stat.description}
      </p>
    </div>
  );
}

export function StatWall({ stats }: { stats: MegaStat[] }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <StatCell key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

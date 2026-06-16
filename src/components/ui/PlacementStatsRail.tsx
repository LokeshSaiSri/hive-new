"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { MegaStat } from "@/data/stats";

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

function PlacementStatCell({ stat }: { stat: MegaStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(stat.value);
  const hasAnimated = useRef(false);

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
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (progress >= 1) {
        setDisplay(stat.value);
        return;
      }

      setDisplay(`${prefix}${(number * eased).toFixed(decimals)}${suffix}`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    isInView,
    prefersReducedMotion,
    isNumeric,
    stat.value,
    prefix,
    number,
    suffix,
    decimals,
  ]);

  return (
    <div ref={ref} className="px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-lg font-bold leading-none text-white sm:text-xl">
        {display}
      </p>
      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
        {stat.title}
      </p>
      <p className="mt-1 hidden text-[11px] leading-snug text-white/35 xl:block">
        {stat.description}
      </p>
    </div>
  );
}

export function PlacementStatsRail({ stats }: { stats: MegaStat[] }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-black/10">
          <PlacementStatCell stat={stat} />
        </div>
      ))}
    </div>
  );
}

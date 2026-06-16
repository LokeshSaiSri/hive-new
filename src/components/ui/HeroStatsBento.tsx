"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { heroStats } from "@/data/hero";
import { easeHive, durationStandard } from "@/lib/motion";

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

function HeroStatItem({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const parsed = useMemo(() => parseStatValue(value), [value]);
  const { prefix, number, suffix, decimals } = parsed;
  const isNumeric = number > 0 || /^\d/.test(value.replace(/^[^\d]*/, ""));

  useEffect(() => {
    if (!isInView || prefersReducedMotion || !isNumeric || hasAnimated.current) {
      setDisplay(value);
      return;
    }

    hasAnimated.current = true;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (progress >= 1) {
        setDisplay(value);
        return;
      }

      setDisplay(`${prefix}${(number * eased).toFixed(decimals)}${suffix}`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, prefersReducedMotion, isNumeric, value, prefix, number, suffix, decimals]);

  return (
    <div
      ref={ref}
      className="relative px-3 py-4 text-center sm:px-5 sm:py-5"
    >
      {index > 0 && (
        <span
          className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-white/10 sm:block"
          aria-hidden
        />
      )}
      <p className="text-xl font-bold leading-none tracking-tight text-white sm:text-2xl lg:text-[1.75rem]">
        {display}
      </p>
      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

export function HeroStatsBento() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: durationStandard, ease: easeHive }}
      className="hero-stats-rail overflow-hidden rounded-2xl border border-white/15"
    >
      <div className="grid grid-cols-3">
        {heroStats.map((stat, i) => (
          <HeroStatItem
            key={stat.label}
            value={stat.value}
            label={stat.label}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

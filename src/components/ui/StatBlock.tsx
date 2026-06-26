"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeHive } from "@/lib/motion";

type StatBlockProps = {
  value: string;
  label: string;
  light?: boolean;
  size?: "default" | "hero";
};

function parseStatValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value, decimals: 0 };
  }
  const numStr = match[2];
  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    decimals: numStr.includes(".") ? numStr.split(".")[1].length : 0,
  };
}

export function StatBlock({
  value,
  label,
  light = true,
  size = "default",
}: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const parsed = useMemo(() => parseStatValue(value), [value]);
  const { prefix, number, suffix, decimals } = parsed;
  const isNumeric = number > 0 || /^\d/.test(value.replace(/^[^\d]*/, ""));

  useEffect(() => {
    if (!isInView || prefersReducedMotion || !isNumeric) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }
    if (hasAnimated.current) return;

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

  const sizeClass =
    size === "hero"
      ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
      : "text-3xl sm:text-4xl lg:text-5xl";

  return (
    <motion.div
      ref={ref}
      className="text-center sm:text-left"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: easeHive }}
    >
      <p className={`${sizeClass} font-bold leading-none text-white`}>
        {display}
      </p>
      <p
        className={`mt-3 text-xs font-semibold uppercase tracking-[0.2em] ${
          light ? "text-ink/70" : "text-cream/70"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeHive } from "@/lib/motion";

type MegaStatCardProps = {
  value: string;
  title: string;
  description: string;
  index?: number;
};

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

export function MegaStatCard({
  value,
  title,
  description,
  index = 0,
}: MegaStatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: easeHive }}
      className="card-metallic-blue p-4 sm:p-5"
    >
      <p className="text-2xl font-bold leading-none text-white sm:text-3xl">{display}</p>
      <p className="mt-2 text-sm font-bold text-brand-blue sm:text-base">{title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-mid-gray">{description}</p>
    </motion.div>
  );
}

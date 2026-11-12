"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Big outlined words that slide sideways as the page scrolls past them. */
export function ScrollTicker({ words, reverse = false, className = "" }: { words: string[]; reverse?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-38%", "0%"] : ["0%", "-38%"]);
  const row = [...words, ...words, ...words];

  return (
    <div ref={ref} aria-hidden className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ x: reduce ? 0 : x }}
        className="flex w-max items-center gap-8 whitespace-nowrap text-[clamp(3.2rem,10vw,9rem)] font-bold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.26)]"
      >
        {row.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-8">
            {w}
            <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_18px_rgba(255,207,0,0.8)] [-webkit-text-stroke:0]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

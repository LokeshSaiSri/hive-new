"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeHive } from "@/lib/motion";

const WORDS = ["business.", "P&L.", "company.", "future."];

const wordTransition = {
  duration: 0.55,
  ease: easeHive,
};

export function HeroRotatingWord({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={`font-serif italic text-accent ${className}`}>
        business.
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block min-w-[12ch] align-bottom sm:min-w-[13ch] ${className}`}
      aria-live="polite"
    >
      <span className="relative block h-[1.45em] overflow-hidden pb-[0.14em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={wordTransition}
            className="absolute inset-x-0 bottom-[0.14em] inline-block pr-2 font-serif italic leading-[1.05] text-accent"
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

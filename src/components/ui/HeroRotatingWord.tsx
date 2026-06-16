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
      className={`relative inline-block min-w-[11ch] align-bottom sm:min-w-[12ch] ${className}`}
      aria-live="polite"
    >
      <span className="relative block h-[1.15em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={wordTransition}
            className="absolute inset-x-0 bottom-0 inline-block pr-1 font-serif italic text-accent"
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

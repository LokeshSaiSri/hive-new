"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeHive } from "@/lib/motion";

/**
 * Wraps a section heading. A gold rule draws, the heading rises out of a blur,
 * and its italic emphasis gets a highlighter swipe (see pgp-motion.css).
 */
export function HeadingReveal({ children, className = "", rule = true }: { children: ReactNode; className?: string; rule?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const on = inView || reduce;

  return (
    <div ref={ref} data-heading-reveal className={`pgp-head ${on ? "is-in" : ""} ${className}`}>
      {rule && (
        <motion.span
          aria-hidden
          className="mb-4 block h-0.5 w-16 origin-left rounded-full bg-accent"
          initial={reduce ? false : { scaleX: 0 }}
          animate={on ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, ease: easeHive }}
        />
      )}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(10px)" }}
        animate={on ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 36, filter: "blur(10px)" }}
        transition={{ duration: 0.95, ease: easeHive, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

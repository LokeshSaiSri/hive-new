"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps the hero. As you scroll away it drifts down more slowly than the page, so the next
 * section appears to slide up over it.
 */
export function PgpHeroMotion({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 170]);
  const dim = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 0.6]);

  return (
    <div className="relative">
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-[#04070d]" />
    </div>
  );
}

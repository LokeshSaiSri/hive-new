"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { easeHive, durationStandard } from "@/lib/motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
      transition={{
        duration: durationStandard,
        ease: easeHive,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        prefersReducedMotion
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: durationStandard } },
            }
          : {
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: durationStandard, ease: easeHive },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

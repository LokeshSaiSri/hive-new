"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeHive } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "div";
};

export function SplitText({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.65,
              ease: easeHive,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

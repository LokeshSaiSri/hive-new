"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipStatsWallProps = {
  stats: FellowshipOverview["stats"];
};

export function FellowshipStatsWall({ stats }: FellowshipStatsWallProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="fellowship-mega-stats" aria-label="Programme statistics">
      <ul className="fellowship-mega-stats__row">
        {stats.map((stat, index) => (
          <motion.li
            key={stat.label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: easeHive }}
          >
            <span className="fellowship-mega-stats__value">{stat.value}</span>
            <span className="fellowship-mega-stats__label">{stat.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipPathForkProps = {
  pathPanels: FellowshipOverview["pathPanels"];
  paths: FellowshipOverview["paths"];
};

export function FellowshipPathFork({ pathPanels, paths }: FellowshipPathForkProps) {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const current = paths.items[active] ?? paths.items[0];

  return (
    <section className="fellowship-paths" aria-labelledby="fellowship-paths-heading">
      <div className="section-container fellowship-paths__header">
        <p className="fellowship-eyebrow">{paths.eyebrow}</p>
        <h2 id="fellowship-paths-heading" className="fellowship-headline">
          {paths.statement} <em>{paths.emphasis}</em>
        </h2>
      </div>

      <div className="fellowship-paths__stage">
        {pathPanels.map((panel, index) => (
          <button
            key={panel.index}
            type="button"
            className={`fellowship-paths__panel ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <Image src={panel.image} alt="" fill className="object-cover" sizes="50vw" />
            <div className="fellowship-paths__panel-veil" aria-hidden />
            <div className="fellowship-paths__panel-copy">
              <span className="fellowship-paths__panel-index">{panel.index}</span>
              <h3>{panel.title}</h3>
              <p>{panel.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={current.index}
          className="fellowship-paths__outcome"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease: easeHive }}
        >
          {current.outcome}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}

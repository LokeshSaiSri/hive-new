"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipEditorialSpreadsProps = {
  spreads: FellowshipOverview["spreads"];
};

export function FellowshipEditorialSpreads({ spreads }: FellowshipEditorialSpreadsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="fellowship-spreads" aria-label="Programme pillars">
      {spreads.map((spread, index) => {
        const reversed = index % 2 === 1;
        return (
          <motion.article
            key={spread.index}
            className={`fellowship-spread ${reversed ? "fellowship-spread--reverse" : ""}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, ease: easeHive }}
          >
            <div className="fellowship-spread__visual">
              <Image
                src={spread.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={index === 0}
              />
              <div className="fellowship-spread__veil" aria-hidden />
              <span className="fellowship-spread__index">{spread.index}</span>
            </div>
            <div className="fellowship-spread__copy">
              <h2 className="fellowship-spread__title">{spread.title}</h2>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

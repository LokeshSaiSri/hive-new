"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipCapstoneBentoProps = {
  capstones: FellowshipOverview["capstones"];
};

export function FellowshipCapstoneBento({ capstones }: FellowshipCapstoneBentoProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="fellowship-capstones" aria-labelledby="fellowship-capstones-heading">
      <div className="section-container fellowship-capstones__head">
        <p className="fellowship-eyebrow">Portfolio</p>
        <h2 id="fellowship-capstones-heading" className="fellowship-headline">
          {capstones.statement} <em>{capstones.emphasis}</em>
        </h2>
      </div>

      <div className="fellowship-capstones__mosaic">
        {capstones.items.map((item, index) => (
          <motion.article
            key={item.index}
            className={`fellowship-capstones__tile ${item.featured ? "is-featured" : ""}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: index * 0.03, ease: easeHive }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={item.featured ? "50vw" : "25vw"}
            />
            <div className="fellowship-capstones__tile-veil" aria-hidden />
            <div className="fellowship-capstones__tile-copy">
              <span>{item.index}</span>
              <h3>{item.shortTitle ?? item.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

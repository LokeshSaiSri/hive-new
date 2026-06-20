"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipTracksRailProps = {
  tracks: FellowshipOverview["tracks"];
};

export function FellowshipTracksRail({ tracks }: FellowshipTracksRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scroll = (dir: -1 | 1) => {
    railRef.current?.scrollBy({ left: dir * railRef.current.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="fellowship-tracks" aria-labelledby="fellowship-tracks-heading">
      <div className="section-container fellowship-tracks__head">
        <div>
          <p className="fellowship-eyebrow fellowship-eyebrow--light">Curriculum</p>
          <h2 id="fellowship-tracks-heading" className="fellowship-headline fellowship-headline--light">
            Four tracks. <em>One marketer.</em>
          </h2>
        </div>
        <div className="fellowship-tracks__nav">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous track">
            ←
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next track">
            →
          </button>
        </div>
      </div>

      <div ref={railRef} className="fellowship-tracks__rail" tabIndex={0}>
        {tracks.map((track, index) => (
          <motion.article
            key={track.id}
            className="fellowship-tracks__card"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: easeHive }}
          >
            <Image src={track.image} alt="" fill className="object-cover" sizes="360px" />
            <div className="fellowship-tracks__card-veil" aria-hidden />
            <div className="fellowship-tracks__card-copy">
              <span>{track.index}</span>
              <h3>{track.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AlumniQuote } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";

type ProgramAlumniSpotlightProps = {
  alumni: AlumniQuote[];
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
};

export function ProgramAlumniSpotlight({
  alumni,
  eyebrow = "Class of 2024–25",
  statement = "Where our alumni",
  emphasis = "are now.",
}: ProgramAlumniSpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const go = useCallback(
    (index: number) => {
      setActive((index + alumni.length) % alumni.length);
    },
    [alumni.length],
  );

  const current = alumni[active];

  return (
    <section className="program-tab-section section-band-light overflow-hidden">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow={eyebrow}
            statement={statement}
            emphasis={emphasis}
            light
            align="left"
          />
        </ScrollReveal>

        <div className="alumni-spotlight mt-10 lg:mt-14">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: easeHive }}
              className="alumni-spotlight__quote"
            >
              <p className="alumni-spotlight__quote-text">&ldquo;{current.quote}&rdquo;</p>
              <footer className="alumni-spotlight__quote-footer">
                <p className="alumni-spotlight__name">{current.name}</p>
                <p className="alumni-spotlight__role">
                  {current.role} · {current.company}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="alumni-spotlight__rail-wrap">
            <div className="alumni-spotlight__rail" role="tablist" aria-label="Alumni stories">
              {alumni.map((person, index) => (
                <button
                  key={person.name}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  onClick={() => setActive(index)}
                  className={`alumni-spotlight__chip ${index === active ? "is-active" : ""}`}
                >
                  <span className="alumni-spotlight__chip-name">{person.name.split(" ")[0]}</span>
                  <span className="alumni-spotlight__chip-meta">{person.company}</span>
                </button>
              ))}
            </div>

            <div className="alumni-spotlight__nav">
              <button type="button" onClick={() => go(active - 1)} className="alumni-spotlight__nav-btn" aria-label="Previous alumni story">
                ←
              </button>
              <span className="alumni-spotlight__count">
                {String(active + 1).padStart(2, "0")} / {String(alumni.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => go(active + 1)} className="alumni-spotlight__nav-btn" aria-label="Next alumni story">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

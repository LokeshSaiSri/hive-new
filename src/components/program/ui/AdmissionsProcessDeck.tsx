"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import type { AdmissionRound } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

const processIntro =
  "We evaluate candidates through conversations and case discussions. We're looking for people with the drive to build in revenue and growth, the clarity to communicate, and the hunger to lead.";

type AdmissionsProcessDeckProps = {
  rounds: AdmissionRound[];
  className?: string;
};

export function AdmissionsProcessDeck({ rounds, className }: AdmissionsProcessDeckProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeRound, setActiveRound] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = rounds[activeRound];
  const progress = ((activeRound + 1) / rounds.length) * 100;

  const advanceNext = useCallback(() => {
    setActiveRound((current) => (current + 1) % rounds.length);
  }, [rounds.length]);

  useAutoAdvance(rounds.length, advanceNext, {
    intervalMs: 4500,
    enabled: !paused && !prefersReducedMotion && rounds.length > 1,
  });

  return (
    <section className={`program-tab-section section-band-light overflow-hidden section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Selection process"
            statement="Three rounds to"
            emphasis="your offer."
            description={processIntro}
            light
            align="left"
          />
        </ScrollReveal>

        <div
          className="admissions-process-deck mt-10 lg:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="admissions-process-deck__progress" aria-hidden>
            <div
              className="admissions-process-deck__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="admissions-process-deck__rounds" role="tablist" aria-label="Admission rounds">
            {rounds.map((round, index) => (
              <button
                key={round.round}
                type="button"
                role="tab"
                aria-selected={index === activeRound}
                onClick={() => setActiveRound(index)}
                className={`admissions-process-deck__round-btn ${
                  index === activeRound ? "is-active" : ""
                }`}
              >
                <span className="admissions-process-deck__round-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="admissions-process-deck__round-label">{round.round}</span>
                <span className="admissions-process-deck__round-title">{round.title}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.round}
              role="tabpanel"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeHive }}
              className="admissions-process-deck__panel"
            >
              <p className="admissions-process-deck__panel-kicker">{current.round}</p>
              <h3 className="admissions-process-deck__panel-title">{current.title}</h3>
              <p className="admissions-process-deck__panel-copy">{current.description}</p>
              <PillButton variant="highlight" tone="dark" href="#apply" className="mt-6">
                Start your application
              </PillButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

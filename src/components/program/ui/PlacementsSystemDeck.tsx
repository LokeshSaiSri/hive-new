"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { PlacementSystemPillar } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type PlacementsSystemDeckProps = {
  pillars: PlacementSystemPillar[];
  intro?: string;
  className?: string;
};

const accentClass = ["is-north", "is-team", "is-rhythm", "is-prep"] as const;

const pillarSignals: Record<string, string[]> = {
  "North Star Metric": ["Target role", "Company tier", "CTC", "Weekly cadence"],
  "Mentor + Placement Lead": ["Joint ownership", "No hand-offs", "1:1 mentor", "Placement lead"],
  "Weekly Reviews": ["Sprint output", "Challenge work", "Interview readiness", "Progress log"],
  "35 Prep Sessions": ["Cases", "Guesstimates", "Mocks", "Negotiation"],
};

function PillarGlyph({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 200 200" fill="none" className="placement-os__glyph-svg" aria-hidden>
        <circle cx="100" cy="96" r="58" stroke="currentColor" strokeWidth="1.5" opacity="0.22" />
        <circle cx="100" cy="96" r="38" stroke="currentColor" strokeWidth="1.75" opacity="0.42" />
        <circle cx="100" cy="96" r="18" fill="currentColor" fillOpacity="0.75" />
        <path d="M100 38 V54 M100 138 V154 M42 96 H58 M142 96 H158" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <rect x="36" y="164" width="24" height="18" rx="4" fill="currentColor" fillOpacity="0.2" />
        <rect x="68" y="152" width="24" height="30" rx="4" fill="currentColor" fillOpacity="0.35" />
        <rect x="100" y="140" width="24" height="42" rx="4" fill="currentColor" fillOpacity="0.5" />
        <rect x="132" y="128" width="24" height="54" rx="4" fill="currentColor" fillOpacity="0.65" />
        <path d="M32 184 H168" stroke="currentColor" strokeWidth="1.25" opacity="0.25" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 200 200" fill="none" className="placement-os__glyph-svg" aria-hidden>
        <ellipse cx="100" cy="94" rx="70" ry="56" stroke="currentColor" strokeWidth="1.25" opacity="0.16" strokeDasharray="4 6" />
        <path d="M100 128 L58 68 M100 128 L142 68 M58 68 L142 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.42" />
        <circle cx="58" cy="68" r="21" stroke="currentColor" strokeWidth="1.75" />
        <path d="M50 62 C54 56, 62 56, 66 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="52" y="68" width="12" height="15" rx="3" fill="currentColor" fillOpacity="0.3" />
        <path d="M54 74 H62 M54 78 H60" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" opacity="0.55" />
        <circle cx="142" cy="68" r="21" stroke="currentColor" strokeWidth="1.75" />
        <path d="M134 62 C138 56, 146 56, 150 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="136" y="68" width="12" height="15" rx="3" fill="currentColor" fillOpacity="0.3" />
        <path d="M138 74 H146 M138 78 H144 M138 82 H146" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" opacity="0.55" />
        <circle cx="100" cy="128" r="23" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="100" cy="122" r="7.5" fill="currentColor" fillOpacity="0.5" />
        <path d="M88 138 C92 144, 108 144, 112 138" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="100" cy="94" r="5" fill="currentColor" fillOpacity="0.7" />
        <path d="M97 94 H103 M100 91 V97" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.85" />
        <path d="M78 158 C90 148, 110 148, 122 158" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.4" />
        <path d="M94 158 L100 170 L106 158" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 200 200" fill="none" className="placement-os__glyph-svg" aria-hidden>
        <rect x="44" y="52" width="112" height="96" rx="12" stroke="currentColor" strokeWidth="1.75" />
        <path d="M44 76 H156" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
        <path d="M76 52 V148 M108 52 V148 M140 52 V148" stroke="currentColor" strokeWidth="1.25" opacity="0.22" />
        {[
          [58, 88],
          [90, 88],
          [122, 88],
          [58, 116],
          [90, 116],
          [122, 116],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="currentColor" fillOpacity={i < 4 ? 0.55 : 0.2} />
        ))}
        <path d="M132 124 L138 130 L150 114" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="52" y="60" width="20" height="8" rx="3" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" fill="none" className="placement-os__glyph-svg" aria-hidden>
      <path d="M44 158 C68 136, 84 150, 100 128 C116 150, 132 136, 156 158" stroke="currentColor" strokeWidth="1.25" opacity="0.2" />
      <g transform="rotate(-16 74 116)">
        <rect x="48" y="92" width="50" height="64" rx="8" stroke="currentColor" strokeWidth="1.4" opacity="0.34" />
        <path d="M58 108 H88 M58 120 H82 M58 132 H86" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.38" />
        <rect x="58" y="142" width="14" height="6" rx="2" fill="currentColor" fillOpacity="0.22" />
      </g>
      <g transform="rotate(-5 98 108)">
        <rect x="72" y="76" width="50" height="64" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.46" />
        <rect x="82" y="90" width="7" height="20" rx="2" fill="currentColor" fillOpacity="0.28" />
        <rect x="93" y="96" width="7" height="14" rx="2" fill="currentColor" fillOpacity="0.42" />
        <rect x="104" y="88" width="7" height="24" rx="2" fill="currentColor" fillOpacity="0.55" />
        <path d="M82 118 H112" stroke="currentColor" strokeWidth="1.1" opacity="0.3" />
      </g>
      <g transform="rotate(7 122 102)">
        <rect x="94" y="66" width="50" height="64" rx="8" stroke="currentColor" strokeWidth="1.65" />
        <rect x="106" y="80" width="16" height="9" rx="4.5" fill="currentColor" fillOpacity="0.24" />
        <path d="M114 89 V101" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path d="M109 101 H119" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path d="M107 107 C111 111, 117 111, 121 107" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      </g>
      <g transform="rotate(17 146 98)">
        <rect x="116" y="58" width="50" height="64" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.62" />
        <path d="M130 80 L146 80 M138 80 V94" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path d="M130 104 L146 104" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" opacity="0.42" />
        <circle cx="138" cy="88" r="3.5" fill="currentColor" fillOpacity="0.55" />
      </g>
      <rect x="126" y="30" width="48" height="30" rx="15" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M140 40 C142.8 40 145 42.2 145 45 C145 47.8 142.8 50 140 50 H138 V40 H140 Z M140 45 V50"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M152 40 H158 V50 H152 V46 H156 M152 40 H156"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M54 166 H146" stroke="currentColor" strokeWidth="1.2" opacity="0.22" />
      {[
        [62, 166],
        [86, 166],
        [110, 166],
        [134, 166],
      ].map(([cx, cy], i) => (
        <circle key={cx} cx={cx} cy={cy} r="3" fill="currentColor" fillOpacity={0.32 + i * 0.1} />
      ))}
    </svg>
  );
}

export function PlacementsSystemDeck({ pillars, intro, className }: PlacementsSystemDeckProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const selectPillar = useCallback((index: number) => {
    setActive(index);
  }, []);

  const advanceNext = useCallback(() => {
    setActive((current) => (current + 1) % pillars.length);
  }, [pillars.length]);

  useAutoAdvance(pillars.length, advanceNext, { enabled: !paused });

  const current = pillars[active];
  const accent = accentClass[active % accentClass.length];
  const signals = pillarSignals[current.title] ?? [];

  return (
    <section className={`program-tab-section placement-os overflow-hidden section-py ${className ?? ""}`}>
      <div className="section-container">
        <div className="placement-os__header">
          <ScrollReveal>
            <SectionIntro
              eyebrow="The placement system"
              statement="Placements are a system"
              emphasis="we run from Day 1."
              light
              align="left"
            />
          </ScrollReveal>

          {intro && (
            <ScrollReveal delay={0.05}>
              <blockquote className="placement-os__intro">{intro}</blockquote>
            </ScrollReveal>
          )}
        </div>

        <ScrollReveal>
          <div
            className="placement-os__console"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="placement-os__console-backdrop" aria-hidden>
              <div className="placement-os__console-mesh" />
              <div className="placement-os__console-grain" />
            </div>

            <div className="placement-os__console-head">
              <div className="placement-os__status">
                <span className="placement-os__status-dot" aria-hidden />
                System live
              </div>
              <p className="placement-os__console-kicker">Man-to-man marking · Day 1 through offer</p>
            </div>

            <div className="placement-os__layout">
              <div className="placement-os__spine" aria-hidden>
                {pillars.map((pillar, index) => (
                  <span
                    key={pillar.index}
                    className={`placement-os__spine-node ${index <= active ? "is-lit" : ""} ${
                      index === active ? "is-active" : ""
                    }`}
                  />
                ))}
              </div>

              <div className="placement-os__rail" role="tablist" aria-label="Placement system layers">
                {pillars.map((pillar, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={pillar.title}
                      suppressHydrationWarning
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectPillar(index)}
                      className={`placement-os__rail-btn ${accentClass[index] ?? ""} ${
                        isActive ? "is-active" : ""
                      }`}
                    >
                      <span className="placement-os__rail-index">{pillar.index}</span>
                      <span className="placement-os__rail-title">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={current.title}
                  role="tabpanel"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.42, ease: easeHive }}
                  className={`placement-os__stage ${accent}`}
                >
                  <span className="placement-os__stage-watermark" aria-hidden>
                    {current.index}
                  </span>

                  <div className="placement-os__stage-grid">
                    <div className="placement-os__art" aria-hidden>
                      <PillarGlyph index={active} />
                    </div>

                    <div className="placement-os__copy">
                      <p className="placement-os__layer-label">
                        Layer {current.index} · {pillars.length} total
                      </p>
                      <h3 className="placement-os__title">{current.title}</h3>
                      <p className="placement-os__description">{current.description}</p>

                      {signals.length > 0 && (
                        <ul className="placement-os__signals" aria-label="What gets tracked">
                          {signals.map((signal) => (
                            <li key={signal}>{signal}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="placement-os__footer" aria-hidden>
              {pillars.map((pillar, index) => (
                <span
                  key={pillar.index}
                  className={`placement-os__footer-dot ${index === active ? "is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

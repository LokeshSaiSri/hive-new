"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { PortfolioDeliverable } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type ProofOfWorkStripProps = {
  items: PortfolioDeliverable[];
  intro?: string;
  className?: string;
};

const accentClass = ["is-a", "is-b", "is-c", "is-d", "is-e"] as const;

const tabLabels = [
  "Brand playbook",
  "Instagram brand",
  "Performance ads",
  "E-commerce audit",
  "Quick commerce",
] as const;

function PortfolioArtifactSvg({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 200 160" fill="none" className="portfolio-vault__artifact-svg" aria-hidden>
        <rect x="28" y="24" width="88" height="112" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <rect x="44" y="36" width="88" height="112" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <rect x="60" y="48" width="88" height="112" rx="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.75" />
        <path d="M76 72 H132 M76 88 H120 M76 104 H124" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="148" cy="52" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
        <path d="M142 52 L146 56 L154 46" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg viewBox="0 0 200 160" fill="none" className="portfolio-vault__artifact-svg" aria-hidden>
        <rect x="62" y="16" width="76" height="128" rx="14" stroke="currentColor" strokeWidth="1.75" />
        <rect x="70" y="28" width="60" height="104" rx="4" fill="currentColor" fillOpacity="0.08" />
        <rect x="76" y="36" width="22" height="22" rx="4" fill="currentColor" fillOpacity="0.22" />
        <rect x="102" y="36" width="22" height="22" rx="4" fill="currentColor" fillOpacity="0.14" />
        <rect x="76" y="62" width="22" height="22" rx="4" fill="currentColor" fillOpacity="0.18" />
        <rect x="102" y="62" width="22" height="22" rx="4" fill="currentColor" fillOpacity="0.28" />
        <circle cx="104" cy="118" r="5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg viewBox="0 0 200 160" fill="none" className="portfolio-vault__artifact-svg" aria-hidden>
        <rect x="24" y="108" width="16" height="36" rx="3" fill="currentColor" fillOpacity="0.2" />
        <rect x="48" y="88" width="16" height="56" rx="3" fill="currentColor" fillOpacity="0.35" />
        <rect x="72" y="72" width="16" height="72" rx="3" fill="currentColor" fillOpacity="0.5" />
        <rect x="96" y="56" width="16" height="88" rx="3" fill="currentColor" fillOpacity="0.65" />
        <path d="M24 52 C56 72, 88 40, 120 60 C136 70, 152 48, 176 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M164 36 L176 36 L176 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="132" y="24" width="52" height="24" rx="6" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
        <path d="M140 36 H176" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg viewBox="0 0 200 160" fill="none" className="portfolio-vault__artifact-svg" aria-hidden>
        <rect x="20" y="40" width="56" height="72" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="72" y="40" width="56" height="72" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <rect x="124" y="40" width="56" height="72" rx="8" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.75" />
        <path d="M36 88 H60 M84 80 H108 M132 72 H156" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <circle cx="48" cy="60" r="10" fill="currentColor" fillOpacity="0.2" />
        <path d="M20 124 H180" stroke="currentColor" strokeWidth="1.25" opacity="0.25" />
        <path d="M148 124 L164 108 M164 108 L180 124" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 160" fill="none" className="portfolio-vault__artifact-svg" aria-hidden>
      <path d="M36 120 H164" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <rect x="40" y="88" width="28" height="32" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.25" />
      <rect x="76" y="80" width="28" height="40" rx="4" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.25" />
      <rect x="112" y="72" width="28" height="48" rx="4" fill="currentColor" fillOpacity="0.38" stroke="currentColor" strokeWidth="1.25" />
      <rect x="148" y="64" width="28" height="56" rx="4" fill="currentColor" fillOpacity="0.48" stroke="currentColor" strokeWidth="1.25" />
      <path d="M156 36 L168 20 L180 36 Z" fill="currentColor" fillOpacity="0.55" />
      <path d="M168 20 V52" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function ProofOfWorkStrip({
  items,
  intro = "By Month 5, you walk into interviews with real work — not theory, not case competitions, not group projects on slides.",
  className,
}: ProofOfWorkStripProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const selectItem = useCallback((index: number) => {
    setActive(index);
  }, []);

  const advanceNext = useCallback(() => {
    setActive((current) => (current + 1) % items.length);
  }, [items.length]);

  useAutoAdvance(items.length, advanceNext, { enabled: !paused });

  useEffect(() => {
    if (prefersReducedMotion || paused) return;

    const rail = railRef.current;
    if (!rail) return;

    let frameId = 0;
    let last = performance.now();
    const speedPxPerSec = 18;

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      if (maxScrollLeft > 0) {
        rail.scrollLeft += delta * speedPxPerSec;
        if (rail.scrollLeft >= maxScrollLeft - 1) {
          rail.scrollLeft = 0;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [paused, prefersReducedMotion, items.length]);

  const current = items[active];
  const accent = accentClass[active % accentClass.length];

  return (
    <section className={`program-tab-section portfolio-vault overflow-hidden ${className ?? ""}`}>
      <div className="portfolio-vault__backdrop" aria-hidden>
        <div className="portfolio-vault__mesh" />
        <div className="portfolio-vault__grain" />
      </div>

      <div className="section-container relative z-10 section-py">
        <div className="portfolio-vault__header">
          <ScrollReveal>
            <SectionIntro
              eyebrow="The portfolio that gets you hired"
              eyebrowClassName="hidden md:block"
              statement="Your proof of work"
              emphasis="is your credential."
              description={intro}
              light={false}
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="portfolio-vault__stats" aria-hidden>
              <span>{items.length} deliverables</span>
              <span>Month 5 ready</span>
              <span>Interview portfolio</span>
            </div>
          </ScrollReveal>
        </div>

        <div
          className="portfolio-vault__body"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <ScrollReveal>
            <div
              ref={railRef}
              className="portfolio-vault__rail"
              role="tablist"
              aria-label="Portfolio deliverables"
            >
              {items.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    suppressHydrationWarning
                    aria-selected={isActive}
                    onClick={() => selectItem(index)}
                    className={`portfolio-vault__rail-btn ${accentClass[index % accentClass.length]} ${isActive ? "is-active" : ""
                      }`}
                  >
                    <span className="portfolio-vault__rail-index">{item.index}</span>
                    <span className="portfolio-vault__rail-label">
                      {tabLabels[index] ?? item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.article
              key={current.title}
              role="tabpanel"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeHive }}
              className={`portfolio-vault__stage ${accent}`}
            >
              <div className="portfolio-vault__stage-accent" aria-hidden />
              <span className="portfolio-vault__stage-watermark" aria-hidden>
                {current.index}
              </span>

              <div className="portfolio-vault__stage-layout">
                <div className="portfolio-vault__stage-copy">
                  <p className="portfolio-vault__stage-kicker">Deliverable {current.index}</p>
                  <h3 className="portfolio-vault__stage-title">{current.title}</h3>
                  <p className="portfolio-vault__stage-description">{current.description}</p>
                </div>

                <div className="portfolio-vault__artifact" aria-hidden>
                  <div className="portfolio-vault__artifact-chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="portfolio-vault__artifact-body">
                    <PortfolioArtifactSvg variant={active} />
                  </div>
                  <div className="portfolio-vault__artifact-badge">Live brief</div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  careerLadder,
  industryColumns,
  revenuePaths,
  supportPaths,
} from "@/data/careerPaths";

const featuredVariants = {
  enter: { opacity: 0, y: 20, scale: 0.94, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, scale: 0.97, filter: "blur(6px)" },
};

const featuredVariantsReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const totalRoles = industryColumns.reduce(
  (sum, col) => sum + col.roles.length,
  0,
);

function ChapterLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
      {children}
    </p>
  );
}

type WhyRevenueSections = {
  contrast?: boolean;
  ladder?: boolean;
  industries?: boolean;
};

type WhyRevenueProps = {
  sections?: WhyRevenueSections;
};

const defaultSections: Required<WhyRevenueSections> = {
  contrast: true,
  ladder: true,
  industries: true,
};

export function WhyRevenue({ sections: sectionsProp }: WhyRevenueProps = {}) {
  const sections = { ...defaultSections, ...sectionsProp };
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const industry = industryColumns[activeIndex] ?? industryColumns[0];

  const selectIndustry = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    [],
  );

  useEffect(() => {
    const panel = sectionRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isInView || industryColumns.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industryColumns.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isInView, isPaused, prefersReducedMotion]);

  return (
    <section id="why-revenue" className="section-band-dark">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Why HiveSchool"
            statement="Why a Revenue-Focused"
            emphasis="Business School?"
            description="Most business schools train you for support functions. We train you for the roles that own the number every business lives or dies by — and that eventually run it."
          />
        </ScrollReveal>

        {sections.contrast && (
          <div id="why-compare" className="scroll-mt-28">
            <ScrollReveal className="mt-14 sm:mt-16">
              <div className="text-center">
                <ChapterLabel>01 · The contrast</ChapterLabel>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  Support functions vs revenue roles
                </h3>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
                <div className="h-full rounded-2xl border border-white/30 bg-white p-8 shadow-[0_16px_38px_rgba(6,15,50,0.12)] sm:p-10 lg:p-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/80">
                    Most MBA programs
                  </p>
                  <h4 className="mt-4 text-3xl font-bold text-ink/60 sm:text-4xl">
                    Support functions
                  </h4>
                  <p className="mt-4 text-base text-mid-gray/90 sm:text-lg">
                    Important work — but rarely on the path to running the business.
                  </p>
                  <ul className="mt-10 space-y-7">
                    {supportPaths.map((path, i) => (
                      <li key={path.title} className="flex gap-5">
                        <span className="mt-0.5 w-8 shrink-0 text-lg font-bold tabular-nums text-ink/15">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-lg font-semibold text-ink/70 sm:text-xl">
                            {path.title}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-mid-gray sm:text-base">
                            {path.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="premium-frame-dark hover-lift-card lg:-translate-y-1">
                  <div className="premium-surface-dark premium-metallic-edge h-full rounded-[calc(1.5rem-1px)] p-8 sm:p-10 lg:p-12">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-glow">
                      HiveSchool
                    </p>
                    <h4 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                      Revenue roles
                    </h4>
                    <p className="mt-4 text-base text-white/65 sm:text-lg">
                      The functions that drive growth, close deals, and lead to the
                      C-suite.
                    </p>
                    <ul className="mt-10 space-y-7">
                      {revenuePaths.map((path, i) => (
                        <li key={path.title} className="flex gap-5">
                          <span className="text-spark-gradient mt-0.5 w-8 shrink-0 text-lg font-bold tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="text-lg font-semibold text-white sm:text-xl">
                              {path.title}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:text-base">
                              {path.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {sections.ladder && (
          <div id="why-ladder" className="scroll-mt-28">
            <ScrollReveal className="mt-14 sm:mt-16">
              <div className="text-center">
                <ChapterLabel>02 · The ladder</ChapterLabel>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  How revenue roles compound
                </h3>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {careerLadder.map((step, i) => (
                  <span key={step} className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={`chip-metallic-dark px-5 py-2.5 text-sm font-semibold sm:px-6 sm:text-base ${i === careerLadder.length - 1
                          ? "text-spark ring-2 ring-blue-glow/40"
                          : "text-white/90"
                        }`}
                    >
                      {step}
                    </span>
                    {i < careerLadder.length - 1 && (
                      <span className="text-white/30" aria-hidden>
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}

        {sections.industries && (
          <div id="why-industries" className="scroll-mt-28" ref={sectionRef}>
            <ScrollReveal className="mt-14 sm:mt-20">
              <div
                className="rounded-2xl border border-white/25 bg-white p-8 shadow-[0_16px_42px_rgba(6,15,50,0.12)] sm:p-12 lg:p-14"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocusCapture={() => setIsPaused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setIsPaused(false);
                  }
                }}
              >
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
                    03 · Where grads land
                  </p>
                  <h3 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
                    {industryColumns.length} industries · {totalRoles} revenue roles
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-base text-mid-gray sm:text-lg">
                    Same revenue DNA — different industries. Explore the role breakdown across tracks.
                  </p>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-start lg:gap-14">
                  {/* Left Column: Rotating Featured Card */}
                  <div className="flex flex-col">
                    <div className="relative flex w-full flex-col overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={industry.industry}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.2}
                          onDragEnd={(e, { offset }) => {
                            const swipe = offset.x;
                            if (swipe < -50) {
                              setActiveIndex((prev) => (prev + 1) % industryColumns.length);
                            } else if (swipe > 50) {
                              setActiveIndex((prev) => (prev - 1 + industryColumns.length) % industryColumns.length);
                            }
                          }}
                          variants={prefersReducedMotion ? featuredVariantsReduced : featuredVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full cursor-grab active:cursor-grabbing"
                        >
                          <div className="card-metallic-dark text-white shadow-[0_24px_56px_rgba(6,15,50,0.24)] ring-2 ring-blue-glow/40 rounded-xl p-6 sm:p-8 w-full">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xl font-bold sm:text-2xl text-white">
                                {industry.industry}
                              </p>
                              <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-glow">
                                {industry.roles.length} roles
                              </span>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                              {industry.tagline}
                            </p>
                            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-glow">
                              Featured track
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Dot Indicators */}
                    {industryColumns.length > 1 && (
                      <div className="mt-6 flex items-center gap-2 self-center lg:self-start">
                        {industryColumns.map((col, index) => {
                          const isActive = index === activeIndex;
                          return (
                            <button
                              key={col.industry}
                              type="button"
                              onClick={() => selectIndustry(index)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                isActive ? "w-6 bg-blue-glow" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                              }`}
                              aria-label={`Show ${col.industry} breakdown`}
                              aria-current={isActive}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Role Breakdown Detail View */}
                  <div className="border-t border-ink/8 pt-10 lg:border-t-0 lg:pt-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={industry.industry}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
                          {industry.industry} · role breakdown
                        </p>
                        <h4 className="mt-5 text-2xl font-bold leading-snug gradient-headline-light sm:text-3xl lg:text-4xl">
                          {industry.tagline}
                        </h4>

                        <ol className="mt-10 space-y-8">
                          {industry.roles.map((role, i) => (
                            <li
                              key={role.title}
                              className="flex gap-6 border-t border-ink/8 pt-8 first:border-t-0 first:pt-0"
                            >
                              <span className="w-12 shrink-0 text-4xl font-bold tabular-nums text-ink/15">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <p className="text-xl font-bold text-ink sm:text-2xl">
                                  {role.title}
                                </p>
                                <p className="mt-2 text-base leading-relaxed text-mid-gray sm:text-lg">
                                  {role.function}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { VideoCard } from "@/components/ui/VideoCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  careerLadder,
  industryColumns,
  revenuePaths,
  supportPaths,
} from "@/data/careerPaths";

const sectionChapters = [
  {
    id: "why-compare",
    step: "01",
    title: "Support vs revenue",
    description: "What most schools train for — and what we train for instead.",
  },
  {
    id: "why-ladder",
    step: "02",
    title: "Career ladder",
    description: "IC → Manager → Director → CEO. The revenue path up.",
  },
  {
    id: "why-industries",
    step: "03",
    title: "4 industries",
    description: "SaaS, D2C, Consumer Tech & FMCG — roles in each track.",
  },
] as const;

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

export function WhyRevenue() {
  const [activeIndustry, setActiveIndustry] = useState(
    industryColumns[0].industry,
  );
  const industryDetailRef = useRef<HTMLDivElement>(null);

  const industry =
    industryColumns.find((col) => col.industry === activeIndustry) ??
    industryColumns[0];

  const scrollToChapter = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const selectIndustry = useCallback(
    (name: string) => {
      setActiveIndustry(name);
      requestAnimationFrame(() => {
        industryDetailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    },
    [],
  );

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

        <ScrollReveal className="mt-8 sm:mt-10">
          <div className="border-y border-white/10 py-6 sm:py-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
              In this section
            </p>
            <div className="section-container mt-5 grid gap-4 sm:grid-cols-3">
                {sectionChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => scrollToChapter(chapter.id)}
                    className="premium-frame-light group w-full text-left transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="card-premium-elevated block p-5 text-center sm:p-6">
                      <span className="text-[10px] font-bold tabular-nums tracking-[0.2em] text-electric-blue">
                        {chapter.step}
                      </span>
                      <p className="mt-3 text-base font-bold text-ink sm:text-lg">
                        {chapter.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-mid-gray">
                        {chapter.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-electric-blue opacity-0 transition-opacity group-hover:opacity-100">
                        Jump to section
                        <span aria-hidden>↓</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
          </div>
        </ScrollReveal>

        <div id="why-compare" className="scroll-mt-28">
          <ScrollReveal className="mt-14 sm:mt-16">
            <div className="text-center">
              <ChapterLabel>01 · The contrast</ChapterLabel>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Support functions vs revenue roles
              </h3>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
              <div className="premium-frame-light hover-lift-card">
                <div className="card-premium-elevated h-full p-8 sm:p-10 lg:p-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
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
                    className={`chip-metallic-dark px-5 py-2.5 text-sm font-semibold sm:px-6 sm:text-base ${
                      i === careerLadder.length - 1
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

        <div id="why-industries" className="scroll-mt-28">
          <ScrollReveal className="mt-14 sm:mt-20">
            <div className="premium-frame-light hover-lift-card">
              <div className="card-premium-elevated p-8 sm:p-12 lg:p-14">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
                    03 · Where grads land
                  </p>
                  <h3 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
                    {industryColumns.length} industries · {totalRoles} revenue roles
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-base text-mid-gray sm:text-lg">
                    Same revenue DNA — different industries. Tap a track to see the
                    full role breakdown.
                  </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {industryColumns.map((col) => {
                    const isActive = col.industry === activeIndustry;
                    return (
                      <button
                        key={col.industry}
                        type="button"
                        onClick={() => selectIndustry(col.industry)}
                        aria-pressed={isActive}
                        className={`rounded-xl p-5 text-left transition-all sm:p-6 ${
                          isActive
                            ? "card-metallic-dark text-white shadow-[0_24px_56px_rgba(6,15,50,0.24)] ring-2 ring-blue-glow/40"
                            : "card-metallic-blue hover:shadow-[0_18px_44px_rgba(6,15,50,0.1)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-base font-bold sm:text-lg ${
                              isActive ? "text-white" : "text-ink/75"
                            }`}
                          >
                            {col.industry}
                          </p>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              isActive
                                ? "bg-white/15 text-blue-glow"
                                : "bg-electric-blue/[0.08] text-electric-blue"
                            }`}
                          >
                            {col.roles.length} roles
                          </span>
                        </div>
                        <p
                          className={`mt-3 line-clamp-2 text-sm leading-relaxed ${
                            isActive ? "text-white/60" : "text-mid-gray"
                          }`}
                        >
                          {col.tagline}
                        </p>
                        <ul className="mt-4 space-y-1.5">
                          {col.roles.map((role) => (
                            <li
                              key={role.title}
                              className={`text-sm font-medium ${
                                isActive ? "text-white/85" : "text-ink/65"
                              }`}
                            >
                              · {role.title}
                            </li>
                          ))}
                        </ul>
                        <p
                          className={`mt-5 text-[10px] font-bold uppercase tracking-[0.16em] ${
                            isActive ? "text-blue-glow" : "text-light-blue"
                          }`}
                        >
                          {isActive ? "Viewing — tap another to switch" : "Tap to explore"}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div
                  ref={industryDetailRef}
                  className="mt-10 scroll-mt-28 border-t border-ink/8 pt-10 lg:mt-12 lg:pt-12"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={industry.industry}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,400px)] lg:items-start lg:gap-14"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
                          {industry.industry} · role breakdown
                        </p>
                        <h4 className="mx-auto mt-5 max-w-2xl text-center text-2xl font-bold leading-snug gradient-headline-light sm:text-3xl lg:mx-0 lg:text-left lg:text-4xl">
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
                      </div>

                      <div className="lg:sticky lg:top-24">
                        <VideoCard
                          videoId={industry.videoId}
                          badge="Grad story"
                          className="shadow-xl"
                        />
                        <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-mid-gray/70">
                          Context clip — roles listed are the focus
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

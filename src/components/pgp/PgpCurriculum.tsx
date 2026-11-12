"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/pgp/CountUp";
import { HeadingReveal } from "@/components/pgp/HeadingReveal";
import { Orbs } from "@/components/pgp/Orbs";
import { PgpEngines } from "@/components/pgp/PgpEngines";
import { PgpModels } from "@/components/pgp/PgpModels";
import { PgpSprints } from "@/components/pgp/PgpSprints";
import { ScrollWordsAuto } from "@/components/pgp/story";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  pgpCurriculumCopy,
  pgpCurriculumStats,
  pgpModelSessionsDefault,
  pgpShortCopy,
} from "@/data/coursePages/pgp-revamp";
import { easeHive } from "@/lib/motion";

function ChapterHead({ n, title, hint }: { n: string; title: string; hint?: string }) {
  return (
    <ScrollReveal>
      <div className="flex flex-col gap-2 border-t border-white/12 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-accent/10 font-serif text-2xl italic text-accent">
            {n}
          </span>
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-white/45">Core function {n}</p>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">{title}</h3>
          </div>
        </div>
        {hint && <p className="text-sm text-white/55">{hint}</p>}
      </div>
    </ScrollReveal>
  );
}

export function PgpCurriculum({ className = "" }: { className?: string }) {
  const { eyebrow, statement, emphasis } = pgpCurriculumCopy;
  const { problem, instead: solution } = pgpShortCopy.curriculum;
  const core = Number(pgpCurriculumStats[0].value);
  const elective = Number(pgpCurriculumStats[1].value);
  const corePct = Math.round((core / (core + elective)) * 100);

  return (
    <section id="curriculum" className={`hive-dark-band isolate !overflow-visible section-py scroll-mt-24 ${className}`}>
      <Orbs />
      <div className="section-container">
        <HeadingReveal>
          <SectionIntro light={false} align="left" eyebrow={eyebrow} statement={statement} emphasis={emphasis} />
        </HeadingReveal>

        {/* The argument lights up as it scrolls past */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/45">The problem</p>
            <ScrollWordsAuto text={problem} className="text-xl font-semibold leading-snug text-white sm:text-2xl" />
          </div>
          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent">What we do instead</p>
            <ScrollWordsAuto text={solution} className="text-xl font-semibold leading-snug text-white sm:text-2xl" />
          </div>
        </div>

        {/* Core function 1 */}
        <div className="mt-16 lg:mt-20">
          <ChapterHead
            n="1"
            title="Business models: twelve industries, taught through their companies."
            hint={`${pgpModelSessionsDefault} sessions and ${pgpModelSessionsDefault * 2} hours per model, unless marked.`}
          />
        </div>
        <div className="mt-6">
          <PgpModels />
        </div>

        <div className="mt-16">
          <PgpEngines />
        </div>

        {/* Core function 2 */}
        <div className="mt-10">
          <ChapterHead n="2" title="Sprints: the work the companies hire for." hint="Core sprints for everyone. Electives by the roles you target." />
        </div>
        <div className="mt-6">
          <PgpSprints />
        </div>

        <ScrollReveal className="mt-10">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {pgpCurriculumStats.map((s) => (
              <div
                key={s.label}
                data-glow
                className={`rounded-2xl border p-5 ${s.highlight ? "border-accent/45 bg-accent/10" : "border-white/12 bg-white/[0.04]"}`}
              >
                <dd className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-1 text-sm text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-3 rounded-2xl border border-white/12 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex h-3 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${core} core sessions and ${elective} elective sessions`}>
              <motion.span
                className="h-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${corePct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: easeHive }}
              />
              <span className="h-full flex-1 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.35)_0_4px,transparent_4px_8px)]" />
            </div>
            <div className="mt-2.5 flex justify-between text-sm">
              <span className="font-semibold text-accent">{core} core, for everyone</span>
              <span className="text-white/65">{elective} electives, by the roles you target</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Every session, mentor and brief is in the handbook.</h3>
              <p className="mt-1 text-white/60">The full cohort 3 breakdown, in one download.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PillButton variant="highlight" href="#apply">Apply now</PillButton>
              <PillButton variant="secondary" href="/PGP-Offline-Brochure.pdf">Download PGP handbook</PillButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

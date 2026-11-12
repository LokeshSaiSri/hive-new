"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { PgpIcon } from "@/components/pgp/PgpIcon";
import { HeadingReveal } from "@/components/pgp/HeadingReveal";
import { Orbs } from "@/components/pgp/Orbs";
import { HorizontalTrack, StoryStage, useCarousel, useSnappedProgress } from "@/components/pgp/story";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pgpTimeline, pgpTimelineCopy, pgpTimelineIcons, pgpTimelineImages } from "@/data/coursePages/pgp-revamp";

const n = pgpTimeline.length;

function PhaseCard({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const t = pgpTimeline[i];
  const img = pgpTimelineImages[i];
  const { rotateY, z, scale, opacity, drift } = useCarousel(progress, i, n);

  return (
    <motion.article
      data-glow
      style={{ rotateY, z, scale, opacity }}
      className="card-metallic-dark relative flex w-[80vw] max-w-[28rem] shrink-0 flex-col overflow-hidden sm:w-[28rem]"
    >
      <div className="relative h-32 shrink-0 overflow-hidden sm:h-44">
        <Image src={img.image} alt={img.alt} fill sizes="(min-width: 640px) 448px, 80vw" className="object-cover" style={{ objectPosition: img.position }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#060f32] via-[#060f32]/30 to-transparent" />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-ink shadow-lg">
          <PgpIcon name={pgpTimelineIcons[i]} className="h-6 w-6" />
        </span>
        <motion.span style={{ x: drift }} aria-hidden className="absolute right-4 top-1 select-none font-serif text-7xl italic leading-none text-white/35 sm:text-8xl">
          {i + 1}
        </motion.span>
        <p className="absolute bottom-2.5 left-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-accent">{t.phase}</p>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">{t.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/75 sm:mt-2 sm:text-[15px]">{t.description}</p>
        <div className="mt-auto pt-3 sm:pt-4">
          <div className="rounded-xl border border-accent/40 bg-accent/10 px-3.5 py-2.5">
            <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-accent">
              <PgpIcon name="gift" className="h-3.5 w-3.5" />
              What ships
            </p>
            <p className="mt-1 text-[0.95rem] font-semibold leading-snug text-white">{t.ships}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setIdx(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))));
  // The rail and the comet follow the snapped position, so they hop from phase to phase with the cards.
  const snapped = useSnappedProgress(progress, n);
  const fill = useTransform(snapped, [0, 1], ["0%", "100%"]);
  const cometLeft = useTransform(snapped, (v) => `calc(1.25rem + (100% - 2.5rem) * ${v})`);

  return (
    <div className="flex h-full flex-col py-3 sm:py-6">
      <HeadingReveal rule={false}>
        <SectionIntro
          light={false}
          align="left"
          eyebrow={pgpTimelineCopy.eyebrow}
          statement={pgpTimelineCopy.statement}
          emphasis={pgpTimelineCopy.emphasis}
          size="default"
        />
      </HeadingReveal>

      {/* Rail */}
      <div className="relative mt-4 sm:mt-6" aria-hidden>
        <span className="absolute left-5 right-5 top-5 h-0.5 bg-white/12 sm:left-6 sm:right-6 sm:top-6" />
        <motion.span style={{ width: fill }} className="absolute left-5 top-5 h-0.5 max-w-[calc(100%-2.5rem)] bg-accent sm:left-6 sm:top-6 sm:max-w-[calc(100%-3rem)]" />
        <motion.span
          style={{ left: cometLeft }}
          className="pgp-pulse absolute top-5 z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff2b8] shadow-[0_0_16px_6px_rgba(255,207,0,0.8)] sm:top-6"
        />
        <ol className="relative flex justify-between">
          {pgpTimeline.map((t, i) => {
            const reached = i <= idx;
            const on = i === idx;
            return (
              <li key={t.phase} className="flex w-10 flex-col items-center sm:w-12">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12 ${
                    on
                      ? "scale-110 border-accent bg-accent text-ink shadow-[0_0_0_6px_rgba(255,207,0,0.2)]"
                      : reached
                        ? "border-accent bg-[#0a1544] text-accent"
                        : "border-white/25 bg-[#0a1544] text-white/55"
                  }`}
                >
                  <PgpIcon name={pgpTimelineIcons[i]} className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative -mx-4 mt-4 flex-1 overflow-hidden sm:mx-0 sm:mt-6">
        <div className="absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#060f32] to-transparent sm:w-16" aria-hidden />
        <div className="absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#060f32] to-transparent sm:w-16" aria-hidden />
        <div className="flex h-full items-center" style={{ perspective: 1500 }}>
          <HorizontalTrack progress={snapped} gap={20}>
            {pgpTimeline.map((t, i) => (
              <PhaseCard key={t.phase} progress={snapped} i={i} />
            ))}
          </HorizontalTrack>
        </div>
      </div>
    </div>
  );
}

function TimelineStatic() {
  return (
    <div className="py-12">
      <SectionIntro
        light={false}
        align="left"
        eyebrow={pgpTimelineCopy.eyebrow}
        statement={pgpTimelineCopy.statement}
        emphasis={pgpTimelineCopy.emphasis}
        description={pgpTimelineCopy.description}
      />
      <ol className="mt-6 grid gap-4 md:grid-cols-2">
        {pgpTimeline.map((t, i) => (
          <li key={t.phase} className="card-metallic-dark p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-accent">{t.phase}</p>
            <h3 className="mt-1.5 text-xl font-bold text-white">{t.title}</h3>
            <p className="mt-2 text-sm text-white/75">{t.description}</p>
            <p className="mt-3 text-sm font-semibold text-accent">Ships: {t.ships}</p>
            <span className="sr-only">Phase {i + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Nine months, seven phases: the phases slide sideways along a gold rail as you scroll. */
export function PgpTimeline({ className = "" }: { className?: string }) {
  return (
    <section id="timeline" className={`hive-dark-band isolate !overflow-visible scroll-mt-24 ${className}`}>
      <Orbs />
      <div className="section-container">
        <StoryStage vh={100 + n * 60} reducedFallback={<TimelineStatic />}>
          {(p) => <Stage progress={p} />}
        </StoryStage>
      </div>
    </section>
  );
}

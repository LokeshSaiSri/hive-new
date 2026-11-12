"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { PgpIcon } from "@/components/pgp/PgpIcon";
import { PgpLogoStack } from "@/components/pgp/PgpLogoStack";
import { HorizontalTrack, StoryStage, useCarousel, useSnappedProgress } from "@/components/pgp/story";
import { pgpBusinessModels, pgpEngineVisuals, pgpRevenueEngines } from "@/data/coursePages/pgp-revamp";

const total = pgpRevenueEngines.length;
/** One intro card, then one card per engine. */
const count = total + 1;

function IntroCard({ progress }: { progress: MotionValue<number> }) {
  const { rotateY, z, scale, opacity } = useCarousel(progress, 0, count);
  return (
    <motion.article
      data-glow
      style={{ rotateY, z, scale, opacity }}
      className="flex w-[78vw] max-w-[24rem] shrink-0 flex-col justify-center rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/20 to-accent/[0.03] p-7 sm:w-[24rem]"
    >
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent">The idea underneath</p>
      <p className="mt-4 flex items-baseline gap-3 font-bold text-white">
        <span className="text-7xl leading-none sm:text-8xl">{pgpBusinessModels.length}</span>
        <span className="text-3xl text-accent">→</span>
        <span className="text-7xl leading-none text-accent sm:text-8xl">{total}</span>
      </p>
      <p className="mt-4 text-lg font-semibold leading-snug text-white">Twelve industries. Eight ways of making money.</p>
      <p className="mt-2 text-sm text-white/65">Spot the engine, then the one number that governs it. Keep scrolling.</p>
    </motion.article>
  );
}

function EngineCard({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const e = pgpRevenueEngines[i];
  const v = pgpEngineVisuals[i];
  const { rotateY, z, scale, opacity, drift } = useCarousel(progress, i + 1, count);

  return (
    <motion.article
      data-glow
      style={{ rotateY, z, scale, opacity }}
      className="card-metallic-dark relative flex w-[78vw] max-w-[24rem] shrink-0 flex-col overflow-hidden p-6 sm:w-[24rem] sm:p-7"
    >
      <motion.span
        aria-hidden
        style={{ x: drift }}
        className="pointer-events-none absolute -right-2 -top-8 select-none font-serif text-[9rem] italic leading-none text-white/[0.07]"
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink">
        <PgpIcon name={v.icon} className="h-7 w-7" />
      </span>
      <h4 className="relative mt-4 text-2xl font-bold leading-tight text-white">{e.name}</h4>

      <p className="relative mt-5 text-[0.66rem] font-bold uppercase tracking-[0.25em] text-white/45">Governing metric</p>
      <ul className="relative mt-2 flex flex-wrap gap-2">
        {e.metric.split(", ").map((m) => (
          <li key={m} className="rounded-lg border border-blue-glow/35 bg-blue-glow/10 px-3 py-1.5 font-mono text-[0.8rem] text-blue-glow">
            {m}
          </li>
        ))}
      </ul>

      <p className="relative mt-5 text-[0.66rem] font-bold uppercase tracking-[0.25em] text-white/45">Who runs on it</p>
      <div className="relative mt-2">
        <PgpLogoStack logos={v.logos} />
      </div>
      <p className="relative mt-2 text-sm leading-relaxed text-white/70">{e.runsOn}</p>
    </motion.article>
  );
}

function Counter({ progress }: { progress: MotionValue<number> }) {
  const text = useTransform(progress, (v) => String(Math.min(total, Math.max(0, Math.round(v * (count - 1))))).padStart(2, "0"));
  return (
    <p className="font-mono text-sm text-white/55">
      <motion.span className="text-accent">{text}</motion.span> / {String(total).padStart(2, "0")}
    </p>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const bar = useTransform(progress, [0, 1], ["0%", "100%"]);
  const snapped = useSnappedProgress(progress, count);
  return (
    <div className="flex h-full flex-col py-4 sm:py-6">
      <div className="flex items-end justify-between gap-4">
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Underneath the twelve: <em className="font-serif italic text-accent">eight revenue engines.</em>
        </h3>
        <Counter progress={progress} />
      </div>

      <div className="relative -mx-4 mt-4 flex-1 overflow-hidden sm:mx-0 sm:mt-6">
        <div className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#060f32] to-transparent sm:w-16" aria-hidden />
        <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#060f32] to-transparent sm:w-16" aria-hidden />
        <div className="flex h-full items-center" style={{ perspective: 1500 }}>
          <HorizontalTrack progress={snapped} gap={16}>
            <IntroCard progress={snapped} />
            {pgpRevenueEngines.map((e, i) => (
              <EngineCard key={e.name} progress={snapped} i={i} />
            ))}
          </HorizontalTrack>
        </div>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <motion.div style={{ width: bar }} className="h-full bg-accent" />
      </div>
    </div>
  );
}

function EnginesStatic() {
  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold text-white sm:text-3xl">
        Underneath the twelve: <em className="font-serif italic text-accent">eight revenue engines.</em>
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pgpRevenueEngines.map((e, i) => (
          <article key={e.name} className="card-metallic-dark p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-ink">
              <PgpIcon name={pgpEngineVisuals[i].icon} className="h-6 w-6" />
            </span>
            <h4 className="mt-3 text-lg font-bold text-white">{e.name}</h4>
            <p className="mt-2 font-mono text-xs text-blue-glow">{e.metric}</p>
            <p className="mt-2 text-sm text-white/65">{e.runsOn}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PgpEngines() {
  return (
    <StoryStage vh={100 + count * 48} reducedFallback={<EnginesStatic />}>
      {(p) => <Stage progress={p} />}
    </StoryStage>
  );
}

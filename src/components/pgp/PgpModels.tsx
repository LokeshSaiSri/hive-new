"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { PgpIcon } from "@/components/pgp/PgpIcon";
import { PgpLogoStack } from "@/components/pgp/PgpLogoStack";
import { StoryStage } from "@/components/pgp/story";
import {
  pgpBusinessModels,
  pgpModelSessionsDefault,
  pgpModelVisuals,
  type BusinessModelGroup,
} from "@/data/coursePages/pgp-revamp";
import { easeHive } from "@/lib/motion";

const n = pgpBusinessModels.length;

const groupDot: Record<BusinessModelGroup, string> = {
  B2B: "bg-blue-glow",
  Consumer: "bg-accent",
  Platforms: "bg-white",
};

function Counter({ idx }: { idx: number }) {
  return (
    <p className="font-mono text-sm text-white/55">
      <span className="text-accent">{String(idx + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
    </p>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.9999)))));
  const bar = useTransform(progress, [0, 1], ["0%", "100%"]);
  const current = pgpBusinessModels[idx];
  const vis = pgpModelVisuals[current.index];
  const sessions = current.sessions ?? pgpModelSessionsDefault;

  return (
    <div className="flex h-full flex-col py-2 sm:py-6">
      <div className="flex items-end justify-between gap-4">
        <h3 className="text-lg font-bold leading-tight tracking-tight text-white sm:text-4xl">
          Business models: <em className="font-serif italic text-accent">twelve industries.</em>
        </h3>
        <Counter idx={idx} />
      </div>

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-3 sm:mt-6 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-1 lg:gap-5">
        {/* The map: tiles light up in turn as you scroll */}
        <ul className="grid grid-cols-4 content-start gap-1.5 sm:gap-3 lg:grid-cols-4">
          {pgpBusinessModels.map((m, i) => {
            const v = pgpModelVisuals[m.index];
            const on = i === idx;
            const done = i < idx;
            return (
              <li
                key={m.index}
                data-glow
                data-tilt
                className={`relative flex flex-col rounded-xl border p-2 transition-all duration-300 sm:rounded-2xl sm:p-3.5 ${
                  on
                    ? "border-accent/70 bg-gradient-to-b from-accent/[0.18] to-accent/[0.03] shadow-[0_14px_36px_rgba(255,207,0,0.14)]"
                    : done
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] opacity-60"
                }`}
              >
                {on && <span aria-hidden className="pgp-pulse pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl" />}
                <span className="flex items-center justify-between">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors sm:h-10 sm:w-10 sm:rounded-xl ${
                      on ? "bg-accent text-ink" : "bg-white/10 text-white/85"
                    }`}
                  >
                    <PgpIcon name={v.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="hidden items-center gap-1.5 font-mono text-[0.7rem] text-white/40 sm:flex">
                    <span className={`h-1.5 w-1.5 rounded-full ${groupDot[m.group]}`} />
                    {m.index}
                  </span>
                </span>
                <span className="mt-1.5 text-[0.62rem] font-bold leading-tight text-white sm:mt-3 sm:text-[0.95rem] sm:leading-snug">
                  <span className="sm:hidden">{m.index}</span>
                  <span className="hidden sm:inline">{v.short}</span>
                </span>
                <span className="mt-auto hidden min-h-9 items-end pt-3 sm:flex">
                  <PgpLogoStack logos={v.logos.slice(0, 3)} size="sm" />
                </span>
              </li>
            );
          })}
        </ul>

        {/* The detail card */}
        <div className="min-h-0">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: easeHive }}
              data-glow
              className="card-metallic-dark relative flex h-full flex-col overflow-hidden p-4 sm:p-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-8 select-none font-serif text-[9rem] italic leading-none text-white/[0.05]"
              >
                {current.index}
              </span>
              <div className="relative flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.25em] text-white/55">
                <span className={`h-2 w-2 rounded-full ${groupDot[current.group]}`} />
                {current.group}
              </div>
              <h4 className="relative mt-1.5 text-xl font-bold leading-tight text-white sm:mt-2 sm:text-2xl">{current.title}</h4>
              <p className="relative mt-2 text-sm leading-relaxed text-white/75 sm:mt-3 sm:text-base">{current.focus}</p>

              {current.companies ? (
                <div className="relative mt-3 sm:mt-5">
                  <PgpLogoStack logos={vis.logos} />
                  <p className="mt-2 text-xs leading-relaxed text-blue-glow sm:mt-3 sm:text-sm">{current.companies}</p>
                </div>
              ) : (
                <p className="relative mt-3 inline-flex w-fit rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/55 sm:mt-5">
                  Case studies announced with the cohort
                </p>
              )}

              <div className="relative mt-auto flex items-center gap-3 border-t border-white/10 pt-3 sm:pt-4">
                <span className="flex gap-1" aria-hidden>
                  {Array.from({ length: pgpModelSessionsDefault }).map((_, k) => (
                    <span key={k} className={`h-2 w-5 rounded-full ${k < sessions ? "bg-accent" : "bg-white/15"}`} />
                  ))}
                </span>
                <span className="text-sm font-semibold text-white/80">
                  {sessions} sessions · {sessions * 2} hours
                </span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 h-1 shrink-0 overflow-hidden rounded-full bg-white/10 sm:mt-4" aria-hidden>
        <motion.div style={{ width: bar }} className="h-full bg-accent" />
      </div>
    </div>
  );
}

function ModelsStatic() {
  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold text-white sm:text-3xl">
        Business models: <em className="font-serif italic text-accent">twelve industries.</em>
      </h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pgpBusinessModels.map((m) => (
          <li key={m.index} className="card-metallic-dark p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-ink">
              <PgpIcon name={pgpModelVisuals[m.index].icon} className="h-5 w-5" />
            </span>
            <h4 className="mt-3 text-lg font-bold text-white">{m.title}</h4>
            <p className="mt-1 text-sm text-white/70">{m.focus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Core function 1: the industry map, stepped through by scrolling. */
export function PgpModels() {
  return (
    <StoryStage vh={100 + n * 34} reducedFallback={<ModelsStatic />}>
      {(p) => <Stage progress={p} />}
    </StoryStage>
  );
}

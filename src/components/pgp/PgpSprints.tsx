"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useTransform, type MotionValue, type Variants } from "framer-motion";
import { PgpIcon } from "@/components/pgp/PgpIcon";
import { StoryStage } from "@/components/pgp/story";
import {
  pgpElectiveTags,
  pgpSprintIcons,
  pgpSprintImages,
  pgpSprintShort,
  pgpSprints,
  type Sprint,
  type SprintItem,
} from "@/data/coursePages/pgp-revamp";
import { easeHive } from "@/lib/motion";

const n = pgpSprints.length;

type Size = "big" | "mid" | "small";
type Entry = { item: SprintItem; tone: "core" | "elective"; tag?: string; size: Size };

/** A topic's weight sets its tile: 10+ sessions is a wide hero tile, a few sessions a standard one, the rest are plain. */
function sizeOf(item: SprintItem): Size {
  if (!item.sessions) return "small";
  return item.sessions >= 10 ? "big" : "mid";
}

function entriesOf(sprint: Sprint): Entry[] {
  const electiveGroups = sprint.groups.filter((g) => g.tone === "elective").length;
  return sprint.groups.flatMap((g) =>
    g.items.map((item) => ({
      item,
      tone: g.tone,
      // Only worth tagging when electives split into branches (Marketing's digital-first and offline-first).
      tag: g.tone === "elective" && electiveGroups > 1 ? pgpElectiveTags[g.label] : undefined,
      size: sizeOf(item),
    })),
  );
}

const cells: Record<Size, number> = { big: 2, mid: 1, small: 1 };

const tileSpan: Record<Size, string> = {
  big: "col-span-2",
  mid: "col-span-1",
  small: "col-span-1",
};

const tileVariants: Variants = {
  hide: { opacity: 0, y: 26, scale: 0.9 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeHive, delay: 0.35 + i * 0.045 },
  }),
};

function Tile({ entry, index, active, sparse, last }: { entry: Entry; index: number; active: boolean; sparse: boolean; last: boolean }) {
  const { item, tone, tag, size } = entry;
  const core = tone === "core";
  const label = pgpSprintShort[item.title] ?? item.title;

  return (
    <motion.li
      custom={index}
      variants={tileVariants}
      initial="hide"
      animate={active ? "show" : "hide"}
      title={item.title}
      data-glow
      className={`${sparse ? `col-span-1 ${last && (index + 1) % 2 === 1 ? "lg:col-span-2" : ""}` : tileSpan[size]} relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border px-3 py-1.5 backdrop-blur-sm lg:rounded-2xl ${
        sparse ? "lg:flex-col lg:items-stretch lg:justify-between lg:p-5" : "lg:px-4 lg:py-3"
      } ${!sparse && size !== "big" ? "lg:flex-col lg:items-stretch lg:justify-between" : ""} ${
        core ? "border-accent/55 bg-gradient-to-br from-accent/30 to-accent/[0.06]" : "border-dashed border-white/35 bg-white/[0.08]"
      }`}
    >
      {tag && <span className="absolute right-2.5 top-1.5 hidden text-[0.55rem] font-bold uppercase tracking-[0.16em] text-white/45 lg:block">{tag}</span>}

      {item.sessions ? (
        <span className="order-2 flex shrink-0 items-baseline gap-1.5 lg:order-1">
          <span
            className={`font-bold leading-none ${core ? "text-accent" : "text-white"} ${
              sparse ? "text-xl lg:text-6xl" : size === "big" ? "text-xl lg:text-5xl" : "text-base lg:text-2xl"
            }`}
          >
            {item.sessions}
          </span>
          {(sparse || size === "big") && <span className="hidden text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50 lg:inline">sessions</span>}
        </span>
      ) : sparse ? (
        <span
          aria-hidden
          className="order-2 text-xl font-bold leading-none text-transparent [-webkit-text-stroke:1.2px_rgba(255,207,0,0.8)] lg:order-1 lg:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : (
        <span className="order-2 hidden h-1.5 w-6 rounded-full bg-white/25 lg:order-1 lg:block" aria-hidden />
      )}

      <span
        className={`order-1 font-semibold leading-tight text-white lg:order-2 ${
          sparse
            ? "text-sm lg:text-3xl lg:font-bold"
            : size === "big"
              ? "text-[0.78rem] lg:text-xl lg:font-bold"
              : size === "mid"
                ? "text-[0.72rem] lg:text-[0.95rem]"
                : "text-[0.7rem] lg:text-sm"
        }`}
      >
        {label}
      </span>
    </motion.li>
  );
}

/** One function, as a full-bleed scene: photo, giant number and title, and its topics as weighted tiles. */
function Scene({ sprint, index, idx }: { sprint: Sprint; index: number; idx: number }) {
  const img = pgpSprintImages[sprint.id];
  const active = index === idx;
  const revealed = index <= idx;
  const entries = entriesOf(sprint);
  // Few topics (Data, Placement, Finance): fewer, bigger tiles, two across.
  const sparse = entries.length <= 5;
  const rows = sparse
    ? Math.ceil(entries.length / 2)
    : Math.max(2, Math.ceil(entries.reduce((sum, e) => sum + cells[e.size], 0) / 4));
  const coreCount = entries.filter((e) => e.tone === "core").length;
  const electiveCount = entries.length - coreCount;

  return (
    <motion.div
      initial={false}
      animate={{ clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)" }}
      transition={{ duration: 0.9, ease: easeHive }}
      style={{ zIndex: index + 1 }}
      className="absolute inset-0"
    >
      <motion.div
        initial={false}
        animate={{ scale: active ? 1 : 1.14 }}
        transition={{ duration: 2.2, ease: easeHive }}
        className="absolute inset-0"
      >
        <Image
          src={img.image}
          alt={img.alt}
          fill
          sizes="100vw"
          className="object-cover saturate-[0.85]"
          style={{ objectPosition: img.position }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[#060f32]/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#060f32]/90 via-[#060f32]/30 to-[#060f32]/80 lg:bg-gradient-to-r lg:from-[#060f32] lg:via-[#060f32]/55 lg:to-[#060f32]/20" />
      <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative flex h-full flex-col lg:grid lg:grid-cols-[0.8fr_1.4fr] lg:gap-4">
        {/* Identity */}
        <div className="relative flex shrink-0 flex-col p-3.5 sm:p-7 lg:justify-between lg:p-9">
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-0 select-none text-[6.5rem] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)] sm:text-[9rem] lg:-left-2 lg:right-auto lg:top-3 lg:text-[15rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <p className="relative hidden text-[0.68rem] font-bold uppercase tracking-[0.3em] text-accent lg:block">
            Sprint {String(index + 1).padStart(2, "0")} of {String(n).padStart(2, "0")}
          </p>

          <div className="relative lg:mt-auto">
            <div className="flex items-center gap-3 lg:block">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-ink sm:h-12 sm:w-12 lg:mb-4">
                <PgpIcon name={pgpSprintIcons[sprint.id]} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <h4 className="text-3xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">{sprint.title}</h4>
            </div>
            <p className="mt-2 hidden max-w-sm text-base leading-snug text-white/75 sm:block">{sprint.tagline}</p>

            <div className="mt-2.5 flex items-center gap-3 sm:mt-5">
              <span className="flex gap-1" aria-hidden>
                {entries.map((e, k) => (
                  <span
                    key={k}
                    className={`h-2 w-2 rounded-full ${e.tone === "core" ? "bg-accent" : "border border-dashed border-white/60"}`}
                  />
                ))}
              </span>
              <span className="text-xs font-semibold text-white/70 sm:text-sm">
                <span className="text-accent">{coreCount} core</span>
                {electiveCount > 0 && ` + ${electiveCount} electives`}
              </span>
            </div>

            {sprint.note && (
              <p className="mt-4 hidden max-w-sm border-l-2 border-accent/60 pl-3 text-sm leading-snug text-white/65 lg:block">
                <span className="font-semibold text-white">{sprint.note.heading}. </span>
                {sprint.note.body}
              </p>
            )}
          </div>
        </div>

        {/* Topics, weighted by sessions */}
        <div className="relative flex min-h-0 flex-1 flex-col p-3 pt-0 sm:p-6 sm:pt-0 lg:justify-center lg:py-6 lg:pl-0 lg:pr-8">
          <ul
            className={`grid grid-flow-dense grid-cols-2 content-start gap-1.5 lg:h-full lg:auto-rows-auto lg:content-center lg:gap-2.5 ${
              sparse
                ? "auto-rows-[4.25rem] sm:auto-rows-[4.5rem] lg:grid-cols-2 lg:[grid-template-rows:repeat(var(--rows),minmax(0,11rem))]"
                : "auto-rows-[2.6rem] sm:auto-rows-[3rem] lg:grid-cols-4 lg:[grid-template-rows:repeat(var(--rows),minmax(0,7.5rem))]"
            }`}
            style={{ "--rows": rows } as CSSProperties}
          >
            {entries.map((e, k) => (
              <Tile key={e.item.title} entry={e} index={k} active={active} sparse={sparse} last={k === entries.length - 1} />
            ))}
          </ul>
          <p className="mt-2 hidden items-center gap-4 text-[0.68rem] text-white/45 lg:flex">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-4 rounded border border-accent/60 bg-accent/25" /> Core, for everyone
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-4 rounded border border-dashed border-white/50" /> Elective, by the role you target
            </span>
            <span>Bigger tile, more sessions</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** The dock along the bottom: where you are across the six functions. */
function Dock({ progress, idx }: { progress: MotionValue<number>; idx: number }) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);
  const cometLeft = useTransform(progress, (v) => `calc(1.25rem + (100% - 2.5rem) * ${v})`);
  return (
    <div className="relative mt-3 sm:mt-4" aria-hidden>
      <span className="absolute left-5 right-5 top-5 h-0.5 bg-white/12" />
      <motion.span style={{ width: fill }} className="absolute left-5 top-5 h-0.5 max-w-[calc(100%-2.5rem)] bg-accent" />
      <motion.span
        style={{ left: cometLeft }}
        className="pgp-pulse absolute top-5 z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff2b8] shadow-[0_0_16px_6px_rgba(255,207,0,0.8)]"
      />
      <ol className="relative flex justify-between">
        {pgpSprints.map((s, i) => {
          const on = i === idx;
          const done = i < idx;
          return (
            <li key={s.id} className="flex w-14 flex-col items-center sm:w-24">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  on
                    ? "scale-110 border-accent bg-accent text-ink shadow-[0_0_0_6px_rgba(255,207,0,0.2)]"
                    : done
                      ? "border-accent bg-[#0a1544] text-accent"
                      : "border-white/25 bg-[#0a1544] text-white/55"
                }`}
              >
                <PgpIcon name={done ? "check" : pgpSprintIcons[s.id]} className="h-4 w-4" />
              </span>
              <span className={`mt-1.5 hidden text-center text-[0.65rem] font-semibold leading-tight sm:block ${on ? "text-white" : "text-white/45"}`}>
                {s.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.9999)))));

  return (
    <div className="flex h-full flex-col py-2 sm:py-5">
      <div className="flex items-end justify-between gap-4">
        <h3 className="text-lg font-bold leading-tight tracking-tight text-white sm:text-3xl">
          Sprints: <em className="font-serif italic text-accent">the work the companies hire for.</em>
        </h3>
        <p className="hidden font-mono text-sm text-white/55 sm:block">
          <span className="text-accent">{String(idx + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
        </p>
      </div>

      <div className="relative mt-2 min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/15 bg-[#060f32] sm:mt-4">
        {pgpSprints.map((s, i) => (
          <Scene key={s.id} sprint={s} index={i} idx={idx} />
        ))}
      </div>

      <Dock progress={progress} idx={idx} />
    </div>
  );
}

function SprintsStatic() {
  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold text-white sm:text-3xl">
        Sprints: <em className="font-serif italic text-accent">the work the companies hire for.</em>
      </h3>
      <div className="mt-6 space-y-5">
        {pgpSprints.map((s) => (
          <div key={s.id} className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
            <h4 className="flex items-center gap-3 text-xl font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-ink">
                <PgpIcon name={pgpSprintIcons[s.id]} className="h-5 w-5" />
              </span>
              {s.title}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {entriesOf(s).map((e) => (
                <li
                  key={e.item.title}
                  className={`rounded-lg border px-3 py-1.5 text-sm text-white ${e.tone === "core" ? "border-accent/50 bg-accent/10" : "border-dashed border-white/30"}`}
                >
                  {pgpSprintShort[e.item.title] ?? e.item.title}
                  {e.item.sessions ? <b className="ml-2 text-accent">{e.item.sessions}</b> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PgpSprints() {
  return (
    <StoryStage vh={100 + n * 62} reducedFallback={<SprintsStatic />}>
      {(p) => <Stage progress={p} />}
    </StoryStage>
  );
}

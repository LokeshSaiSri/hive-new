"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HeadingReveal } from "@/components/pgp/HeadingReveal";
import { Orbs } from "@/components/pgp/Orbs";
import { PgpIcon } from "@/components/pgp/PgpIcon";
import { StoryStage, useWindow } from "@/components/pgp/story";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  pgpBeforeAfterRows,
  pgpFlagshipVisuals,
  pgpJourneyCopy,
  pgpJourneyPersonas,
  pgpLogoPath,
  pgpWhyPillars,
  type JourneyPersona,
} from "@/data/coursePages/pgp-revamp";
import { testimonials } from "@/data/testimonials";
import { easeHive } from "@/lib/motion";

const n = pgpJourneyPersonas.length;
const keyRows = ["What you can show", "What you can run", "What you earn", "Your title"];
const alumni = testimonials.filter((t) => t.image);
const ansh = alumni.find((t) => t.name.startsWith("Ansh"));

/** Photos behind each chapter. The "before" is always a muted cohort shot; each "after" is a different moment. */
const beforePhoto = pgpWhyPillars[1];
const afterPhoto: Record<string, { image: string; alt: string; position: string }> = {
  fresher: pgpWhyPillars[0],
  "sales-exec": { image: pgpFlagshipVisuals["d2c-bazaar"].image, alt: pgpFlagshipVisuals["d2c-bazaar"].imageAlt, position: "50% 40%" },
  "founder-minded": pgpWhyPillars[2],
};

/* ── Chapter: one persona, before → after ────────────────────────────────── */

function Point({
  progress,
  from,
  text,
  tone,
}: {
  progress: MotionValue<number>;
  from: number;
  text: string;
  tone: "before" | "after";
}) {
  const t = useWindow(progress, from, from + 0.05);
  const x = useTransform(t, [0, 1], [tone === "before" ? -24 : 24, 0]);
  return (
    <motion.li style={{ opacity: t, x }} className="flex gap-3 text-[0.95rem] leading-snug sm:text-lg">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          tone === "before" ? "bg-white/10 text-white/50" : "bg-accent text-ink"
        }`}
      >
        <PgpIcon name={tone === "before" ? "arrow" : "check"} className="h-3 w-3" strokeWidth={2.4} />
      </span>
      <span className={tone === "before" ? "text-white/65" : "text-white/90"}>{text}</span>
    </motion.li>
  );
}


/* ── A picture of each persona's numbers ─────────────────────────────────── */

function Tile({ progress, from }: { progress: MotionValue<number>; from: number }) {
  const t = useWindow(progress, from, from + 0.025);
  const scale = useTransform(t, [0, 1], [0.4, 1]);
  return (
    <motion.span style={{ opacity: t, scale }} className="flex aspect-square items-center justify-center rounded-lg bg-accent text-ink">
      <PgpIcon name="check" className="h-4 w-4" strokeWidth={2.6} />
    </motion.span>
  );
}

const afterLogos = ["zomato.png", "nestle.png", "snitch.webp", "epigamia.png"];
const nodePos = ["left-[6%] top-[8%]", "right-[6%] top-[8%]", "left-[6%] bottom-[8%]", "right-[6%] bottom-[8%]"];

/** Right-hand picture for a chapter. Every figure comes from the persona's own copy. */
function PersonaVisual({ id, side, progress, from }: { id: string; side: "before" | "after"; progress: MotionValue<number>; from: number }) {
  const before = side === "before";

  if (id === "fresher") {
    if (before) {
      return (
        <div>
          <ul className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5" aria-label="200 applications, 2 calls back">
            {Array.from({ length: 200 }).map((_, i) => (
              <li key={i} className={`aspect-square rounded-full ${i === 37 || i === 141 ? "bg-accent shadow-[0_0_0_3px_rgba(255,207,0,0.3)]" : "bg-white/20"}`} />
            ))}
          </ul>
          <p className="mt-3 text-sm text-white/55">200 applications. The two gold dots are the calls back.</p>
        </div>
      );
    }
    return (
      <div>
        <ul className="grid grid-cols-6 gap-2" aria-label="24 judged briefs">
          {Array.from({ length: 24 }).map((_, i) => (
            <Tile key={i} progress={progress} from={from + i * 0.006} />
          ))}
        </ul>
        <p className="mt-3 text-sm text-white/70">24 judged briefs, each one something a recruiter can check.</p>
      </div>
    );
  }

  if (id === "sales-exec") {
    if (before) {
      return (
        <div className="space-y-2.5">
          {["Year 1", "Year 2", "Year 3"].map((y) => (
            <div key={y} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5">
              <span className="w-14 text-xs font-bold uppercase tracking-widest text-white/40">{y}</span>
              <span className="text-sm font-semibold text-white/55">Same desk, same title</span>
            </div>
          ))}
          <p className="pt-1 text-sm text-white/55">Hits quota. Cannot explain how the company makes money.</p>
        </div>
      );
    }
    return (
      <div className="space-y-2.5">
        {["Account Executive", "Key Account Manager", "Category Manager"].map((r, i) => (
          <div key={r} className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3.5" style={{ marginLeft: `${i * 14}px` }}>
            <span className="text-sm font-semibold text-white">{r}</span>
            <span className="flex gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent">
              <span className="rounded-full border border-accent/40 px-2 py-0.5">Quota</span>
              <span className="rounded-full border border-accent/40 px-2 py-0.5">P&amp;L</span>
            </span>
          </div>
        ))}
        <p className="pt-1 text-sm text-white/70">Reads any business by its engine and governing metric.</p>
      </div>
    );
  }

  // founder-minded
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-sm">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden>
        {[[17, 14], [83, 14], [17, 61], [83, 61]].map(([x, y]) => (
          <line key={`${x}-${y}`} x1="50" y1="37.5" x2={x} y2={y} stroke={before ? "rgba(255,255,255,0.28)" : "rgba(255,207,0,0.55)"} strokeWidth="0.6" strokeDasharray={before ? "2 2" : undefined} />
        ))}
      </svg>
      <span className={`absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold ${before ? "bg-white/15 text-white/70" : "bg-accent text-ink"}`}>You</span>
      {nodePos.map((pos, i) => (
        <span
          key={pos}
          className={`absolute flex h-14 w-14 items-center justify-center rounded-full ${pos} ${
            before ? "border-2 border-dashed border-white/30" : "bg-white p-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
          }`}
        >
          {!before && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pgpLogoPath(afterLogos[i])} alt="" className="h-full w-full object-contain" loading="lazy" />
          )}
        </span>
      ))}
      <p className={`absolute inset-x-0 -bottom-6 text-center text-sm ${before ? "text-white/55" : "text-white/70"}`}>
        {before ? "No operator network yet." : "Operators from Zomato, Nestlé, Snitch and Epigamia."}
      </p>
    </div>
  );
}

function Chapter({ progress, c, persona }: { progress: MotionValue<number>; c: number; persona: JourneyPersona }) {
  const base = c / n;
  const len = 1 / n;
  const at = (t: number) => base + t * len;

  const opacity = useTransform(
    progress,
    [base - 0.03, base, base + len - 0.03, base + len],
    [c === 0 ? 1 : 0, 1, 1, c === n - 1 ? 1 : 0],
  );
  const wipe = useTransform(progress, [at(0.38), at(0.62)], [0, 100], { clamp: true });
  const clip = useTransform(wipe, (w) => `inset(0 ${100 - w}% 0 0)`);
  const handle = useTransform(wipe, (w) => `${w}%`);
  const handleOpacity = useTransform(wipe, [0, 4, 96, 100], [0, 1, 1, 0]);
  const beforeBig = useWindow(progress, at(0.02), at(0.12));
  const afterBig = useWindow(progress, at(0.6), at(0.7));
  const exampleOpacity = useWindow(progress, at(0.84), at(0.92));

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* Before */}
      <div className="absolute inset-0 grid items-center gap-8 overflow-hidden bg-[#10173a] p-5 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <Image src={beforePhoto.image} alt="" fill sizes="100vw" className="object-cover opacity-[0.16] grayscale" style={{ objectPosition: beforePhoto.position }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#10173a] via-[#10173a]/80 to-[#10173a]/50" />
        <div className="relative">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-white/55">Before Hive</p>
        <motion.p style={{ opacity: beforeBig }} className="mt-4 text-6xl font-bold leading-none tracking-tight text-white/30 sm:text-8xl">
          {persona.contrast.before.big}
        </motion.p>
        <motion.p style={{ opacity: beforeBig }} className="mt-3 max-w-md text-base text-white/60 sm:text-lg">
          {persona.contrast.before.small}
        </motion.p>
        <ul className="mt-7 max-w-lg space-y-3.5 sm:mt-9">
          {persona.before.points.slice(0, 2).map((p, k) => (
            <Point key={p} progress={progress} from={at(0.1 + k * 0.07)} text={p} tone="before" />
          ))}
        </ul>
        </div>
        <motion.div style={{ opacity: beforeBig }} className="relative hidden lg:block">
          <PersonaVisual id={persona.id} side="before" progress={progress} from={at(0.1)} />
        </motion.div>
      </div>

      {/* After, wiped in from the left */}
      <motion.div
        style={{ clipPath: clip }}
        className="absolute inset-0 grid items-center gap-8 overflow-hidden bg-gradient-to-br from-brand-blue to-ink p-5 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
      >
        <Image
          src={afterPhoto[persona.id].image}
          alt={afterPhoto[persona.id].alt}
          fill
          sizes="100vw"
          className="object-cover opacity-45"
          style={{ objectPosition: afterPhoto[persona.id].position }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0c1950] via-[#0c1950]/85 to-[#060f32]/55" />
        <div className="relative">
        <p className="relative text-[0.68rem] font-bold uppercase tracking-[0.3em] text-accent">After Hive</p>
        <motion.p style={{ opacity: afterBig }} className="relative mt-4 text-6xl font-bold leading-none tracking-tight text-accent sm:text-8xl">
          {persona.contrast.after.big}
        </motion.p>
        <motion.p style={{ opacity: afterBig }} className="relative mt-3 max-w-md text-base text-white/80 sm:text-lg">
          {persona.contrast.after.small}
        </motion.p>
        <ul className="relative mt-7 max-w-lg space-y-3.5 sm:mt-9">
          {persona.after.points.slice(0, 2).map((p, k) => (
            <Point key={p} progress={progress} from={at(0.64 + k * 0.07)} text={p} tone="after" />
          ))}
        </ul>
        {persona.example && ansh && (
          <motion.div
            style={{ opacity: exampleOpacity }}
            className="relative mt-5 flex max-w-lg items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-2.5 pr-4 sm:mt-7"
          >
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/20 sm:h-12 sm:w-12">
              <Image src={ansh.image} alt={ansh.name} fill sizes="48px" className="object-cover object-top" />
            </span>
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">{persona.example.name}</span> now works as {persona.example.outcome}
            </span>
          </motion.div>
        )}
        </div>
        <motion.div style={{ opacity: afterBig }} className="relative hidden lg:block">
          <PersonaVisual id={persona.id} side="after" progress={progress} from={at(0.64)} />
        </motion.div>
      </motion.div>

      {/* The wipe handle */}
      <motion.div style={{ left: handle, opacity: handleOpacity }} className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-accent" aria-hidden>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-ink shadow-[0_0_0_6px_rgba(255,207,0,0.25)]">
          <PgpIcon name="arrow" className="h-4 w-4" />
        </span>
      </motion.div>
    </motion.div>
  );
}

function PersonaChips({ idx }: { idx: number }) {
  return (
    <ol className="flex flex-wrap gap-2" aria-label="Who joins the PGP">
      {pgpJourneyPersonas.map((p, i) => (
        <li
          key={p.id}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
            i === idx ? "border-accent bg-accent text-ink" : i < idx ? "border-white/20 bg-white/[0.08] text-white/70" : "border-white/12 text-white/40"
          }`}
        >
          {p.label}
          <span className="ml-1.5 hidden opacity-60 sm:inline">{p.range}</span>
        </li>
      ))}
    </ol>
  );
}

function JourneyStage({ progress }: { progress: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.9999)))));

  return (
    <div className="flex h-full flex-col py-3 sm:py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PersonaChips idx={idx} />
        <p className="hidden items-center gap-2 text-sm text-white/50 sm:flex">
          Keep scrolling <PgpIcon name="arrow" className="h-4 w-4 rotate-90" />
        </p>
      </div>
      <div className="relative mt-3 flex-1 overflow-hidden rounded-3xl border border-white/15 sm:mt-4">
        {pgpJourneyPersonas.map((p, c) => (
          <Chapter key={p.id} progress={progress} c={c} persona={p} />
        ))}
      </div>
    </div>
  );
}

function JourneyStatic() {
  return (
    <div className="space-y-4 py-8">
      {pgpJourneyPersonas.map((p) => (
        <div key={p.id} className="grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl bg-[#10173a] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">Before Hive · {p.label}</p>
            <p className="mt-3 text-5xl font-bold text-white/30">{p.contrast.before.big}</p>
            <p className="mt-2 text-sm text-white/60">{p.contrast.before.small}</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-ink p-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">After Hive</p>
            <p className="mt-3 text-5xl font-bold text-accent">{p.contrast.after.big}</p>
            <p className="mt-2 text-sm text-white/75">{p.contrast.after.small}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Alumni wall: drifts on its own ──────────────────────────────────────── */

function AlumniCard({ p }: { p: (typeof alumni)[number] }) {
  return (
    <li data-glow data-tilt className="w-[12.5rem] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] sm:w-[15rem]">
      <div className="relative aspect-[4/5] bg-surface-muted">
        <Image src={p.image} alt={p.name} fill sizes="240px" className="object-cover object-top" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060f32]/90 to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-3 text-sm font-bold leading-tight text-white">{p.name}</p>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold leading-snug text-white">{p.role}</p>
        <p className="mt-0.5 text-xs text-accent">{p.company}</p>
      </div>
    </li>
  );
}

function AlumniWall() {
  const reduce = useReducedMotion();
  return (
    <div className="pt-4">
      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
        Where they <em className="font-serif italic text-accent">landed.</em>
      </h3>
      <div className="relative -mx-4 mt-6 overflow-hidden sm:mx-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#060f32] to-transparent sm:w-20" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#060f32] to-transparent sm:w-20" aria-hidden />
        {reduce ? (
          <ul className="flex gap-3 overflow-x-auto px-4 pb-3">
            {alumni.map((p) => (
              <AlumniCard key={p.name} p={p} />
            ))}
          </ul>
        ) : (
          <ul className="pgp-marquee flex w-max gap-3 pb-3">
            {[...alumni, ...alumni].map((p, i) => (
              <AlumniCard key={`${p.name}-${i}`} p={p} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Line by line: the old way is struck through as you reach it ─────────── */

function ChangeRow({ row, i }: { row: (typeof pgpBeforeAfterRows)[number]; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: easeHive, delay: (i % 2) * 0.05 }}
      className="grid gap-2 py-5 md:grid-cols-[11rem_1fr_1.3fr] md:items-center md:gap-6"
    >
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">{row.label}</p>
      <p className="relative w-fit text-base text-white/50">
        {row.before}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeHive, delay: 0.45 }}
          className="absolute left-0 right-0 top-1/2 h-0.5 origin-left bg-white/50"
        />
      </p>
      <motion.p
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: easeHive, delay: 0.8 }}
        className="flex items-start gap-2.5 text-lg font-bold leading-snug text-white"
      >
        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
          <PgpIcon name="check" className="h-3 w-3" strokeWidth={2.6} />
        </span>
        {row.after}
      </motion.p>
    </motion.li>
  );
}

export function PgpStudentJourney({ className = "" }: { className?: string }) {
  return (
    <section id="student-journey" className={`hive-dark-band isolate !overflow-visible scroll-mt-24 ${className}`}>
      <Orbs />
      <div className="section-container">
        <div className="pt-12 sm:pt-16">
          <HeadingReveal>
            <SectionIntro
              light={false}
              align="left"
              eyebrow={pgpJourneyCopy.eyebrow}
              statement={pgpJourneyCopy.statement}
              emphasis={pgpJourneyCopy.emphasis}
            />
          </HeadingReveal>
        </div>

        <div className="mt-6">
          <StoryStage vh={100 + n * 115} reducedFallback={<JourneyStatic />}>
            {(p) => <JourneyStage progress={p} />}
          </StoryStage>
        </div>

        <div className="mt-10">
          <AlumniWall />
        </div>

        <div className="pb-12 pt-14 sm:pb-16">
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            What <em className="font-serif italic text-accent">changes.</em>
          </h3>
          <ul className="mt-4 divide-y divide-white/12 border-y border-white/12">
            {pgpBeforeAfterRows.filter((r) => keyRows.includes(r.label)).map((r, i) => (
              <ChangeRow key={r.label} row={r} i={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

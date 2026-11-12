"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { CountUp } from "@/components/pgp/CountUp";
import { HeadingReveal } from "@/components/pgp/HeadingReveal";
import { Orbs } from "@/components/pgp/Orbs";
import { PgpIcon } from "@/components/pgp/PgpIcon";
import { StoryStage, useWindow } from "@/components/pgp/story";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  pgpRoleTrackIcons,
  pgpRoleTrackImages,
  pgpRoleTracks,
  pgpRolesCopy,
  type RoleTrackId,
} from "@/data/coursePages/pgp-revamp";
import { easeHive } from "@/lib/motion";

const n = pgpRoleTracks.length;
const totalRoles = pgpRoleTracks.reduce((sum, t) => sum + t.roles.length, 0);

/** One colour per track: the bar, the photo overlay's accent and every role dot. */
const color: Record<RoleTrackId, { solid: string; text: string }> = {
  growth: { solid: "bg-[#4f7bff]", text: "text-[#8aa6ff]" },
  category: { solid: "bg-[#f4b400]", text: "text-[#ffcf3a]" },
  sales: { solid: "bg-[#22c597]", text: "text-[#5fe0bb]" },
  founder: { solid: "bg-[#a066ff]", text: "text-[#c19bff]" },
};

function BarSegment({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const t = pgpRoleTracks[i];
  const fill = useWindow(progress, i / n, (i + 1) / n);
  const width = useTransform(fill, (v) => `${v * 100}%`);
  return (
    <div className="relative h-8 overflow-hidden rounded-lg bg-white/10 sm:h-10" style={{ flexGrow: t.roles.length, flexBasis: 0 }}>
      <motion.div style={{ width }} className={`absolute inset-y-0 left-0 ${color[t.id].solid}`} />
      <span className="relative flex h-full items-center justify-center text-sm font-bold text-white mix-blend-normal">{t.roles.length}</span>
    </div>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.9999)))));
  const active = pgpRoleTracks[idx];
  const img = pgpRoleTrackImages[active.id];
  const c = color[active.id];

  return (
    <div className="flex h-full flex-col py-3 sm:py-6">
      <HeadingReveal rule={false}>
        <SectionIntro
          light={false}
          align="left"
          eyebrow={pgpRolesCopy.eyebrow}
          statement={pgpRolesCopy.statement}
          emphasis={pgpRolesCopy.emphasis}
          size="default"
        />
      </HeadingReveal>

      <div className="mt-3 flex items-center gap-2 sm:mt-5" aria-hidden>
        <div className="flex flex-1 gap-1.5">
          {pgpRoleTracks.map((t, i) => (
            <BarSegment key={t.id} progress={progress} i={i} />
          ))}
        </div>
        <span className="hidden text-sm font-semibold text-white/60 sm:block">{totalRoles} roles</span>
      </div>

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,0.5fr)_minmax(0,1fr)] gap-3 sm:mt-5 sm:gap-4 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1">
        {/* The photo for this track */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.id}
              initial={{ clipPath: "circle(0% at 50% 62%)", scale: 1.25 }}
              animate={{ clipPath: "circle(90% at 50% 62%)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: easeHive }}
              className="absolute inset-0"
            >
              <Image src={img.image} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: img.position }} />
            </motion.div>
          </AnimatePresence>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#060f32] via-[#060f32]/40 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: easeHive }}
              className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-4 sm:p-7"
            >
              <p className={`text-6xl font-bold leading-none tracking-tight sm:text-8xl ${c.text}`}>
                <CountUp key={active.id} value={String(active.roles.length)} replayKey={active.id} />
              </p>
              <div className="pb-1">
                <span className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-ink ${c.solid}`}>
                  <PgpIcon name={pgpRoleTrackIcons[active.id]} className="h-4 w-4" />
                </span>
                <p className="text-base font-bold leading-snug text-white sm:text-2xl">{active.title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Its roles */}
        <div className="min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.ul
              key={active.id}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-wrap content-start gap-1.5 sm:content-center sm:gap-2.5 lg:h-full"
            >
              {active.roles.map((r) => (
                <motion.li
                  key={r.title}
                  variants={{ hidden: { opacity: 0, y: 14, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  transition={{ duration: 0.4, ease: easeHive }}
                  data-glow className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.07] px-2.5 py-1.5 sm:rounded-xl sm:px-4 sm:py-2.5"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${c.solid}`} />
                  <span className="text-[0.76rem] font-semibold leading-snug text-white sm:text-base">{r.title}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function RolesStatic() {
  return (
    <div className="py-12">
      <SectionIntro light={false} align="left" eyebrow={pgpRolesCopy.eyebrow} statement={pgpRolesCopy.statement} emphasis={pgpRolesCopy.emphasis} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pgpRoleTracks.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/15 bg-white/[0.05] p-5">
            <p className={`font-bold ${color[t.id].text}`}>
              {t.title} · {t.roles.length}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.roles.map((r) => (
                <li key={r.title} className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white">
                  {r.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PgpRoles({ className = "" }: { className?: string }) {
  return (
    <section id="roles" className={`hive-dark-band isolate !overflow-visible scroll-mt-24 ${className}`}>
      <Orbs tone="gold" />
      <div className="section-container">
        <StoryStage vh={100 + n * 80} reducedFallback={<RolesStatic />}>
          {(p) => <Stage progress={p} />}
        </StoryStage>
        <p className="pb-10 pt-4 text-sm leading-relaxed text-white/45 sm:max-w-3xl">{pgpRolesCopy.footnote}</p>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeadingReveal } from "@/components/pgp/HeadingReveal";
import { Orbs } from "@/components/pgp/Orbs";
import { PgpIcon, type PgpIconName } from "@/components/pgp/PgpIcon";
import { ScrollTicker } from "@/components/pgp/ScrollTicker";
import { STAGE_HEIGHT, STAGE_TOP, ScrollWordsAuto } from "@/components/pgp/story";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pgpFlagshipCopy, pgpFlagshipVisuals, pgpFlagships, pgpShortCopy, type FlagshipChallenge } from "@/data/coursePages/pgp-revamp";
import { easeHive } from "@/lib/motion";

const facts: { key: "judgedBy" | "scoreboard" | "youLeaveWith"; label: string; icon: PgpIconName }[] = [
  { key: "judgedBy", label: "Judged by", icon: "users" },
  { key: "scoreboard", label: "Scoreboard", icon: "chart" },
  { key: "youLeaveWith", label: "You leave with", icon: "gift" },
];

/**
 * One flagship. Its box is taller than the card, so the card pins for a while and the next one
 * slides up over it. The photo drifts slower than the page, and the facts appear one by one.
 */
function Slide({ f, last }: { f: FlagshipChallenge; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const v = pgpFlagshipVisuals[f.id];

  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: cover } = useScroll({ target: ref, offset: ["end 70%", "end start"] });
  const imageY = useTransform(pass, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);
  const cardScale = useTransform(cover, [0, 1], reduce || last ? [1, 1] : [1, 0.94]);
  const cardDim = useTransform(cover, [0, 1], reduce || last ? [1, 1] : [1, 0.55]);

  return (
    <div ref={ref} className={reduce || last ? "pb-4" : "h-[calc(100svh-8.2rem+50svh)]"}>
      <motion.div
        style={{ scale: cardScale, opacity: cardDim }}
        className={`${reduce ? "" : `sticky ${STAGE_TOP} ${STAGE_HEIGHT}`} card-metallic-dark flex origin-top flex-col overflow-hidden lg:grid lg:grid-cols-[1.05fr_1fr]`}
      >
        <div className="relative h-[34%] shrink-0 overflow-hidden lg:h-full">
          <motion.div style={{ y: imageY }} className="absolute -inset-x-0 -inset-y-[9%]">
            <Image
              src={v.image}
              alt={v.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: v.position }}
            />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#060f32]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#060f32]/70" />
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-ink sm:text-[0.7rem]">
            <PgpIcon name={v.icon} className="h-4 w-4" />
            Flagship {f.index} · {f.kind}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center p-5 sm:p-8 lg:p-10">
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: easeHive }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            <em className="font-serif italic">{f.name}</em>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: easeHive, delay: 0.1 }}
            className="mt-1.5 text-base font-semibold text-accent sm:text-xl"
          >
            {f.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-2.5 text-[0.82rem] leading-relaxed text-white/75 sm:mt-4 sm:text-base"
          >
            {f.description}
          </motion.p>

          <dl className="mt-3 space-y-2 sm:mt-6 sm:space-y-2.5">
            {facts.map(({ key, label, icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, ease: easeHive, delay: 0.3 + i * 0.12 }}
                data-glow className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2 sm:px-4 sm:py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent sm:h-9 sm:w-9">
                  <PgpIcon name={icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[0.66rem]">{label}</dt>
                  <dd className="text-[0.8rem] font-semibold leading-snug text-white sm:text-sm">{f[key]}</dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>
    </div>
  );
}

export function PgpFlagships({ className = "" }: { className?: string }) {
  const flagships = pgpFlagships.filter((f) => f.enabled);
  const { eyebrow, emphasis } = pgpFlagshipCopy;
  const { problem, instead: solution } = pgpShortCopy.flagships;
  const countWord = ["Zero", "One", "Two", "Three", "Four"][flagships.length] ?? String(flagships.length);

  return (
    <section id="flagships" className={`hive-dark-band isolate !overflow-visible section-py scroll-mt-24 ${className}`}>
      <Orbs tone="gold" />
      <div className="section-container">
        <HeadingReveal>
          <SectionIntro light={false} align="left" eyebrow={eyebrow} statement={`${countWord} days a year`} emphasis={emphasis} />
        </HeadingReveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/45">The problem</p>
            <ScrollWordsAuto text={problem} className="text-xl font-semibold leading-snug text-white sm:text-2xl" />
          </div>
          <div>
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent">What we do instead</p>
            <ScrollWordsAuto text={solution} className="text-xl font-semibold leading-snug text-white sm:text-2xl" />
          </div>
        </div>

        <ScrollTicker className="-mx-4 mt-10 sm:mx-0" words={flagships.map((f) => f.name)} />

        <div className="mt-6">
          {flagships.map((f, i) => (
            <Slide key={f.id} f={f} last={i === flagships.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { HeadingReveal } from "@/components/pgp/HeadingReveal";
import { Orbs } from "@/components/pgp/Orbs";
import { ScrollWords, StoryStage, useWindow } from "@/components/pgp/story";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pgpShortCopy, pgpWhy, pgpWhyPillars } from "@/data/coursePages/pgp-revamp";

/** A full-bleed photo with a line of text that lights up word by word as you scroll. */
function Scene({
  progress,
  show,
  words,
  image,
  alt,
  position,
  label,
  text,
  mark,
  muted,
}: {
  progress: MotionValue<number>;
  show: [number, number, number, number];
  words: [number, number];
  image: string;
  alt: string;
  position: string;
  label: string;
  text: string;
  mark: string;
  muted?: boolean;
}) {
  const opacity = useTransform(progress, show, [0, 1, 1, 0]);
  const scale = useTransform(progress, [show[0], show[3]], [1.12, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className={`object-cover ${muted ? "grayscale" : ""}`}
          style={{ objectPosition: position }}
        />
      </motion.div>
      <div aria-hidden className={`absolute inset-0 ${muted ? "bg-[#060f32]/75" : "bg-gradient-to-t from-[#060f32] via-[#060f32]/70 to-[#060f32]/30"}`} />
      <span
        aria-hidden
        className={`pointer-events-none absolute right-6 top-2 select-none text-[12rem] font-bold leading-none ${
          muted ? "text-white/[0.08]" : "text-accent/[0.18]"
        }`}
      >
        {mark}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10">
        <p className={`text-xs font-bold uppercase tracking-[0.3em] ${muted ? "text-white/60" : "text-accent"}`}>{label}</p>
        <ScrollWords
          text={text}
          progress={progress}
          range={words}
          className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-5xl"
        />
      </div>
    </motion.div>
  );
}

function PillarCard({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const p = pgpWhyPillars[i];
  const t = useWindow(progress, 0.66 + i * 0.09, 0.78 + i * 0.09);
  const y = useTransform(t, [0, 1], [80, 0]);
  const scale = useTransform(t, [0, 1], [0.92, 1]);

  return (
    <motion.li data-glow style={{ opacity: t, y, scale }} className="relative min-h-0 overflow-hidden rounded-2xl border border-white/15">
      <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" style={{ objectPosition: p.position }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#060f32] via-[#060f32]/55 to-transparent" />
      <span aria-hidden className="absolute right-3 top-1 select-none font-serif text-6xl italic leading-none text-white/25 sm:text-8xl">
        {p.index}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6">
        <h3 className="text-base font-bold leading-snug text-white sm:text-2xl">{p.title}</h3>
        <p className="mt-1 text-[0.78rem] leading-snug text-white/80 sm:mt-2 sm:text-base">{p.line}</p>
      </div>
    </motion.li>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const bar = useTransform(progress, [0, 1], ["0%", "100%"]);
  const { problem, instead } = pgpShortCopy.why;
  const [a, b] = pgpWhyPillars;
  const sceneOpacity = useTransform(progress, [0.62, 0.7], [1, 0]);

  return (
    <div className="flex h-full flex-col py-3 sm:py-6">
      <HeadingReveal rule={false}>
        <SectionIntro light={false} align="left" eyebrow={pgpWhy.eyebrow} statement={pgpWhy.statement} emphasis={pgpWhy.emphasis} size="default" />
      </HeadingReveal>

      <div className="relative mt-4 flex-1 sm:mt-6">
        <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0 overflow-hidden rounded-3xl border border-white/12">
          <Scene
            progress={progress}
            show={[0, 0.05, 0.3, 0.36]}
            words={[0.03, 0.26]}
            image={b.image}
            alt={b.alt}
            position="50% 65%"
            label="The problem"
            text={problem}
            mark="✗"
            muted
          />
          <Scene
            progress={progress}
            show={[0.34, 0.4, 0.58, 0.66]}
            words={[0.38, 0.56]}
            image={a.image}
            alt={a.alt}
            position="50% 35%"
            label="What we do instead"
            text={instead}
            mark="✓"
          />
        </motion.div>

        <ol className="absolute inset-0 grid grid-rows-3 gap-3 md:grid-cols-3 md:grid-rows-1 md:gap-4">
          {pgpWhyPillars.map((p, i) => (
            <PillarCard key={p.index} progress={progress} i={i} />
          ))}
        </ol>
      </div>

      <div className="mt-3 h-1 shrink-0 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <motion.div style={{ width: bar }} className="h-full bg-accent" />
      </div>
    </div>
  );
}

function WhyStatic() {
  const { problem, instead } = pgpShortCopy.why;
  return (
    <div className="py-12">
      <SectionIntro light={false} align="left" eyebrow={pgpWhy.eyebrow} statement={pgpWhy.statement} emphasis={pgpWhy.emphasis} size="default" />
      <p className="mt-6 text-xl font-semibold text-white">{problem}</p>
      <p className="mt-3 text-xl font-semibold text-accent">{instead}</p>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {pgpWhyPillars.map((p) => (
          <li key={p.index} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#060f32] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-white/80">{p.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** "Built for the roles that run businesses": two photo scenes, then three photo cards. */
export function PgpWhy({ className = "" }: { className?: string }) {
  return (
    <section id="why" className={`hive-dark-band isolate !overflow-visible scroll-mt-24 ${className}`}>
      <Orbs />
      <div className="section-container">
        <StoryStage vh={340} reducedFallback={<WhyStatic />}>
          {(p) => <Stage progress={p} />}
        </StoryStage>
      </div>
    </section>
  );
}

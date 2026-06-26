"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { youtubeThumbnail } from "@/lib/youtube";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TabGroup } from "@/components/ui/TabGroup";
import { VideoCard } from "@/components/ui/VideoCard";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollHorizontal } from "@/components/ui/ScrollHorizontal";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { programmes } from "@/data/programmes";

const programmeTabs = ["Undergraduate", "PGP", "Fellowship"] as const;
type ProgrammeTab = (typeof programmeTabs)[number];

const tabToId: Record<ProgrammeTab, string> = {
  Undergraduate: "ug",
  PGP: "pgp",
  Fellowship: "ai-marketing",
};

function ProgrammeShowcase({
  programme,
  dark = false,
}: {
  programme: (typeof programmes)[number];
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <VideoCard videoId={programme.videoId} badge={programme.badge} large />
      <div className="min-w-0">
        <h3 className={`text-section font-bold ${dark ? "gradient-headline-dark" : "gradient-headline-light"}`}>
          {programme.title}
        </h3>
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/60" : "text-mid-gray"}`}>
          {programme.description}
        </p>
        <dl className="mt-8 space-y-4">
          {[
            ["Eligibility", programme.eligibility],
            ["Format", programme.format],
            ["Duration", programme.duration],
            ["Status", programme.status],
          ].map(([label, val]) => (
            <div
              key={label}
              className={`flex justify-between gap-4 border-b pb-4 ${
                dark ? "border-white/10" : "border-ink/8"
              }`}
            >
              <dt className={dark ? "text-white/50" : "text-mid-gray"}>{label}</dt>
              <dd
                className={`text-right font-semibold ${
                  label === "Status"
                    ? dark
                      ? "text-blue-glow"
                      : "text-light-blue"
                    : dark
                      ? "text-white"
                      : "text-ink"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-4">
          <PillButton variant="highlight" tone={dark ? "dark" : "light"} href={programme.enrolHref}>
            Enrol Now
          </PillButton>
          <PillButton variant="secondary" tone={dark ? "dark" : "light"} href={programme.learnMoreHref}>
            Learn More
          </PillButton>
        </div>
      </div>
    </motion.div>
  );
}

function ProgrammeCard({
  programme,
}: {
  programme: (typeof programmes)[number];
}) {
  return (
    <article className="group premium-frame-light w-[min(420px,calc(100vw-2.5rem))] shrink-0 transition-transform duration-300 hover:-translate-y-1 sm:w-[min(480px,calc(100vw-3rem))]">
      <div className="card-premium-elevated flex h-full flex-col overflow-hidden">
        <VideoCard
          videoId={programme.videoId}
          badge={programme.badge}
          flush
          className="sm:[&_button]:rounded-none"
        />

        <div className="flex flex-1 flex-col p-5 sm:p-5">
          <span className="inline-flex w-fit rounded-full border border-electric-blue/15 bg-electric-blue/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-electric-blue">
            {programme.status}
          </span>

          <h3 className="mt-3 text-lg font-bold leading-[1.15] tracking-tight gradient-headline-light sm:text-xl">
            {programme.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mid-gray">
            {programme.description}
          </p>

          <dl className="mt-4 divide-y divide-ink/[0.06] border-y border-ink/[0.06] text-sm">
            {[
              ["Eligibility", programme.eligibility],
              ["Format", programme.format],
              ["Duration", programme.duration],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between gap-4 py-2">
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-mid-gray">
                  {label}
                </dt>
                <dd className="text-right font-semibold text-ink">{val}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            <PillButton variant="primary" tone="light" href={programme.enrolHref}>
              Enrol
            </PillButton>
            <PillButton variant="secondary" tone="light" href={programme.learnMoreHref}>
              Learn more
            </PillButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProgrammeThumb({
  programme,
  active,
  onClick,
}: {
  programme: (typeof programmes)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full overflow-hidden rounded-2xl text-left transition hover-lift-card ${
        active ? "ring-2 ring-white ring-offset-2 ring-offset-ink" : "opacity-85 hover:opacity-100"
      }`}
    >
      <div className="relative aspect-video">
        <Image
          src={youtubeThumbnail(programme.videoId, "hqdefault")}
          alt={programme.title}
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="absolute bottom-0 p-5">
          <span className="chip-metallic-blue px-2 py-0.5 text-[10px] font-bold uppercase text-ink">
            {programme.badge}
          </span>
          <p className="mt-2 text-lg font-bold text-white">{programme.title}</p>
        </div>
      </div>
    </button>
  );
}

export function Programmes({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<ProgrammeTab>("PGP");
  const activeProgramme =
    programmes.find((p) => p.id === tabToId[activeTab]) ?? programmes[1];

  return (
    <section id="programmes" className={`section-band-dark ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Programmes"
            statement="Choose your"
            emphasis="path at HiveSchool."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <TabGroup
            tabs={programmeTabs}
            active={activeTab}
            onChange={setActiveTab}
            dark
          />
        </ScrollReveal>

        <div className="mt-12 min-h-[480px]">
          <AnimatePresence mode="wait">
            <ProgrammeShowcase
              key={activeProgramme.id}
              programme={activeProgramme}
              dark
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-12 sm:mt-16 sm:pt-14">
        <div className="section-container mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 sm:text-xs sm:tracking-[0.28em]">
            Explore all programmes
          </p>
        </div>
        <ScrollHorizontal durationScale={1.1}>
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.id} programme={programme} />
          ))}
        </ScrollHorizontal>
      </div>
    </section>
  );
}

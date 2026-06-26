"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CohortStory } from "@/data/coursePages/cohortStories";
import { easeHive } from "@/lib/motion";
import { scrollWithinContainer } from "@/lib/scrollWithinContainer";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { StoryTheatrePlayer } from "./StoryTheatrePlayer";

type ProgramCohortVoicesProps = {
  stories: CohortStory[];
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
  className?: string;
};

export function ProgramCohortVoices({
  stories,
  eyebrow = "Class of 2024–25",
  statement = "Where our alumni",
  emphasis = "are now.",
  className,
}: ProgramCohortVoicesProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsVideoPlaying(playing);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      scrollWithinContainer(filmstripRef.current, thumbRefs.current[index], {
        axis: "x",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion],
  );

  const selectIndex = useCallback(
    (index: number) => {
      setActive(index);
      scrollToIndex(index);
    },
    [scrollToIndex],
  );

  const go = useCallback(
    (index: number) => {
      const next = (index + stories.length) % stories.length;
      selectIndex(next);
    },
    [selectIndex, stories.length],
  );

  const advanceNext = useCallback(() => {
    go(active + 1);
  }, [active, go]);

  useAutoAdvance(stories.length, advanceNext, {
    enabled: !isVideoPlaying,
    resetKey: String(active),
  });

  if (stories.length === 0) return null;

  const current = stories[active];

  return (
    <section className={`program-tab-section program-cohort-voices hive-dark-band overflow-hidden ${className ?? ""}`}>
      <div className="program-cohort-voices__mesh" aria-hidden />
      <div className="section-container relative z-10 section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow={eyebrow}
            statement={statement}
            emphasis={emphasis}
            description="Real quotes and video stories from the cohort — in their own words."
            light={false}
            align="left"
          />
        </ScrollReveal>

        <div className="program-cohort-voices__stage mt-10 lg:mt-14">
          <div className="program-cohort-voices__hero">
            <div className="program-cohort-voices__copy-col">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.name}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: easeHive }}
                  className="program-cohort-voices__copy-panel"
                >
                  <p className="program-cohort-voices__quote-mark" aria-hidden>
                    “
                  </p>
                  <blockquote className="program-cohort-voices__quote">
                    <p>{current.quote}</p>
                  </blockquote>

                  <footer className="program-cohort-voices__meta">
                    <div className="program-cohort-voices__meta-photo">
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover object-[50%_12%]"
                        sizes="72px"
                      />
                    </div>
                    <div>
                      <p className="program-cohort-voices__name">{current.name}</p>
                      <p className="program-cohort-voices__role">
                        {current.role} · {current.company}
                      </p>
                    </div>
                  </footer>

                  {stories.length > 1 && (
                    <div className="program-cohort-voices__nav">
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => go(active - 1)}
                        className="program-cohort-voices__nav-btn"
                        aria-label="Previous student story"
                      >
                        ←
                      </button>
                      <span className="program-cohort-voices__count">
                        {String(active + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => go(active + 1)}
                        className="program-cohort-voices__nav-btn"
                        aria-label="Next student story"
                      >
                        →
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${current.name}-${current.videoId ?? "photo"}`}
                className="program-cohort-voices__media-col"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: easeHive }}
              >
                {current.videoId ? (
                  <div className="premium-frame-dark program-cohort-voices__player-frame">
                    <div className="premium-surface-dark premium-metallic-edge program-cohort-voices__player-surface">
                      <StoryTheatrePlayer
                        videoId={current.videoId}
                        name={current.name}
                        onPlayingChange={handlePlayingChange}
                      />
                      <p className="program-cohort-voices__now-playing">
                        <span className="program-cohort-voices__now-playing-label">
                          {isVideoPlaying ? "Now playing" : "Student voice"}
                        </span>
                        {current.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="premium-frame-dark program-cohort-voices__photo-frame">
                    <div className="premium-surface-dark premium-metallic-edge program-cohort-voices__photo-surface">
                      <div className="program-cohort-voices__photo-wrap">
                        <Image
                          src={current.image}
                          alt={current.name}
                          fill
                          className="object-cover object-[50%_12%]"
                          sizes="(max-width: 1024px) 100vw, 480px"
                          priority={active === 0}
                        />
                        <div className="program-cohort-voices__photo-scrim" aria-hidden />
                      </div>
                      {current.companyLogo && (
                        <div className="program-cohort-voices__company">
                          <Image
                            src={current.companyLogo}
                            alt={current.company}
                            width={120}
                            height={36}
                            className="h-7 w-auto object-contain opacity-90"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {stories.length > 1 && (
            <div
              ref={filmstripRef}
              className="program-cohort-voices__filmstrip"
              role="tablist"
              aria-label="Cohort stories"
            >
              {stories.map((story, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={story.name}
                    suppressHydrationWarning
                    ref={(node) => {
                      thumbRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectIndex(index)}
                    className={`program-cohort-voices__thumb ${isActive ? "is-active" : ""}`}
                  >
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover object-[50%_12%]"
                      sizes="96px"
                    />
                    <span className="program-cohort-voices__thumb-scrim" aria-hidden />
                    {story.videoId && (
                      <span className="program-cohort-voices__thumb-play" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    )}
                    <span className="program-cohort-voices__thumb-name">
                      {story.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

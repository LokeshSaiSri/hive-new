"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { PortraitCard } from "@/components/ui/PortraitCard";
import type { Testimonial } from "@/data/testimonials";
import { easeHive } from "@/lib/motion";
import { scrollWithinContainer } from "@/lib/scrollWithinContainer";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { StoryTheatrePlayer } from "./StoryTheatrePlayer";

type ProgramStoryTheatreProps = {
  stories: Testimonial[];
  label?: string;
};

export function ProgramStoryTheatre({ stories, label }: ProgramStoryTheatreProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsVideoPlaying(playing);
  }, []);

  const advanceNext = useCallback(() => {
    setActive((current) => {
      const next = (current + 1) % stories.length;
      scrollWithinContainer(filmstripRef.current, thumbRefs.current[next], {
        axis: "x",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      return next;
    });
  }, [prefersReducedMotion, stories.length]);

  useAutoAdvance(stories.length, advanceNext, {
    enabled: !isVideoPlaying,
    resetKey: String(active),
  });

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

  const goPrev = useCallback(() => {
    setActive((current) => {
      const next = (current - 1 + stories.length) % stories.length;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, stories.length]);

  const goNext = useCallback(() => {
    setActive((current) => {
      const next = (current + 1) % stories.length;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, stories.length]);

  if (stories.length === 0) return null;

  const current = stories[active];

  return (
    <div className="program-story-theatre">
      <div className="section-container">
        {label && <p className="program-story-theatre__label">{label}</p>}

        <div className="program-story-theatre__hero">
          <div className="program-story-theatre__aside">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.name}
                className="program-story-theatre__hero-card"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: 16 }}
                transition={{ duration: 0.45, ease: easeHive }}
              >
                <PortraitCard
                  image={current.image}
                  name={current.name}
                  role={`${current.role} @ ${current.company}`}
                  size="large"
                  metallic
                  className="w-full"
                />
              </motion.div>
            </AnimatePresence>

            <div className="program-story-theatre__copy">
              <p className="program-story-theatre__quote-mark" aria-hidden>
                “
              </p>
              <p className="program-story-theatre__name">{current.name}</p>
              <p className="program-story-theatre__role">
                {current.role}
                <span className="program-story-theatre__role-at"> @ {current.company}</span>
              </p>

              {stories.length > 1 && (
                <div className="program-story-theatre__hero-nav">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={goPrev}
                    className="program-story-theatre__hero-nav-btn"
                    aria-label="Previous story"
                  >
                    ←
                  </button>
                  <span className="program-story-theatre__hero-count">
                    {String(active + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={goNext}
                    className="program-story-theatre__hero-nav-btn"
                    aria-label="Next story"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

          {current.videoId && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.videoId}
                className="program-story-theatre__player-wrap"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: easeHive }}
              >
                <div className="premium-frame-dark program-story-theatre__player-frame">
                  <div className="premium-surface-dark premium-metallic-edge program-story-theatre__player-surface">
                    <StoryTheatrePlayer
                      videoId={current.videoId}
                      name={current.name}
                      onPlayingChange={handlePlayingChange}
                    />
                    <p className="program-story-theatre__now-playing">
                      <span className="program-story-theatre__now-playing-label">
                        {isVideoPlaying ? "Now playing" : "Up next"}
                      </span>
                      {current.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {stories.length > 1 && (
          <div
            ref={filmstripRef}
            className="program-story-theatre__filmstrip"
            role="tablist"
            aria-label="Student stories"
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
                  className={`program-story-theatre__thumb ${isActive ? "is-active" : ""}`}
                >
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover object-[50%_12%]"
                    sizes="96px"
                  />
                  <span className="program-story-theatre__thumb-scrim" aria-hidden />
                  <span className="program-story-theatre__thumb-play" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="program-story-theatre__thumb-name">{story.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

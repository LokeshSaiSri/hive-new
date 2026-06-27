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

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.videoId ?? current.name}
              className="program-story-theatre__player-wrap"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: easeHive }}
            >
              <div className="premium-frame-dark program-story-theatre__player-frame">
                <div className="premium-surface-dark premium-metallic-edge program-story-theatre__player-surface">
                  {current.videoId ? (
                    <StoryTheatrePlayer
                      videoId={current.videoId}
                      name={current.name}
                      onPlayingChange={handlePlayingChange}
                    />
                  ) : (
                    <div className="relative h-full w-full bg-[#060f32]">
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover object-top opacity-50"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                      {current.quote && (
                        <div className="absolute inset-0 bg-black/40 z-0" aria-hidden />
                      )}
                      {current.quote && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center z-10 pointer-events-none pb-12">
                          <svg className="w-8 h-8 text-white/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                          <p className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-relaxed">
                            {current.quote}
                          </p>
                        </div>
                      )}
                      {current.linkedin && (
                        <div className="absolute bottom-6 inset-x-0 flex justify-center z-20">
                          <a
                            href={current.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium backdrop-blur-sm"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            Connect on LinkedIn
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="program-story-theatre__now-playing">
                    <span className="program-story-theatre__now-playing-label">
                      {current.videoId ? (isVideoPlaying ? "Now playing" : "Up next") : "Featured Story"}
                    </span>
                    {current.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
                  {story.videoId ? (
                    <span className="program-story-theatre__thumb-play" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="program-story-theatre__thumb-play" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </span>
                  )}
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

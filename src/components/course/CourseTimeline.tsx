"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CourseTimelineStage } from "@/components/course/CourseTimelineStage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig, CourseTimelinePhase } from "@/data/coursePages/types";
import { asset } from "@/lib/assets";

type CourseTimelineProps = {
  timeline: NonNullable<CoursePageConfig["timeline"]>;
  className?: string;
};

function ReducedPhaseCard({
  phase,
  index,
}: {
  phase: CourseTimelinePhase;
  index: number;
}) {
  const chapter = String(index + 1).padStart(2, "0");

  return (
    <article className="curriculum-fallback-card premium-frame-dark overflow-hidden">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={asset(phase.image)}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 960px"
        />
        <div className="curriculum-stage__scrim" aria-hidden />
      </div>
      <div className="premium-surface-dark p-6 sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-glow">
          {phase.phase}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white">{phase.title}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-spark">
              In programme
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              {phase.tags.map((tag) => (
                <li key={tag}>• {tag}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-glow">
              What you ship
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{phase.description}</p>
          </div>
        </div>
        <span className="mt-4 inline-block text-[10px] font-bold tracking-[0.2em] text-white/30">
          {chapter}
        </span>
      </div>
    </article>
  );
}

export function CourseTimeline({ timeline, className }: CourseTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const phases = timeline.phases;
  const total = phases.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const desktopRailRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spine, setSpine] = useState({ top: 0, height: 0 });

  const scrollPerPhaseVh = 165;
  const pinHeight = `${100 + Math.max(0, total - 1) * scrollPerPhaseVh}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.94, 1], [1, 0, 0, 0]);
  const spineFillHeight = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  const measureSpine = useCallback(() => {
    const list = listRef.current;
    const dots = dotRefs.current;
    if (!list || dots.length === 0) return;

    const first = dots[0];
    const last = dots[dots.length - 1];
    if (!first || !last) return;

    const listRect = list.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();

    const top = firstRect.top + firstRect.height / 2 - listRect.top;
    const bottom = lastRect.top + lastRect.height / 2 - listRect.top;

    setSpine({ top, height: Math.max(0, bottom - top) });
  }, []);

  useLayoutEffect(() => {
    measureSpine();

    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(() => measureSpine());
    observer.observe(list);
    window.addEventListener("resize", measureSpine);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureSpine);
    };
  }, [measureSpine, phases.length, activeIndex]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const scrollIndex = p * Math.max(1, total - 1);
    setActiveIndex(Math.min(total - 1, Math.floor(scrollIndex + 1e-4)));
  });

  useEffect(() => {
    const rail = mobileRailRef.current;
    const active = rail?.querySelector<HTMLButtonElement>(`[aria-current="step"]`);
    if (!rail || !active) return;

    const target = active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    const rail = desktopRailRef.current;
    const active = rail?.querySelector<HTMLButtonElement>(`[aria-current="step"]`);
    if (!rail || !active) return;

    const target =
      active.offsetTop - rail.clientHeight / 2 + active.clientHeight / 2;
    rail.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  }, [activeIndex]);

  const scrollToPhase = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const progress = total <= 1 ? 0 : index / (total - 1);
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const scrollable = container.offsetHeight - window.innerHeight;
      const target = scrollTop + progress * scrollable;

      window.scrollTo({ top: target, behavior: "smooth" });
      setActiveIndex(index);
    },
    [total],
  );

  if (prefersReducedMotion) {
    return (
      <section id="timeline" className={`section-band-light section-py ${className ?? ""}`}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={timeline.eyebrow}
              statement={timeline.statement}
              emphasis={timeline.emphasis}
              light
              align="center"
            />
          </ScrollReveal>
          <div className="mt-12 space-y-8">
            {phases.map((phase, index) => (
              <ScrollReveal key={phase.phase} delay={index * 0.04}>
                <ReducedPhaseCard phase={phase} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className={`curriculum-theatre section-band-light section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={timeline.eyebrow}
            statement={timeline.statement}
            emphasis={timeline.emphasis}
            light
            align="center"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-mid-gray sm:text-lg">
            Scroll through each phase — foundations on the left, live output on the right.
          </p>
        </ScrollReveal>
      </div>

      <div ref={containerRef} className="relative" style={{ height: pinHeight }}>
        <div className="sticky top-0 z-10 h-svh overflow-hidden">
          <div className="flex h-full flex-col">
            <motion.p
              className="section-container shrink-0 px-4 pt-5 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray sm:px-6"
              style={{ opacity: hintOpacity }}
            >
              Scroll to walk the programme
            </motion.p>

            <div className="curriculum-theatre__mobile-rail">
              <div ref={mobileRailRef} className="curriculum-theatre__mobile-track">
                {phases.map((phase, index) => (
                  <button
                    key={phase.phase}
                    type="button"
                    suppressHydrationWarning
                    className={`curriculum-rail-pill ${index === activeIndex ? "is-active" : ""
                      } ${index < activeIndex ? "is-past" : ""}`}
                    onClick={() => scrollToPhase(index)}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span className="curriculum-rail-pill__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="curriculum-rail-pill__label">{phase.phase}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="section-container relative flex min-h-0 flex-1 items-center px-4 pb-8 pt-2 sm:px-6 sm:pb-10">
              <div className="curriculum-theatre__layout">
                <aside
                  ref={desktopRailRef}
                  className="curriculum-theatre__rail"
                  aria-label="Programme phases"
                >
                  <p className="curriculum-theatre__rail-kicker">Programme map</p>

                  <ol ref={listRef} className="curriculum-theatre__rail-list">
                    {spine.height > 0 && (
                      <div
                        className="curriculum-theatre__spine-track"
                        style={{ top: spine.top, height: spine.height }}
                        aria-hidden
                      >
                        <div className="curriculum-theatre__spine-bg" />
                        <motion.div
                          className="curriculum-theatre__spine-fill"
                          style={{ height: spineFillHeight }}
                        />
                      </div>
                    )}

                    {phases.map((phase, index) => {
                      const isActive = index === activeIndex;
                      const isPast = index < activeIndex;

                      return (
                        <li key={phase.phase} className="curriculum-theatre__rail-row">
                          <div className="curriculum-theatre__marker" aria-hidden>
                            <span
                              ref={(node) => {
                                dotRefs.current[index] = node;
                              }}
                              className={`curriculum-theatre__dot ${isActive ? "is-active" : ""
                                } ${isPast ? "is-past" : ""}`}
                            />
                          </div>

                          <button
                            type="button"
                            suppressHydrationWarning
                            className={`curriculum-theatre__rail-btn ${isActive ? "is-active" : ""
                              } ${isPast ? "is-past" : ""}`}
                            onClick={() => scrollToPhase(index)}
                            aria-current={isActive ? "step" : undefined}
                          >
                            <span className="curriculum-theatre__rail-num">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="curriculum-theatre__rail-copy">
                              <span className="curriculum-theatre__rail-phase">
                                {phase.phase}
                              </span>
                              <span className="curriculum-theatre__rail-title">
                                {phase.title}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </aside>

                <div className="curriculum-theatre__stage-wrap">
                  <div className="premium-frame-dark curriculum-theatre__stage-frame">
                    <div className="relative h-[min(640px,72svh)] w-full sm:h-[min(680px,76svh)]">
                      {phases.map((phase, index) => (
                        <CourseTimelineStage
                          key={phase.phase}
                          phase={phase}
                          index={index}
                          total={total}
                          scrollYProgress={scrollYProgress}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="curriculum-theatre__progress" aria-hidden>
                    {phases.map((phase, index) => (
                      <span
                        key={phase.phase}
                        className={`curriculum-theatre__progress-bar ${index === activeIndex ? "is-active" : ""
                          } ${index < activeIndex ? "is-past" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

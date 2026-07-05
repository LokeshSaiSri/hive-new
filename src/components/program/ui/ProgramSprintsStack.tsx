"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ExperientialStackCard } from "@/components/ui/ExperientialStackCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { FeaturePanel } from "@/data/features";

function StackProgress({
  scrollYProgress,
  total,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total - 1, Math.round(p * (total - 1))));
  });

  return (
    <div className="pointer-events-none absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 sm:bottom-4">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            active === i ? "w-10 bg-brand-blue" : "w-3 bg-ink/15"
          }`}
        />
      ))}
    </div>
  );
}

type ProgramSprintsStackProps = {
  panels: FeaturePanel[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ProgramSprintsStack({ panels, eyebrow, title, description }: ProgramSprintsStackProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelCount = panels.length;
  // ~1.5 viewport scrolls of runway per card transition
  const scrollPerCardVh = 220;
  const pinHeight = `${100 + Math.max(0, panelCount - 1) * scrollPerCardVh}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06, 0.92, 1], [1, 0, 0, 0]);

  if (prefersReducedMotion) {
    return (
      <div className="bg-white pb-16 sm:pb-20 lg:pb-24">
        {eyebrow || title ? (
          <div className="section-container mb-12 pt-12 lg:pt-16">
            <ScrollReveal className="section-header-center">
              {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
              {title && (
                <h2 className="text-section font-bold leading-[1.08] tracking-tight text-ink">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-mid-gray sm:text-lg">
                  {description}
                </p>
              )}
            </ScrollReveal>
          </div>
        ) : null}
        
        <div className="section-container space-y-8">
          {panels.map((panel, i) => (
            <ScrollReveal key={panel.id} delay={i * 0.05}>
              <article className="premium-frame-dark overflow-hidden hover-lift-card">
                <div className="premium-surface-dark premium-metallic-edge rounded-[calc(1.5rem-1px)] p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-glow">
                  {panel.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">{panel.title}</h3>
                <p className="mt-3 text-white/65">{panel.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Dynamic Header Section */}
      {(eyebrow || title) && (
        <section className="pt-12 lg:pt-20 pb-4">
          <div className="section-container">
            <ScrollReveal className="section-header-center">
              {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
              {title && (
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink max-w-4xl mx-auto">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mx-auto mt-6 max-w-2xl text-base text-mid-gray sm:text-lg">
                  {description}
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* The Animated Stack */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: pinHeight }}
      >
        <div className="sticky top-0 z-10 h-svh overflow-hidden">
          <div className="relative flex h-full flex-col">
            <motion.p
              className="section-container shrink-0 px-4 pt-6 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray sm:px-6 sm:pt-8"
              style={{ opacity: hintOpacity }}
            >
              Scroll to move through each sprint
            </motion.p>

            <div className="relative flex min-h-0 flex-1 items-center px-2 pb-10 pt-3 sm:px-4 sm:pb-12 lg:px-5">
              <div className="relative mx-auto h-[min(800px,82svh)] w-full max-w-[min(92rem,98vw)]">
                {panels.map((panel, i) => (
                  <ExperientialStackCard
                    key={panel.id}
                    panel={panel}
                    index={i}
                    total={panelCount}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              <StackProgress scrollYProgress={scrollYProgress} total={panelCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { handsOnPanels } from "@/data/features";

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

export function ExperientialStack() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelCount = handsOnPanels.length;
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
        <div className="section-container space-y-8">
          {handsOnPanels.map((panel, i) => (
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
    <div
      ref={containerRef}
      className="relative bg-white"
      style={{ height: pinHeight }}
    >
      <div className="sticky top-0 z-10 h-svh overflow-hidden">
        <div className="relative flex h-full flex-col">
          <motion.p
            className="section-container shrink-0 px-4 pt-6 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray sm:px-6 sm:pt-8"
            style={{ opacity: hintOpacity }}
          >
            Scroll to move through each pillar
          </motion.p>

          <div className="section-container relative flex min-h-0 flex-1 items-center px-4 pb-10 pt-3 sm:px-6 sm:pb-12">
            <div className="relative mx-auto h-[min(680px,78svh)] w-full max-w-[min(72rem,96vw)]">
              {handsOnPanels.map((panel, i) => (
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
  );
}

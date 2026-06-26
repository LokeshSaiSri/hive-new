"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { easeHive } from "@/lib/motion";
import { scrollWithinContainer } from "@/lib/scrollWithinContainer";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

export type ProgramShowcaseItem = {
  id: string;
  title: string;
  subtitle: string;
  thumb?: string;
  panel: ReactNode;
};

type ProgramSplitShowcaseProps = {
  items: ProgramShowcaseItem[];
  label?: string;
  className?: string;
  resetKey?: string;
  tone?: "light" | "dark";
};

export function ProgramSplitShowcase({
  items,
  label,
  className = "",
  resetKey,
  tone = "dark",
}: ProgramSplitShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = items.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(0);
  }, [resetKey]);

  const scrollToIndex = useCallback(
    (index: number) => {
      scrollWithinContainer(listRef.current, itemRefs.current[index], {
        axis: "y",
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

  const advanceNext = useCallback(() => {
    setActive((current) => (current + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((current) => {
      const next = (current - 1 + total) % total;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, total]);

  const goNext = useCallback(() => {
    setActive((current) => {
      const next = (current + 1) % total;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, total]);

  useAutoAdvance(total, advanceNext, { resetKey });

  if (total === 0) return null;

  const current = items[active];

  return (
    <div className={`program-showcase program-showcase--${tone} ${className}`}>
      <div className="section-container">
        {label && <p className="program-showcase__label">{label}</p>}

        <div className="program-showcase__layout">
          <aside className="program-showcase__index-wrap">
            <div ref={listRef} className="program-showcase__index" role="tablist" aria-label={label}>
              {items.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectIndex(index)}
                    className={`program-showcase__index-item ${isActive ? "is-active" : ""}`}
                  >
                    <span className="program-showcase__index-no" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="program-showcase__index-copy">
                      <span className="program-showcase__index-title">{item.title}</span>
                      <span className="program-showcase__index-sub">{item.subtitle}</span>
                    </span>
                    {item.thumb && (
                      <span className="program-showcase__index-thumb">
                        <Image
                          src={item.thumb}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="program-showcase__stage">
            <div
              className={
                tone === "dark"
                  ? "program-showcase__stage-frame premium-frame-dark"
                  : "program-showcase__stage-frame program-showcase__stage-frame--light"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className="program-showcase__stage-panel"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.42, ease: easeHive }}
                >
                  {current.panel}
                </motion.div>
              </AnimatePresence>
            </div>

            {total > 1 && (
              <div className="program-showcase__stage-nav">
                <button
                  type="button"
                  onClick={goPrev}
                  className="program-showcase__stage-link"
                  aria-label="Previous"
                >
                  Previous
                </button>
                <span className="program-showcase__stage-count" aria-live="polite">
                  {String(active + 1).padStart(2, "0")}
                  <span className="program-showcase__stage-count-total">
                    {" "}
                    / {String(total).padStart(2, "0")}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  className="program-showcase__stage-link"
                  aria-label="Next"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

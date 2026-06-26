"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HeroStudentFeatured } from "@/components/ui/HeroStudentCard";
import { heroStudents } from "@/data/hero";
import type { Testimonial } from "@/data/testimonials";
import { asset } from "@/lib/assets";
import { easeHive, durationStandard } from "@/lib/motion";

const ROTATE_MS = 7000;

const featuredVariants = {
  enter: { opacity: 0, y: 20, scale: 0.94, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, scale: 0.97, filter: "blur(6px)" },
};

const featuredVariantsReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

type HeroStudentCollageProps = {
  students?: Testimonial[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  previewMode?: boolean;
  className?: string;
};

export function HeroStudentCollage({
  students = heroStudents,
  activeIndex: activeIndexProp,
  onActiveChange,
  previewMode = false,
  className = "",
}: HeroStudentCollageProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = activeIndexProp !== undefined;
  const activeIndex = isControlled ? activeIndexProp : internalIndex;
  const active = students[activeIndex] ?? students[0];

  const setActiveIndex = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    onActiveChange?.(index);
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isInView || students.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((activeIndex + 1) % students.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, isInView, isPaused, prefersReducedMotion, students.length]);

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durationStandard, ease: easeHive }}
      className={`hero-student-panel h-full rounded-2xl border border-white/10 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/65">
            Student Stories
          </p>
          <h2 className="mt-0.5 text-lg font-bold text-white sm:text-xl">
            Hear from the cohort
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/75">
          {students.length} videos
        </span>
      </div>

      <div className="flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="relative flex min-h-[360px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/[0.03] p-4 sm:min-h-[400px] sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.name}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                const swipe = offset.x;
                if (swipe < -50) {
                  setActiveIndex((activeIndex + 1) % students.length);
                } else if (swipe > 50) {
                  setActiveIndex((activeIndex - 1 + students.length) % students.length);
                }
              }}
              variants={prefersReducedMotion ? featuredVariantsReduced : featuredVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: easeHive }}
              className="flex w-full flex-col items-center"
            >
              <HeroStudentFeatured
                src={active.image}
                name={active.name}
                role={active.role}
                company={active.company}
                companyLogo={active.companyLogo}
                videoId={active.videoId}
                previewMode={previewMode}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {students.length > 1 && (
          <div className="mt-5 flex items-center gap-1.5">
            {students.map((student, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={student.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-5 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Show ${student.name}'s story`}
                  aria-current={isActive}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 px-5 py-3.5">
        <Image
          src={asset("images/misc/shark-tank.png")}
          alt="Shark Tank India"
          width={32}
          height={32}
          className="h-8 w-8 shrink-0 object-contain"
        />
        <p className="text-xs font-semibold text-white/75">
          <span className="font-bold text-white">Shark Tank India</span> · Season 4
        </p>
      </div>
    </motion.div>
  );
}

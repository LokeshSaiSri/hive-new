"use client";

import Image from "next/image";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CourseVisualStoryProps = {
  pillars: NonNullable<CoursePageConfig["pillars"]>;
  audience: NonNullable<CoursePageConfig["audience"]>;
  highlights: NonNullable<CoursePageConfig["highlights"]>;
  paths: NonNullable<CoursePageConfig["paths"]>;
};

// ---------------------------------------------------------
// SECTION 1: PILLARS (Why this is different)
// Layout: Modern Asymmetric Bento Grid
// ---------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HorizontalScrollPillars({ pillars }: { pillars: any }) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Maps the vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]); // Assuming 4 items

  return (
    <section ref={targetRef} className="relative h-[400vh] section-band-light">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-[7.5vw] md:px-[10vw]">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {pillars.items.map((pillar: any) => (
            <div
              key={pillar.index}
              className="w-[85vw] md:w-[80vw] shrink-0 h-[70vh] flex items-center justify-center"
            >
              <div className="group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:shadow-[0_30px_80px_rgba(0,0,0,0.08)] w-full h-full flex flex-col md:flex-row">
                {/* Image (Top on mobile, Right on desktop) */}
                {pillar.image && (
                  <div className="w-full md:w-7/12 relative h-[45%] md:h-full bg-ink/5 overflow-hidden order-1 md:order-2">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover transform group-hover:scale-[1.05] transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                    {/* Gradient blend to seamlessly transition from white bg to image */}
                    <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
                    <div className="block md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </div>
                )}
                
                {/* Content (Bottom on mobile, Left on desktop) */}
                <div className="w-full md:w-5/12 p-6 sm:p-10 md:p-16 flex flex-col justify-center relative z-10 bg-white order-2 md:order-1 h-[55%] md:h-full">
                  <p className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.25em] md:tracking-[0.3em] text-electric-blue mb-3 md:mb-6">
                    {pillar.index}
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-ink leading-[1.1] mb-3 md:mb-6">
                    {pillar.title}
                  </h3>
                  {pillar.tagline && (
                    <p className="text-lg md:text-2xl font-bold text-ink/80 mb-3 md:mb-6">{pillar.tagline}</p>
                  )}
                  {pillar.description && (
                    <p className="text-sm md:text-xl text-mid-gray leading-relaxed line-clamp-3 md:line-clamp-none">
                      {pillar.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// SECTION 2: AUDIENCE (Outdated vs Real Marketing)
// Layout: Parallax Overlap Stacked Cards
// ---------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StackedCard({ item, index }: { item: any; index: number }) {
  // Calculates dynamic top position so cards stack on top of each other beautifully
  const topOffset = `calc(12vh + ${index * 24}px)`;

  return (
    <div className="sticky pt-4 sm:pt-8 w-full" style={{ top: topOffset, zIndex: index }}>
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] bg-ink border border-white/10 p-6 sm:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-16 items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        {item.image && (
          <div className="relative w-full lg:w-1/2 h-48 sm:h-64 lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 shadow-xl sm:shadow-2xl">
            {/* Full bleed cover for high visual impact on large stacked cards */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="relative z-10 flex flex-col justify-center flex-1 w-full">
          <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-3 sm:mb-4">
            {item.index}
          </p>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 sm:mb-6">
            {item.title}
          </h3>
          {item.tagline && (
            <p className="text-base sm:text-xl font-bold text-white/90 mb-3 sm:mb-4">{item.tagline}</p>
          )}
          {item.description && (
            <p className="text-sm sm:text-lg lg:text-xl leading-relaxed text-white/60 line-clamp-4 lg:line-clamp-none">
              {item.description}
            </p>
          )}
        </div>
      </motion.article>
    </div>
  );
}

// ---------------------------------------------------------
// SECTION 3: HIGHLIGHTS (How you'll learn)
// Layout: Interactive Sticky-Scroll Timeline
// ---------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TimelineHighlights({ highlights }: { highlights: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative mt-12 sm:mt-20 max-w-6xl mx-auto py-10">
      {/* Background Track */}
      <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-1 bg-ink/5 transform md:-translate-x-1/2 rounded-full" />
      {/* Progress Line */}
      <motion.div
        className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-electric-blue transform md:-translate-x-1/2 origin-top rounded-full"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="flex flex-col gap-20 sm:gap-32">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {highlights.items.map((item: any, index: number) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.index}
              className={`relative flex flex-col md:flex-row gap-6 sm:gap-12 items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute left-4 sm:left-6 md:left-1/2 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-white border-2 sm:border-4 border-electric-blue transform -translate-x-[6px] sm:-translate-x-[10px] md:-translate-x-1/2 shadow-[0_0_10px_rgba(40,112,255,0.4)] sm:shadow-[0_0_20px_rgba(40,112,255,0.4)] z-10"
              />

              <div
                className={`w-full md:w-1/2 pl-12 sm:pl-20 md:pl-0 ${
                  isEven ? "md:pr-20 text-left md:text-right" : "md:pl-20 text-left"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <p className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.2em] text-electric-blue mb-2 sm:mb-3">
                    {item.index}
                  </p>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-ink mb-3 sm:mb-6 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-lg lg:text-xl text-mid-gray leading-relaxed">
                    {item.subtitle}
                  </p>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 pl-12 sm:pl-20 md:pl-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: isEven ? -1 : 1 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[4/3] rounded-xl sm:rounded-[2rem] overflow-hidden shadow-xl sm:shadow-2xl bg-ink/5"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// SECTION 4: PATHS (Choose your path)
// Layout: Glassmorphic Interactive Hover Cards
// ---------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PathCard({ path, index }: { path: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative h-[350px] sm:h-[450px] lg:h-[550px] w-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl"
    >
      {/* Immersive Background Image */}
      {path.image && (
        <Image
          src={path.image}
          alt={path.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      )}
      
      {/* Heavy Gradient Overlay for pristine text readability and premium feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
        <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-3 sm:mb-4 sm:opacity-70 sm:group-hover:opacity-100 transform sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-500 ease-out">
          {path.index}
        </p>
        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 transform sm:group-hover:-translate-y-2 transition-transform duration-500 ease-out">
          {path.title}
        </h3>
        {path.tagline && (
          <p className="text-sm sm:text-lg lg:text-xl text-white/90 font-bold mb-3 sm:mb-4 transform sm:group-hover:-translate-y-2 transition-transform duration-500 delay-75 ease-out line-clamp-2">
            {path.tagline}
          </p>
        )}

        {path.description && (
          <p className="text-white/70 text-xs sm:text-sm lg:text-base mt-2 mb-4 sm:mb-6 sm:h-0 sm:opacity-0 sm:group-hover:h-auto sm:group-hover:opacity-100 transform sm:translate-y-8 sm:group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3">
            {path.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 transform sm:translate-y-8 opacity-100 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-150">
          {path.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------
// MAIN COMPONENT EXPORT
// ---------------------------------------------------------
export function CourseVisualStory({
  pillars,
  audience,
  highlights,
  paths,
}: CourseVisualStoryProps) {
  return (
    <div className="visual-story bg-ink">
      
      {/* 1. PILLARS INTRO (Light Band) */}
      <section className="section-band-light pt-16 sm:pt-24" aria-label={pillars.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={pillars.eyebrow}
              statement={pillars.statement}
              emphasis={pillars.emphasis}
              light
              align="center"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 1. PILLARS SCROLL */}
      <HorizontalScrollPillars pillars={pillars} />

      {/* 2. AUDIENCE (Dark Band) */}
      <section className="bg-ink section-py relative" aria-label={audience.eyebrow}>
        <div className="section-container relative z-10">
          <ScrollReveal>
            <SectionIntro
              eyebrow={audience.eyebrow}
              statement={audience.statement}
              emphasis={audience.emphasis}
              light={false}
              align="center"
            />
          </ScrollReveal>

          {/* Wrapper for the stacked cards area to allow sticky scrolling */}
          <div className="mt-16 pb-32">
            <div className="flex flex-col gap-6 relative">
              {audience.items.map((item, index) => (
                <StackedCard key={item.index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTS (Light Band) */}
      <section className="bg-white section-py" aria-label={highlights.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={highlights.eyebrow}
              statement={highlights.statement}
              emphasis={highlights.emphasis}
              light
              align="center"
            />
          </ScrollReveal>

          <TimelineHighlights highlights={highlights} />
        </div>
      </section>

      {/* 4. PATHS (Dark Band) */}
      <section className="bg-ink section-py" aria-label={paths.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={paths.eyebrow}
              statement={paths.statement}
              emphasis={paths.emphasis}
              light={false}
              align="center"
            />
          </ScrollReveal>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paths.items.map((path, index) => (
              <PathCard key={path.index} path={path} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

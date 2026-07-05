"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import type { CoursePillar } from "@/data/coursePages/types";
import { easeHive } from "@/lib/motion";

type LaunchpadBootcampDeckProps = {
  pillars: CoursePillar[];
  className?: string;
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
  description?: string;
};

function BootcampSteps({ description }: { description: string }) {
  // Split on numbered lines like "1. Something" after a double newline
  const steps = description.split(/(?:\n|^)(\d+\.\s)/).filter(Boolean);
  
  if (steps.length <= 1) {
    // Fallback if it's not a numbered list: try bullet points
    const bullets = description.split(/(?:\n|^)(?:-\s|•\s)/).filter(Boolean);
    if (bullets.length > 1) {
      return (
        <ul className="space-y-4">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{bullet.trim()}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    // Final fallback: just split by sentences.
    const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
    return (
      <ul className="space-y-4">
        {sentences.map((sentence, i) => (
          <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-slate-600">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
            <span>{sentence.trim()}</span>
          </li>
        ))}
      </ul>
    );
  }

  // ... (original steps logic if needed, though they look like sentences in the screenshot)
}

function SpecProjects({ projects }: { projects?: { link: string; image: string }[] }) {
  if (!projects || projects.length === 0) return null;
  
  return (
    <div className="mt-auto pt-8">
      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
        Spec Projects Here
      </h4>
      <div className="flex flex-wrap gap-3 relative z-20">
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-4 rounded-xl bg-[#EEF0F5]/80 px-3 py-2.5 border border-transparent hover:bg-[#EEF0F5] transition-colors"
          >
            {/* Logo container */}
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-lg overflow-hidden shadow-sm bg-white shrink-0">
              <img
                src={project.image}
                alt="Project Logo"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Download/Arrow Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 group-hover/btn:text-slate-900 transition-colors mr-1 shrink-0">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}


// ---
// Removed CapstoneGlyph because it is no longer needed
// ---

function TiltCard({ pillar, index, className = "" }: { pillar: CoursePillar; index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spotlight position relative to top-left
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map to 3D rotation (-8 to 8 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Pixel coordinates for gradient spotlight
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);
    
    // Normalized coordinates (-0.5 to 0.5) for tilt
    x.set(localX / width - 0.5);
    y.set(localY / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full flex flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 cursor-default ${className}`}
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), transparent 40%)`
        }}
      />
      
      {/* Card Content - Popped out slightly in Z-space for Parallax */}
      <div className="relative z-10 flex-1" style={{ transform: "translateZ(30px)" }}>
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-600">
          Capstone {pillar.index}
        </div>
        <h3 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
          {pillar.title}
        </h3>
        <BootcampSteps description={pillar.description} />
        <SpecProjects projects={pillar.projects} />
      </div>
    </motion.div>
  );
}

export function LaunchpadBootcampDeck({ 
  pillars, 
  className,
  eyebrow = "Education, Rebuilt for Outcomes",
  statement = "An offline bootcamp in Delhi",
  emphasis = "that closes your journey.",
  description = `"72 hours of intensity and collaboration — live with your cohort, learn from mentors, sharpen your capstones, and close it all with a graduation that marks the start of your next chapter."`
}: LaunchpadBootcampDeckProps) {
  // Use all pillars passed in
  const displayPillars = pillars;

  return (
    <section id="bootcamp" className={`program-tab-section placement-os overflow-hidden section-py ${className ?? ""}`}>
      <div className="section-container max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <ScrollReveal>
            <SectionIntro
              eyebrow={eyebrow}
              statement={statement}
              emphasis={emphasis}
              description={description}
              align="center"
            />
          </ScrollReveal>
        </div>

        {/* Mobile Horizontal Scroller */}
        <div className="md:hidden mt-8">
          <HorizontalScroller
            autoplay
            autoplayDelay={3000}
            slideClassName="w-[85vw] flex-shrink-0"
          >
            {displayPillars.map((pillar, index) => (
              <TiltCard key={`mobile-${pillar.title}`} pillar={pillar} index={index} />
            ))}
          </HorizontalScroller>
        </div>

        {/* Desktop Fractional Bento Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [perspective:1000px]">
          {displayPillars.map((pillar, index) => {
            // Fractional Bento Logic for 5 items
            let spanClass = "";
            if (displayPillars.length === 5) {
              if (index < 2) {
                // Top row: 2 items, 50% width each (3/6 columns)
                spanClass = "lg:col-span-3 md:col-span-1";
              } else if (index < 4) {
                // Bottom row: first two items get 33% width (2/6 columns)
                spanClass = "lg:col-span-2 md:col-span-1";
              } else {
                // Last item gets 33% width on desktop, but spans full row on tablet
                spanClass = "lg:col-span-2 md:col-span-2";
              }
            }
            return (
              <TiltCard 
                key={`desktop-${pillar.title}`} 
                pillar={pillar} 
                index={index}
                className={spanClass}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

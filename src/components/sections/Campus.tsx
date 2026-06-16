"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { VideoCard } from "@/components/ui/VideoCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { campusTabs, campusTourVideoId } from "@/data/campus";

export function Campus() {
  const [activeTab, setActiveTab] = useState(campusTabs[0].id);
  const activeImage =
    campusTabs.find((t) => t.id === activeTab)?.image ?? campusTabs[0].image;

  return (
    <section id="campus" className="section-band-dark">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Campus"
            statement="Experience"
            emphasis="our campus."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <VideoCard videoId={campusTourVideoId} large />
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {campusTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border border-white/90 bg-gradient-to-b from-white to-[#f6f8fe] text-ink shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
                    : "chip-metallic-dark text-white/75 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt="Campus preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

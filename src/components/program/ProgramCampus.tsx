"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CampusVideoHero } from "@/components/ui/CampusVideoHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  campusDescription,
  campusTabs,
  campusTourPoster,
  campusTourVideoId,
  campusVideoCaption,
} from "@/data/campus";

export function ProgramCampus({ className }: { className?: string } = {}) {
  const [activeTab, setActiveTab] = useState(campusTabs[0].id);
  const activeTabData = campusTabs.find((t) => t.id === activeTab) ?? campusTabs[0];
  const isTour = activeTabData.id === "campus-tour";

  return (
    <section id="campus" className={`program-section hive-dark-band section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            align="left"
            eyebrow="Campus"
            statement="Gurugram,"
            emphasis="full-time."
            description={campusDescription}
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {campusTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`program-campus-tab ${activeTab === tab.id ? "is-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8 overflow-hidden rounded-2xl border border-white/10"
          >
            {isTour ? (
              <CampusVideoHero
                videoId={campusTourVideoId}
                posterSrc={campusTourPoster}
                eyebrow="Campus tour"
                statement="Inside"
                emphasis="HiveSchool"
                caption={campusVideoCaption}
              />
            ) : (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={activeTabData.image}
                  alt={activeTabData.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 960px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                  <p className="text-lg font-semibold text-white">{activeTabData.label}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

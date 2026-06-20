"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TabGroup } from "@/components/ui/TabGroup";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProgramMentorGallery } from "@/components/program/ui/ProgramMentorGallery";
import { mentors, mentorCategories } from "@/data/mentors";

export function ProgramMentors({
  eyebrow = "Mentors",
  statement = "Operators who've",
  emphasis = "done the work.",
  description = "Founders, CXOs, and GTM leaders — slotted into sprints by discipline.",
}: {
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
  description?: string;
} = {}) {
  const [category, setCategory] =
    useState<(typeof mentorCategories)[number]>("Marketing");
  const filtered = mentors.filter((m) => m.category === category);

  return (
    <section className="program-section section-band-light overflow-hidden section-py">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={eyebrow}
            statement={statement}
            emphasis={emphasis}
            description={description}
            light
            align="left"
            size="display"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <TabGroup tabs={mentorCategories} active={category} onChange={setCategory} />
        </ScrollReveal>
      </div>

      <div className="mt-10 sm:mt-12">
        <ProgramMentorGallery
          key={category}
          resetKey={category}
          label={`${category} · pick a mentor`}
          mentors={filtered}
        />
      </div>
    </section>
  );
}

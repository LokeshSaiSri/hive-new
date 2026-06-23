"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TabGroup } from "@/components/ui/TabGroup";
import { PortraitCard } from "@/components/ui/PortraitCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { mentors, mentorCategories } from "@/data/mentors";

function MentorCard({
  mentor,
}: {
  mentor: (typeof mentors)[number];
}) {
  return (
    <div className="relative">
      <PortraitCard
        image={mentor.image}
        name={mentor.name}
        role={mentor.role}
        companyLabel={mentor.companyLabel}
        companyLogo={mentor.companyLogo}
        size="large"
        metallic
      />
      {mentor.sessions && (
        <p className="mt-3 text-center text-xs font-semibold text-mid-gray">
          Successful Sessions:{" "}
          <span className="text-light-blue">{mentor.sessions}</span>
        </p>
      )}
    </div>
  );
}

export function Mentors() {
  const [category, setCategory] =
    useState<(typeof mentorCategories)[number]>("Marketing");
  const filtered = mentors.filter((m) => m.category === category);
  const midpoint = Math.ceil(filtered.length / 2);
  const topRowMentors = filtered.slice(0, midpoint);
  const bottomRowMentors = filtered.slice(midpoint);

  return (
    <section className="overflow-hidden section-band-light">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Faculty & Mentors"
            statement="The industry is"
            emphasis="your faculty."
            description="Every module is led by a founder, CXO, or senior practitioner — selected for depth in the discipline being taught."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <TabGroup
            tabs={mentorCategories}
            active={category}
            onChange={setCategory}
          />
        </ScrollReveal>
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:gap-8">
        {topRowMentors.length > 0 && (
          <HorizontalScroller
            marquee
            marqueePauseOnHover={false}
            marqueeSpeed="slow"
            marqueeDirection="left"
            slideClassName="basis-auto"
          >
            {topRowMentors.map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </HorizontalScroller>
        )}
        {bottomRowMentors.length > 0 && (
          <HorizontalScroller
            marquee
            marqueePauseOnHover={false}
            marqueeSpeed="slow"
            marqueeDirection="right"
            slideClassName="basis-auto"
            className="pl-12 sm:pl-24"
          >
            {bottomRowMentors.map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </HorizontalScroller>
        )}
      </div>
    </section>
  );
}

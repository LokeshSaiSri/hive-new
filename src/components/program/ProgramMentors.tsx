"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TabGroup } from "@/components/ui/TabGroup";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { PortraitCard } from "@/components/ui/PortraitCard";
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

export function ProgramMentors({
  eyebrow = "Mentors",
  statement = "Operators who've",
  emphasis = "done the work.",
  description = "Founders, CXOs, and GTM leaders — slotted into sprints by discipline.",
  categoryOverride,
  mentorsOverride,
}: {
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
  description?: string;
  categoryOverride?: readonly string[];
  mentorsOverride?: typeof mentors;
} = {}) {
  const activeCategories = categoryOverride ?? mentorCategories;
  const activeMentors = mentorsOverride ?? mentors;

  const [category, setCategory] = useState<string>(activeCategories[0]);
  const filtered = activeMentors.filter((m) => m.category === category);

  const midpoint = Math.ceil(filtered.length / 2);
  const topRowMentors = filtered.slice(0, midpoint);
  const bottomRowMentors = filtered.slice(midpoint);

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
          <TabGroup tabs={activeCategories as string[]} active={category} onChange={setCategory as any} />
        </ScrollReveal>
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col gap-6 sm:gap-8 lg:hidden">
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

      <div className="mt-10 sm:mt-12 hidden lg:flex flex-col gap-8">
        {filtered.length > 0 && (
          <HorizontalScroller
            marquee
            marqueePauseOnHover={false}
            marqueeSpeed="slow"
            marqueeDirection="left"
            slideClassName="basis-auto"
          >
            {filtered.map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </HorizontalScroller>
        )}
      </div>
    </section>
  );
}

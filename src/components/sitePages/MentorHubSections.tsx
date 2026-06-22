"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { mentorSessionSteps } from "@/data/sitePages";
import { mentors, mentorCategories } from "@/data/mentors";

export function MentorSessionModel() {
  return (
    <section className="section-band-light border-b border-ink/5">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow="How it works"
            statement="Mentoring is tied to"
            emphasis="your sprints."
            description="Not one-off talks — recurring operator sessions mapped to the work you're shipping each week."
            align="left"
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mentorSessionSteps.map((step) => (
            <ScrollReveal key={step.index}>
              <article className="mentor-session-card h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_16px_48px_rgba(6,15,50,0.05)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-light-blue">
                  {step.index}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mid-gray">{step.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MentorDirectory() {
  const [category, setCategory] = useState<(typeof mentorCategories)[number] | "All">("All");

  const filtered = useMemo(
    () => (category === "All" ? mentors : mentors.filter((mentor) => mentor.category === category)),
    [category],
  );

  const categories: Array<(typeof mentorCategories)[number] | "All"> = ["All", ...mentorCategories];

  return (
    <section id="mentor-directory" className="hive-dark-band">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Full directory"
            statement="Browse the"
            emphasis="operator network."
            description={`${mentors.length} mentors across marketing, sales, GTM, and data — filter by discipline.`}
            align="left"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "border-accent bg-accent text-ink"
                    : "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mentor) => (
            <ScrollReveal key={mentor.name}>
              <article className="mentor-directory-card overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4">
                    {mentor.companyLogo && (
                      <div className="mb-3 inline-flex rounded-md bg-white/95 px-2 py-1">
                        <Image
                          src={mentor.companyLogo}
                          alt=""
                          width={72}
                          height={24}
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                    )}
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                      {mentor.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{mentor.name}</h3>
                    <p className="mt-1 text-sm text-white/75">{mentor.role}</p>
                    <p className="text-sm font-medium text-accent">{mentor.companyLabel}</p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

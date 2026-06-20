"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CareerPathwayGroup } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type PlacementsCareerPathwaysProps = {
  groups: CareerPathwayGroup[];
};

const accentClass = ["is-saas", "is-consumer", "is-founder"] as const;

const pathwayMeta: Record<string, { track: string; tagline: string }> = {
  "Consumer & D2C": {
    track: "01",
    tagline: "Brands, categories, marketplaces, and growth teams.",
  },
  "Founder & Leadership": {
    track: "02",
    tagline: "Founder's office, chief of staff, and 0→1 builder roles.",
  },
};

export function PlacementsCareerPathways({ groups }: PlacementsCareerPathwaysProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const totalRoles = useMemo(
    () => groups.reduce((sum, group) => sum + group.roles.length, 0),
    [groups],
  );

  const selectPathway = useCallback((index: number) => {
    setActive(index);
  }, []);

  const advanceNext = useCallback(() => {
    setActive((current) => (current + 1) % groups.length);
  }, [groups.length]);

  useAutoAdvance(groups.length, advanceNext, { enabled: !paused && groups.length > 1 });

  const current = groups[active];
  const meta = pathwayMeta[current.title] ?? {
    track: String(active + 1).padStart(2, "0"),
    tagline: "Roles HiveSchool graduates step into after the programme.",
  };
  const accent = accentClass[active % accentClass.length];

  return (
    <section className="program-tab-section career-runway section-band-light overflow-hidden">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Career pathways"
            statement="The roles our graduates"
            emphasis="step into."
            description={`${groups.length} pathways · ${totalRoles} destination roles`}
            light
            align="left"
          />
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="career-runway__shell premium-frame-dark"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="career-runway__shell-inner premium-surface-dark premium-metallic-edge">
              <div className="career-runway__tabs" role="tablist" aria-label="Career pathways">
                {groups.map((group, index) => {
                  const groupMeta = pathwayMeta[group.title];
                  const isActive = index === active;
                  return (
                    <button
                      key={group.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectPathway(index)}
                      className={`career-runway__tab ${accentClass[index] ?? ""} ${
                        isActive ? "is-active" : ""
                      }`}
                    >
                      <span className="career-runway__tab-track">
                        Track {groupMeta?.track ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="career-runway__tab-title">{group.title}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  role="tabpanel"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease: easeHive }}
                  className={`career-runway__panel ${accent}`}
                >
                  <p className="career-runway__panel-tagline">{meta.tagline}</p>
                  <ul className="career-runway__chips">
                    {current.roles.map((role) => (
                      <li key={role} className="career-runway__chip">
                        {role}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

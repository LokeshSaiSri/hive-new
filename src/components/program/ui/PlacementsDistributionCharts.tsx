"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  cityMix,
  cityPieGradient,
  roleMix,
  rolePieGradient,
} from "@/data/placementCharts";
import { easeHive } from "@/lib/motion";

function MixPie({
  title,
  subtitle,
  kpi,
  kpiLabel,
  mix,
  gradient,
}: {
  title: string;
  subtitle: string;
  kpi: string;
  kpiLabel: string;
  mix: readonly { label: string; share: number; color: string }[];
  gradient: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView || prefersReducedMotion) setActive(true);
  }, [inView, prefersReducedMotion]);

  return (
    <article ref={ref} className="placement-mix-card">
      <p className="placement-mix-card__eyebrow">Placement · Data</p>
      <h3 className="placement-mix-card__title">{title}</h3>
      <p className="placement-mix-card__subtitle">{subtitle}</p>

      <div className="placement-mix-card__body">
        <motion.div
          className="placement-pie h-[min(190px,42vw)] w-[min(190px,42vw)] shrink-0 sm:h-[min(220px,24vw)] sm:w-[min(220px,24vw)]"
          style={{ background: gradient }}
          initial={prefersReducedMotion ? false : { scale: 0.75, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0.75, opacity: 0 }}
          transition={{ duration: 0.75, ease: easeHive }}
        />
        <div className="placement-mix-card__legend">
          {mix.map((item) => (
            <div key={item.label} className="placement-mix-card__legend-row">
              <span className="placement-mix-card__legend-label">
                <span className="placement-mix-card__dot" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <strong>{item.share}%</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="placement-mix-card__kpi">
        <p className="placement-mix-card__kpi-value">{kpi}</p>
        <p className="placement-mix-card__kpi-label">{kpiLabel}</p>
      </div>
    </article>
  );
}

export function PlacementsDistributionCharts() {
  return (
    <section className="program-tab-section hive-dark-band border-y border-white/10">
      <div className="section-container py-12 sm:py-14">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Career outcomes"
            statement="Role & city"
            emphasis="distribution."
            description="B2B sales and founder's office roles lead Year 2 PGP Cohort 1 outcomes. Bangalore and Delhi NCR split for cohort placement outcomes."
            light={false}
            align="left"
          />
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2 lg:mt-14">
          <MixPie
            title="Role Distribution"
            subtitle="B2B sales and founder's office roles lead Year 2 PGP Cohort 1 outcomes."
            kpi="41.7%"
            kpiLabel="B2B Sales · largest role category"
            mix={roleMix}
            gradient={rolePieGradient}
          />
          <MixPie
            title="City Distribution"
            subtitle="Bangalore and Delhi NCR split for cohort placement outcomes."
            kpi="50/50"
            kpiLabel="Bangalore · Delhi NCR split"
            mix={cityMix}
            gradient={cityPieGradient}
          />
        </div>
      </div>
    </section>
  );
}

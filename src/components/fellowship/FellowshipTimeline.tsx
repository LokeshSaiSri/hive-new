"use client";

import Image from "next/image";
import { useRef } from "react";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { asset } from "@/lib/assets";

type FellowshipTimelineProps = {
  timeline: FellowshipOverview["timeline"];
};

export function FellowshipTimeline({ timeline }: FellowshipTimelineProps) {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section className="fellowship-filmstrip" aria-labelledby="fellowship-timeline-heading">
      <div className="section-container fellowship-filmstrip__head">
        <p className="fellowship-eyebrow fellowship-eyebrow--light">Timeline</p>
        <h2 id="fellowship-timeline-heading" className="fellowship-headline fellowship-headline--light">
          {timeline.statement} <em>{timeline.emphasis}</em>
        </h2>
      </div>

      <div ref={railRef} className="fellowship-filmstrip__rail" tabIndex={0}>
        {timeline.phases.map((phase) => (
          <article key={phase.phase} className="fellowship-filmstrip__frame">
            <Image
              src={asset(phase.image)}
              alt=""
              fill
              className="object-cover"
              sizes="320px"
            />
            <div className="fellowship-filmstrip__veil" aria-hidden />
            <div className="fellowship-filmstrip__label">
              <span>{phase.phase}</span>
              <h3>{phase.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

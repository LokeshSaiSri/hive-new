"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipMentorsRailProps = {
  mentors: FellowshipOverview["mentors"];
};

export function FellowshipMentorsRail({ mentors }: FellowshipMentorsRailProps) {
  const prefersReducedMotion = useReducedMotion();
  const featured = mentors.slice(0, 6);

  return (
    <section className="fellowship-mentors" aria-labelledby="fellowship-mentors-heading">
      <div className="section-container fellowship-mentors__head">
        <p className="fellowship-eyebrow">Faculty</p>
        <h2 id="fellowship-mentors-heading" className="fellowship-headline">
          Operators <em>in the room.</em>
        </h2>
      </div>

      <div className="fellowship-mentors__grid">
        {featured.map((mentor, index) => (
          <motion.figure
            key={mentor.name}
            className="fellowship-mentors__card"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: easeHive }}
          >
            <div className="fellowship-mentors__photo">
              <Image src={mentor.image} alt="" fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
            </div>
            <figcaption>
              <p className="fellowship-mentors__name">{mentor.name}</p>
              <p className="fellowship-mentors__role">{mentor.companyLabel}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

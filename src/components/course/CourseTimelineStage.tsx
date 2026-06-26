"use client";

import Image from "next/image";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { CourseTimelinePhase } from "@/data/coursePages/types";
import { asset } from "@/lib/assets";

type CourseTimelineStageProps = {
  phase: CourseTimelinePhase;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

export function CourseTimelineStage({
  phase,
  index,
  total,
  scrollYProgress,
}: CourseTimelineStageProps) {
  const chapter = String(index + 1).padStart(2, "0");

  const scrollIndex = useTransform(
    scrollYProgress,
    (p) => p * Math.max(1, total - 1),
  );

  const dist = useTransform(scrollIndex, (si) => si - index);

  const y = useTransform(dist, (d) => {
    if (d < -0.01) return `${Math.min(10, Math.abs(d) * 6)}%`;
    if (d <= 1) return `${-d * 100}%`;
    return "-105%";
  });

  const opacity = useTransform(dist, (d) => {
    if (d < -1.15) return 0;
    if (d < -1) return Math.max(0, 1 + (d + 1) * 6.5);
    if (d > 1) return 0;
    if (d > 0.85) return Math.max(0, 1 - (d - 0.85) * 6.5);
    return 1;
  });

  const active = useTransform(dist, (d) => {
    if (d < 0) return Math.max(0, 1 + d * 1.5);
    if (d <= 1) return Math.max(0, 1 - d);
    return 0;
  });

  const scale = useTransform(active, (a) => 0.94 + a * 0.06);
  const imageScale = useTransform(active, (a) => 1.06 - a * 0.06);
  const zIndex = useTransform(
    [active, dist],
    ([a, d]) => 20 + index + Math.round((a as number) * 24) - Math.round(Math.max(0, d as number) * 4),
  );
  const pointerEvents = useTransform(active, (a) => (a > 0.55 ? "auto" : "none"));

  return (
    <motion.article
      className="curriculum-stage absolute inset-0 overflow-hidden rounded-[1.35rem] will-change-transform sm:rounded-[1.5rem]"
      style={{ y, scale, zIndex, pointerEvents, opacity }}
    >
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src={asset(phase.image)}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 960px"
          priority={index === 0}
        />
      </motion.div>

      <div className="curriculum-stage__scrim" aria-hidden />
      <div className="curriculum-stage__grain" aria-hidden />

      <div className="curriculum-stage__content">
        <span className="curriculum-stage__watermark" aria-hidden>
          {chapter}
        </span>

        <div className="curriculum-stage__head">
          <p className="curriculum-stage__eyebrow text-xs sm:text-sm">{phase.phase}</p>
          <h3 className="curriculum-stage__title text-2xl sm:text-3xl lg:text-4xl">{phase.title}</h3>
        </div>

        <div className="curriculum-stage__split">
          <div className="curriculum-stage__panel curriculum-stage__panel--in">
            <p className="curriculum-stage__panel-label">In programme</p>
            <ul className="curriculum-stage__tags">
              {phase.tags.map((tag) => (
                <li key={tag} className="curriculum-stage__tag">
                  <span className="curriculum-stage__tag-dot" aria-hidden />
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="curriculum-stage__panel curriculum-stage__panel--out">
            <p className="curriculum-stage__panel-label curriculum-stage__panel-label--light text-xs sm:text-sm">
              What you ship
            </p>
            <p className="curriculum-stage__description text-sm sm:text-base line-clamp-3 sm:line-clamp-none">{phase.description}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

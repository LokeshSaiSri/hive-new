"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useVideo } from "@/components/providers/VideoProvider";
import { youtubeThumbnail } from "@/lib/youtube";
import type { FeaturePanel } from "@/data/features";

type ExperientialStackCardProps = {
  panel: FeaturePanel;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

export function ExperientialStackCard({
  panel,
  index,
  total,
  scrollYProgress,
}: ExperientialStackCardProps) {
  const { openVideo } = useVideo();
  const chapterNum = String(index + 1).padStart(2, "0");

  const scrollIndex = useTransform(
    scrollYProgress,
    (p) => p * Math.max(1, total - 1),
  );

  const dist = useTransform(scrollIndex, (si) => si - index);

  const y = useTransform(dist, (d) => {
    if (d < -0.01) return `${Math.min(14, Math.abs(d) * 8)}%`;
    if (d <= 1.05) return `${-d * 100}%`;
    return "-108%";
  });

  const opacity = useTransform(dist, (d) => {
    if (d < -0.2) return 0;
    if (d < 0) return Math.min(1, 1 + d * 4);
    if (d > 1.05) return 0;
    return 1;
  });

  const active = useTransform(dist, (d) => {
    if (d < 0) return Math.max(0, 1 + d * 1.6);
    if (d <= 1) return Math.max(0, 1 - d * 1.05);
    return 0;
  });

  const scale = useTransform(active, (a) => 0.9 + a * 0.1);
  const zIndex = useTransform(
    [active, dist],
    ([a, d]) => 30 + index + Math.round((a as number) * 20) - Math.round(Math.max(0, d as number) * 5),
  );
  const pointerEvents = useTransform(active, (a) => (a > 0.65 ? "auto" : "none"));

  const shadow = useTransform(
    active,
    [0, 1],
    [
      "0 20px 52px rgba(6,15,50,0.22)",
      "0 28px 64px rgba(6,15,50,0.28)",
    ],
  );

  return (
    <motion.article
      className="premium-frame-dark absolute inset-0 overflow-hidden rounded-[1.5rem] will-change-transform"
      style={{ y, scale, zIndex, pointerEvents, opacity }}
    >
      <motion.div
        className="premium-surface-dark premium-metallic-edge flex h-full min-h-0 flex-col justify-center rounded-[calc(1.5rem-1px)] p-5 sm:p-6 md:p-7 lg:p-9"
        style={{ boxShadow: shadow }}
      >
        <div className="grid h-full min-h-0 items-center gap-5 sm:gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <div className="relative flex min-h-0 flex-col justify-center overflow-y-auto px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
            <motion.span
              className="pointer-events-none absolute right-2 top-0 select-none font-bold text-white/[0.06] sm:right-4"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 0.85,
              }}
              aria-hidden
            >
              {chapterNum}
            </motion.span>

            <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-glow">
              {panel.eyebrow}
            </p>

            <h3 className="mt-3 max-w-lg text-[clamp(1.25rem,2.8vw,1.875rem)] font-bold leading-[1.12] tracking-tight text-white">
              {panel.title}
            </h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-[15px]">
              {panel.description}
            </p>

            {panel.bullets && (
              <ul className="mt-5 space-y-0 border-t border-white/10">
                {panel.bullets.map((b) => (
                  <li
                    key={b.number}
                    className="flex gap-3 border-b border-white/10 py-3 sm:gap-4 sm:py-3.5"
                  >
                    <span className="text-spark-gradient font-serif text-3xl font-bold leading-none sm:text-4xl">
                      {b.number}
                    </span>
                    <span className="pt-0.5 text-xs leading-relaxed text-white/80 sm:text-[13px]">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 pb-1">
              <button
                type="button"
                onClick={() => openVideo(panel.videoId)}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-glow/45 bg-electric-blue/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-glow shadow-[0_0_24px_rgba(134,157,255,0.18)] transition hover:border-blue-glow hover:bg-electric-blue/25 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch
              </button>
              {panel.ctaLabel && panel.ctaHref && (
                <Link
                  href={panel.ctaHref}
                  className="text-spark text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:text-white"
                >
                  {panel.ctaLabel} →
                </Link>
              )}
              {panel.ctaLabel && !panel.ctaHref && (
                <button
                  type="button"
                  onClick={() => openVideo(panel.videoId)}
                  className="text-spark text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:text-white"
                >
                  {panel.ctaLabel} →
                </button>
              )}
            </div>
            </div>
          </div>

          <div className="flex h-full min-h-0 items-center justify-center px-2 py-2 sm:px-4 sm:py-4 lg:px-3 lg:py-5">
            <button
              type="button"
              onClick={() => openVideo(panel.videoId)}
              className="group relative aspect-[4/3] h-full max-h-full w-full max-w-xs overflow-hidden rounded-xl lg:aspect-auto lg:min-h-[180px] lg:max-w-none"
              aria-label={`Play ${panel.eyebrow} video`}
            >
            <Image
              src={youtubeThumbnail(panel.videoId)}
              alt={panel.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 540px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = youtubeThumbnail(panel.videoId, "hqdefault");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent lg:bg-gradient-to-l lg:from-ink/40 lg:via-transparent lg:to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/95 text-ink shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

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

  const scale = useTransform(active, (a) => 0.94 + a * 0.06);
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
      className="premium-frame-dark absolute inset-0 overflow-hidden rounded-[2rem] will-change-transform"
      style={{ y, scale, zIndex, pointerEvents, opacity }}
    >
      <motion.div
        className="premium-surface-dark premium-metallic-edge flex h-full min-h-0 flex-col justify-center rounded-[calc(2rem-1px)] p-7 sm:p-8 md:p-10 lg:p-12"
        style={{ boxShadow: shadow }}
      >
        <div className="grid h-full min-h-0 items-center gap-7 sm:gap-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.38fr)] lg:gap-16">
          <div className="relative flex min-h-0 flex-col justify-center overflow-y-auto px-2 py-2 sm:px-6 sm:py-5 lg:px-8 lg:py-7">
            <motion.span
              className="pointer-events-none absolute right-2 top-0 select-none font-bold text-white/[0.06] sm:right-4"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                lineHeight: 0.85,
              }}
              aria-hidden
            >
              {chapterNum}
            </motion.span>

            <div className="relative w-full">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-glow sm:text-sm">
              {panel.eyebrow}
            </p>

            <h3 className="mt-5 max-w-4xl text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.08] tracking-tight text-white">
              {panel.title}
            </h3>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {panel.description}
            </p>

            {panel.bullets && (
              <ul className="mt-7 space-y-0 border-t border-white/10">
                {panel.bullets.map((b) => (
                  <li
                    key={b.number}
                    className="flex gap-5 border-b border-white/10 py-4 sm:gap-6 sm:py-5"
                  >
                    <span className="text-spark-gradient font-serif text-5xl font-bold leading-none sm:text-6xl">
                      {b.number}
                    </span>
                    <span className="pt-1.5 text-base leading-relaxed text-white/85 sm:text-lg">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4 pb-1 sm:gap-5">
              <button
                type="button"
                onClick={() => panel.videoId && openVideo(panel.videoId)}
                className="inline-flex items-center gap-2.5 rounded-full border border-blue-glow/45 bg-electric-blue/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-blue-glow shadow-[0_0_24px_rgba(134,157,255,0.18)] transition hover:border-blue-glow hover:bg-electric-blue/25 hover:text-white sm:text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch
              </button>
              {panel.ctaLabel && panel.ctaHref && (
                <Link
                  href={panel.ctaHref}
                  className="text-spark text-xs font-semibold uppercase tracking-[0.14em] transition hover:text-white sm:text-sm"
                >
                  {panel.ctaLabel} →
                </Link>
              )}
              {panel.ctaLabel && !panel.ctaHref && (
                <button
                  type="button"
                  onClick={() => panel.videoId && openVideo(panel.videoId)}
                  className="text-spark text-xs font-semibold uppercase tracking-[0.14em] transition hover:text-white sm:text-sm"
                >
                  {panel.ctaLabel} →
                </button>
              )}
            </div>
            </div>
          </div>

          <div className="flex w-full min-h-0 items-center justify-center px-2 py-2 sm:px-5 lg:px-4 lg:py-6">
            <button
              type="button"
              onClick={() => panel.videoId && openVideo(panel.videoId)}
              className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl"
              aria-label={`Play ${panel.eyebrow} video`}
            >
            <Image
              src={youtubeThumbnail(panel.videoId!)}
              alt={panel.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 900px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = youtubeThumbnail(panel.videoId!, "hqdefault");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent lg:bg-gradient-to-l lg:from-ink/40 lg:via-transparent lg:to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/95 text-ink shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-7 w-7 sm:h-8 sm:w-8">
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

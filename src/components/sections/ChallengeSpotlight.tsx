import Image from "next/image";
import { VideoCard } from "@/components/ui/VideoCard";
import { spotlight } from "@/data/challenges";

export function ChallengeSpotlight() {
  const titleLead = spotlight.title.split(" — ")[0];
  const titleEmphasis = spotlight.title.includes(" — ")
    ? spotlight.title.split(" — ")[1]
    : null;

  return (
    <article className="group premium-frame-light mx-auto max-w-4xl transition-transform duration-300 hover:-translate-y-0.5">
      <div className="card-premium-elevated overflow-hidden">
        <div className="border-b border-ink/[0.06] px-6 py-6 sm:px-7 sm:py-7">
          <span className="inline-flex rounded-full border border-electric-blue/15 bg-electric-blue/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-electric-blue">
            Spotlight · How it actually happens
          </span>
          <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:text-[1.75rem]">
            <span className="gradient-headline-light">{titleLead}</span>
            {titleEmphasis && (
              <>
                {" — "}
                <em className="font-serif italic text-brand-blue">{titleEmphasis}</em>
              </>
            )}
          </h3>
        </div>

        <VideoCard
          videoId={spotlight.videoId}
          badge="Watch pitch"
          flush
          className="sm:[&_button]:rounded-none"
        />

        <div className="px-6 py-6 sm:px-7 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <p className="max-w-xl text-sm leading-relaxed text-mid-gray sm:text-base">
              {spotlight.description}
            </p>

            <div className="card-metallic-blue flex shrink-0 items-center gap-3 px-4 py-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-electric-blue/15">
                <Image
                  src={spotlight.portrait}
                  alt={spotlight.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{spotlight.name}</p>
                <p className="text-xs text-mid-gray">
                  {spotlight.role} @ {spotlight.company}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 border-t border-ink/[0.06] pt-6 sm:gap-3">
            {spotlight.steps.map((step, i) => (
              <span key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-full border border-electric-blue/12 bg-electric-blue/[0.05] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink sm:text-[11px]">
                  {step}
                </span>
                {i < spotlight.steps.length - 1 && (
                  <span className="text-mid-gray/40" aria-hidden>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

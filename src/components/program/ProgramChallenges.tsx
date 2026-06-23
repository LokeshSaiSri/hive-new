import { SectionIntro } from "@/components/ui/SectionIntro";
import { VideoCard } from "@/components/ui/VideoCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChallengesVideoHero } from "@/components/program/ChallengesVideoHero";
import { challenges } from "@/data/challenges";

type ProgramChallengesProps = {
  variant?: "grid" | "scroll";
  className?: string;
};

export function ProgramChallenges({ variant = "grid", className }: ProgramChallengesProps) {
  if (variant === "grid") {
    return <ChallengesVideoHero className={className} />;
  }

  return (
    <section id="challenges" className={`program-section hive-dark-band section-py overflow-hidden ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            align="left"
            eyebrow="Live challenges"
            statement="Real brands,"
            emphasis="real briefs."
          />
        </ScrollReveal>
      </div>

      <div className="mt-10 sm:mt-12">
        <HorizontalScroller autoplay bleed>
          {challenges.map((challenge) => (
            <VideoCard
              key={challenge.videoId + challenge.caption}
              videoId={challenge.videoId}
              caption={challenge.caption}
              thumbnailQuality={challenge.thumbnailQuality}
            />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

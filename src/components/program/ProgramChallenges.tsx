import { SectionIntro } from "@/components/ui/SectionIntro";
import { VideoCard } from "@/components/ui/VideoCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { challenges } from "@/data/challenges";

type ProgramChallengesProps = {
  variant?: "grid" | "scroll";
};

export function ProgramChallenges({ variant = "grid" }: ProgramChallengesProps) {
  const [featured, ...rest] = challenges;

  return (
    <section id="challenges" className="program-section hive-dark-band section-py overflow-hidden">
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

      {variant === "scroll" ? (
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
      ) : (
        <div className="section-container">
          {featured && (
            <ScrollReveal className="mt-8">
              <div className="program-challenge-feature">
                <VideoCard
                  videoId={featured.videoId}
                  caption={featured.caption}
                  thumbnailQuality={featured.thumbnailQuality}
                  large
                  className="w-full"
                />
              </div>
            </ScrollReveal>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((challenge, index) => (
              <ScrollReveal key={challenge.videoId + challenge.caption} delay={index * 0.03}>
                <VideoCard
                  videoId={challenge.videoId}
                  caption={challenge.caption}
                  thumbnailQuality={challenge.thumbnailQuality}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

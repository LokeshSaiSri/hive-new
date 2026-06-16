import { SectionIntro } from "@/components/ui/SectionIntro";
import { VideoCard } from "@/components/ui/VideoCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChallengeSpotlight } from "@/components/sections/ChallengeSpotlight";
import { challenges } from "@/data/challenges";

export function LiveChallenges() {
  return (
    <section id="challenges" className="section-band-dark overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Live Challenges"
            statement="Real challenges,"
            emphasis="real outcomes."
            description="Watch our students take on real brand challenges — first principles, on-the-ground decoding, and founder pitches."
          />
        </ScrollReveal>
      </div>

      <div className="mt-12">
        <HorizontalScroller autoplay>
          {challenges.map((challenge) => (
            <VideoCard
              key={challenge.videoId + challenge.caption}
              videoId={challenge.videoId}
              caption={challenge.caption}
            />
          ))}
        </HorizontalScroller>
      </div>

      <div className="section-container">
        <ScrollReveal className="mt-20 sm:mt-24">
          <ChallengeSpotlight />
        </ScrollReveal>
      </div>
    </section>
  );
}

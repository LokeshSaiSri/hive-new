import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { VideoCard } from "@/components/ui/VideoCard";

type FeaturedVideoProps = {
  /** YouTube video id, e.g. "MFYZivwKJzY". */
  videoId: string;
  eyebrow?: string;
  statement: string;
  emphasis: string;
  description?: string;
  /** The video's own title, shown under the player. */
  caption?: string;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * A featured video: a short heading on one side, the player on the other.
 * Clicking the thumbnail opens the site's video player (VideoProvider).
 */
export function FeaturedVideo({
  videoId,
  eyebrow = "Watch",
  statement,
  emphasis,
  description,
  caption,
  tone = "dark",
  className = "",
}: FeaturedVideoProps) {
  const dark = tone === "dark";

  return (
    <section className={`${dark ? "hive-dark-band" : "section-band-light"} section-py ${className}`}>
      <div className="section-container">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
          <ScrollReveal>
            <SectionIntro
              light={!dark}
              align="left"
              eyebrow={eyebrow}
              statement={statement}
              emphasis={emphasis}
              size="default"
              description={description}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div
              className={`rounded-3xl p-2 sm:p-3 ${
                dark ? "border border-white/12 bg-white/[0.04]" : "border border-border-soft bg-white shadow-[0_24px_60px_rgba(6,15,50,0.08)]"
              }`}
            >
              <VideoCard videoId={videoId} badge="Video" caption={caption} className="[&>p]:px-2 [&>p]:pb-1" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

import { SectionIntro } from "@/components/ui/SectionIntro";
import { OutcomeJourneyCard } from "@/components/ui/OutcomeJourneyCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { alumniPlacements } from "@/data/placements";
import { whyHiveStats } from "@/data/stats";

const highlightStats = [
  whyHiveStats[0],
  whyHiveStats[1],
  whyHiveStats[3],
];

export function CareerOutcomes() {
  return (
    <section className="section-band-light">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Career Outcomes"
            statement="Unlock the best"
            emphasis="career opportunities."
            description="HiveSchool graduates land revenue, GTM, and growth roles at India&apos;s fastest-scaling companies — often from unrelated backgrounds."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-10 sm:mt-12">
          <div className="premium-frame-dark hover-lift-card">
            <div className="premium-surface-dark premium-metallic-edge grid gap-6 rounded-[calc(1.5rem-1px)] p-6 sm:grid-cols-3 sm:gap-8 sm:p-8">
            {highlightStats.map((stat) => (
              <div key={stat.title} className="flex flex-col gap-1 sm:gap-1.5">
                <p className="text-spark-gradient font-serif text-3xl font-bold leading-none sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-white">{stat.title}</p>
                <p className="text-xs leading-relaxed text-white/55">
                  {stat.description}
                </p>
              </div>
            ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-14 sm:mt-16">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
          Alumni placements · PGP Cohort
        </p>
        <HorizontalScroller
          marquee
          marqueePauseOnHover={false}
          marqueeSpeed="slow"
          slideClassName="basis-auto"
        >
          {alumniPlacements.map((alumni, index) => (
            <OutcomeJourneyCard key={alumni.name} index={index} {...alumni} />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

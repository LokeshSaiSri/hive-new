import dynamic from "next/dynamic";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { MarqueeRows } from "@/components/ui/MarqueeRow";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { HiringPartnerLogo } from "@/components/ui/HiringPartnerLogo";
import { founderQuote, placementReportVideoId } from "@/data/stats";
import { hiringPartnerLogos } from "@/data/partners";

const PlacementStatsCharts = dynamic(
  () =>
    import("@/components/ui/PlacementStatsCharts").then((m) => ({
      default: m.PlacementStatsCharts,
    })),
  { loading: () => <div className="min-h-[min(360px,50vh)]" aria-hidden /> },
);

export function PlacementStats() {
  const half = Math.ceil(hiringPartnerLogos.length / 2);
  const row1 = hiringPartnerLogos.slice(0, half);
  const row2 = hiringPartnerLogos.slice(half);

  return (
    <section id="placement-report" className="hive-dark-band">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Career Outcomes"
            statement="Placements That"
            emphasis="Prove The Model"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8 sm:mt-10">
          <div className="hive-mobile-panel placement-stats-panel">
            <div className="grid lg:grid-cols-2 lg:min-h-[min(440px,48vh)]">
              <div className="flex flex-col justify-center border-b border-white/10 px-5 py-8 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r lg:px-12 lg:py-14 xl:px-16">
                <blockquote className="text-lg font-medium leading-relaxed text-white/92 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
                  &ldquo;{founderQuote.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-center gap-4 sm:mt-8">
                  <div className="h-12 w-px shrink-0 bg-white/25" />
                  <div>
                    <p className="text-base font-bold text-white sm:text-lg">
                      {founderQuote.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                      {founderQuote.role}
                    </p>
                  </div>
                </footer>
              </div>

              <div className="relative flex min-h-[240px] flex-col sm:min-h-[280px] lg:min-h-0">
                <VideoCard
                  videoId={placementReportVideoId}
                  badge="Watch full breakdown"
                  flush
                  fill
                  className="h-full flex-1 max-sm:rounded-none"
                />
              </div>
            </div>

            <div className="border-t border-white/10 px-5 py-3 sm:px-10 lg:px-14">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                Placement Report 2025–26 · PGP Cohort Year 2
              </p>
            </div>

            <PlacementStatsCharts />

            <div className="flex flex-col items-stretch gap-3 border-t border-white/10 px-5 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 sm:px-6 sm:py-10">
              <PillButton variant="highlight" tone="dark" href="#apply" className="w-full sm:w-auto">
                Join Hiveschool
              </PillButton>
              <PillButton
                variant="secondary"
                tone="dark"
                href="/HiveSchool Placement Report 2025-26.pdf"
                className="w-full sm:w-auto"
              >
                Download Placements Report
              </PillButton>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-10 sm:mt-12">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.35em] text-white/40 sm:mb-6">
            Hiring Partners
          </p>
          <MarqueeRows
            pauseOnHover={false}
            rows={[
              row1.map((partner) => (
                <HiringPartnerLogo key={partner.name} {...partner} />
              )),
              row2.map((partner) => (
                <HiringPartnerLogo key={partner.name} {...partner} />
              )),
            ]}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

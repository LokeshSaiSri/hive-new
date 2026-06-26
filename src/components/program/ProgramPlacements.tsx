import { SectionIntro } from "@/components/ui/SectionIntro";
import { MarqueeRows } from "@/components/ui/MarqueeRow";
import { PlacementStatsCharts } from "@/components/ui/PlacementStatsCharts";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { HiringPartnerLogo } from "@/components/ui/HiringPartnerLogo";
import { founderQuote, placementReportVideoId } from "@/data/stats";
import { placementReportDownloadPath } from "@/data/placementReportAccess";
import { hiringPartnerLogos } from "@/data/partners";

type ProgramPlacementsProps = {
  cohortLabel?: string;
  className?: string;
  applyHref?: string;
};

export function ProgramPlacements({
  cohortLabel = "Placement Report 2024–25 · PGP Cohort Year 1",
  className,
  applyHref = "#apply",
}: ProgramPlacementsProps) {
  const half = Math.ceil(hiringPartnerLogos.length / 2);
  const row1 = hiringPartnerLogos.slice(0, half);
  const row2 = hiringPartnerLogos.slice(half);

  return (
    <section id="placements" className="program-section hive-dark-band">
      <div className="section-container section-py-tight sm:pt-16 sm:pb-8">
        <ScrollReveal>
          <SectionIntro
            light={false}
            align="left"
            eyebrow="Placements"
            statement="Outcomes backed by"
            emphasis="real data."
            description="Salary bands, role mix, and hiring partners — the numbers behind every cohort."
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
                {cohortLabel}
              </p>
            </div>

            <PlacementStatsCharts />

            <div className="flex flex-col items-stretch gap-3 border-t border-white/10 px-5 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 sm:px-6 sm:py-10">
              <PillButton variant="highlight" tone="dark" href={applyHref} className="w-full sm:w-auto">
                Apply now
              </PillButton>
              <PillButton
                variant="secondary"
                tone="dark"
                href={placementReportDownloadPath("year-2")}
                className="w-full sm:w-auto"
              >
                Download placement report
              </PillButton>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-10 sm:mt-12">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.35em] text-white/40 sm:mb-6">
            Hiring partners
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

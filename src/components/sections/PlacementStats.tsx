import { SectionIntro } from "@/components/ui/SectionIntro";
import { MarqueeRows } from "@/components/ui/MarqueeRow";
import { PlacementStatsCharts } from "@/components/ui/PlacementStatsCharts";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { HiringPartnerLogo } from "@/components/ui/HiringPartnerLogo";
import { founderQuote, placementReportVideoId } from "@/data/stats";
import { hiringPartnerLogos } from "@/data/partners";

export function PlacementStats() {
  const half = Math.ceil(hiringPartnerLogos.length / 2);
  const row1 = hiringPartnerLogos.slice(0, half);
  const row2 = hiringPartnerLogos.slice(half);

  return (
    <section id="placement-report" className="hive-dark-band">
      <div className="section-container pt-12 pb-6 sm:pt-16 sm:pb-8">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Career Outcomes"
            statement="Placements That"
            emphasis="Prove The Model"
          />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="border-y border-white/10">
          <div className="grid lg:grid-cols-2 lg:min-h-[min(440px,48vh)]">
            <div className="flex flex-col justify-center border-b border-white/10 px-6 py-10 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r lg:px-12 lg:py-14 xl:px-16">
              <blockquote className="text-xl font-medium leading-relaxed text-white/92 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
                &ldquo;{founderQuote.quote}&rdquo;
              </blockquote>
              <footer className="mt-8 flex items-center gap-4">
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

            <div className="relative flex min-h-[280px] flex-col lg:min-h-0">
              <VideoCard
                videoId={placementReportVideoId}
                badge="Watch full breakdown"
                flush
                fill
                className="h-full flex-1"
              />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-3 sm:px-10 lg:px-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              Placement Report 2025–26 · PGP Cohort Year 2
            </p>
          </div>

          <PlacementStatsCharts />

          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-white/10 px-6 py-8 sm:gap-4 sm:py-10">
            <PillButton variant="highlight" tone="dark" href="#apply">
              Join Hiveschool
            </PillButton>
            <PillButton variant="secondary" tone="dark" href="#placement-report">
              Download Placements Report
            </PillButton>
          </div>
        </div>
      </ScrollReveal>

      <div className="section-container pb-14 pt-12 sm:pb-16 sm:pt-14">
        <ScrollReveal>
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.35em] text-white/40">
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

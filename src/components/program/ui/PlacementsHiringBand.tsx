import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { MarqueeRows } from "@/components/ui/MarqueeRow";
import { HiringPartnerLogo } from "@/components/ui/HiringPartnerLogo";
import { hiringPartnerLogos } from "@/data/partners";

type PlacementsHiringBandProps = {
  description?: string;
};

export function PlacementsHiringBand({
  description = "From global technology leaders to India's fastest-growing startups our graduates join teams shaping the future of revenue, marketing, and growth.",
}: PlacementsHiringBandProps) {
  const half = Math.ceil(hiringPartnerLogos.length / 2);
  const row1 = hiringPartnerLogos.slice(0, half);
  const row2 = hiringPartnerLogos.slice(half);

  return (
    <section className="program-tab-section hive-dark-band border-y border-white/10">
      <div className="section-container py-12 sm:py-14">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Hiring network"
            statement="Where our graduates"
            emphasis="go to work."
            description={description}
            light={false}
            align="left"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.35em] text-white/40">
            Trusted hiring partners
          </p>
          <MarqueeRows
            pauseOnHover={false}
            rows={[
              row1.map((partner) => <HiringPartnerLogo key={partner.name} {...partner} />),
              row2.map((partner) => <HiringPartnerLogo key={partner.name} {...partner} />),
            ]}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

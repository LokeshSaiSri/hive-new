import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import { placementReportEditions } from "@/data/placementReports";
import { programmePlacementSummaries } from "@/data/sitePages";

export function PlacementReportEditions({ className }: { className?: string }) {
  return (
    <section className={`section-band-light border-b border-ink/5 section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Placement archive"
            statement="Two audited"
            emphasis="editions published."
            description="Each cohort publishes a full placement report — salary bands, role mix, and hiring partners."
            align="left"
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {placementReportEditions.map((edition) => (
            <ScrollReveal key={edition.id} className="h-full">
              <article className="placement-edition-card group overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_24px_70px_rgba(6,15,50,0.08)] h-full">
                <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] h-full">
                  <div className="relative aspect-[4/5] min-h-[240px] md:aspect-auto md:min-h-[320px]">
                    <Image
                      src={edition.coverImage}
                      alt={`${edition.label} placement report cover`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink/10" />
                    <div className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      {edition.edition}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-light-blue">
                      {edition.year}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-ink">{edition.label}</h3>
                    <p className="mt-2 text-sm text-mid-gray">{edition.subtitle}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-cream px-4 py-3">
                        <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-mid-gray">
                          Average CTC
                        </dt>
                        <dd className="mt-1 text-xl font-bold text-ink">{edition.avgCtc}</dd>
                      </div>
                      <div className="rounded-xl bg-cream px-4 py-3">
                        <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-mid-gray">
                          Highest
                        </dt>
                        <dd className="mt-1 text-xl font-bold text-ink">{edition.highest}</dd>
                      </div>
                      {edition.median && (
                        <div className="rounded-xl bg-cream px-4 py-3">
                          <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-mid-gray">
                            Median
                          </dt>
                          <dd className="mt-1 text-xl font-bold text-ink">{edition.median}</dd>
                        </div>
                      )}
                      {edition.jump && (
                        <div className="rounded-xl bg-cream px-4 py-3">
                          <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-mid-gray">
                            Salary jump
                          </dt>
                          <dd className="mt-1 text-xl font-bold text-ink">{edition.jump}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="placement-edition-card__actions mt-6 flex flex-wrap gap-3">
                      <PillButton href={edition.downloadHref} variant="primary" tone="light">
                        Download PDF
                      </PillButton>
                      <PillButton href="#placement-archive" variant="secondary" tone="light">
                        Open flipbook
                      </PillButton>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProgrammePlacementSummaries({ className }: { className?: string }) {
  return (
    <section className="hive-dark-band border-t border-white/10">
      <div className={`section-container section-py ${className ?? ""}`}>
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="By programme"
            statement="Cohort-specific"
            emphasis="placement pages."
            description="Each programme maintains its own hiring network, role pathways, and outcome breakdown."
            align="left"
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {programmePlacementSummaries.map((programme) => (
            <ScrollReveal key={programme.href}>
              <Link
                href={programme.href}
                className="placement-programme-card group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  {programme.highlight}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{programme.title}</h3>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Focus</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">{programme.avgCtc}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Peak</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">{programme.highest}</p>
                  </div>
                </div>
                <span className="mt-auto pt-6 text-sm font-semibold text-accent transition group-hover:translate-x-1">
                  {programme.cta} →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

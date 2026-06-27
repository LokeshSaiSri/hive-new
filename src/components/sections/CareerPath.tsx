import Image from "next/image";
import Link from "next/link";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { careerEntryPoints, careerLadder } from "@/data/careerPaths";
import { revenueRolesDiagram } from "@/data/partners";

export function CareerPath() {
  return (
    <section id="career-path" className="section-band-light">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Where Revenue Roles Lead"
            statement="These roles run every"
            emphasis="modern business."
            description="Revenue roles compound into the top of every org chart. We train for the roles that eventually run businesses, not the roles that support them."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-8 sm:mt-10">
          <div className="premium-frame-dark mx-auto w-full max-w-3xl hover-lift-card">
            <div className="premium-surface-dark premium-metallic-edge overflow-hidden rounded-[calc(1.5rem-1px)] p-4 sm:p-6">
            <div className="card-metallic-dark-inset rounded-lg p-2 sm:p-3">
            <Image
              src={revenueRolesDiagram}
              alt="Revenue roles career path from SaaS, D2C, Consumer Tech and FMCG to CEO"
              width={1200}
              height={600}
              className="h-auto w-full"
              priority={false}
            />
            </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8 sm:mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {careerLadder.map((step, i) => (
              <span key={step} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold sm:px-5 sm:py-2.5 sm:text-base ${
                    i === careerLadder.length - 1
                      ? "chip-metallic-dark text-spark shadow-[0_16px_40px_rgba(6,15,50,0.22)] ring-2 ring-blue-glow/40"
                      : "chip-metallic-dark text-white/85"
                  }`}
                >
                  {step}
                </span>
                {i < careerLadder.length - 1 && (
                  <span className="text-mid-gray/40" aria-hidden>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8 sm:mt-10">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-mid-gray">
            Start from any industry
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            {careerEntryPoints.map((entry) => (
              <Link
                key={entry.industry}
                href={entry.href}
                className="group chip-metallic-dark px-4 py-2.5 transition-shadow hover:shadow-[0_16px_40px_rgba(6,15,50,0.22)] sm:px-5"
              >
                <span className="text-sm font-semibold text-white">
                  {entry.industry}
                </span>
                <span className="ml-2 text-sm text-white/55 group-hover:text-white/75">
                  {entry.roles}
                </span>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-12 text-center sm:mt-14">
          <PillButton variant="primary" tone="light" href="/pgp-revenue-tech-entrepreneurship#apply">
            Join Hiveschool
          </PillButton>
        </ScrollReveal>
      </div>
    </section>
  );
}

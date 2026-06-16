import Image from "next/image";
import Link from "next/link";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { exploreCards } from "@/data/explore";

export function ExploreSection() {
  return (
    <section className="section-band-dark">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Explore HiveSchool"
            statement="Dive deeper into"
            emphasis="the experience."
          />
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 sm:grid-cols-2">
          {exploreCards.map((card) => (
            <StaggerItem key={card.title}>
              <Link
                href={card.href}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_56px_rgba(0,0,0,0.28)] hover-lift-card"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/35 to-transparent" />
                <div className="absolute bottom-0 p-7 sm:p-9">
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/70 sm:text-base">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition group-hover:gap-3 group-hover:text-accent">
                    Explore
                    <span>→</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

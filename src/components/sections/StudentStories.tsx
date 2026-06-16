import { SectionIntro } from "@/components/ui/SectionIntro";
import { PortraitCard } from "@/components/ui/PortraitCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials } from "@/data/testimonials";

export function StudentStories() {
  return (
    <section className="section-band-dark overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Testimonials"
            statement="Hear it from"
            emphasis="our students."
          />
        </ScrollReveal>
      </div>

      <div className="mt-12">
        <HorizontalScroller
          marquee
          marqueePauseOnHover={false}
          marqueeSpeed="slow"
          slideClassName="basis-auto"
        >
          {testimonials.map((t) => (
            <PortraitCard
              key={t.name}
              image={t.image}
              name={t.name}
              role={`${t.role} @ ${t.company}`}
              videoId={t.videoId}
              size="large"
            />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

import { SectionIntro } from "@/components/ui/SectionIntro";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProgramStoryTheatre } from "@/components/program/ui/ProgramStoryTheatre";
import { testimonials } from "@/data/testimonials";

export function ProgramStudentStories() {
  return (
    <section className="program-section hive-dark-band section-py overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            align="left"
            eyebrow="Student voices"
            statement="Hear it from"
            emphasis="the cohort."
          />
        </ScrollReveal>
      </div>

      <div className="mt-10 sm:mt-12">
        <ProgramStoryTheatre label="Watch their stories" stories={testimonials} />
      </div>
    </section>
  );
}

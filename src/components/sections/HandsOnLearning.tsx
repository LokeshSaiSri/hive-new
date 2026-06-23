import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ExperientialStack } from "@/components/ui/ExperientialStack";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HandsOnLearning() {
  return (
    <>
      <section id="experiential-learning" className="bg-white pt-12 lg:pt-16">
        <div className="section-container">
          <ScrollReveal className="section-header-center">
            <SectionEyebrow>Hands-on Learning</SectionEyebrow>
            <h2 className="text-section font-bold leading-[1.08] tracking-tight">
              <span className="gradient-headline-light">Learn </span>
              <span className="font-serif italic text-brand-blue">
                &lsquo;Practically&rsquo;
              </span>
              <span className="gradient-headline-light"> by building </span>
              <em className="font-serif italic text-brand-blue">real outcomes.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-mid-gray sm:text-lg">
              Brand challenges, live consulting, and founder pitches — learning
              structured the way operators actually work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ExperientialStack />
    </>
  );
}

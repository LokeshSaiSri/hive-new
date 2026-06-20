import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ToolCategory } from "@/data/coursePages/pgp-tabs";
import { asset } from "@/lib/assets";

type CurriculumToolWallProps = {
  categories: ToolCategory[];
  intro?: string;
  variant?: "cards" | "showcase";
};

export function CurriculumToolWall({
  categories,
  intro,
  variant = "cards",
}: CurriculumToolWallProps) {
  const isShowcase = variant === "showcase";

  return (
    <section className="program-tab-section section-band-light overflow-hidden">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow="The tool stack"
            statement="Tools revenue teams"
            emphasis="actually use."
            description={intro}
            light
            align="left"
          />
        </ScrollReveal>

        <div
          className={
            isShowcase
              ? "curriculum-tool-showcase mt-10 lg:mt-14"
              : "mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5"
          }
        >
          {categories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.05}>
              {isShowcase ? (
                <article className="curriculum-tool-showcase__card">
                  <p className="curriculum-tool-showcase__index">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="curriculum-tool-showcase__title">{category.title}</h3>
                  {category.image && (
                    <div className="curriculum-tool-showcase__image-wrap">
                      <Image
                        src={asset(category.image)}
                        alt={category.title}
                        fill
                        className="object-contain object-center p-3"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <ul className="curriculum-tool-showcase__tags">
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ) : (
                <article className="curriculum-tool-wall__card">
                  <p className="curriculum-tool-wall__index">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="curriculum-tool-wall__title">{category.title}</h3>
                  {category.image && (
                    <div className="curriculum-tool-wall__image-wrap">
                      <Image
                        src={asset(category.image)}
                        alt={category.title}
                        fill
                        className="object-contain object-left"
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>
                  )}
                  <ul className="curriculum-tool-wall__list">
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

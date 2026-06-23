"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CourseVisualStoryProps = {
  pillars: NonNullable<CoursePageConfig["pillars"]>;
  audience: NonNullable<CoursePageConfig["audience"]>;
  highlights: NonNullable<CoursePageConfig["highlights"]>;
  paths: NonNullable<CoursePageConfig["paths"]>;
};

type VisualCardProps = {
  image?: string;
  index: string;
  title: string;
  tagline?: string;
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
  href?: string;
  children?: React.ReactNode;
};

function VisualCard({
  image,
  index,
  title,
  tagline,
  tone = "light",
  sizes = "33vw",
  priority,
  href,
  children,
}: VisualCardProps) {
  const body = (
    <>
      {image && (
        <div className="visual-card__media">
          <Image
            src={image}
            alt=""
            fill
            className="visual-card__img"
            sizes={sizes}
            priority={priority}
          />
        </div>
      )}
      <div className="visual-card__body">
        <p className="visual-card__index">{index}</p>
        <h3 className="visual-card__title">{title}</h3>
        {tagline && <p className="visual-card__tagline">{tagline}</p>}
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`visual-card visual-card--${tone} visual-card--link`}>
        {body}
      </Link>
    );
  }

  return <article className={`visual-card visual-card--${tone}`}>{body}</article>;
}

export function CourseVisualStory({
  pillars,
  audience,
  highlights,
  paths,
}: CourseVisualStoryProps) {
  return (
    <div className="visual-story">
      <section className="section-band-light section-py-tight" aria-label={pillars.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={pillars.eyebrow}
              statement={pillars.statement}
              emphasis={pillars.emphasis}
              light
              align="center"
            />
          </ScrollReveal>

          <div className="md:hidden mt-10">
            <ScrollReveal>
              <HorizontalScroller
                autoplay
                autoplayDelay={3000}
                slideClassName="w-[85vw] flex-shrink-0"
              >
                {pillars.items.map((pillar, index) => (
                  <article key={pillar.index} className="visual-pillar-card h-full">
                    {pillar.image && (
                      <div className="visual-pillar-card__media">
                        <Image
                          src={pillar.image}
                          alt=""
                          fill
                          className="visual-card__img"
                          sizes="(max-width: 768px) 85vw, 25vw"
                          priority={index === 0}
                        />
                      </div>
                    )}
                    <div className="visual-pillar-card__body">
                      <p className="visual-pillar-card__index">{pillar.index}</p>
                      <h3 className="visual-pillar-card__title">{pillar.title}</h3>
                      {pillar.tagline && (
                        <p className="visual-pillar-card__tagline">{pillar.tagline}</p>
                      )}
                    </div>
                  </article>
                ))}
              </HorizontalScroller>
            </ScrollReveal>
          </div>

          <div className="hidden md:block">
            <div className="visual-pillar-grid mt-8">
              {pillars.items.map((pillar, index) => (
                <ScrollReveal key={pillar.index} delay={index * 0.04} className="h-full">
                  <article className="visual-pillar-card h-full">
                    {pillar.image && (
                      <div className="visual-pillar-card__media">
                        <Image
                          src={pillar.image}
                          alt=""
                          fill
                          className="visual-card__img"
                          sizes="(max-width: 768px) 72vw, 25vw"
                          priority={index === 0}
                        />
                      </div>
                    )}
                    <div className="visual-pillar-card__body">
                      <p className="visual-pillar-card__index">{pillar.index}</p>
                      <h3 className="visual-pillar-card__title">{pillar.title}</h3>
                      {pillar.tagline && (
                        <p className="visual-pillar-card__tagline">{pillar.tagline}</p>
                      )}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hive-dark-band section-py" aria-label={audience.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={audience.eyebrow}
              statement={audience.statement}
              emphasis={audience.emphasis}
              light={false}
              align="center"
            />
          </ScrollReveal>

          <div className="md:hidden mt-10">
            <ScrollReveal>
              <HorizontalScroller
                autoplay
                autoplayDelay={3000}
                slideClassName="w-[85vw] flex-shrink-0"
              >
                {audience.items.map((item, index) => (
                  <div key={item.index} className="h-full">
                    <VisualCard
                      image={item.image}
                      index={item.index}
                      title={item.title}
                      tagline={item.tagline}
                      tone="dark"
                      sizes="(max-width: 768px) 85vw, 33vw"
                    />
                  </div>
                ))}
              </HorizontalScroller>
            </ScrollReveal>
          </div>

          <div className="hidden md:block">
            <div className="visual-story__grid visual-story__grid--trio mt-12">
              {audience.items.map((item, index) => (
                <ScrollReveal key={item.index} delay={index * 0.05} className="h-full">
                  <div className="h-full">
                    <VisualCard
                      image={item.image}
                      index={item.index}
                      title={item.title}
                      tagline={item.tagline}
                      tone="dark"
                      sizes="(max-width: 768px) 82vw, 33vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-light section-py" aria-label={highlights.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={highlights.eyebrow}
              statement={highlights.statement}
              emphasis={highlights.emphasis}
              light
              align="center"
            />
          </ScrollReveal>

          <div className="md:hidden mt-10">
            <ScrollReveal>
              <HorizontalScroller
                autoplay
                autoplayDelay={3000}
                slideClassName="w-[85vw] flex-shrink-0"
              >
                {highlights.items.map((item, index) => (
                  <Link key={item.index} href={item.href} className="visual-method-card visual-card--link h-full">
                    <p className="visual-method-card__step">{item.index}</p>
                    {item.image && (
                      <div className="visual-method-card__media">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="visual-card__img"
                          sizes="(max-width: 768px) 85vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="visual-method-card__body">
                      <h3 className="visual-method-card__title">{item.title}</h3>
                      <p className="visual-method-card__sub">{item.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </HorizontalScroller>
            </ScrollReveal>
          </div>

          <div className="hidden md:block">
            <div className="visual-story__grid visual-story__grid--method mt-12">
              {highlights.items.map((item, index) => (
                <ScrollReveal key={item.index} delay={index * 0.05} className="h-full">
                  <Link href={item.href} className="visual-method-card visual-card--link h-full">
                    <p className="visual-method-card__step">{item.index}</p>
                    {item.image && (
                      <div className="visual-method-card__media">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="visual-card__img"
                          sizes="(max-width: 768px) 82vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="visual-method-card__body">
                      <h3 className="visual-method-card__title">{item.title}</h3>
                      <p className="visual-method-card__sub">{item.subtitle}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hive-dark-band section-py" aria-label={paths.eyebrow}>
        <div className="section-container">
          <ScrollReveal>
            <SectionIntro
              eyebrow={paths.eyebrow}
              statement={paths.statement}
              emphasis={paths.emphasis}
              light={false}
              align="center"
            />
          </ScrollReveal>

          <div className="md:hidden mt-10">
            <ScrollReveal>
              <HorizontalScroller
                autoplay
                autoplayDelay={3000}
                slideClassName="w-[85vw] flex-shrink-0"
              >
                {paths.items.map((path, index) => (
                  <div key={path.index} className="h-full">
                    <VisualCard
                      image={path.image}
                      index={path.index}
                      title={path.title}
                      tagline={path.tagline}
                      tone="dark"
                      sizes="(max-width: 768px) 85vw, 33vw"
                    >
                      <div className="visual-card__tags">
                        {path.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </VisualCard>
                  </div>
                ))}
              </HorizontalScroller>
            </ScrollReveal>
          </div>

          <div className="hidden md:block">
            <div className="visual-story__grid visual-story__grid--trio mt-12">
              {paths.items.map((path, index) => (
                <ScrollReveal key={path.index} delay={index * 0.05} className="h-full">
                  <div className="h-full">
                    <VisualCard
                      image={path.image}
                      index={path.index}
                      title={path.title}
                      tagline={path.tagline}
                      tone="dark"
                      sizes="(max-width: 768px) 82vw, 33vw"
                    >
                      <div className="visual-card__tags">
                        {path.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </VisualCard>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

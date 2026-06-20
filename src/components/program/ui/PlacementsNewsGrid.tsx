"use client";

import Image from "next/image";
import Link from "next/link";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { NewsArticle } from "@/data/coursePages/pgp-tabs";

type PlacementsNewsGridProps = {
  articles: NewsArticle[];
  compact?: boolean;
};

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="placement-press-card__date-icon"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 3v4M16 3v4M3 10h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="placement-press-card__cta-icon"
    >
      <path
        d="M14 5h5v5M10 14L19 5M19 14v5h-5M5 10v9h9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PressNewsCard({ article }: { article: NewsArticle }) {
  const external = isExternalHref(article.href);
  const content = (
    <>
      <div className="placement-press-card__media">
        <Image
          src={article.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 120px, 140px"
        />
      </div>
      <div className="placement-press-card__body">
        <span className="placement-press-card__badge">{article.outlet}</span>
        <h3 className="placement-press-card__title">{article.title}</h3>
        <div className="placement-press-card__date">
          <CalendarIcon />
          <time dateTime={article.date}>{article.date}</time>
        </div>
        <div className="placement-press-card__divider" aria-hidden="true" />
        <span className="placement-press-card__cta">
          View Article
          <ExternalLinkIcon />
        </span>
      </div>
    </>
  );

  const className =
    "placement-press-card shrink-0 w-[min(17.5rem,calc(100vw-2.5rem))]";

  if (external) {
    return (
      <a
        href={article.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={article.href} className={className}>
      {content}
    </Link>
  );
}

export function PlacementsNewsGrid({ articles, compact = false }: PlacementsNewsGridProps) {
  return (
    <section
      className={`program-tab-section hive-dark-band overflow-hidden ${
        compact ? "py-12 sm:py-14" : "section-py"
      }`}
    >
      <div className="section-container">
        <SectionIntro
          eyebrow="In the news"
          statement="As featured in India's"
          emphasis="leading publications."
          description="Latest · Year 2 PGP Cohort 1: ₹16.47L avg · ₹27.8L highest · +184% avg salary jump"
          light={false}
          align="left"
        />
      </div>

      <div className={`placement-press-rail ${compact ? "mt-8" : "mt-10 lg:mt-14"}`}>
        <HorizontalScroller
          marquee
          marqueeAlways
          marqueePauseOnHover={false}
          marqueeSpeed="slow"
          bleed
          slideClassName="basis-[17.5rem] sm:basis-[19rem] lg:basis-[20.5rem]"
        >
          {articles.map((article) => (
            <PressNewsCard key={`${article.outlet}-${article.date}`} article={article} />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

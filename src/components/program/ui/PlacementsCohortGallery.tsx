"use client";

import Image from "next/image";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  placementHandbooks,
  placementReportEditions,
  type PlacementReportEdition,
  type PlacementReportPage,
} from "@/data/placementReports";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

type FlipbookApi = {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (page: number) => void;
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
};

type BookRef = {
  pageFlip: () => FlipbookApi;
};

const FlipbookShell = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  function FlipbookShell({ children, className = "" }, ref) {
    return (
      <div ref={ref} className={`placement-flipbook-page ${className}`}>
        {children}
      </div>
    );
  },
);

function Year1DesignedPage({
  pageId,
}: {
  pageId: Extract<PlacementReportPage, { type: "designed" }>["id"];
}) {
  if (pageId === "year1-cover") {
    return (
      <div className="placement-flipbook-designed placement-flipbook-designed--cover">
        <p className="placement-flipbook-designed__brand">HiveSchool</p>
        <h3 className="placement-flipbook-designed__title">Placement Report</h3>
        <p className="placement-flipbook-designed__edition">Edition 01 · 2024–25</p>
        <p className="placement-flipbook-designed__subtitle">Inaugural online cohort</p>
        <div className="placement-flipbook-designed__rule" />
        <p className="placement-flipbook-designed__tagline">Audited placement outcomes</p>
      </div>
    );
  }

  if (pageId === "year1-stats") {
    return (
      <div className="placement-flipbook-designed">
        <p className="placement-flipbook-designed__kicker">Year 1 outcomes</p>
        <h3 className="placement-flipbook-designed__heading">Inaugural online cohort</h3>
        <div className="placement-flipbook-designed__metrics">
          <div>
            <span>Average CTC</span>
            <strong>₹14.76L</strong>
          </div>
          <div>
            <span>Highest CTC</span>
            <strong>₹30L</strong>
          </div>
        </div>
        <p className="placement-flipbook-designed__copy">
          The inaugural online cohort set the floor for HiveSchool placement outcomes before the
          residential PGP launched.
        </p>
      </div>
    );
  }

  if (pageId === "year1-outcomes") {
    return (
      <div className="placement-flipbook-designed">
        <p className="placement-flipbook-designed__kicker">Where graduates went</p>
        <h3 className="placement-flipbook-designed__heading">Consumer tech · SaaS · D2C</h3>
        <ul className="placement-flipbook-designed__list">
          <li>B2B sales &amp; revenue roles across SaaS</li>
          <li>Growth &amp; marketing at D2C brands</li>
          <li>Founder&apos;s office at high-growth startups</li>
          <li>Enterprise partnerships &amp; GTM</li>
        </ul>
        <p className="placement-flipbook-designed__copy">
          Full audited breakdown in the Year 2 residential report.
        </p>
      </div>
    );
  }

  return (
    <div className="placement-flipbook-designed placement-flipbook-designed--back">
      <p className="placement-flipbook-designed__brand">HiveSchool</p>
      <p className="placement-flipbook-designed__edition">Year 1 · 2024–25</p>
      <div className="placement-flipbook-designed__metrics placement-flipbook-designed__metrics--compact">
        <div>
          <span>Avg</span>
          <strong>₹14.76L</strong>
        </div>
        <div>
          <span>High</span>
          <strong>₹30L</strong>
        </div>
      </div>
    </div>
  );
}

function ImagePage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="placement-flipbook-image">
      <Image src={src} alt={alt} fill className="object-cover object-top" sizes="420px" priority />
    </div>
  );
}

function formatSpreadLabel(currentIndex: number, total: number) {
  const left = currentIndex + 1;
  const right = Math.min(currentIndex + 2, total);
  const spread =
    left === right ? `${left}` : right <= total ? `${left}-${right}` : `${left}`;
  return `${spread}/${total}`;
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FlipbookViewer({
  edition,
  onPageChange,
  scrubPage,
}: {
  edition: PlacementReportEdition;
  onPageChange: (page: number, total: number) => void;
  scrubPage: number | null;
}) {
  const bookRef = useRef<BookRef>(null);
  const [ready, setReady] = useState(false);
  const totalPages = edition.pages.length;

  const flip = useCallback((direction: "prev" | "next") => {
    const api = bookRef.current?.pageFlip();
    if (!api) return;
    if (direction === "prev") api.flipPrev();
    else api.flipNext();
  }, []);

  const handleFlip = useCallback(
    (event: { data: number }) => {
      onPageChange(event.data, totalPages);
    },
    [onPageChange, totalPages],
  );

  const handleInit = useCallback(() => {
    setReady(true);
    const api = bookRef.current?.pageFlip();
    if (api) onPageChange(api.getCurrentPageIndex(), api.getPageCount());
  }, [onPageChange]);

  useEffect(() => {
    setReady(false);
  }, [edition.id]);

  useEffect(() => {
    if (scrubPage === null) return;
    const api = bookRef.current?.pageFlip();
    if (!api || !ready) return;
    api.flip(scrubPage);
  }, [scrubPage, ready]);

  const [bookWidth, setBookWidth] = useState(300);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerWidth;
      setBookWidth(Math.min(340, Math.max(220, viewport - 88)));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const bookHeight = Math.round(bookWidth * 1.415);

  const pages = useMemo(
    () =>
      edition.pages.map((page, index) => {
        const isCover = index === 0 || index === edition.pages.length - 1;

        if (page.type === "image") {
          return (
            <FlipbookShell key={`${edition.id}-${index}`} className={isCover ? "is-cover" : ""}>
              <div data-density={isCover ? "hard" : "soft"} className="placement-flipbook-page__inner">
                <ImagePage src={page.src} alt={page.alt} />
              </div>
            </FlipbookShell>
          );
        }

        return (
          <FlipbookShell key={`${edition.id}-${index}`} className={isCover ? "is-cover" : ""}>
            <div data-density={isCover ? "hard" : "soft"} className="placement-flipbook-page__inner">
              <Year1DesignedPage pageId={page.id} />
            </div>
          </FlipbookShell>
        );
      }),
    [edition.id, edition.pages],
  );

  return (
    <div className="placement-flipbook-viewer">
      <button
        type="button"
        className="placement-flipbook-nav placement-flipbook-nav--prev"
        onClick={() => flip("prev")}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </button>

      <div className="placement-flipbook-book">
        {!ready && <div className="placement-flipbook-loading">Loading report…</div>}
        <HTMLFlipBook
          key={edition.id}
          ref={bookRef}
          className="placement-flipbook-instance"
          style={{}}
          width={bookWidth}
          height={bookHeight}
          size="stretch"
          minWidth={220}
          maxWidth={460}
          minHeight={320}
          maxHeight={680}
          drawShadow
          flippingTime={720}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.42}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={24}
          showPageCorners
          disableFlipByClick={false}
          startPage={0}
          onFlip={handleFlip}
          onInit={handleInit}
        >
          {pages}
        </HTMLFlipBook>
      </div>

      <button
        type="button"
        className="placement-flipbook-nav placement-flipbook-nav--next"
        onClick={() => flip("next")}
        aria-label="Next page"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export function PlacementsCohortGallery({ className }: { className?: string }) {
  const [activeEditionId, setActiveEditionId] = useState(placementReportEditions[0]?.id ?? "year-2");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(placementReportEditions[0]?.pages.length ?? 0);
  const [scrubPage, setScrubPage] = useState<number | null>(null);

  const activeEdition =
    placementReportEditions.find((edition) => edition.id === activeEditionId) ??
    placementReportEditions[0];

  const handlePageChange = useCallback((page: number, total: number) => {
    setPageIndex(page);
    setPageTotal(total);
    setScrubPage(null);
  }, []);

  const handleScrub = (value: number) => {
    setPageIndex(value);
    setScrubPage(value);
  };

  return (
    <section className={`placement-flipbook-section section-py ${className ?? ""}`}>
      <div className="placement-flipbook-section__intro section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Placement handbooks"
            statement="Download the"
            emphasis="latest editions."
            description="Placement Report 2025–26 and the HiveSchool digital brochure — in the order published for applicants and hiring partners."
            light
            align="left"
          />
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {placementHandbooks.map((handbook) => (
            <ScrollReveal key={handbook.id}>
              <article className="placement-edition-card group overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_24px_70px_rgba(6,15,50,0.08)]">
                <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="relative aspect-[4/5] min-h-[200px] sm:aspect-auto sm:min-h-[240px]">
                    <Image
                      src={handbook.coverImage}
                      alt={`${handbook.title} cover`}
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-light-blue">
                      {handbook.year}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-ink">{handbook.title}</h3>
                    <p className="mt-2 text-sm text-mid-gray">{handbook.subtitle}</p>
                    <div className="mt-5">
                      <PillButton href={handbook.pdfHref} variant="primary" tone="light">
                        Download PDF
                      </PillButton>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-14">
          <SectionIntro
            eyebrow="Placement reports"
            statement="Audited outcomes."
            emphasis="Flip through each edition."
            description="Browse Year 1 and Year 2 placement reports in an interactive flipbook — the same Scratch Magazine experience as Masters' Union."
            light
            align="left"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton variant="highlight" tone="light" href={activeEdition.pdfHref}>
              Download {activeEdition.label} report
            </PillButton>
            <PillButton variant="secondary" tone="light" href="/pgp/placements">
              View all placements
            </PillButton>
          </div>
        </ScrollReveal>
      </div>

      <div className="placement-flipbook-stage">
        <div className="placement-flipbook-stage__inner section-container">
          <aside className="placement-flipbook-sidebar" aria-label="Report editions">
            {placementReportEditions.map((edition) => (
              <button
                key={edition.id}
                type="button"
                className={`placement-flipbook-thumb ${
                  edition.id === activeEditionId ? "is-active" : ""
                }`}
                onClick={() => {
                  setActiveEditionId(edition.id);
                  setPageIndex(0);
                  setPageTotal(edition.pages.length);
                  setScrubPage(null);
                }}
                aria-pressed={edition.id === activeEditionId}
              >
                <div className="placement-flipbook-thumb__cover">
                  <Image
                    src={edition.coverImage}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
                <div className="placement-flipbook-thumb__meta">
                  <p>{edition.edition}</p>
                  <strong>{edition.year}</strong>
                </div>
              </button>
            ))}
          </aside>

          <div className="placement-flipbook-main">
            <FlipbookViewer
              edition={activeEdition}
              onPageChange={handlePageChange}
              scrubPage={scrubPage}
            />

            <div className="placement-flipbook-toolbar">
              <p className="placement-flipbook-toolbar__count">
                {formatSpreadLabel(pageIndex, pageTotal)}
              </p>
              <input
                type="range"
                min={0}
                max={Math.max(0, pageTotal - 1)}
                value={pageIndex}
                onChange={(event) => handleScrub(Number(event.target.value))}
                className="placement-flipbook-toolbar__scrub"
                aria-label="Jump to page"
              />
              <a
                href={activeEdition.pdfHref}
                className="placement-flipbook-toolbar__download"
                target={activeEdition.pdfHref.endsWith(".pdf") ? "_blank" : undefined}
                rel={activeEdition.pdfHref.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              >
                PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

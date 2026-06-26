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
import { startupHandbookPages } from "@/data/startupHandbook";

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
  onPageChange,
  scrubPage,
}: {
  onPageChange: (page: number, total: number) => void;
  scrubPage: number | null;
}) {
  const bookRef = useRef<BookRef>(null);
  const [ready, setReady] = useState(false);
  const totalPages = startupHandbookPages.length;

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
    setReady(true);
  }, []);

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
      startupHandbookPages.map((page, index) => {
        const isCover = index === 0 || index === startupHandbookPages.length - 1;

        return (
          <FlipbookShell key={`handbook-${index}`} className={isCover ? "is-cover" : ""}>
            <div data-density={isCover ? "hard" : "soft"} className="placement-flipbook-page__inner">
              <ImagePage src={page.src} alt={page.alt} />
            </div>
          </FlipbookShell>
        );
      }),
    [],
  );

  return (
    <div className="placement-flipbook-viewer">
      <button
        type="button"
        suppressHydrationWarning
        className="placement-flipbook-nav placement-flipbook-nav--prev"
        onClick={() => flip("prev")}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </button>

      <div className="placement-flipbook-book">
        <HTMLFlipBook
          key="startup-handbook"
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
        suppressHydrationWarning
        className="placement-flipbook-nav placement-flipbook-nav--next"
        onClick={() => flip("next")}
        aria-label="Next page"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export function StartupsBuiltGallery({ className }: { className?: string }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(startupHandbookPages.length);
  const [scrubPage, setScrubPage] = useState<number | null>(null);

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
      <div className="placement-flipbook-stage">
        <div className="placement-flipbook-stage__inner section-container">
          <aside className="placement-flipbook-sidebar" aria-label="Report editions">
            <button
              type="button"
              suppressHydrationWarning
              className="placement-flipbook-thumb is-active"
              aria-pressed={true}
            >
              <div className="placement-flipbook-thumb__cover">
                <Image
                  src={startupHandbookPages[0].src}
                  alt="Startup Handbook Cover"
                  fill
                  className="object-cover object-top"
                  sizes="120px"
                />
              </div>
              <div className="placement-flipbook-thumb__meta">
                <p>Edition 01</p>
                <strong>2026</strong>
              </div>
            </button>
          </aside>

          <div className="placement-flipbook-main">
            <FlipbookViewer
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
                href="/startup Handbook.pdf"
                className="placement-flipbook-toolbar__download"
                target="_blank"
                rel="noopener noreferrer"
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

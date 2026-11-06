"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-ink-deep">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #1e44e2 0%, #869dff 60%, #ffcf00 100%)",
          boxShadow: "0 0 12px rgba(30,68,226,0.5)",
        }}
      />
    </div>
  );
}

export function StickySidebar({ title }: { title: string }) {
  const handleShare = (platform: "linkedin") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Share Section */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/40 mb-3">
          Share
        </p>
        <div className="flex gap-2">
          <a
            href="https://instagram.com/hiveschool.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HiveSchool on Instagram"
            className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-[0.75rem] border border-border-soft bg-surface-lavender text-ink/70 hover:text-ink hover:border-border-soft/80 hover:bg-surface-muted transition-all duration-200 text-xs font-semibold shadow-sm hover:shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <button
            onClick={() => handleShare("linkedin")}
            aria-label="Share on LinkedIn"
            className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-[0.75rem] border border-border-soft bg-surface-lavender text-ink/70 hover:text-ink hover:border-border-soft/80 hover:bg-surface-muted transition-all duration-200 text-xs font-semibold shadow-sm hover:shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-soft" />

      {/* High-Conversion CTA */}
      <div className="relative group overflow-hidden rounded-[1rem] bg-gradient-to-br from-ink to-ink-deep p-[1px]">
        {/* Glow effect on hover */}
        <div className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#1e44e2_50%,#000000_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]" />
        
        <div className="relative bg-ink-deep h-full w-full rounded-[calc(1rem-1px)] p-6">
          <p className="text-lg font-bold text-white leading-snug mb-2 tracking-tight">
            Ready to master revenue generation?
          </p>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Join India's most elite sales & Go-To-Market programme at HiveSchool.
          </p>
          
          <a
            href="/pgp-revenue-tech-entrepreneurship#apply"
            className="group/btn flex items-center justify-between w-full px-5 py-3.5 rounded-[0.75rem] bg-electric-blue text-white shadow-[0_10px_20px_rgba(30,68,226,0.3)] hover:shadow-[0_10px_30px_rgba(30,68,226,0.5)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="text-sm font-bold tracking-wide">Apply Now</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useVideo } from "@/components/providers/VideoProvider";
import { easeHive } from "@/lib/motion";

const logoSizes = {
  sm: {
    box: "min-h-9 min-w-[72px] max-w-[92px] px-2 py-1",
    img: "max-h-[18px]",
    text: "text-[7px] px-1 leading-snug",
  },
  list: {
    box: "min-h-10 min-w-[76px] max-w-[96px] px-2.5 py-1",
    img: "max-h-[18px]",
    text: "text-[8px] px-1 leading-snug",
  },
  md: {
    box: "min-h-10 min-w-[88px] px-3 py-1",
    img: "max-h-5",
    text: "text-[9px] leading-snug",
  },
  lg: {
    box: "min-h-12 min-w-[100px] px-3.5 py-1.5",
    img: "max-h-7",
    text: "text-[10px] leading-snug",
  },
};

export function CompanyLogoBadge({
  company,
  logo,
  size = "md",
}: {
  company: string;
  logo?: string;
  size?: "sm" | "list" | "md" | "lg";
}) {
  const s = logoSizes[size === "sm" ? "sm" : size === "list" ? "list" : size === "lg" ? "lg" : "md"];

  if (logo) {
    return (
      <span
        className={`inline-flex ${s.box} shrink-0 items-center justify-center overflow-visible rounded-xl bg-white shadow-sm`}
      >
        <Image
          src={logo}
          alt={company}
          width={72}
          height={28}
          className={`${s.img} w-auto max-w-full object-contain`}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex ${s.box} shrink-0 items-center justify-center overflow-visible rounded-xl bg-white/10 text-center font-bold uppercase tracking-wide text-white/70 ${s.text}`}
    >
      <span className="line-clamp-2">{company}</span>
    </span>
  );
}

type HeroStudentCardProps = {
  src: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  videoId: string;
  isActive: boolean;
  onSelect: () => void;
};

export function HeroStudentListItem({
  src,
  name,
  role,
  company,
  companyLogo,
  videoId,
  isActive,
  onSelect,
}: HeroStudentCardProps) {
  const { openVideo } = useVideo();

  return (
    <motion.button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={() => openVideo(videoId)}
      layout
      animate={{
        backgroundColor: isActive
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.28, ease: easeHive }}
      className={`flex w-full min-h-[58px] items-center gap-3 rounded-lg px-3 py-3 text-left sm:min-h-[64px] sm:px-3.5 sm:py-3.5 ${
        isActive
          ? "ring-1 ring-white/45"
          : "hover:bg-white/5"
      }`}
    >
      <motion.span
        layout
        animate={{
          scale: isActive ? 1.04 : 1,
          boxShadow: isActive
            ? "0 0 0 2px rgb(255 207 0)"
            : "0 0 0 2px rgba(255, 255, 255, 0.15)",
        }}
        transition={{ duration: 0.28, ease: easeHive }}
        className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12"
      >
        <Image src={src} alt={name} fill className="object-cover" sizes="48px" />
      </motion.span>
      <CompanyLogoBadge company={company} logo={companyLogo} size="list" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold leading-snug text-white sm:text-[15px]">
          {name}
        </span>
        <span className="block truncate text-xs leading-snug text-white/50 sm:text-[13px]">
          {role}
        </span>
      </span>
      <motion.span
        animate={{
          scale: isActive ? 1.05 : 1,
          backgroundColor: isActive
            ? "rgb(255 207 0)"
            : "rgba(255, 255, 255, 0.1)",
          color: isActive ? "rgb(6 15 50)" : "rgba(255, 255, 255, 0.6)",
        }}
        transition={{ duration: 0.28, ease: easeHive }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
          <path d="M8 5v14l11-7z" />
        </svg>
      </motion.span>
    </motion.button>
  );
}

export function HeroStudentFeatured({
  src,
  name,
  role,
  company,
  companyLogo,
  videoId,
  previewMode = false,
}: Omit<HeroStudentCardProps, "isActive" | "onSelect"> & { previewMode?: boolean }) {
  const { openVideo } = useVideo();

  return (
    <button
      type="button"
      onClick={() => {
        if (!previewMode) openVideo(videoId);
      }}
      className={`group flex w-full max-w-[220px] flex-col items-center gap-4 text-left sm:max-w-[240px] ${
        previewMode ? "cursor-default" : "cursor-pointer"
      }`}
      aria-label={previewMode ? `${name} selected` : `Play testimonial from ${name}`}
    >
      <div className="hero-polaroid w-[165px] p-2.5 pb-3.5 shadow-xl transition-transform duration-300 group-hover:-translate-y-1 sm:w-[185px]">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="185px"
            priority
          />
          <div className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/5" />
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/95 text-ink shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 text-ink">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>
        <p className="mt-2.5 px-0.5 text-center text-xs font-bold leading-tight text-ink/75 sm:text-sm">
          {name}
        </p>
      </div>

      <div className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:px-4 sm:py-4">
        <CompanyLogoBadge company={company} logo={companyLogo} size="lg" />
        <p className="mt-3 text-sm leading-relaxed text-white/75">{role}</p>
        <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-px h-3 w-3 text-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {previewMode ? "Preview on the right" : "Play story"}
        </p>
      </div>
    </button>
  );
}

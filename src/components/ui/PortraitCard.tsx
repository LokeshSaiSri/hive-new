"use client";

import Image from "next/image";
import { useVideo } from "@/components/providers/VideoProvider";

type PortraitCardProps = {
  image: string;
  name: string;
  role: string;
  companyLabel?: string;
  companyLogo?: string;
  videoId?: string;
  className?: string;
  size?: "default" | "large";
  metallic?: boolean;
  layout?: "fixed" | "fluid";
  active?: boolean;
  onSelect?: () => void;
  onHoverStart?: () => void;
};

export function PortraitCard({
  image,
  name,
  role,
  companyLabel,
  companyLogo,
  videoId,
  className = "",
  size = "default",
  metallic = false,
  layout = "fixed",
  active = false,
  onSelect,
  onHoverStart,
}: PortraitCardProps) {
  const { openVideo } = useVideo();
  const widthClass =
    layout === "fluid" ? "w-full" : size === "large" ? "w-[280px] sm:w-[300px]" : "w-[260px]";

  const handleClick = () => {
    if (onSelect) {
      onSelect();
      return;
    }
    if (videoId) openVideo(videoId);
  };

  const card = (
    <button
      type="button"
      onMouseEnter={onHoverStart}
      onClick={handleClick}
      className={`group relative block aspect-[3/4] w-full shrink-0 overflow-hidden text-left ${
        metallic ? "rounded-[calc(1.5rem-1px)]" : "rounded-2xl"
      } ${onSelect ? "cursor-pointer" : ""} hover-lift-card ${className} ${
        active ? "ring-2 ring-brand-yellow ring-offset-2 ring-offset-ink" : ""
      }`}
      aria-label={`Preview ${name}'s story`}
      aria-pressed={active}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="300px"
      />
      <div className="overlay-portrait absolute inset-0" />
      {(companyLabel || companyLogo) && (
        <span className="absolute right-3 top-3 flex h-8 max-w-[110px] items-center justify-center rounded-full bg-white px-2.5 shadow-sm">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={companyLabel ?? name}
              width={72}
              height={20}
              className="h-4 w-auto max-w-full object-contain"
            />
          ) : (
            <span className="truncate text-[9px] font-bold uppercase tracking-wide text-ink">
              {companyLabel}
            </span>
          )}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-base font-bold leading-tight text-white">{name}</p>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/75">{role}</p>
      </div>
      {videoId && (
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4 text-ink" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}
    </button>
  );

  if (metallic) {
    return (
      <div className={`premium-frame-dark shrink-0 ${widthClass}`}>
        {card}
      </div>
    );
  }

  return <div className={`shrink-0 ${widthClass}`}>{card}</div>;
}

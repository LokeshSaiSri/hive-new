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
}: PortraitCardProps) {
  const { openVideo } = useVideo();
  const widthClass = size === "large" ? "w-[280px] sm:w-[300px]" : "w-[260px]";

  const card = (
    <div
      className={`group relative aspect-[3/4] shrink-0 overflow-hidden ${
        metallic ? "rounded-[calc(1.5rem-1px)]" : "rounded-2xl"
      } hover-lift-card ${metallic ? "w-full" : widthClass} ${className}`}
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
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/75">
          {role}
        </p>
      </div>
      {videoId && (
        <button
          type="button"
          onClick={() => openVideo(videoId)}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100"
          aria-label={`Play video for ${name}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5 h-4 w-4 text-ink"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );

  if (metallic) {
    return (
      <div className={`premium-frame-dark shrink-0 ${widthClass}`}>
        {card}
      </div>
    );
  }

  return card;
}

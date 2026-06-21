import Image from "next/image";
import type { PartnerLogo } from "@/data/partners";

type HiringPartnerLogoProps = PartnerLogo & {
  /** Parent section background — mono logos invert on dark, stay dark on light */
  surface?: "dark" | "light";
  size?: "default" | "compact" | "panel";
};

function logoImageClass(
  treatment: PartnerLogo["treatment"] = "mono",
  surface: "dark" | "light" = "dark",
) {
  if (treatment === "color") return "opacity-90 saturate-110";
  if (treatment === "light") return "opacity-90";
  return surface === "dark"
    ? "opacity-85 brightness-0 invert"
    : "opacity-75 brightness-0";
}

export function HiringPartnerLogo({
  name,
  src,
  treatment = "mono",
  surface = "dark",
  size = "default",
}: HiringPartnerLogoProps) {
  const isSvg = src.endsWith(".svg");
  const compact = size === "compact";
  const panel = size === "panel";

  const containerClass = compact
    ? "flex h-8 min-w-[5.5rem] max-w-[7rem] shrink-0 items-center justify-center px-2"
    : panel
      ? "flex h-12 min-w-[6rem] max-w-[8.5rem] shrink-0 items-center justify-center px-2"
      : "flex h-14 min-w-[8.5rem] max-w-[10.5rem] shrink-0 items-center justify-center px-4";

  const imageHeightClass = compact ? "h-[1.1rem]" : panel ? "h-7" : "h-8";

  return (
    <div className={containerClass}>
      <Image
        src={src}
        alt={name}
        width={140}
        height={48}
        unoptimized={isSvg}
        className={`w-auto max-w-full object-contain transition hover:opacity-100 ${imageHeightClass} ${logoImageClass(treatment, surface)}`}
      />
    </div>
  );
}

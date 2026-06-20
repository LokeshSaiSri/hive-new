import Image from "next/image";
import type { PartnerLogo } from "@/data/partners";

type HiringPartnerLogoProps = PartnerLogo & {
  /** Parent section background — mono logos invert on dark, stay dark on light */
  surface?: "dark" | "light";
  size?: "default" | "compact";
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

  return (
    <div
      className={
        compact
          ? "flex h-8 min-w-[5.5rem] max-w-[7rem] shrink-0 items-center justify-center px-2"
          : "flex h-14 min-w-[8.5rem] max-w-[10.5rem] shrink-0 items-center justify-center px-4"
      }
    >
      <Image
        src={src}
        alt={name}
        width={140}
        height={48}
        unoptimized={isSvg}
        className={`w-auto max-w-full object-contain transition hover:opacity-100 ${
          compact ? "h-[1.1rem]" : "h-8"
        } ${logoImageClass(treatment, surface)}`}
      />
    </div>
  );
}

import type { ReactNode } from "react";

type SectionBandProps = {
  id?: string;
  variant?: "light" | "dark" | "ink";
  children: ReactNode;
  className?: string;
  bleed?: boolean;
};

export function SectionBand({
  id,
  variant = "light",
  children,
  className = "",
  bleed = false,
}: SectionBandProps) {
  const bg =
    variant === "dark" || variant === "ink"
      ? "hive-dark-band"
      : "bg-white text-ink";

  return (
    <section
      id={id}
      className={`${bg} ${bleed ? "" : "section-py"} ${className}`}
    >
      {children}
    </section>
  );
}

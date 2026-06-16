import type { ReactNode } from "react";

export function SectionEyebrow({
  children,
  light = true,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`mb-4 text-xs font-bold uppercase tracking-[0.35em] ${
        light ? "text-light-blue" : "text-white/55"
      } ${className}`}
    >
      {children}
    </p>
  );
}

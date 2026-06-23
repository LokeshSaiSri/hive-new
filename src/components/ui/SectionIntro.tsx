import type { ReactNode } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SectionIntroProps = {
  eyebrow?: ReactNode;
  eyebrowClassName?: string;
  statement: string;
  emphasis: string;
  description?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  size?: "default" | "display" | "large";
  className?: string;
};

export function SectionIntro({
  eyebrow,
  eyebrowClassName = "",
  statement,
  emphasis,
  description,
  light = true,
  align = "center",
  size = "large",
  className = "",
}: SectionIntroProps) {
  const wrap = align === "center" ? "section-header-center" : "";

  return (
    <div className={`${wrap} ${className}`}>
      {eyebrow && <SectionEyebrow light={light} className={eyebrowClassName}>{eyebrow}</SectionEyebrow>}
      <SectionHeading
        light={light}
        statement={statement}
        emphasis={emphasis}
        size={size}
        align={align}
      />
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
            light ? "text-mid-gray" : "text-white/60"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

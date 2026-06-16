type SectionHeadingProps = {
  light?: boolean;
  eyebrow?: string;
  statement: string;
  emphasis: string;
  className?: string;
  size?: "default" | "display" | "large";
  align?: "left" | "center";
};

export function SectionHeading({
  light = true,
  eyebrow,
  statement,
  emphasis,
  className = "",
  size = "default",
  align = "left",
}: SectionHeadingProps) {
  const sizeClass =
    size === "display"
      ? "text-display"
      : size === "large"
        ? "text-section"
        : "text-3xl sm:text-4xl lg:text-5xl";

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-4 ${
            light
              ? "hive-eyebrow-pill"
              : "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`${sizeClass} font-bold leading-[1.08] tracking-tight`}>
        <span className={light ? "gradient-headline-light" : "gradient-headline-dark"}>
          {statement}
        </span>{" "}
        <em
          className={`font-serif italic ${
            light ? "text-brand-blue" : "text-white"
          }`}
        >
          {emphasis}
        </em>
      </h2>
    </div>
  );
}

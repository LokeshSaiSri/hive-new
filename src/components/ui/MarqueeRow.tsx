import type { ReactNode } from "react";

type MarqueeRowProps = {
  children: ReactNode;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  /** When false, scrolling continues while hovering logos or other children. */
  pauseOnHover?: boolean;
  className?: string;
  gap?: "default" | "tight";
};

const speedClass = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
};

const gapClass = {
  default: "gap-12",
  tight: "gap-7",
};

export function MarqueeRow({
  children,
  reverse = false,
  speed = "normal",
  pauseOnHover = true,
  className = "",
  gap = "default",
}: MarqueeRowProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const anim = reverse ? "animate-marquee-reverse" : speedClass[speed];
  const hoverClass = pauseOnHover ? "" : "marquee-continuous";

  return (
    <div className={`marquee-fade overflow-hidden ${className}`}>
      <div className={`flex w-max ${gapClass[gap]} ${anim} ${hoverClass}`}>
        {[...childArray, ...childArray].map((child, i) => (
          <div key={i} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarqueeRows({
  rows,
  pauseOnHover = true,
  className = "",
  gap = "default",
  rowGap = "default",
}: {
  rows: ReactNode[];
  pauseOnHover?: boolean;
  className?: string;
  gap?: "default" | "tight";
  rowGap?: "default" | "tight";
}) {
  const rowGapClass = rowGap === "tight" ? "space-y-3" : "space-y-6";

  return (
    <div className={`${rowGapClass} ${className}`}>
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          reverse={i % 2 === 1}
          speed={i % 2 === 0 ? "normal" : "slow"}
          pauseOnHover={pauseOnHover}
          gap={gap}
        >
          {row}
        </MarqueeRow>
      ))}
    </div>
  );
}

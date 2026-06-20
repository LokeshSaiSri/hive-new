import type { ReactNode } from "react";

type MarqueeRowProps = {
  children: ReactNode;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  /** When false, scrolling continues while hovering logos or other children. */
  pauseOnHover?: boolean;
  className?: string;
};

const speedClass = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
};

export function MarqueeRow({
  children,
  reverse = false,
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: MarqueeRowProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const anim = reverse ? "animate-marquee-reverse" : speedClass[speed];
  const hoverClass = pauseOnHover ? "" : "marquee-continuous";

  return (
    <div className={`marquee-fade overflow-hidden ${className}`}>
      <div className={`flex w-max gap-12 ${anim} ${hoverClass}`}>
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
}: {
  rows: ReactNode[];
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          reverse={i % 2 === 1}
          speed={i % 2 === 0 ? "normal" : "slow"}
          pauseOnHover={pauseOnHover}
        >
          {row}
        </MarqueeRow>
      ))}
    </div>
  );
}

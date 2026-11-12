/**
 * Ambient light behind a dark section. The orbs are fixed to the viewport but clipped to the
 * section, so they hold still while the section scrolls over them: that gap reads as depth.
 * The section needs `isolate` so the orbs sit above its background and below its content.
 */
export function Orbs({ tone = "blue" }: { tone?: "blue" | "gold" }) {
  const a = tone === "blue" ? "rgba(46, 90, 255, 0.34)" : "rgba(255, 190, 40, 0.2)";
  const b = tone === "blue" ? "rgba(255, 207, 0, 0.13)" : "rgba(46, 90, 255, 0.28)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [clip-path:inset(0)]">
      <div className="pgp-float fixed -left-40 top-[18%] h-[34rem] w-[34rem] rounded-full blur-[110px]" style={{ background: a }} />
      <div
        className="pgp-float fixed -right-32 bottom-[8%] h-[30rem] w-[30rem] rounded-full blur-[110px]"
        style={{ background: b, animationDelay: "-8s" }}
      />
    </div>
  );
}

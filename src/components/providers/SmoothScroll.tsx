"use client";

import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useState, type ReactNode } from "react";

const NAV_OFFSET = 88;

function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor?.hash || anchor.hash === "#") return;

      const id = decodeURIComponent(anchor.hash.slice(1));
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      lenis.scrollTo(section, { offset: -NAV_OFFSET, duration: 1.15 });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.35,
        autoRaf: true,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}

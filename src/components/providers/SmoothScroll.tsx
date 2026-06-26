"use client";

import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useState, type ReactNode } from "react";

const NAV_OFFSET = 88;

function shouldUseSmoothScroll() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

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
      lenis.scrollTo(section, { offset: -NAV_OFFSET, duration: 0.9 });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(shouldUseSmoothScroll());
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Native wheel/trackpad — stops immediately when the user stops (no drift).
        smoothWheel: false,
        autoRaf: true,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import "./pgp-motion.css";

/**
 * Page-wide motion for the PGP page. Mount once.
 *
 * - A gold progress bar along the bottom edge, with a glowing head.
 * - A soft light that trails the cursor (fine pointers only).
 * - One delegated pointer listener that feeds [data-glow] and [data-tilt] cards.
 * - Headings from the older sections rise out of a blur as they arrive.
 *
 * Needs the `pgp-motion` class on <main>, which the page layout adds.
 */
export function PgpMotionLayer() {
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const headLeft = useTransform(progress, (v) => `${v * 100}%`);

  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const lightX = useTransform(sx, (v) => v - 300);
  const lightY = useTransform(sy, (v) => v - 300);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  /* Cursor light, glow and tilt: one listener, throttled to animation frames. */
  useEffect(() => {
    if (reduce || !finePointer) return;

    let frame = 0;
    let event: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const resetTilt = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const run = () => {
      frame = 0;
      if (!event) return;
      const e = event;
      mx.set(e.clientX);
      my.set(e.clientY);

      const target = e.target instanceof Element ? e.target : null;

      const glow = target?.closest<HTMLElement>("[data-glow]");
      if (glow) {
        const r = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", `${e.clientX - r.left}px`);
        glow.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== tilt) resetTilt(tilted);
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(py * -9).toFixed(2)}deg`);
      }
      tilted = tilt;
    };

    const onMove = (e: PointerEvent) => {
      event = e;
      if (!frame) frame = requestAnimationFrame(run);
    };
    const onLeave = () => resetTilt(tilted);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, finePointer, mx, my]);

  /* Headings from the older sections: hidden only after we know JS is running, revealed as they arrive. */
  useEffect(() => {
    if (reduce) return;
    const heads = Array.from(document.querySelectorAll<HTMLElement>("main.pgp-motion h2")).filter(
      (h) => !h.closest("[data-heading-reveal]") && h.getBoundingClientRect().top > window.innerHeight * 0.9,
    );
    heads.forEach((h) => h.classList.add("pgp-h-pre"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("pgp-h-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [reduce]);

  return (
    <>
      {/* Progress along the bottom edge */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] h-[3px] bg-white/10">
        <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-accent via-[#ffe58a] to-accent" />
        <motion.span
          style={{ left: headLeft }}
          className="absolute -top-[3px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#fff2b8] shadow-[0_0_14px_5px_rgba(255,207,0,0.75)]"
        />
      </div>

      {/* A soft light that trails the cursor */}
      {finePointer && !reduce && (
        <motion.div
          aria-hidden
          style={{ x: lightX, y: lightY }}
          className="pointer-events-none fixed left-0 top-0 z-[35] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,207,0,0.075),rgba(120,150,255,0.05)_40%,transparent_68%)] mix-blend-screen"
        />
      )}
    </>
  );
}

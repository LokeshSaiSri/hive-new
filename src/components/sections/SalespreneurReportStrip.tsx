"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { getGatedDocumentById } from "@/data/gatedDocuments";
import { cdnAsset } from "@/lib/assets";
import { easeHive } from "@/lib/motion";

const BACKGROUND_SRC = cdnAsset("images/misc/salespreneur-cohort.jpg");

const copyParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeHive },
  },
};

const copyItemReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function SalespreneurReportStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const doc = getGatedDocumentById("salespreneur-report");
  const href = doc?.pdfHref ?? "/Salespreneur-Report.pdf";
  const item = prefersReducedMotion ? copyItemReduced : copyItem;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const photoScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.14, 1, 1.06],
  );
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-36, 36],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale: photoScale, y: photoY }}>
        <Image
          src={BACKGROUND_SRC}
          alt="HiveSchool Salespreneur cohort"
          fill
          sizes="100vw"
          className="object-cover object-[50%_68%] md:object-[62%_46%]"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,13,0.55)_0%,rgba(4,7,13,0.22)_36%,rgba(4,7,13,0.06)_58%,rgba(4,7,13,0.18)_88%,rgba(6,15,50,0.42)_100%)] md:bg-[linear-gradient(105deg,rgba(4,7,13,0.94)_0%,rgba(4,7,13,0.82)_26%,rgba(4,7,13,0.42)_46%,rgba(4,7,13,0.1)_64%,transparent_100%)]"
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: easeHive }}
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#04070d]/70 to-transparent md:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060f32] to-transparent md:h-28"
        aria-hidden
      />

      <motion.p
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
        whileInView={{ opacity: 0.25, x: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.9, ease: easeHive }}
        className="hero-side-label pointer-events-none absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.45em] text-white lg:block"
      >
        Salespreneur · Report
      </motion.p>

      <div className="relative z-10 flex min-h-[100svh] items-start md:items-center">
        <div className="section-container w-full pb-8 pt-24 sm:pb-12 sm:pt-28 lg:py-16">
          <motion.div
            className="relative max-w-lg rounded-2xl bg-[#04070d]/82 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:max-w-xl sm:p-5 md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
            variants={copyParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
          >
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Salespreneur Report
            </motion.p>

            <motion.h2
              variants={item}
              className="mt-3 font-bold tracking-tight text-white md:mt-5"
              style={{
                fontSize: "clamp(2.35rem, 7vw, 5.5rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.045em",
              }}
            >
              Hive&apos;s{" "}
              <em className="font-serif italic font-medium text-accent">Shark Tank.</em>
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-4 max-w-lg border-l-2 border-accent/60 pl-5 text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg md:text-xl"
            >
              India&apos;s sales hackathon — CXOs in the seats, founders on the floor,
              live pitches that don&apos;t stay in a classroom. The report is what the
              room actually rewarded.
            </motion.p>

            <motion.div variants={item} className="mt-6 md:mt-8">
              <PillButton variant="highlight" tone="dark" href={href}>
                Download the report
              </PillButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

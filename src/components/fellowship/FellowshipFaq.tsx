"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { easeHive } from "@/lib/motion";

type FellowshipFaqProps = {
  faqs: FellowshipOverview["faqs"];
  portrait: string;
};

export function FellowshipFaq({ faqs, portrait }: FellowshipFaqProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="fellowship-faq-lux" aria-labelledby="fellowship-faq-heading">
      <div className="fellowship-faq-lux__visual">
        <Image src={portrait} alt="" fill className="object-cover" sizes="50vw" priority={false} />
        <div className="fellowship-faq-lux__visual-veil" aria-hidden />
      </div>

      <div className="fellowship-faq-lux__panel">
        <p className="fellowship-eyebrow fellowship-eyebrow--light">{faqs.eyebrow}</p>
        <h2 id="fellowship-faq-heading" className="fellowship-headline fellowship-headline--light">
          {faqs.statement} <em>{faqs.emphasis}</em>
        </h2>

        <div className="fellowship-faq-lux__list">
          {faqs.items.map((item, index) => {
            const open = index === openIndex;
            return (
              <div key={item.question} className="fellowship-faq-lux__item">
                <button
                  type="button"
                  className={open ? "is-open" : ""}
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  {item.question}
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeHive }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

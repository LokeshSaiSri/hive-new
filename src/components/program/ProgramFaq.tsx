"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { easeHive } from "@/lib/motion";

type ProgramFaqProps = {
  faqs: CoursePageConfig["faqs"];
  variant?: "default" | "theatre";
};

export function ProgramFaq({ faqs, variant = "default" }: ProgramFaqProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  if (variant === "theatre") {
    const current = faqs.items[openIndex] ?? faqs.items[0];

    return (
      <section className="program-tab-section hive-dark-band overflow-hidden">
        <div className="section-container section-py">
          <div className="program-faq-theatre">
            <ScrollReveal className="program-faq-theatre__intro">
              <SectionIntro
                eyebrow={faqs.eyebrow}
                statement={faqs.statement}
                emphasis={faqs.emphasis}
                description={faqs.description}
                light={false}
                align="left"
              />
              <div className="mt-8">
                <PillButton variant="highlight" tone="dark" href="#apply">
                  Still have questions? Enquire now
                </PillButton>
              </div>
            </ScrollReveal>

            <div className="program-faq-theatre__shell">
              <div className="program-faq-theatre__list" role="tablist" aria-label="Frequently asked questions">
                {faqs.items.map((item, index) => {
                  const isActive = index === openIndex;
                  return (
                    <button
                      key={item.question}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setOpenIndex(index)}
                      className={`program-faq-theatre__item ${isActive ? "is-active" : ""}`}
                    >
                      <span className="program-faq-theatre__item-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="program-faq-theatre__item-question">{item.question}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.question}
                  role="tabpanel"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.4, ease: easeHive }}
                  className="program-faq-theatre__answer"
                >
                  <p className="program-faq-theatre__answer-kicker">Answer</p>
                  <h3 className="program-faq-theatre__answer-question">{current.question}</h3>
                  <p className="program-faq-theatre__answer-copy">{current.answer}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="program-section section-band-light">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <ScrollReveal>
            <SectionIntro
              eyebrow={faqs.eyebrow}
              statement={faqs.statement}
              emphasis={faqs.emphasis}
              description={faqs.description}
              light
              align="left"
            />
            <div className="mt-8">
              <PillButton variant="highlight" tone="light" href="#apply">
                Still have questions? Enquire now
              </PillButton>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <ScrollReveal key={item.question} delay={index * 0.04}>
                  <article className="program-faq-item">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 text-left"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <span className="text-base font-semibold text-ink sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`mt-1 shrink-0 text-xl font-light text-light-blue transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-4 text-sm leading-relaxed text-mid-gray sm:text-base">
                        {item.answer}
                      </p>
                    )}
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

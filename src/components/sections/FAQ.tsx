"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqItems } from "@/data/faq";

export function FAQ() {
  const [active, setActive] = useState(0);
  const current = faqItems[active];

  return (
    <section id="faq" className="section-band-light">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <ScrollReveal className="order-2 lg:order-1">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <SectionHeading
              statement="Got questions?"
              emphasis="We've got answers."
              size="large"
            />
            <p className="mt-4 max-w-lg text-base text-mid-gray sm:text-lg">
              Pick a topic — watch a short answer from the team.
            </p>

            <ul className="mt-8 flex flex-col gap-2 sm:mt-10">
              {faqItems.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.question}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      className={`flex w-full items-start gap-3 rounded-xl px-4 py-3.5 text-left transition duration-200 sm:gap-4 sm:px-5 sm:py-4 ${
                        isActive
                          ? "card-metallic-dark text-white shadow-[0_24px_56px_rgba(6,15,50,0.28)] ring-2 ring-blue-glow/45"
                          : "card-metallic-dark text-white/85 hover:shadow-[0_24px_56px_rgba(6,15,50,0.22)]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 text-[11px] font-bold tabular-nums tracking-[0.14em] ${
                          isActive ? "text-blue-glow" : "text-white/45"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-sm font-semibold leading-snug sm:text-base ${
                          isActive ? "text-white" : "text-white/85"
                        }`}
                      >
                        {item.question}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="order-1 lg:sticky lg:top-24 lg:order-2">
            <div className="premium-frame-dark hover-lift-card">
              <div className="premium-surface-dark premium-metallic-edge overflow-hidden rounded-[calc(1.5rem-1px)] p-3 sm:p-4">
              <VideoCard
                key={current.videoId}
                videoId={current.videoId}
                badge={`Answer ${String(active + 1).padStart(2, "0")}`}
                large
              />
              <div className="mt-4 px-1 sm:mt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-glow">
                  Now playing
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-white sm:text-xl">
                  {current.question}
                </h3>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

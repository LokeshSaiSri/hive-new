"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Mentor } from "@/data/mentors";
import { easeHive } from "@/lib/motion";
import { scrollWithinContainer } from "@/lib/scrollWithinContainer";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type ProgramMentorGalleryProps = {
  mentors: Mentor[];
  label?: string;
  resetKey?: string;
};

export function ProgramMentorGallery({
  mentors,
  label,
  resetKey,
}: ProgramMentorGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLElement | null)[]>([]);
  const total = mentors.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(0);
  }, [resetKey]);

  const advanceNext = useCallback(() => {
    setActive((current) => (current + 1) % total);
  }, [total]);

  useAutoAdvance(total, advanceNext, { resetKey });

  const selectIndex = useCallback(
    (index: number) => {
      setActive(index);
      scrollWithinContainer(mobileRef.current, mobileCardRefs.current[index], {
        axis: "x",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion],
  );

  if (total === 0) return null;

  return (
    <div className="program-mentor-gallery">
      <div className="section-container">
        {label && <p className="program-mentor-gallery__label">{label}</p>}

        <div ref={mobileRef} className="program-mentor-gallery__mobile">
          {mentors.map((mentor, index) => (
            <article
              key={mentor.name}
              ref={(node) => {
                mobileCardRefs.current[index] = node;
              }}
              className={`program-mentor-gallery__mobile-card premium-frame-dark ${
                index === active ? "is-active" : ""
              }`}
            >
              <div className="program-mentor-gallery__mobile-inner">
                <div className="program-mentor-gallery__mobile-image">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="program-mentor-gallery__portrait-img"
                    sizes="85vw"
                  />
                  <div className="overlay-portrait absolute inset-0" />
                  <div className="program-mentor-gallery__mobile-copy">
                    {mentor.companyLogo && (
                      <span className="program-mentor-gallery__mobile-logo">
                        <Image
                          src={mentor.companyLogo}
                          alt={mentor.companyLabel}
                          width={72}
                          height={20}
                          className="h-4 w-auto object-contain"
                        />
                      </span>
                    )}
                    <h3 className="program-mentor-gallery__mobile-name">{mentor.name}</h3>
                    <p className="program-mentor-gallery__mobile-role">{mentor.role}</p>
                    {mentor.sessions && (
                      <p className="program-mentor-gallery__mobile-sessions">
                        {mentor.sessions} sessions
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="program-mentor-gallery__wall"
          role="tablist"
          aria-label={label ?? "Mentors"}
        >
          {mentors.map((mentor, index) => {
            const isOpen = index === active;
            const firstName = mentor.name.split(" ")[0];

            return (
              <motion.button
                key={mentor.name}
                type="button"
                role="tab"
                aria-selected={isOpen}
                layout={!prefersReducedMotion}
                onClick={() => selectIndex(index)}
                className={`program-mentor-gallery__panel ${isOpen ? "is-open" : ""}`}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { flex: isOpen ? "1 1 58%" : "0 0 5.25rem" }
                }
                transition={{ duration: 0.55, ease: easeHive }}
              >
                {isOpen ? (
                  <div className="program-mentor-gallery__open">
                    <div className="program-mentor-gallery__portrait-frame">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="program-mentor-gallery__portrait-img"
                        sizes="220px"
                        priority
                      />
                    </div>

                    <div className="program-mentor-gallery__open-copy">
                      <div className="program-mentor-gallery__open-top">
                        <p className="program-mentor-gallery__panel-index">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        {mentor.companyLogo && (
                          <span className="program-mentor-gallery__panel-logo">
                            <Image
                              src={mentor.companyLogo}
                              alt={mentor.companyLabel}
                              width={88}
                              height={24}
                              className="h-5 w-auto object-contain"
                            />
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="program-mentor-gallery__panel-name">{mentor.name}</h3>
                        <p className="program-mentor-gallery__panel-role">{mentor.role}</p>
                        <p className="program-mentor-gallery__panel-company">{mentor.companyLabel}</p>
                        {mentor.sessions && (
                          <p className="program-mentor-gallery__panel-sessions">
                            <span>{mentor.sessions}</span> sessions delivered
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="program-mentor-gallery__collapsed">
                    <div className="program-mentor-gallery__avatar">
                      <Image
                        src={mentor.image}
                        alt=""
                        fill
                        className="program-mentor-gallery__portrait-img"
                        sizes="64px"
                        aria-hidden
                      />
                    </div>
                    <span className="program-mentor-gallery__panel-vertical" aria-hidden>
                      {firstName}
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CurriculumTrack } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type CurriculumTracksArenaProps = {
  tracks: CurriculumTrack[];
  intro?: string;
  className?: string;
};

const accentClass: Record<CurriculumTrack["accent"], string> = {
  blue: "is-blue",
  gold: "is-gold",
  violet: "is-violet",
};

function parseRoles(roles: string) {
  return roles.split(" · ").map((role) => role.trim()).filter(Boolean);
}

function TrackGlyphSvg({ trackId }: { trackId: CurriculumTrack["id"] }) {
  if (trackId === "performance" || trackId === "tech") {
    return (
      <svg viewBox="0 0 240 240" fill="none" className="tracks-compass__art-svg" aria-hidden>
        <rect x="34" y="52" width="72" height="48" rx="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <rect x="48" y="68" width="72" height="48" rx="10" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <rect x="62" y="84" width="72" height="48" rx="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="168" cy="72" r="7" fill="currentColor" fillOpacity="0.85" />
        <circle cx="198" cy="108" r="6" fill="currentColor" fillOpacity="0.55" />
        <circle cx="154" cy="132" r="5" fill="currentColor" fillOpacity="0.4" />
        <path d="M168 72 L198 108 M168 72 L154 132 M198 108 L154 132" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
        <path d="M134 108 H186" stroke="currentColor" strokeWidth="1.25" strokeDasharray="4 6" opacity="0.35" />
        <rect x="148" y="156" width="10" height="44" rx="3" fill="currentColor" fillOpacity="0.22" />
        <rect x="166" y="140" width="10" height="60" rx="3" fill="currentColor" fillOpacity="0.38" />
        <rect x="184" y="168" width="10" height="32" rx="3" fill="currentColor" fillOpacity="0.18" />
        <path d="M36 178 C72 150, 108 198, 144 170" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      </svg>
    );
  }

  if (trackId === "brand" || trackId === "consumer") {
    return (
      <svg viewBox="0 0 240 240" fill="none" className="tracks-compass__art-svg" aria-hidden>
        <circle cx="120" cy="108" r="58" stroke="currentColor" strokeWidth="1.5" opacity="0.22" />
        <circle cx="120" cy="108" r="42" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <circle cx="120" cy="108" r="26" stroke="currentColor" strokeWidth="1.75" opacity="0.55" />
        <circle cx="120" cy="108" r="10" fill="currentColor" fillOpacity="0.75" />
        <path
          d="M28 176 C52 156, 76 188, 100 168 C124 148, 148 188, 172 168 C196 148, 208 164, 212 176"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <rect x="52" y="64" width="22" height="22" rx="6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.25" />
        <rect x="166" y="54" width="22" height="22" rx="6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.25" />
        <rect x="184" y="132" width="18" height="18" rx="5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.25" />
        <path d="M88 196 H152" stroke="currentColor" strokeWidth="1.25" opacity="0.25" />
        <path d="M96 204 H144" stroke="currentColor" strokeWidth="1.25" opacity="0.18" />
      </svg>
    );
  }

  if (trackId === "ai-ops") {
    return (
      <svg viewBox="0 0 240 240" fill="none" className="tracks-compass__art-svg" aria-hidden>
        <rect x="34" y="58" width="64" height="40" rx="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <rect x="48" y="72" width="64" height="40" rx="9" stroke="currentColor" strokeWidth="1.5" opacity="0.48" />
        <rect x="62" y="86" width="64" height="40" rx="9" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.75" />
        <path d="M78 106 H110" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.45" />
        <path d="M78 112 H98" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.3" />
        <circle cx="148" cy="78" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.28" />
        <circle cx="148" cy="78" r="14" stroke="currentColor" strokeWidth="1.75" opacity="0.5" />
        <circle cx="148" cy="78" r="6" fill="currentColor" fillOpacity="0.82" />
        <path
          d="M148 56 V64 M148 92 V100 M126 78 H134 M162 78 H170 M130 62 L136 68 M166 62 L160 68 M130 94 L136 88 M166 94 L160 88"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.42"
        />
        <circle cx="192" cy="62" r="5" fill="currentColor" fillOpacity="0.55" />
        <circle cx="206" cy="88" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="178" cy="104" r="4" fill="currentColor" fillOpacity="0.32" />
        <path
          d="M170 78 L186 66 M170 84 L198 88 M162 92 L176 100"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.38"
        />
        <rect x="154" y="138" width="12" height="38" rx="3" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.25" />
        <rect x="172" y="124" width="12" height="52" rx="3" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.25" />
        <rect x="190" y="148" width="12" height="28" rx="3" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M44 82 H58 M106 106 H124 L148 90"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="3 5"
          opacity="0.35"
        />
        <path
          d="M40 176 C76 158, 112 194, 148 168 C168 154, 188 162, 204 176"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.32"
        />
        <rect x="52" y="152" width="28" height="20" rx="5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.25" opacity="0.9" />
        <path d="M58 162 H74 M58 166 H70" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />
      </svg>
    );
  }

  if (trackId === "founder") {
    return (
      <svg viewBox="0 0 240 240" fill="none" className="tracks-compass__art-svg" aria-hidden>
        <g transform="rotate(-11 82 132)">
          <rect
            x="58"
            y="104"
            width="48"
            height="56"
            rx="8"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.32"
          />
        </g>
        <g transform="rotate(0 120 128)">
          <rect
            x="96"
            y="92"
            width="48"
            height="72"
            rx="8"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M106 118 C114 110, 122 114, 126 108 C130 102, 118 98, 134 94"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path d="M106 126 H134" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.3" />
          <path d="M106 132 H126" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.22" />
        </g>
        <g transform="rotate(11 158 132)">
          <rect
            x="134"
            y="104"
            width="48"
            height="56"
            rx="8"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.32"
          />
        </g>
        <path
          d="M44 188 C88 188, 108 132, 148 92 C168 72, 188 58, 204 44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.48"
        />
        <path d="M204 44 L194 52 M204 44 L196 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.62" />
        <circle cx="204" cy="44" r="7" fill="currentColor" fillOpacity="0.78" />
        <circle cx="52" cy="72" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.22" />
        <circle cx="52" cy="72" r="7" fill="currentColor" fillOpacity="0.5" />
        <path
          d="M28 176 C52 156, 76 188, 100 168 C124 148, 148 188, 172 168 C196 148, 208 164, 212 176"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.36"
        />
        <rect x="176" y="56" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.25" />
        <path d="M36 196 H204" stroke="currentColor" strokeWidth="1.25" opacity="0.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 240" fill="none" className="tracks-compass__art-svg" aria-hidden>
      <path
        d="M44 188 C88 188, 108 132, 148 92 C168 72, 188 58, 204 44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path d="M204 44 L194 52 M204 44 L196 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path
        d="M52 176 L76 152 L100 160 L124 120 L148 128 L172 88"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        opacity="0.42"
      />
      <rect x="48" y="168" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.25" />
      <rect x="72" y="144" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.25" />
      <rect x="96" y="152" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.25" />
      <rect x="120" y="112" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.25" />
      <rect x="144" y="120" width="20" height="20" rx="5" fill="currentColor" fillOpacity="0.34" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="172" cy="88" r="8" fill="currentColor" fillOpacity="0.8" />
      <path d="M36 196 H204" stroke="currentColor" strokeWidth="1.25" opacity="0.2" />
    </svg>
  );
}

function TrackGlyphArt({ track, trackCount }: { track: CurriculumTrack; trackCount: number }) {
  const activeSlot = Number.parseInt(track.index, 10) - 1;

  return (
    <div className={`tracks-compass__art ${accentClass[track.accent]}`}>
      <div className="tracks-compass__art-mesh" aria-hidden />
      <div className="tracks-compass__art-grid" aria-hidden />
      <div className="tracks-compass__art-orb tracks-compass__art-orb--a" aria-hidden />
      <div className="tracks-compass__art-orb tracks-compass__art-orb--b" aria-hidden />
      <span className="tracks-compass__art-watermark" aria-hidden>
        {track.index}
      </span>
      <div className="tracks-compass__art-scene">
        <TrackGlyphSvg trackId={track.id} />
      </div>
      <div className="tracks-compass__art-dots" aria-hidden>
        {Array.from({ length: trackCount }, (_, index) => (
          <span key={index} className={index === activeSlot ? "is-active" : ""} />
        ))}
      </div>
    </div>
  );
}

function TrackStageContent({ track }: { track: CurriculumTrack }) {
  const roles = parseRoles(track.roles);

  return (
    <>
      <p className="tracks-compass__path-kicker">{track.pathLabel}</p>
      <h3 className="tracks-compass__track-title">{track.title}</h3>
      <p className="tracks-compass__track-sub">{track.subtitle}</p>

      <div className="tracks-compass__tags">
        {track.tags.map((tag) => (
          <span key={tag} className="tracks-compass__tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="tracks-compass__roles">
        <p className="tracks-compass__roles-label">Roles you train for</p>
        <ul className="tracks-compass__role-pills">
          {roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function CurriculumTracksArena({ tracks, intro, className }: CurriculumTracksArenaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const selectTrack = useCallback((index: number) => {
    setActive(index);
  }, []);

  const advanceNext = useCallback(() => {
    setActive((current) => (current + 1) % tracks.length);
  }, [tracks.length]);

  useAutoAdvance(tracks.length, advanceNext, { enabled: !paused });

  const current = tracks[active];

  return (
    <section className={`program-tab-section tracks-compass overflow-hidden ${className ?? ""}`}>
      <div className="tracks-compass__backdrop" aria-hidden>
        <div className="tracks-compass__mesh" />
        <div className="tracks-compass__grain" />
      </div>

      <div className="section-container relative z-10 section-py">
        <div className="tracks-compass__header">
          <ScrollReveal>
            <SectionIntro
              eyebrow="Curriculum structure"
              statement="Three business models."
              emphasis="Three revenue paths."
              light={false}
              align="left"
            />
          </ScrollReveal>

          {intro && (
            <ScrollReveal delay={0.06}>
              <blockquote className="tracks-compass__intro">{intro}</blockquote>
            </ScrollReveal>
          )}
        </div>

        <div
          className="tracks-compass__body"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <ScrollReveal>
            <div className="tracks-compass__rail" role="tablist" aria-label="Curriculum tracks">
              {tracks.map((track, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectTrack(index)}
                    className={`tracks-compass__rail-btn ${accentClass[track.accent]} ${isActive ? "is-active" : ""
                      }`}
                  >
                    <span className="tracks-compass__rail-index">{track.index}</span>
                    <span className="tracks-compass__rail-copy">
                      <span className="tracks-compass__rail-path">{track.pathLabel}</span>
                      <span className="tracks-compass__rail-title">{track.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              role="tabpanel"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeHive }}
              className={`tracks-compass__stage ${accentClass[current.accent]}`}
            >
              <div className="tracks-compass__stage-accent" aria-hidden />
              <div className="tracks-compass__stage-glow" aria-hidden />
              <span className="tracks-compass__stage-watermark" aria-hidden>
                {current.index}
              </span>

              <div className="tracks-compass__stage-layout">
                <div className="tracks-compass__stage-copy">
                  <TrackStageContent track={current} />
                </div>

                <div className="tracks-compass__stage-visual hidden lg:block" aria-hidden>
                  <TrackGlyphArt track={current} trackCount={tracks.length} />
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

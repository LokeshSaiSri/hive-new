"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MarqueeRows } from "@/components/ui/MarqueeRow";
import { HiringPartnerLogo } from "@/components/ui/HiringPartnerLogo";
import { hiringPartnerLogos } from "@/data/partners";
import { PlacementStatsCharts } from "@/components/ui/PlacementStatsCharts";
import type { CourseMetaItem } from "@/data/coursePages/types";
import type { ProgramSlug } from "@/data/programPages/types";
import { submitLeadForm } from "@/lib/leads/submit";
import { mapCourseApplicationFields } from "@/lib/hubspot/fields";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { easeHive } from "@/lib/motion";

type CourseApplicationFormProps = {
  courseSlug: ProgramSlug;
  title: string;
  headline?: string;
  metrics: CourseMetaItem[];
  showPlacementCharts?: boolean;
  variant?: "default" | "fellowship";
  className?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
};

type FieldKey = keyof FormState;

const FIELD_ORDER: FieldKey[] = ["name", "email", "phone", "linkedin"];

const FIELD_META: Record<
  FieldKey,
  { label: string; placeholder: string; type: string; autoComplete?: string }
> = {
  name: { label: "Name", placeholder: "Enter your name", type: "text", autoComplete: "name" },
  email: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    autoComplete: "email",
  },
  phone: {
    label: "Phone number",
    placeholder: "+91",
    type: "tel",
    autoComplete: "tel",
  },
  linkedin: {
    label: "LinkedIn",
    placeholder: "https://linkedin/username",
    type: "url",
  },
};

const METRIC_HINTS: Record<string, string> = {
  Duration: "Nine months of live challenges, operator sprints, and a built-in placement system.",
  Commencement: "October 2026 intake — residential cohort starts in Gurugram.",
  Format: "Full-time immersion. You’re on campus, in the room, building proof-of-work.",
  Location: "Gurugram — India’s revenue and startup corridor, minutes from hiring partners.",
  Portfolio: "Ten live capstone projects — campaigns, brands, and AI workflows in your portfolio.",
  "Brand briefs": "Four real brand campaigns with founders in the room, not classroom simulations.",
  Capstone: "Build one venture-ready marketing asset — agent, funnel, or brand from scratch.",
  Network: "100+ hiring partners across D2C, agencies, and consumer tech for placements.",
};

const SOCIAL_PROOF = [
  "Growth lead from Bengaluru applied today",
  "Consultant from Delhi joined the waitlist",
  "Founder from Mumbai submitted an application",
  "Analyst from Pune completed their profile",
];

const METRIC_ICONS = [
  // Duration — clock
  <svg key="clock" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7.5V12l3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Commencement — calendar
  <svg key="cal" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 3.5v3M16 3.5v3M4 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Format — bolt
  <svg key="bolt" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <path
      d="M13 3L6 13h5l-1 8 7-11h-5l1-7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
  // Location — pin
  <svg key="pin" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <path
      d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="11" r="2" fill="currentColor" />
  </svg>,
];

function SubmitArrow() {
  return (
    <svg viewBox="0 0 21 9" fill="none" className="h-2 w-5 shrink-0" aria-hidden>
      <path
        d="M16.5 8.5L20.5 4.5L16.5 0.5M20.5 4.5H0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function validateForm(form: FormState): string | undefined {
  if (!form.name.trim()) return "Please enter your name";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    return "Please enter a valid email";
  if (!form.phone.trim()) return "Please enter your phone number";
  if (!form.linkedin.trim()) return "Please enter your LinkedIn profile";
  return undefined;
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function MetricSpotlight({
  metrics,
  activeIndex,
  onSelect,
  paused,
  onPause,
  onResume,
}: {
  metrics: CourseMetaItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const active = metrics[activeIndex];
  const hint = METRIC_HINTS[active?.label] ?? "";

  const half = Math.ceil(hiringPartnerLogos.length / 2);
  const row1 = hiringPartnerLogos.slice(0, half);
  const row2 = hiringPartnerLogos.slice(half);

  return (
    <div
      className="relative h-full"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-electric-blue/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-glow/15 blur-3xl"
        aria-hidden
      />

      <div className="relative flex h-full flex-col p-6 sm:p-8 lg:p-9">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/45">
            Cohort snapshot
          </p>
          <span className="chip-metallic-dark inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-accent ${paused ? "" : "animate-pulse"}`}
              aria-hidden
            />
            October 2026 intake
          </span>
        </div>

        <div className="relative mt-8 min-h-[11rem] sm:min-h-[12rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: easeHive }}
              className="absolute inset-0"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-blue-glow">
                  {METRIC_ICONS[activeIndex]}
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    {active.label}
                  </p>
                  <p className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-none text-spark-gradient">
                    {active.value}
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/62">{hint}</p>
            </motion.div>
          </AnimatePresence>

          {!prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute right-0 top-2 h-24 w-24 opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              aria-hidden
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(134,157,255,0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
              </svg>
            </motion.div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
          {metrics.map((metric, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={metric.label}
                suppressHydrationWarning
                type="button"
                onClick={() => onSelect(index)}
                className={`group relative overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${isActive
                    ? "border-white/25 bg-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.25)]"
                    : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.06]"
                  }`}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/42">
                  {metric.label}
                </p>
                <p
                  className={`mt-1 text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-white/72 group-hover:text-white/88"
                    }`}
                >
                  {metric.value}
                </p>
                {isActive && (
                  <motion.span
                    layoutId="metric-active-glow"
                    className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-glow to-transparent"
                    transition={{ duration: 0.35, ease: easeHive }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/38">
            Trusted hiring partners
          </p>
          <div className="mt-4">
            <MarqueeRows
              pauseOnHover={false}
              gap="tight"
              rowGap="tight"
              rows={[
                row1.map((partner) => (
                  <HiringPartnerLogo key={partner.name} {...partner} surface="dark" size="panel" />
                )),
                row2.map((partner) => (
                  <HiringPartnerLogo key={partner.name} {...partner} surface="dark" size="panel" />
                )),
              ]}
            />
          </div>
        </div>

        <SocialProofTicker />
      </div>
    </div>
  );
}

function SocialProofTicker() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useAutoAdvance(
    SOCIAL_PROOF.length,
    () => setIndex((i) => (i + 1) % SOCIAL_PROOF.length),
    { intervalMs: 3500, enabled: !prefersReducedMotion },
  );

  return (
    <div className="mt-auto pt-6">
      <AnimatePresence mode="wait">
        <motion.p
          key={SOCIAL_PROOF[index]}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: easeHive }}
          className="text-xs text-white/45"
        >
          <span className="text-accent">●</span> {SOCIAL_PROOF[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function ApplicationDossier({ form }: { form: FormState }) {
  const filled = FIELD_ORDER.filter((key) => form[key].trim()).length;
  const progress = (filled / FIELD_ORDER.length) * 100;

  return (
    <div className="card-metallic-blue rounded-2xl p-4 shadow-[0_10px_28px_rgba(30,68,226,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">
          Your application process
        </p>
        <span className="text-[10px] font-semibold text-electric-blue">{Math.round(progress)}%</span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border-soft/60">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric-blue via-light-blue to-blue-glow"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: easeHive }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <motion.div
          layout
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-blue to-brand-blue text-sm font-bold text-white shadow-[0_8px_20px_rgba(30,68,226,0.35)]"
        >
          {initialsFromName(form.name)}
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">
            {form.name.trim() || "Your name appears here"}
          </p>
          <p className="truncate text-xs text-ink/50">
            {form.email.trim() || "Email · Phone · LinkedIn"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {FIELD_ORDER.map((key) => {
          const done = form[key].trim().length > 0;
          return (
            <span
              key={key}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${done
                  ? "bg-electric-blue/10 text-electric-blue"
                  : "bg-ink/[0.04] text-ink/35"
                }`}
            >
              {FIELD_META[key].label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function FormField({
  fieldKey,
  value,
  focused,
  onFocus,
  onBlur,
  onChange,
}: {
  fieldKey: FieldKey;
  value: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
}) {
  const meta = FIELD_META[fieldKey];
  const hasValue = value.trim().length > 0;
  const lifted = focused || hasValue;

  return (
    <div className="relative">
      <label
        htmlFor={`apply-${fieldKey}`}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${lifted
            ? "top-2 text-[10px] font-bold uppercase tracking-[0.12em] text-electric-blue"
            : "top-1/2 -translate-y-1/2 text-[14px] text-ink/40"
          }`}
      >
        {meta.label}
      </label>
      <input
        suppressHydrationWarning
        id={`apply-${fieldKey}`}
        name={fieldKey}
        type={meta.type}
        autoComplete={meta.autoComplete}
        placeholder={lifted ? meta.placeholder : ""}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white px-4 pb-3 pt-7 text-base sm:text-[15px] text-ink outline-none transition-all duration-200 placeholder:text-ink/30 ${focused
            ? "border-electric-blue shadow-[0_0_0_4px_rgba(30,68,226,0.12),0_8px_20px_rgba(30,68,226,0.08)]"
            : hasValue
              ? "border-electric-blue/40 shadow-[0_4px_14px_rgba(30,68,226,0.06)]"
              : "border-border-soft shadow-[0_2px_8px_rgba(6,15,50,0.04)] hover:border-ink/20 hover:shadow-[0_6px_16px_rgba(6,15,50,0.06)]"
          }`}
        required
      />
    </div>
  );
}

function SuccessState() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mt-8 overflow-hidden rounded-2xl border border-electric-blue/20 bg-gradient-to-br from-[#eef2ff] via-white to-[#f6f8fe] px-6 py-8 text-center"
      role="status"
    >
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-electric-blue"
              initial={{ opacity: 0.8, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                x: Math.cos((i / 10) * Math.PI * 2) * 72,
                y: Math.sin((i / 10) * Math.PI * 2) * 48,
              }}
              transition={{ duration: 0.75, ease: easeHive }}
            />
          ))}
        </div>
      )}
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-electric-blue">
        Application received
      </p>
      <h4 className="mt-3 text-2xl font-semibold text-ink">You&apos;re in the pipeline.</h4>
      <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink/65">
        Our admissions team will reach out within 2 business days with interview slots and next
        steps.
      </p>
    </motion.div>
  );
}

export function CourseApplicationForm({
  courseSlug,
  title,
  headline = "application",
  metrics,
  showPlacementCharts = false,
  variant = "default",
  className,
}: CourseApplicationFormProps) {
  const isFellowship = variant === "fellowship";
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
  });
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [metricPaused, setMetricPaused] = useState(false);
  const [focusedField, setFocusedField] = useState<FieldKey | null>(null);

  const advanceMetric = useCallback(
    () => setActiveMetric((i) => (i + 1) % metrics.length),
    [metrics.length],
  );

  useAutoAdvance(metrics.length, advanceMetric, {
    enabled: !metricPaused && !prefersReducedMotion,
    resetKey: String(activeMetric),
  });

  const filledCount = useMemo(
    () => FIELD_ORDER.filter((key) => form[key].trim()).length,
    [form],
  );
  const isComplete = filledCount === FIELD_ORDER.length;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateForm(form);
    if (err) {
      setError(err);
      return;
    }

    setError(undefined);
    setSubmitting(true);

    try {
      const thankYouUrl = await submitLeadForm(courseSlug, mapCourseApplicationFields(form));
      window.location.assign(thankYouUrl);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(undefined);
  };

  const content = (
    <>
      {!isFellowship && (
        <div className="mb-8 max-w-xl lg:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-electric-blue">
            Admissions · 60 seconds
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold leading-tight text-ink">
            Start your{" "}
            <em className="font-serif font-medium not-italic text-brand-blue">{headline}</em>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/58 sm:text-base">
            A faster path in — tell us who you are and we&apos;ll line up
            your admissions conversation.
          </p>
        </div>
      )}

      {isFellowship && (
        <div className="fellowship-apply-form__intro">
          <p className="fellowship-label">
            <span className="fellowship-label__bar" aria-hidden />
            Admissions · 60 seconds
          </p>
          <h2 className="fellowship-display">
            Start your{" "}
            <em className="fellowship-display__em">{headline}</em>
          </h2>
          <p className="fellowship-apply-form__intro-desc">
            Tell us who you are — we&apos;ll line up your admissions conversation for the October
            2026 cohort in Gurugram.
          </p>
        </div>
      )}

      <div
        className={
          isFellowship
            ? "fellowship-apply-form__grid"
            : "grid items-start gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch"
        }
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: easeHive }}
          className={
            isFellowship
              ? "fellowship-apply-form__spotlight"
              : `order-2 flex flex-col lg:order-1 lg:pt-3 min-w-0 ${showPlacementCharts ? "h-full" : "min-h-[32rem]"}`
          }
        >
          <div className="premium-frame-dark flex h-full flex-col">
            <div className="premium-surface-dark flex flex-1 flex-col overflow-hidden rounded-[calc(1.5rem-1px)]">
              {showPlacementCharts ? (
                <div className="flex flex-1 flex-col">
                  <PlacementStatsCharts variant="compact" />
                </div>
              ) : (
                <MetricSpotlight
                  metrics={metrics}
                  activeIndex={activeMetric}
                  onSelect={setActiveMetric}
                  paused={metricPaused}
                  onPause={() => setMetricPaused(true)}
                  onResume={() => setMetricPaused(false)}
                />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.06, ease: easeHive }}
          className={
            isFellowship
              ? "fellowship-apply-form__panel"
              : "course-application-form-panel relative order-1 flex flex-col min-w-0 lg:order-2 lg:z-10"
          }
        >
          {!isFellowship && <div className="course-application-form-spotlight" aria-hidden />}
          <div
            className={
              isFellowship
                ? "fellowship-apply-form__frame"
                : "course-application-form-frame hover-lift-card relative flex flex-1 flex-col"
            }
          >
            <div className="course-application-form-surface flex flex-1 flex-col">
              <div className="course-application-form-hero">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">
                      Apply in 60 seconds
                    </p>
                    <h3 className="mt-2 text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-tight text-white">
                      {title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85">
                    Step {Math.min(filledCount + 1, 4)} of 4
                  </span>
                </div>
                <div className="mt-4 flex gap-1.5">
                  {FIELD_ORDER.map((key, i) => (
                    <span
                      key={key}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i < filledCount
                          ? "w-5 bg-blue-glow shadow-[0_0_10px_rgba(134,157,255,0.55)]"
                          : focusedField === key
                            ? "w-3 bg-white/55"
                            : "w-1.5 bg-white/20"
                        }`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>

              <div className="course-application-form-body flex flex-1 flex-col p-6 sm:p-8 lg:p-9">
                <ApplicationDossier form={form} />

                {submitted ? (
                  <SuccessState />
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-8" data-hs-cf-bound="true">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {FIELD_ORDER.slice(0, 2).map((key) => (
                        <FormField
                          key={key}
                          fieldKey={key}
                          value={form[key]}
                          focused={focusedField === key}
                          onFocus={() => setFocusedField(key)}
                          onBlur={() => setFocusedField(null)}
                          onChange={(v) => setField(key, v)}
                        />
                      ))}
                    </div>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      {FIELD_ORDER.slice(2).map((key) => (
                        <FormField
                          key={key}
                          fieldKey={key}
                          value={form[key]}
                          focused={focusedField === key}
                          onFocus={() => setFocusedField(key)}
                          onBlur={() => setFocusedField(null)}
                          onChange={(v) => setField(key, v)}
                        />
                      ))}
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-sm text-red-700"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      suppressHydrationWarning
                      type="submit"
                      disabled={!isComplete || submitting}
                      whileHover={isComplete && !submitting && !prefersReducedMotion ? { scale: 1.01 } : undefined}
                      whileTap={isComplete && !submitting && !prefersReducedMotion ? { scale: 0.99 } : undefined}
                      className={`mt-8 flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-[15px] font-semibold transition-all duration-300 ${isComplete && !submitting
                          ? "border border-electric-blue bg-electric-blue text-white shadow-[0_12px_36px_rgba(30,68,226,0.32)] hover:border-light-blue hover:bg-light-blue hover:shadow-[0_16px_44px_rgba(21,56,176,0.38)]"
                          : "cursor-not-allowed border border-border-soft bg-ink/[0.04] text-ink/35"
                        }`}
                    >
                      <span>
                        {submitting
                          ? "Submitting..."
                          : isComplete
                            ? "Submit application"
                            : `Complete ${4 - filledCount} more field${4 - filledCount === 1 ? "" : "s"}`}
                      </span>
                      {isComplete && !submitting && <SubmitArrow />}
                    </motion.button>

                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );

  if (isFellowship) {
    return <div className={`fellowship-apply-form ${className ?? ""}`}>{content}</div>;
  }

  return (
    <section
      id="apply"
      className={`relative overflow-hidden border-b border-border-soft/60 bg-[linear-gradient(180deg,#f2f4fb_0%,#ffffff_42%,#f8f9fd_100%)] py-14 sm:py-16 lg:py-20 ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(92rem,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-electric-blue/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-electric-blue/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-glow/10 blur-3xl"
        aria-hidden
      />

      <div className="section-container relative">{content}</div>
    </section>
  );
}

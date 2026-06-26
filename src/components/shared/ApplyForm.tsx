"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { HeroStudentCollage } from "@/components/ui/HeroStudentCollage";
import { cities } from "@/data/nav";
import { programmes } from "@/data/programmes";
import type { ProgramSlug } from "@/data/programPages/types";
import { submitLeadForm } from "@/lib/leads/submit";
import { mapApplyFormFields } from "@/lib/hubspot/fields";
import { resolveProgramSlugFromTitle } from "@/lib/hubspot/resolve-course";
import { admissionHero } from "@/data/partners";
import { easeHive } from "@/lib/motion";

export type ApplyFormProps = {
  variant?: "home" | "program";
  defaultProgramme?: string;
  courseSlug?: ProgramSlug;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  programme: string;
  city: string;
};

type FieldKey = keyof FormState;

type Step = {
  id: FieldKey;
  question: string;
  emphasis: string;
  hint: string;
  type: "text" | "email" | "tel" | "programme" | "city";
};

const STEPS: Step[] = [
  {
    id: "fullName",
    question: "What's your",
    emphasis: "name?",
    hint: "As you'd like it on your application.",
    type: "text",
  },
  {
    id: "email",
    question: "Where can we",
    emphasis: "email you?",
    hint: "Interview slots and next steps land here.",
    type: "email",
  },
  {
    id: "phone",
    question: "Your phone",
    emphasis: "number?",
    hint: "Admissions calls from a Gurugram number.",
    type: "tel",
  },
  {
    id: "programme",
    question: "Which programme",
    emphasis: "fits you?",
    hint: "Pick your closest match — we'll guide you on the call.",
    type: "programme",
  },
  {
    id: "city",
    question: "Which city are",
    emphasis: "you in?",
    hint: "Helps us connect you with the right cohort lead.",
    type: "city",
  },
];

const EXTRA_PROGRAMME = {
  title: "Launchpad",
  badge: "Short-form",
  description: "Fast-track immersion before committing to a full programme.",
};

const STEP_LABELS: Record<FieldKey, string> = {
  fullName: "Name",
  email: "Email",
  phone: "Phone",
  programme: "Programme",
  city: "City",
};

const AUTO_ADVANCE_MS = 420;

function validateField(id: FieldKey, value: string): string | undefined {
  if (!value.trim()) return "This field is required";
  if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Enter a valid email";
  return undefined;
}

function QuestionHeading({ question, emphasis }: { question: string; emphasis: string }) {
  return (
    <h2 className="text-section max-w-2xl font-bold leading-[1.05] text-white">
      {question}{" "}
      <span className="font-serif italic text-white">{emphasis}</span>
    </h2>
  );
}

function SuccessBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-white"
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos((i / 8) * Math.PI * 2) * 56,
            y: Math.sin((i / 8) * Math.PI * 2) * 56,
            scale: 0,
          }}
          transition={{ duration: 0.7, ease: easeHive, delay: 0.05 }}
        />
      ))}
    </div>
  );
}

function AnswerRail({
  form,
  step,
  submitted,
}: {
  form: FormState;
  step: number;
  submitted: boolean;
}) {
  return (
    <div className="mt-4 space-y-5 border-l border-white/10 pl-6">
      {STEPS.map((s, i) => {
        const done = submitted || i < step;
        const active = !submitted && i === step;
        const value = form[s.id];

        return (
          <motion.div
            key={s.id}
            animate={{ opacity: i > step && !submitted ? 0.25 : 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
                  done
                    ? "border-white bg-white text-ink"
                    : active
                      ? "border-white bg-white/15"
                      : "border-white/15"
                }`}
              >
                {done ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    viewBox="0 0 12 12"
                    fill="none"
                    className="h-3 w-3"
                  >
                    <path
                      d="M10 3L4.5 8.5 2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ) : (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active ? "bg-white" : "bg-white/20"
                    }`}
                  />
                )}
              </span>
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.24em] ${
                  active ? "text-white" : done ? "text-white/50" : "text-white/25"
                }`}
              >
                {STEP_LABELS[s.id]}
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={done && value ? value : active ? "active" : "empty"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: easeHive }}
                className={`mt-1.5 pl-7 text-sm ${
                  done && value
                    ? "font-medium text-white"
                    : active
                      ? "text-white/50"
                      : "text-white/25"
                }`}
              >
                {done && value ? value : active ? "Answering..." : "—"}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ApplyForm({
  variant = "home",
  defaultProgramme = "",
  courseSlug,
}: ApplyFormProps) {
  const isHome = variant === "home";
  const prefersReducedMotion = useReducedMotion();
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMounted = useRef(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    programme: defaultProgramme,
    city: "",
  });
  const [error, setError] = useState<string | undefined>();
  const [submitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const current = STEPS[step];
  const progress = submitted ? 100 : ((step + 1) / STEPS.length) * 100;
  const allProgrammes = [...programmes, EXTRA_PROGRAMME];

  const goNext = useCallback(() => {
    const field = current.id;
    const value = form[field];
    const err = validateField(field, value);
    if (err) {
      setError(err);
      return false;
    }
    setError(undefined);
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
    return true;
  }, [current.id, form, step]);

  const scheduleAdvance = useCallback(
    (afterSelect: () => void) => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      afterSelect();
      if (prefersReducedMotion) return;
      advanceTimer.current = setTimeout(() => {
        setDirection(1);
        setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
        setError(undefined);
      }, AUTO_ADVANCE_MS);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (
      current.type === "text" ||
      current.type === "email" ||
      current.type === "tel"
    ) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [step, current.type]);

  const goBack = () => {
    if (step === 0) return;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setError(undefined);
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const submitApplication = useCallback(async () => {
    const err = validateField("city", form.city);
    if (err) {
      setError(err);
      return false;
    }

    const targetCourse = courseSlug ?? resolveProgramSlugFromTitle(form.programme);
    if (!targetCourse) {
      setError("Please select a programme to continue.");
      return false;
    }

    setError(undefined);
    setSubmitting(true);

    try {
      const thankYouUrl = await submitLeadForm(targetCourse, mapApplyFormFields(form));
      window.location.assign(thankYouUrl);
      return true;
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit application. Please try again.",
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [courseSlug, form]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitApplication();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (submitted || submitting || e.key !== "Enter") return;
      if (current.type === "programme") return;
      e.preventDefault();
      if (step < STEPS.length - 1) goNext();
      else {
        void submitApplication();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current.type, goNext, step, submitApplication, submitted, submitting]);

  const setField = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(undefined);
  };

  const slide = {
    enter: (dir: number) => ({
      opacity: 0,
      y: prefersReducedMotion ? 0 : dir > 0 ? 32 : -32,
    }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      y: prefersReducedMotion ? 0 : dir > 0 ? -24 : 24,
    }),
  };

  const filledCount = STEPS.filter((s) => form[s.id].trim()).length;

  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 sm:hidden bg-ink" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {isHome ? (
          <>
            <div className="hero-grid-lines absolute inset-0 opacity-40" />
            <div className="gradient-glow absolute -right-32 top-0 h-[480px] w-[480px] opacity-25" />
            <motion.div
              className="absolute inset-0"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.04, 1], x: [0, -12, 0] }
              }
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={admissionHero}
                alt=""
                fill
                className="object-cover opacity-[0.14] mix-blend-luminosity"
                sizes="100vw"
                aria-hidden
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70 lg:via-ink/88 lg:to-ink/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#0a1848] to-ink" />
        )}
      </div>

      <div className="absolute inset-x-0 top-0 z-20 flex h-1 gap-px">
        {STEPS.map((s, i) => {
          const segmentFill =
            submitted || i < step
              ? "100%"
              : i === step
                ? form[s.id].trim()
                  ? "100%"
                  : "35%"
                : "0%";
          return (
            <div key={s.id} className="relative h-full flex-1 bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={false}
                animate={{ width: segmentFill }}
                transition={{ duration: 0.45, ease: easeHive }}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`section-container relative z-10 flex flex-col justify-center py-10 sm:py-20 lg:py-24 ${
          isHome ? "min-h-[85svh] sm:min-h-[92svh]" : "min-h-[85svh] sm:min-h-[72svh]"
        }`}
      >
        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: easeHive }}
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            {submitted ? "Done" : `${filledCount}/${STEPS.length}`}
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={isHome ? "lg:col-span-7" : "lg:col-span-12"}>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              {isHome ? "Round 2 applications open" : "Start your application"}
            </p>

            {submitted ? (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: easeHive }}
                className="relative mt-6 max-w-xl"
              >
                <SuccessBurst active={!prefersReducedMotion} />
                <motion.span
                  initial={prefersReducedMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/10 text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
                <h2 className="text-section font-bold text-white">
                  You&apos;re in,{" "}
                  <span className="font-serif italic text-white">
                    {form.fullName.split(" ")[0]}.
                  </span>
                </h2>
                <p className="mt-5 text-lg text-white/60">
                  Expect a call within 48 hours about{" "}
                  <span className="text-white">{form.programme}</span>.
                </p>
                <div className="mt-10 space-y-4 border-l-2 border-white/50 pl-5">
                  {[
                    "Confirmation email on its way",
                    "Keep your phone handy this week",
                    "Skim the placement report while you wait",
                  ].map((line, i) => (
                    <motion.p
                      key={line}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.1, ease: easeHive }}
                      className="text-sm text-white/55"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6" data-hs-cf-bound="true">
                <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                  <span>
                    {step + 1} / {STEPS.length}
                  </span>
                  {step > 0 && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      <button
                        type="button"
                        onClick={goBack}
                        className="text-white/45 transition-colors hover:text-white"
                      >
                        Back
                      </button>
                    </>
                  )}
                </div>

                <div className="min-h-[200px] sm:min-h-[320px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current.id}
                      custom={direction}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: easeHive }}
                    >
                      <QuestionHeading
                        question={current.question}
                        emphasis={current.emphasis}
                      />
                      <p className="mt-3 max-w-md text-sm text-white/45">{current.hint}</p>

                      <div className="mt-10">
                        {(current.type === "text" ||
                          current.type === "email" ||
                          current.type === "tel") && (
                          <div className="relative max-w-xl">
                            <input
                              suppressHydrationWarning
                              ref={inputRef}
                              type={current.type}
                              value={form[current.id]}
                              onFocus={() => setInputFocused(true)}
                              onBlur={() => setInputFocused(false)}
                              onChange={(e) => setField(current.id, e.target.value)}
                              className="w-full border-b-2 border-white/20 bg-transparent py-2 sm:py-3 text-xl font-medium text-white outline-none transition-colors placeholder:text-white/25 focus:border-white sm:text-3xl"
                              placeholder={
                                current.id === "fullName"
                                  ? "Your full name"
                                  : current.id === "email"
                                    ? "you@email.com"
                                    : "+91 ..."
                              }
                            />
                            <motion.span
                              className="absolute bottom-0 left-0 h-0.5 bg-white"
                              initial={false}
                              animate={{ scaleX: inputFocused ? 1 : 0 }}
                              style={{ width: "100%", originX: 0 }}
                              transition={{ duration: 0.3, ease: easeHive }}
                              aria-hidden
                            />
                          </div>
                        )}

                        {current.type === "programme" && (
                          <div className="space-y-2">
                            {allProgrammes.map((p, i) => {
                              const selected = form.programme === p.title;
                              return (
                                <motion.button
                                  key={p.title}
                                  type="button"
                                  initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.06, duration: 0.35, ease: easeHive }}
                                  onClick={() => {
                                    scheduleAdvance(() => {
                                      setField("programme", p.title);
                                      setError(undefined);
                                    });
                                  }}
                                  className={`group flex w-full max-w-xl items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                                    selected
                                      ? "border-white bg-white/10 shadow-[0_0_24px_rgba(255,255,255,0.06)]"
                                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                                  }`}
                                >
                                  <span
                                    className={`mt-1 w-0.5 shrink-0 self-stretch rounded-full transition-colors ${
                                      selected
                                        ? "bg-white"
                                        : "bg-white/15 group-hover:bg-white/30"
                                    }`}
                                  />
                                  <span className="min-w-0 flex-1">
                                    <span
                                      className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                                        selected ? "text-white" : "text-white/40"
                                      }`}
                                    >
                                      {p.badge}
                                    </span>
                                    <span className="mt-1 block text-base font-semibold text-white sm:text-lg">
                                      {p.title}
                                    </span>
                                    <span className="mt-1 block text-sm text-white/45">
                                      {p.description}
                                    </span>
                                  </span>
                                  {selected && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white"
                                    >
                                      ✓
                                    </motion.span>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        )}

                        {current.type === "city" && (
                          <div className="flex max-w-xl flex-wrap gap-2">
                            {cities.map((city, i) => {
                              const selected = form.city === city;
                              return (
                                <motion.button
                                  key={city}
                                  type="button"
                                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.03, duration: 0.28, ease: easeHive }}
                                  onClick={() => setField("city", city)}
                                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    selected
                                      ? "border-white bg-white text-ink shadow-[0_8px_24px_rgba(255,255,255,0.15)]"
                                      : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                                  }`}
                                >
                                  {city}
                                </motion.button>
                              );
                            })}
                          </div>
                        )}

                        <AnimatePresence>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-4 text-sm text-red-300"
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-4">
                  {step < STEPS.length - 1 ? (
                    <>
                      <PillButton type="button" variant="primary" tone="dark" onClick={goNext} className="w-full sm:w-auto">
                        Continue
                      </PillButton>
                      {current.type !== "programme" && (
                        <span className="text-xs text-white/30 text-center w-full sm:w-auto">
                           or press{" "}
                          <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans text-white/50">
                            Enter
                          </kbd>
                        </span>
                      )}
                      {current.type === "programme" && form.programme && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-white/80"
                        >
                          Auto-advancing...
                        </motion.span>
                      )}
                    </>
                  ) : (
                    <motion.div
                      animate={
                        form.city && !prefersReducedMotion
                          ? { scale: [1, 1.02, 1] }
                          : undefined
                      }
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <PillButton
                        type="submit"
                        variant="highlight"
                        tone="dark"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Request a callback"}
                      </PillButton>
                    </motion.div>
                  )}
                </div>
              </form>
            )}

            {!submitted && (
              <div className="mt-12 hidden max-w-md lg:block">
                <AnswerRail form={form} step={step} submitted={submitted} />
              </div>
            )}
          </div>

          <div className={`${isHome ? "lg:col-span-5 lg:self-start" : "hidden"}`}>
            <HeroStudentCollage />
          </div>
        </div>
      </div>
    </>
  );

  if (isHome) {
    return (
      <section id="apply" className="relative min-h-[85svh] sm:min-h-[92svh] overflow-hidden hive-dark-band">
        {inner}
      </section>
    );
  }

  return (
    <div className="relative min-h-[85svh] sm:min-h-[72svh] overflow-hidden">
      {inner}
    </div>
  );
}

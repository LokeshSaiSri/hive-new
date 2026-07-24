"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { easeHive } from "@/lib/motion";

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete?: string;
  pattern?: string;
  icon: React.ReactNode;
};

type Props = {
  eventId: string;
  eventTitle: string;
  isPast?: boolean;
  isFull?: boolean;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
};

const CalendarIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-mid-gray">
    <path d="M3 8h12M3 12h4M12 12h3M5 4v2M13 4v2" strokeLinecap="round" />
    <rect x="1.5" y="5" width="15" height="11" rx="2" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-mid-gray">
    <circle cx="9" cy="6" r="3.5" />
    <path d="M1.5 16.5c0-4.14 3.358-7.5 7.5-7.5s7.5 3.36 7.5 7.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-mid-gray">
    <rect x="1.5" y="4" width="15" height="11" rx="2" />
    <path d="M1.5 6.5L9 11l7.5-4.5" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-mid-gray">
    <path d="M3.5 2h4l1.5 4-2 1.5A9.5 9.5 0 0011 11.5l1.5-2 4 1.5v4c-8.5 0-13-5.5-13-13z" strokeLinejoin="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-mid-gray">
    <rect x="1.5" y="1.5" width="15" height="15" rx="3" />
    <path d="M5 7.5V13M5 5.5v.5M8.5 13v-3a1.5 1.5 0 013 0v3M8.5 9.5V13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7 text-white">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function InputField({
  field,
  value,
  onChange,
  error,
  disabled,
}: {
  field: Field;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label htmlFor={field.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
        {field.label}
        {field.required && <span className="ml-0.5 text-blue-glow">*</span>}
      </label>
      <div className={`relative flex items-center overflow-hidden rounded-xl border transition-all duration-200 ${
        error
          ? "border-red-400/60 bg-red-500/5"
          : focused
          ? "border-electric-blue/60 bg-electric-blue/5 shadow-[0_0_0_3px_rgba(30,68,226,0.12)]"
          : "border-white/12 bg-white/5 hover:border-white/20"
      }`}>
        <span className="pointer-events-none ml-3.5">{field.icon}</span>
        <input
          id={field.id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          disabled={disabled}
          required={field.required}
          className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-white/25 outline-none disabled:opacity-50"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EventRegistrationForm({ eventId, eventTitle, isPast, isFull }: Props) {
  const uid = useId();
  const prefersReducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", linkedin: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const fields: Field[] = [
    {
      id: `${uid}-name`,
      label: "Full Name",
      type: "text",
      placeholder: "Arjun Sharma",
      required: true,
      autoComplete: "name",
      icon: <PersonIcon />,
    },
    {
      id: `${uid}-email`,
      label: "Email Address",
      type: "email",
      placeholder: "arjun@example.com",
      required: true,
      autoComplete: "email",
      icon: <MailIcon />,
    },
    {
      id: `${uid}-phone`,
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      required: true,
      autoComplete: "tel",
      icon: <PhoneIcon />,
    },
    {
      id: `${uid}-linkedin`,
      label: "LinkedIn Profile",
      type: "url",
      placeholder: "linkedin.com/in/yourname",
      required: false,
      autoComplete: "url",
      icon: <LinkedInIcon />,
    },
  ];

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[+\d\s\-()]{7,20}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, ...form }),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const isDisabled = status === "submitting";

  return (
    <div className="course-application-form-panel">
      <div className="course-application-form-spotlight" aria-hidden />
      <div className="course-application-form-frame">
        <div className="course-application-form-surface">
          {/* Header */}
          <div className="course-application-form-hero">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <CalendarIcon />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Register for</p>
                <h2 className="mt-0.5 text-base font-bold leading-tight text-white sm:text-lg">
                  {eventTitle}
                </h2>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="course-application-form-body px-5 py-6 sm:px-6 sm:py-7">
            <AnimatePresence mode="wait">
              {/* ── Success state ─────────────────────────────────────────── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeHive }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={prefersReducedMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 300 }}
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric-blue to-light-blue shadow-[0_0_40px_rgba(30,68,226,0.4)]"
                  >
                    <CheckIcon />
                  </motion.div>
                  <motion.h3
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="text-xl font-bold text-ink"
                  >
                    You{"'"}re registered! 🎉
                  </motion.h3>
                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="mt-2 max-w-xs text-sm leading-relaxed text-mid-gray"
                  >
                    We{"'"}ll send you details closer to the event. See you there!
                  </motion.p>
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-xs text-mid-gray"
                  >
                    Registered as <span className="font-semibold text-ink">{form.email}</span>
                  </motion.div>
                </motion.div>
              ) : isPast ? (
                /* ── Past event ──────────────────────────────────────────── */
                <motion.div key="past" className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-lavender">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-mid-gray">
                      <circle cx="12" cy="12" r="9.5" />
                      <path d="M12 7v5l3 3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-ink">Event has ended</h3>
                  <p className="mt-2 text-sm text-mid-gray">This event has already taken place.</p>
                </motion.div>
              ) : isFull ? (
                /* ── Full event ──────────────────────────────────────────── */
                <motion.div key="full" className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-red-400">
                      <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-ink">Fully Booked</h3>
                  <p className="mt-2 text-sm text-mid-gray">This event has reached maximum capacity.</p>
                </motion.div>
              ) : (
                /* ── Registration form ────────────────────────────────────── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  noValidate
                >
                  {/* Dark form header inside body */}
                  <div className="mb-6 rounded-2xl hive-dark-band p-4">
                    <div className="flex flex-col gap-3">
                      {fields.map((field, i) => (
                        <InputField
                          key={field.id}
                          field={field}
                          value={form[field.id.split("-").pop() as keyof FormState] ?? ""}
                          onChange={(val) =>
                            setForm((prev) => ({
                              ...prev,
                              [field.id.split("-").pop() as keyof FormState]: val,
                            }))
                          }
                          error={errors[field.id.split("-").pop() as keyof FormState]}
                          disabled={isDisabled}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Server error */}
                  <AnimatePresence>
                    {status === "error" && serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                      >
                        {serverError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="relative w-full overflow-hidden rounded-full bg-electric-blue px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(30,68,226,0.3)] transition-all duration-300 hover:bg-light-blue hover:shadow-[0_12px_40px_rgba(30,68,226,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <AnimatePresence mode="wait">
                      {isDisabled ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Registering…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Reserve My Spot
                          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                            <path d="M2 7h10M8.5 3.5L12 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <p className="mt-3 text-center text-[10px] text-mid-gray">
                    Free to attend · No spam, ever
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** HiveSchool event times are always India Standard Time (UTC+05:30). */
export const EVENT_TIMEZONE = "Asia/Kolkata";

/**
 * Parse a `datetime-local` value (YYYY-MM-DDTHH:mm) as IST → UTC Date.
 * Without an explicit offset, `new Date("2026-08-08T19:00")` is treated as
 * server-local (UTC on Vercel), which shifts display by 5.5h in India.
 */
export function istLocalInputToDate(local: string): Date {
  const trimmed = local.trim();
  if (!trimmed) return new Date(NaN);
  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(trimmed)) return new Date(trimmed);

  const withSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed)
    ? `${trimmed}:00`
    : trimmed;
  return new Date(`${withSeconds}+05:30`);
}

/** Format a Date/ISO string for a `datetime-local` input in IST. */
export function dateToIstLocalInput(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: EVENT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  let hour = get("hour");
  if (hour === "24") hour = "00";

  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}

export type FormattedEventDate = {
  day: string;
  month: string;
  year: number;
  time: string;
  full: string;
  dayOfWeek: string;
};

/** Format an event instant for public UI in IST. */
export function formatEventDate(dateStr: string): FormattedEventDate {
  const d = new Date(dateStr);
  const tz = { timeZone: EVENT_TIMEZONE };

  return {
    day: d.toLocaleString("en-IN", { ...tz, day: "2-digit" }),
    month: d.toLocaleString("en-IN", { ...tz, month: "short" }).toUpperCase(),
    year: Number(
      d.toLocaleString("en-IN", { ...tz, year: "numeric" })
    ),
    time: d.toLocaleString("en-IN", {
      ...tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    full: d.toLocaleString("en-IN", {
      ...tz,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    dayOfWeek: d
      .toLocaleString("en-IN", { ...tz, weekday: "short" })
      .toUpperCase(),
  };
}

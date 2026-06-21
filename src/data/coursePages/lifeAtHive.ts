import { asset } from "@/lib/assets";

export type LifeAtHiveDay = {
  day: string;
  image: string;
};

export type LifeAtHiveContent = {
  eyebrow: string;
  statement: string;
  emphasis: string;
  description: string;
  days: LifeAtHiveDay[];
};

const weekdayImages: Record<string, string> = {
  Monday: asset("images/weekdays/monday.png"),
  Tuesday: asset("images/weekdays/tuesday.png"),
  Wednesday: asset("images/weekdays/wednesday.png"),
  Thursday: asset("images/weekdays/thursday.png"),
  Friday: asset("images/weekdays/friday.png"),
  Saturday: asset("images/weekdays/saturday.png"),
};

export function lifeAtHiveDays(dayNames: string[]): LifeAtHiveDay[] {
  return dayNames.map((day) => ({
    day,
    image: weekdayImages[day] ?? weekdayImages.Monday,
  }));
}

export const pgpLifeAtHive: LifeAtHiveContent = {
  eyebrow: "Life at Hive",
  statement: "A week at",
  emphasis: "HiveSchool.",
  description: "Six days. Three tracks. Challenges every week.",
  days: lifeAtHiveDays([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
};

export const aiMarketingLifeAtHive: LifeAtHiveContent = {
  eyebrow: "A week in the life",
  statement: "A glimpse into",
  emphasis: "a week at Hive.",
  description:
    "Sessions Mon–Tue, challenge day Wednesday, depth sprints Thu–Fri, and First Principles Saturdays — off-campus inside real businesses.",
  days: lifeAtHiveDays([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
};

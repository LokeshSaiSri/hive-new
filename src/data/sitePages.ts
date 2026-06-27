import { asset } from "@/lib/assets";
import { placementReportDownloadPath } from "@/data/placementReportAccess";
import type { ProgramTabHeroContent } from "@/data/coursePages/pgp-tabs";

export type SiteHubHeroContent = ProgramTabHeroContent & {
  pageLabel: string;
};

export const placementsHubHero: SiteHubHeroContent = {
  pageLabel: "Placements",
  eyebrow: "Audited outcomes",
  statement: "Every cohort publishes",
  emphasis: "proof, not promises.",
  description:
    "Browse placement editions, salary distributions, and programme-specific hiring reports — the full placement archive across HiveSchool.",
  stats: [
    { value: "₹16.47L", label: "Year 2 average CTC" },
    { value: "+184%", label: "Average salary jump" },
    { value: "100+", label: "Hiring partners" },
    { value: "2", label: "Published editions" },
  ],
  primaryCta: { label: "Download Year 2 report", href: placementReportDownloadPath("year-2") },
  secondaryCta: { label: "Explore flipbook", href: "#placement-archive" },
};

export const mentorsHubHero: SiteHubHeroContent = {
  pageLabel: "Mentors",
  eyebrow: "Operator network",
  statement: "The people grading",
  emphasis: "your work.",
  description:
    "Founders, CXOs, and GTM leaders slotted into sprints by discipline — not guest lectures, but recurring sessions tied to your deliverables.",
  stats: [
    { value: "14+", label: "Active mentors" },
    { value: "4", label: "Disciplines" },
    { value: "35+", label: "Prep sessions" },
    { value: "1:1", label: "Mentor ownership" },
  ],
  primaryCta: { label: "See programmes", href: "/#programmes" },
  secondaryCta: { label: "Browse directory", href: "#mentor-directory" },
};

export const campusHubHero: SiteHubHeroContent = {
  pageLabel: "Campus",
  eyebrow: "Gurugram · full-time",
  statement: "Built for pitches,",
  emphasis: "not classrooms.",
  description:
    "A purpose-built residential campus in Millennium City — pitch arenas, brainstorm pods, and operator-led sessions in spaces designed for revenue work.",
  stats: [
    { value: "6", label: "Learning zones" },
    { value: "24/7", label: "Campus access" },
    { value: "Gurugram", label: "Millennium City" },
    { value: "Hybrid", label: "Live + residential" },
  ],
  primaryCta: { label: "Watch campus tour", href: "#campus-tour" },
  secondaryCta: { label: "View programmes", href: "/#programmes" },
};

export const mentorSessionSteps = [
  {
    index: "01",
    title: "Sprint assignment",
    description:
      "Mentors are mapped to your current sprint — marketing, sales, GTM, or data — based on the challenge you're shipping.",
  },
  {
    index: "02",
    title: "Live critique",
    description:
      "Sessions review real deliverables: decks, outbound sequences, campaign briefs, and pitch recordings — not abstract case studies.",
  },
  {
    index: "03",
    title: "Office hours",
    description:
      "Recurring slots for follow-ups, mock interviews, and negotiation prep with the same operator across the programme.",
  },
  {
    index: "04",
    title: "Placement handoff",
    description:
      "Senior mentors and placement leads jointly own your outcome — weekly reviews until you sign an offer.",
  },
] as const;

export const campusAmenities = [
  "Pitch arena with founder panels",
  "Brainstorm pods for sprint teams",
  "Meeting rooms for mock interviews",
  "Common area and breakout lounges",
  "On-campus gym",
  "Millennium City · Gurugram",
] as const;

export const campusLifeGallery = [
  { src: asset("images/life/life-1.avif"), alt: "Students in the pitch arena" },
  { src: asset("images/life/life-2.avif"), alt: "Brainstorm session" },
  { src: asset("images/life/life-3.avif"), alt: "Group working session" },
  { src: asset("images/life/life-4.avif"), alt: "Campus common area" },
  { src: asset("images/life/life-5.avif"), alt: "Collaborative learning space" },
  { src: asset("images/life/gym-hiveschool.jpg"), alt: "HiveSchool gym" },
  { src: asset("images/life/depender.avif"), alt: "Student life at HiveSchool" },
  { src: asset("images/life/admission-image.avif"), alt: "HiveSchool campus exterior" },
] as const;

export const programmePlacementSummaries = [
  {
    title: "PGP in Revenue AI & Entrepreneurship",
    href: "/pgp-revenue-tech-entrepreneurship/placements",
    avgCtc: "₹16.47L",
    highest: "₹27.8L",
    highlight: "Year 2 residential cohort",
    cta: "PGP placement report",
  },
  {
    title: "AI Marketing Fellowship",
    href: "/ai-marketing/placements",
    avgCtc: "Brand & growth",
    highest: "Operator transitions",
    highlight: "Fellowship hiring network",
    cta: "Fellowship outcomes",
  },
] as const;

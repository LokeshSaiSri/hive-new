export type Programme = {
  id: string;
  title: string;
  badge: string;
  videoId: string;
  description: string;
  eligibility: string;
  format: string;
  duration: string;
  status: string;
  learnMoreHref: string;
  enrolHref: string;
};

export const programmes: Programme[] = [
  {
    id: "ug",
    title: "Undergraduate Programme",
    badge: "Undergraduate",
    videoId: "gpXQDETej2k",
    description:
      "3-year UG for founders, growth operators, and AI-native problem solvers — industry-led, starting Aug 2027.",
    eligibility: "Class XII Students & Pass-outs",
    format: "On Campus (Opt-in Residential)",
    duration: "3 Years",
    status: "Round 1 Applications Open",
    learnMoreHref: "/ug",
    enrolHref: "/ug#apply",
  },
  {
    id: "pgp",
    title: "PGP in Revenue, AI & Entrepreneurship",
    badge: "Flagship",
    videoId: "rFZLsmtruzM",
    description:
      "9-month full-time programme with tuition, tools, mentorship & placement support.",
    eligibility: "0-5 yrs experience",
    format: "On Campus (Opt-in Residential)",
    duration: "9 Months",
    status: "Round 2 Applications Open",
    learnMoreHref: "/pgp",
    enrolHref: "/pgp#apply",
  },
  {
    id: "ai-marketing",
    title: "AI Marketing Fellowship",
    badge: "Flagship",
    videoId: "vCfoRUGuszE",
    description:
      "New-age marketing — brand building, performance, AI workflows, and a freelance pathway.",
    eligibility: "Any background",
    format: "On Campus (Opt-in Residential)",
    duration: "6 Months",
    status: "Round 1 Applications Open",
    learnMoreHref: "/ai-marketing",
    enrolHref: "/ai-marketing#apply",
  },
];

export const nextStepCards = [
  {
    title: "AI Marketing Fellowship",
    description:
      "Brand, performance, and AI-native marketing on campus in Gurugram.",
    href: "/ai-marketing",
  },
  {
    title: "PGP in Revenue, AI & Entrepreneurship",
    description:
      "India's revenue-first business school — 9-month residential PGP.",
    href: "/pgp",
  },
  {
    title: "UG Programme",
    description:
      "Undergraduate pathway into revenue and marketing careers.",
    href: "/ug",
  },
];

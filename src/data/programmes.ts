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
    id: "pgp",
    title: "PGP in Revenue, AI & Entrepreneurship",
    badge: "Flagship",
    videoId: "rFZLsmtruzM",
    description:
      "9-month full-time programme with tuition, tools, mentorship & placement support.",
    eligibility: "0-5 years experience",
    format: "On Campus (Opt-in Residential)",
    duration: "9 Months",
    status: "Round 2 Applications Open",
    learnMoreHref: "/pgp-revenue-tech-entrepreneurship",
    enrolHref: "/pgp-revenue-tech-entrepreneurship#apply",
  },
  {
    id: "ai-marketing",
    title: "AI Marketing & Entrepreneurship Fellowship",
    badge: "Fellowship",
    videoId: "vCfoRUGuszE",
    description:
      "You don't study marketing here. You build it. 6 months on campus — 4 months curriculum, 2 months placements.",
    eligibility: "Any background",
    format: "On Campus (Opt-in Residential)",
    duration: "6 Months",
    status: "Round 1 Applications Open",
    learnMoreHref: "/ai-marketing",
    enrolHref: "/ai-marketing#apply",
  },
  {
    id: "ug",
    title: "Undergraduate Programme",
    badge: "Undergraduate",
    videoId: "gpXQDETej2k",
    description:
      "3-year UG with 2+1 live project internships — industry-led, starting August 2027.",
    eligibility: "Class XII Students & Pass-outs",
    format: "On Campus (Opt-in Residential)",
    duration: "3 Years",
    status: "Round 1 Applications Open",
    learnMoreHref: "/ug",
    enrolHref: "/ug#apply",
  },
];

export const nextStepCards = [
  {
    title: "PGP in Revenue, AI & Entrepreneurship",
    description:
      "India's revenue-first business school — 9-month residential PGP in Gurugram.",
    href: "/pgp-revenue-tech-entrepreneurship",
  },
  {
    title: "AI Marketing & Entrepreneurship Fellowship",
    description:
      "Brand, performance, and AI-native marketing on campus in Gurugram.",
    href: "/ai-marketing",
  },
  {
    title: "UG Programme",
    description:
      "2+1 live project internships — undergraduate pathway into revenue and marketing.",
    href: "/ug",
  },
];

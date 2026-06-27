export type FeaturePanel = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  videoId?: string;
  reelIds?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  bullets?: { number: string; text: string }[];
};

export const handsOnPanels: FeaturePanel[] = [
  {
    id: "brand-challenges",
    eyebrow: "Brand Challenges",
    title: "Solve Real Problems & Pitch to Founders",
    description:
      "Take on live brand challenges from D2C and consumer companies. Pitch directly to founders — placements have come from the room.",
    videoId: "0D0DH9qIIj0",
    ctaLabel: "Watch Dohful Challenge",
    bullets: [
      { number: "1", text: "15% of challenge winners land PPOs" },
      { number: "2", text: "50+ live brand partners annually" },
      { number: "3", text: "Pitch to founders, not case judges" },
    ],
  },
  {
    id: "revenue-sprints",
    eyebrow: "Revenue Sprints",
    title: "Build Pipeline & Close Deals from Day One",
    description:
      "Structured sprints in B2B outbound, enterprise sales, and AI-assisted GTM. Learn to sell before you manage.",
    ctaLabel: "See Revenue Sprint",
    bullets: [
      { number: "1", text: "Real CRM workflows from week one" },
      { number: "2", text: "Clay, Apollo & GPT woven in" },
      { number: "3", text: "Operators who've scaled the playbook" },
    ],
  },
  {
    id: "placement-sprint",
    eyebrow: "Placement Sprint",
    title: "Land Revenue Roles at Top Companies",
    description:
      "Dedicated placement support for BDR, AE, GTM, and growth roles — with hiring partners across India's fastest-growing companies.",
    videoId: "ElAM04gXehQ",
    ctaLabel: "Watch Ansh's Story",
    bullets: [
      { number: "1", text: "100+ active hiring partners" },
      { number: "2", text: "+184% average salary jump" },
      { number: "3", text: "Revenue roles, not support functions" },
    ],
  },
];

export const pedagogyPanels: FeaturePanel[] = [
  {
    id: "learn",
    eyebrow: "Layer 01 · Learn",
    title: "Structured sprints from operators who've scaled the playbook",
    description:
      "Structured sprints taught by operators who've scaled the companies you want to join. Not textbooks — real playbooks from the frontlines of business.",
    reelIds: ["dzkdz", "duizk", "dx6w"],
    ctaLabel: "Watch a Sprint",
    ctaHref: "/pgp-revenue-tech-entrepreneurship",
  },
  {
    id: "build",
    eyebrow: "Layer 02 · Build & Apply",
    title: "B2B revenue, D2C brands, and AI-native workflows",
    description:
      "Three tracks woven across the programme — not siloed modules. Build pipeline, brand, and GTM muscle simultaneously.",
    reelIds: ["dzake", "dzcdv", "dxzk"],
    bullets: [
      {
        number: "1",
        text: "B2B & SaaS Revenue: Pipeline building, enterprise sales, and AI-assisted outbound from day one.",
      },
      {
        number: "2",
        text: "D2C & Consumer Brands: Brand building, marketplace ops, and performance marketing for modern trade.",
      },
      {
        number: "3",
        text: "AI-Native Workflows: Clay, Apollo, and GPT woven into every sprint — a methodology, not a module.",
      },
    ],
    ctaLabel: "Explore Tracks",
    ctaHref: "/pgp-revenue-tech-entrepreneurship/curriculum",
  },
  {
    id: "pitch",
    eyebrow: "Layer 03 · Pitch",
    title: "Capstone presentations to founders and senior leaders",
    description:
      "Capstone presentations to founders and senior leaders — the same format that turned brand challenges into job offers.",
    reelIds: ["dssss", "drczh"],
    ctaLabel: "See a Pitch",
    ctaHref: "/pgp-revenue-tech-entrepreneurship#student-stories",
  },
];

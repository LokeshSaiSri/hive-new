import { asset } from "@/lib/assets";

export type Challenge = {
  caption: string;
  videoId: string;
};

export const challenges: Challenge[] = [
  {
    caption: "First Principles Breakdown at @bigboytoyz_india",
    videoId: "rFZLsmtruzM",
  },
  {
    caption: "On the Ground at Dohful",
    videoId: "0D0DH9qIIj0",
  },
  {
    caption: "Fix My Curls ft. Anshita Mehrotra",
    videoId: "FYSxT9lGlBU",
  },
  {
    caption: "How Zypp Electric became a $325M company",
    videoId: "flA-hiv_JtY",
  },
  {
    caption: "First Principles: Zypp Electric",
    videoId: "ANqZT2f87nQ",
  },
  {
    caption: "On the Ground at @PEESAFE",
    videoId: "gifFZ0u0Gwo",
  },
];

export const spotlight = {
  hook: "From brand challenge to job offer.",
  title: "Soham won the Dohful challenge — then joined as Growth Associate.",
  description:
    "Pitched quick-commerce strategy to the founders live. Got introduced. Hired to work on the same problem he solved as a student.",
  videoId: "0D0DH9qIIj0",
  name: "Soham Chatterjee",
  role: "Growth Associate",
  company: "Dohful",
  portrait: asset("images/students/Soham.webp"),
  steps: [
    "Brand Challenge",
    "Founder Pitch",
    "Direct Intro",
    "Placement",
  ],
};

import { asset } from "@/lib/assets";

export type Challenge = {
  caption: string;
  videoId: string;
  /** Some uploads only expose hqdefault on YouTube's CDN */
  thumbnailQuality?: "maxresdefault" | "hqdefault";
};

export const challenges: Challenge[] = [
  {
    caption: "Culture Circle — live brand challenge",
    videoId: "TrqPns8vS_s",
  },
  {
    caption: "SaaS & AI challenge — GTM in practice",
    videoId: "JgD_DXaljeg",
  },
  {
    caption: "MVP challenge — ship and pitch",
    videoId: "F8nxI5GYC0Y",
    thumbnailQuality: "hqdefault",
  },
  {
    caption: "Orientation week — how learning starts",
    videoId: "HWGDJukH2MY",
  },
  {
    caption: "On the Ground at Dohful",
    videoId: "0D0DH9qIIj0",
  },
  {
    caption: "Fix My Curls ft. Anshita Mehrotra",
    videoId: "FYSxT9lGlBU",
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

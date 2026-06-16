export type PedagogyTrack = {
  title: string;
  description: string;
};

export const pedagogySteps = [
  {
    number: "01",
    title: "LEARN",
    videoId: "yKQ2OAuBG50",
    description:
      "Structured sprints taught by operators who've scaled the companies you want to join. Not textbooks — real playbooks from the frontlines of business.",
  },
  {
    number: "02",
    title: "BUILD & APPLY",
    tracks: [
      {
        title: "B2B & SaaS Revenue",
        description:
          "Pipeline building, enterprise sales, and AI-assisted outbound from day one. Learn to sell before you manage.",
      },
      {
        title: "D2C & Consumer Brands",
        description:
          "Brand building, marketplace ops, and performance marketing for modern trade. From shelf to scroll.",
      },
      {
        title: "AI-Native Workflows",
        description:
          "Clay, Apollo, and GPT woven into every sprint — a methodology across the whole program, not a module.",
      },
    ] as PedagogyTrack[],
  },
  {
    number: "03",
    title: "PITCH",
    description:
      "Capstone presentations to founders and senior leaders.",
  },
];

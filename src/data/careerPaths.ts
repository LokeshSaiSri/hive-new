export type CareerRole = {
  title: string;
  function: string;
};

export type IndustryColumn = {
  industry: string;
  roles: CareerRole[];
  videoId: string;
  tagline: string;
};

export const industryColumns: IndustryColumn[] = [
  {
    industry: "SaaS",
    tagline: "Pipeline to close — the engine of every software company.",
    videoId: "rFZLsmtruzM",
    roles: [
      { title: "BDR / SDR", function: "Pipeline Generation" },
      { title: "Account Executive", function: "Closing Deals" },
      { title: "CSM", function: "Account Expansion" },
    ],
  },
  {
    industry: "D2C",
    tagline: "Brand, growth, and marketplace — where revenue meets the consumer.",
    videoId: "0D0DH9qIIj0",
    roles: [
      { title: "Brand Manager", function: "Brand & Positioning" },
      { title: "Performance Marketer", function: "Growth & Acquisition" },
      { title: "Marketplace Manager", function: "Quick Commerce & D2C" },
    ],
  },
  {
    industry: "Consumer Tech",
    tagline: "GTM and category growth at India's fastest-scaling platforms.",
    videoId: "FYSxT9lGlBU",
    roles: [
      { title: "Category Manager", function: "Category Growth" },
      { title: "GTM Associate", function: "Launch & Distribution" },
      { title: "Growth Manager", function: "Users & Revenue" },
    ],
  },
  {
    industry: "FMCG & Retail",
    tagline: "Trade, modern retail, and shelf-to-revenue leadership.",
    videoId: "flA-hiv_JtY",
    roles: [
      { title: "Trade Marketing", function: "Retail Visibility" },
      { title: "Key Account Manager", function: "Modern Trade" },
      { title: "Category Lead", function: "Shelf to Revenue" },
    ],
  },
];

export const careerLadder = ["IC", "Manager", "Director", "CEO / CXO"] as const;

export const supportPaths = [
  {
    title: "HR & People Ops",
    description: "Hiring processes, policy, and internal people management.",
  },
  {
    title: "Finance & Accounting",
    description: "Reporting, audits, and back-office number-crunching.",
  },
  {
    title: "Legal & Compliance",
    description: "Contracts, risk, and regulatory adherence.",
  },
  {
    title: "Back-Office Operations",
    description: "Coordination and process — far from the revenue line.",
  },
] as const;

export const revenuePaths = [
  {
    title: "Sales & Closing",
    description: "Own pipeline, quotas, and the deals that hit the P&L.",
  },
  {
    title: "Growth & GTM",
    description: "Acquisition, launches, and scaling what customers pay for.",
  },
  {
    title: "Brand & Performance",
    description: "Demand generation tied directly to revenue outcomes.",
  },
  {
    title: "Revenue Leadership",
    description: "The path from IC to manager to CEO — via the number.",
  },
] as const;

export const careerEntryPoints = [
  {
    industry: "SaaS",
    roles: "BDR · AE · CSM",
    href: "#why-industries",
  },
  {
    industry: "D2C",
    roles: "Brand · Marketplace",
    href: "#why-industries",
  },
  {
    industry: "Cons. Tech",
    roles: "Category · GTM",
    href: "#why-industries",
  },
  {
    industry: "FMCG",
    roles: "Trade · Retail",
    href: "#why-industries",
  },
] as const;

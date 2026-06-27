import { videoAsset, cdnAsset } from "@/lib/assets";
import type {
  AdmissionDeadline,
  AdmissionEvaluator,
  AdmissionRound,
  CareerPathwayGroup,
  CurriculumTrack,
  NewsArticle,
  PlacementSystemPillar,
  PortfolioDeliverable,
  ProgramTabHeroContent,
  ScholarshipCard,
  ToolCategory,
} from "@/data/coursePages/pgp-tabs";

export type AiMarketingAdmissionsIntro = {
  eyebrow: string;
  statement: string;
  emphasis: string;
  description: string;
  videoId: string;
  stats: { value: string; label: string; highlight?: boolean }[];
};

export const aiMarketingTabHero: Record<
  "curriculum" | "placements" | "admissions",
  ProgramTabHeroContent
> = {
  curriculum: {
    eyebrow: "AI Marketing Fellowship · Curriculum",
    statement: "Four tracks.",
    emphasis: "One complete marketer.",
    description:
      "Brand, performance, AI ops, and entrepreneurship — 25+ sprints taught through live challenges and operator-led sessions. AI-native from day one.",
    stats: [
      { value: "06", label: "Months" },
      { value: "4+2", label: "Curriculum + placements" },
      { value: "25+", label: "Intensive sprints" },
      { value: "10", label: "Live challenges" },
    ],
    primaryCta: { label: "Apply now", href: "/ai-marketing#apply" },
    secondaryCta: { label: "Download brochure", href: "/AI-Marketing-Fellowship-Brochure.pdf" },
  },
  placements: {
    eyebrow: "AI Marketing Fellowship · Outcomes",
    statement: "Three paths out.",
    emphasis: "All of them real.",
    description:
      "Agencies, D2C brands, consumer tech — or build your own freelance agency or D2C brand. Either way, you leave with proof of work, not a promise.",
    stats: [
      { value: "3", label: "Outcome paths" },
      { value: "100+", label: "Hiring partners" },
      { value: "10", label: "Portfolio challenges" },
      { value: "1:1", label: "Placement tracking" },
    ],
    secondaryCta: { label: "See hiring network", href: "#placements" },
  },
  admissions: {
    eyebrow: "AI Marketing Fellowship · Admissions",
    statement: "What it takes",
    emphasis: "to get in.",
    description:
      "Discovery call, business case discussion, and culture fit — three conversations to understand your background, thinking, and alignment with the cohort.",
    stats: [
      { value: "3", label: "Admission steps" },
      { value: "<7%", label: "Acceptance rate" },
      { value: "6 months", label: "Full-time programme" },
      { value: "October '26", label: "Next intake" },
    ],
    primaryCta: { label: "Start your application", href: "/ai-marketing#apply" },
    secondaryCta: { label: "See the process", href: "#selection" },
  },
};

export const aiMarketingTracksIntro =
  "Four tracks. One complete marketer. Brand (8 sprints), performance (10), AI ops (7), and entrepreneurship running parallel throughout.";

export const aiMarketingMentorsIntro =
  "Industry mentors — not professors. People building India's fastest-growing brands. They teach the way they work, by example.";

export const aiMarketingCurriculumTracks: CurriculumTrack[] = [
  {
    id: "brand",
    index: "01",
    title: "Brand, Content & Storytelling",
    subtitle: "8 sprints · The creative engine",
    pathLabel: "Build the brand",
    roles: "Brand Manager · Content Strategist · Social Media Manager · Creator IP",
    tags: ["Positioning", "Content", "Video", "Retail"],
    accent: "gold",
  },
  {
    id: "performance",
    index: "02",
    title: "Performance & Growth Marketing",
    subtitle: "10 sprints · The growth engine",
    pathLabel: "Drive measurable growth",
    roles: "Performance Marketer · Growth Associate · E-commerce Manager · SEO / AEO",
    tags: ["Meta Ads", "Google Ads", "Marketplaces", "B2B demand gen"],
    accent: "blue",
  },
  {
    id: "ai-ops",
    index: "03",
    title: "AI-Powered Marketing Operations",
    subtitle: "7 sprints · The multiplier",
    pathLabel: "Multiply with AI",
    roles: "AI Marketing Ops · MarTech Specialist · Lifecycle Marketer · Workflow Builder",
    tags: ["AI Agents", "Automation", "CRM", "No-code ops"],
    accent: "violet",
  },
  {
    id: "founder",
    index: "04",
    title: "Entrepreneurship",
    subtitle: "Build while you learn",
    pathLabel: "Build something new",
    roles: "D2C Founder · Freelance Consultant · Agency Founder · Creator IP",
    tags: ["D2C brand", "Content channel", "Freelance agency", "Incubation"],
    accent: "blue",
  },
];

export const aiMarketingToolStackIntro =
  "Foundation stacks for performance, brand, and AI — the tools you'll use from week one in a modern marketing team.";

export const aiMarketingToolStack: ToolCategory[] = [
  {
    title: "Performance & growth",
    image: videoAsset("images/tech/tech-stack-2.png"),
    items: ["Meta Ads", "Google Ads", "YouTube Ads", "Shopify", "GA4", "Google Tag Manager"],
  },
  {
    title: "Brand & content",
    image: videoAsset("images/tech/tech-stack-1.png"),
    items: ["Figma", "Canva", "CapCut", "Notion", "Buffer", "Instagram / YouTube"],
  },
  {
    title: "AI & automation",
    image: videoAsset("images/tech/tech-stack-3.png"),
    items: ["ChatGPT", "Claude", "Zapier", "Make", "Clay", "Perplexity"],
  },
];

export const aiMarketingPlacementSystemIntro =
  "Placements are a system we run from Day 1. Your progress is tracked weekly — every fellow has a mentor and a placement team member personally accountable for their outcome.";

export const aiMarketingPlacementSystem: PlacementSystemPillar[] = [
  {
    index: "01",
    title: "North Star Metric",
    description: "Target role, company tier, and compensation band — defined on Day 1 and tracked every week.",
  },
  {
    index: "02",
    title: "Mentor + Placement Lead",
    description: "Both are jointly accountable for your outcome. No hand-offs between coaching and placement.",
  },
  {
    index: "03",
    title: "Weekly Reviews",
    description: "Sprint performance, campaign outputs, portfolio quality, and interview readiness — all tracked.",
  },
  {
    index: "04",
    title: "Portfolio-First Prep",
    description: "Mock interviews, case prep, and pitch reviews built around the 10 capstones you ship in-programme.",
  },
];

export const aiMarketingPortfolioDeliverables: PortfolioDeliverable[] = [
  {
    index: "01",
    title: "Dohful on Zomato",
    description: "Listing + visibility for a cookie brand against Oreo and Parle.",
  },
  {
    index: "02",
    title: "Mamaearth vs WOW",
    description: "The ₹5,000 ad showdown — real budget, real Shopify store. Lowest CAC wins.",
  },
  {
    index: "03",
    title: "Protein Party viral content",
    description: "1M impressions in 30 days, zero ad spend.",
  },
  {
    index: "04",
    title: "AI competitor price tracker",
    description: "No-code system that monitors 5 rivals daily.",
  },
  {
    index: "05",
    title: "Personal AI marketing agent",
    description:
      "An AI-powered workflow that handles a real marketing task end-to-end.",
  },
];

export const aiMarketingCareerPathways: CareerPathwayGroup[] = [
  {
    title: "Agencies",
    roles: [
      "Performance Marketing Executive",
      "Programmatic Specialist",
      "Digital Marketing Executive",
      "Media Planner",
      "SEO Specialist",
    ],
  },
  {
    title: "D2C brands",
    roles: [
      "Online Marketplace Manager",
      "E-Commerce Executive",
      "Quick Commerce Manager",
      "Key Account Manager",
      "Growth Associate",
    ],
  },
  {
    title: "Consumer tech & services",
    roles: [
      "Content Marketing Associate",
      "Brand Marketing Associate",
      "Growth Associate",
      "Social Media Manager",
      "Community Manager",
    ],
  },
  {
    title: "Build your own",
    roles: [
      "Freelance Marketing Consultant",
      "Marketing Agency Founder",
      "D2C Brand Founder",
      "Independent Creator / IP Builder",
      "Founder's Office (Marketing)",
    ],
  },
];

export { pgpAlumniQuotes as aiMarketingAlumniQuotes } from "@/data/coursePages/pgp-tabs";

export const aiMarketingPlacementNews: NewsArticle[] = [
  {
    outlet: "Placement Report",
    title: "Year 2 PGP · ₹16.47L average · ₹27.8L highest",
    date: "2025–26",
    image: cdnAsset("images/news/annual-placement.jpg"),
    href: "/pgp-revenue-tech-entrepreneurship/placements",
  },
  {
    outlet: "Hindustan Times",
    title: "HiveSchool Placements Set New Benchmark | Average 14.76 LPA, Highest 30 LPA",
    date: "August 05, 2025",
    image: cdnAsset("images/news/hindustan-times.jpg"),
    href: "https://www.hindustantimes.com/brand-stories/hiveschool-placements-set-new-benchmark-average-14-76-lpa-highest-30-lpa-101754121352098.html",
  },
  {
    outlet: "ANINEWS",
    title:
      "HiveSchool Gains Strong Traction Among CAT Aspirants With 15 LPA Average Placement and 30 LPA Highest Offer",
    date: "July 18, 2025",
    image: cdnAsset("images/news/ani-news.jpeg"),
    href: "https://theprint.in/ani-press-releases/hiveschool-gains-strong-traction-among-cat-aspirants-with-15-lpa-average-placement-and-30-lpa-highest-offer/",
  },
  {
    outlet: "The Print",
    title:
      "HiveSchool eyes Top 20 B-Schools league before 2030, after ₹14.76 LPA average in its inaugural year",
    date: "June 22, 2025",
    image: cdnAsset("images/news/the-print.jpg"),
    href: "https://theprint.in/ani-press-releases/hiveschool-eyes-top-20-b-schools-league-before-2030-after-%e2%82%b914-76-lpa-average-in-its-inaugural-year/2724384/",
  },
];

export const aiMarketingAdmissionsIntro: AiMarketingAdmissionsIntro = {
  eyebrow: "Admissions · October 2026",
  statement: "What it takes",
  emphasis: "to get in.",
  description:
    "Three conversations — discovery, business case, and culture fit. College students or graduates from any background.",
  videoId: "vCfoRUGuszE",
  stats: [
    { value: "3", label: "Admission steps" },
    { value: "₹4.5L", label: "Programme fee", highlight: true },
    { value: "6 months", label: "On-campus" },
    { value: "October '26", label: "Next intake" },
  ],
};

export const aiMarketingAdmissionDecisionIntro =
  "Every admission is reviewed across marketing instinct, strategic thinking, coachability, and long-term fit with a high-intensity, build-first cohort.";

export const aiMarketingAdmissionRounds: AdmissionRound[] = [
  {
    round: "Step 01",
    title: "Discovery call with Head of Admissions",
    description:
      "A one-on-one conversation to understand your background, goals, and aspirations. This stage helps us assess intent and gives you space to share your story.",
  },
  {
    round: "Step 02",
    title: "Business case discussion with panel",
    description:
      "Work through a detailed case with our admissions team to showcase your problem-solving and strategic thinking, and how the programme aligns with your trajectory.",
  },
  {
    round: "Step 03",
    title: "Culture fit call",
    description:
      "We assess professional mindset, collaboration style, and long-term goals to ensure alignment with HiveSchool's culture — a cohort that challenges one another.",
  },
];

export const aiMarketingAdmissionEvaluators: AdmissionEvaluator[] = [
  {
    title: "Placements Team",
    icon: "svgs/evaluate-icon-1.svg",
    description:
      "Brings the lens of the marketing roles our graduates step into — assessing hireability, portfolio potential, and readiness for brand and growth teams.",
  },
  {
    title: "Academic Committee",
    icon: "svgs/evaluate-icon-2.svg",
    description:
      "Senior faculty and curriculum leads — assessing analytical depth, marketing reasoning, and ability to keep up with a demanding fellowship.",
  },
  {
    title: "Programme Team",
    icon: "svgs/evaluate-icon-3.svg",
    description:
      "The team that runs the cohort day-to-day — assessing professional maturity, self-awareness, and presence in a high-intensity creative environment.",
  },
  {
    title: "Founding Team",
    icon: "svgs/evaluate-icon-4.svg",
    description:
      "Co-founders and senior leadership — assessing intent, character, and long-term fit with the kind of institution HiveSchool is being built to be.",
  },
];

export const aiMarketingAdmissionDeadlines: AdmissionDeadline[] = [
  { round: "01", label: "Round 1 deadline", date: "July 31, '26", status: "active" },
  { round: "02", label: "Round 2 deadline", date: "August 31, '26", status: "upcoming" },
  { round: "03", label: "Round 3 deadline", date: "September 25, '26", status: "upcoming" },
];

export const aiMarketingScholarships: ScholarshipCard[] = [
  {
    title: "Merit Scholarship",
    icon: "svgs/scholarship-icon-1.svg",
    description:
      "Awarded to candidates who perform exceptionally well across all three rounds of the selection process.",
  },
  {
    title: "Need-Based Scholarship",
    icon: "svgs/scholarship-icon-2.svg",
    description:
      "We believe talent shouldn't be limited by financial background. This scholarship is based on a confidential financial review.",
  },
  {
    title: "Creator Scholarship",
    icon: "svgs/scholarship-icon-3.svg",
    description:
      "If you're already building a brand, audience, or creative practice — and can show traction or intent — this one's for you.",
  },
];

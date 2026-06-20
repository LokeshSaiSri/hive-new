import { asset } from "@/lib/assets";
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
    statement: "The curriculum — 4 tracks, 25+ sprints,",
    emphasis: "AI-native from Day 1.",
    description:
      "Brand, growth, content, and entrepreneurship — taught through live capstones and operator-led sprints. Built for marketers who want to lead with AI, not chase it.",
    stats: [
      { value: "06", label: "Months on-campus" },
      { value: "4", label: "Core tracks" },
      { value: "25+", label: "Intensive sprints" },
      { value: "10", label: "Live capstones" },
    ],
    secondaryCta: { label: "Download brochure", href: "#apply" },
  },
  placements: {
    eyebrow: "AI Marketing Fellowship · Placements",
    statement: "Career outcomes — marketing, brand & growth roles,",
    emphasis: "that's the goal.",
    description:
      "100+ hiring partners across brand, growth, and D2C. The Fellowship targets entry-to-mid marketing roles at D2C brands, consumer tech, agencies, and high-growth startups — or a functioning freelance marketing practice.",
    stats: [
      { value: "₹6–10L", label: "Typical first-year CTC" },
      { value: "₹12–15L", label: "Top performer band" },
      { value: "100+", label: "Hiring partners" },
      { value: "1:1", label: "Man-to-man tracking" },
    ],
    secondaryCta: { label: "Download placements report", href: "#placements" },
  },
  admissions: {
    eyebrow: "AI Marketing Fellowship · Admissions",
    statement: "AI Marketing Fellowship ·",
    emphasis: "October 2026 · Gurugram",
    description:
      "We evaluate candidates through conversations and case discussions. We're looking for people with marketing instinct, creative clarity, and the drive to build with AI from day one.",
    stats: [
      { value: "3–5 wks", label: "Process duration" },
      { value: "<7%", label: "Acceptance rate" },
      { value: "0–4 yrs", label: "Experience welcome" },
      { value: "No fee", label: "Application fee" },
    ],
    primaryCta: { label: "Start your application", href: "#apply" },
    secondaryCta: { label: "How we evaluate", href: "#selection" },
  },
};

export const aiMarketingTracksIntro =
  "Four tracks. One complete marketer. Every fellow experiences all four core tracks in the first three months — then goes deep into the specialization that fits their ambition.";

export const aiMarketingMentorsIntro =
  "Every module is led by a founder, CMO, growth lead, or senior practitioner from India's fastest-growing brands — selected for depth in the discipline being taught.";

export const aiMarketingCurriculumTracks: CurriculumTrack[] = [
  {
    id: "brand",
    index: "01",
    title: "Brand, Content & Storytelling",
    subtitle: "For D2C, FMCG & creator-led brands",
    pathLabel: "Build the brand",
    roles: "Brand Manager · Content Strategist · Social Media Manager · Creator IP",
    tags: ["Brand Strategy", "Content", "Storytelling", "Social"],
    accent: "gold",
  },
  {
    id: "performance",
    index: "02",
    title: "Performance & Growth",
    subtitle: "For paid media, e-commerce & marketplaces",
    pathLabel: "Drive measurable growth",
    roles: "Performance Marketer · Growth Associate · E-commerce Manager · SEO / AEO",
    tags: ["Meta Ads", "Google Ads", "Marketplaces", "Analytics"],
    accent: "blue",
  },
  {
    id: "ai-ops",
    index: "03",
    title: "AI Marketing Ops",
    subtitle: "For automation, MarTech & AI workflows",
    pathLabel: "Multiply with AI",
    roles: "AI Marketing Ops · MarTech Specialist · Lifecycle Marketer · Workflow Builder",
    tags: ["AI Agents", "Automation", "MarTech", "CRM"],
    accent: "violet",
  },
  {
    id: "founder",
    index: "04",
    title: "Founder's Track",
    subtitle: "For freelancers, agencies & D2C founders",
    pathLabel: "Build something new",
    roles: "Freelance Consultant · Agency Founder · D2C Founder · Founder's Office",
    tags: ["Venture Building", "Freelance", "Demo Day", "Incubation"],
    accent: "blue",
  },
];

export const aiMarketingToolStackIntro =
  "Every sprint ships into your portfolio. Foundation marketing tools, performance stacks, and the AI-native layer you'll use on Day 1 in a modern marketing team.";

export const aiMarketingToolStack: ToolCategory[] = [
  {
    title: "Foundation 1 · Performance & Growth",
    image: "images/tech/tech-stack-2.png",
    items: ["Meta Ads", "Google Ads", "YouTube Ads", "Shopify", "GA4", "Google Tag Manager"],
  },
  {
    title: "Foundation 2 · Brand & Content",
    image: "images/tech/tech-stack-1.png",
    items: ["Figma", "Canva", "CapCut", "Notion", "Buffer", "Instagram / YouTube"],
  },
  {
    title: "Foundation 3 · AI & Automation",
    image: "images/tech/tech-stack-3.png",
    items: ["ChatGPT", "Claude", "Zapier", "Make", "Perplexity", "Midjourney"],
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
    title: "Brand from Scratch",
    description:
      "Positioning, competitive landscape, content calendar, and campaign concept for a real startup — presented to the founder.",
  },
  {
    index: "02",
    title: "Viral Content Engine",
    description:
      "Build an Instagram page for a real brand. Track engagement, growth, and virality across five live posts.",
  },
  {
    index: "03",
    title: "Marketplace Launch",
    description:
      "List across Amazon, Flipkart, and Nykaa. Run campaigns. Build a scaling strategy with real dashboards.",
  },
  {
    index: "04",
    title: "Live Paid Campaign",
    description:
      "Meta campaigns end-to-end with real money — account setup, pixel, strategy, ad sets, targeting, and ROAS.",
  },
  {
    index: "05",
    title: "Personal AI Marketing Agent",
    description:
      "An AI-powered workflow that handles a real marketing task end-to-end — the deliverable that ties every track together.",
  },
];

export const aiMarketingCareerPathways: CareerPathwayGroup[] = [
  {
    title: "Brand & Content",
    roles: [
      "Brand Manager (D2C/FMCG)",
      "Content Strategist",
      "Content Marketing Manager",
      "Social Media Manager",
      "Influencer / Creator Manager",
      "Personal Brand & IP Builder",
    ],
  },
  {
    title: "Performance & Growth",
    roles: [
      "Performance Marketing Executive",
      "Growth Associate / Marketer",
      "E-Commerce / Marketplace Manager",
      "Paid Acquisition Specialist",
      "SEO / AEO Specialist",
      "Marketing Analyst",
    ],
  },
  {
    title: "AI Marketing Ops",
    roles: [
      "AI Marketing Ops Specialist",
      "Marketing Automation Manager",
      "MarTech Specialist",
      "Growth Engineer",
      "AI Workflow Builder",
      "Lifecycle / CRM Marketer",
    ],
  },
  {
    title: "Founder's Track",
    roles: [
      "D2C Brand Founder",
      "Freelance Marketing Consultant",
      "Marketing Agency Founder",
      "Independent Creator / IP Builder",
      "Founder's Office (Marketing)",
      "Chief of Staff (Growth)",
    ],
  },
];

export { pgpAlumniQuotes as aiMarketingAlumniQuotes } from "@/data/coursePages/pgp-tabs";

export const aiMarketingPlacementNews: NewsArticle[] = [
  {
    outlet: "Placement Report",
    title: "Year 2 PGP · ₹16.47L avg · ₹27.8L highest",
    date: "2025–26",
    image: asset("images/news/annual-placement.jpg"),
    href: "/pgp/placements",
  },
  {
    outlet: "Hindustan Times",
    title: "HiveSchool Placements Set New Benchmark | Average 14.76 LPA, Highest 30 LPA",
    date: "Aug 05, 2025",
    image: asset("images/news/hindustan-times.jpg"),
    href: "https://www.hindustantimes.com/brand-stories/hiveschool-placements-set-new-benchmark-average-14-76-lpa-highest-30-lpa-101754121352098.html",
  },
  {
    outlet: "ANINEWS",
    title:
      "HiveSchool Gains Strong Traction Among CAT Aspirants With 15 LPA Average Placement and 30 LPA Highest Offer",
    date: "Jul 18, 2025",
    image: asset("images/news/ani-news.jpeg"),
    href: "https://theprint.in/ani-press-releases/hiveschool-gains-strong-traction-among-cat-aspirants-with-15-lpa-average-placement-and-30-lpa-highest-offer/",
  },
  {
    outlet: "The Print",
    title:
      "HiveSchool eyes Top 20 B-Schools league before 2030, after ₹14.76 LPA average in its inaugural year",
    date: "Jun 22, 2025",
    image: asset("images/news/the-print.jpg"),
    href: "https://theprint.in/ani-press-releases/hiveschool-eyes-top-20-b-schools-league-before-2030-after-%e2%82%b914-76-lpa-average-in-its-inaugural-year/2724384/",
  },
];

export const aiMarketingAdmissionsIntro: AiMarketingAdmissionsIntro = {
  eyebrow: "Admissions · October 2026",
  statement: "How we decide",
  emphasis: "who gets in.",
  description:
    "Speak with the admissions team for a personal profile review and an honest read on whether you'll fit the cohort.",
  videoId: "vCfoRUGuszE",
  stats: [
    { value: "<7%", label: "Acceptance" },
    { value: "40", label: "Handpicked cohort", highlight: true },
    { value: "6 mo", label: "Duration" },
    { value: "May 15, '26", label: "Round 1 closes" },
  ],
};

export const aiMarketingAdmissionDecisionIntro =
  "Every admission is reviewed across four evaluation pillars — marketing instinct, creative clarity, coachability, and long-term fit. Candidates who cross the combined cut-off receive an offer. Across our application history, fewer than 7% of applicants make it through.";

export const aiMarketingAdmissionRounds: AdmissionRound[] = [
  {
    round: "Round 01",
    title: "Application & profile review",
    description:
      "Your background, intent, and fit for marketing roles. We look for creative clarity, ambition, and evidence of doing — not just grades.",
  },
  {
    round: "Round 02",
    title: "Case & marketing discussion",
    description:
      "How you think about brands, campaigns, and growth — assessed by senior faculty and practitioner mentors from the fellowship network.",
  },
  {
    round: "Round 03",
    title: "Leadership conversation",
    description:
      "Intent, character, and long-term fit — with co-founders and senior leadership. Coachability and hunger to build with AI matter here.",
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
  { round: "01", label: "Round 1 deadline", date: "May 15, '26", status: "active" },
  { round: "02", label: "Round 2 deadline", date: "June 30, '26", status: "upcoming" },
  { round: "03", label: "Round 3 deadline", date: "August 15, '26", status: "upcoming" },
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

import type { CoursePageConfig } from "@/data/coursePages/types";

export const aiMarketingCoursePage: CoursePageConfig = {
  slug: "ai-marketing",
  programmeTitle: "AI Marketing & Entrepreneurship Fellowship",
  meta: {
    title: "AI Marketing & Entrepreneurship Fellowship | HiveSchool",
    description:
      "India's first AI-native marketing fellowship. A 6-month on-campus programme in Gurugram for ambitious professionals building careers in marketing, brand, growth, and entrepreneurship.",
  },
  hero: {
    badge: "Fellowship",
    location: "Gurugram",
    intake: "Oct 2026",
    title: "AI Marketing &",
    emphasis: "Entrepreneurship",
    description:
      "India's first AI-native marketing fellowship. A 6-month on-campus programme in Gurugram for ambitious professionals building careers in marketing, brand, growth, and entrepreneurship.",
    videoId: "vCfoRUGuszE",
    backgroundVideo: "videos/ai-marketing-hero.mp4",
    primaryCta: { label: "Start application", href: "#apply" },
    secondaryCta: { label: "Download placement report", href: "#placements" },
    stats: [
      { value: "06", label: "Months on-campus" },
      { value: "4", label: "Core tracks" },
      { value: "25+", label: "Intensive sprints" },
      { value: "10", label: "Live capstones" },
    ],
    meta: [
      { label: "Portfolio", value: "10 live projects" },
      { label: "Brand briefs", value: "4 real campaigns" },
      { label: "Capstone", value: "1 venture built by you" },
      { label: "Network", value: "100+ partner companies" },
    ],
  },
  pillars: {
    eyebrow: "Why this programme",
    statement: "Built for how marketing",
    emphasis: "actually works",
    description:
      "The brands hiring today want someone who can run Meta campaigns, build content engines, optimise marketplace listings, set up AI workflows, and read a dashboard — on Day 1.",
    items: [
      {
        index: "01",
        title: "AI-native from Week 1",
        description:
          "Every marketing workflow runs on AI — integrated into every sprint from Day 1. Build agents. Deploy automation. Multiply output.",
      },
      {
        index: "02",
        title: "Real campaigns, real budgets",
        description:
          "Run real campaigns with real budgets, build real Instagram pages, list real products — from the first month. No simulations.",
      },
      {
        index: "03",
        title: "Two paths: hire or freelance",
        description:
          "Core track for marketing roles. Founder's track for freelance clients, agency building, or your own D2C brand.",
      },
    ],
  },
  paths: {
    eyebrow: "Choose your path",
    statement: "Two paths.",
    emphasis: "One programme.",
    description:
      "The skills are identical — brand strategy, performance marketing, AI workflows, analytics. The difference is where you apply them.",
    items: [
      {
        index: "Path 01",
        title: "I want to get hired in marketing",
        description:
          "Marketing teams are hiring fast — but they want people who already work with AI. The Fellowship places you in roles paying ₹6–15 LPA in your first year.",
        tags: ["D2C brands", "Consumer tech", "Ad agencies", "High-growth startups", "FMCG"],
        outcome: "₹6 – 10 LPA · Top performers cross ₹12 – 15 LPA",
      },
      {
        index: "Path 02",
        title: "I want to build a freelance practice",
        description:
          "Turn AI marketing skills into a business. Start with paying D2C and SaaS clients, then scale into an agency, D2C brand, or creator IP.",
        tags: ["Freelance clients", "Agency founder", "D2C brand builder", "Creator IP"],
        outcome: "₹50K – ₹2L / month · Incubation Cell + Demo Day access",
      },
    ],
  },
  inlineCtas: [
    {
      id: "fit-check",
      variant: "light",
      eyebrow: "Admissions support",
      title: "Not sure if this programme is right for you?",
      description:
        "Speak with the admissions team for a personal profile review and an honest read on whether you'll fit the cohort.",
      primary: { label: "Book a call", href: "#apply" },
      secondary: { label: "Download placement report", href: "#placements" },
    },
    {
      id: "portfolio",
      variant: "dark",
      eyebrow: "Career outcomes",
      title: "Build skills that map directly to hiring roles",
      description:
        "Tracks designed for measurable business impact — from day one through placement.",
      primary: { label: "Apply now", href: "#apply" },
      secondary: { label: "Talk to admissions", href: "#apply" },
    },
    {
      id: "intake",
      variant: "accent",
      eyebrow: "Next cohort",
      title: "Applications are open for the upcoming intake",
      description:
        "Join a 6-month AI-native marketing fellowship on campus in Gurugram. Limited seats per cohort.",
      primary: { label: "Start application", href: "#apply" },
      secondary: { label: "Download brochure", href: "#apply" },
    },
  ],
  timeline: {
    eyebrow: "Course timeline",
    statement: "Your 6-month",
    emphasis: "transformation",
    phases: [
      {
        phase: "Pre-programme",
        title: "Onboarding + first challenge",
        description: "First challenge brief, tools setup, cohort bonding, and founder meet.",
        tags: ["48-hour orientation", "Cohort bonding", "Founder meet"],
        image: "images/timeline/pre-programme.webp",
      },
      {
        phase: "Month 1",
        title: "Marketing foundations + brand building",
        description: "Brand positioning, consumer GTM, content strategy, and storytelling.",
        tags: ["Brand strategy", "Content", "Consumer GTM"],
        image: "images/timeline/month1.webp",
      },
      {
        phase: "Month 2",
        title: "Performance marketing + e-commerce",
        description: "Meta Ads, Google Ads, YouTube Ads, Shopify. First real campaign with real budget.",
        tags: ["Meta Ads", "Google Ads", "Shopify"],
        image: "images/timeline/month2.webp",
      },
      {
        phase: "Month 3",
        title: "Advanced marketing + AI workflows",
        description: "Programmatic, SEO/AEO/GEO, B2B demand gen, ABM, MarTech, and AI agents.",
        tags: ["SEO/AEO", "B2B demand gen", "AI agents"],
        image: "images/timeline/month3.webp",
      },
      {
        phase: "Month 4",
        title: "Capstone month + portfolio",
        description: "Personal branding sprint. Founder's Pitch Day. Portfolio finalisation.",
        tags: ["Capstone", "Pitch day", "Portfolio"],
        image: "images/timeline/month4.webp",
      },
      {
        phase: "Months 5–6",
        title: "Placements",
        description: "Active placement season or continue building your freelance agency with incubation support.",
        tags: ["Mock interviews", "Recruiter prep", "Freelance track"],
        image: "images/timeline/month5.webp",
      },
    ],
  },
  capstones: {
    eyebrow: "The capstones",
    statement: "10 real projects.",
    emphasis: "Your marketing portfolio.",
    description:
      "You don't learn marketing by studying it. Every week you're building real campaigns, running real ads, and solving real brand problems.",
    variant: "showcase",
    items: [
      {
        index: "01",
        title: "Brand from scratch",
        description:
          "Positioning, competitive landscape, content calendar, and campaign concept for a real startup.",
        category: "Brand strategy",
        badge: "Live brief",
      },
      {
        index: "02",
        title: "Viral content engine",
        description:
          "Build an Instagram page for a real brand. Track engagement, growth, and virality across five live posts.",
        category: "Content & social",
        badge: "Real audience",
      },
      {
        index: "03",
        title: "Marketplace launch",
        description:
          "List across Amazon, Flipkart, Nykaa. Run campaigns. Build scaling strategy with real dashboards.",
        category: "E-commerce",
        badge: "Marketplace ops",
      },
      {
        index: "04",
        title: "Live paid campaign",
        description: "Meta campaigns end-to-end with real money and real data.",
        category: "Performance",
        badge: "Real budget",
      },
      {
        index: "05",
        title: "Programmatic media plan",
        description: "Complete DV360 plan — audience, creative versioning, measurement.",
        category: "Media planning",
        badge: "DV360",
      },
      {
        index: "06",
        title: "Search audit & AI visibility",
        description: "SEO audit + AEO brand presence + 90-day search strategy.",
        category: "Search & AEO",
        badge: "AI visibility",
      },
      {
        index: "07",
        title: "The broken dashboard",
        description:
          "Anonymised data. Find the problem. Present diagnosis + 30-day recovery.",
        category: "Analytics",
        badge: "Diagnosis",
      },
      {
        index: "08",
        title: "Offline retail launch",
        description:
          "D2C brand entering modern trade — margins, shelf strategy, activation.",
        category: "Retail expansion",
        badge: "Omnichannel",
      },
      {
        index: "09",
        title: "WhatsApp funnel",
        description:
          "Automation funnel for lost leads — sequencing, messaging, conversion.",
        category: "Lifecycle",
        badge: "Automation",
      },
      {
        index: "10",
        title: "Personal AI marketing agent",
        description: "AI-powered workflow that handles a real task end-to-end.",
        category: "AI ops",
        badge: "Finale capstone",
        featured: true,
      },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    statement: "Questions you're",
    emphasis: "probably asking",
    description:
      "Everything you need to know about the AI Marketing Fellowship — from specializations to portfolios and placements.",
    items: [
      {
        question: "What if I have no prior marketing background?",
        answer:
          "Designed for graduates from any stream. Curriculum starts at first principles. By Week 4, fellows with zero background are running real Meta campaigns.",
      },
      {
        question: "How do specializations work?",
        answer:
          "You declare your specialization at the end of Month 3, after experiencing all four core tracks (Brand, Performance, AI Ops, Founder's). Months 4 onwards go deeper with tailored capstone work and placement prep aligned to roles in that track.",
      },
      {
        question: "Will I graduate with a real portfolio?",
        answer:
          "Yes. By Month 4 you'll have shipped 10 capstone projects plus 4 flagship outputs — campaigns with real budgets, brands built, and AI agents deployed.",
      },
      {
        question: "Are ad budgets and tools included?",
        answer:
          "Yes. Programme fee covers ad budgets for live campaigns, tool access, and AI subscriptions during the AI track.",
      },
      {
        question: "What roles do graduates typically land?",
        answer:
          "Entry-to-mid marketing roles at D2C brands, consumer tech, ad agencies, and high-growth startups — typically ₹6–10 LPA in the first year, with top performers crossing ₹12–15 LPA. The Founder's track supports freelance clients, agency building, or your own D2C brand.",
      },
      {
        question: "Is this full-time and on-campus?",
        answer:
          "Yes. A 6-month, full-time, on-campus fellowship in Gurugram. You learn by doing — real briefs, real budgets, and real brands from week one.",
      },
    ],
  },
  fees: {
    eyebrow: "Fee structure",
    statement: "Invest in a",
    emphasis: "6-month transformation",
    badge: "Fellowship",
    intake: "October 2026",
    description:
      "Programme fee includes ad budgets for live campaigns, tool access, and AI subscriptions during the fellowship.",
    lines: [
      { label: "Admission Fee", amount: "₹50,000" },
      { label: "Tuition Fee", amount: "₹4,00,000", highlight: true },
    ],
    scholarships: [
      {
        title: "Merit Scholarship",
        description: "For candidates who perform exceptionally across all selection rounds.",
      },
      {
        title: "Need-Based Scholarship",
        description: "Confidential financial review for candidates who need support to attend.",
      },
    ],
    note: "Total program fee ₹4,50,000",
  },
  applicationForm: {
    title: "AI Marketing Application Form",
    headline: "Fellowship application",
  },
  sections: {
    placement: false,
    mentors: true,
    challenges: true,
    studentStories: true,
    campus: true,
    reels: false,
    admissions: true,
    applicationForm: true,
  },
};

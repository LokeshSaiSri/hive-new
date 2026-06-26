import type { CoursePageConfig } from "@/data/coursePages/types";

export const pgpCoursePage: CoursePageConfig = {
  slug: "pgp",
  programmeTitle: "PGP in Revenue, AI & Entrepreneurship",
  meta: {
    title: "PGP in Revenue, AI & Entrepreneurship | HiveSchool",
    description:
      "India's first AI-native, revenue-focused business school. A 9-month residential PGP in Gurugram for ambitious professionals building careers in revenue, marketing, and entrepreneurship.",
  },
  hero: {
    badge: "Post Graduate Programme",
    location: "Gurugram",
    intake: "October 2026",
    title: "Revenue, AI &",
    emphasis: "Entrepreneurship",
    description:
      "India's first AI-native, revenue-focused business school. A 9-month residential PGP programme in Gurugram for ambitious professionals building careers in revenue, marketing, and entrepreneurship.",
    videoId: "rFZLsmtruzM",
    backgroundVideo: "videos/pgp-hero.mp4",
    posterVideoId: "3OVg1OFxd1k",
    primaryCta: { label: "Apply Now", href: "/pgp/admissions" },
    secondaryCta: { label: "Download Placement Report", href: "/pgp/placements" },
    stats: [
      { value: "09", label: "Months full-time residential" },
      { value: "₹16.47L", label: "Average CTC" },
      { value: "₹27.8L", label: "Highest CTC" },
      { value: "100+", label: "Hiring partners" },
    ],
    meta: [
      { label: "Duration", value: "9 months" },
      { label: "Commencement", value: "October 2026" },
      { label: "Format", value: "Full-time" },
      { label: "Location", value: "Gurugram" },
    ],
  },
  pillars: {
    eyebrow: "Why this programme",
    statement: "Built for the roles that",
    emphasis: "run businesses",
    description:
      "Revenue roles compound into leadership. This PGP trains you for GTM, sales, marketing, and founder paths — through live challenges, not case studies alone.",
    items: [
      {
        index: "01",
        title: "Challenge-first from Day 1",
        description:
          "Real briefs from real companies. Your proof-of-work portfolio starts in week one — not after graduation.",
      },
      {
        index: "02",
        title: "Operator-led sprints",
        description:
          "Every module is taught by practitioners from Zomato, Google, Adobe, Razorpay, and India's fastest-growing startups.",
      },
      {
        index: "03",
        title: "Placement system built in",
        description:
          "Weekly career marking, mock interviews, and 100+ hiring partners from Month 5 through active placement season.",
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
      primary: { label: "Book a call", href: "/pgp/admissions" },
      secondary: { label: "Download PGP handbook", href: "/4-Month-Roadmap-Brand-x-Revenue.pdf" },
    },
    {
      id: "curriculum",
      variant: "dark",
      eyebrow: "Curriculum",
      title: "Get the full breakdown of sprints, tools, and challenges",
      description:
        "Understand how the journey is structured — from foundations to live company work.",
      primary: { label: "Apply now", href: "/pgp/admissions" },
      secondary: { label: "Download PGP handbook", href: "/4-Month-Roadmap-Brand-x-Revenue.pdf" },
    },
    {
      id: "challenges",
      variant: "accent",
      eyebrow: "Challenge-first learning",
      title: "Work on real business problems every sprint",
      description:
        "Replace passive lectures with proof-of-work, operator feedback, and role-ready outcomes.",
      primary: { label: "See how it works", href: "/pgp/curriculum" },
      secondary: { label: "View placements", href: "/pgp/placements" },
    },
    {
      id: "placements-cta",
      variant: "light",
      eyebrow: "Proof-of-work",
      title: "See where graduates go after HiveSchool",
      description:
        "Role-wise outcomes, hiring partner network, and proof-of-work from recent cohorts.",
      primary: { label: "View placements", href: "/pgp/placements" },
      secondary: { label: "Download reports", href: "/pgp/placements" },
    },
  ],
  timeline: {
    eyebrow: "Course timeline",
    statement: "Your 9-month",
    emphasis: "transformation",
    phases: [
      {
        phase: "Pre-programme",
        title: "Onboarding + first challenge",
        description:
          "Orientation brief, founder meet, cohort bonding, and your first live challenge — work starts on Day 1.",
        tags: ["48-hour orientation", "Cohort setup", "Founder meet"],
        image: "images/timeline/pre-programme.webp",
      },
      {
        phase: "Month 1",
        title: "Business foundation",
        description:
          "Business models, revenue fundamentals, GTM overview, and P&L literacy across both tracks.",
        tags: ["Business models", "Revenue fundamentals", "GTM overview"],
        image: "images/timeline/month1.webp",
      },
      {
        phase: "Month 2",
        title: "Industry depth",
        description:
          "D2C GTM vs SaaS GTM vs retail — entirely different playbooks. Go deep in your vertical.",
        tags: ["SaaS economics", "D2C value chain", "Consumer tech"],
        image: "images/timeline/month2.webp",
      },
      {
        phase: "Month 3",
        title: "Verticalisation + electives",
        description:
          "Pick your industry and function. Advanced GTM motions and competitive positioning.",
        tags: ["Elective selection", "Advanced GTM", "Positioning"],
        image: "images/timeline/month3.webp",
      },
      {
        phase: "Month 4",
        title: "Building AI workflows",
        description:
          "AI-powered outbound, consumer brand AI, RevOps, and no-code automation across every function.",
        tags: ["AI outbound", "RevOps", "No-code GTM"],
        image: "images/timeline/month4.webp",
      },
      {
        phase: "Months 5–6",
        title: "Placement prep intensifies",
        description:
          "Business cases, communication, mock interviews, and recruiter-specific preparation.",
        tags: ["Mock interviews", "Case prep", "Resume finalisation"],
        image: "images/timeline/month5.webp",
      },
      {
        phase: "Months 7–9",
        title: "Active placements",
        description:
          "Full placement season with 100+ hiring partners and structured recruiter processes.",
        tags: ["100+ partners", "Active season", "Offer support"],
        image: "images/timeline/month7-9.webp",
      },
    ],
  },
  fees: {
    eyebrow: "Investment",
    statement: "Fees and",
    emphasis: "scholarships",
    badge: "Post Graduate Programme",
    intake: "October 2026",
    description:
      "9-month full-time residential. Includes tuition, tools, mentorship & placement support. Banking partners and financial assistance available.",
    lines: [
      { label: "Admission fee", amount: "₹50,000" },
      { label: "Tuition fee", amount: "₹8,00,000" },
      { label: "Total fee", amount: "₹8,50,000", highlight: true },
    ],
    scholarships: [
      {
        title: "Merit Scholarship",
        description:
          "Awarded to candidates who perform exceptionally well across all three rounds of the selection process.",
      },
      {
        title: "Need-Based Scholarship",
        description: "For students requiring financial support through a confidential financial review.",
      },
      {
        title: "Startup Scholarship",
        description:
          "For students actively building startups, side projects, or ventures with traction or clear intent.",
      },
    ],
    note: "Every applicant is automatically considered for scholarships based on application and interview performance.",
  },
  faqs: {
    eyebrow: "FAQs",
    statement: "Questions answered by",
    emphasis: "the institute founders",
    description:
      "Every applicant is automatically considered for scholarships based on their application and interview performance.",
    items: [
      {
        question: "What is the PGP in Revenue, AI & Entrepreneurship?",
        answer:
          "A 9-month, full-time, residential programme in Gurugram. It trains you for revenue roles across SaaS, consumer brands, and startups — through practitioner-led sprints, real business challenges, and a personalised placement system.",
      },
      {
        question: "Who is this programme for?",
        answer:
          "Graduates and young professionals with 0–5 years of experience interested in revenue, growth, marketing, sales, or building a startup — and who learn better by doing than by sitting in lectures.",
      },
      {
        question: "What are the three tracks?",
        answer:
          "Tech & AI (SaaS sales, BDR, RevOps, GTM), Consumer (brand, D2C, marketplace, performance marketing), and Founder's Track (build a product, take it to market, generate revenue).",
      },
      {
        question: "How are placements handled?",
        answer:
          "From Day 1, mentors and the placement team define your North Star. Progress is tracked weekly. By Month 5 you've built proof-of-work. Months 7–9 are active placements with 100+ hiring partners.",
      },
      {
        question: "What are the latest placement outcomes?",
        answer:
          "Year 2 PGP Cohort 1 (residential, audited): ₹16.47L average CTC, ₹15L median, ₹27.8L highest, ₹21.93L top-25% average, and +184% average post-MBA salary jump. Inaugural online cohort: ₹14.76L average, ₹30L highest.",
      },
      {
        question: "What kind of challenges will I work on?",
        answer:
          "Real business problems with real companies. Past challenges have included building a QSR expansion plan for Dohful, scaling a D2C brand on quick-commerce for Fix My Curls, managing ₹800Cr logistics for PeeSafe, and running outbound campaigns for live SaaS companies. Your work is evaluated by the founders and CXOs of those companies.",
      },
    ],
  },
  applicationForm: {
    title: "PGP Application Form",
    headline: "PGP application",
  },
  sections: {
    placement: true,
    mentors: true,
    challenges: true,
    studentStories: true,
    campus: true,
    reels: true,
    admissions: true,
    applicationForm: true,
  },
};

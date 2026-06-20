import type { CoursePageConfig } from "@/data/coursePages/types";

export const ugCoursePage: CoursePageConfig = {
  slug: "ug",
  programmeTitle: "Undergraduate Programme",
  meta: {
    title: "Undergraduate Programme | HiveSchool",
    description:
      "A 3-year UG for founders, growth operators, and AI-native problem solvers — industry-led, starting Aug 2027 in Gurugram.",
  },
  hero: {
    badge: "Undergraduate Programme",
    location: "Gurugram",
    intake: "Aug 2027",
    title: "The undergraduate program.",
    emphasis: "Built differently.",
    description:
      "A 3-year UG with 2+1 live project internships — for founders, growth operators, and AI-native problem solvers, starting Aug 2027.",
    videoId: "gpXQDETej2k",
    backgroundVideo: "videos/campus-hero.mp4",
    primaryCta: { label: "Apply for Class of 2030", href: "#apply" },
    secondaryCta: { label: "Download brochure", href: "#apply" },
    stats: [
      { value: "3", label: "Year programme" },
      { value: "12MO", label: "Paid industry work" },
      { value: "100+", label: "Founders & operators" },
      { value: "Aug '27", label: "Cohort begins" },
    ],
    meta: [
      { label: "Format", value: "Industry-led UG" },
      { label: "Stack", value: "AI-native curriculum" },
      { label: "Output", value: "5 real businesses" },
      { label: "Location", value: "Gurugram" },
    ],
  },
  pillars: {
    eyebrow: "Why a new kind of UG",
    statement: "A world that doesn't",
    emphasis: "exist anymore",
    description:
      "A 3-year case-method UG can't keep up. We rebuilt the undergraduate experience from scratch — serious business fundamentals fused with the modern stack of AI, marketing, growth, and entrepreneurship.",
    items: [
      {
        index: "01",
        title: "100% AI-integrated curriculum",
        description:
          "Built around the tools, frameworks, and workflows high-performing teams use. AI is the default operating system across every sprint.",
      },
      {
        index: "02",
        title: "Mentored by practitioners & CXOs",
        description:
          "Taught by active CMOs, founders, growth leads, and operations directors running marquee Indian companies.",
      },
      {
        index: "03",
        title: "Build 5 real businesses",
        description:
          "Launch a D2C brand, audience channel, AI product, operator practice, and startup. Walk out with proof, not just a degree.",
      },
    ],
  },
  highlights: {
    eyebrow: "Three flagship highlights",
    statement: "The three things that make",
    emphasis: "this UG different",
    items: [
      { index: "01", title: "Pedagogy", subtitle: "Challenge-led. 160 live challenges.", href: "#challenges" },
      { index: "02", title: "Curriculum", subtitle: "AI-led. From day one.", href: "#timeline" },
      { index: "03", title: "Output", subtitle: "Practical experience. Built in.", href: "#apply" },
    ],
  },
  audience: {
    eyebrow: "Who this is for",
    statement: "If any of these sound like you,",
    emphasis: "apply",
    description:
      "Class XII pass-outs from 2025 onwards, any stream. We look for builders, not test-toppers. Fewer than 1 in 10 applicants make the cohort.",
    footnote: "We receive hundreds of applications per cohort. Every admit goes through all four stages with our admissions team and founders.",
    items: [
      { index: "01", title: "The builder", description: "Side projects, Instagram pages, newsletters, apps you shipped. You're not waiting for permission to start." },
      { index: "02", title: "The future founder", description: "You want to start something — a brand, product, or agency — with mentors and capital nearby." },
      { index: "03", title: "The future operator", description: "Brand manager. Growth lead. Strategy associate. You want the role without waiting four years." },
      { index: "04", title: "The AI-native", description: "You're already building with Cursor, Lovable, Claude. You want a college that thinks the same way." },
    ],
  },
  inlineCtas: [
    {
      id: "mentors",
      variant: "dark",
      eyebrow: "Operator-led",
      title: "Learn directly from people building modern Indian business",
      description:
        "Faculty and mentors bring real GTM, sales, and growth playbooks — not textbook theory.",
      primary: { label: "Apply now", href: "#apply" },
      secondary: { label: "Download brochure", href: "#apply" },
    },
    {
      id: "curriculum",
      variant: "light",
      eyebrow: "Curriculum",
      title: "Get the full breakdown of sprints, tools, and challenges",
      description:
        "Understand how the journey is structured — from foundations to live company work.",
      primary: { label: "Explore curriculum", href: "#timeline" },
      secondary: { label: "Talk to admissions", href: "#apply" },
    },
    {
      id: "intake",
      variant: "accent",
      eyebrow: "Class of 2030",
      title: "Three years from now, where will you be?",
      description:
        "August 2027 · Gurugram · Residential. Applications open. Fewer than 1 in 10 will be admitted.",
      primary: { label: "Apply for Class of 2030", href: "#apply" },
      secondary: { label: "Download brochure", href: "#apply" },
    },
    {
      id: "placements",
      variant: "light",
      eyebrow: "Placement outcomes",
      title: "See where graduates go after HiveSchool",
      description:
        "Role-wise outcomes, hiring partner network, and proof-of-work from recent cohorts.",
      primary: { label: "View placements", href: "#placements" },
      secondary: { label: "Download reports", href: "#placements" },
    },
  ],
  timeline: {
    eyebrow: "The 3-year journey",
    statement: "Three years.",
    emphasis: "Mapped.",
    phases: [
      {
        phase: "Year 1",
        title: "Foundations & first builds",
        description:
          "Business fundamentals, statistics, strategy, economics, marketing. Launch your first D2C brand and ship your first AI product.",
        tags: ["D2C brand launch", "AI product build", "₹1L+ revenue target"],
        image: "images/timeline/pre-programme.webp",
      },
      {
        phase: "Year 2",
        title: "Specialize & operate",
        description:
          "Competitive strategy, sales, financial management, supply chain. Run your operator practice with paying clients. Investor Demo Day.",
        tags: ["Paying clients", "Demo day", "Mandatory work experience"],
        image: "images/timeline/month4.webp",
      },
      {
        phase: "Year 3",
        title: "Industry & launch",
        description:
          "12 months of structured paid internships. PPO season from Month 1, or continue building your incubated startup.",
        tags: ["12-month internship", "PPO season", "Final placement"],
        image: "images/timeline/month7-9.webp",
      },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    statement: "Common questions about",
    emphasis: "the UG programme",
    items: [
      {
        question: "Who is eligible to apply?",
        answer:
          "Class XII students and pass-outs from 2025 onwards, any stream. The real filter is fit — we look for builders with proof of initiative.",
      },
      {
        question: "How is this different from a traditional BBA or B.Com?",
        answer:
          "Every term pairs fundamentals with live business output. You don't wait until a summer internship to do real work — it's graded into the curriculum from Year 1.",
      },
      {
        question: "What businesses will I build?",
        answer:
          "Five ventures: a D2C brand, AI product, audience channel, operator practice with paying clients, and your own startup pitched at Investor Demo Day.",
      },
      {
        question: "Is there a founder track?",
        answer:
          "Yes. The Hive Incubation Lab offers ₹10Cr founder fund access, VC board mentorship, and 5 years of operator network for founders selected at Demo Day.",
      },
    ],
  },
  sections: {
    placement: false,
    mentors: true,
    challenges: true,
    studentStories: true,
    campus: true,
    reels: true,
    admissions: true,
  },
};

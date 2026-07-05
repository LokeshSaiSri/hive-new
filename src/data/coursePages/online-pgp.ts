import type { CoursePageConfig } from "@/data/coursePages/types";
import type {
  AlumniQuote,
  AdmissionRound,
  PlacementSystemPillar,
  CareerPathwayGroup,
} from "@/data/coursePages/pgp-tabs";
import { placementReportDownloadPath } from "@/data/placementReportAccess";
import { asset } from "@/lib/assets";

// ─── Bootcamp Capstone Pillars (for LaunchpadBootcampDeck) ───────────────────
export const launchpadBootcampPillars: PlacementSystemPillar[] = [
  {
    index: "01",
    title: "Salespreneur Pitch",
    description:
      "The program culminates in final capstone presentations before a room full of revenue heads and sales professionals.\n\n1. 4-day residential bootcamp in Delhi — The entire cohort comes together offline, living and working as a team alongside Hive faculty and mentors.\n2. Capstone Prep — Days are packed with working sprints, mentor reviews, and rehearsal rounds to sharpen your final strategy.\n3. Present at campus — The bootcamp concludes with high-stakes presentations before revenue heads, hiring managers, and future recruiters.",
  },
  {
    index: "02",
    title: "GTM Challenge",
    description:
      "Step into the role of a founder and put your go-to-market strategy to the ultimate test.\n\n1. Design a complete GTM playbook — Build market entry strategies with ICPs, funnel stages, and positioning refined through case work.\n2. Defend your approach — Present your GTM decisions, metrics, and channel choices under real scrutiny.\n3. A live audience experience — Deliver your playbook in front of industry professionals and peers, mirroring the pressure of boardroom discussions.",
  },
  {
    index: "03",
    title: "Cold Call Battle",
    description:
      "A high-pressure exercise that sharpens persistence, resilience, and clarity of communication.\n\n1. Live calling under time limits — Practice opening real conversations with prospects in a structured, timed setup.\n2. Objection handling in practice — Apply frameworks to manage pushback and refine your approach in real time.\n3. Performance in focus — Demonstrate your skills in front of peers and future recruiters, building confidence for real-world sales environments.",
  },
];

// ─── Alumni Quotes (for LaunchpadAlumniVoices) ───────────────────────────────
// NOTE: Images for Shreyancy and Gurmehak will be added when real portrait images are provided.
// Their YouTube Shorts are already embedded via videoId.
export const launchpadAlumniQuotes: AlumniQuote[] = [
  {
    name: "Shreyancy",
    role: "FinOps Consultant",
    company: "Zenskar",
    quote:
      "The program didn't just teach me sales — it showed me how revenue and finance connect at the product level. At Zenskar I work directly with the GTM team on billing and finance automation. That context came from HiveSchool.",
  },
  {
    name: "Gurmehak Aulakh",
    role: "Sales Associate",
    company: "HiveSchool Alumni",
    quote:
      "I was afraid of stepping out of my comfort zone. The Cold Call Battle alone made me realise I could handle any sales conversation with confidence. That fear is completely gone now.",
  },
  {
    name: "Vasu Haria",
    role: "Growth Partner",
    company: "Acciojob",
    quote:
      "One of the biggest lessons was learning to stay calm when everything feels urgent. The environment pushed me to take ownership and make decisions without second-guessing. Those habits have stayed with me.",
  },
  {
    name: "Jigisha",
    role: "Senior Analyst",
    company: "Amazon",
    quote:
      "The rigor of the assignments and live projects gave me a huge edge during interviews. I had real data and frameworks to talk about instead of just theory.",
  },
  {
    name: "Abhik",
    role: "Sr. SDR",
    company: "Almabase",
    quote:
      "Launchpad gave me the exact outbound systems and tech stack knowledge I needed to double my meeting book rate in just two months.",
  },
];

// ─── Career Pathways (for PlacementsCareerPathways) ─────────────────────────
export const launchpadCareerPathways: CareerPathwayGroup[] = [
  {
    title: "SaaS & Tech Sales",
    roles: [
      "BDR / SDR",
      "Founding BDR",
      "Account Executive (AE)",
      "Sales Development Lead",
      "RevOps Associate",
      "GTM Associate",
    ],
  },
  {
    title: "Founder & Leadership",
    roles: [
      "Sales Lead",
      "Director of Sales",
      "VP Sales",
      "CRO (Chief Revenue Officer)",
      "Founder's Office",
      "Co-Founder",
    ],
  },
];

// ─── Admission Rounds (for AdmissionsProcessDeck) ────────────────────────────
export const launchpadAdmissionRounds: AdmissionRound[] = [
  {
    round: "Stage 01",
    title: "Discovery Call with Head of Admissions",
    description:
      "A one-on-one conversation to assess your intent, background, and goals. This is a genuine conversation — not a formal interview. We want to understand where you are and where you want to go.",
  },
  {
    round: "Stage 02",
    title: "Business Case Evaluation",
    description:
      "Work through a detailed case to showcase your problem-solving and strategic thinking. We evaluate how you reason under pressure, not how much you already know — so first principles matter more than prior knowledge.",
  },
  {
    round: "Stage 03",
    title: "Culture Fit Conversation",
    description:
      "Assess your professional mindset, collaboration style, and long-term goals for cohort alignment. The Launchpad is a high-intensity programme — we want to make sure you'll thrive in this environment and contribute to the cohort around you.",
  },
];

// ─── Launchpad Alumni Testimonial Video IDs (YouTube Shorts) ─────────────────
// Shreyancy → MXyLVrW1XAg  |  Gurmehak → Wi5F5VVUazE
export const launchpadAlumniVideoIds: Record<string, string> = {
  Shreyancy: "MXyLVrW1XAg",
  "Gurmehak Aulakh": "Wi5F5VVUazE",
};

// Placeholder images (TODO: replace Shreyancy & Gurmehak when real portraits arrive)
export const launchpadAlumniImages: Record<string, string> = {
  Shreyancy: asset("images/students/Saumya.webp"),       // TODO: real portrait
  "Gurmehak Aulakh": asset("images/students/Sanyu.webp"), // TODO: real portrait
  "Vasu Haria": asset("images/students/Abhinav.webp"),
  Jigisha: asset("images/students/Saumya.webp"),
  Abhik: asset("images/students/Ansh.webp"),
};

// ─── Behind The Chaos — Industry Insights Videos ────────────────────────────
export type InsightVideo = {
  id: string;
  title: string;
  guest: string;
  company: string;
};

export const launchpadInsightVideos: InsightVideo[] = [
  { id: "9QTwfRgTCNg", title: "The Future of B2B Sales in Healthcare by Karan Sethi, Tata 1mg | Behind The Chaos I Hive School", guest: "", company: "" },
  { id: "3a2B3AKexN8", title: "From Intern to LinkedIn Director: Deepak Leekha’s Career Playbook I Behind The Chaos | Hive School", guest: "", company: "" },
  { id: "gG0Pb7c1pHA", title: "Psychology graduate to Senior Sales Manager at Gartner | Behind The Chaos I Hive School", guest: "", company: "" },
  { id: "Yjw7TjCzAC0", title: "From Nanotech to Sales : Vasu Goel on Learning & Building Again I Behind The Chaos | Hive School", guest: "", company: "" },
  { id: "T72mnnRxRl4", title: "Why Women Have an Edge in Sales, VP Customer Success Story I Behind The Chaos I Hive School", guest: "", company: "" },
  { id: "6DXIVy4dU8Q", title: "What it takes to scale a cross-Border startup, Igor Karelin I Behind The Chaos | Hive School", guest: "", company: "" },
  { id: "zM1SOu3vAYc", title: "What It Takes to Hit ₹225 CR in Monthly GMV | Behind The Chaos | Hive School", guest: "", company: "" },
  { id: "tGBID831V8g", title: "From BITS Pilani to Building Finzie, Aryan Trivedi’s Startup Journey I Behind The Chaos I Hive School", guest: "", company: "" },
  { id: "jn9oz4WbB8w", title: "Why I Left SAP to Redefine Work Culture, Shavetta Mehra’s Journey I Behind The Chaos | Hive School", guest: "", company: "" },
];

// ─── Main Course Page Config ─────────────────────────────────────────────────
export const onlinePgpCoursePage: CoursePageConfig = {
  slug: "online-pgp",
  programmeTitle: "Launchpad : B2B, Saas and Tech Sales",
  meta: {
    title: "Launchpad : B2B, Saas and Tech Sales | HiveSchool",
    description:
      "6-month part-time Launchpad with live projects, hands-on mentorship, and a Delhi bootcamp — where every sprint builds toward commercial outcomes.",
  },
  hero: {
    badge: "Online Launchpad",
    location: "Online + Delhi Bootcamp",
    intake: "November 2026",
    title: "Launchpad : B2B,",
    emphasis: "Saas and Tech Sales",
    description:
      "6-month part-time Launchpad with live projects, hands-on mentorship, and a Delhi bootcamp — where every sprint builds toward commercial outcomes. Learn from India's Top 1% in Sales.",
    videoId: "rFZLsmtruzM",
    backgroundVideo: "https://www.youtube.com/watch?v=v_mgwD9wvG4",
    posterVideoId: "v_mgwD9wvG4",
    primaryCta: { label: "Apply Now", href: "/online-pgp#apply" },
    secondaryCta: { label: "Download Placement Report", href: placementReportDownloadPath("year-2") },
    stats: [
      { value: "6", label: "Months duration" },
      { value: "₹14.76L", label: "Average CTC" },
      { value: "₹30L", label: "Highest CTC" },
      { value: "2X", label: "Average Jump" },
    ],
    meta: [
      { label: "Duration", value: "6 Months", hint: "6 months of live challenges, operator sprints, and a built-in placement system." },
      { label: "Commencement", value: "November 2026", hint: "November 2026 intake — online + Delhi bootcamp." },
      { label: "Format", value: "Online", hint: "Online part-time program with a 4-day residential bootcamp in Delhi." },
      { label: "Average Jump", value: "2X", hint: "Average salary jump post-program based on previous cohorts." },
    ],
  },
  campusVideo: {
    videoId: "MnlO5h2Dnkk",
    eyebrow: "The 3-Day Delhi Bootcamp",
    statement: "Experience",
    emphasis: "Our Campus",
    description:
      "72 hours of intensity and collaboration - live with your cohort, learn from mentors, sharpen your capstones, and close it all with a graduation that marks the start of your next chapter.",
  },
  pillars: {
    eyebrow: "Your Portfolio",
    statement: "Built on Real",
    emphasis: "Proof of Work",
    description:
      "Capstone projects equip you with industry-ready skills and leave you with a portfolio of real work that demonstrates your ability to perform from day one.",
    items: [
      {
        index: "01",
        title: "Outbound GTM",
        description:
          "Build 3-step and 7-step outbound cadences across cold email, LinkedIn, and calls. Develop a multi-channel strategy to target your ICP and break through noise. Use AI-driven workflows to optimize responses and scale outreach effectively.",
        projects: [
          { link: "https://bubbly-violet-0ce.notion.site/Outbound-Strategy-Playbook-for-Inka-1f1f1f3b5e76808880f8dda9b24ea22e", image: "/images/portfolio/inka.avif" },
          { link: "https://app.notion.com/p/Outbound-for-Zoho-Marketing-Automation-1f574d8d077d808789f4f63398e112d0", image: "/images/portfolio/zoho.webp" },
          { link: "https://stormy-nurse-954.notion.site/Outbound-for-Vynox-Security-1f976b95cd5580e189e9de1d1b485701", image: "/images/portfolio/vynox.avif" }
        ]
      },
      {
        index: "02",
        title: "GTM Capstone",
        description:
          "Decode a SaaS startup and prepare a full GTM strategy for its target market. Define ICPs, funnel stages, and customer journeys with clear positioning. Measure success using KPIs and revenue-focused metrics.",
        projects: [
          { link: "https://app.notion.com/p/Strategy-For-FreeStand-Sampling-1e376b95cd5580459de6e5d189715070", image: "/images/portfolio/freestand.avif" },
          { link: "https://bubbly-violet-0ce.notion.site/GTM-for-Whatmore-ai-1eaf1f3b5e7680db929aec20e20d9601", image: "/images/portfolio/whatmore.webp" },
          { link: "https://app.notion.com/p/RDash-by-ARR-Mor-1f69f312775e809e83afc943c7b94792", image: "/images/portfolio/rdash.avif" }
        ]
      },
      {
        index: "03",
        title: "Salespreneur Pitch",
        description:
          "A 4-day offline bootcamp in Delhi with your full cohort. Work alongside Team Hive to refine your final pitch and capstone project. Pitch live in front of sales leaders and revenue heads for direct, high-stakes feedback.",
        projects: [
          { link: "https://drive.google.com/file/u/0/d/1oPTmCkTbw5UEu2yNb5IRu2cULEeYw9jo/view?pli=1", image: "/images/portfolio/sales_pitch_1.avif" },
          { link: "https://drive.google.com/file/d/1PaocqUbe5sLhSiHSzwIIF5Ak67Y0p5O2/view", image: "/images/portfolio/sales_pitch_2.avif" },
          { link: "https://pitch.com/v/dodo-payments-capstone-gptvpa", image: "/images/portfolio/dodo_payments.avif" }
        ]
      },
      {
        index: "04",
        title: "Cold Call Battle",
        description:
          "Structure and deliver live cold calls under timed conditions. Apply frameworks like SPIN and MEDDIC to handle objections in real time. Decode the full closing cycle: discovery, demo, follow-up, revenue.",
      },
      {
        index: "05",
        title: "GTM Challenge",
        description:
          "Present your GTM strategy live to industry professionals and a room of peers. Defend your funnel design, channel choices, and resource allocation. Experience the pressure of justifying strategy in a boardroom-style setting.",
        projects: [
          { link: "https://app.notion.com/p/eVitalrx-1e2bea0af998806fa818c494a56d407a", image: "/images/portfolio/evitalrx.avif" },
          { link: "https://app.notion.com/p/Buildvision-Capstone-Project-Report-1e2d2bbc4f0b80dd825ed2d576e2e388?showMoveTo=true&saveParent=true", image: "/images/portfolio/buildvision.avif" }
        ]
      },
    ],
  },
  inlineCtas: [
    {
      id: "fit-check",
      variant: "light",
      eyebrow: "Admissions support",
      title: "Talk to a Counsellor",
      description:
        "Our admissions counsellors are here to provide clarity on the process and answer your questions ensuring every decision you make is well-informed.",
      primary: { label: "Book a call", href: "/online-pgp#apply" },
      secondary: { label: "Download Brochure", href: "/PGP-Offline-Brochure.pdf" },
    },
  ],
  sprints: [
    {
      id: "sprint-1",
      eyebrow: "Sprint 1",
      title: "SaaS from a Founders Lens",
      description: "Build a 360° view of SaaS - from business models and revenue metrics to the 0-1 founder journey and global case studies.",
      imageUrl: "https://pub-760fa3db0e0e491da59597144b40ce1f.r2.dev/images/timeline/month1.webp",
      bullets: [
        { number: "1", text: "SaaS Business & Revenue Models - Understand ARR, MRR, churn, CAC, LTV, retention, and unit economics that drive SaaS growth." },
        { number: "2", text: "0-1 Startup Journey - Follow the founder path from problem discovery to MVP, PMF, GTM, and building competitive moats." },
        { number: "3", text: "Efficiency & Global Perspectives - Learn how investors assess efficiency and analyze SaaS case studies across India and global markets." }
      ]
    },
    {
      id: "sprint-2",
      eyebrow: "Sprint 2",
      title: "Breaking down GTM for B2B SaaS",
      description: "Learn to design and execute SaaS GTM strategies - from ICPs and funnel math to building scalable, multi-channel motions.",
      imageUrl: "https://pub-760fa3db0e0e491da59597144b40ce1f.r2.dev/images/timeline/month2.webp",
      bullets: [
        { number: "1", text: "GTM Frameworks & Funnel Math - Apply AIDA, TOFU-MOFU-BOFU, and buyer journey models to map acquisition and conversion." },
        { number: "2", text: "Comparing GTM Motions - Evaluate inbound, outbound, and PLG with CAC/LTV trade-offs, ROI, and scaling limits." },
        { number: "3", text: "Blueprinting & Case Studies - Build GTM strategies from founder problem statements: define ICPs, craft positioning, and set KPIs/OKRs." }
      ]
    },
    {
      id: "sprint-3",
      eyebrow: "Sprint 3",
      title: "Demand Generation",
      description: "Master modern B2B demand generation - from outbound channels to live sales conversations and SaaS prospecting tools.",
      imageUrl: "https://pub-760fa3db0e0e491da59597144b40ce1f.r2.dev/images/timeline/month3.webp",
      bullets: [
        { number: "1", text: "Outbound Systems - Cold email frameworks, AI-driven sequencing, and structured follow-ups that convert." },
        { number: "2", text: "Live Sales Practice - Cold calling, objection handling, and mock call drills simulating SDR workflows." },
        { number: "3", text: "Multi-Channel Prospecting - LinkedIn optimisation, social selling, video/voice notes, and advanced Sales Navigator hacks." }
      ]
    },
    {
      id: "sprint-4",
      eyebrow: "Sprint 4",
      title: "AI and tech in SaaS",
      description: "Leverage AI and sales tech to build efficient, scalable, and personalized workflows for B2B SaaS.",
      imageUrl: "https://pub-760fa3db0e0e491da59597144b40ce1f.r2.dev/images/timeline/month4.webp",
      bullets: [
        { number: "1", text: "AI for Outreach - Draft emails, automate sequences, and personalize outreach at scale." },
        { number: "2", text: "Personal Tech Stack - Integrate tools like Sales Navigator, Apollo, Gong, and CRMs into one workflow." },
        { number: "3", text: "Sales Intelligence - Use AI for prospect research, call prep, sentiment analysis, and forecasting." }
      ]
    },
    {
      id: "sprint-5",
      eyebrow: "Sprint 5",
      title: "Closing in the GTM Function",
      description: "Sharpen Account Executive skills - from managing pipelines to negotiating deals and closing revenue.",
      imageUrl: "https://pub-760fa3db0e0e491da59597144b40ce1f.r2.dev/images/timeline/month5.webp",
      bullets: [
        { number: "1", text: "Pipeline & Deal Management - Qualify opportunities, run discovery, and move prospects through multi-stage pipelines." },
        { number: "2", text: "Negotiation & Objection Handling - Apply pricing frameworks, handle objections, and lead enterprise-level discussions." },
        { number: "3", text: "Closing Playbooks - Secure commitments, build stakeholder consensus, and manage smooth handoffs." }
      ]
    }
  ],
  fees: {
    eyebrow: "Investment",
    statement: "Fee",
    emphasis: "structure",
    badge: "Launchpad",
    intake: "November 2026",
    description:
      "The program fee can be paid upfront or through flexible EMI options, starting at ~₹10,000/month via NBFC partners. This ensures affordability without compromising quality.",
    lines: [
      { label: "Admission Fee", amount: "₹40,000" },
      { label: "Tuition Fee", amount: "₹1,10,000" },
      { label: "Total Fee", amount: "₹1,50,000" },
      { label: "GST", amount: "₹27,000" },
      { label: "Total Fee + GST", amount: "₹1,77,000", highlight: true },
    ],
    scholarships: [
      { title: "Women in Revenue Scholarship", description: "For women aspiring to build careers in sales." },
      { title: "Opportunity Scholarship", description: "For students requiring financial support." },
      { title: "Excellence Scholarship", description: "For exceptional admissions performance." },
    ],
    note: "Only one scholarship can be applied per candidate. These scholarships are competitive and awarded after careful evaluation.",
  },
  faqs: {
    eyebrow: "FAQs",
    statement: "Frequently Asked",
    emphasis: "Questions",
    description: "Everything you need to know about the Launchpad program.",
    items: [
      {
        question: "What is Launchpad?",
        answer:
          "Launchpad is a 6-month part-time program with live projects, hands-on mentorship, and a Delhi bootcamp — where every sprint builds toward commercial outcomes in B2B, SaaS and Tech Sales.",
      },
      {
        question: "Who is the Launchpad program for?",
        answer:
          "The program is designed for aspiring sales professionals who want to break into B2B SaaS and Tech sales, learning from India's Top 1% in the industry.",
      },
      {
        question: "Is this a full-time program?",
        answer:
          "No, this is a flexible, online 6-month part-time format designed to accommodate working professionals or full-time students, culminating in a 4-day offline residential bootcamp in Delhi.",
      },
      {
        question: "What are the fees and EMI options?",
        answer:
          "Total fee including GST is ₹1,77,000. EMI options start at ~₹10,000/month via NBFC partners. Scholarships are available for women in revenue, opportunity candidates, and high performers.",
      },
      {
        question: "What outcomes can I expect?",
        answer:
          "Average CTC of ₹14.76 LPA, highest of ₹30 LPA. Roles include BDR/SDR, Founding BDR, Account Executive, and Sales Leadership tracks at SaaS and tech companies.",
      },
      {
        question: "How does the Delhi Bootcamp work?",
        answer:
          "The 4-day residential bootcamp in Delhi brings the entire cohort together offline. You'll work alongside Team Hive to refine your capstone, then pitch live in front of sales leaders and revenue heads.",
      },
    ],
  },
  applicationForm: {
    title: "Launchpad Application Form",
    headline: "Launchpad application",
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

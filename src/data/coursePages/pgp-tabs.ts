import { asset, cdnAsset } from "@/lib/assets";
import { placementReportDownloadPath } from "@/data/placementReportAccess";

export type ProgramTabHeroContent = {
  eyebrow: string;
  statement: string;
  emphasis: string;
  description: string;
  stats?: { value: string; label: string }[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type CurriculumTrack = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  pathLabel: string;
  roles: string;
  tags: string[];
  accent: "blue" | "gold" | "violet";
};

export type ToolCategory = {
  title: string;
  image?: string;
  items: string[];
};

export type PlacementSystemPillar = {
  index: string;
  title: string;
  description: string;
};

export type AdmissionRound = {
  round: string;
  title: string;
  description: string;
};

export type AdmissionEvaluator = {
  title: string;
  description: string;
  icon: string;
};

export type AlumniQuote = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export type CareerPathwayGroup = {
  title: string;
  roles: string[];
};

export type PortfolioDeliverable = {
  index: string;
  title: string;
  description: string;
};

export type NewsArticle = {
  outlet: string;
  title: string;
  date: string;
  image: string;
  href: string;
};

export type AdmissionDeadline = {
  round: string;
  label: string;
  date: string;
  status: "active" | "upcoming";
};

export type ScholarshipCard = {
  title: string;
  description: string;
  icon: string;
};

export const pgpTabHero: Record<"curriculum" | "placements" | "admissions", ProgramTabHeroContent> = {
  curriculum: {
    eyebrow: "Post Graduate Programme · Curriculum",
    statement: "Revenue, AI & entrepreneurship —",
    emphasis: "built for operators.",
    description:
      "Three business models. Live challenges with practitioners from Zomato, Google, Adobe, and more. A 9-month residential programme designed for revenue leaders, growth operators, and founders.",
    stats: [
      { value: "09", label: "Months residential" },
      { value: "3", label: "Business model tracks" },
      { value: "25+", label: "Intensive sprints" },
      { value: "100+", label: "Practitioner faculty" },
    ],
    primaryCta: { label: "Apply now", href: "/pgp-revenue-tech-entrepreneurship#apply" },
    secondaryCta: { label: "Download brochure", href: "/4-Month-Roadmap-Brand-x-Revenue.pdf" },
  },
  placements: {
    eyebrow: "Post Graduate Programme · Placements",
    statement: "Revenue, growth & entrepreneurship roles —",
    emphasis: "that's the goal.",
    description:
      "100+ hiring partners. Man-to-man career tracking. The placement infrastructure behind ₹16.47L average CTC and ₹27.8L highest offers for PGP fellows in Gurugram.",
    stats: [
      { value: "₹16.47L", label: "Average CTC" },
      { value: "₹27.8L", label: "Highest CTC" },
      { value: "100+", label: "Hiring partners" },
      { value: "1:1", label: "Man-to-man tracking" },
    ],
    primaryCta: { label: "Apply now", href: "/pgp-revenue-tech-entrepreneurship#apply" },
    secondaryCta: { label: "Download placements report", href: placementReportDownloadPath("year-2") },
  },
  admissions: {
    eyebrow: "Post Graduate Programme · Admissions",
    statement: "PGP in Revenue, AI & Entrepreneurship ·",
    emphasis: "October 2026 · Gurugram",
    description:
      "We evaluate candidates through conversations and case discussions. We're looking for people with the drive to build in revenue and growth, the clarity to communicate, and the hunger to lead.",
    stats: [
      { value: "3–5 weeks", label: "Process duration" },
      { value: "<7%", label: "Acceptance rate" },
      { value: "0–4 years", label: "Experience welcome" },
      { value: "No fee", label: "Application fee" },
    ],
    primaryCta: { label: "Start your application", href: "#apply" },
    secondaryCta: { label: "How we evaluate", href: "#selection" },
  },
};

export const pgpTracksIntro =
  "Every business sells to consumers, sells to businesses, or builds something new. The HiveSchool curriculum trains you across all three — then takes you deep into the one you'll specialise in.";

export const pgpMentorsIntro =
  "Every module is led by a founder, CXO, or senior practitioner from a leading Indian company — selected for depth of experience in the specific discipline being taught.";

export const pgpCurriculumTracks: CurriculumTrack[] = [
  {
    id: "tech",
    index: "01",
    title: "Tech & AI Track",
    subtitle: "For B2B SaaS & tech companies",
    pathLabel: "Sell to businesses",
    roles: "US BDR · Account Executive · GTM & AI · RevOps · Founder's Office · CSM",
    tags: ["B2B Sales", "Revenue Operations", "AI Tools"],
    accent: "blue",
  },
  {
    id: "consumer",
    index: "02",
    title: "Consumer Track",
    subtitle: "For D2C, FMCG & consumer brands",
    pathLabel: "Sell to consumers",
    roles: "Brand Manager · Category Manager · Performance Marketer · E-commerce Lead",
    tags: ["Growth Marketing", "Brand Management", "E-commerce"],
    accent: "gold",
  },
  {
    id: "founder",
    index: "03",
    title: "Founder Track",
    subtitle: "For building your own startup",
    pathLabel: "Build something new",
    roles: "Founder's Office · Co-Founder · Head of Growth · Startup Operator",
    tags: ["Problem Validation", "MVP Building", "Go-To-Market"],
    accent: "violet",
  },
];

export const pgpToolStackIntro =
  "Every challenge is a live business problem from a real company. You work with founders and CXOs. Your output goes into your portfolio. Foundation tools, plus the AI-native layer.";

export const pgpToolStack: ToolCategory[] = [
  {
    title: "Foundation 1 · GTM & Sales",
    image: "images/tech/tech-stack-1.png",
    items: ["HubSpot", "Salesforce", "Apollo", "Clay", "Gong", "LinkedIn Sales Navigator"],
  },
  {
    title: "Foundation 2 · Marketing & Brand",
    image: "images/tech/tech-stack-2.png",
    items: ["Meta Ads", "Google Ads", "Figma", "Canva", "Shopify", "Google Analytics 4"],
  },
  {
    title: "Foundation 3 · AI & Automation",
    image: "images/tech/tech-stack-3.png",
    items: ["ChatGPT", "Claude", "Zapier", "Make", "Notion AI", "Perplexity"],
  },
];

export const pgpPlacementSystemIntro =
  "Your progress is tracked weekly. We call it man-to-man marking — every student has a mentor and a placement team member personally accountable for their outcome.";

export const pgpPlacementSystem: PlacementSystemPillar[] = [
  {
    index: "01",
    title: "North Star Metric",
    description: "Target role, company tier, CTC — defined on Day 1 and tracked every week.",
  },
  {
    index: "02",
    title: "Mentor + Placement Lead",
    description: "Both are jointly accountable for your outcome. No hand-offs.",
  },
  {
    index: "03",
    title: "Weekly Reviews",
    description: "Sprint performance, challenge outputs, interview readiness — all tracked.",
  },
  {
    index: "04",
    title: "35 Prep Sessions",
    description: "Cases, guesstimates, mocks, salary negotiation — from Month 1.",
  },
];

export const pgpPortfolioDeliverables: PortfolioDeliverable[] = [
  {
    index: "01",
    title: "Brand Playbook for a Real Startup",
    description:
      "Positioning, competitive landscape, content calendar, communication strategy — built for a live brand, presented to the founder.",
  },
  {
    index: "02",
    title: "Personal Brand Page (Instagram)",
    description:
      "Build and grow a real Instagram page from scratch. Track engagement, follower growth, virality. Your content portfolio.",
  },
  {
    index: "03",
    title: "Performance Marketing Campaign — E2E",
    description:
      "Pixel setup → GA4 → campaign strategy → ad execution → ROAS tracking. Real budget, real metrics, real results.",
  },
  {
    index: "04",
    title: "E-Commerce Listing Audit",
    description:
      "Audit and optimise listings across Amazon, Flipkart, Myntra. Copy, images, SEO, ads — with measured performance improvement.",
  },
  {
    index: "05",
    title: "Quick-Commerce Visibility Sprint",
    description:
      "Maximise visibility on Blinkit/Zepto in one week. Listing, banners, promotions — all tracked with real data and dashboards.",
  },
];

export const pgpCareerPathways: CareerPathwayGroup[] = [
  {
    title: "SaaS & Tech",
    roles: [
      "BDR / SDR",
      "Account Executive",
      "Customer Success Manager",
      "RevOps Associate",
      "GTM Associate",
      "Sales Development Lead",
    ],
  },
  {
    title: "Consumer & D2C",
    roles: [
      "Brand Manager",
      "Category Manager",
      "Marketplace Manager",
      "Content & Growth Manager",
      "Retail Expansion",
      "Performance Marketing",
    ],
  },
  {
    title: "Founder & Leadership",
    roles: [
      "Founder / Co-Founder",
      "Chief of Staff",
      "CSM / Account Manager",
      "Founder's Office",
      "0→1 Product Builder",
    ],
  },
];

export const pgpAlumniQuotes: AlumniQuote[] = [
  {
    name: "Deepanshu",
    role: "Enterprise Sales Manager",
    company: "MyGate",
    quote:
      "The culture at Hive is intense but never lonely. You're competing and collaborating with the same people. That energy carries into how you work after you graduate.",
  },
  {
    name: "Tanishq",
    role: "Account Manager",
    company: "Kaseya",
    quote:
      "What surprised me most was how personalised everything was. My career coach knew my target companies better than I did. The prep felt like it was built just for me.",
  },
  {
    name: "Harsh",
    role: "Founder's Office — Program Manager",
    company: "Vetic",
    quote:
      "Nine months ago I didn't know what a founder's office role looked like. The challenges here — real brands, real problems, real stakes — showed me exactly what the job demands.",
  },
  {
    name: "Sanyu",
    role: "Business Development Representative",
    company: "Adobe",
    quote:
      "Adhish's communication sessions and the accent training gave me the confidence to handle US-facing conversations. I use those frameworks in every client call now.",
  },
  {
    name: "Soumya",
    role: "Customer Success Manager",
    company: "Yatra",
    quote:
      "I came from a non-business background and was nervous about keeping up. The cohort and the Hive team made sure nobody fell behind. That support system is real.",
  },
  {
    name: "Hritik",
    role: "Founder's Office — Growth & Strategy",
    company: "Space Basic",
    quote:
      "HiveSchool taught me how to think about growth as a system, not a series of hacks. The founder's track gave me the confidence to operate at a strategic level from Day 1.",
  },
  {
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    quote:
      "The placement team didn't just find me a role. They sat with me every week, fixed my pitch, prepped me for specific companies. That level of involvement is rare.",
  },
  {
    name: "Aryan Suri",
    role: "Business Development Representative",
    company: "Payoneer",
    quote:
      "Small batch, tight cohort. You can't hide here. That pressure — to show up every day and do the work — is what made me ready.",
  },
  {
    name: "Soham Chatterjee",
    role: "Founder's Office — Growth",
    company: "Dohful",
    quote:
      "I worked on the Dohful challenge during the programme. Three months later, I was working at Dohful. Sometimes the challenge is the interview.",
  },
  {
    name: "Abhinav Srivastava",
    role: "Business Development Executive",
    company: "Culture Circle",
    quote:
      "The mentors here don't teach from slides. Saurabh's selling sessions and Prabhu's GTM frameworks are things I use at work every single day.",
  },
  {
    name: "Ansh Agrawal",
    role: "GTM Manager — US, APAC",
    company: "Payoneer",
    quote:
      "The outbound sprint changed how I think about selling. I walked into my interviews with a real pipeline I'd built — not a case study I'd memorised. That made all the difference.",
  },
];

export const pgpPlacementNews: NewsArticle[] = [
  {
    outlet: "Placement Report",
    title: "Year 2 PGP · ₹16.47L average · ₹27.8L highest",
    date: "2025–26",
    image: cdnAsset("images/placement-reports/year-2-pdf-cover.jpg"),
    href: placementReportDownloadPath("year-2"),
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
  {
    outlet: "Tribune India",
    title: "HiveSchool's Annual Placements surpasses many Mini IIMs & Tier-2 MBAs in India",
    date: "June 14, 2025",
    image: cdnAsset("images/news/tribune-india.jpg"),
    href: "https://www.tribuneindia.com/news/business/hiveschools-annual-placements-surpasses-many-mini-iims-tier-2-mbas-in-india/",
  },
  {
    outlet: "Dailyhunt",
    title: "HiveSchool's Annual Placements surpasses many Mini IIMs & Tier-2 MBAs in India",
    date: "June 12, 2025",
    image: cdnAsset("images/news/dailyhunt.jpg"),
    href: "https://m.dailyhunt.in/news/india/english/sangri+today-epaper-dhca0872bf801748bd9f43791084210e94/hiveschools+annual+placements+surpasses+many+mini+iims+tier2+mbas+in+india-newsid-dhca0872bf801748bd9f43791084210e94_ddf45ab06eda11f0bfd6d3ae60ce180d?sm=Y",
  },
  {
    outlet: "Times of India",
    title:
      "Shark Tank India 4: Vineeta Singh recalls the time she would do sales by calling people up",
    date: "May 30, 2025",
    image: cdnAsset("images/news/times-of-india.jpg"),
    href: "https://timesofindia.indiatimes.com/tv/news/hindi/shark-tank-india-4-vineeta-singh-recalls-the-time-she-would-do-sales-by-calling-people-up-says-would-get-insulted-people-would-hang-up-calls/articleshow/118903299.cms",
  },
];

export const pgpAdmissionsIntro = {
  eyebrow: "Admissions · October 2026",
  statement: "How we decide",
  emphasis: "who gets in.",
  description:
    "Speak with the admissions team for a personal profile review and an honest read on whether you'll fit the cohort.",
  videoId: "U-l2PPDhfCM",
  stats: [
    { value: "<7%", label: "Acceptance" },
    { value: "50", label: "Handpicked cohort", highlight: true },
    { value: "9 months", label: "Duration" },
    { value: "May 15, '26", label: "Round 1 closes" },
  ],
};

export const pgpAdmissionDecisionIntro =
  "Every admission is reviewed by four committees — each grading candidates independently across our four evaluation pillars. The combined scoring carries an internal cut-off. Candidates who cross it receive an offer. Across our application history, fewer than 5% of applicants make it through.";

export const pgpAdmissionRounds: AdmissionRound[] = [
  {
    round: "Round 01",
    title: "Application & profile review",
    description:
      "Your background, intent, and fit for revenue roles. We look for clarity, ambition, and evidence of doing — not just grades.",
  },
  {
    round: "Round 02",
    title: "Case & business discussion",
    description:
      "Analytical depth, business reasoning, and how you think under pressure — assessed by senior faculty and curriculum leads.",
  },
  {
    round: "Round 03",
    title: "Leadership conversation",
    description:
      "Intent, character, and long-term fit — with co-founders and senior leadership. Hireability and coachability matter here.",
  },
];

export const pgpAdmissionEvaluators: AdmissionEvaluator[] = [
  {
    title: "Placements Team",
    icon: "svgs/evaluate-icon-1.svg",
    description:
      "Brings the lens of the companies our graduates go on to join — assessing whether a candidate is hireable, coachable, and ready for the roles ahead.",
  },
  {
    title: "Academic Committee",
    icon: "svgs/evaluate-icon-2.svg",
    description:
      "Senior faculty and curriculum leads — assessing analytical depth, business reasoning, and the candidate's ability to keep up with a demanding programme.",
  },
  {
    title: "Programme Team",
    icon: "svgs/evaluate-icon-3.svg",
    description:
      "The team that runs the cohort day-to-day — assessing professional maturity, self-awareness, and the kind of presence a candidate would bring into the room.",
  },
  {
    title: "Founding Team",
    icon: "svgs/evaluate-icon-4.svg",
    description:
      "Co-founders and senior leadership — assessing intent, character, and long-term fit with the kind of institution HiveSchool is being built to be.",
  },
];

export const pgpAdmissionDeadlines: AdmissionDeadline[] = [
  { round: "01", label: "Round 1 deadline", date: "May 15, '26", status: "upcoming" },
  { round: "02", label: "Round 2 deadline", date: "June 30, '26", status: "active" },
  { round: "03", label: "Round 3 deadline", date: "August 15, '26", status: "upcoming" },
];

export const pgpScholarships: ScholarshipCard[] = [
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
    title: "Startup Scholarship",
    icon: "svgs/scholarship-icon-3.svg",
    description:
      "If you're already building something — a product, a side project, a venture — and can show traction or intent, this one's for you.",
  },
];

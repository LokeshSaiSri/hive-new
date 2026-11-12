/**
 * Content for the revamped PGP overview page (cohort 3).
 * Source: the "PGP page, revamped" design mockup. Anything the mockup left as a
 * [placeholder] is modelled as optional here and the section hides it until filled.
 */

/* ── Curriculum · core function 1: business models ───────────────────────── */

export type BusinessModelGroup = "B2B" | "Consumer" | "Platforms";

export type BusinessModel = {
  index: string;
  group: BusinessModelGroup;
  title: string;
  /** Real companies taught through this model. Empty until case studies are confirmed. */
  companies: string;
  /** What the model teaches. */
  focus: string;
  /** Overrides the default "5 sessions" when the model is shorter. */
  sessions?: number;
  /** Case studies still to be confirmed by the programme team. */
  pending?: boolean;
};

export const pgpModelSessionsDefault = 5;

export const pgpBusinessModels: BusinessModel[] = [
  {
    index: "01",
    group: "B2B",
    title: "B2B SaaS, services and AI SaaS",
    companies: "SaaS and AI-led service companies, pure agencies, CXO consulting firms such as Gartner",
    focus: "How software and services are sold, expanded and renewed.",
  },
  {
    index: "02",
    group: "B2B",
    title: "Cybersecurity",
    companies: "",
    focus: "How security is bought and sold, and why it sells differently from SaaS.",
    sessions: 3,
    pending: true,
  },
  {
    index: "03",
    group: "B2B",
    title: "Cloud solutions and public cloud",
    companies: "",
    focus: "Consumption pricing, partners and the hyperscalers.",
    sessions: 2,
    pending: true,
  },
  {
    index: "04",
    group: "Consumer",
    title: "FMCG, general trade and modern trade",
    companies: "Epigamia, Nestlé, Patanjali",
    focus: "Distribution, the ASM function, trade margins and why the kirana still decides.",
  },
  {
    index: "05",
    group: "Consumer",
    title: "D2C on marketplaces",
    companies: "Fix My Curls, Snitch, Tata 1mg, Protein Pantry, Noise",
    focus: "Quick commerce, e-commerce and own website. Five categories, five different models.",
  },
  {
    index: "06",
    group: "Consumer",
    title: "QSR and cloud kitchens",
    companies: "Lexis, Dohful",
    focus: "Store economics, kitchen throughput, delivery platforms.",
  },
  {
    index: "07",
    group: "Platforms",
    title: "Quick commerce",
    companies: "Blinkit, Zepto, Swiggy Instamart, Flipkart Minutes",
    focus: "Dark stores, take rates, ads.",
  },
  {
    index: "08",
    group: "Platforms",
    title: "E-commerce",
    companies: "Amazon, Flipkart, Myntra",
    focus: "Marketplace economics from both sides of the table.",
  },
  {
    index: "09",
    group: "Platforms",
    title: "Entertainment tech",
    companies: "District, BookMyShow",
    focus: "Ticketing, events and the attention economy.",
    sessions: 2,
  },
  {
    index: "10",
    group: "Consumer",
    title: "Consumer services",
    companies: "Apollo, Cult.fit, Vetic",
    focus: "Utilisation, memberships, the centre as the unit of growth.",
  },
  {
    index: "11",
    group: "Consumer",
    title: "Consumer tech, digital only",
    companies: "Practo, Astrotalk, matrimony and dating apps",
    focus: "Subscriptions, lead-gen and retention.",
  },
  {
    index: "12",
    group: "Consumer",
    title: "Consumer tech, digital plus service",
    companies: "Zomato, Urban Company, Snabbit, Ola, Uber",
    focus: "Take rates, supply, contribution margin per order.",
  },
];

/* ── Underneath the twelve: eight revenue engines ────────────────────────── */

export type RevenueEngine = {
  name: string;
  metric: string;
  runsOn: string;
};

export const pgpRevenueEngines: RevenueEngine[] = [
  {
    name: "Subscription, recurring",
    metric: "NRR, CAC payback, Rule of 40",
    runsOn: "SaaS companies, Cult.fit, Practo Prime",
  },
  {
    name: "Transaction, take rate",
    metric: "GMV x take rate, contribution margin per order",
    runsOn: "Zomato, Swiggy, Uber, Ola, Urban Company, Snabbit, marketplaces",
  },
  {
    name: "Inventory, retail margin",
    metric: "Gross margin, sell-through, inventory turns, revenue per sq ft",
    runsOn: "Snitch, Noise, Fix My Curls, Protein Pantry, FMCG",
  },
  {
    name: "Advertising, attention",
    metric: "CPM, ACoS, fill rate",
    runsOn: "Amazon Ads, Flipkart Ads, Zomato Ads, Blinkit Ads, Zepto Ads",
  },
  {
    name: "Float, spread",
    metric: "Cost of funds, NIM, AUM",
    runsOn: "Zerodha, banks, insurers, BNPL",
  },
  {
    name: "Services, utilisation",
    metric: "Billable utilisation, realisation, bench cost",
    runsOn: "Agencies, Gartner, IT services, AI-led service companies",
  },
  {
    name: "Lead-gen, commission",
    metric: "CPL, conversion, payout",
    runsOn: "Policybazaar, Shaadi.com, brokers",
  },
  {
    name: "Franchise, asset-light",
    metric: "Royalty, capex per store, payback months",
    runsOn: "QSR chains, Snitch offline, Bata",
  },
];

/* ── Curriculum · core function 2: sprints ───────────────────────────────── */

export type SprintItem = {
  title: string;
  sessions?: number;
};

export type SprintGroup = {
  label: string;
  tone: "core" | "elective";
  items: SprintItem[];
};

export type Sprint = {
  id: string;
  title: string;
  /** One line on what the sprint produces. */
  tagline: string;
  groups: SprintGroup[];
  /** Callout shown under the groups. */
  note?: { heading: string; body: string };
};

export const pgpSprints: Sprint[] = [
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Growth, brand and platforms for D2C, consumer tech, consumer services and B2B",
    groups: [
      {
        label: "Core",
        tone: "core",
        items: [
          { title: "Brand, organic, growth and product marketing for D2C", sessions: 15 },
          { title: "The same, for consumer tech and consumer services" },
          { title: "ABM, growth and demand gen in B2B SaaS and services", sessions: 3 },
          { title: "Building and decoding marketing funnels across industries", sessions: 3 },
          { title: "UGC and content-led GTM: which content IP, which platform, why", sessions: 3 },
        ],
      },
      {
        label: "Electives: platform and digital first",
        tone: "elective",
        items: [
          { title: "Paid media: Meta, Google and YouTube ads", sessions: 15 },
          { title: "SEO and AEO" },
          { title: "Programmatic ads" },
          { title: "Media planning" },
          { title: "Quick commerce growth: Blinkit, Zepto, Instamart", sessions: 15 },
          { title: "E-commerce growth: Amazon, Flipkart, Myntra, Meesho" },
        ],
      },
      {
        label: "Electives: offline and retail first",
        tone: "elective",
        items: [
          { title: "Brand building and marketing", sessions: 10 },
          { title: "Retail and offline marketplace distribution and growth" },
          { title: "The ASM function in FMCG", sessions: 5 },
        ],
      },
    ],
  },
  {
    id: "sales",
    title: "Sales",
    tagline: "Indian market selling and US outbound, reviewed in class, call by call",
    groups: [
      {
        label: "Core",
        tone: "core",
        items: [
          { title: "Indian market selling", sessions: 15 },
          { title: "Outbound fundamentals: cold calls, emails, LinkedIn", sessions: 10 },
          { title: "Unconventional outbound for the US market", sessions: 5 },
          { title: "In-class reviews of your emails, LinkedIn messages and cold calls", sessions: 10 },
          { title: "Art of communication: accent and MTI when selling globally", sessions: 5 },
        ],
      },
      {
        label: "Electives",
        tone: "elective",
        items: [
          { title: "Selling cybersecurity vs typical SaaS: real outbound that booked meetings", sessions: 2 },
          { title: "Selling cloud vs SaaS vs cybersecurity", sessions: 2 },
          { title: "Closing in SaaS, cybersecurity and cloud", sessions: 5 },
        ],
      },
    ],
    note: {
      heading: "How it is assessed",
      body: "Your actual emails, messages and calls, reviewed live in class. Meetings booked count. Sell on Streets and Salespreneur are the exams.",
    },
  },
  {
    id: "ai",
    title: "AI",
    tagline: "Build the AI stack a revenue team runs on, from an AI SDR to your own CRM",
    groups: [
      {
        label: "Core · 25 sessions",
        tone: "core",
        items: [
          { title: "Understanding LLMs: Claude, GPT and the rest", sessions: 10 },
          { title: "AI in sales processes: building an AI SDR" },
          { title: "AI in marketing: tools, use cases, and in-house builds" },
          { title: "The RevOps stack", sessions: 5 },
          { title: "The solutions consultant stack", sessions: 5 },
          { title: "Building AI use cases from scratch, your own CRM included", sessions: 5 },
        ],
      },
    ],
    note: {
      heading: "Why it is core, not an elective",
      body: "Every sprint and every challenge is AI-first. The tools are used on the live briefs, not shown in a demo. By month four you have shipped working AI workflows for real companies.",
    },
  },
  {
    id: "finance",
    title: "Finance, product, ops",
    tagline: "Read a P&L, ship a product, run a supply chain, understand what a VC sees",
    groups: [
      { label: "Core", tone: "core", items: [{ title: "Finance and P&L", sessions: 5 }] },
      {
        label: "Electives",
        tone: "elective",
        items: [
          { title: "Product management sprint", sessions: 5 },
          { title: "Operations, supply chain, demand and inventory, with the tools", sessions: 5 },
          { title: "Venture capital", sessions: 5 },
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Data and tools",
    tagline: "Excel, SQL, Tableau and Power BI, on the companies' own numbers",
    groups: [
      {
        label: "Core · 20 sessions",
        tone: "core",
        items: [
          { title: "Data and advanced Excel fundamentals" },
          { title: "SQL fundamentals" },
          { title: "Tableau fundamentals" },
          { title: "Power BI fundamentals" },
        ],
      },
    ],
    note: {
      heading: "What you build",
      body: "A dashboard for every business model you study, and the one you present at Salespreneur and D2C Bazaar.",
    },
  },
  {
    id: "placement",
    title: "Placement practicum",
    tagline: "Turn nine months of work into offers, taught by the founders",
    groups: [
      {
        label: "Core · 15 sessions",
        tone: "core",
        items: [
          { title: "Building the ideal CV" },
          { title: "Reading a JD and its KRAs, and customising your portfolio to it" },
          { title: "Framing and selling your story, then customising it to the role" },
          { title: "Solving consulting cases" },
          { title: "Cracking off-campus interviews" },
        ],
      },
    ],
    note: {
      heading: "From month five",
      body: "Mock interviews with hiring partners, weekly career marking, and a portfolio review before every application.",
    },
  },
];

export const pgpCurriculumStats = [
  { value: "164", label: "Core sessions" },
  { value: "64", label: "Elective sessions" },
  { value: "228", label: "Learning sessions in total", highlight: true },
  { value: "12 + 6", label: "Business models + sprint functions" },
];

export const pgpCurriculumCopy = {
  eyebrow: "Curriculum, cohort 3",
  statement: "Learn how twelve business models make money.",
  emphasis: "Then run the functions that move their numbers.",
  problem:
    "Subjects are taught as if every company were the same. Two companies in the same industry can share nothing, and two in different industries can be identical: Zerodha and Policybazaar are both fintech and have nothing in common. Amazon Ads, Zomato Ads and Blinkit Ads are the same engine sitting in three different industries.",
  solution:
    "The curriculum has two core functions. Business models: twelve industries, each taught through its real companies and the engine underneath. Sprints: the marketing, sales, AI, finance and data work those companies hire for, done on live briefs.",
};

/* ── Roles ───────────────────────────────────────────────────────────────── */

export type RoleTrackId = "growth" | "category" | "sales" | "founder";

export type Role = { title: string; context: string; pending?: boolean };

export type RoleTrack = {
  id: RoleTrackId;
  index: string;
  title: string;
  blurb: string;
  roles: Role[];
};

export const pgpRoleTracks: RoleTrack[] = [
  {
    id: "growth",
    index: "01",
    title: "Growth and marketing",
    blurb: "Brand side. Prepared by the marketing sprints and the consumer business models.",
    roles: [
      { title: "Growth Manager, Head of Growth", context: "Consumer tech, D2C" },
      { title: "Performance Marketing Manager", context: "Consumer tech, D2C" },
      { title: "Brand Manager", context: "Any industry" },
      { title: "Product Marketing Manager", context: "Consumer tech, B2B SaaS" },
      { title: "Retention or CRM Manager", context: "Any industry" },
      { title: "SEO and Content Lead", context: "Any industry" },
      { title: "Media Planner, Agency Lead", context: "Agencies, brands" },
      { title: "Marketing Operations Manager", context: "Any industry" },
      { title: "Marketing or Growth Analyst", context: "Any industry" },
      { title: "Consumer Insights, Market Research", context: "Any industry" },
    ],
  },
  {
    id: "category",
    index: "02",
    title: "Category and commerce",
    blurb: "Both sides of the platform. Prepared by the quick commerce, e-commerce and D2C models and electives.",
    roles: [
      { title: "D2C or eCommerce Manager", context: "D2C" },
      { title: "Category Manager, brand side", context: "Consumer brands" },
      { title: "Category Manager, platform side", context: "Marketplaces, quick commerce" },
      { title: "Key Account Manager", context: "D2C, FMCG" },
      { title: "Pricing and Revenue Manager", context: "D2C, consumer tech" },
      { title: "Supply Chain or Demand Planner", context: "D2C, consumer tech" },
      { title: "Retail and Offline Expansion Manager", context: "D2C, QSR" },
      { title: "Trade Marketing, Channel Sales", context: "FMCG" },
    ],
  },
  {
    id: "sales",
    index: "03",
    title: "Sales and revenue",
    blurb: "The roles with a quota, for India and the US. Prepared by the sales and AI sprints and the B2B models.",
    roles: [
      { title: "BDR, US market", context: "B2B SaaS, services, AI" },
      { title: "Account Executive, US market", context: "B2B SaaS, services, AI" },
      { title: "Customer Success or Account Manager", context: "US B2B, Indian market" },
      { title: "Cybersecurity sales", context: "B2B cybersecurity" },
      { title: "Solutions consulting, pre-sales", context: "B2B SaaS" },
      { title: "Revenue or GTM operations associate", context: "B2B SaaS" },
      { title: "Management trainee to Assistant Sales Manager", context: "FMCG" },
      { title: "Enterprise sales, BDM", context: "Indian market, any industry" },
    ],
  },
  {
    id: "founder",
    index: "04",
    title: "Founder's office, strategy and P&L",
    blurb: "Closest to the founder, and the route to founding. Prepared by all twelve business models and the finance sprint.",
    roles: [
      { title: "Founder's Office, Chief of Staff", context: "GTM, category, generalist" },
      { title: "Strategy and Consulting", context: "Any industry" },
      { title: "Business Unit or P&L Head", context: "Any industry" },
      { title: "Product Manager, growth", context: "Consumer tech, D2C" },
      { title: "Consumer VC or PE Analyst", context: "Venture funds" },
      { title: "Entrepreneur in residence", context: "Own venture", pending: true },
    ],
  },
];

export const pgpRolesCopy = {
  eyebrow: "Roles we prepare you for",
  statement: "Split of roles:",
  emphasis: "consumer, and beyond.",
  description:
    "Thirty-two roles across four tracks. You pick yours by month three, and your electives, capstones and placement practicum are built around it.",
  footnote:
    "Target pay bands by track will be published with the cohort 3 placement policy. Every outcome is reported with role, company and fixed pay, variable pay separate.",
};

/* ── Flagship challenges ─────────────────────────────────────────────────── */

export type FlagshipChallenge = {
  id: "salespreneur" | "d2c-bazaar" | "sell-on-streets";
  index: string;
  kind: string;
  name: string;
  tagline: string;
  description: string;
  judgedBy: string;
  scoreboard: string;
  youLeaveWith: string;
  /** Shown only once real numbers exist. */
  stats?: { label: string; value: string }[];
  /** Hidden until the programme team confirms it ships with cohort 3. */
  enabled: boolean;
};

export const pgpFlagships: FlagshipChallenge[] = [
  {
    id: "salespreneur",
    index: "01",
    kind: "Sales",
    name: "Salespreneur",
    tagline: "Hive's Shark Tank. India's sales hackathon.",
    description:
      "CXOs judging, founders on the floor, live pitches. Teams get a real company's product and a quota, build pipeline from zero, and close in front of the people who run the company.",
    judgedBy: "CXOs and founders",
    scoreboard: "Meetings booked, deals closed, revenue",
    youLeaveWith: "Offers from the floor and a film of your pitch",
    enabled: true,
  },
  {
    id: "d2c-bazaar",
    index: "02",
    kind: "Consumer brands",
    name: "D2C Bazaar",
    tagline: "A day-long marketplace, run by student teams.",
    description:
      "Partner D2C brands hand over product and a margin target. Teams run the stall end to end: pricing, bundles, upsell, content on the day, and the P&L at close.",
    judgedBy: "The brands' founders and category heads",
    scoreboard: "Revenue, margin, repeat intent",
    youLeaveWith: "A brand P&L you ran, and the brand's number",
    enabled: true,
  },
  {
    id: "sell-on-streets",
    index: "03",
    kind: "Field selling",
    name: "Sell on Streets",
    tagline: "Real products. Real streets. Highest revenue wins.",
    description:
      "Brands give the product. Student teams take it to market streets and sell it to strangers in a day. No stall, no brand name to lean on, no script. The team with the highest revenue wins, and everyone learns what a close actually feels like.",
    judgedBy: "The cash box, counted at sundown",
    scoreboard: "Revenue per team, units, conversion",
    youLeaveWith: "A number next to your name, and a story for every interview",
    // The team's note names two new sections (Salespreneur, D2C Bazaar). The mockup adds this third one.
    enabled: false,
  },
];

export const pgpFlagshipCopy = {
  eyebrow: "Flagship challenges",
  /** The heading counts the enabled flagships, so it reads "Two days a year" until a third ships. */
  statement: "Days a year",
  emphasis: "you will not forget.",
  problem: "Most business schools test you on paper. Nobody has ever been hired for a case competition deck.",
  solution:
    "Flagship challenges where the scoreboard is revenue, the judges are CXOs and founders, and the best teams get offers on the floor.",
};

/* ── Student journey ─────────────────────────────────────────────────────── */

export type JourneyPersona = {
  id: string;
  label: string;
  range: string;
  before: { headline: string; points: string[] };
  after: { headline: string; points: string[] };
  /** The one number that sums up each side. Derived from the persona copy. */
  contrast: { before: { big: string; small: string }; after: { big: string; small: string } };
  /** A real alumni outcome. Shown only when filled in from the cohort 1 and 2 records. */
  example?: { name: string; outcome: string };
};

export const pgpJourneyPersonas: JourneyPersona[] = [
  {
    id: "fresher",
    label: "The fresher",
    range: "0 to 1 year",
    contrast: {
      before: { big: "2 of 200", small: "applications on job portals got a call back" },
      after: { big: "24", small: "judged briefs in your portfolio" },
    },
    before: {
      headline: "A degree and a CV with nothing on it a recruiter can check",
      points: [
        "Final year, or a first job that is not going anywhere",
        "200 applications on job portals, two calls back",
        "Has never sold anything, read a P&L or run a budget",
      ],
    },
    after: {
      headline: "24 judged briefs, a flagship challenge result, a dashboard for every business model",
      points: [
        "Interviews with work from the exact function, not a case deck",
        "A portfolio built for the role, reviewed by the people who hire",
      ],
    },
    example: { name: "Ansh Agrawal", outcome: "GTM Manager (US, APAC), Payoneer" },
  },
  {
    id: "sales-exec",
    label: "The stuck sales exec",
    range: "2 to 4 years",
    contrast: {
      before: { big: "0", small: "title changes in three years at the same desk" },
      after: { big: "AE · KAM", small: "a quota and a P&L line you own" },
    },
    before: {
      headline: "Good on the phone, stuck at the same desk",
      points: [
        "Hits quota, cannot explain how the company makes money",
        "Inside sales or telecalling, three years without a title change",
        "No route into a US market role, a category role or a founder's office",
      ],
    },
    after: {
      headline: "Account executive, KAM or category manager, with a quota and a P&L line",
      points: [
        "Reads any business by its engine and governing metric",
        "Post-MBA salary jump published in the placement report",
      ],
    },
  },
  {
    id: "founder-minded",
    label: "The founder-minded",
    range: "Any stage",
    contrast: {
      before: { big: "0", small: "operators in your network" },
      after: { big: "CXOs", small: "pitched to at Salespreneur" },
    },
    before: {
      headline: "A family business, a side venture or an idea, and no operator network",
      points: [
        "Ran something small, or wants to",
        "Has built, but never raised, hired or scaled a channel",
        "Does not know which of the eight engines the idea runs on",
      ],
    },
    after: {
      headline: "A founder's office, chief of staff or P&L role, or incubated",
      points: [
        "Mentors from Zomato, Nestlé, Snitch and Epigamia on speed dial",
        "Has pitched to CXOs at Salespreneur and sold on the street",
        "The Startup scholarship and the Hive Incubation Cell",
      ],
    },
  },
];

export type BeforeAfterRow = { label: string; before: string; after: string };

export const pgpBeforeAfterRows: BeforeAfterRow[] = [
  { label: "What you can show", before: "A CV and a degree", after: "24 judged briefs, flagship challenge results, a portfolio built for the role" },
  { label: "What you know", before: "Subjects", after: "Twelve business models, eight revenue engines, and the function you will be hired into" },
  { label: "Who you know", before: "Batchmates", after: "Operators from 100+ companies who taught you, judged you, and hire from Hive" },
  { label: "What you can run", before: "A task", after: "A quota, a channel, a category P&L, an AI workflow" },
  { label: "What you earn", before: "Your pre-Hive pay", after: "₹16.47L average, ₹15L median, ₹31L highest" },
  { label: "Your title", before: "Executive, trainee, intern", after: "Manager, AE, KAM, founder's office, chief of staff" },
];

export const pgpJourneyCopy = {
  eyebrow: "Student journey",
  statement: "Before Hive,",
  emphasis: "after Hive.",
  description: "Three kinds of people join the PGP. This is what nine months changes for each of them.",
};

/* ── Page navigation and FAQs ────────────────────────────────────────────── */

export const pgpAnchorNav = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "roles", label: "Roles" },
  { id: "placements", label: "Placements" },
  { id: "flagships", label: "Challenges" },
  { id: "mentors", label: "Mentors" },
  { id: "student-journey", label: "Student journey" },
  { id: "apply", label: "Admissions" },
];

export const pgpRevampFaqs = [
  {
    question: "What is the PGP in Revenue, AI and Entrepreneurship?",
    answer:
      "A 9-month, full-time, residential programme in Gurugram built around two core functions: the business models of twelve industries, and the sales, marketing, AI, finance and data sprints those industries hire for.",
  },
  {
    question: "Who is this programme for?",
    answer:
      "Graduates and professionals with zero to four years of experience who want a revenue, growth, category or founder's office role, or who want to build.",
  },
  {
    question: "What are the tracks?",
    answer:
      "Four role tracks: growth and marketing, category and commerce, sales and revenue, and founder's office, strategy and P&L. Electives are chosen by month three around the roles you are targeting.",
  },
  {
    question: "How are placements handled?",
    answer:
      "A placement practicum from month five, weekly career marking, mock interviews, and an active season with 100+ hiring partners from month seven. Offers also come from Salespreneur and the weekly challenges.",
  },
  {
    question: "What are the latest placement outcomes?",
    answer:
      "Average ₹16.47L, median ₹15L, highest ₹31L, 100+ hiring partners, from the Placement Report 2024 to 25. The Cohort 2 interim report is live and updated as outcomes are recorded.",
  },
  {
    question: "What kind of challenges will I work on?",
    answer:
      "A live brief from a real company every week, judged by the people who run it, plus flagship challenges such as Salespreneur and D2C Bazaar.",
  },
];

/* ── Why this programme ──────────────────────────────────────────────────── */

export const pgpWhy = {
  eyebrow: "Why this programme",
  statement: "Built for the roles that",
  emphasis: "run businesses.",
  problem:
    "A two-year MBA teaches every function a little and no business model properly. Graduates arrive at a D2C brand or a SaaS company without knowing how it makes money, and spend their first year finding out.",
  instead:
    "Nine months on the two things a revenue role is judged on: how the business model works, and whether you can move its numbers. Taught by operators, tested on live briefs, measured in placements.",
  pillars: [
    {
      index: "01",
      title: "Challenge-first from day one",
      description:
        "A live brief from a real company in your first week, and one every week after. Your proof-of-work portfolio starts before the first lecture.",
    },
    {
      index: "02",
      title: "Operator-led sprints",
      description:
        "Every business model and every function is taught by someone who has run it: practitioners from Zomato, Google, Adobe, Razorpay, Nestlé and fast-growing startups.",
    },
    {
      index: "03",
      title: "A placement system, not a placement cell",
      description:
        "Weekly career marking, a placement practicum, mock interviews, and 100+ hiring partners from month five. Every outcome published with role, company and fixed pay.",
    },
  ],
};

/* ── Timeline ────────────────────────────────────────────────────────────── */

export type TimelinePhase = {
  phase: string;
  title: string;
  description: string;
  ships: string;
};

export const pgpTimelineCopy = {
  eyebrow: "Course timeline",
  statement: "Nine months,",
  emphasis: "seven phases.",
  description: "What you are doing, and what ships, in each phase.",
};

export const pgpTimeline: TimelinePhase[] = [
  {
    phase: "Pre-programme",
    title: "Onboarding and the first challenge",
    description: "48-hour orientation, cohort setup, founder meet.",
    ships: "Your first live brief",
  },
  {
    phase: "Month 1",
    title: "Business foundation",
    description: "The first business models and the eight revenue engines, revenue fundamentals, a GTM overview.",
    ships: "P&L literacy across tracks",
  },
  {
    phase: "Month 2",
    title: "Industry depth",
    description:
      "SaaS economics, the D2C value chain, consumer tech, quick commerce. Core marketing and sales sprints begin. Sell on Streets.",
    ships: "D2C vs SaaS vs retail GTM, compared",
  },
  {
    phase: "Month 3",
    title: "Verticalisation and electives",
    description: "Pick your track and electives, advanced GTM, positioning.",
    ships: "Your role shortlist and elective plan",
  },
  {
    phase: "Month 4",
    title: "Building AI workflows",
    description: "AI outbound and an AI SDR, the RevOps stack, no-code GTM, your own CRM.",
    ships: "Working AI workflows for real companies",
  },
  {
    phase: "Months 5 to 6",
    title: "Placement prep intensifies",
    description: "Mock interviews, case prep, CV finalisation. Salespreneur and D2C Bazaar, where offers get made on the floor.",
    ships: "Your portfolio, and the first offers",
  },
  {
    phase: "Months 7 to 9",
    title: "Active placements",
    description: "100+ partners, the active season, offer support. Residential through the season.",
    ships: "Your offer, published with role, company and pay",
  },
];

/* ── Visual metadata: icons, logos and imagery ───────────────────────────── */
// Kept apart from the copy so the words stay easy to edit.
// Logos live in public/ai-marketing/logos. A model with no confirmed company logos shows its icon only.

import type { PgpIconName } from "@/components/pgp/PgpIcon";
import { asset, cdnAsset } from "@/lib/assets";

export const pgpLogoPath = (file: string) => `/ai-marketing/logos/${file}`;

export const pgpModelVisuals: Record<string, { short: string; icon: PgpIconName; logos: string[] }> = {
  "01": { short: "B2B SaaS and services", icon: "code", logos: ["adobe.png", "razorpay.png", "gokwik.png", "fynd.png"] },
  "02": { short: "Cybersecurity", icon: "shield", logos: [] },
  "03": { short: "Cloud and public cloud", icon: "cloud", logos: [] },
  "04": { short: "FMCG and trade", icon: "box", logos: ["nestle.png", "patanjali.png", "epigamia.png", "tata-consumer.png"] },
  "05": { short: "D2C on marketplaces", icon: "bag", logos: ["fix-my-curls.png", "snitch.webp", "tata-1mg.png", "protein-pantry.png", "noise.png"] },
  "06": { short: "QSR and cloud kitchens", icon: "utensils", logos: ["dohful.webp"] },
  "07": { short: "Quick commerce", icon: "bolt", logos: ["blinkit.png", "zepto.png", "swiggy.webp"] },
  "08": { short: "E-commerce", icon: "cart", logos: ["amazon.png"] },
  "09": { short: "Entertainment tech", icon: "ticket", logos: [] },
  "10": { short: "Consumer services", icon: "heart", logos: ["vetic.svg"] },
  "11": { short: "Consumer tech, digital", icon: "phone", logos: [] },
  "12": { short: "Consumer tech, plus service", icon: "car", logos: ["zomato.png"] },
};

export const pgpEngineVisuals: { icon: PgpIconName; logos: string[] }[] = [
  { icon: "repeat", logos: [] },
  { icon: "swap", logos: ["zomato.png", "swiggy.webp"] },
  { icon: "tag", logos: ["snitch.webp", "noise.png", "fix-my-curls.png", "protein-pantry.png"] },
  { icon: "megaphone", logos: ["amazon.png", "blinkit.png", "zepto.png", "zomato.png"] },
  { icon: "coins", logos: [] },
  { icon: "users", logos: [] },
  { icon: "magnet", logos: [] },
  { icon: "flag", logos: [] },
];

export const pgpSprintIcons: Record<string, PgpIconName> = {
  marketing: "megaphone",
  sales: "handshake",
  ai: "cpu",
  finance: "chart",
  data: "database",
  placement: "briefcase",
};

export const pgpRoleTrackIcons: Record<RoleTrackId, PgpIconName> = {
  growth: "trending",
  category: "grid",
  sales: "target",
  founder: "rocket",
};

export const pgpFlagshipVisuals: Record<
  FlagshipChallenge["id"],
  { image: string; imageAlt: string; position: string; icon: PgpIconName }
> = {
  salespreneur: {
    image: cdnAsset("images/misc/salespreneur-cohort.jpg"),
    imageAlt: "The HiveSchool cohort at Salespreneur",
    position: "50% 55%",
    icon: "gavel",
  },
  "d2c-bazaar": {
    image: encodeURI(asset("images/Website pics/d2c bazaar/DSC01382.jpeg")),
    imageAlt: "Students running a stall at D2C Bazaar",
    position: "50% 40%",
    icon: "store",
  },
  "sell-on-streets": {
    image: encodeURI(asset("images/Website pics/D2c showcase/DSC02669.jpeg")),
    imageAlt: "Students selling on the street",
    position: "50% 40%",
    icon: "pin",
  },
};

export const pgpTimelineIcons: PgpIconName[] = ["rocket", "book", "grid", "target", "cpu", "briefcase", "trophy"];

export const pgpWhyIcons: PgpIconName[] = ["target", "users", "trophy"];


/* ── Short copy and photos for the photo-led sections ────────────────────── */

const local = (path: string) => encodeURI(asset(path));

/** Condensed versions of the curriculum and flagship arguments, for the scroll layout. */
export const pgpShortCopy = {
  curriculum: {
    problem: "Subjects are taught as if every company were the same. Zerodha and Policybazaar are both fintech and have nothing in common.",
    instead: "Twelve industries, taught through their real companies and the engine underneath. Then the sprints those companies hire for, done on live briefs.",
  },
  flagships: {
    problem: "Most business schools test you on paper. Nobody has ever been hired for a case competition deck.",
    instead: "Scoreboards that count revenue, judges who are CXOs and founders, and offers made on the floor.",
  },
  why: {
    problem: "A two-year MBA teaches every function a little and no business model properly.",
    instead: "Nine months on the two things a revenue role is judged on: how the business model works, and whether you can move its numbers.",
  },
};

/** The three pillars: a short line and a real photo each. */
export const pgpWhyPillars = [
  {
    index: "01",
    title: "Challenge-first from day one",
    line: "A live brief from a real company in week one, and one every week after.",
    image: local("images/why/ship-work.webp"),
    alt: "A mentor reviewing a student's work on a laptop",
    position: "50% 40%",
  },
  {
    index: "02",
    title: "Operator-led sprints",
    line: "Taught by people who have run it: Zomato, Google, Adobe, Razorpay, Nestlé.",
    image: local("images/why/break-down-business-models.webp"),
    alt: "The HiveSchool cohort with their mentors",
    position: "50% 60%",
  },
  {
    index: "03",
    title: "A placement system, not a placement cell",
    line: "Weekly career marking, mock interviews, and 100+ hiring partners from month five.",
    image: local("images/why/present-to-founders.webp"),
    alt: "A student pitching to founders on stage",
    position: "55% 50%",
  },
];

/** One photo per role track. Event photos from campus. */
export const pgpRoleTrackImages: Record<RoleTrackId, { image: string; alt: string; position: string }> = {
  growth: {
    image: local("images/Website pics/D2c showcase/DSC02696.jpeg"),
    alt: "A student presenting a brand plan on stage",
    position: "50% 40%",
  },
  category: {
    image: local("images/Website pics/d2c bazaar/DSC01382.jpeg"),
    alt: "Students running a stall at D2C Bazaar",
    position: "50% 40%",
  },
  sales: {
    image: cdnAsset("images/misc/salespreneur-cohort.jpg"),
    alt: "The cohort at Salespreneur",
    position: "50% 55%",
  },
  founder: {
    image: local("images/Website pics/Orientation/DSC01745.jpeg"),
    alt: "A founder speaking to the cohort",
    position: "50% 30%",
  },
};

/** One photo per timeline phase, from the existing timeline set. */
export const pgpTimelineImages: { image: string; alt: string; position: string }[] = [
  { image: local("images/timeline/pre-programme.webp"), alt: "The cohort on orientation day", position: "50% 40%" },
  { image: local("images/timeline/month1.webp"), alt: "A session in progress in the classroom", position: "60% 50%" },
  { image: local("images/timeline/month2.webp"), alt: "Students on a field visit to a brand's store", position: "50% 40%" },
  { image: local("images/timeline/month3.webp"), alt: "A speaker addressing the cohort", position: "30% 40%" },
  { image: local("images/timeline/month4.webp"), alt: "The cohort in a working session", position: "50% 45%" },
  { image: local("images/timeline/month5.webp"), alt: "A team preparing together at the table", position: "50% 40%" },
  { image: local("images/timeline/month7-9.webp"), alt: "Students working through placement applications", position: "40% 45%" },
];

/** One photo per sprint function. Campus photos, used to set the scene. */
export const pgpSprintImages: Record<string, { image: string; alt: string; position: string }> = {
  marketing: {
    image: local("images/Website pics/D2c showcase/DSC02696.jpeg"),
    alt: "A student presenting a brand plan",
    position: "50% 40%",
  },
  sales: {
    image: cdnAsset("images/misc/salespreneur-cohort.jpg"),
    alt: "The cohort at Salespreneur",
    position: "50% 55%",
  },
  ai: {
    image: local("images/why/ship-work.webp"),
    alt: "A mentor reviewing a student's work on a laptop",
    position: "50% 40%",
  },
  finance: {
    image: local("images/timeline/month5.webp"),
    alt: "A team working through numbers at a table",
    position: "50% 40%",
  },
  data: {
    image: local("images/timeline/month7-9.webp"),
    alt: "Students working on laptops",
    position: "40% 45%",
  },
  placement: {
    image: local("images/why/present-to-founders.webp"),
    alt: "A student pitching on stage",
    position: "55% 50%",
  },
};

/**
 * Short labels for the sprint tiles, keyed by the full topic title (which stays the source of truth).
 * A topic without an entry here shows its full title.
 */
export const pgpSprintShort: Record<string, string> = {
  "Brand, organic, growth and product marketing for D2C": "D2C brand and growth marketing",
  "The same, for consumer tech and consumer services": "Consumer tech and services",
  "ABM, growth and demand gen in B2B SaaS and services": "B2B demand gen",
  "Building and decoding marketing funnels across industries": "Marketing funnels",
  "UGC and content-led GTM: which content IP, which platform, why": "UGC and content-led GTM",
  "Paid media: Meta, Google and YouTube ads": "Paid media",
  "Quick commerce growth: Blinkit, Zepto, Instamart": "Quick commerce growth",
  "E-commerce growth: Amazon, Flipkart, Myntra, Meesho": "E-commerce growth",
  "Brand building and marketing": "Brand building",
  "Retail and offline marketplace distribution and growth": "Retail and offline distribution",
  "The ASM function in FMCG": "The ASM function in FMCG",
  "Outbound fundamentals: cold calls, emails, LinkedIn": "Outbound fundamentals",
  "Unconventional outbound for the US market": "US outbound",
  "In-class reviews of your emails, LinkedIn messages and cold calls": "Live reviews of your outreach",
  "Art of communication: accent and MTI when selling globally": "Communication and accent",
  "Selling cybersecurity vs typical SaaS: real outbound that booked meetings": "Selling cybersecurity",
  "Selling cloud vs SaaS vs cybersecurity": "Selling cloud",
  "Closing in SaaS, cybersecurity and cloud": "Closing deals",
  "Understanding LLMs: Claude, GPT and the rest": "Understanding LLMs",
  "AI in sales processes: building an AI SDR": "Building an AI SDR",
  "AI in marketing: tools, use cases, and in-house builds": "AI in marketing",
  "The solutions consultant stack": "Solutions consultant stack",
  "Building AI use cases from scratch, your own CRM included": "Your own AI use cases, CRM included",
  "Product management sprint": "Product management",
  "Operations, supply chain, demand and inventory, with the tools": "Operations and supply chain",
  "Data and advanced Excel fundamentals": "Advanced Excel",
  "SQL fundamentals": "SQL",
  "Tableau fundamentals": "Tableau",
  "Power BI fundamentals": "Power BI",
  "Building the ideal CV": "The ideal CV",
  "Reading a JD and its KRAs, and customising your portfolio to it": "Reading a JD",
  "Framing and selling your story, then customising it to the role": "Selling your story",
  "Solving consulting cases": "Consulting cases",
  "Cracking off-campus interviews": "Off-campus interviews",
};

/** Elective group labels, shortened for the tile tag. */
export const pgpElectiveTags: Record<string, string> = {
  "Electives: platform and digital first": "Digital first",
  "Electives: offline and retail first": "Offline first",
};

/** The "Get placed in ___" line in the hero. */
export const pgpHeroRotator = {
  lead: "Get placed in",
  words: ["Sales and revenue", "Growth and marketing", "Category and commerce", "Founder's office", "AI and RevOps"],
};

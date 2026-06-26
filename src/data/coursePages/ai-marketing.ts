import type { CoursePageConfig } from "@/data/coursePages/types";
import { asset } from "@/lib/assets";

export const aiMarketingCoursePage: CoursePageConfig = {
  slug: "ai-marketing",
  programmeTitle: "AI Marketing & Entrepreneurship Fellowship",
  meta: {
    title: "AI Marketing & Entrepreneurship Fellowship | HiveSchool",
    description:
      "You don't study marketing here. You build it. A 6-month on-campus fellowship in Gurugram — 4 months of curriculum, 2 months of placements, AI-native from day one.",
  },
  hero: {
    badge: "Fellowship Programme",
    location: "On-campus · Gurugram",
    intake: "Oct 2026",
    title: "AI Marketing &",
    emphasis: "Entrepreneurship",
    description:
      "You don't study marketing here. You build it. Six months on campus — real ventures, real budgets, real brands — backed by India's only revenue-focused business school.",
    videoId: "vCfoRUGuszE",
    backgroundVideo: "videos/ai-marketing-hero.mp4",
    primaryCta: { label: "Start application", href: "#apply" },
    secondaryCta: { label: "Download brochure", href: "/AI-Marketing-Fellowship-Brochure.pdf" },
    stats: [
      { value: "06", label: "Months" },
      { value: "4+2", label: "Months curriculum + placements" },
      { value: "4", label: "Core tracks" },
      { value: "25+", label: "Industrial Mentors" },
    ],
    meta: [
      { label: "Format", value: "Full-time on campus" },
      { label: "Venture", value: "One real brand you build" },
      { label: "Challenges", value: "Live briefs every Wednesday" },
      { label: "Hive", value: "Shark Tank India · Season 4" },
    ],
  },
  pillars: {
    eyebrow: "Why this is different",
    statement: "Four things you won't find",
    emphasis: "in a marketing course",
    description:
      "Most programs teach, then test. Here, you build — then learn what worked.",
    items: [
      {
        index: "01",
        title: "Entrepreneurship-led",
        tagline: "Your venture is the classroom",
        image: asset("images/why/present-to-founders.webp"),
        description:
          "Every concept lands on a real venture you build. The brand is the classroom.",
      },
      {
        index: "02",
        title: "AI-native from Day 1",
        tagline: "AI in every sprint",
        image: asset("images/why/ship-work.webp"),
        description:
          "AI isn't a module bolted on at the end. It runs through every sprint, taught by every practitioner.",
      },
      {
        index: "03",
        title: "Challenge-based",
        tagline: "Real briefs every Wednesday",
        image: asset("images/life/life-3.avif"),
        description:
          "Every Wednesday: a real brand, a real brief, a real deadline. You're judged on the work, not an exam.",
      },
      {
        index: "04",
        title: "Real work from Week 1",
        tagline: "Campaigns live from month one",
        image: asset("images/life/gym-hiveschool.jpg"),
        description:
          "You ship campaigns, build pages, run ads, and read dashboards from the first month. Your portfolio writes itself.",
      },
    ],
  },
  audience: {
    eyebrow: "Who this is for",
    statement: "Three career directions.",
    emphasis: "One build-first approach.",
    description:
      "Open to college students and graduates from any academic background or discipline.",
    items: [
      {
        index: "01",
        title: "Pursue a marketing career",
        tagline: "D2C · agencies · startups",
        image: asset("images/life/life-2.avif"),
        description:
          "For early-career professionals seeking hands-on roles at D2C brands, consumer technology companies, agencies, or high-growth startups.",
      },
      {
        index: "02",
        title: "Build an independent practice",
        tagline: "Clients · portfolio · revenue",
        image: asset("images/life/depender.avif"),
        description:
          "For professionals who wish to offer specialised marketing services on their own, with a portfolio and client relationships developed during the programme.",
      },
      {
        index: "03",
        title: "Launch your own brand",
        tagline: "Source · brand · sell",
        image: asset("images/misc/life-at-hive.webp"),
        description:
          "For founders and creators with a product idea or audience, learning marketing by building a D2C brand end to end — from sourcing and branding to listing, promotion, and sales.",
      },
    ],
    footnote:
      "Representative outcomes include performance marketing, brand management, D2C founding, and independent consulting.",
  },
  highlights: {
    eyebrow: "How you'll learn",
    statement: "Learn it. Build it.",
    emphasis: "Prove it.",
    items: [
      {
        index: "Learn",
        title: "Practitioner-led sprints",
        subtitle: "Operators teach. You apply the same week.",
        image: asset("images/life/life-1.avif"),
        href: "/ai-marketing/curriculum",
      },
      {
        index: "Build",
        title: "On your venture",
        subtitle: "Every lesson ships on the brand you are building.",
        image: asset("images/why/ship-work.webp"),
        href: "/ai-marketing/curriculum",
      },
      {
        index: "Prove",
        title: "Wednesday challenges",
        subtitle: "Brief at 10 AM. Pitch to a panel by 8 PM.",
        image: asset("images/life/life-5.avif"),
        href: "/ai-marketing/curriculum",
      },
    ],
  },
  paths: {
    eyebrow: "Choose your path",
    statement: "Select the venture you will build",
    emphasis: "and develop over six months",
    description:
      "Entrepreneurship is integrated throughout the programme. In Month 1, you choose a venture direction. Every sprint thereafter applies directly to that choice.",
    items: [
      {
        index: "01",
        title: "Build a D2C brand",
        tagline: "Product to shelf to revenue",
        image: asset("images/life/admission-image.avif"),
        description:
          "Take a product from concept to shelf — covering sourcing, branding, marketplace listing, paid acquisition, and customer growth with measurable outcomes.",
        tags: ["Amazon", "Flipkart", "Blinkit", "Shopify"],
        outcome: "Live storefront, verified revenue, and marketplace operations experience",
      },
      {
        index: "02",
        title: "Start a content channel",
        tagline: "Audience from zero",
        image: asset("images/life/life-1.avif"),
        description:
          "Build and grow an audience from the ground up through content strategy, platform mechanics, format development, and monetisation — executed hands-on throughout the programme.",
        tags: ["Instagram", "YouTube", "LinkedIn", "Creator IP"],
        outcome: "Engaged audience, repeatable content engine, and a defined personal brand",
      },
      {
        index: "03",
        title: "Build a freelance agency",
        tagline: "Clients and commercial work",
        image: asset("images/misc/life-at-hive.webp"),
        description:
          "Acquire clients, deliver professional marketing engagements, and graduate with a portfolio supported by live work and commercial outcomes.",
        tags: ["D2C clients", "SaaS clients", "Retainers", "Case studies"],
        outcome: "Paying clients, documented agency playbook, and placement-ready portfolio",
      },
    ],
  },
  inlineCtas: [
    {
      id: "fit-check",
      variant: "light",
      eyebrow: "Admissions",
      title: "What it takes to get in",
      description:
        "Discovery call, business case discussion, and culture fit — three conversations to find the right cohort.",
      primary: { label: "Book a discovery call", href: "#apply" },
      secondary: { label: "See the curriculum", href: "/ai-marketing/curriculum" },
    },
    {
      id: "portfolio",
      variant: "dark",
      eyebrow: "Outcomes",
      title: "Proof of work, not a promise",
      description:
        "Agencies, D2C brands, consumer tech — or your own freelance practice. Either way, you leave with work that got judged in the room.",
      primary: { label: "See curriculum", href: "/ai-marketing/curriculum" },
      secondary: { label: "Apply now", href: "#apply" },
    },
    {
      id: "intake",
      variant: "accent",
      eyebrow: "October 2026 · Gurugram",
      title: "You can read about marketing for six months. Or spend six months doing it.",
      description:
        "Applications open for the AI Marketing & Entrepreneurship Fellowship. Limited seats per cohort.",
      primary: { label: "Start application", href: "#apply" },
      secondary: { label: "Download brochure", href: "/AI-Marketing-Fellowship-Brochure.pdf" },
    },
    {
      id: "incubation",
      variant: "dark",
      eyebrow: "Hive Incubation Cell",
      title: "If it's worth continuing, it doesn't have to stop",
      description:
        "Real desk space on a startup floor, 200+ founders in reach, and warm intros when your venture is ready for the next chapter.",
      primary: { label: "Explore campus life", href: "#campus" },
      secondary: { label: "Apply now", href: "#apply" },
    },
  ],
  timeline: {
    eyebrow: "The journey",
    statement: "Six months,",
    emphasis: "told in five chapters",
    phases: [
      {
        phase: "Month 1",
        title: "Foundations & first move",
        description:
          "Choose your venture, define the niche, and ship your first challenge.",
        tags: [
          "Learn: Positioning, GTM, content, AI foundations",
          "Build: Choose your venture",
          "Prove: First brand visit + opening challenge",
        ],
        image: "images/timeline/month1.webp",
      },
      {
        phase: "Month 2",
        title: "Performance & first revenue",
        description:
          "Run your first real campaign on real budget and chase first revenue.",
        tags: [
          "Learn: Meta, Google, YouTube, Shopify, e-comm, q-comm",
          "Build: First live campaign",
          "Prove: The ₹5,000 ad showdown",
        ],
        image: "images/timeline/month2.webp",
      },
      {
        phase: "Month 3",
        title: "Depth, B2B & AI",
        description:
          "Scale the venture, deploy your first AI agent, and go deeper on funnels.",
        tags: [
          "Learn: Programmatic, SEO/AEO, B2B, AI workflows",
          "Build: Scale venture · deploy AI agent",
          "Prove: Marketplace + dashboard challenges",
        ],
        image: "images/timeline/month3.webp",
      },
      {
        phase: "Month 4",
        title: "Capstone & pitch day",
        description:
          "Finalise your portfolio and pitch your venture to a practitioner panel.",
        tags: [
          "Learn: Personal branding, offline retail",
          "Build: Finalise portfolio",
          "Prove: Founder's Track Pitch Day",
        ],
        image: "images/timeline/month4.webp",
      },
      {
        phase: "Months 5–6",
        title: "Placements — or keep building",
        description:
          "Interview prep and recruiter processes — or continue your venture with Incubation support.",
        tags: [
          "Learn: Interview craft, recruiter prep",
          "Build: Continue venture with Incubation",
          "Prove: Mock interviews & hiring processes",
        ],
        image: "images/timeline/month5.webp",
      },
    ],
  },
  capstones: {
    eyebrow: "Challenge-based learning",
    statement: "Wednesday isn't a class.",
    emphasis: "It's a deadline.",
    description:
      "Every challenge is a live problem from a real brand. Brief drops at 10 AM. Teams pitch to a practitioner panel by 8 PM.",
    variant: "showcase",
    items: [
      {
        index: "01",
        title: "Dohful on Zomato",
        description:
          "Listing + visibility for a cookie brand against Oreo and Parle.",
        category: "Marketplace",
        badge: "Live brief",
      },
      {
        index: "02",
        title: "Goat × Blinkit strategy",
        description:
          "Dark-store entry plan, pricing, 4.2 stars in 60 days.",
        category: "Quick commerce",
        badge: "Pitch deck",
      },
      {
        index: "03",
        title: "Protein Party viral content",
        description: "1M impressions in 30 days, zero ad spend.",
        category: "Content",
        badge: "Organic growth",
      },
      {
        index: "04",
        title: "Mamaearth vs WOW",
        description:
          "The ₹5,000 ad showdown — real budget, real Shopify store. Lowest CAC wins.",
        category: "Performance",
        badge: "Real budget",
      },
      {
        index: "05",
        title: "Fix PeeSafe's Amazon listing",
        description: "Conversion dropped 23%. Audit it. Present the fix.",
        category: "E-commerce",
        badge: "Conversion",
      },
      {
        index: "06",
        title: "Fixmycurls content calendar",
        description: "Pivot from product-led to education-led content.",
        category: "Brand",
        badge: "30-day plan",
      },
      {
        index: "07",
        title: "Sleepy Owl modern trade",
        description: "Trade pricing, shelf strategy, online-offline loop.",
        category: "Retail",
        badge: "Omnichannel",
      },
      {
        index: "08",
        title: "WhatsApp re-nurture funnel",
        description: "5-message sequence to win back cart abandoners.",
        category: "Lifecycle",
        badge: "Automation",
      },
      {
        index: "09",
        title: "AI competitor price tracker",
        description: "No-code system that monitors 5 rivals daily.",
        category: "AI ops",
        badge: "No-code",
      },
      {
        index: "10",
        title: "The broken dashboard",
        description:
          "ROAS fell 4× → 1.8×. 48 hours. Find the leak.",
        category: "Analytics",
        badge: "Diagnosis",
        featured: true,
      },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    statement: "Questions you're",
    emphasis: "probably asking",
    description:
      "Everything you need to know about the AI Marketing & Entrepreneurship Fellowship.",
    items: [
      {
        question: "Who is this fellowship for?",
        answer:
          "College students or graduates from any stream. Whether you want a marketing job, a freelance practice, or your own D2C brand — the programme is built around building, not sitting in lectures.",
      },
      {
        question: "How does the Learn · Build · Prove loop work?",
        answer:
          "Practitioners teach a focused sprint, you apply it the same week on your venture, and every Wednesday you take a real brief into a room and pitch to a panel. AI runs through all three — it's how you work, not a separate class.",
      },
      {
        question: "What venture will I build?",
        answer:
          "In Month 1 you choose: a D2C brand, a content channel, or a freelance agency. Every sprint after that lands on your venture — positioning, ads, content, marketplaces, and AI workflows included.",
      },
      {
        question: "What happens after the programme?",
        answer:
          "Months 5–6 focus on placements — interview prep, mock rounds, and recruiter processes. If your venture is worth continuing, the Hive Incubation Cell offers desk space, mentor support, and founder network access in the same building.",
      },
      {
        question: "What is the programme fee?",
        answer:
          "₹4,50,000 + GST. The fee covers on-campus learning, live campaign budgets, tool access, and AI subscriptions during the fellowship.",
      },
      {
        question: "How does admissions work?",
        answer:
          "Three steps: a discovery call with Head of Admissions, a business case discussion with our panel, and a culture fit conversation. We're looking for marketing instinct, creative clarity, and hunger to build with AI.",
      },
    ],
  },
  fees: {
    eyebrow: "Fees & admission",
    statement: "What it takes",
    emphasis: "to get in",
    badge: "Fellowship",
    intake: "October 2026",
    description:
      "Programme fee includes ad budgets for live campaigns, tool access, and AI subscriptions during the fellowship.",
    lines: [{ label: "Programme fee", amount: "₹4,50,000 + GST", highlight: true }],
    scholarships: [
      {
        title: "Merit Scholarship",
        description: "For candidates who perform exceptionally across all admission conversations.",
      },
      {
        title: "Need-Based Scholarship",
        description: "Confidential financial review for candidates who need support to attend.",
      },
      {
        title: "Creator Scholarship",
        description:
          "For candidates already building a brand, audience, or creative practice with traction or clear intent.",
      },
    ],
    note: "College students or graduates. Any background, any stream.",
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
    campusStyle: "fullscreen",
    reels: false,
    admissions: true,
    applicationForm: true,
    visualStory: true,
  },
};

import type { CoursePageConfig } from "@/data/coursePages/types";
import { asset, videoAsset, cdnAsset } from "@/lib/assets";

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
    intake: "October 2026",
    title: "AI Marketing &",
    emphasis: "Entrepreneurship",
    description:
      "You don't study marketing here. You build it. Six months on campus — real ventures, real budgets, real brands — backed by India's only revenue-focused business school.",
    videoId: "vCfoRUGuszE",
    backgroundVideo: "videos/ai-marketing-hero.mp4",
    primaryCta: { label: "Start application", href: "/ai-marketing#apply" },
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
    statement: "We built the coolest AI marketing",
    emphasis: "and entrepreneurship program India has ever seen.",
    description:
      "",
    items: [
      {
        index: "01",
        title: "Performance vs Storytelling",
        tagline: "A normal marketer vs Top 1%",
        image: cdnAsset("images/Website pics/D2c showcase/DSC01245.jpeg"),
        description:
          "A normal marketer would think of Performance Marketing like a Meta Dashboard concept. But Top 1% marketer would think of creating a storyline for a brand that can sell organically and reduce CAC’s. Just like these students are doing here.",
      },
      {
        index: "02",
        title: "Branding beyond lectures",
        tagline: "Toe-Mah-Toes",
        image: cdnAsset("images/Website pics/D2c showcase/DSC02669.jpeg"),
        description:
          "Branding is not a concept that can be learned in a lecture. For us, Branding is actually creating the most different brand that people will actually buy.",
      },
      {
        index: "03",
        title: "Positioning is not a framework",
        tagline: "First Female Sensual Perfume",
        image: cdnAsset("images/Website pics/D2c showcase/DSC02675.jpeg"),
        description:
          "Positioning is not just a 4 matrix framework. It is understanding how can we build a brand even in a fragmented market like Perfumes. Hey btw, we're building India's First Female Sensual Perfume Brand. Go buy from us.",
      },
      {
        index: "04",
        title: "Real Performance Marketing",
        tagline: "Generating sales (Griply)",
        image: cdnAsset("images/Website pics/D2c showcase/DSC02684.jpeg"),
        description:
          "We learnt performance Marketing by actually running Meta Ads for our product. Already generated X sales btw.",
      },
    ],
  },
  audience: {
    eyebrow: "Outdated vs Real Marketing",
    statement: "Learn from operators,",
    emphasis: "not 10-year-old courses.",
    description:
      "",
    items: [
      {
        index: "01",
        title: "Comparison: Other programs vs Hive",
        tagline: "Tired of outdated concepts?",
        image: cdnAsset("images/Website pics/D2c showcase/DSC02687.jpeg"),
        description:
          "I want to start my Marketing Career - but all these same 10 year old courses are teaching concepts that are outdated. 'It’s the same dark room and a 10 year experienced Performance Marketers teaching me about today’s marketing.'",
      },
      {
        index: "02",
        title: "Learn from active operators",
        tagline: "Mentors from top brands",
        image: cdnAsset("images/Website pics/D2c showcase/DSC02696.jpeg"),
        description:
          "My brand professor from Nestle taught me how to create the quirkiest socks brand.",
      },
      {
        index: "03",
        title: "Real unit economics",
        tagline: "Healthy contribution margins",
        image: cdnAsset("images/Website pics/Orientation/DSC01710.jpeg"),
        description:
          "Our growth mentor from Libas taught us how to have healthy contribution margins in a Cookie Brand. (e.g. ₹5 for packaging, ₹5 for COGS, etc.)",
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
        image: cdnAsset("images/Website pics/Orientation/DSC01745.jpeg"),
        href: "/ai-marketing/curriculum",
      },
      {
        index: "Build",
        title: "On your venture",
        subtitle: "Every lesson ships on the brand you are building.",
        image: cdnAsset("images/Website pics/Orientation/DSC01783.jpeg"),
        href: "/ai-marketing/curriculum",
      },
      {
        index: "Prove",
        title: "Wednesday challenges",
        subtitle: "Brief at 10 AM. Pitch to a panel by 8 PM.",
        image: cdnAsset("images/Website pics/Orientation/DSC01789.jpeg"),
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
        image: cdnAsset("images/Website pics/d2c bazaar/DSC01382.jpeg"),
        description:
          "Take a product from concept to shelf — covering sourcing, branding, marketplace listing, paid acquisition, and customer growth with measurable outcomes.",
        tags: ["Amazon", "Flipkart", "Blinkit", "Shopify"],
        outcome: "Live storefront, verified revenue, and marketplace operations experience",
      },
      {
        index: "02",
        title: "Start a content channel",
        tagline: "Audience from zero",
        image: cdnAsset("images/Website pics/d2c bazaar/DSC01390.jpeg"),
        description:
          "Build and grow an audience from the ground up through content strategy, platform mechanics, format development, and monetisation — executed hands-on throughout the programme.",
        tags: ["Instagram", "YouTube", "LinkedIn", "Creator IP"],
        outcome: "Engaged audience, repeatable content engine, and a defined personal brand",
      },
      {
        index: "03",
        title: "Build a freelance agency",
        tagline: "Clients and commercial work",
        image: cdnAsset("images/Website pics/d2c bazaar/DSC01402.jpeg"),
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
      primary: { label: "Book a discovery call", href: "/ai-marketing#apply" },
      secondary: { label: "See the curriculum", href: "/ai-marketing/curriculum" },
    },
    {
      id: "portfolio",
      variant: "dark",
      eyebrow: "Outcomes",
      title: "Proof of work, not a promise",
      description:
        "Agencies, D2C brands, consumer tech — or your own freelance practice. Either way, you leave with work that got judged in the room.",
      primary: { label: "See curriculum", href: "/ai-marketing/curriculum#tracks" },
      secondary: { label: "Apply now", href: "/ai-marketing#apply" },
    },
    {
      id: "intake",
      variant: "accent",
      eyebrow: "October 2026 · Gurugram",
      title: "You can read about marketing for six months. Or spend six months doing it.",
      description:
        "Applications open for the AI Marketing & Entrepreneurship Fellowship. Limited seats per cohort.",
      primary: { label: "Start application", href: "/ai-marketing#apply" },
      secondary: { label: "Download brochure", href: "/AI-Marketing-Fellowship-Brochure.pdf" },
    },
    {
      id: "incubation",
      variant: "dark",
      eyebrow: "Hive Incubation Cell",
      title: "If it's worth continuing, it doesn't have to stop",
      description:
        "Real desk space on a startup floor, 200+ founders in reach, and warm intros when your venture is ready for the next chapter.",
      primary: { label: "Explore campus life", href: "/campus" },
      secondary: { label: "Apply now", href: "/ai-marketing#apply" },
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
          "Learn: Positioning, growth, content, AI foundations",
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
          "Prove: The ad showdown",
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
          "Anyone with the drive to learn — there's no age bar or background requirement. College students, graduates, working professionals, career-switchers, even a 70-year-old who simply wants to learn AI marketing are all welcome. Whether you want a marketing job, a freelance practice, or your own D2C brand — the programme is built around building, not sitting in lectures.",
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
          "₹4,50,000. The fee covers on-campus learning, live campaign budgets, tool access, and AI subscriptions during the fellowship.",
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
    lines: [{ label: "Programme fee", amount: "₹4,50,000", highlight: true }],
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
  },
  applicationForm: {
    title: "Fellowship Application Form",
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

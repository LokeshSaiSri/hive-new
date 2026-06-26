export type MegaStat = {
  value: string;
  title: string;
  shortLabel?: string;
  description: string;
};

export const whyHiveStats: MegaStat[] = [
  {
    value: "₹16.47L",
    title: "Average CTC",
    shortLabel: "Average CTC",
    description: "in PGP Cohort placements",
  },
  {
    value: "₹27.8L",
    title: "Highest CTC",
    shortLabel: "Highest",
    description: "offered to HiveSchool graduates",
  },
  {
    value: "+184%",
    title: "Average Salary Jump",
    shortLabel: "Average Jump",
    description: "from pre-programme to placement",
  },
  {
    value: "100+",
    title: "Hiring Partners",
    shortLabel: "Partners",
    description: "across SaaS, D2C & consumer tech",
  },
  {
    value: "₹21.93L",
    title: "Top 25% CTC",
    shortLabel: "Top 25%",
    description: "for highest-performing graduates",
  },
  {
    value: "₹15L",
    title: "Median CTC",
    shortLabel: "Median",
    description: "across all placement offers",
  },
];

export const placementStats = whyHiveStats.map((s) => ({
  value: s.value,
  label: s.title,
}));

export const founderQuote = {
  quote:
    "Revenue roles go far beyond just 'selling' — it's about driving growth across marketing, product, finance, and ultimately owning the P&L.",
  name: "Nikhil Gaur",
  role: "Founder, HiveSchool",
};

export const placementReportVideoId = "F5Byc_2EKzA";

export const hiringPartners = [
  "Amazon",
  "Google",
  "Adobe",
  "Payoneer",
  "MoEngage",
  "Swiggy",
  "Microsoft",
  "Razorpay",
  "Kaseya",
  "Fynd",
  "Zepto",
  "Nestlé",
  "Zomato",
  "Mindtickle",
  "Gartner",
];

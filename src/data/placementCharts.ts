export type PlacementBar = {
  label: string;
  value: string;
  amount: number;
  /** Visual height as % of the chart track — tuned to match gamma /pgp/placements */
  visualHeight: number;
  highlight?: boolean;
};

export const ctcDistribution: PlacementBar[] = [
  { label: "Median", value: "₹15L", amount: 15, visualHeight: 46 },
  { label: "Average", value: "₹16.47L", amount: 16.47, visualHeight: 52, highlight: true },
  { label: "Top 75%", value: "₹17.65L", amount: 17.65, visualHeight: 56 },
  { label: "Top 50%", value: "₹18.63L", amount: 18.63, visualHeight: 60 },
  { label: "Top 25%", value: "₹21.93L", amount: 21.93, visualHeight: 68 },
  { label: "Highest", value: "₹27.8L", amount: 27.8, visualHeight: 84, highlight: true },
];

export const salaryByExperience: PlacementBar[] = [
  { label: "Freshers", value: "₹14.6L", amount: 14.6, visualHeight: 52 },
  { label: "1-2 Yrs Exp", value: "₹15.33L", amount: 15.33, visualHeight: 56 },
  { label: ">2 Yrs Exp", value: "₹19.2L", amount: 19.2, visualHeight: 74, highlight: true },
];

export const salaryJump: PlacementBar[] = [
  { label: "Pre-MBA", value: "₹7.24L", amount: 7.24, visualHeight: 38 },
  { label: "Post-MBA", value: "₹16.47L", amount: 16.47, visualHeight: 72, highlight: true },
];

export const industryMix = [
  { label: "Tech & AI", share: 50, color: "#efc44a" },
  { label: "D2C", share: 25, color: "#6f89ff" },
  { label: "Consumer Tech", share: 16.7, color: "#3f5be0" },
  { label: "Not Disclosed", share: 8.3, color: "#1c2f93" },
] as const;

export const industryPieGradient =
  "conic-gradient(#efc44a 0 50%, #6f89ff 50% 75%, #3f5be0 75% 91.7%, #1c2f93 91.7% 100%)";

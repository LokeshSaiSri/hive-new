import { asset } from "@/lib/assets";

export type PartnerLogo = {
  name: string;
  src: string;
  treatment?: "color" | "mono" | "light";
};

export const hiringPartnerLogos: PartnerLogo[] = [
  { name: "Adobe", src: asset("images/logos/adobe.png"), treatment: "color" },
  { name: "Google", src: asset("images/logos/google.png"), treatment: "color" },
  {
    name: "Payoneer",
    src: asset("images/logos/hiring-partners/payoneer-logo.png"),
    treatment: "light",
  },
  { name: "Razorpay", src: asset("images/logos/razorpay.png"), treatment: "mono" },
  { name: "Swiggy", src: asset("images/logos/swiggy.png"), treatment: "color" },
  { name: "Zomato", src: asset("images/logos/zomato.png"), treatment: "mono" },
  {
    name: "Microsoft",
    src: asset("images/logos/panel-mentors/microsoft.svg"),
    treatment: "color",
  },
  {
    name: "MoEngage",
    src: asset("images/logos/hiring-partners/moengage.svg"),
    treatment: "light",
  },
  { name: "Kaseya", src: asset("images/logos/panel-mentors/kaseya.png"), treatment: "mono" },
  { name: "Fynd", src: asset("images/logos/panel-mentors/fynd.png"), treatment: "color" },
  {
    name: "Zepto",
    src: asset("images/logos/panel-mentors/zepto.svg"),
    treatment: "light",
  },
  {
    name: "Mindtickle",
    src: asset("images/logos/hiring-partners/mindtickle.svg"),
    treatment: "light",
  },
  {
    name: "Gartner",
    src: asset("images/logos/hiring-partners/gartner.svg"),
    treatment: "light",
  },
  { name: "Freshworks", src: asset("images/logos/freshworks.png"), treatment: "mono" },
  { name: "Salesforce", src: asset("images/logos/salesforce.png"), treatment: "color" },
  { name: "MongoDB", src: asset("images/logos/mongoDB.png"), treatment: "mono" },
  {
    name: "Blinkit",
    src: asset("images/logos/hiring-partners/blinkit.svg"),
    treatment: "light",
  },
  { name: "MakeMyTrip", src: asset("images/logos/makemytrip.png"), treatment: "color" },
  { name: "Rapido", src: asset("images/logos/rapido.png"), treatment: "color" },
  {
    name: "Rippling",
    src: asset("images/logos/hiring-partners/rippling.svg"),
    treatment: "light",
  },
];

export const founderImage = asset("images/founders/Nikhil.jpeg");
export const revenueRolesDiagram = asset("images/home/revenue-roles-diagram.png");
export const hiveLogo = asset("images/misc/hiveschool-logo.png");
export const lifeAtHive = asset("images/misc/life-at-hive.webp");
export const admissionHero = asset("images/life/admission-image.avif");

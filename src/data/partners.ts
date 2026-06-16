import { asset } from "@/lib/assets";

export type PartnerLogo = {
  name: string;
  src: string;
};

export const hiringPartnerLogos: PartnerLogo[] = [
  { name: "Adobe", src: asset("images/logos/adobe.png") },
  { name: "Google", src: asset("images/logos/google.png") },
  { name: "Payoneer", src: asset("images/logos/Payoneer.png") },
  { name: "Razorpay", src: asset("images/logos/razorpay.png") },
  { name: "Swiggy", src: asset("images/logos/swiggy.png") },
  { name: "Zomato", src: asset("images/logos/zomato.png") },
  { name: "Microsoft", src: asset("images/logos/panel-mentors/microsoft.svg") },
  { name: "MoEngage", src: asset("images/logos/panel-mentors/moengage.png") },
  { name: "Kaseya", src: asset("images/logos/panel-mentors/kaseya.png") },
  { name: "Fynd", src: asset("images/logos/panel-mentors/fynd.png") },
  { name: "Zepto", src: asset("images/logos/panel-mentors/zepto.svg") },
  { name: "Mindtickle", src: asset("images/logos/panel-mentors/mindtickle.png") },
  { name: "Gartner", src: asset("images/logos/panel-mentors/gartner.png") },
  { name: "Freshworks", src: asset("images/logos/freshworks.png") },
  { name: "Salesforce", src: asset("images/logos/salesforce.png") },
  { name: "MongoDB", src: asset("images/logos/mongoDB.png") },
  { name: "Blinkit", src: asset("images/logos/blinkit.png") },
  { name: "MakeMyTrip", src: asset("images/logos/makemytrip.png") },
  { name: "Rapido", src: asset("images/logos/rapido.png") },
  { name: "Rippling", src: asset("images/logos/rippling.png") },
];

export const founderImage = asset("images/founders/Nikhil.jpeg");
export const revenueRolesDiagram = asset("images/home/revenue-roles-diagram.png");
export const hiveLogo = asset("images/misc/hiveschool-logo.png");
export const lifeAtHive = asset("images/misc/life-at-hive.webp");
export const admissionHero = asset("images/life/admission-image.avif");

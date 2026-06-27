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
  { name: "Rapido", src: asset("images/logos/rapido.png"), treatment: "mono" },
  {
    name: "Rippling",
    src: asset("images/logos/hiring-partners/rippling.svg"),
    treatment: "light",
  },
  { name: "Almabase", src: asset("images/logos/almabase.png"), treatment: "mono" },
  { name: "BBT", src: asset("images/logos/bbt.svg"), treatment: "mono" },
  { name: "Birdeye", src: asset("images/logos/birdeye.png"), treatment: "mono" },
  { name: "Blue Tokai", src: asset("images/logos/bluetokai.svg"), treatment: "mono" },
  { name: "Culture Circle", src: asset("images/logos/culture-circle.png"), treatment: "mono" },
  { name: "GOAT Brand Labs", src: asset("images/logos/goat.svg"), treatment: "mono" },
  { name: "Gully Labs", src: asset("images/logos/gullylabs.svg"), treatment: "mono" },
  { name: "Hiver", src: asset("images/logos/hiver.png"), treatment: "mono" },
  { name: "Pee Safe", src: asset("images/logos/peesafe.svg"), treatment: "mono" },
  { name: "Spyne", src: asset("images/logos/spyne.png"), treatment: "mono" },
  { name: "SuperYou", src: asset("images/logos/superyout.svg"), treatment: "mono" },
  { name: "Whatfix", src: asset("images/logos/whatfix.png"), treatment: "mono" },
  { name: "Yatra", src: asset("images/logos/yatra.png"), treatment: "color" },
  { name: "AWS", src: asset("images/logos/panel-mentors/aws.svg"), treatment: "color" },
  { name: "Cars24", src: asset("images/logos/panel-mentors/cars.png"), treatment: "mono" },
  { name: "Cipla", src: asset("images/logos/panel-mentors/cipla.svg"), treatment: "color" },
  { name: "Favcy", src: asset("images/logos/panel-mentors/favcy.png"), treatment: "mono" },
  { name: "INDmoney", src: asset("images/logos/panel-mentors/indmoney.png"), treatment: "mono" },
  { name: "Snitch", src: asset("images/logos/panel-mentors/snitch.webp"), treatment: "mono" },
  { name: "SquadStack", src: asset("images/logos/panel-mentors/squadstack.png"), treatment: "mono" },
  { name: "Tata", src: asset("images/logos/panel-mentors/tata.svg"), treatment: "mono" },
  { name: "Truefan", src: asset("images/logos/panel-mentors/truefan.png"), treatment: "mono" },
];

export const founderImage = asset("images/founders/Nikhil.jpeg");
export const revenueRolesDiagram = asset("images/home/revenue-roles-diagram.png");
export const hiveLogo = asset("images/misc/hiveschool-logo.png");
export const lifeAtHive = asset("images/misc/life-at-hive.webp");
export const admissionHero = asset("images/life/admission-image.avif");

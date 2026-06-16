import { asset } from "@/lib/assets";

export type Mentor = {
  name: string;
  role: string;
  companyLabel: string;
  image: string;
  companyLogo?: string;
  category: "Sales" | "Marketing" | "GTM" | "Strategy";
  sessions?: number;
};

export const mentorCategories = [
  "Sales",
  "Marketing",
  "GTM",
  "Strategy",
] as const;

export const mentors: Mentor[] = [
  {
    name: "Ashish Cherian",
    role: "Sr. Director of Worldwide Sales",
    companyLabel: "Adobe",
    image: asset("images/mentors/ashish-cherian.jpg"),
    companyLogo: asset("images/logos/adobe.png"),
    category: "Sales",
    sessions: 210,
  },
  {
    name: "Srivardhana Vanamamalai",
    role: "Head of New Acquisition Sales",
    companyLabel: "Google",
    image: asset("images/mentors/srivardhana-vanamamalai.png"),
    companyLogo: asset("images/logos/google.png"),
    category: "Sales",
    sessions: 86,
  },
  {
    name: "Yash Reddy",
    role: "CRO",
    companyLabel: "MoEngage",
    image: asset("images/mentors/yash-reddy.jpg"),
    companyLogo: asset("images/logos/panel-mentors/moengage.png"),
    category: "Sales",
    sessions: 175,
  },
  {
    name: "Siddharth Menon",
    role: "Former CMO",
    companyLabel: "Epigamia",
    image: asset("images/mentors/siddharth-menon.png"),
    companyLogo: asset("images/logos/panel-mentors/fixmycurls.webp"),
    category: "Marketing",
    sessions: 64,
  },
  {
    name: "Ragini Varma",
    role: "Chief Business Officer",
    companyLabel: "Fynd",
    image: asset("images/mentors/ragini-varma.jpg"),
    companyLogo: asset("images/logos/panel-mentors/fynd.png"),
    category: "GTM",
    sessions: 92,
  },
  {
    name: "Sidharth Bhakoo",
    role: "Chief Business Officer",
    companyLabel: "Swiggy",
    image: asset("images/mentors/sidharth-bhakoo.jpg"),
    companyLogo: asset("images/logos/panel-mentors/swiggy.webp"),
    category: "GTM",
    sessions: 140,
  },
  {
    name: "Spandun Gurha",
    role: "GTM & Strategy",
    companyLabel: "Microsoft",
    image: asset("images/mentors/spandun-gurha.jpg"),
    companyLogo: asset("images/logos/panel-mentors/microsoft.svg"),
    category: "Strategy",
    sessions: 58,
  },
  {
    name: "Akansha Yadav",
    role: "Director, Enterprise Partnerships",
    companyLabel: "Razorpay",
    image: asset("images/mentors/akansha-yadav.jpg"),
    companyLogo: asset("images/logos/panel-mentors/razorpay.svg"),
    category: "GTM",
    sessions: 95,
  },
  {
    name: "Mansi Kumar",
    role: "AVP",
    companyLabel: "Gartner",
    image: asset("images/mentors/mansi-kumar.jpg"),
    companyLogo: asset("images/logos/panel-mentors/gartner.png"),
    category: "Strategy",
    sessions: 72,
  },
  {
    name: "Sajjad",
    role: "Director, Commercial Sales",
    companyLabel: "Mindtickle",
    image: asset("images/mentors/sajjad.jpg"),
    companyLogo: asset("images/logos/panel-mentors/mindtickle.png"),
    category: "Sales",
    sessions: 118,
  },
  {
    name: "Zeeshan Jawed",
    role: "Director, Sales",
    companyLabel: "Kaseya",
    image: asset("images/mentors/zeeshan-jawed.jpg"),
    companyLogo: asset("images/logos/panel-mentors/kaseya.png"),
    category: "Sales",
    sessions: 84,
  },
  {
    name: "Anshita Mehrotra",
    role: "Founder",
    companyLabel: "Fix My Curls",
    image: asset("images/mentors/anshita-mehrotra.jpg"),
    companyLogo: asset("images/logos/panel-mentors/fixmycurls.webp"),
    category: "Marketing",
    sessions: 42,
  },
];

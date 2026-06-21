import { asset } from "@/lib/assets";

export type Mentor = {
  name: string;
  role: string;
  companyLabel: string;
  image: string;
  companyLogo?: string;
  category: "Sales" | "Marketing" | "GTM" | "Data and AI";
  sessions?: number;
};

export const mentorCategories = [
  "Marketing",
  "Sales",
  "GTM",
  "Data and AI",
] as const;

export const mentors: Mentor[] = [
  {
    name: "Saurabh Sen Gupta",
    role: "Former Sr VP",
    companyLabel: "Zomato",
    image: asset("images/mentors/saurabh-sen-gupta.jpg"),
    companyLogo: asset("images/logos/zomato.png"),
    category: "Marketing",
  },
  {
    name: "Ashish Cherian",
    role: "Sr. Director of Worldwide Sales",
    companyLabel: "Adobe",
    image: asset("images/mentors/ashish-cherian.jpg"),
    companyLogo: asset("images/logos/adobe.png"),
    category: "Sales",
  },
  {
    name: "Srivardhana Manamalai",
    role: "Head of New Acquisition Sales (North America)",
    companyLabel: "Google",
    image: asset("images/mentors/srivardhana-manamalai.png"),
    companyLogo: asset("images/logos/google.png"),
    category: "Sales",
  },
  {
    name: "Neha Gulati",
    role: "Former Head of Brand",
    companyLabel: "Nestlé",
    image: asset("images/mentors/neha-gulati.jpg"),
    category: "Marketing",
  },
  {
    name: "Siddharth Menon",
    role: "Former CMO",
    companyLabel: "Epigamia",
    image: asset("images/mentors/siddharth-menon.png"),
    category: "Marketing",
  },
  {
    name: "Anshita Mehrotra",
    role: "Founder",
    companyLabel: "Fix My Curls",
    image: asset("images/mentors/anshita-mehrotra.jpg"),
    companyLogo: asset("images/logos/panel-mentors/fixmycurls.webp"),
    category: "Marketing",
  },
  {
    name: "Rithish Kumar",
    role: "Founder",
    companyLabel: "PeeSafe",
    image: asset("images/mentors/rithish-kumar.jpg"),
    companyLogo: asset("images/logos/panel-mentors/peesafe.webp"),
    category: "Marketing",
  },
  {
    name: "Yash Kalra",
    role: "Founder",
    companyLabel: "GOAT",
    image: asset("images/mentors/yash-kalra.jpg"),
    companyLogo: asset("images/logos/panel-mentors/goat.png"),
    category: "Marketing",
  },
  {
    name: "Adhish",
    role: "Facilitator & Public Speaking Coach",
    companyLabel: "Google",
    image: asset("images/mentors/adhish-rane.jpg"),
    companyLogo: asset("images/logos/google.png"),
    category: "GTM",
  },
  {
    name: "Prabhu Guliani",
    role: "Former Head of Growth",
    companyLabel: "Libas",
    image: asset("images/mentors/prabhu-guliani.png"),
    category: "Marketing",
  },
  {
    name: "Vipul Maini",
    role: "Director Marketing",
    companyLabel: "Cvent",
    image: asset("images/mentors/vipul-maini.jpg"),
    category: "Marketing",
  },
  {
    name: "Sidharth Bhakoo",
    role: "Chief Business Officer",
    companyLabel: "Swiggy",
    image: asset("images/mentors/sidharth-bhakoo.jpg"),
    companyLogo: asset("images/logos/panel-mentors/swiggy.webp"),
    category: "GTM",
  },
  {
    name: "Aniket Singh",
    role: "Chief Business Officer",
    companyLabel: "Snitch",
    image: asset("images/mentors/aniket-singh.jpg"),
    companyLogo: asset("images/logos/panel-mentors/snitch.webp"),
    category: "Marketing",
  },
  {
    name: "Havish Madhypaty",
    role: "Vice President",
    companyLabel: "J.P. Morgan Chase & Co.",
    image: asset("images/mentors/havish-madhypaty.png"),
    category: "Data and AI",
  },
];

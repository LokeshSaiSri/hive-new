import { asset, cdnAsset } from "@/lib/assets";

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
    image: cdnAsset("images/mentors/saurabh-sen-gupta.jpg"),
    companyLogo: cdnAsset("images/logos/zomato.png"),
    category: "Marketing",
  },
  {
    name: "Ashish Cherian",
    role: "Sr. Director of Worldwide Sales",
    companyLabel: "Adobe",
    image: cdnAsset("images/mentors/ashish-cherian.jpg"),
    companyLogo: cdnAsset("images/logos/adobe.png"),
    category: "Sales",
  },
  {
    name: "Srivardhana Manamalai",
    role: "Head of New Acquisition Sales (North America)",
    companyLabel: "Google",
    image: cdnAsset("images/mentors/srivardhana-manamalai.png"),
    companyLogo: cdnAsset("images/logos/google.png"),
    category: "Sales",
  },
  {
    name: "Neha Gulati",
    role: "Former Head of Brand",
    companyLabel: "Nestlé",
    image: cdnAsset("images/mentors/neha-gulati.jpg"),
    category: "Marketing",
  },
  {
    name: "Siddharth Menon",
    role: "Former CMO",
    companyLabel: "Epigamia",
    image: cdnAsset("images/mentors/siddharth-menon.png"),
    category: "Marketing",
  },
  {
    name: "Anshita Mehrotra",
    role: "Founder",
    companyLabel: "Fix My Curls",
    image: cdnAsset("images/mentors/anshita-mehrotra.jpg"),
    companyLogo: cdnAsset("images/logos/panel-mentors/fixmycurls.webp"),
    category: "Marketing",
  },
  {
    name: "Rithish Kumar",
    role: "Founder",
    companyLabel: "PeeSafe",
    image: cdnAsset("images/mentors/ritish-kumar.png"),
    companyLogo: cdnAsset("images/logos/panel-mentors/peesafe.webp"),
    category: "Marketing",
  },
  {
    name: "Yash Kalra",
    role: "Founder",
    companyLabel: "GOAT",
    image: cdnAsset("images/mentors/yash-kalra.jpg"),
    companyLogo: cdnAsset("images/logos/panel-mentors/goat.png"),
    category: "Marketing",
  },
  {
    name: "Adhish",
    role: "Facilitator & Public Speaking Coach",
    companyLabel: "Google",
    image: cdnAsset("images/mentors/adhish-rane.jpg"),
    companyLogo: cdnAsset("images/logos/google.png"),
    category: "GTM",
  },
  {
    name: "Prabhu Guliani",
    role: "Former Head of Growth",
    companyLabel: "Libas",
    image: cdnAsset("images/mentors/prabhu-guliani.png"),
    category: "Marketing",
  },
  {
    name: "Vipul Maini",
    role: "Director Marketing",
    companyLabel: "Cvent",
    image: cdnAsset("images/mentors/vipul-maini.jpg"),
    category: "Marketing",
  },
  {
    name: "Sidharth Bhakoo",
    role: "Chief Business Officer",
    companyLabel: "Swiggy",
    image: cdnAsset("images/mentors/sidharth-bhakoo.jpg"),
    companyLogo: cdnAsset("images/logos/panel-mentors/swiggy.webp"),
    category: "GTM",
  },
  {
    name: "Aniket Singh",
    role: "Chief Business Officer",
    companyLabel: "Snitch",
    image: cdnAsset("images/mentors/aniket-singh.jpg"),
    companyLogo: cdnAsset("images/logos/panel-mentors/snitch.webp"),
    category: "Marketing",
  },
  {
    name: "Havish Madhypaty",
    role: "Vice President",
    companyLabel: "J.P. Morgan Chase & Co.",
    image: cdnAsset("images/mentors/havish-madhypaty.png"),
    category: "Data and AI",
  },
  {
    name: "Spandun Gurha",
    role: "GTM & Strategy",
    companyLabel: "Microsoft",
    image: cdnAsset("images/mentors/spandun-gurha.jpg"),
    category: "GTM",
  },
  {
    name: "Zeeshan Jawed",
    role: "Director Sales",
    companyLabel: "Kaseya",
    image: cdnAsset("images/mentors/zeeshan-jawed.jpg"),
    category: "Sales",
  },
  {
    name: "Trilok Kumar",
    role: "FMCG Manager",
    companyLabel: "Ex- Tata Consumer | Dabur | Reckitt | PepsiCo",
    image: cdnAsset("images/mentors/TRILOK KUMAR.jpg"),
    category: "GTM",
  },
  {
    name: "Akansha Yadav",
    role: "Director- Enterprise Partnership",
    companyLabel: "Razorpay",
    image: cdnAsset("images/mentors/akansha-yadav.jpg"),
    companyLogo: cdnAsset("images/logos/razorpay.png"),
    category: "Sales",
  },
  {
    name: "Shikha Nautiyal",
    role: "Senior manager",
    companyLabel: "AWS",
    image: cdnAsset("images/mentors/Shikha N..jpg"),
    category: "Data and AI",
  },

  {
    name: "Amit Jawar",
    role: "Vice President Sales & Marketing",
    companyLabel: "Patanjali",
    image: cdnAsset("images/mentors/amit-jawar.jpg"),
    category: "Marketing",
  },
  {
    name: "Ajay Singh",
    role: "Business Head",
    companyLabel: "Cipla",
    image: cdnAsset("images/mentors/Ajay Singh.jpg"),
    category: "Sales",
  },
];

import { asset, cdnAsset } from "@/lib/assets";

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  videoId?: string;
  image: string;
  quote?: string;
  linkedin?: string;
};

/** PGP Cohort 1 — student story videos & testimonials */
export const testimonials: Testimonial[] = [
  {
    name: "Ansh Agrawal",
    role: "GTM Manager — US, APAC",
    company: "Payoneer",
    companyLogo: cdnAsset("images/logos/payoneer-logo.png"),
    videoId: "ElAM04gXehQ",
    image: cdnAsset("images/students/Ansh.webp"),
  },
  {
    name: "Abhinav Srivastava",
    role: "Business Development Executive",
    company: "Culture Circle",
    companyLogo: cdnAsset("images/logos/culture-circle.png"),
    videoId: "_Am4lWnV2kc",
    image: cdnAsset("images/students/Abhinav.webp"),
  },
  {
    name: "Soham Chatterjee",
    role: "Founder's Office — Growth",
    company: "Dohful",
    companyLogo: cdnAsset("images/challenges/dohful.webp"),
    videoId: "1p3gZEkfg74",
    image: cdnAsset("images/students/Soham.webp"),
  },
  {
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    companyLogo: cdnAsset("images/logos/payoneer-logo.png"),
    videoId: "wh8cxiSDXeU",
    image: cdnAsset("images/students/Om.webp"),
  },
  {
    name: "Sanyu",
    role: "Business Development Representative",
    company: "Adobe",
    companyLogo: cdnAsset("images/logos/adobe.png"),
    videoId: "Z5ydfksTXNg",
    image: cdnAsset("images/students/Sanyu.webp"),
  },
  {
    name: "Tanishq",
    role: "Account Manager",
    company: "Kaseya",
    companyLogo: cdnAsset("images/logos/panel-mentors/kaseya.png"),
    videoId: "ECGkJ5jfKeM",
    image: cdnAsset("images/students/Tanishq.webp"),
  },
  {
    name: "Aryan Suri",
    role: "Business Development Representative",
    company: "Payoneer",
    companyLogo: cdnAsset("images/logos/payoneer-logo.png"),
    image: cdnAsset("images/students/Aryan.webp"),
    quote: "The fellowship changed how I look at performance marketing entirely. I went from zero to handling a live brand budget in just two months.",
    linkedin: "https://www.linkedin.com/in/suri-aryan/",
  },
  {
    name: "Hritik",
    role: "Founder's Office — Growth & Strategy",
    company: "Space Basic",
    image: cdnAsset("images/students/Hrithik.webp"),
    quote: "Working directly in a Founder's Office wouldn't have been possible without the rigorous challenges and portfolio we built here.",
    linkedin: "https://www.linkedin.com/in/hrithik-kaul/",
  },
  {
    name: "Soumya",
    role: "Customer Success Manager",
    company: "Yatra",
    companyLogo: cdnAsset("images/logos/yatra.png"),
    image: cdnAsset("images/students/Saumya.webp"),
    quote: "The mock interviews and resume reviews during the placement months were brutally honest, which made the actual Yatra interviews a breeze.",
    linkedin: "https://www.linkedin.com/in/somyaa-9802251b1/",
  },
  {
    name: "Harsh",
    role: "Founder's Office — Program Manager",
    company: "Vetic",
    image: cdnAsset("images/students/Harsh.webp"),
    quote: "I didn't just learn marketing; I learned how to manage projects, build dashboards, and scale revenue from Day 1.",
    linkedin: "https://www.linkedin.com/in/harsh-mehndiratta-770813216/",
  },
  {
    name: "Deepanshu",
    role: "Enterprise Sales Manager",
    company: "MyGate",
    image: cdnAsset("images/students/Deepanshu.webp"),
    quote: "The emphasis on enterprise sales and understanding B2B funnels gave me an immediate edge over other candidates at MyGate.",
    linkedin: "https://www.linkedin.com/in/deepanshu-profile/",
  },
];

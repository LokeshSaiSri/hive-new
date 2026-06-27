import { asset } from "@/lib/assets";

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  videoId?: string;
  image: string;
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
    name: "Aryan Suri",
    role: "Business Development Representative",
    company: "Payoneer",
    companyLogo: cdnAsset("images/logos/payoneer-logo.png"),
    videoId: "rFZLsmtruzM",
    image: cdnAsset("images/students/Aryan.webp"),
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
    name: "Hritik",
    role: "Founder's Office — Growth & Strategy",
    company: "Space Basic",
    videoId: "FtiZotYe_lg",
    image: cdnAsset("images/students/Hrithik.webp"),
  },
  {
    name: "Soumya",
    role: "Customer Success Manager",
    company: "Yatra",
    companyLogo: cdnAsset("images/logos/yatra.png"),
    videoId: "FtiZotYe_lg",
    image: cdnAsset("images/students/Saumya.webp"),
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
    name: "Harsh",
    role: "Founder's Office — Program Manager",
    company: "Vetic",
    videoId: "GF82mn2Hzw0",
    image: cdnAsset("images/students/Harsh.webp"),
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
    name: "Deepanshu",
    role: "Enterprise Sales Manager",
    company: "MyGate",
    videoId: "0RGQ76E6JW4",
    image: cdnAsset("images/students/Deepanshu.webp"),
  },
];

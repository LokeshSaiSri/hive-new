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
    companyLogo: asset("images/logos/payoneer-logo.png"),
    videoId: "ElAM04gXehQ",
    image: asset("images/students/Ansh.webp"),
  },
  {
    name: "Abhinav Srivastava",
    role: "Business Development Executive",
    company: "Culture Circle",
    companyLogo: asset("images/logos/culture-circle.png"),
    videoId: "_Am4lWnV2kc",
    image: asset("images/students/Abhinav.webp"),
  },
  {
    name: "Soham Chatterjee",
    role: "Founder's Office — Growth",
    company: "Dohful",
    companyLogo: asset("images/challenges/dohful.webp"),
    videoId: "1p3gZEkfg74",
    image: asset("images/students/Soham.webp"),
  },
  {
    name: "Aryan Suri",
    role: "Business Development Representative",
    company: "Payoneer",
    companyLogo: asset("images/logos/payoneer-logo.png"),
    videoId: "rFZLsmtruzM",
    image: asset("images/students/Aryan.webp"),
  },
  {
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    companyLogo: asset("images/logos/payoneer-logo.png"),
    videoId: "wh8cxiSDXeU",
    image: asset("images/students/Om.webp"),
  },
  {
    name: "Hritik",
    role: "Founder's Office — Growth & Strategy",
    company: "Space Basic",
    videoId: "FtiZotYe_lg",
    image: asset("images/students/Hrithik.webp"),
  },
  {
    name: "Soumya",
    role: "Customer Success Manager",
    company: "Yatra",
    companyLogo: asset("images/logos/yatra.png"),
    videoId: "FtiZotYe_lg",
    image: asset("images/students/Saumya.webp"),
  },
  {
    name: "Sanyu",
    role: "Business Development Representative",
    company: "Adobe",
    companyLogo: asset("images/logos/adobe.png"),
    videoId: "Z5ydfksTXNg",
    image: asset("images/students/Sanyu.webp"),
  },
  {
    name: "Harsh",
    role: "Founder's Office — Program Manager",
    company: "Vetic",
    videoId: "GF82mn2Hzw0",
    image: asset("images/students/Harsh.webp"),
  },
  {
    name: "Tanishq",
    role: "Account Manager",
    company: "Kaseya",
    companyLogo: asset("images/logos/panel-mentors/kaseya.png"),
    videoId: "ECGkJ5jfKeM",
    image: asset("images/students/Tanishq.webp"),
  },
  {
    name: "Deepanshu",
    role: "Enterprise Sales Manager",
    company: "MyGate",
    videoId: "0RGQ76E6JW4",
    image: asset("images/students/Deepanshu.webp"),
  },
];

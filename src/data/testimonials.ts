import { asset } from "@/lib/assets";

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  videoId: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Abhinav Srivastava",
    role: "Business Development Executive",
    company: "Culture Circle",
    companyLogo: asset("images/logos/culture-circle.png"),
    videoId: "_Am4lWnV2kc",
    image: asset("images/students/Abhinav.webp"),
  },
  {
    name: "Ansh Agrawal",
    role: "GTM Manager — US, APAC",
    company: "Payoneer",
    companyLogo: asset("images/logos/Payoneer.png"),
    videoId: "ElAM04gXehQ",
    image: asset("images/students/Ansh.webp"),
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
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    companyLogo: asset("images/logos/Payoneer.png"),
    videoId: "wh8cxiSDXeU",
    image: asset("images/students/Om.webp"),
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
    name: "Soham Chatterjee",
    role: "Growth Associate",
    company: "Dohful",
    companyLogo: asset("images/challenges/dohful.webp"),
    videoId: "1p3gZEkfg74",
    image: asset("images/students/Soham.webp"),
  },
  {
    name: "Himanshu",
    role: "Business Development",
    company: "Mindtickle",
    companyLogo: asset("images/logos/panel-mentors/mindtickle.png"),
    videoId: "gXlM2114NCA",
    image: asset("images/students/Himanshu.webp"),
  },
  {
    name: "Hrithik",
    role: "GTM Associate",
    company: "MoEngage",
    companyLogo: asset("images/logos/panel-mentors/moengage.png"),
    videoId: "FtiZotYe_lg",
    image: asset("images/students/Hrithik.webp"),
  },
];

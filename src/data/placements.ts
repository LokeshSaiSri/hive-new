import { asset } from "@/lib/assets";

export type AlumniPlacement = {
  name: string;
  role: string;
  company: string;
  image?: string;
  previous?: string;
  videoId?: string;
};

/** PGP Cohort 1 — residential placement outcomes */
export const pgpCohortAlumni: AlumniPlacement[] = [
  {
    name: "Ansh Agrawal",
    role: "GTM Manager — US, APAC",
    company: "Payoneer",
    image: asset("images/students/Ansh.webp"),
    previous: "Startup",
    videoId: "ElAM04gXehQ",
  },
  {
    name: "Abhinav Srivastava",
    role: "Business Development Executive",
    company: "Culture Circle",
    image: asset("images/students/Abhinav.webp"),
    previous: "Fresher",
    videoId: "_Am4lWnV2kc",
  },
  {
    name: "Soham Chatterjee",
    role: "Founder's Office — Growth",
    company: "Dohful",
    image: asset("images/students/Soham.webp"),
    previous: "Brand Challenge Winner",
    videoId: "1p3gZEkfg74",
  },
  {
    name: "Aryan Suri",
    role: "Business Development Representative",
    company: "Payoneer",
    image: asset("images/students/Aryan.webp"),
    previous: "Consulting",
    videoId: "rFZLsmtruzM",
  },
  {
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    image: asset("images/students/Om.webp"),
    previous: "Consulting",
    videoId: "wh8cxiSDXeU",
  },
  {
    name: "Hritik",
    role: "Founder's Office — Growth & Strategy",
    company: "Space Basic",
    image: asset("images/students/Hrithik.webp"),
    previous: "Fresher",
    videoId: "FtiZotYe_lg",
  },
  {
    name: "Soumya",
    role: "Customer Success Manager",
    company: "Yatra",
    image: asset("images/students/Saumya.webp"),
    previous: "Operations",
    videoId: "FtiZotYe_lg",
  },
  {
    name: "Sanyu",
    role: "Business Development Representative",
    company: "Adobe",
    image: asset("images/students/Sanyu.webp"),
    previous: "Engineering",
    videoId: "Z5ydfksTXNg",
  },
  {
    name: "Harsh",
    role: "Founder's Office — Program Manager",
    company: "Vetic",
    image: asset("images/students/Harsh.webp"),
    previous: "Fresher",
    videoId: "GF82mn2Hzw0",
  },
  {
    name: "Tanishq",
    role: "Account Manager",
    company: "Kaseya",
    image: asset("images/students/Tanishq.webp"),
    previous: "Sales",
    videoId: "ECGkJ5jfKeM",
  },
  {
    name: "Deepanshu",
    role: "Enterprise Sales Manager",
    company: "MyGate",
    image: asset("images/students/Deepanshu.webp"),
    previous: "B2B Sales",
    videoId: "0RGQ76E6JW4",
  },
];

export const alumniPlacements: AlumniPlacement[] = pgpCohortAlumni;

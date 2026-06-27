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
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    image: asset("images/students/Om.webp"),
    previous: "Consulting",
    videoId: "wh8cxiSDXeU",
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
    name: "Tanishq",
    role: "Account Manager",
    company: "Kaseya",
    image: asset("images/students/Tanishq.webp"),
    previous: "Sales",
    videoId: "ECGkJ5jfKeM",
  },
  {
    name: "Aryan Suri",
    role: "Business Development Representative",
    company: "Payoneer",
    image: asset("images/students/Aryan.webp"),
    previous: "Consulting",
  },
  {
    name: "Hritik",
    role: "Founder's Office — Growth & Strategy",
    company: "Space Basic",
    image: asset("images/students/Hrithik.webp"),
    previous: "Fresher",
  },
  {
    name: "Soumya",
    role: "Customer Success Manager",
    company: "Yatra",
    image: asset("images/students/Saumya.webp"),
    previous: "Operations",
  },
  {
    name: "Harsh",
    role: "Founder's Office — Program Manager",
    company: "Vetic",
    image: asset("images/students/Harsh.webp"),
    previous: "Fresher",
  },
  {
    name: "Deepanshu",
    role: "Enterprise Sales Manager",
    company: "MyGate",
    image: asset("images/students/Deepanshu.webp"),
    previous: "B2B Sales",
  },
];

export const alumniPlacements: AlumniPlacement[] = pgpCohortAlumni;

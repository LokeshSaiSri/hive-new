import { asset } from "@/lib/assets";

export type AlumniPlacement = {
  name: string;
  role: string;
  company: string;
  image?: string;
  previous?: string;
};

export const alumniPlacements: AlumniPlacement[] = [
  {
    name: "Jigisha Bhatnagar",
    role: "Sales & Account Management Associate",
    company: "Amazon",
    image: asset("images/students/Jigisha.png"),
    previous: "Fresher",
  },
  {
    name: "Ansh Agrawal",
    role: "GTM Manager — US, APAC",
    company: "Payoneer",
    image: asset("images/students/Ansh.webp"),
    previous: "Startup",
  },
  {
    name: "Sanyu",
    role: "Business Development Representative",
    company: "Adobe",
    image: asset("images/students/Sanyu.webp"),
    previous: "Engineering",
  },
  {
    name: "Om Mishra",
    role: "Business Development Representative",
    company: "Payoneer",
    image: asset("images/students/Om.webp"),
    previous: "Consulting",
  },
  {
    name: "Tanishq",
    role: "Account Manager",
    company: "Kaseya",
    image: asset("images/students/Tanishq.webp"),
    previous: "Sales",
  },
  {
    name: "Soham Chatterjee",
    role: "Growth Associate",
    company: "Dohful",
    image: asset("images/students/Soham.webp"),
    previous: "Brand Challenge Winner",
  },
  {
    name: "Abhinav Srivastava",
    role: "Business Development Executive",
    company: "Culture Circle",
    image: asset("images/students/Abhinav.webp"),
    previous: "Fresher",
  },
  {
    name: "Shreyancy Goyal",
    role: "FinOps Consultant",
    company: "Zenskar",
    image: asset("images/students/Shreyancy.png"),
    previous: "Finance",
  },
  {
    name: "Preeti Karn",
    role: "Founder's Office — Growth & Strategy",
    company: "Zeko AI",
    image: asset("images/students/Preeti.png"),
    previous: "Marketing",
  },
  {
    name: "Vedant Singh",
    role: "Founding BDR",
    company: "Alphabake",
    image: asset("images/students/Vedant.png"),
    previous: "Fresher",
  },
];

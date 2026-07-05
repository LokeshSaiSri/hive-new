import type { MetadataRoute } from "next";
import { SITE_DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#060f32",
    theme_color: "#060f32",
    lang: "en-IN",
    icons: [
      {
        src: "/assets/images/hiveschool_logo.jpeg",
        sizes: "200x200",
        type: "image/jpeg",
      },
      {
        src: "/apple-icon.jpeg",
        sizes: "200x200",
        type: "image/jpeg",
      },
    ],
  };
}

import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/seo/site";
import { getOgImageForPath } from "@/lib/seo/og-images";

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
};

export function buildPageMetadata({
  title,
  description = SITE_DEFAULT_DESCRIPTION,
  path,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imagePath = ogImage === DEFAULT_OG_IMAGE ? getOgImageForPath(canonicalPath) : ogImage;
  const imageUrl = absoluteUrl(encodeURI(imagePath).replace(/%2520/g, "%20"));

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function buildRootMetadata(): Metadata {
  return {
    ...buildPageMetadata({
      title: SITE_DEFAULT_TITLE,
      description: SITE_DEFAULT_DESCRIPTION,
      path: "/",
    }),
    title: SITE_DEFAULT_TITLE,
  };
}

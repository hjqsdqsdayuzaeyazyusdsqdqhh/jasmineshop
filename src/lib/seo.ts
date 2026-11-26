import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";

export function pageMetadata({
  locale,
  title,
  description,
  path,
  noindex = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const suffix = path === "/" ? "" : path;
  const canonical = `${siteConfig.url}/${locale}${suffix}`;
  const ogImage = `${siteConfig.url}/${locale}/opengraph-image`;
  const languageAlternates = {
    fr: `${siteConfig.url}/fr${suffix}`,
    ar: `${siteConfig.url}/ar${suffix}`,
    "x-default": `${siteConfig.url}/fr${suffix}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${title} · ${siteConfig.name}`,
      description,
      url: canonical,
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    ...(noindex
      ? { robots: { index: false, follow: true } }
      : { robots: { index: true, follow: true } }),
  };
}

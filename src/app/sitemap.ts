import type { MetadataRoute } from "next";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { locales } from "@/types";

const pages = [
  { path: routes.home, changeFrequency: "weekly" as const, priority: 1 },
  { path: routes.boutique, changeFrequency: "weekly" as const, priority: 0.9 },
  { path: routes.story, changeFrequency: "monthly" as const, priority: 0.7 },
  { path: routes.contact, changeFrequency: "yearly" as const, priority: 0.6 },
  { path: routes.faq, changeFrequency: "monthly" as const, priority: 0.6 },
  { path: routes.legal, changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => {
      const suffix = page.path === "/" ? "" : page.path;
      const url = `${siteConfig.url}/${locale}${suffix}`;

      return {
        url,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: locale === "fr" ? page.priority : Math.min(page.priority, 0.8),
        alternates: {
          languages: Object.fromEntries(
            locales.map((altLocale) => [
              altLocale,
              `${siteConfig.url}/${altLocale}${suffix}`,
            ]),
          ),
        },
      };
    }),
  );
}

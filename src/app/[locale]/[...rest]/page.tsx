import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, getDictionary, isLocale } from "@/config/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.notFound.title,
    description: dict.notFound.description,
    robots: { index: false, follow: false },
  };
}

/**
 * Any unknown path under a valid locale renders the localized 404 page
 * (with the site header/footer and correct reading direction).
 */
export default function CatchAllNotFound() {
  notFound();
}

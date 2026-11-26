import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PreparedCollectionPage } from "@/components/common/prepared-collection-page";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/config/i18n";
import { routes } from "@/config/navigation";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return pageMetadata({
    locale,
    title: dict.collections.bestsellers.title,
    description: dict.collections.bestsellers.description,
    path: routes.bestsellers,
    noindex: true,
  });
}

export default async function BestsellersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;

  return (
    <PreparedCollectionPage
      locale={locale}
      dict={getDictionary(locale)}
      collection="bestsellers"
    />
  );
}

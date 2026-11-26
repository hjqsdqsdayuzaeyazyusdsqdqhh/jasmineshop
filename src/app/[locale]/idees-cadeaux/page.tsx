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
    title: dict.collections.gifts.title,
    description: dict.collections.gifts.description,
    path: routes.gifts,
    noindex: true,
  });
}

export default async function GiftsPage({
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
      collection="gifts"
    />
  );
}

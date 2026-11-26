import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHero } from "@/components/common/page-hero";
import { Container } from "@/components/ui/container";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizedPath,
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
    title: dict.wishlist.title,
    description: dict.wishlist.description,
    path: routes.wishlist,
    noindex: true,
  });
}

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <main id="main" className="flex-1">
      <PageHero
        breadcrumbs={[
          { label: dict.common.home, href: localizedPath(locale, "/") },
          { label: dict.nav.wishlist },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.wishlist.eyebrow}
        title={dict.wishlist.title}
        description={dict.wishlist.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <EmptyState
            icon={Heart}
            title={dict.wishlist.emptyTitle}
            description={dict.wishlist.emptyText}
            ctaLabel={dict.wishlist.cta}
            ctaHref={localizedPath(locale, routes.boutique)}
          />
        </Container>
      </section>
    </main>
  );
}

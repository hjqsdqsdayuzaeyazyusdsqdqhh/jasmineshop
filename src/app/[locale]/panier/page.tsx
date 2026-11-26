import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Banknote, RotateCcw, ShoppingBag, Truck } from "lucide-react";
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
    title: dict.cart.title,
    description: dict.cart.description,
    path: routes.cart,
    noindex: true,
  });
}

export default async function CartPage({
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

  const trustItems = [
    { icon: Banknote, title: dict.cart.codTitle, text: dict.cart.codText },
    { icon: Truck, title: dict.cart.delivery, text: dict.cart.deliveryText },
    { icon: RotateCcw, title: dict.cart.returns, text: dict.cart.returnsText },
  ];

  return (
    <main id="main" className="flex-1">
      <PageHero
        breadcrumbs={[
          { label: dict.common.home, href: localizedPath(locale, "/") },
          { label: dict.nav.cart },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.cart.eyebrow}
        title={dict.cart.title}
        description={dict.cart.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <EmptyState
            icon={ShoppingBag}
            title={dict.cart.emptyTitle}
            description={dict.cart.emptyText}
            ctaLabel={dict.cart.cta}
            ctaHref={localizedPath(locale, routes.boutique)}
          />

          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-ivory-200 bg-ivory-50 p-4"
              >
                <item.icon
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-gold-600"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[0.78rem] font-semibold text-wine-950">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[0.68rem] leading-relaxed text-smoke">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

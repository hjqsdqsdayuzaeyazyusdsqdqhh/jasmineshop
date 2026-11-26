import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/product-gallery";
import { OrderForm } from "@/components/product/order-form";
import { formatPrice } from "@/lib/utils";
import {
  getProductBySlug,
  productPath,
  productSlugs,
} from "@/data/products";
import { withImageAvailability } from "@/lib/product-images";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizedPath,
} from "@/config/i18n";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { locales } from "@/types";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return pageMetadata({
    locale,
    title: product.name[locale],
    description: product.description[locale],
    path: productPath(product.slug),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const locale = rawLocale;
  const dict = getDictionary(locale);
  const images = withImageAvailability(product.images);
  const categoryHref = `${localizedPath(locale, routes.boutique)}#maison`;
  const productHref = localizedPath(locale, productPath(product.slug));
  const canonical = `${siteConfig.url}${productHref}`;
  const availableImageUrls = images
    .filter((image) => image.available)
    .map((image) => `${siteConfig.url}${image.src}`);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.description[locale],
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.category.name[locale],
    ...(availableImageUrls.length > 0 ? { image: availableImageUrls } : {}),
    offers: {
      "@type": "Offer",
      url: canonical,
      price: product.price,
      priceCurrency: "MAD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <main id="main" className="flex-1 pb-24 md:pb-0">
      <div className="border-b border-ivory-200 bg-white">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              {
                label: dict.common.home,
                href: localizedPath(locale, "/"),
              },
              {
                label: dict.nav.shop,
                href: localizedPath(locale, routes.boutique),
              },
              {
                label: product.category.name[locale],
                href: categoryHref,
              },
              { label: product.name[locale] },
            ]}
            label={dict.common.breadcrumb}
          />
        </Container>
      </div>

      <section className="bg-white py-8 sm:py-12 lg:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12 xl:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGallery
                images={images}
                productName={product.name[locale]}
                locale={locale}
                labels={{
                  galleryLabel: dict.productPage.galleryLabel,
                  imagePending: dict.productPage.imagePending,
                  viewImage: dict.productPage.viewImage,
                }}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={categoryHref}
                  className="micro text-gold-700 transition-colors hover:text-wine-800"
                >
                  {product.category.name[locale]}
                </Link>
                <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-wine-800">
                  <span
                    className="size-1.5 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  {product.inStock
                    ? dict.productPage.inStock
                    : dict.productPage.outOfStock}
                </span>
              </div>

              <h1 className="mt-2.5 max-w-xl font-display text-[clamp(1.85rem,3.6vw,2.7rem)] leading-[1.08] text-wine-950">
                {product.name[locale]}
              </h1>

              <div className="mt-4 border-b border-ivory-200 pb-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <p className="font-display text-[2.1rem] leading-none text-wine-950">
                    <span dir="ltr">{formatPrice(product.price, locale)}</span>
                  </p>
                  <span className="rounded-full border border-gold-400/30 bg-ivory-50 px-3 py-1.5 text-[0.6rem] font-semibold text-gold-700">
                    {dict.productPage.cod}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.7rem] text-smoke">
                  {dict.productPage.priceNote}
                </p>
              </div>

              <div id="commander" className="mt-5 scroll-mt-28">
                <OrderForm product={product} locale={locale} dict={dict} />
              </div>

              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.66rem] text-smoke">
                <div className="flex gap-1.5">
                  <dt>{dict.productPage.sku}:</dt>
                  <dd className="text-ink-soft">{product.sku}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>{dict.productPage.category}:</dt>
                  <dd className="text-ink-soft">{product.category.name[locale]}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-ivory-200 bg-ivory-100 py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">{dict.productPage.featuresEyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.3rem)] text-wine-950">
                {dict.productPage.featuresTitle}
              </h2>
              <p className="mt-4 text-[0.88rem] leading-[1.9] text-smoke">
                {product.description[locale]}
              </p>
              <ul className="mt-5 space-y-3">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight[locale]}
                    className="flex items-start gap-3 text-[0.86rem] text-ink-soft"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold-400/35 text-gold-600">
                      <Check size={11} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    {highlight[locale]}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="micro text-gold-700">
                  {dict.productPage.roomsTitle}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {product.rooms.map((room) => (
                    <li
                      key={room[locale]}
                      className="rounded-full border border-ivory-200 bg-white px-3 py-1.5 text-[0.7rem] text-ink-soft"
                    >
                      {room[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="eyebrow">{dict.productPage.specsEyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.3rem)] text-wine-950">
                {dict.productPage.specsTitle}
              </h2>
              <dl className="mt-5 divide-y divide-ivory-200 border-y border-ivory-200">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label[locale]}
                    className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
                  >
                    <dt className="text-[0.7rem] font-semibold text-smoke">
                      {spec.label[locale]}
                    </dt>
                    <dd className="text-[0.82rem] text-ink-soft">
                      {spec.value[locale]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ivory-200 bg-ivory-50/95 px-4 py-3 shadow-[0_-12px_30px_-24px_rgba(82,16,37,0.35)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="text-[0.6rem] text-smoke">
              {dict.productPage.priceNote}
            </p>
            <p className="font-display text-[1.2rem] leading-tight text-wine-950">
              <span dir="ltr">{formatPrice(product.price, locale)}</span>
            </p>
          </div>
          <a
            href="#commander"
            className={buttonStyles({
              size: "md",
              className: "min-w-[9.5rem]",
            })}
          >
            {dict.productPage.orderCta}
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </main>
  );
}

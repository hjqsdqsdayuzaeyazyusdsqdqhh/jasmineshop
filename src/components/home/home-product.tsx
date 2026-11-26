import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductVisual } from "@/components/product/product-visual";
import { formatPrice } from "@/lib/utils";
import { products, productPath } from "@/data/products";
import { withImageAvailability } from "@/lib/product-images";
import { localizedPath } from "@/config/i18n";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function HomeProduct({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const product = products[0];
  if (!product) return null;

  const mainImage = withImageAvailability([product.images[0]])[0];
  const productHref = localizedPath(locale, productPath(product.slug));
  const orderHref = `${productHref}#commander`;

  return (
    <section className="relative overflow-hidden border-y border-ivory-200 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative order-1 mx-auto w-full max-w-[30rem] lg:order-1">
            <div
              className="absolute -inset-2.5 rounded-[2rem] border border-gold-400/25"
              aria-hidden="true"
            />
            <ProductVisual
              image={mainImage}
              productName={product.name[locale]}
              locale={locale}
              pendingLabel={dict.productPage.imagePending}
              priority
            />
            <span className="absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-ivory-200 bg-ivory-50/95 px-3 py-1.5 text-[0.6rem] font-semibold text-wine-800 backdrop-blur">
              <span
                className="size-1.5 rounded-full bg-gold-500"
                aria-hidden="true"
              />
              {product.inStock
                ? dict.productPage.inStock
                : dict.productPage.outOfStock}
            </span>
          </div>

          <div className="order-2 lg:order-2">
            <p className="eyebrow">{dict.home.product.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] text-wine-950">
              {product.name[locale]}
            </h2>
            <p className="mt-4 max-w-xl text-[0.93rem] leading-[1.9] text-smoke">
              {product.description[locale]}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {product.highlights.slice(0, 3).map((highlight) => (
                <li
                  key={highlight[locale]}
                  className="rounded-full border border-ivory-200 bg-ivory-50 px-3 py-1.5 text-[0.7rem] text-ink-soft"
                >
                  {highlight[locale]}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-y border-ivory-200 py-4">
              <div>
                <p className="font-display text-[2rem] leading-none text-wine-950">
                  <span dir="ltr">{formatPrice(product.price, locale)}</span>
                </p>
                <p className="mt-1.5 text-[0.7rem] text-smoke">
                  {dict.productPage.priceNote}
                </p>
              </div>
              <span className="micro text-[0.55rem] text-gold-700">
                {product.category.name[locale]}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href={productHref}
                size="lg"
                iconRight={<ArrowRight size={16} className="rtl:rotate-180" />}
              >
                {dict.home.product.cta}
              </ButtonLink>
              <ButtonLink href={orderHref} variant="outline" size="lg">
                {dict.productPage.orderCta}
              </ButtonLink>
            </div>

            <p className="mt-4 text-[0.7rem] text-smoke">
              {dict.home.product.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

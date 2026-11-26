import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductPlaceholder } from "@/components/product/product-placeholder";
import { formatPrice } from "@/lib/utils";
import { products, productPath } from "@/data/products";
import { withImageAvailability } from "@/lib/product-images";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function HomeNouveautes({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.home.nouveautes;

  if (products.length === 0) return null;

  return (
    <section className="border-y border-ivory-200 bg-ivory-100 py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="flex items-center justify-center gap-4">
          <span
            className="h-px w-10 bg-wine-900/15 sm:w-20"
            aria-hidden="true"
          />
          <div className="flex items-center gap-2.5">
            <JasmineFlower
              className="size-5 shrink-0 text-wine-600"
              strokeWidth={1.3}
            />
            <h2 className="font-display text-[1.9rem] leading-none text-wine-950 sm:text-[2.35rem]">
              {copy.title}
            </h2>
          </div>
          <span
            className="h-px w-10 bg-wine-900/15 sm:w-20"
            aria-hidden="true"
          />
        </div>

        <p className="mx-auto mt-3 max-w-xl text-center text-[0.84rem] leading-relaxed text-smoke">
          {copy.description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {products.map((product) => {
            const image = withImageAvailability([product.images[0]])[0];
            const href = localizedPath(locale, productPath(product.slug));

            return (
              <article
                key={product.id}
                className="group flex w-full max-w-[19rem] flex-col overflow-hidden rounded-2xl border border-ivory-200 bg-white shadow-[0_22px_50px_-40px_rgba(82,16,37,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-38px_rgba(82,16,37,0.45)]"
              >
                <Link
                  href={href}
                  className="relative block aspect-square overflow-hidden bg-ivory-50"
                  aria-label={product.name[locale]}
                >
                  {image?.available ? (
                    <Image
                      src={image.src}
                      alt={image.alt[locale]}
                      fill
                      sizes="(min-width: 768px) 304px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <ProductPlaceholder
                      productName={product.name[locale]}
                      label={image?.label[locale] ?? ""}
                      pendingLabel={dict.productPage.imagePending}
                    />
                  )}
                  <span className="absolute start-3 top-3 rounded-full bg-wine-800 px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ivory-50">
                    {copy.badge}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <p className="micro text-[0.52rem] text-gold-700">
                    {product.category.name[locale]}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.16rem] leading-snug text-wine-950">
                    <Link
                      href={href}
                      className="transition-colors hover:text-wine-700"
                    >
                      {product.name[locale]}
                    </Link>
                  </h3>

                  <div className="mt-3 flex items-end justify-between gap-3 border-t border-ivory-200 pt-3">
                    <p className="font-display text-[1.45rem] leading-none text-wine-950">
                      <span dir="ltr">
                        {formatPrice(product.price, locale)}
                      </span>
                    </p>
                    <span className="text-[0.62rem] font-semibold text-wine-800">
                      {product.inStock
                        ? dict.productPage.inStock
                        : dict.productPage.outOfStock}
                    </span>
                  </div>

                  <ButtonLink
                    href={`${href}#commander`}
                    size="md"
                    fullWidth
                    className="mt-3"
                    iconRight={
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    }
                  >
                    {copy.order}
                  </ButtonLink>
                </div>

                <div className="flex items-center justify-center gap-1.5 border-t border-ivory-200 bg-ivory-50 px-3 py-2 text-[0.62rem] font-medium text-wine-800">
                  <Truck
                    size={12}
                    strokeWidth={1.6}
                    className="text-gold-600"
                    aria-hidden="true"
                  />
                  {copy.freeDelivery}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <ButtonLink
            href={localizedPath(locale, routes.boutique)}
            variant="outline"
            size="md"
            iconRight={<ArrowRight size={15} className="rtl:rotate-180" />}
          >
            {copy.all}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

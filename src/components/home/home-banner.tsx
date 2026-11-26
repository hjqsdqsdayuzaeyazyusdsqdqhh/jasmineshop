import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import { products, productPath } from "@/data/products";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function HomeBanner({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.home.banner;
  const product = products[0];

  return (
    <section className="bg-white pt-4 sm:pt-6 lg:pt-8">
      <Container>
        <h1 className="sr-only">{copy.title}</h1>

        <div className="relative overflow-hidden rounded-2xl border border-ivory-200 bg-ivory-100 shadow-[0_30px_80px_-50px_rgba(82,16,37,0.45)] sm:rounded-[2rem]">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            <Image
              src="/images/home/hero-jasmineshop.png"
              alt={copy.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1280px, (min-width: 768px) calc(100vw - 3rem), 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-[0.72rem] text-smoke sm:text-start">
            {dict.home.nouveautes.freeDelivery}
            <span className="mx-2 text-gold-500" aria-hidden="true">
              ·
            </span>
            {dict.announcement.payment}
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            <ButtonLink
              href={localizedPath(locale, routes.boutique)}
              size="md"
              iconRight={<ArrowRight size={15} className="rtl:rotate-180" />}
            >
              {copy.cta}
            </ButtonLink>
            {product ? (
              <ButtonLink
                href={localizedPath(locale, productPath(product.slug))}
                variant="outline"
                size="md"
              >
                {copy.ctaOrder}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

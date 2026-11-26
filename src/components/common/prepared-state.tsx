import { Check } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function PreparedState({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.prepared;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2rem] border border-ivory-200 bg-ivory-50 p-6 shadow-[0_30px_80px_-50px_rgba(82,16,37,0.3)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[19rem]">
            <div
              className="arch absolute -inset-2 border border-gold-400/30"
              aria-hidden="true"
            />
            <div className="arch relative aspect-4/5 overflow-hidden bg-wine-900">
              <div
                className="pattern-zellige pointer-events-none absolute inset-0 opacity-30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,161,91,0.18),transparent_62%)]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-[13%] bottom-[11%] top-[9%] arch border border-gold-300/25"
                aria-hidden="true"
              />
              <JasmineFlower
                className="absolute left-1/2 top-[38%] size-32 -translate-x-1/2 -translate-y-1/2 text-gold-300/85"
                strokeWidth={0.8}
              />
              <div className="absolute inset-x-5 bottom-7 text-center">
                <p className="micro text-[0.52rem] text-gold-300">
                  {dict.common.since}
                </p>
                <p className="mt-2 font-display text-[1.2rem] text-ivory-50">
                  JasmineShop
                </p>
                <p className="mt-1 text-[0.62rem] text-ivory-200/65">
                  Casablanca · Maroc
                </p>
              </div>
            </div>
          </div>

          <div>
            <Badge tone="gold">{copy.badge}</Badge>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.12] text-wine-950">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-lg text-[0.92rem] leading-[1.9] text-smoke">
              {copy.description}
            </p>

            <ul className="mt-6 space-y-3">
              {copy.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold-400/35 text-gold-600">
                    <Check size={11} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="text-[0.84rem] text-ink-soft">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href={localizedPath(locale, routes.boutique)}
                size="md"
              >
                {copy.ctaPrimary}
              </ButtonLink>
              <ButtonLink
                href={localizedPath(locale, routes.contact)}
                variant="outline"
                size="md"
              >
                {copy.ctaSecondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

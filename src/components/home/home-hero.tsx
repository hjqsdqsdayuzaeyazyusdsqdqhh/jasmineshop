import { ArrowRight } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

export function HomeHero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.home.hero;
  const isArabic = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-ivory-100">
      <div
        className="pattern-zellige pointer-events-none absolute inset-0 opacity-45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(242,203,215,0.5),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-52 -start-32 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.16),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-10 sm:py-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16 lg:py-20 xl:gap-20">
          <div className="max-w-[35rem] animate-fade-up">
            <p className="eyebrow">{copy.eyebrow}</p>

            <h1 className="mt-6 font-display text-hero text-wine-950">
              <span className="block">{copy.titleStart}</span>
              <span
                className={cn(
                  "block",
                  isArabic ? "text-wine-700" : "italic text-wine-600",
                )}
              >
                {copy.titleAccent}
              </span>
            </h1>

            <p className="mt-6 max-w-[31rem] text-[0.95rem] leading-[1.9] text-smoke">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={localizedPath(locale, routes.boutique)}
                size="lg"
                iconRight={<ArrowRight size={16} className="rtl:rotate-180" />}
              >
                {copy.ctaPrimary}
              </ButtonLink>
              <ButtonLink
                href={localizedPath(locale, routes.story)}
                variant="outline"
                size="lg"
              >
                {copy.ctaSecondary}
              </ButtonLink>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-wine-900/10 pt-5 text-[0.7rem] text-smoke">
              <span className="flex items-center gap-2">
                <JasmineFlower className="size-3.5 text-gold-500" />
                {copy.seal}
              </span>
              <span
                className="size-1 rotate-45 bg-gold-500/60"
                aria-hidden="true"
              />
              <span>{copy.panelFooter}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[31rem] pb-24 sm:pb-20">
            <div
              className="arch absolute -inset-2.5 border border-gold-400/35 sm:-inset-4"
              aria-hidden="true"
            />
            <div className="arch relative aspect-4/5 overflow-hidden bg-wine-900 shadow-[0_40px_100px_-45px_rgba(82,16,37,0.55)]">
              <div
                className="pattern-zellige pointer-events-none absolute inset-0 opacity-30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,161,91,0.22),transparent_62%)]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-[13%] bottom-[11%] top-[9%] arch border border-gold-300/25"
                aria-hidden="true"
              />

              <span className="absolute start-5 top-5 z-10 rounded-full border border-gold-300/30 bg-wine-950/35 px-3 py-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-gold-200 backdrop-blur">
                {copy.seal}
              </span>

              <JasmineFlower
                className="absolute left-1/2 top-[38%] size-36 -translate-x-1/2 -translate-y-1/2 text-gold-300/85 sm:size-44"
                strokeWidth={0.8}
              />

              <div className="absolute inset-x-5 bottom-8 text-center">
                <p className="micro text-[0.52rem] text-gold-300">
                  {copy.panelEyebrow}
                </p>
                <p className="mt-1 text-[0.68rem] text-ivory-200/65">
                  {copy.panelFooter}
                </p>
              </div>
            </div>

            <div className="absolute -bottom-14 start-4 end-4 rounded-2xl border border-ivory-200 bg-ivory-50 p-4 shadow-[0_24px_55px_-30px_rgba(82,16,37,0.45)] sm:-bottom-12 sm:-start-5 sm:end-auto sm:max-w-[17rem]">
              <p className="font-display text-[1.08rem] leading-snug text-wine-950">
                {copy.panelTitle}
              </p>
              <p className="mt-1.5 text-[0.74rem] leading-relaxed text-smoke">
                {copy.panelText}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

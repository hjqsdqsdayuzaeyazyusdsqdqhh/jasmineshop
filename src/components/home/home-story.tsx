import { JasmineFlower } from "@/components/common/jasmine-flower";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function HomeStory({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.home.story;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[29rem]">
            <div
              className="arch absolute -inset-3 border border-gold-400/25"
              aria-hidden="true"
            />
            <div className="arch relative aspect-4/5 overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200">
              <div
                className="pattern-zellige pointer-events-none absolute inset-0 opacity-45"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-[13%] bottom-[10%] top-[8%] arch border border-gold-500/25 bg-white/20"
                aria-hidden="true"
              />
              <JasmineFlower
                className="absolute left-1/2 top-[33%] size-40 -translate-x-1/2 -translate-y-1/2 text-wine-800/20"
                strokeWidth={0.9}
              />
              <div className="absolute inset-x-5 bottom-6 rounded-2xl bg-wine-900 p-5 text-ivory-50 shadow-float sm:inset-x-7 sm:bottom-8 sm:p-6">
                <p className="font-display text-[1.25rem] leading-snug">
                  “{dict.story.quote}”
                </p>
                <p className="micro mt-3 text-[0.52rem] text-gold-300">
                  JasmineShop · Casablanca
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] text-wine-950">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-lg text-[0.93rem] leading-[1.9] text-smoke">
              {copy.description}
            </p>
            <div className="mt-7">
              <ButtonLink
                href={localizedPath(locale, routes.story)}
                variant="outline"
              >
                {copy.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

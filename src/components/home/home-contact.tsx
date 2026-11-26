import { Mail } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function HomeContact({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.home.contact;

  return (
    <section className="bg-ivory-100 py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-ivory-200 bg-white px-6 py-9 shadow-soft sm:px-10 sm:py-11 lg:px-14">
          <div
            className="pattern-zellige pointer-events-none absolute inset-0 opacity-25"
            aria-hidden="true"
          />
          <JasmineFlower
            className="pointer-events-none absolute -end-12 -bottom-16 size-64 text-gold-500/10"
            strokeWidth={0.9}
          />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-wine-950">
                {copy.title}
              </h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-smoke">
                {copy.description}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
              <ButtonLink
                href={localizedPath(locale, routes.contact)}
                iconLeft={<Mail size={15} strokeWidth={1.7} />}
              >
                {copy.cta}
              </ButtonLink>
              <p className="text-[0.68rem] text-smoke md:text-end">{copy.note}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

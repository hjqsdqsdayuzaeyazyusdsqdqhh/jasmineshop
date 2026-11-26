import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { PageHero } from "@/components/common/page-hero";
import { UniverseIcon } from "@/components/common/universe-icon";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    title: dict.nav.shop,
    description: dict.boutique.description,
    path: routes.boutique,
  });
}

export default async function BoutiquePage({
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
          { label: dict.nav.shop },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.boutique.eyebrow}
        title={dict.boutique.title}
        description={dict.boutique.description}
        actions={
          <ButtonLink
            href={localizedPath(locale, routes.contact)}
            variant="outline"
          >
            {dict.common.contactUs}
          </ButtonLink>
        }
      />

      <section className="bg-white pb-16 sm:pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-ivory-200 bg-ivory-100/60 px-6 py-10 sm:px-10">
            <JasmineFlower
              className="pointer-events-none absolute -end-10 -top-12 size-48 text-gold-500/15"
              strokeWidth={0.8}
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <p className="micro text-gold-700">01</p>
                <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-wine-950">
                  {dict.boutique.manifestoTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-[0.92rem] leading-[1.9] text-smoke">
                {dict.boutique.manifestoText}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ivory-100 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dict.home.universes.eyebrow}
            title={dict.boutique.universesTitle}
            description={dict.boutique.universesDescription}
          />

          <div className="mt-9 space-y-4">
            {dict.universes.map((universe, index) => (
              <article
                key={universe.id}
                id={universe.id}
                className="scroll-mt-28 rounded-[1.75rem] border border-ivory-200 bg-white p-6 sm:p-8"
              >
                <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:gap-8">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="flex size-12 items-center justify-center rounded-full bg-ivory-100 text-wine-800">
                      <UniverseIcon id={universe.id} size={22} />
                    </span>
                    <span className="micro text-[0.55rem] text-gold-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <p className="micro text-gold-700">{universe.tagline}</p>
                    <h3 className="mt-1.5 font-display text-[1.7rem] leading-tight text-wine-950">
                      {universe.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[0.88rem] leading-relaxed text-smoke">
                      {universe.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {universe.expectations.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 rounded-full border border-ivory-200 bg-ivory-50 px-3 py-1.5 text-[0.68rem] text-ink-soft"
                        >
                          <Check
                            size={10}
                            strokeWidth={2.2}
                            className="text-gold-600"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ArrowLink href={localizedPath(locale, routes.story)}>
              {dict.home.story.cta}
            </ArrowLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

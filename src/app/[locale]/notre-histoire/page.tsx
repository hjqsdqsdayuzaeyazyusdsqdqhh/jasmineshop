import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heart, Leaf, Sparkles } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { PageHero } from "@/components/common/page-hero";
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

const valueIcons = [Sparkles, Leaf, Heart];

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
    title: dict.nav.story,
    description: dict.story.description,
    path: routes.story,
  });
}

export default async function StoryPage({
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
          { label: dict.nav.story },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.story.eyebrow}
        title={dict.story.title}
        description={dict.story.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-gold-400/25 bg-ivory-50 p-8 sm:p-10">
              <JasmineFlower
                className="pointer-events-none absolute -end-8 -top-10 size-32 text-gold-500/20"
                strokeWidth={0.8}
              />
              <p className="relative font-display text-[1.7rem] leading-snug text-wine-950 sm:text-[1.9rem]">
                “{dict.story.quote}”
              </p>
              <p className="micro relative mt-4 text-gold-700">
                JasmineShop · Casablanca
              </p>
            </div>

            <div className="mt-12 space-y-12">
              {dict.story.sections.map((section) => (
                <article key={section.title}>
                  <h2 className="font-display text-[1.65rem] leading-tight text-wine-950">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.94rem] leading-[1.95] text-smoke"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ivory-100 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dict.story.eyebrow}
            title={dict.story.valuesTitle}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.story.values.map((value, index) => {
              const Icon = valueIcons[index] ?? Sparkles;

              return (
                <div
                  key={value.title}
                  className="rounded-[1.5rem] border border-ivory-200 bg-white p-6"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-ivory-100 text-gold-600">
                    <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.3rem] text-wine-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-smoke">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <ButtonLink href={localizedPath(locale, routes.boutique)}>
              {dict.story.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

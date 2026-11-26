import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Container } from "@/components/ui/container";
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
    title: dict.legal.title,
    description: dict.legal.description,
    path: routes.legal,
  });
}

export default async function LegalPage({
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
          { label: dict.footer.legal },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.legal.eyebrow}
        title={dict.legal.title}
        description={dict.legal.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="micro text-smoke">{dict.legal.tocTitle}</p>
              <ul className="mt-4 space-y-2 border-s border-ivory-200 ps-4">
                {dict.legal.sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-[0.78rem] text-smoke transition-colors hover:text-wine-800"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.68rem] text-smoke-light">
                {dict.legal.updated}
              </p>
            </aside>

            <div className="max-w-3xl">
              {dict.legal.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-b border-ivory-200 py-8 first:pt-0 last:border-0"
                >
                  <h2 className="font-display text-[1.55rem] leading-tight text-wine-950">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.88rem] leading-[1.95] text-smoke"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

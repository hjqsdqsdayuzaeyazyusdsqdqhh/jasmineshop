import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { ButtonLink } from "@/components/ui/button";
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
    title: dict.faq.title,
    description: dict.faq.description,
    path: routes.faq,
  });
}

export default async function FaqPage({
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
          { label: dict.footer.faq },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.faq.eyebrow}
        title={dict.faq.title}
        description={dict.faq.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <nav
            aria-label={dict.faq.title}
            className="flex flex-wrap gap-2 border-b border-ivory-200 pb-8"
          >
            {dict.faq.groups.map((group) => (
              <Link
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-ivory-300 bg-ivory-50 px-4 py-2 text-[0.72rem] font-medium text-ink-soft transition-colors hover:border-wine-800/30 hover:text-wine-800"
              >
                {group.title}
              </Link>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {dict.faq.groups.map((group) => (
              <section
                key={group.id}
                id={group.id}
                className="scroll-mt-28"
                aria-labelledby={`faq-${group.id}`}
              >
                <h2
                  id={`faq-${group.id}`}
                  className="font-display text-[1.6rem] leading-tight text-wine-950"
                >
                  {group.title}
                </h2>

                <div className="mt-4 border-t border-ivory-200">
                  {group.items.map((item) => (
                    <details
                      key={item.question}
                      className="faq-item border-b border-ivory-200"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5">
                        <span className="text-[0.92rem] font-medium text-ink">
                          {item.question}
                        </span>
                        <span className="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full border border-ivory-300 text-wine-800 transition-all duration-300">
                          <Plus
                            size={14}
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        </span>
                      </summary>
                      <p className="max-w-2xl pb-5 pe-10 text-[0.87rem] leading-[1.9] text-smoke">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-gold-400/25 bg-ivory-50 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h2 className="font-display text-[1.45rem] text-wine-950">
                {dict.faq.contactTitle}
              </h2>
              <p className="mt-2 text-[0.82rem] text-smoke">
                {dict.faq.contactText}
              </p>
            </div>
            <ButtonLink
              href={localizedPath(locale, routes.contact)}
              size="sm"
            >
              {dict.faq.contactCta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

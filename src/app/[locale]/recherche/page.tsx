import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { PageHero } from "@/components/common/page-hero";
import { Button, ButtonLink } from "@/components/ui/button";
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
    title: dict.search.title,
    description: dict.search.description,
    path: routes.search,
    noindex: true,
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const dict = getDictionary(locale);
  const rawQuery = (await searchParams).q;
  const query =
    typeof rawQuery === "string" ? rawQuery.trim().slice(0, 80) : "";
  const searchPath = localizedPath(locale, routes.search);

  return (
    <main id="main" className="flex-1">
      <PageHero
        breadcrumbs={[
          { label: dict.common.home, href: localizedPath(locale, "/") },
          { label: dict.nav.search },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.search.eyebrow}
        title={dict.search.title}
        description={dict.search.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <form
              action={searchPath}
              method="get"
              role="search"
              className="flex flex-col gap-2 rounded-[1.6rem] border border-ivory-200 bg-white p-2 shadow-soft sm:flex-row sm:items-center sm:rounded-full"
            >
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search
                  size={18}
                  strokeWidth={1.6}
                  className="shrink-0 text-wine-700"
                  aria-hidden="true"
                />
                <label htmlFor="site-search" className="sr-only">
                  {dict.search.placeholder}
                </label>
                <input
                  id="site-search"
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder={dict.search.placeholder}
                  autoComplete="off"
                  className="h-11 w-full bg-transparent text-[0.9rem] text-ink outline-none placeholder:text-smoke-light"
                />
              </div>
              <Button type="submit" size="md">
                {dict.search.button}
              </Button>
            </form>
            <p className="mt-2 px-4 text-[0.66rem] text-smoke">
              {dict.search.hint}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="micro mr-1 text-[0.55rem] text-smoke">
                {dict.search.popular}
              </span>
              {dict.search.popularTerms.map((term) => (
                <Link
                  key={term}
                  href={`${searchPath}?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-ivory-300 bg-ivory-50 px-3.5 py-1.5 text-[0.72rem] text-ink-soft transition-colors hover:border-wine-800/30 hover:text-wine-800"
                >
                  {term}
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-ivory-200 bg-ivory-50 p-8 text-center sm:p-10">
              <div className="relative mx-auto flex size-16 items-center justify-center rounded-full border border-gold-400/25 bg-white text-wine-800">
                <JasmineFlower
                  className="absolute -end-2 -top-3 size-7 text-gold-500"
                  strokeWidth={1}
                />
                <Search size={22} strokeWidth={1.4} aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-[1.65rem] leading-tight text-wine-950">
                {query
                  ? dict.search.noResultsTitle.replace("{query}", query)
                  : dict.search.emptyTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.88rem] leading-relaxed text-smoke">
                {query
                  ? dict.search.noResultsText
                  : dict.search.emptyText}
              </p>
              <ButtonLink
                href={localizedPath(locale, routes.boutique)}
                className="mt-6"
              >
                {dict.search.cta}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

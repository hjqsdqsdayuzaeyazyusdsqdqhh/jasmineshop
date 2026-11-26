import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizedPath,
} from "@/config/i18n";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
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
    title: dict.contact.eyebrow,
    description: dict.contact.description,
    path: routes.contact,
  });
}

export default async function ContactPage({
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
          { label: dict.contact.eyebrow },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        description={dict.contact.description}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group rounded-[1.5rem] border border-ivory-200 bg-ivory-50 p-6 transition-colors hover:border-gold-400/50 sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-wine-800">
                <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="micro mt-5 text-gold-700">
                {dict.contact.emailLabel}
              </p>
              <p className="mt-1.5 text-[0.95rem] font-medium text-ink transition-colors group-hover:text-wine-800">
                <span dir="ltr">{siteConfig.email}</span>
              </p>
              <p className="mt-1 text-[0.7rem] text-smoke">
                {dict.contact.emailNote}
              </p>
            </a>

            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="group rounded-[1.5rem] border border-ivory-200 bg-ivory-50 p-6 transition-colors hover:border-gold-400/50 sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-wine-800">
                <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="micro mt-5 text-gold-700">
                {dict.contact.phoneLabel}
              </p>
              <p className="mt-1.5 text-[0.95rem] font-medium text-ink transition-colors group-hover:text-wine-800">
                <span dir="ltr">{siteConfig.phone}</span>
              </p>
              <p className="mt-1 text-[0.7rem] text-smoke">
                {dict.contact.phoneNote}
              </p>
            </a>

            <div className="rounded-[1.5rem] border border-ivory-200 bg-ivory-50 p-6 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-wine-800">
                <Clock size={18} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="micro mt-5 text-gold-700">
                {dict.contact.hoursLabel}
              </p>
              <p className="mt-1.5 text-[0.95rem] font-medium text-ink">
                {dict.contact.hours}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-ivory-200 bg-ivory-50 p-6 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-wine-800">
                <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="micro mt-5 text-gold-700">
                {dict.contact.addressLabel}
              </p>
              <p className="mt-1.5 text-[0.95rem] font-medium text-ink">
                {dict.contact.address}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-gold-400/25 bg-ivory-50 p-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-[0.82rem] leading-relaxed text-smoke">
              {dict.contact.note}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={`mailto:${siteConfig.email}`}
                external
                size="sm"
              >
                {dict.contact.cta}
              </ButtonLink>
              <ButtonLink
                href={`tel:${siteConfig.phoneHref}`}
                external
                variant="outline"
                size="sm"
              >
                {dict.contact.callCta}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ivory-200 bg-ivory-100 py-12">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-[1.6rem] text-wine-950">
                {dict.contact.faqTitle}
              </h2>
              <p className="mt-2 max-w-xl text-[0.84rem] leading-relaxed text-smoke">
                {dict.contact.faqText}
              </p>
            </div>
            <ArrowLink href={localizedPath(locale, routes.faq)}>
              {dict.contact.faqCta}
            </ArrowLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

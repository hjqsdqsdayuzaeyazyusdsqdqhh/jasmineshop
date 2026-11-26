import Link from "next/link";
import {
  Banknote,
  Clock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Truck,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

type FooterLink = {
  label: string;
  href: string;
};

function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string;
  links: FooterLink[];
  locale: Locale;
}) {
  return (
    <div>
      <p className="micro text-gold-300">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={localizedPath(locale, link.href)}
              className="text-[0.8rem] text-ivory-200/75 transition-colors duration-300 hover:text-ivory-50"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  const shopLinks: FooterLink[] = [
    { label: dict.nav.shop, href: routes.boutique },
    { label: dict.nav.new, href: routes.new },
    { label: dict.nav.bestsellers, href: routes.bestsellers },
    { label: dict.nav.gifts, href: routes.gifts },
  ];

  const helpLinks: FooterLink[] = [
    { label: dict.footer.contact, href: routes.contact },
    { label: dict.footer.faq, href: routes.faq },
    { label: dict.footer.shipping, href: `${routes.faq}#livraison` },
    { label: dict.footer.returns, href: `${routes.faq}#retours` },
    { label: dict.footer.search, href: routes.search },
  ];

  const houseLinks: FooterLink[] = [
    { label: dict.nav.story, href: routes.story },
    { label: dict.footer.legal, href: routes.legal },
    { label: dict.footer.privacy, href: `${routes.legal}#privacy` },
    { label: dict.footer.cookies, href: `${routes.legal}#cookies` },
  ];

  return (
    <footer className="relative overflow-hidden bg-wine-900 text-ivory-100">
      <div className="gold-rule absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        className="pattern-zellige pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-40 -top-40 size-[28rem] rounded-full bg-wine-800/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_.8fr_.8fr_.8fr_1.1fr] lg:gap-8 lg:py-16">
          <div className="max-w-xs sm:col-span-2 lg:col-span-1">
            <Logo
              href={localizedPath(locale, routes.home)}
              variant="light"
              label={`${siteConfig.name} — ${dict.header.home}`}
            />
            <p className="mt-5 font-display text-[1.35rem] leading-snug text-ivory-50">
              {dict.footer.tagline}
            </p>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-ivory-200/75">
              {dict.footer.description}
            </p>

            <div className="mt-6">
              <p className="micro text-gold-300">{dict.footer.language}</p>
              <LanguageSwitcher
                locale={locale}
                label={dict.footer.language}
                variant="footer"
                className="mt-2.5"
              />
            </div>
          </div>

          <FooterColumn
            title={dict.footer.shopTitle}
            links={shopLinks}
            locale={locale}
          />
          <FooterColumn
            title={dict.footer.helpTitle}
            links={helpLinks}
            locale={locale}
          />
          <FooterColumn
            title={dict.footer.houseTitle}
            links={houseLinks}
            locale={locale}
          />

          <div>
            <p className="micro text-gold-300">{dict.footer.contactTitle}</p>
            <ul className="mt-4 space-y-3 text-[0.8rem] text-ivory-200/75">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-ivory-50"
                >
                  <Mail
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-gold-400"
                    aria-hidden="true"
                  />
                  <span dir="ltr">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-ivory-50"
                >
                  <Phone
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-gold-400"
                    aria-hidden="true"
                  />
                  <span dir="ltr">{siteConfig.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock
                  size={14}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                {dict.contact.hours}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                {dict.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory-50/10 py-5 text-[0.68rem] text-ivory-200/70 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5">
              <Truck
                size={13}
                strokeWidth={1.5}
                className="text-gold-400"
                aria-hidden="true"
              />
              {dict.footer.delivery}
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote
                size={13}
                strokeWidth={1.5}
                className="text-gold-400"
                aria-hidden="true"
              />
              {dict.footer.payments}
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw
                size={13}
                strokeWidth={1.5}
                className="text-gold-400"
                aria-hidden="true"
              />
              {dict.footer.returnsBadge}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={localizedPath(locale, `${routes.legal}#terms`)}
              className="transition-colors hover:text-ivory-50"
            >
              {dict.footer.terms}
            </Link>
            <Link
              href={localizedPath(locale, `${routes.legal}#privacy`)}
              className="transition-colors hover:text-ivory-50"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={localizedPath(locale, `${routes.legal}#cookies`)}
              className="transition-colors hover:text-ivory-50"
            >
              {dict.footer.cookies}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-ivory-50/10 py-4 text-[0.66rem] text-ivory-200/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.footer.rights.replace("{year}", String(year))}</p>
          <p>{dict.footer.madeIn}</p>
        </div>
      </Container>
    </footer>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Container } from "@/components/ui/container";
import { localizedPath } from "@/config/i18n";
import { mainNavigation, utilityPaths } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

function HeaderIconLink({
  href,
  label,
  icon: Icon,
  className,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-10 items-center justify-center rounded-full text-ink-soft transition-all duration-300 hover:bg-mist hover:text-wine-800",
        className,
      )}
    >
      <Icon size={18} strokeWidth={1.5} />
    </Link>
  );
}

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) closeMenu();
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [closeMenu]);

  const isActive = (path: string) => {
    const href = localizedPath(locale, path);
    if (path === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-ivory-50/95 backdrop-blur-xl transition-shadow duration-500",
        scrolled ? "border-ivory-200/80 shadow-header" : "border-transparent",
      )}
    >
      <Container>
        <div className="grid h-[4.25rem] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:h-[4.5rem] lg:flex lg:h-[5.25rem] lg:justify-between lg:gap-6">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              className="-ms-2 flex size-10 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-mist hover:text-wine-800 lg:hidden"
            >
              <Menu size={21} strokeWidth={1.5} />
            </button>

            <Logo
              href={localizedPath(locale)}
              label={`${siteConfig.name} — ${dict.header.home}`}
              className="hidden lg:inline-flex"
            />
          </div>

          <div className="justify-self-center lg:hidden">
            <Logo
              href={localizedPath(locale)}
              label={`${siteConfig.name} — ${dict.header.home}`}
            />
          </div>

          <nav
            aria-label={dict.nav.primary}
            className="hidden items-center gap-6 lg:flex xl:gap-9"
          >
            {mainNavigation.map((item) => (
              <Link
                key={item.path}
                href={localizedPath(locale, item.path)}
                aria-current={isActive(item.path) ? "page" : undefined}
                className="nav-link"
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-0.5 sm:gap-1">
            <HeaderIconLink
              href={localizedPath(locale, utilityPaths.search)}
              label={dict.nav.search}
              icon={Search}
              className="hidden min-[360px]:flex"
            />

            <LanguageSwitcher
              locale={locale}
              label={dict.header.language}
              className="hidden lg:block"
            />

            <HeaderIconLink
              href={localizedPath(locale, utilityPaths.wishlist)}
              label={dict.nav.wishlist}
              icon={Heart}
              className="hidden sm:flex"
            />

            <span
              className="mx-1 hidden h-5 w-px bg-ivory-300 lg:block"
              aria-hidden="true"
            />

            <Link
              href={localizedPath(locale, utilityPaths.cart)}
              aria-label={dict.nav.cart}
              title={dict.nav.cart}
              className="ms-0.5 flex size-10 items-center justify-center rounded-full bg-wine-800 text-ivory-50 shadow-[0_10px_24px_-16px_rgba(82,16,37,0.8)] transition-all duration-300 hover:bg-wine-900 hover:shadow-[0_12px_28px_-14px_rgba(82,16,37,0.7)]"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        locale={locale}
        dict={dict}
      />
    </header>
  );
}

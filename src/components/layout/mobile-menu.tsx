"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Clock, Heart, Mail, Phone, Search, Truck, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Portal } from "@/components/ui/portal";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { localizedPath } from "@/config/i18n";
import { mainNavigation, utilityPaths, type NavigationItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  open,
  onClose,
  locale,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || "/";

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  const items: NavigationItem[] = [
    { key: "home", path: "/" },
    ...mainNavigation,
  ];

  const isActive = (path: string) => {
    const href = localizedPath(locale, path);
    if (path === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Portal>
      <div
        className={cn(
          "fixed inset-0 z-[80] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={onClose}
          className={cn(
            "absolute inset-0 h-full w-full cursor-default bg-wine-950/45 backdrop-blur-[2px] transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <aside
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.menu}
          className={cn(
            "absolute inset-y-0 start-0 flex w-full max-w-[26rem] flex-col bg-ivory-50 shadow-[0_0_80px_rgba(53,10,24,0.35)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
            open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
          )}
        >
          <div className="relative overflow-hidden border-b border-ivory-200 px-5 py-4">
            <div
              className="pattern-zellige pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between gap-4">
              <Logo
                href={localizedPath(locale)}
                label={`${siteConfig.name} — ${dict.header.home}`}
                onClick={onClose}
              />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={dict.nav.close}
                className="flex size-10 items-center justify-center rounded-full border border-ivory-300 bg-white/70 text-ink-soft transition-colors hover:border-wine-800/30 hover:text-wine-800"
              >
                <X size={18} strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav aria-label={dict.nav.primary}>
              <ul className="border-b border-ivory-200 pb-4">
                {items.map((item, index) => {
                  const active = isActive(item.path);

                  return (
                    <li key={item.path}>
                      <Link
                        href={localizedPath(locale, item.path)}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-center gap-3.5 py-2.5"
                      >
                        <span
                          className={cn(
                            "micro w-5 text-[0.52rem]",
                            active ? "text-gold-600" : "text-smoke",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[1.8rem] leading-tight text-ink transition-colors duration-300 group-hover:text-wine-800",
                            locale === "ar" && "text-[1.55rem]",
                            active && "text-wine-800",
                          )}
                        >
                          {dict.nav[item.key]}
                        </span>
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                          className={cn(
                            "ms-auto shrink-0 text-wine-800 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:group-hover:-translate-x-0.5",
                            active && "opacity-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link
                href={localizedPath(locale, utilityPaths.search)}
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full border border-ivory-300 bg-white px-3 py-2.5 text-[0.76rem] font-medium text-ink-soft transition-colors hover:border-wine-800/40 hover:text-wine-800"
              >
                <Search size={14} strokeWidth={1.6} className="text-gold-600" />
                {dict.nav.search}
              </Link>
              <Link
                href={localizedPath(locale, utilityPaths.wishlist)}
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full border border-ivory-300 bg-white px-3 py-2.5 text-[0.76rem] font-medium text-ink-soft transition-colors hover:border-wine-800/40 hover:text-wine-800"
              >
                <Heart size={14} strokeWidth={1.6} className="text-gold-600" />
                {dict.nav.wishlist}
              </Link>
            </div>

            <div className="mt-6">
              <p className="micro text-smoke">{dict.header.language}</p>
              <LanguageSwitcher
                locale={locale}
                label={dict.header.language}
                variant="inline"
                className="mt-3"
                onLocaleChange={onClose}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-ivory-200 bg-white p-4">
              <p className="micro text-gold-700">
                {dict.mobileMenu.contactTitle}
              </p>

              <div className="mt-2 space-y-1">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-mist"
                >
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-gold-600"
                  />
                  <span>
                    <span className="micro block text-smoke">
                      {dict.mobileMenu.email}
                    </span>
                    <span
                      dir="ltr"
                      className={cn(
                        "mt-0.5 block text-[0.8rem] font-medium text-ink",
                        locale === "ar" ? "text-end" : "text-start",
                      )}
                    >
                      {siteConfig.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-mist"
                >
                  <Phone
                    size={16}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-gold-600"
                  />
                  <span>
                    <span className="micro block text-smoke">
                      {dict.mobileMenu.phone}
                    </span>
                    <span
                      dir="ltr"
                      className={cn(
                        "mt-0.5 block text-[0.8rem] font-medium text-ink",
                        locale === "ar" ? "text-end" : "text-start",
                      )}
                    >
                      {siteConfig.phone}
                    </span>
                  </span>
                </a>

                <p className="flex items-center gap-3 rounded-xl p-2.5 text-[0.78rem] text-smoke">
                  <Clock
                    size={16}
                    strokeWidth={1.6}
                    className="shrink-0 text-gold-600"
                  />
                  {dict.mobileMenu.hours}
                </p>
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-[0.7rem] text-smoke">
              <Truck
                size={14}
                strokeWidth={1.6}
                className="shrink-0 text-gold-600"
              />
              {dict.mobileMenu.note}
            </p>
          </div>
        </aside>
      </div>
    </Portal>
  );
}

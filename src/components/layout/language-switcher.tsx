"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe, Loader2 } from "lucide-react";
import {
  localeCookieName,
  localeNames,
  localeShortNames,
  switchLocalePath,
} from "@/config/i18n";
import { locales, type Locale } from "@/types";
import { cn, setCookie } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  className,
  variant = "compact",
  onLocaleChange,
}: {
  locale: Locale;
  label: string;
  className?: string;
  variant?: "compact" | "inline" | "footer";
  onLocaleChange?: () => void;
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }

    setCookie(localeCookieName, nextLocale);
    setOpen(false);
    onLocaleChange?.();
    startTransition(() => {
      router.push(switchLocalePath(pathname, nextLocale));
      router.refresh();
    });
  }

  if (variant === "footer") {
    return (
      <div
        role="group"
        aria-label={label}
        className={cn("flex items-center gap-3", className)}
      >
        {locales.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeLocale(item)}
            aria-pressed={item === locale}
            disabled={isPending}
            className={cn(
              "micro text-[0.55rem] transition-colors duration-300",
              item === locale
                ? "text-gold-300"
                : "text-ivory-200/70 hover:text-ivory-50",
            )}
          >
            {localeShortNames[item]}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        role="group"
        aria-label={label}
        className={cn("grid grid-cols-2 gap-2", className)}
      >
        {locales.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeLocale(item)}
            aria-pressed={item === locale}
            disabled={isPending}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-full border text-[0.8rem] font-medium transition-all duration-300",
              item === locale
                ? "border-wine-800 bg-wine-800 text-ivory-50 shadow-[0_10px_24px_-18px_rgba(82,16,37,0.7)]"
                : "border-ivory-300 bg-white text-ink-soft hover:border-wine-800/40 hover:text-wine-800",
            )}
          >
            {localeNames[item]}
            {item === locale ? (
              <Check size={13} strokeWidth={2.2} />
            ) : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`${label} (${localeShortNames[locale]})`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-[0.72rem] font-semibold text-ink-soft transition-colors duration-300 hover:bg-mist hover:text-wine-800"
      >
        {isPending ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Globe size={15} strokeWidth={1.6} />
        )}
        <span>{localeShortNames[locale]}</span>
        <ChevronDown
          size={12}
          strokeWidth={1.8}
          className={cn(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        role="listbox"
        aria-label={label}
        inert={!open}
        className={cn(
          "absolute end-0 top-[calc(100%+0.55rem)] z-50 w-48 overflow-hidden rounded-2xl border border-ivory-200 bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(82,16,37,0.35)] transition-all duration-300",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1.5 opacity-0",
        )}
      >
        {locales.map((item) => (
          <button
            key={item}
            type="button"
            role="option"
            aria-selected={item === locale}
            onClick={() => changeLocale(item)}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start text-[0.82rem] transition-colors",
              item === locale
                ? "bg-ivory-100 font-semibold text-wine-900"
                : "text-ink-soft hover:bg-ivory-50 hover:text-wine-800",
            )}
          >
            <span className="flex items-center gap-2.5">
              <span className="micro w-6 text-[0.6rem] text-smoke">
                {localeShortNames[item]}
              </span>
              {localeNames[item]}
            </span>
            {item === locale ? (
              <Check size={14} strokeWidth={2.2} className="text-wine-700" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

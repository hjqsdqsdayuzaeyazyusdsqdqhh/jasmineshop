import type { Dictionary } from "./dictionaries/fr";
import { ar } from "./dictionaries/ar";
import { fr } from "./dictionaries/fr";
import {
  locales,
  type Direction,
  type Locale,
} from "@/types";

export const defaultLocale: Locale = "fr";

export const localeCookieName = "JS_LOCALE";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
};

export const localeShortNames: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
};

export const localeHtmlLang: Record<Locale, string> = {
  fr: "fr-MA",
  ar: "ar-MA",
};

export const localeDirections: Record<Locale, Direction> = {
  fr: "ltr",
  ar: "rtl",
};

const dictionaries: Record<Locale, Dictionary> = { fr, ar };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
  return localeDirections[locale];
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Prefix a path with the active locale. `/` becomes `/fr`. */
export function localizedPath(locale: Locale, path = "/") {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}

/** Swap the locale segment of the current pathname. */
export function switchLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}

/** Read the locale from a pathname, falling back to the default locale. */
export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export type { Dictionary };

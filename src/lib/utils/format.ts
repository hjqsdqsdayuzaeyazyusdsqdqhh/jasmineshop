import type { Locale } from "@/types";

const numberFormatters: Record<Locale, Intl.NumberFormat> = {
  fr: new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }),
  ar: new Intl.NumberFormat("ar-MA-u-nu-latn", { maximumFractionDigits: 0 }),
};

/** Moroccan Dirham, e.g. "1 290 DH". */
export function formatPrice(value: number, locale: Locale = "fr") {
  return `${numberFormatters[locale].format(value)} DH`;
}

export function formatNumber(value: number, locale: Locale = "fr") {
  return numberFormatters[locale].format(value);
}

export function formatDate(value: Date | string, locale: Locale = "fr") {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

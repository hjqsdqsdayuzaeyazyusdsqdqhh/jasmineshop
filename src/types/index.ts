export const locales = ["fr", "ar"] as const;

export type Locale = (typeof locales)[number];

export type Direction = "ltr" | "rtl";

export type LocalizedString = Record<Locale, string>;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

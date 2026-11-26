export const siteConfig = {
  name: "JasmineShop",
  tagline: "Tout pour votre maison.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jasmineshop.ma").replace(
    /\/+$/,
    "",
  ),
  email: "bonjour@jasmineshop.ma",
  phone: "+212 693-497599",
  phoneHref: "+212693497599",
  address: {
    city: "Casablanca",
    country: "Maroc",
    countryCode: "MA",
  },
  foundedYear: 2021,
  currency: "MAD",
  currencyLabel: "DH",
  metaPixelId: "1643947119937280",
} as const;

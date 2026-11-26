export const siteConfig = {
  name: "JasmineShop",
  tagline: "Tout pour votre maison.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jasmineshop.ma").replace(
    /\/+$/,
    "",
  ),
  email: "bonjour@jasmineshop.ma",
  phone: "+212 5 22 45 18 90",
  phoneHref: "+212522451890",
  address: {
    city: "Casablanca",
    country: "Maroc",
    countryCode: "MA",
  },
  foundedYear: 2021,
  currency: "MAD",
  currencyLabel: "DH",
} as const;

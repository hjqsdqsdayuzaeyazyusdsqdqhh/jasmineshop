import type { Dictionary } from "@/config/dictionaries/fr";

export const routes = {
  home: "/",
  boutique: "/boutique",
  new: "/nouveautes",
  bestsellers: "/best-sellers",
  gifts: "/idees-cadeaux",
  story: "/notre-histoire",
  contact: "/contact",
  faq: "/faq",
  legal: "/legal",
  search: "/recherche",
  wishlist: "/favoris",
  cart: "/panier",
} as const;

export type RouteKey = keyof typeof routes;

export type NavKey = keyof Dictionary["nav"];

export type NavigationItem = {
  key: NavKey;
  path: string;
};

/** Primary desktop navigation. */
export const mainNavigation: readonly NavigationItem[] = [
  { key: "new", path: routes.new },
  { key: "shop", path: routes.boutique },
  { key: "bestsellers", path: routes.bestsellers },
  { key: "gifts", path: routes.gifts },
  { key: "story", path: routes.story },
];

/** Utility destinations. */
export const utilityPaths = {
  search: routes.search,
  wishlist: routes.wishlist,
  cart: routes.cart,
} as const;

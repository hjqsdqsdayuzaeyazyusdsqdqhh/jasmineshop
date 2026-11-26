import type { LocalizedString } from "@/types";

export type ProductImageSlot =
  | "main"
  | "gallery-2"
  | "gallery-3"
  | "gallery-4"
  | "detail";

export type ProductImage = {
  id: ProductImageSlot;
  src: string;
  alt: LocalizedString;
  label: LocalizedString;
};

export type ProductImageWithAvailability = ProductImage & {
  available: boolean;
};

export type ProductSpec = {
  label: LocalizedString;
  value: LocalizedString;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  currency: "MAD";
  category: {
    id: string;
    name: LocalizedString;
  };
  inStock: boolean;
  images: ProductImage[];
  highlights: LocalizedString[];
  specs: ProductSpec[];
  rooms: LocalizedString[];
};

const imageDir = "/images/products/chariot";

/**
 * Single source of truth for the JasmineShop catalogue.
 * Phase 3 currently contains one product only.
 */
export const products: Product[] = [
  {
    id: "chariot-rangement-001",
    slug: "chariot-rangement-3-niveaux",
    sku: "chariot-rangement-001",
    name: {
      fr: "Chariot de rangement multifonctionnel",
      ar: "عربة تخزين متعددة الاستعمالات",
    },
    description: {
      fr: "Un chariot de rangement pratique et élégant, conçu pour organiser les objets du quotidien. Sa structure en métal, ses deux paniers en fil, son plateau supérieur en bois et ses roulettes le rendent adapté à plusieurs pièces de la maison.",
      ar: "عربة تخزين عملية وأنيقة، مصممة لتنظيم أغراض المنزل اليومية. هيكلها المعدني، وسلتا التخزين المعدنيتان، ورفها الخشبي العلوي، وعجلاتها تجعلها مناسبة لعدة غرف في المنزل.",
    },
    price: 230,
    currency: "MAD",
    category: {
      id: "maison-rangement",
      name: {
        fr: "Maison & Rangement",
        ar: "المنزل والتنظيم",
      },
    },
    inStock: true,
    images: [
      {
        id: "main",
        src: `${imageDir}/main.webp`,
        label: { fr: "Vue principale", ar: "الصورة الرئيسية" },
        alt: {
          fr: "Chariot de rangement noir et bois avec ses deux paniers sur fond clair",
          ar: "عربة تخزين سوداء وخشبية مع سلتيها على خلفية فاتحة",
        },
      },
      {
        id: "gallery-2",
        src: `${imageDir}/gallery-2.webp`,
        label: { fr: "En situation", ar: "في السياق" },
        alt: {
          fr: "Chariot de rangement multifonctionnel JasmineShop en situation avec une lampe et des livres",
          ar: "عربة تخزين متعددة الاستعمالات من JasmineShop مع مصباح وكتب",
        },
      },
      {
        id: "gallery-3",
        src: `${imageDir}/gallery-3.webp`,
        label: { fr: "Dans la chambre", ar: "في غرفة النوم" },
        alt: {
          fr: "Chariot de rangement installé dans une chambre à coucher",
          ar: "عربة تخزين موضوعة في غرفة نوم",
        },
      },
      {
        id: "gallery-4",
        src: `${imageDir}/gallery-4.webp`,
        label: { fr: "Dans la cuisine", ar: "في المطبخ" },
        alt: {
          fr: "Chariot de rangement utilisé dans une cuisine",
          ar: "عربة تخزين مستعملة في مطبخ",
        },
      },
      {
        id: "detail",
        src: `${imageDir}/detail.webp`,
        label: { fr: "Détail en situation", ar: "تفصيل في السياق" },
        alt: {
          fr: "Chariot de rangement dans un salon, avec ses paniers et ses roulettes",
          ar: "عربة تخزين في صالون مع سلالها وعجلاتها",
        },
      },
    ],
    highlights: [
      {
        fr: "Structure en métal noir mat",
        ar: "هيكل معدني أسود مطفي",
      },
      {
        fr: "Deux paniers de rangement en fil",
        ar: "سلتان للتخزين من الشبك المعدني",
      },
      {
        fr: "Un plateau supérieur en bois",
        ar: "رف علوي من الخشب",
      },
      {
        fr: "Roulettes pour le déplacer facilement",
        ar: "عجلات لتحريكه بسهولة",
      },
      {
        fr: "Pour la cuisine, le salon, la chambre ou le bureau",
        ar: "مناسب للمطبخ أو الصالون أو غرفة النوم أو المكتب",
      },
    ],
    specs: [
      {
        label: { fr: "Structure", ar: "الهيكل" },
        value: { fr: "Métal noir mat", ar: "معدن أسود مطفي" },
      },
      {
        label: { fr: "Paniers", ar: "السلال" },
        value: {
          fr: "Deux paniers profonds en fil métallique",
          ar: "سلتان عميقتان من الشبك المعدني",
        },
      },
      {
        label: { fr: "Plateau supérieur", ar: "الرف العلوي" },
        value: { fr: "Bois", ar: "خشب" },
      },
      {
        label: { fr: "Roulettes", ar: "العجلات" },
        value: { fr: "Oui", ar: "نعم" },
      },
      {
        label: { fr: "Dimensions", ar: "المقاسات" },
        value: { fr: "76 × 29 × 42 cm", ar: "76 × 29 × 42 سم" },
      },
      {
        label: { fr: "Usage", ar: "الاستعمال" },
        value: {
          fr: "Cuisine, salon, chambre et bureau",
          ar: "المطبخ، الصالون، غرفة النوم والمكتب",
        },
      },
    ],
    rooms: [
      { fr: "Cuisine", ar: "المطبخ" },
      { fr: "Salon", ar: "الصالون" },
      { fr: "Chambre", ar: "غرفة النوم" },
      { fr: "Bureau", ar: "المكتب" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function productPath(slug: string) {
  return `/produit/${slug}`;
}

export const productSlugs = products.map((product) => product.slug);

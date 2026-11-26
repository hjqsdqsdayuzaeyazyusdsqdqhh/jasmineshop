import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: "Tout pour votre maison — maison & lifestyle marocain.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#521025",
    lang: "fr",
    dir: "ltr",
    icons: [
      {
        src: "/logo/jasmineshop-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

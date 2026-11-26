import { existsSync } from "node:fs";
import path from "node:path";
import type {
  ProductImage,
  ProductImageWithAvailability,
} from "@/data/products";

/**
 * The owner supplies the original photos in /public/images/products/chariot.
 * Until a file exists, the gallery renders a branded placeholder instead of
 * requesting a missing image (and instead of inventing product visuals).
 */
export function withImageAvailability(
  images: ProductImage[],
): ProductImageWithAvailability[] {
  return images.map((image) => ({
    ...image,
    available: existsSync(
      path.join(process.cwd(), "public", image.src.replace(/^\/+/, "")),
    ),
  }));
}

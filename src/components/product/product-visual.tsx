import Image from "next/image";
import { ProductPlaceholder } from "@/components/product/product-placeholder";
import type { ProductImageWithAvailability } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductVisual({
  image,
  productName,
  locale,
  pendingLabel,
  className,
  priority = false,
}: {
  image: ProductImageWithAvailability | undefined;
  productName: string;
  locale: "fr" | "ar";
  pendingLabel: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-ivory-200 bg-ivory-100",
        className,
      )}
    >
      {image?.available ? (
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      ) : (
        <ProductPlaceholder
          productName={productName}
          label={image?.label[locale] ?? ""}
          pendingLabel={pendingLabel}
        />
      )}
    </div>
  );
}

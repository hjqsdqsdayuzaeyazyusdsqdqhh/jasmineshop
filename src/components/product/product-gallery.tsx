"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductPlaceholder } from "@/components/product/product-placeholder";
import type { ProductImageWithAvailability } from "@/data/products";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  productName,
  locale,
  labels,
}: {
  images: ProductImageWithAvailability[];
  productName: string;
  locale: Locale;
  labels: {
    galleryLabel: string;
    imagePending: string;
    viewImage: string;
  };
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div role="group" aria-label={labels.galleryLabel}>
      <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-ivory-200 bg-ivory-100">
        {active?.available ? (
          <Image
            src={active.src}
            alt={active.alt[locale]}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ProductPlaceholder
            productName={productName}
            label={active?.label[locale] ?? ""}
            pendingLabel={labels.imagePending}
          />
        )}

        <span
          dir="ltr"
          className="absolute bottom-4 end-4 rounded-full border border-ivory-200 bg-ivory-50/90 px-3 py-1.5 text-[0.62rem] font-semibold text-ink-soft backdrop-blur"
        >
          {Math.min(activeIndex + 1, images.length)} / {images.length}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`${labels.viewImage}: ${image.label[locale]}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border bg-ivory-100 transition-all duration-300",
              index === activeIndex
                ? "border-wine-800 ring-2 ring-wine-800/15"
                : "border-ivory-200 hover:border-gold-400",
            )}
          >
            {image.available ? (
              <Image
                src={image.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <ProductPlaceholder
                productName={productName}
                label={image.label[locale]}
                pendingLabel={labels.imagePending}
                compact
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

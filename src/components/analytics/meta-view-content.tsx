"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMeta } from "@/lib/meta-pixel";

export function MetaViewContent({
  productId,
  productName,
  category,
  value,
  currency = "MAD",
}: {
  productId: string;
  productName: string;
  category: string;
  value: number;
  currency?: string;
}) {
  const pathname = usePathname();
  const trackedKey = useRef<string | null>(null);

  useEffect(() => {
    const key = `${pathname}|${productId}`;
    if (trackedKey.current === key) return;

    trackedKey.current = key;
    trackMeta("ViewContent", {
      content_ids: [productId],
      content_name: productName,
      content_category: category,
      content_type: "product",
      value,
      currency,
    });
  }, [pathname, productId, productName, category, value, currency]);

  return null;
}

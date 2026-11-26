"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMeta } from "@/lib/meta-pixel";

/**
 * The base snippet fires the first PageView once per document load.
 * This component only tracks subsequent client-side route changes.
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const lastTrackedPath = useRef(pathname);

  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) return;

    trackMeta("PageView");
    lastTrackedPath.current = pathname;
  }, [pathname]);

  return null;
}

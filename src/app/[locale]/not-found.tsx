"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JasmineFlower } from "@/components/common/jasmine-flower";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  getDictionary,
  getLocaleFromPathname,
  localizedPath,
} from "@/config/i18n";

export default function LocaleNotFound() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const dict = getDictionary(locale);

  return (
    <main
      id="main"
      className="relative flex flex-1 items-center overflow-hidden bg-ivory-100"
    >
      <div
        className="pattern-zellige pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <Container className="relative py-20 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <JasmineFlower className="size-12 text-wine-800" />
          <p className="mt-8 font-display text-[5rem] leading-none text-wine-200">
            404
          </p>
          <h1 className="mt-4 font-display text-[2rem] text-wine-950">
            {dict.notFound.title}
          </h1>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-smoke">
            {dict.notFound.description}
          </p>
          <Link
            href={localizedPath(locale)}
            className={buttonStyles({
              variant: "primary",
              size: "lg",
              className: "mt-8",
            })}
          >
            <ArrowLeft size={15} className="rtl:rotate-180" />
            {dict.notFound.cta}
          </Link>
        </div>
      </Container>
    </main>
  );
}

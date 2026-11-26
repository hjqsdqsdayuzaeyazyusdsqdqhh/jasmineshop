import Link from "next/link";
import { JasmineFlower } from "./jasmine-flower";
import { cn } from "@/lib/utils";

/**
 * JasmineShop wordmark.
 * Instrument Serif gives the logo its editorial, Moroccan-house character:
 * an upright "Jasmine" with an italic burgundy "Shop", led by the jasmine mark.
 */
export function Logo({
  href,
  label,
  variant = "default",
  className,
  onClick,
}: {
  href: string;
  label: string;
  variant?: "default" | "light";
  className?: string;
  onClick?: () => void;
}) {
  const light = variant === "light";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-2.5 whitespace-nowrap",
        className,
      )}
    >
      <JasmineFlower
        className={cn(
          "size-6 shrink-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-12 sm:size-7",
          light ? "text-gold-300" : "text-gold-500",
        )}
        strokeWidth={1.25}
      />
      <span
        className={cn(
          "wordmark text-[1.42rem] leading-none tracking-[-0.012em] sm:text-[1.62rem]",
          light ? "text-ivory-50" : "text-ink",
        )}
      >
        Jasmine
        <span className={cn("italic", light ? "text-gold-300" : "text-wine-800")}>
          Shop
        </span>
      </span>
    </Link>
  );
}

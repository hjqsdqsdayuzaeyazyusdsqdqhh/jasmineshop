import { ButtonLink } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  note,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-xl rounded-[1.75rem] border border-ivory-200 bg-white p-8 text-center shadow-soft sm:p-12",
        className,
      )}
    >
      <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-gold-400/25 bg-ivory-100 text-wine-800">
        <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <h2 className="mt-6 font-display text-[1.8rem] leading-tight text-wine-950">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-[0.9rem] leading-relaxed text-smoke">
        {description}
      </p>
      {note ? (
        <p className="mx-auto mt-3 max-w-sm text-[0.7rem] leading-relaxed text-smoke">
          {note}
        </p>
      ) : null}
      <ButtonLink href={ctaHref} className="mt-7">
        {ctaLabel}
      </ButtonLink>
    </div>
  );
}

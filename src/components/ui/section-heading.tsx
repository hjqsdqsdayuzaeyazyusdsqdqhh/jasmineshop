import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = "start",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cn("eyebrow mb-4", tone === "light" && "text-gold-300")}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] tracking-[-0.02em]",
            tone === "light" ? "text-ivory-50" : "text-wine-950",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-xl text-[0.92rem] leading-relaxed",
              tone === "light" ? "text-ivory-200/75" : "text-smoke",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <div className="shrink-0 pb-1">
          <ArrowLink href={actionHref} tone={tone === "light" ? "gold" : "dark"}>
            {actionLabel}
          </ArrowLink>
        </div>
      ) : null}
    </div>
  );
}

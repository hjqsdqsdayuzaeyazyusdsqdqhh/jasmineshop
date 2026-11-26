import { cn } from "@/lib/utils";

type BadgeTone = "gold" | "ivory" | "outline";

const tones: Record<BadgeTone, string> = {
  gold: "bg-gold-400 text-wine-950",
  ivory: "bg-ivory-50 text-wine-900 ring-1 ring-ivory-200",
  outline: "border border-wine-800/20 text-wine-800",
};

export function Badge({
  children,
  tone = "ivory",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "micro inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.625rem] leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

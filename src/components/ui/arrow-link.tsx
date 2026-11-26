import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "gold";
}) {
  const tones = {
    dark: "text-wine-800 hover:text-wine-600",
    light: "text-ivory-50 hover:text-gold-200",
    gold: "text-gold-300 hover:text-gold-100",
  } as const;

  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 transition-colors duration-300",
        tones[tone],
        className,
      )}
    >
      <span className="micro border-b border-current/30 pb-0.5">{children}</span>
      <ArrowRight
        size={14}
        strokeWidth={1.7}
        className="transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
      />
    </Link>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  label,
  className,
}: {
  items: BreadcrumbItem[];
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-smoke">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <ChevronRight
                size={12}
                strokeWidth={1.6}
                className="text-smoke-light rtl:rotate-180"
                aria-hidden="true"
              />
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-wine-800"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-soft">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

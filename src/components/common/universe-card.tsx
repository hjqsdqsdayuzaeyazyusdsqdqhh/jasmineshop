import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UniverseIcon } from "@/components/common/universe-icon";
import type { Dictionary } from "@/config/i18n";

export function UniverseCard({
  universe,
  href,
  cta,
  index,
}: {
  universe: Dictionary["universes"][number];
  href: string;
  cta: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ivory-200 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-[0_24px_50px_-32px_rgba(82,16,37,0.35)]"
    >
      <span
        className="pointer-events-none absolute -end-10 -top-10 size-28 rounded-full border border-gold-400/20 transition-transform duration-700 group-hover:scale-110"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-full bg-ivory-100 text-wine-800 transition-colors duration-300 group-hover:bg-wine-800 group-hover:text-ivory-50">
          <UniverseIcon id={universe.id} />
        </span>
        <span className="micro text-[0.55rem] text-gold-700">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="micro mt-6 text-gold-700">{universe.tagline}</p>
      <h3 className="mt-2 font-display text-[1.55rem] leading-tight text-wine-950">
        {universe.name}
      </h3>
      <p className="mt-2 text-[0.84rem] leading-relaxed text-smoke">
        {universe.description}
      </p>

      <span className="mt-auto pt-6">
        <span className="micro inline-flex items-center gap-2 text-wine-800">
          {cta}
          <ArrowRight
            size={13}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </span>
      </span>
    </Link>
  );
}

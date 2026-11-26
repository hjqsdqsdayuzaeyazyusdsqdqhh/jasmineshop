import { JasmineFlower } from "@/components/common/jasmine-flower";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/common/breadcrumbs";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function PageHero({
  breadcrumbs,
  breadcrumbLabel,
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  breadcrumbs: BreadcrumbItem[];
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-ivory-200 bg-ivory-100",
        className,
      )}
    >
      <div
        className="pattern-zellige pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-40 -top-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(242,203,215,0.42),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      <JasmineFlower
        className="pointer-events-none absolute -end-20 -top-16 size-80 text-gold-500/10"
        strokeWidth={0.8}
      />

      <Container className="relative py-10 sm:py-14 lg:py-16">
        <Breadcrumbs
          items={breadcrumbs}
          label={breadcrumbLabel}
          className="relative"
        />

        <div className="relative mt-8 max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-wine-950">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-[0.94rem] leading-[1.9] text-smoke">
              {description}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

import { JasmineFlower } from "@/components/common/jasmine-flower";
import { cn } from "@/lib/utils";

export function ProductPlaceholder({
  productName,
  label,
  pendingLabel,
  compact = false,
}: {
  productName: string;
  label: string;
  pendingLabel: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200 text-center",
        compact ? "p-1" : "p-8",
      )}
    >
      <div
        className="pattern-zellige pointer-events-none absolute inset-0 opacity-45"
        aria-hidden="true"
      />
      <JasmineFlower
        className={cn(
          "relative text-gold-500/50",
          compact ? "size-4" : "size-16",
        )}
        strokeWidth={compact ? 1.4 : 0.9}
      />
      {compact ? (
        <span className="relative mt-1 text-[0.45rem] font-medium text-smoke">
          {label}
        </span>
      ) : (
        <>
          <p className="relative mt-5 max-w-[16rem] font-display text-[1.55rem] leading-tight text-wine-950">
            {productName}
          </p>
          <p className="micro relative mt-2 text-gold-700">{label}</p>
          <p className="relative mt-3 max-w-[15rem] text-[0.7rem] leading-relaxed text-smoke">
            {pendingLabel}
          </p>
        </>
      )}
    </div>
  );
}

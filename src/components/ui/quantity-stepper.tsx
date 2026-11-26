"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  decrementLabel,
  incrementLabel,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  decrementLabel: string;
  incrementLabel: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-ivory-300 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={decrementLabel}
        className="flex size-10 items-center justify-center rounded-full text-wine-800 transition-colors hover:bg-ivory-100 disabled:pointer-events-none disabled:opacity-35"
      >
        <Minus size={13} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <span
        className={cn(
          "min-w-8 text-center text-[0.82rem] font-semibold text-ink tabular-nums",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={incrementLabel}
        className="flex size-10 items-center justify-center rounded-full text-wine-800 transition-colors hover:bg-ivory-100 disabled:pointer-events-none disabled:opacity-35"
      >
        <Plus size={13} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}

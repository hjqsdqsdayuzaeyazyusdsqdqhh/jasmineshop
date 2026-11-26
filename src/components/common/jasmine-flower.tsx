import { cn } from "@/lib/utils";

/**
 * The JasmineShop flower — five hand-drawn petals and a soft gold heart.
 * Used as the brand symbol, a quiet ornament, and the app icon.
 */
export function JasmineFlower({
  className,
  strokeWidth = 1.15,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("text-gold-400", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M20 20C14.6 17.9 13.6 11.4 16 7.1C17 5.3 18.5 4.2 20 4.2C21.5 4.2 23 5.3 24 7.1C26.4 11.4 25.4 17.9 20 20Z"
            transform={`rotate(${angle} 20 20)`}
            fill="currentColor"
            fillOpacity=".07"
          />
        ))}
        <circle cx="20" cy="20" r="2.4" fill="currentColor" fillOpacity=".9" />
      </g>
    </svg>
  );
}

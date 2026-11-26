import { Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/config/i18n";

export function AnnouncementBar({ dict }: { dict: Dictionary }) {
  return (
    <div
      role="region"
      aria-label={dict.announcement.label}
      className="relative z-40 bg-wine-900 text-ivory-100"
    >
      <Container>
        <div className="flex h-9 items-center justify-center gap-3 sm:gap-5">
          <span className="announcement-text flex items-center gap-2 whitespace-nowrap">
            <Truck
              size={12}
              strokeWidth={1.7}
              className="shrink-0 text-gold-300"
              aria-hidden="true"
            />
            {dict.announcement.shipping}
          </span>

          <span
            className="hidden size-1 rotate-45 bg-gold-400/80 md:block"
            aria-hidden="true"
          />
          <span className="announcement-text hidden whitespace-nowrap md:block">
            {dict.announcement.payment}
          </span>

          <span
            className="hidden size-1 rotate-45 bg-gold-400/80 lg:block"
            aria-hidden="true"
          />
          <span className="announcement-text hidden whitespace-nowrap lg:block">
            {dict.announcement.returns}
          </span>
        </div>
      </Container>

      <div
        className="gold-rule pointer-events-none absolute inset-x-0 bottom-0"
        aria-hidden="true"
      />
    </div>
  );
}

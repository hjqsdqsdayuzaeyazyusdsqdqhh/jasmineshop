import {
  Hand,
  Headphones,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/config/i18n";

const valueIcons: LucideIcon[] = [Sparkles, Hand, Truck, Headphones];

export function HomeValues({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-ivory-200 bg-white">
      <Container>
        <div className="grid gap-x-6 gap-y-8 py-9 sm:grid-cols-2 md:py-11 lg:grid-cols-4 lg:divide-x lg:divide-ivory-200 rtl:lg:divide-x-reverse">
          {dict.home.values.map((value, index) => {
            const Icon = valueIcons[index] ?? Sparkles;

            return (
              <div
                key={value.title}
                className="flex items-start gap-3.5 lg:justify-center lg:px-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-400/25 bg-ivory-50 text-gold-600">
                  <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.8rem] font-semibold text-wine-950">
                    {value.title}
                  </p>
                  <p className="mt-1 max-w-[15rem] text-[0.7rem] leading-relaxed text-smoke">
                    {value.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

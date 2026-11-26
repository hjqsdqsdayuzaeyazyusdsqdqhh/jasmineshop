import { UniverseCard } from "@/components/common/universe-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { localizedPath } from "@/config/i18n";
import { routes } from "@/config/navigation";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export function HomeUniverses({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-ivory-100 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.home.universes.eyebrow}
          title={dict.home.universes.title}
          description={dict.home.universes.description}
          actionHref={localizedPath(locale, routes.boutique)}
          actionLabel={dict.home.universes.cta}
        />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.universes.map((universe, index) => (
            <UniverseCard
              key={universe.id}
              universe={universe}
              href={`${localizedPath(locale, routes.boutique)}#${universe.id}`}
              cta={dict.common.viewUniverse}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

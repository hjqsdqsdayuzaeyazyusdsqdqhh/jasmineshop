import { PageHero } from "@/components/common/page-hero";
import { PreparedState } from "@/components/common/prepared-state";
import { localizedPath } from "@/config/i18n";
import type { Dictionary } from "@/config/i18n";
import type { Locale } from "@/types";

export type CollectionKey = keyof Dictionary["collections"];

export function PreparedCollectionPage({
  locale,
  dict,
  collection,
}: {
  locale: Locale;
  dict: Dictionary;
  collection: CollectionKey;
}) {
  const copy = dict.collections[collection];

  return (
    <main id="main" className="flex-1">
      <PageHero
        breadcrumbs={[
          {
            label: dict.common.home,
            href: localizedPath(locale, "/"),
          },
          { label: copy.title },
        ]}
        breadcrumbLabel={dict.common.breadcrumb}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <PreparedState locale={locale} dict={dict} />
    </main>
  );
}

import { HomeBanner } from "@/components/home/home-banner";
import { HomeContact } from "@/components/home/home-contact";
import { HomeNouveautes } from "@/components/home/home-nouveautes";
import { HomeStory } from "@/components/home/home-story";
import { HomeUniverses } from "@/components/home/home-universes";
import { HomeValues } from "@/components/home/home-values";
import { getDictionary, isLocale } from "@/config/i18n";
import { notFound } from "next/navigation";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <main id="main" className="flex-1">
      <HomeBanner locale={locale} dict={dict} />
      <HomeNouveautes locale={locale} dict={dict} />
      <HomeValues dict={dict} />
      <HomeUniverses locale={locale} dict={dict} />
      <HomeStory locale={locale} dict={dict} />
      <HomeContact locale={locale} dict={dict} />
    </main>
  );
}

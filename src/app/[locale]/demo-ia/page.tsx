import { notFound } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import VoiceDemo from "@/components/VoiceDemo";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { INDUSTRIES, getIndustry } from "@/lib/voice-demo";
import type { Metadata } from "next";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary((isValidLocale(locale) ? locale : "en") as Locale);
  const t = dict.voice_demo;
  return { title: t.meta_title, description: t.meta_description };
}

/**
 * Links para vendedores:
 *   /es/demo-ia?industria=barberia   abre directo en barbería
 *   /es/demo-ia?ref=cualquier-cosa   muestra las notas para el vendedor
 */
export default async function DemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.voice_demo;

  const query = await searchParams;
  const one = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? value[0] : value;
  };
  const industry = getIndustry(one("industria") ?? one("industry")) ?? INDUSTRIES[0];

  return (
    <>
      <section className="relative overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-24 pb-14 text-center">
          <AnimateIn>
            <div className="badge mb-5 mx-auto w-fit">{t.badge}</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              {t.h1_main} <span className="gradient-text">{t.h1_sub}</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl max-w-xl mx-auto">{t.subheadline}</p>
          </AnimateIn>
        </div>
      </section>

      <VoiceDemo
        t={t}
        locale={locale as Locale}
        initialIndustry={industry.slug}
        showSellerNotes={Boolean(one("ref"))}
      />
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lightbulb, Target, TrendingUp, Users } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const icons = [Lightbulb, Target, TrendingUp, Users];

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary((isValidLocale(locale) ? locale : "en") as Locale);
  const t = dict.about;
  return { title: `${t.badge} | Inmotion`, description: t.subheadline };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.about;
  const base = `/${locale}`;

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-16">
          <AnimateIn><div className="badge mb-5 w-fit">{t.badge}</div></AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              {t.h1_main} <span className="text-white/40">{t.h1_sub}</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl max-w-xl leading-relaxed">{t.subheadline}</p>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 flex flex-col gap-4">
          <AnimateIn><p className="text-white/60 text-lg leading-relaxed">{t.body1}</p></AnimateIn>
          <AnimateIn delay={60}><p className="text-white/30 text-lg leading-relaxed">{t.body2}</p></AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5">
          <AnimateIn className="mb-10"><h2 className="text-3xl font-bold tracking-tight">{t.values_title}</h2></AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.values.map((v, i) => {
                const Icon = icons[i];
                return (
                  <div key={v.title} className="card p-7 text-center">
                    <Icon size={24} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                    <h3 className="text-white font-semibold text-lg mb-1.5">{v.title}</h3>
                    <p className="text-white/40 text-sm">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(100,60,200,0.08),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.cta_h2}</h2>
            <p className="text-white/40 mb-8">{t.cta_sub}</p>
            <Link href={`${base}/contact`} className="btn-primary text-base px-7 py-3.5 inline-flex">
              {t.cta_btn} <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

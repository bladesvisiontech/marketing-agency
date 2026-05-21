import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Shield, TrendingUp, Zap, Layers } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const icons = [Shield, TrendingUp, Layers, Zap];

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary((isValidLocale(locale) ? locale : "en") as Locale);
  const t = dict.services_page.ecommerce;
  return { title: `${t.h1_main} ${t.h1_sub} | Inmotion`, description: t.subheadline };
}

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.services_page.ecommerce;
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
          <AnimateIn delay={120}><p className="text-white/50 text-xl mb-8 max-w-xl">{t.subheadline}</p></AnimateIn>
          <AnimateIn delay={180}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="https://buy.stripe.com/ecommerce1400" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-6 py-3">
                {t.cta} <ArrowRight size={16} />
              </a>
              <Link href={`${base}/contact`} className="btn-outline text-base px-6 py-3">{t.cta_questions}</Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5">
          <AnimateIn className="mb-10"><h2 className="text-3xl font-bold tracking-tight">{t.includes_title}</h2></AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {t.includes.map((item) => (
                <div key={item} className="card flex items-center gap-3 px-5 py-4">
                  <CheckCircle size={16} className="text-[#97c121] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5">
          <AnimateIn className="mb-10"><h2 className="text-3xl font-bold tracking-tight">{t.benefits_title}</h2></AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.benefits.map((b, i) => {
                const Icon = icons[i];
                return (
                  <div key={b.title} className="card p-6 text-center">
                    <Icon size={24} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                    <h3 className="text-white font-semibold mb-1.5">{b.title}</h3>
                    <p className="text-white/40 text-sm">{b.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.cta_final_h2}</h2>
            <p className="text-white/40 mb-8">{t.cta_final_sub}</p>
            <a href="https://buy.stripe.com/ecommerce1400" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-7 py-3.5 inline-flex">
              {t.cta_final_btn} <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

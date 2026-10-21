import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, X, ChevronDown } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { SimulatedVoiceOrb } from "@/components/ui/voice-orb-demo";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { PLATFORM_MONTHLY_RANGE } from "@/lib/voice-demo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary((isValidLocale(locale) ? locale : "en") as Locale);
  const t = dict.ai_receptionist;
  return { title: t.meta_title, description: t.meta_description };
}

export default async function AIReceptionistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.ai_receptionist;
  const base = `/${locale}`;
  const contactHref = `${base}/contact?service=ai-receptionist`;
  const range = PLATFORM_MONTHLY_RANGE;

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
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
              <Link href={`${base}/demo-ia`} className="btn-primary text-base px-6 py-3">
                {t.cta_demo} <ArrowRight size={16} />
              </Link>
              <Link href={contactHref} className="btn-outline text-base px-6 py-3">{t.cta_contact}</Link>
            </div>
            <p className="text-white/30 text-xs font-mono">{t.trust}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Qué incluye + demo */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <AnimateIn className="mb-10"><h2 className="text-3xl font-bold tracking-tight">{t.includes_title}</h2></AnimateIn>
            <AnimateIn stagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.includes.map((item) => (
                  <div key={item} className="card flex items-start gap-3 px-5 py-4">
                    <CheckCircle size={16} className="text-[#97c121] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={120}>
            <Link href={`${base}/demo-ia`} className="card p-8 flex flex-col items-center text-center gap-8 group">
              <SimulatedVoiceOrb className="w-48 lg:w-56" />
              <div>
                <p className="text-white font-semibold text-lg mb-1">{t.demo_card_title}</p>
                <p className="text-white/40 text-sm mb-4">{t.demo_card_body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-white/70 group-hover:text-white transition-colors">
                  {t.demo_card_cta} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* Proceso */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12"><h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.process_title}</h2></AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.steps.map((step, i) => (
                <div key={step} className="card p-7 flex items-start gap-5">
                  <span className="gradient-text font-bold text-3xl leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white font-medium leading-snug pt-1">{step}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Para quién / qué no incluye */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimateIn>
            <h2 className="text-3xl font-bold tracking-tight mb-8">{t.for_whom_title}</h2>
            <ul className="flex flex-col gap-4">
              {t.for_whom.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-[#97c121] flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h2 className="text-3xl font-bold tracking-tight mb-8">{t.not_included_title}</h2>
            <ul className="flex flex-col gap-4">
              {t.not_included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X size={16} className="text-white/30 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </section>

      {/* Cómo se paga */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <AnimateIn className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.pricing_title}</h2>
            <p className="text-white/40">{t.pricing_sub}</p>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="card p-8">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{t.setup_label}</p>
                <p className="gradient-text font-bold text-3xl mb-4">{t.setup_value}</p>
                <p className="text-white/50 text-sm leading-relaxed">{t.setup_note}</p>
              </div>
              <div className="card p-8">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{t.monthly_label}</p>
                <p className="text-white font-bold text-3xl mb-4">
                  {range
                    ? t.monthly_range.replace("{min}", String(range.min)).replace("{max}", String(range.max))
                    : t.monthly_value}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">{t.monthly_note}</p>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn>
            <Link href={contactHref} className="btn-primary text-base px-7 py-3.5 inline-flex">
              {t.pricing_cta} <ArrowRight size={16} />
            </Link>
            <p className="text-white/30 text-xs mt-4">{t.pricing_footnote}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Preguntas */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5">
          <AnimateIn className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.faq_title}</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="flex flex-col gap-3">
              {t.faq.map((item) => (
                <details key={item.q} className="group rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-white font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown size={18} className="text-white/40 flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="text-white/50 text-sm leading-relaxed mt-4">{item.a}</p>
                </details>
              ))}
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`${base}/demo-ia`} className="btn-primary text-base px-7 py-3.5">
                {t.cta_demo} <ArrowRight size={16} />
              </Link>
              <Link href={contactHref} className="btn-outline text-base px-7 py-3.5">{t.cta_contact}</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

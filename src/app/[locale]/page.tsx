import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, TrendingUp, Globe, Search, ShoppingCart, ClipboardCheck, ArrowRight, Star, Zap } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const serviceIcons = [Globe, Search, ClipboardCheck, ShoppingCart];
const benefitIcons = [Star, TrendingUp, Search, Zap];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const t = dict.home;
  const base = `/${locale}`;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(100,60,200,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <AnimateIn>
            <div className="badge mb-6 mx-auto w-fit">
              <span className="glow-dot" />
              {t.badge}
            </div>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
              {t.h1_main}{" "}
              <span className="gradient-text">{t.h1_accent}</span>
              <br className="hidden sm:block" />
              <span className="text-white/50"> {t.h1_sub}</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.subheadline}
            </p>
          </AnimateIn>
          <AnimateIn delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href={`${base}/contact`} className="btn-primary text-base px-6 py-3">
                {t.cta_primary} <ArrowRight size={16} />
              </Link>
              <Link href={`${base}/#services`} className="btn-outline text-base px-6 py-3">
                {t.cta_secondary}
              </Link>
            </div>
          </AnimateIn>
          <AnimateIn delay={320}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-white/35 text-sm">
              {t.microcopy.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-[#97c121]" /> {item}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* STATS */}
      <section className="section-sm border-y border-white/[0.06] bg-black">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn>
            <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-10">
              {t.stats_label}
            </p>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {t.stats.map((s) => (
                <div key={s.value} className="bg-black p-8 text-center">
                  <div className="stat-value text-4xl md:text-5xl font-bold gradient-text mb-2">{s.value}</div>
                  <p className="text-white/40 text-sm leading-snug mb-1">{s.label}</p>
                  <p className="text-white/20 text-xs">{s.source}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <AnimateIn><div className="badge mb-6 mx-auto w-fit">{t.problem_badge}</div></AnimateIn>
          <AnimateIn delay={60}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t.problem_h2_main}{" "}
              <span className="text-white/40">{t.problem_h2_sub}</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/40 text-lg mb-10">{t.problem_body}</p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="card p-6 text-left inline-flex flex-col gap-3 w-full max-w-sm mx-auto">
              <p className="text-white/40 text-sm mb-2">{t.problem_prefix}</p>
              {t.problems.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500/70" />
                  <span className="text-white/60 text-sm">{p}</span>
                </div>
              ))}
              <div className="divider my-1" />
              <p className="text-white/80 text-sm font-medium">{t.problem_conclusion}</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12 text-center">
            <div className="badge mb-4 mx-auto w-fit">{t.services_badge}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.services_h2}</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.services.map((s, i) => {
                const Icon = serviceIcons[i];
                return (
                  <div key={s.title} className="card p-6 flex flex-col">
                    <Icon size={24} className="text-white/40 mb-5" strokeWidth={1.5} />
                    <h3 className="text-white font-semibold text-base mb-0.5">{s.title}</h3>
                    <p className="gradient-text font-bold text-xl mb-3">{s.price}</p>
                    <p className="text-white/40 text-sm flex-1 mb-5 leading-relaxed">{s.desc}</p>
                    <div className="flex flex-col gap-2 mt-auto">
                      <a
                        href={s.stripeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent text-sm py-2.5"
                      >
                        {s.cta}
                      </a>
                      <Link
                        href={`${base}${s.internal}`}
                        className="text-white/30 text-center text-xs hover:text-white/60 transition-colors flex items-center justify-center gap-1 py-1"
                      >
                        {t.see_details} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section border-t border-white/[0.06] dot-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.benefits_h2_main}{" "}
              <span className="text-white/40">{t.benefits_h2_sub}</span>
            </h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <div key={b.title} className="card p-6 text-center">
                    <Icon size={28} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                    <h3 className="text-white font-semibold mb-1.5">{b.title}</h3>
                    <p className="text-white/40 text-sm">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.process_h2}</h2>
            <p className="text-white/40 mt-3 max-w-md">{t.process_sub}</p>
          </AnimateIn>
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

      {/* TESTIMONIALS */}
      <section id="cases" className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12 text-center">
            <div className="badge mb-4 mx-auto w-fit">{t.social_badge}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.social_h2_main}{" "}
              <span className="text-white/40">{t.social_h2_sub}</span>
            </h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.testimonials.map((test) => (
                <div key={test.quote} className="card p-7">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-[#97c121] fill-[#97c121]" />
                    ))}
                  </div>
                  <p className="text-white/80 text-base leading-relaxed mb-5">&quot;{test.quote}&quot;</p>
                  <p className="text-white/25 text-sm">{test.author}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(100,60,200,0.08),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{t.cta_final_h2}</h2>
            <p className="text-white/40 text-lg mb-8">{t.cta_final_sub}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`${base}/contact`} className="btn-primary text-base px-7 py-3.5">
                {t.cta_final_primary} <ArrowRight size={16} />
              </Link>
              <Link href={`${base}/#services`} className="btn-outline text-base px-7 py-3.5">
                {t.cta_final_secondary}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

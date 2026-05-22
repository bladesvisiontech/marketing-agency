import { notFound } from "next/navigation";
import Link from "next/link";
import { TrendingUp, Search, ArrowRight, Star, Zap } from "lucide-react";
import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const serviceIconSrcs = ["/icons/web.png", "/icons/search.png", "/icons/task.png", "/icons/cart.png"];
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
      <section className="relative min-h-screen flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(100,60,200,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* LEFT — text */}
          <div className="flex-1 text-center lg:text-left">
            <AnimateIn>
              <div className="h-6" />
            </AnimateIn>
            <AnimateIn delay={80}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                {t.h1_main}{" "}
                <span className="gradient-text">{t.h1_accent}</span>
                {t.h1_sub && (
                  <>
                    <br className="hidden sm:block" />
                    <span className="text-white/50"> {t.h1_sub}</span>
                  </>
                )}
              </h1>
            </AnimateIn>
            <AnimateIn delay={160}>
              <p className="text-white/50 text-lg md:text-xl max-w-xl lg:mx-0 mx-auto mb-8 leading-relaxed">
                {t.subheadline}
              </p>
            </AnimateIn>
            <AnimateIn delay={240}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <Link href={`${base}/contact`} className="btn-primary text-base px-6 py-3">
                  {t.cta_primary} <ArrowRight size={16} />
                </Link>
                <Link href={`${base}/#services`} className="btn-outline text-base px-6 py-3">
                  {t.cta_secondary}
                </Link>
              </div>
            </AnimateIn>
          </div>

          {/* RIGHT — hero image with floating tags */}
          <AnimateIn delay={200} className="flex-1 relative flex items-center justify-center w-full max-w-lg lg:max-w-none">
            <div className="relative w-full max-w-[520px] mx-auto">
              <Image
                src="/hero-image.png"
                alt="Inmotion services"
                width={520}
                height={520}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
              {/* Floating tags */}
              <span className="absolute top-[8%] left-[10%] flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97c121] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#97c121]" /></span> Sales
              </span>
              <span className="absolute top-[4%] right-[12%] flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b4fd8] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b4fd8]" /></span> Automation
              </span>
              <span className="absolute top-[42%] right-[4%] flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9b27f9] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#9b27f9]" /></span> AI
              </span>
              <span className="absolute bottom-[28%] left-[2%] flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97c121] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#97c121]" /></span> Marketing
              </span>
              <span className="absolute bottom-[12%] left-[18%] flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b4fd8] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b4fd8]" /></span> Self Manage
              </span>
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
                return (
                  <div key={s.title} className="card p-6 flex flex-col">
                    <Image src={serviceIconSrcs[i]} alt={s.title} width={100} height={100} className="mb-5 w-[100px] h-[100px] object-contain" />
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

      {/* OUR WORK */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 py-20">
          <AnimateIn className="mb-16">
            <div className="badge mb-4 w-fit">Our work</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Results we&apos;ve delivered.</h2>
          </AnimateIn>

          {/* Case 01 */}
          <AnimateIn className="flex flex-col lg:flex-row gap-8 mb-6 border-t border-white/[0.06] pt-10">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0 flex flex-col justify-between gap-6">
              <div>
                <span className="text-white/20 text-xs font-mono mb-4 block">01</span>
                <h3 className="text-white font-bold text-xl mb-3">Blades Vision</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">Full website design, development &amp; local SEO for a barbershop in Houston, TX. Ranked on Google page 1 for local searches within 60 days.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Web Design", "Local SEO", "Google Optimization"].map((tag) => (
                    <span key={tag} className="text-white/40 border border-white/[0.1] rounded-full px-3 py-1 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
              <a href="https://www.bladesvision.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                View live site <ArrowRight size={13} />
              </a>
            </div>

            {/* Video */}
            <div className="flex-1 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] aspect-video">
              <video src="/work/bladesvision.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          </AnimateIn>

          {/* Case 02 */}
          <AnimateIn className="flex flex-col lg:flex-row gap-8 border-t border-white/[0.06] pt-10">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0 flex flex-col justify-between gap-6">
              <div>
                <span className="text-white/20 text-xs font-mono mb-4 block">02</span>
                <h3 className="text-white font-bold text-xl mb-3">KKD Avenue</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">Website design + SEO strategy for a retail brand. Custom design aligned with the brand identity, fully optimized for search from launch.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Web Design", "SEO", "Digital Strategy"].map((tag) => (
                    <span key={tag} className="text-white/40 border border-white/[0.1] rounded-full px-3 py-1 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
              <a href="https://www.kkdavenuehtx.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                View live site <ArrowRight size={13} />
              </a>
            </div>

            {/* Video */}
            <div className="flex-1 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] aspect-video">
              <video src="/work/kkdavenue.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
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
                <div key={test.quote} className="card p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-[#97c121] fill-[#97c121]" />
                    ))}
                  </div>
                  <p className="text-white/80 text-base leading-relaxed mb-6 flex-1">&quot;{test.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <Image src={test.avatar} alt={test.author} width={40} height={40} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
                    <div>
                      <p className="text-white text-sm font-medium">{test.author}</p>
                      <p className="text-white/30 text-xs">{test.company}</p>
                    </div>
                  </div>
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

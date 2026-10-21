import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { SimulatedVoiceOrb } from "@/components/ui/voice-orb-demo";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { INDUSTRIES } from "@/lib/voice-demo";

interface AIReceptionistSectionProps {
  t: Dictionary["home"];
  locale: Locale;
}

export default function AIReceptionistSection({ t, locale }: AIReceptionistSectionProps) {
  const base = `/${locale}`;

  return (
    <section className="section border-t border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_75%_50%,rgba(100,60,200,0.12),transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <AnimateIn><div className="badge mb-6 w-fit">{t.ai_badge}</div></AnimateIn>
          <AnimateIn delay={60}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
              {t.ai_h2_main} <span className="gradient-text">{t.ai_h2_sub}</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl mb-8">{t.ai_body}</p>
            <ul className="flex flex-col gap-3 mb-10">
              {t.ai_points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[#97c121] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`${base}/demo-ia`} className="btn-primary text-base px-6 py-3">
                {t.ai_cta_demo} <ArrowRight size={16} />
              </Link>
              <Link href={`${base}/services/ai-receptionist`} className="btn-outline text-base px-6 py-3">
                {t.ai_cta_service}
              </Link>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={120} className="flex flex-col items-center">
          <Link href={`${base}/demo-ia`} aria-label={t.ai_cta_demo} className="rounded-full">
            <SimulatedVoiceOrb className="w-64 sm:w-80" />
          </Link>
          <p className="text-white/30 text-xs uppercase tracking-widest mt-10 mb-4">{t.ai_industries}</p>
          <ul className="flex flex-wrap justify-center gap-2 max-w-md">
            {INDUSTRIES.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`${base}/demo-ia?industria=${industry.slug}`}
                  className="inline-flex text-white/40 border border-white/[0.1] rounded-full px-3 py-1 text-xs hover:text-white hover:border-white/30 transition-colors"
                >
                  {industry.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </div>
    </section>
  );
}

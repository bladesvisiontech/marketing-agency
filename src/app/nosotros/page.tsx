import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Target, TrendingUp, Users, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Nosotros | Inmotion",
  description: "No creemos en páginas bonitas sin estrategia. Cada proyecto se diseña para generar confianza, atraer clientes y aumentar conversiones.",
};

const values = [
  { Icon: Lightbulb, title: "Claridad", desc: "Sin procesos complicados." },
  { Icon: Target, title: "Estrategia", desc: "Cada decisión tiene un propósito." },
  { Icon: TrendingUp, title: "Conversión", desc: "Todo debe generar resultados." },
  { Icon: Users, title: "Experiencia", desc: "Diseño pensado para usuarios reales." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-16">
          <AnimateIn>
            <div className="badge mb-5 w-fit">Nosotros</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              Diseñamos sistemas digitales{" "}
              <span className="text-white/40">para crecer negocios</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl max-w-xl leading-relaxed">
              No creemos en páginas bonitas sin estrategia. Cada proyecto se diseña con un objetivo: generar confianza, atraer clientes y aumentar conversiones.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5">
          <AnimateIn className="mb-3">
            <p className="text-white/60 text-lg leading-relaxed">
              Combinamos diseño, marketing y experiencia de usuario para construir activos digitales que realmente ayuden a crecer.
            </p>
          </AnimateIn>
          <AnimateIn delay={60}>
            <p className="text-white/30 text-lg leading-relaxed">
              We don&apos;t build websites just to look good. We build digital systems designed to grow your business.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5">
          <AnimateIn className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Nuestros valores</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v) => (
                <div key={v.title} className="card p-7 text-center">
                  <v.Icon size={24} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold text-lg mb-1.5">{v.title}</h3>
                  <p className="text-white/40 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(100,60,200,0.08),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              ¿Listo para crecer?
            </h2>
            <p className="text-white/40 mb-8">Cuéntanos tu proyecto y diseñamos la estrategia que necesitas.</p>
            <Link href="/contacto" className="btn-primary text-base px-7 py-3.5 inline-flex">
              Quiero una propuesta <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Search, TrendingUp, Lightbulb, Target, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Auditoría Digital | Inmotion",
  description: "Detecta qué está frenando tus ventas online. Auditoría digital desde USD 800.",
};

const analyzed = ["UX/UI", "Conversión", "Velocidad", "SEO", "Embudos", "Mensajes y copy", "CTAs", "Mobile experience", "Branding digital"];

const deliverables = [
  { Icon: Search, title: "Diagnóstico completo", desc: "Qué está funcionando y qué no." },
  { Icon: Target, title: "Prioridades claras", desc: "Qué cambiar primero para mejorar resultados." },
  { Icon: TrendingUp, title: "Plan accionable", desc: "Recomendaciones concretas." },
  { Icon: Lightbulb, title: "Oportunidades ocultas", desc: "Puntos de mejora que hoy probablemente no estás viendo." },
];

export default function AuditoriaPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-16">
          <AnimateIn>
            <div className="badge mb-5 w-fit">Auditoría Digital</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              Descubre qué frena{" "}
              <span className="text-white/40">tus ventas online</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl mb-8 max-w-xl">
              A veces el problema no es el tráfico. Es la experiencia.
            </p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://buy.stripe.com/auditoria800"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3"
              >
                Quiero mi auditoría — USD 800 <ArrowRight size={16} />
              </a>
              <Link href="/contacto" className="btn-outline text-base px-6 py-3">
                Tengo preguntas
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5">
          <AnimateIn className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Qué analizamos</h2>
          </AnimateIn>
          <AnimateIn>
            <div className="flex flex-wrap gap-3">
              {analyzed.map((item) => (
                <div key={item} className="card flex items-center gap-2 px-4 py-2">
                  <CheckCircle size={14} className="text-[#97c121]" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5">
          <AnimateIn className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Qué recibes</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deliverables.map((d) => (
                <div key={d.title} className="card p-6 text-center">
                  <d.Icon size={24} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold mb-1.5">{d.title}</h3>
                  <p className="text-white/40 text-sm">{d.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Tu negocio no necesita más suposiciones.
            </h2>
            <p className="text-white/40 text-xl mb-2">Necesita claridad.</p>
            <p className="text-white/30 mb-8">Con datos reales y un plan accionable, sabrás exactamente qué cambiar para vender más.</p>
            <a
              href="https://buy.stripe.com/auditoria800"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-7 py-3.5 inline-flex"
            >
              Quiero detectar los problemas — USD 800 <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, TrendingUp, Zap, Award, Users, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "SEO — Posicionamiento en Google | Inmotion",
  description: "Posicionamos tu negocio para atraer tráfico de calidad desde Google. Desde USD 500.",
};

const includes = [
  "Auditoría SEO inicial",
  "Keyword research",
  "Optimización on-page",
  "SEO técnico",
  "Optimización velocidad",
  "Estrategia de contenido",
  "Indexación Google",
  "Reporte mensual",
];

const benefits = [
  { Icon: Users, title: "Más visibilidad", desc: "Aparece frente a clientes con intención de compra." },
  { Icon: TrendingUp, title: "Tráfico constante", desc: "Menos dependencia de anuncios." },
  { Icon: Award, title: "Autoridad", desc: "Tu negocio gana confianza online." },
  { Icon: Zap, title: "Más oportunidades", desc: "Más visitas calificadas." },
];

export default function SeoPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-16">
          <AnimateIn>
            <div className="badge mb-5 w-fit">SEO</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              Aparece cuando tus{" "}
              <span className="text-white/40">clientes te buscan</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl mb-8 max-w-xl">
              El mejor sitio del mundo no sirve si nadie lo encuentra.
            </p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://buy.stripe.com/seo500"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3"
              >
                Quiero posicionarme — USD 500 <ArrowRight size={16} />
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
            <h2 className="text-3xl font-bold tracking-tight">Qué incluye</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includes.map((item) => (
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
          <AnimateIn className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Beneficios</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="card p-6 text-center">
                  <b.Icon size={24} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold mb-1.5">{b.title}</h3>
                  <p className="text-white/40 text-sm">{b.desc}</p>
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
              Si no apareces en Google, estás perdiendo clientes.
            </h2>
            <p className="text-white/40 mb-8">Cada día sin SEO es un día que tus competidores ganan terreno.</p>
            <a
              href="https://buy.stripe.com/seo500"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-7 py-3.5 inline-flex"
            >
              Quiero empezar SEO — USD 500 <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

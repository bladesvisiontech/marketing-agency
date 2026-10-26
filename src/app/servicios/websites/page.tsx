import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Websites que convierten | Inmotion",
  description: "Sitios rápidos, estratégicos y enfocados en conversión. Desde USD 700.",
};

const includes = [
  "Diseño UI/UX estratégico",
  "Sitio responsive",
  "Optimización velocidad",
  "SEO base",
  "Formularios de conversión",
  "Integración WhatsApp",
  "CTAs estratégicos",
  "Diseño enfocado en confianza",
];

const problems = [
  { problem: '"Mi web no genera clientes"', solution: "Creamos estructuras pensadas para conversión." },
  { problem: '"Mi negocio no transmite confianza"', solution: "Diseño premium y profesional." },
  { problem: '"Mi sitio carga lento"', solution: "Optimización técnica y rendimiento." },
  { problem: '"La gente entra y se va"', solution: "Experiencia enfocada en retención y acción." },
];

export default function WebsitesPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-16">
          <AnimateIn>
            <div className="badge mb-5 w-fit">Websites</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              Websites que convierten{" "}
              <span className="text-white/40">visitas en clientes</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl mb-8 max-w-xl">
              Tu web debería ayudarte a vender. No solo verse bonita.
            </p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://buy.stripe.com/website700"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3"
              >
                Empezar mi proyecto — USD 700 <ArrowRight size={16} />
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
        <div className="max-w-4xl mx-auto px-5">
          <AnimateIn className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Problemas que resolvemos</h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.map((p) => (
                <div key={p.problem} className="card p-6">
                  <p className="text-white/30 text-sm mb-2">{p.problem}</p>
                  <p className="text-white/80 font-medium">{p.solution}</p>
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
              Tu sitio puede ser tu mejor vendedor.
            </h2>
            <p className="text-white/40 mb-8">Un activo digital que trabaja 24/7 para atraer y convertir clientes.</p>
            <a
              href="https://buy.stripe.com/website700"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-7 py-3.5 inline-flex"
            >
              Quiero mi website — USD 700 <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Shield, TrendingUp, Zap, Layers, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "E-commerce — Tiendas online que venden | Inmotion",
  description: "E-commerce rápidos, confiables y optimizados para aumentar ventas. Desde USD 1400.",
};

const includes = [
  "Diseño premium",
  "Arquitectura de conversión",
  "Integración pagos",
  "Optimización mobile",
  "Configuración productos",
  "Carrito optimizado",
  "SEO base",
  "Automatizaciones básicas",
  "Integración WhatsApp",
];

const benefits = [
  { Icon: Shield, title: "Más confianza", desc: "Experiencia de compra profesional." },
  { Icon: TrendingUp, title: "Más conversiones", desc: "Menos fricción en checkout." },
  { Icon: Layers, title: "Más escalabilidad", desc: "Preparado para crecer." },
  { Icon: Zap, title: "Mejor experiencia", desc: "Compra simple y rápida." },
];

export default function EcommercePage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden dot-grid">
        <div className="beam" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-16">
          <AnimateIn>
            <div className="badge mb-5 w-fit">E-commerce</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              Tiendas online diseñadas{" "}
              <span className="text-white/40">para vender</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/50 text-xl mb-8 max-w-xl">
              No necesitas solo una tienda. Necesitas un sistema que convierta.
            </p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://buy.stripe.com/ecommerce1400"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3"
              >
                Quiero mi tienda — USD 1400 <ArrowRight size={16} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
              Cada clic cuenta.
            </h2>
            <p className="text-white/40 mb-8">Haz que cada visita tenga más posibilidades de comprar.</p>
            <a
              href="https://buy.stripe.com/ecommerce1400"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-7 py-3.5 inline-flex"
            >
              Quiero mi e-commerce — USD 1400 <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

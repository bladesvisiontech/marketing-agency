import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Shield, TrendingUp, Zap, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "E-commerce — Tiendas online que venden | GrowthLab",
  description:
    "Creamos e-commerce rápidos, confiables y optimizados para aumentar ventas desde USD 1400.",
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
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Tiendas online diseñadas{" "}
            <span className="gradient-text">para vender</span>
          </h1>
          <p className="text-gray-400 text-xl mb-6">
            No necesitas solo una tienda. Necesitas un sistema que convierta.
          </p>
          <p className="text-gray-300 mb-8">
            Creamos e-commerce rápidos, confiables y optimizados para aumentar ventas.
          </p>
          <div className="gradient-text font-extrabold text-5xl mb-8">USD 1400</div>
          <a
            href="https://buy.stripe.com/ecommerce1400"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
          >
            Quiero mi tienda online
          </a>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Qué incluye</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {includes.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-black border border-white/10 rounded-xl p-4">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Beneficios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-6 rounded-2xl border border-white/10 bg-zinc-950 card-hover">
                <b.Icon size={36} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-green-950/30 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Cada clic cuenta.
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Haz que cada visita tenga más posibilidades de comprar.
        </p>
        <a
          href="https://buy.stripe.com/ecommerce1400"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
        >
          Quiero mi e-commerce — USD 1400
        </a>
        <div className="mt-4">
          <Link href="/contacto" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
            ¿Tienes preguntas? Hablemos →
          </Link>
        </div>
      </section>
    </>
  );
}

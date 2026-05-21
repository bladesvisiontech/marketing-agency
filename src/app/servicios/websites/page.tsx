import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Websites que convierten | GrowthLab",
  description:
    "Tu web debería ayudarte a vender. No solo verse bonita. Sitios rápidos, estratégicos y enfocados en conversión desde USD 700.",
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
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Websites que convierten{" "}
            <span className="gradient-text">visitas en clientes</span>
          </h1>
          <p className="text-gray-400 text-xl mb-6">
            Tu web debería ayudarte a vender. No solo verse bonita.
          </p>
          <p className="text-gray-300 mb-8">
            Creamos sitios rápidos, estratégicos y enfocados en conversión.
          </p>
          <div className="gradient-text font-extrabold text-5xl mb-8">USD 700</div>
          <a
            href="https://buy.stripe.com/website700"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
          >
            Empezar mi proyecto
          </a>
        </div>
      </section>

      {/* INCLUDES */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Qué incluye</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {includes.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-black border border-white/10 rounded-xl p-4">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Problemas que resolvemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((p) => (
              <div key={p.problem} className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">{p.problem}</p>
                <p className="text-white font-semibold">{p.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-green-950/30 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Tu sitio puede convertirse en tu mejor vendedor.
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Un sitio estratégico que trabaja 24/7 para atraer y convertir clientes.
        </p>
        <a
          href="https://buy.stripe.com/website700"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
        >
          Quiero mi website — USD 700
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

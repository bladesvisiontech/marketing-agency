import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, TrendingUp, Zap, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO — Posicionamiento en Google | GrowthLab",
  description:
    "Posicionamos tu negocio para atraer tráfico de calidad desde Google. SEO desde USD 500.",
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
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Aparece cuando tus{" "}
            <span className="gradient-text">clientes te buscan</span>
          </h1>
          <p className="text-gray-400 text-xl mb-6">
            El mejor sitio del mundo no sirve si nadie lo encuentra.
          </p>
          <p className="text-gray-300 mb-8">
            Posicionamos tu negocio para atraer tráfico de calidad desde Google.
          </p>
          <div className="gradient-text font-extrabold text-5xl mb-8">USD 500</div>
          <a
            href="https://buy.stripe.com/seo500"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
          >
            Quiero posicionarme
          </a>
        </div>
      </section>

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
          Si no apareces en Google, estás perdiendo clientes.
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Cada día sin SEO es un día ganando tus competidores.
        </p>
        <a
          href="https://buy.stripe.com/seo500"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
        >
          Quiero empezar SEO — USD 500
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

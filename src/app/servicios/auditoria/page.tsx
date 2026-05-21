import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Search, TrendingUp, Lightbulb, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Auditoría Digital — Detecta qué frena tus ventas | GrowthLab",
  description:
    "Analizamos tu ecosistema digital para detectar fugas, errores y oportunidades. Auditoría desde USD 800.",
};

const analyzed = [
  "UX/UI",
  "Conversión",
  "Velocidad",
  "SEO",
  "Embudos",
  "Mensajes y copy",
  "CTAs",
  "Mobile experience",
  "Branding digital",
];

const deliverables = [
  { Icon: Search, title: "Diagnóstico completo", desc: "Qué está funcionando y qué no." },
  { Icon: Target, title: "Prioridades claras", desc: "Qué cambiar primero para mejorar resultados." },
  { Icon: TrendingUp, title: "Plan accionable", desc: "Recomendaciones concretas." },
  { Icon: Lightbulb, title: "Oportunidades ocultas", desc: "Puntos de mejora que probablemente hoy no estás viendo." },
];

export default function AuditoriaPage() {
  return (
    <>
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Descubre qué está{" "}
            <span className="gradient-text">frenando tus ventas online</span>
          </h1>
          <p className="text-gray-400 text-xl mb-6">
            A veces el problema no es el tráfico. Es la experiencia.
          </p>
          <p className="text-gray-300 mb-8">
            Analizamos tu ecosistema digital para detectar fugas, errores y oportunidades.
          </p>
          <div className="gradient-text font-extrabold text-5xl mb-8">USD 800</div>
          <a
            href="https://buy.stripe.com/auditoria800"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
          >
            Quiero mi auditoría
          </a>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Qué analizamos</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {analyzed.map((item) => (
              <div key={item} className="flex items-center gap-2 bg-black border border-green-500/30 rounded-full px-5 py-2.5">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-gray-200 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Qué recibes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((d) => (
              <div key={d.title} className="text-center p-6 rounded-2xl border border-white/10 bg-zinc-950 card-hover">
                <d.Icon size={36} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">{d.title}</h3>
                <p className="text-gray-400 text-sm">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-green-950/30 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Tu negocio no necesita más suposiciones.
        </h2>
        <p className="text-gray-400 mb-4 text-lg">Necesita claridad.</p>
        <p className="text-gray-500 mb-8">
          Con datos reales y un plan accionable, sabrás exactamente qué cambiar para vender más.
        </p>
        <a
          href="https://buy.stripe.com/auditoria800"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
        >
          Quiero detectar los problemas — USD 800
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

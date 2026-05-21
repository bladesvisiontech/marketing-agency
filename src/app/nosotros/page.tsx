import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Target, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | GrowthLab",
  description:
    "No creemos en páginas bonitas sin estrategia. Cada proyecto se diseña para generar confianza, atraer clientes y aumentar conversiones.",
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
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Diseñamos sistemas digitales{" "}
            <span className="gradient-text">pensados para crecer negocios</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-6">
            No creemos en páginas bonitas sin estrategia.
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Cada proyecto se diseña con un objetivo: generar confianza, atraer clientes y aumentar conversiones. Combinamos diseño, marketing y experiencia de usuario para construir activos digitales que realmente ayuden a crecer.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            We don&apos;t build websites just to look good. We build digital systems designed to grow your business.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 rounded-2xl border border-white/10 bg-black card-hover">
                <v.Icon size={36} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-black to-green-950/30 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          ¿Listo para crecer?
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Cuéntanos tu proyecto y diseñamos la estrategia que necesitas.
        </p>
        <Link
          href="/contacto"
          className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
        >
          Quiero una propuesta
        </Link>
      </section>
    </>
  );
}

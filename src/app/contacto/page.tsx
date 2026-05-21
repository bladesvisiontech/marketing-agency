"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { MessageCircle } from "lucide-react";

const goals = [
  "Quiero un website",
  "Quiero SEO",
  "Quiero una auditoría digital",
  "Quiero un e-commerce",
  "Otro",
];

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    whatsapp: "",
    objetivo: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola, mi nombre es ${form.nombre}. Empresa: ${form.empresa}. Email: ${form.email}. Objetivo: ${form.objetivo}.`
    );
    window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
    setSent(true);
  }

  return (
    <>
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Hablemos de cómo{" "}
            <span className="gradient-text">hacer crecer tu negocio online</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Cuéntanos qué necesitas y te mostraremos la mejor solución para aumentar resultados.
          </p>

          {sent ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
              <p className="text-green-400 text-xl font-semibold mb-2">¡Gracias por contactarnos!</p>
              <p className="text-gray-400">Te redirigimos a WhatsApp. Responderemos en breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-950 border border-white/10 rounded-2xl p-8 text-left flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Objetivo principal *</label>
                <select
                  name="objetivo"
                  required
                  value={form.objetivo}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                >
                  <option value="">Selecciona tu objetivo</option>
                  {goals.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="gradient-bg text-black font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity mt-2"
              >
                Quiero recibir una propuesta
              </button>
            </form>
          )}

          <div className="mt-10 flex justify-center gap-6">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

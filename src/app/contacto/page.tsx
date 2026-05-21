"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const goals = [
  "Quiero un website",
  "Quiero SEO",
  "Quiero una auditoría digital",
  "Quiero un e-commerce",
  "Otro",
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", whatsapp: "", objetivo: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola, mi nombre es ${form.nombre}. Empresa: ${form.empresa || "N/A"}. Email: ${form.email}. Objetivo: ${form.objetivo}.`
    );
    window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
    setSent(true);
  }

  return (
    <>
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden dot-grid pt-24 pb-16 px-5">
        <div className="beam" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl">
          <AnimateIn>
            <div className="badge mb-5 w-fit">Contacto</div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Hablemos de cómo{" "}
              <span className="text-white/40">hacer crecer tu negocio</span>
            </h1>
            <p className="text-white/40 text-lg mb-8">
              Cuéntanos qué necesitas y te mostraremos la mejor solución para aumentar resultados.
            </p>
          </AnimateIn>

          <AnimateIn delay={100}>
            {sent ? (
              <div className="card p-8 text-center">
                <div className="glow-dot mx-auto mb-4" />
                <p className="text-white font-semibold text-lg mb-1">¡Mensaje enviado!</p>
                <p className="text-white/40 text-sm">Te redirigimos a WhatsApp. Responderemos en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-7 flex flex-col gap-5">
                {[
                  { name: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre", required: true },
                  { name: "empresa", label: "Empresa", type: "text", placeholder: "Nombre de tu empresa", required: false },
                  { name: "email", label: "Email", type: "email", placeholder: "tu@email.com", required: true },
                  { name: "whatsapp", label: "WhatsApp", type: "tel", placeholder: "+1 234 567 890", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-white/40 text-xs font-medium uppercase tracking-wide mb-2">
                      {f.label} {f.required && <span className="text-white/20">*</span>}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      required={f.required}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-white/40 text-xs font-medium uppercase tracking-wide mb-2">
                    Objetivo principal <span className="text-white/20">*</span>
                  </label>
                  <select
                    name="objetivo"
                    required
                    value={form.objetivo}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
                  >
                    <option value="" className="bg-black">Selecciona tu objetivo</option>
                    {goals.map((g) => (
                      <option key={g} value={g} className="bg-black">{g}</option>
                    ))}
                  </select>
                </div>

                <div className="divider" />

                <button type="submit" className="btn-primary py-3.5 text-sm w-full">
                  Quiero recibir una propuesta <ArrowRight size={15} />
                </button>
              </form>
            )}
          </AnimateIn>

          <AnimateIn delay={200}>
            <div className="mt-6 flex justify-center gap-6">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/25 hover:text-white/60 text-sm transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 hover:text-white/60 text-sm transition-colors"
              >
                Instagram
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

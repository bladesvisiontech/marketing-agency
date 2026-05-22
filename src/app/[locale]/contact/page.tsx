"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import en from "@/dictionaries/en";
import es from "@/dictionaries/es";

export default function ContactPage() {
  const params = useParams();
  const locale = params?.locale === "es" ? "es" : "en";
  const dict = locale === "es" ? es : en;
  const t = dict.contact;

  const [form, setForm] = useState({ name: "", company: "", email: "", goal: "", phone: "", comments: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError(
        locale === "es"
          ? "Algo salió mal. Intenta de nuevo."
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: "name",    label: t.fields.name,    type: "text",  placeholder: "John Smith",          required: true  },
    { name: "company", label: t.fields.company,  type: "text",  placeholder: "Acme Inc.",           required: false },
    { name: "email",   label: t.fields.email,    type: "email", placeholder: "you@company.com",     required: true  },
    { name: "phone",   label: t.fields.phone,    type: "tel",   placeholder: "+1 832 000 0000",     required: false },
  ];

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden dot-grid pt-24 pb-16 px-5">
      <div className="beam" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl">
        <AnimateIn>
          <div className="badge mb-5 w-fit">{t.badge}</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {t.h1_main} <span className="text-white/40">{t.h1_sub}</span>
          </h1>
          <p className="text-white/40 text-lg mb-8">{t.subheadline}</p>
        </AnimateIn>

        <AnimateIn delay={100}>
          {sent ? (
            <div className="card p-8 text-center">
              <div className="glow-dot mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-1">{t.sent_title}</p>
              <p className="text-white/40 text-sm">{t.sent_body}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-7 flex flex-col gap-5">
              {fields.map((f) => (
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
                  {t.fields.goal} <span className="text-white/20">*</span>
                </label>
                <select
                  name="goal"
                  required
                  value={form.goal}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
                >
                  <option value="" className="bg-black">{t.fields.goal_placeholder}</option>
                  {t.fields.goals.map((g) => (
                    <option key={g} value={g} className="bg-black">{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/40 text-xs font-medium uppercase tracking-wide mb-2">
                  {t.fields.comments}
                </label>
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  placeholder={t.fields.comments_placeholder}
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/20 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <div className="divider" />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3.5 text-sm w-full disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> {locale === "es" ? "Enviando…" : "Sending…"}</>
                  : <>{t.fields.submit} <ArrowRight size={15} /></>
                }
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}

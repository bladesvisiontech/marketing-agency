"use client";
import { useId, useState } from "react";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import type { Industry } from "@/lib/voice-demo";

interface RoiCalculatorProps {
  t: Dictionary["voice_demo"];
  locale: Locale;
  /** Valores de la industria elegida. Usa key para reiniciar al cambiar de industria. */
  defaults: Industry["roi"];
}

/** Calculadora de dinero perdido por llamadas no contestadas. */
export default function RoiCalculator({ t, locale, defaults }: RoiCalculatorProps) {
  const [missed, setMissed] = useState(defaults.missedCallsPerWeek);
  const [ticket, setTicket] = useState(defaults.avgTicket);
  const [rate, setRate] = useState(defaults.closeRate);
  const id = useId();

  const monthly = Math.round(missed * 4.3 * (rate / 100) * ticket);
  const money = new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <section className="section border-t border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(100,60,200,0.08),transparent)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <div className="mb-12 text-center">
          <div className="badge mb-4 mx-auto w-fit">{t.roi_badge}</div>
          <h2 id={`${id}-title`} className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
            {t.roi_title}
          </h2>
        </div>

        <div role="group" aria-labelledby={`${id}-title`} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 flex flex-col gap-7">
            <Field id={`${id}-missed`} label={t.roi_missed} value={missed} max={500} sliderMax={100} step={1} onChange={setMissed} />
            <Field
              id={`${id}-ticket`}
              label={t.roi_ticket}
              value={ticket}
              max={50000}
              sliderMax={niceMax(defaults.avgTicket * 4)}
              step={5}
              onChange={setTicket}
            />
            <Field id={`${id}-rate`} label={t.roi_rate} value={rate} max={100} sliderMax={100} step={1} onChange={setRate} />
          </div>

          <div
            className="rounded-xl border border-[#9b27f9]/30 bg-white/[0.03] p-6 md:p-8 flex flex-col justify-center"
            aria-live="polite"
          >
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{t.roi_result}</p>
            <p className="stat-value gradient-text text-5xl md:text-6xl font-bold mb-6">{money.format(monthly)}</p>
            <p className="text-white/30 text-xs leading-relaxed">{t.roi_foot}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  max,
  sliderMax,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  max: number;
  sliderMax: number;
  step: number;
  onChange: (n: number) => void;
}) {
  const clamp = (n: number) => Math.max(0, Math.min(max, Number.isFinite(n) ? n : 0));

  return (
    <div>
      <label htmlFor={id} className="block text-white/50 text-sm mb-3">
        {label}
      </label>
      <div className="flex items-center gap-4">
        {/* El slider es un atajo visual; el campo numérico es el control accesible */}
        <input
          type="range"
          aria-hidden="true"
          tabIndex={-1}
          min={0}
          max={sliderMax}
          step={step}
          value={Math.min(value, sliderMax)}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="flex-1 accent-[#9b27f9] cursor-pointer"
        />
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="w-24 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-right text-white text-sm tabular-nums focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>
    </div>
  );
}

function niceMax(n: number): number {
  const magnitude = 10 ** Math.floor(Math.log10(Math.max(n, 10)));
  return Math.ceil(n / magnitude) * magnitude;
}

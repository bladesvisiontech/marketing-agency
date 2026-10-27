"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Headphones,
  House,
  Pause,
  Play,
  RotateCcw,
  Scale,
  Scissors,
  Smile,
  Snowflake,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";
import RoiCalculator from "@/components/RoiCalculator";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import {
  INDUSTRIES,
  getIndustry,
  getRecording,
  type DemoLang,
  type IndustryIcon,
  type IndustrySlug,
} from "@/lib/voice-demo";

const icons: Record<IndustryIcon, LucideIcon> = {
  UtensilsCrossed,
  Scissors,
  Calculator,
  Scale,
  Snowflake,
  Smile,
  Wrench,
  House,
};

const CALL_LANGS: { lang: DemoLang; label: string }[] = [
  { lang: "en", label: "English" },
  { lang: "es", label: "Español" },
];

type Phase = "idle" | "playing" | "paused" | "ended";

interface VoiceDemoProps {
  t: Dictionary["voice_demo"];
  locale: Locale;
  initialIndustry: IndustrySlug;
  /** Links con ?ref= muestran el guion corto para el vendedor */
  showSellerNotes: boolean;
}

const panel = "rounded-xl border border-white/[0.08] bg-white/[0.03]";

export default function VoiceDemo({ t, locale, initialIndustry, showSellerNotes }: VoiceDemoProps) {
  const [slug, setSlug] = useState<IndustrySlug>(initialIndustry);
  const [callLang, setCallLang] = useState<DemoLang>(locale);
  const [phase, setPhase] = useState<Phase>("idle");
  const [time, setTime] = useState(0);
  const [loadedDuration, setLoadedDuration] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  // El grafo de audio se crea una sola vez: un <audio> admite un solo MediaElementSource
  const contextRef = useRef<AudioContext | null | undefined>(undefined);
  const transcriptRef = useRef<HTMLOListElement>(null);

  const industry = getIndustry(slug) ?? INDUSTRIES[0];
  const recording = getRecording(industry.slug, callLang);
  const duration = loadedDuration ?? recording?.duration ?? 0;
  const Icon = icons[industry.icon];

  const lines = recording?.transcript ?? [];
  const shown = phase === "ended" ? lines : lines.filter((line) => line.start <= time + 0.05);

  // Mientras suena, el tiempo se lee del audio a 10 cuadros por segundo
  useEffect(() => {
    if (phase !== "playing") return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setTime(Math.floor(audio.currentTime * 10) / 10);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // La transcripción baja sola (solo dentro de su caja) a medida que aparecen frases
  useEffect(() => {
    const list = transcriptRef.current;
    if (phase === "playing" && list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [shown.length, phase]);

  useEffect(() => () => void contextRef.current?.close(), []);

  function select(nextSlug: IndustrySlug, nextLang: DemoLang) {
    audioRef.current?.pause();
    setSlug(nextSlug);
    setCallLang(nextLang);
    setPhase("idle");
    setTime(0);
    setLoadedDuration(null);
    setFailed(false);
    if (nextSlug !== slug) {
      const url = new URL(window.location.href);
      url.searchParams.set("industria", nextSlug);
      window.history.replaceState(null, "", url);
    }
  }

  function connectAnalyser(audio: HTMLAudioElement) {
    if (contextRef.current !== undefined) return;
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    contextRef.current = null;
    if (!Ctx) return;
    try {
      const context = new Ctx();
      const node = context.createAnalyser();
      node.fftSize = 1024;
      context.createMediaElementSource(audio).connect(node);
      node.connect(context.destination);
      contextRef.current = context;
      setAnalyser(node);
    } catch {
      // Sin analizador el audio suena igual; el orbe solo no reacciona a la voz
    }
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio || !recording) return;
    if (phase === "playing") {
      audio.pause();
      return;
    }
    connectAnalyser(audio);
    if (phase === "ended") audio.currentTime = 0;
    // Sin await entre el clic y play(): Safari de iPhone exige que salgan del mismo gesto
    void contextRef.current?.resume();
    audio.play().catch(() => setFailed(true));
    if (phase === "idle") trackEvent("demo_play", { industry: industry.slug, lang: callLang });
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio || !recording) return;
    audio.currentTime = value;
    setTime(value);
    if (phase === "ended") setPhase("paused");
  }

  const status = failed
    ? t.audio_error
    : !recording
      ? t.pending
      : {
          idle: t.status_idle,
          playing: t.status_playing,
          paused: t.status_paused,
          ended: t.status_ended,
        }[phase];

  const base = `/${locale}`;

  return (
    <>
      <section className="pb-24 px-5">
        <div className="max-w-6xl mx-auto">
          {/* Industrias */}
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{t.industry_label}</p>
          <div role="group" aria-label={t.industry_label} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INDUSTRIES.map((item) => {
              const ItemIcon = icons[item.icon];
              const selected = item.slug === industry.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => select(item.slug, callLang)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer",
                    selected
                      ? "border-[#9b27f9]/60 bg-[#9b27f9]/10 text-white"
                      : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white"
                  )}
                >
                  <ItemIcon
                    size={16}
                    className={cn("flex-shrink-0", selected ? "text-[#b98cff]" : "text-white/30")}
                    aria-hidden
                  />
                  {item.name[locale]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 mt-6">
            {/* Reproductor */}
            <div className={cn(panel, "p-6 md:p-8 flex flex-col")}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#b98cff]" aria-hidden />
                  </div>
                  <div>
                    <p className="text-white font-semibold leading-snug">{industry.businessName[callLang]}</p>
                    <p className="text-white/30 text-xs mt-0.5">{t.fictional}</p>
                  </div>
                </div>
                <div
                  role="group"
                  aria-label={t.lang_label}
                  className="inline-flex rounded-lg border border-white/[0.08] p-0.5 text-xs font-medium"
                >
                  {CALL_LANGS.map(({ lang, label }) => (
                    <button
                      key={lang}
                      type="button"
                      aria-pressed={lang === callLang}
                      onClick={() => select(industry.slug, lang)}
                      className={cn(
                        "rounded-md px-3 py-1.5 transition-colors cursor-pointer",
                        lang === callLang ? "bg-white text-black" : "text-white/50 hover:text-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center py-10">
                <div role="img" aria-label={t.orb_label} className="w-56 sm:w-72 aspect-square">
                  {/* Sigue la voz de la grabación; nunca pide el micrófono */}
                  <VoicePoweredOrb analyser={analyser} />
                </div>
                <p className="mt-8 flex items-center gap-2 text-sm text-white/50 text-center" aria-live="polite">
                  <span
                    aria-hidden
                    className={cn(
                      "size-2 flex-shrink-0 rounded-full",
                      phase === "playing" ? "bg-[#97c121] animate-pulse" : "bg-white/20"
                    )}
                  />
                  {status}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggle}
                  disabled={!recording || failed}
                  aria-label={phase === "playing" ? t.pause : phase === "ended" ? t.replay : t.play}
                  className="size-14 flex-shrink-0 rounded-full bg-gradient-to-br from-[#1b4fd8] to-[#9b27f9] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(155,39,249,0.35)] hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {phase === "playing" ? (
                    <Pause size={20} aria-hidden />
                  ) : phase === "ended" ? (
                    <RotateCcw size={20} aria-hidden />
                  ) : (
                    <Play size={20} className="translate-x-0.5" aria-hidden />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={Math.min(time, duration || 1)}
                    onChange={(e) => seek(Number(e.target.value))}
                    disabled={!recording || failed}
                    aria-label={t.seek}
                    aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`}
                    className="w-full accent-[#9b27f9] cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="flex justify-between items-center text-xs font-mono text-white/30 mt-1 tabular-nums">
                    <span>{formatTime(time)}</span>
                    {recording ? <span>{formatTime(duration)}</span> : <span className="badge py-0.5">{t.pending_badge}</span>}
                  </div>
                </div>
              </div>
              <p className="flex items-center gap-2 text-white/30 text-xs mt-4">
                <Headphones size={14} aria-hidden />
                {t.volume_hint}
              </p>

              {/* Siempre montado: el analizador queda atado a este elemento */}
              <audio
                ref={audioRef}
                src={recording?.src}
                preload="metadata"
                onLoadedMetadata={(e) => {
                  const d = e.currentTarget.duration;
                  if (Number.isFinite(d)) setLoadedDuration(d);
                }}
                onPlay={() => setPhase("playing")}
                onPause={(e) => {
                  if (!e.currentTarget.ended) setPhase("paused");
                }}
                onEnded={() => {
                  setPhase("ended");
                  setTime(duration);
                }}
                onError={() => {
                  if (recording) setFailed(true);
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* Transcripción */}
              <div className={cn(panel, "p-6 md:p-8 flex flex-col")}>
                <p className="text-white font-semibold mb-4">{t.transcript_title}</p>
                {shown.length === 0 ? (
                  <p className="text-white/30 text-sm h-72 lg:h-80">{t.transcript_empty}</p>
                ) : (
                  <ol ref={transcriptRef} className="space-y-3 h-72 lg:h-80 overflow-y-auto pr-1">
                    {shown.map((line, i) => {
                      const isAgent = line.role === "agent";
                      const current = phase === "playing" && i === shown.length - 1;
                      return (
                        <li
                          key={`${line.start}-${i}`}
                          className={cn("flex flex-col", isAgent ? "items-start" : "items-end")}
                        >
                          <span className="text-[11px] uppercase tracking-wider text-white/30 mb-1">
                            {isAgent ? t.agent : t.caller}
                          </span>
                          <span
                            className={cn(
                              "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed border transition-colors",
                              isAgent
                                ? "bg-[#9b27f9]/10 text-white border-[#9b27f9]/20"
                                : "bg-white/[0.04] text-white/70 border-white/[0.08]",
                              current && "border-[#9b27f9]/60"
                            )}
                          >
                            {line.text}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>

              <div className={cn(panel, "p-6 md:p-8")}>
                <p className="text-white font-semibold mb-2">{t.handles_title}</p>
                <p className="text-white/40 text-sm mb-5">{industry.tagline[locale]}</p>
                <ul className="flex flex-col gap-3">
                  {industry.handles[locale].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#97c121] flex-shrink-0 mt-0.5" aria-hidden />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {showSellerNotes && (
            <div className={cn(panel, "mt-4 p-6 md:p-8 border-amber-400/30")}>
              <p className="text-amber-300 text-xs uppercase tracking-widest font-medium mb-4">{t.seller_title}</p>
              <ul className="space-y-2 list-disc pl-5 text-white/60 text-sm leading-relaxed">
                {industry.sellerPitch[locale].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cierre */}
          <div
            className={cn(
              panel,
              "mt-4 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all",
              phase === "ended" && "border-[#9b27f9]/50 shadow-[0_8px_32px_rgba(100,60,200,0.18)]"
            )}
          >
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{t.after_title}</h2>
              <p className="text-white/40">{t.after_body}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href={`${base}/contact?service=ai-receptionist`} className="btn-primary text-base px-6 py-3">
                {t.after_cta} <ArrowRight size={16} />
              </Link>
              <Link href={`${base}/services/ai-receptionist`} className="btn-outline text-base px-6 py-3">
                {t.after_secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RoiCalculator key={industry.slug} t={t} locale={locale} defaults={industry.roi} />
    </>
  );
}

function formatTime(total: number): string {
  const seconds = Math.max(0, Math.floor(total));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

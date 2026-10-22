"use client";

import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";
import { cn } from "@/lib/utils";

/** Sílabas y pausas simuladas: el orbe se ve "hablando" sin audio ni micrófono. */
function simulatedLevel() {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  const t = performance.now() / 1000;
  const phrase = Math.max(0, Math.sin(t * 0.85));
  const syllable = Math.max(0, Math.sin(t * 9.3 + Math.sin(t * 2.1)));
  return phrase * (0.12 + syllable ** 2 * 0.72);
}

/** Orbe de voz con actividad simulada (home y página del servicio). */
export function SimulatedVoiceOrb({ className }: { className?: string }) {
  return (
    <div className={cn("aspect-square", className)} aria-hidden>
      <VoicePoweredOrb getLevel={simulatedLevel} />
    </div>
  );
}

"use client";

import { useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { VoiceOrb, type VoiceOrbProps } from "@/components/ui/voice-orb";

/** Pigmento, brillo y sombra del orbe con el morado y azul del logo. */
export const BRAND_ORB_COLORS = ["#7a3cf2", "#d6c4ff", "#0f2a8c"] as const;

/** VoiceOrb con sílabas y pausas simuladas: se ve "hablando" sin abrir audio. */
export function SimulatedVoiceOrb({
  colors = BRAND_ORB_COLORS,
  ...props
}: Omit<VoiceOrbProps, "activity" | "analyser">) {
  const activity = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  useAnimationFrame((time) => {
    if (reducedMotion) {
      activity.set(0);
      return;
    }
    const t = time / 1000;
    const phrase = Math.max(0, Math.sin(t * 0.85));
    const syllable = Math.max(0, Math.sin(t * 9.3 + Math.sin(t * 2.1)));
    activity.set(phrase * (0.12 + syllable ** 2 * 0.72));
  });
  return <VoiceOrb activity={activity} colors={colors} {...props} />;
}

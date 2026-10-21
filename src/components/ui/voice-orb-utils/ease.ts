// beui.dev — token de movimiento que usa el VoiceOrb.

/** Resorte críticamente amortiguado: el valor sigue la voz sin rebotar en los extremos. */
export const SPRING_GLIDE = {
  stiffness: 700,
  damping: 50,
  mass: 0.5,
} as const;

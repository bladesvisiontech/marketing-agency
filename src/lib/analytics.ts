// Google Analytics 4. El ID de medición (G-…) no es secreto: es público en cada página.
// Mientras esté vacío, no se carga nada.
export const GA_MEASUREMENT_ID = "";

type GtagWindow = Window & { gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void };

/** Envía un evento a GA4 si está instalado; si no, no hace nada. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", name, params);
}

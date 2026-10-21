// Voz y nombre de la recepcionista en cada idioma de las grabaciones.
// Los voice_id salen de `npm run voices` (escucha los previews y escoge).
// No son secretos: pueden vivir en este archivo.

export const VOICES = {
  es: { voice_id: "", persona: "Valentina" },
  en: { voice_id: "", persona: "Grace" },
};

/** Idioma de Retell para cada idioma de la demo (un idioma por agente: más preciso que el multilingüe). */
export const RETELL_LANGUAGE = { es: "es-419", en: "en-US" };

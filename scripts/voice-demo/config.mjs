// Configuración de los agentes con los que se graban las llamadas del demo.
// Los voice_id salen de `npm run voices` (escucha los previews y escoge).
// Nada de esto es secreto: puede vivir en este archivo.

/**
 * Voz y nombre de la recepcionista en cada idioma.
 * voice_model solo aplica a voces de ElevenLabs (voice_id "11labs-…"); con
 * otra voz se ignora y Retell usa el modelo por defecto de esa voz.
 */
export const VOICES = {
  es: { voice_id: "", persona: "Valentina", voice_model: "eleven_v3_conversational" },
  en: { voice_id: "", persona: "Grace", voice_model: "eleven_v3_conversational" },
};

/** Idioma de Retell para cada idioma de la demo (un idioma por agente: más preciso que el multilingüe). */
export const RETELL_LANGUAGE = { es: "es-419", en: "en-US" };

/**
 * Modelo que piensa las respuestas. GPT 4.1: respuestas rápidas y estables por
 * voz ($0.045/min en Retell). Temperatura baja para que no improvise datos.
 */
export const MODEL_CONFIG = { type: "cascading", primary: { model: "gpt-4.1" }, temperature: 0.3 };

/** "accurate": la transcripción se muestra en pantalla, así que importa que salga bien. */
export const STT_MODE = "accurate";

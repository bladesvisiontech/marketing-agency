// Configuración de los agentes con los que se graban las llamadas del demo.
// Los voice_id salen de `npm run voices` (escucha los previews y escoge).
// Nada de esto es secreto: puede vivir en este archivo.

/**
 * Voz de la recepcionista en cada idioma. persona es su nombre: solo lo dice si
 * se lo preguntan (contesta siempre con el nombre del negocio).
 * Todas son de ElevenLabs (las de la biblioteca comunitaria tienen id
 * "custom_voice_…"), así que voice_model siempre aplica. Con una voz de otro
 * proveedor, pon voice_model: null.
 */
export const VOICES = {
  // Anita (ElevenLabs, latina neutra). Con Multilingual v2 suena igual que en la biblioteca de
  // ElevenLabs; con v3 Conversational le cambiaba el timbre.
  es: { voice_id: "custom_voice_7f467ff0356efa0728e3435ac3", persona: "Anita", voice_model: "eleven_multilingual_v2" },
  en: { voice_id: "11labs-Lily", persona: "Lily", voice_model: "eleven_multilingual_v2" },
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

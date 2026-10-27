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
  es: { voice_id: "custom_voice_7f467ff0356efa0728e3435ac3", persona: "Anita", voice_model: "eleven_multilingual_v2", voice_temperature: 0.6 },
  // Hailey (preset de Retell), elegida el 2026-10-22. voice_model null = automático
  // (en inglés Retell usa Flash v2): suena igual que la muestra del panel.
  // voice_temperature 0.6 (por defecto 1): con 1 a veces subía de golpe el volumen y cambiaba el tono en una frase
  en: { voice_id: "11labs-Hailey", persona: "Hailey", voice_model: null, voice_temperature: 0.6 },
};

/** Idioma de Retell para cada idioma de la demo (un idioma por agente: más preciso que el multilingüe). */
export const RETELL_LANGUAGE = { es: "es-419", en: "en-US" };

/**
 * Modelo que piensa las respuestas. GPT 4.1: respuestas rápidas y estables por
 * voz ($0.045/min en Retell). Temperatura baja para que no improvise datos.
 */
export const MODEL_CONFIG = { type: "cascading", primary: { model: "gpt-4.1" }, temperature: 0.3 };

/**
 * "fast": en las pruebas "accurate" tardaba hasta 4 s en dar por terminada la frase
 * del cliente y la recepcionista se quedaba callada.
 */
export const STT_MODE = "fast";

/**
 * Turnos de la conversación (ajustados con las llamadas de prueba del 2026-10-21):
 * con interruption_sensitivity 0.9 se cortaba con cualquier "yes" o ruido.
 */
export const TURN_TAKING = {
  responsiveness: 1,
  interruption_sensitivity: 0.6,
  enable_backchannel: true,
  backchannel_frequency: 0.4,
  // Ignora ruido y voces de fondo (incluido el eco del parlante): +$0.005/min
  denoising_mode: "noise-and-background-speech-cancellation",
};

export const HANDBOOK = {
  conversational_personality: true,
  natural_filler_words: true,
  high_empathy: true,
  // Apagado: repetía teléfonos y correos dígito por dígito y alargaba cada turno
  echo_verification: false,
  speech_normalization: true,
  smart_matching: true,
  ai_disclosure: true,
  scope_boundaries: true,
};

/**
 * Palabras que el transcriptor debe reconocer bien (sin esto, "Cypress" salía "Cyprus",
 * "ITIN" salía "I ten" y "food truck" salía "truck").
 */
export const BOOSTED_KEYWORDS = [
  "ITIN", "IRS", "W-2", "1099", "food truck", "bookkeeping",
  "Cypress", "Katy", "Sugar Land", "Pearland", "Westheimer", "Maple Ridge",
  "HVAC", "tune-up", "PPO", "Medicaid", "CHIP", "whitening",
  "Andrés", "Luis", "Kevin", "fade", "taper",
  "F-150", "Accord", "synthetic", "state inspection",
];

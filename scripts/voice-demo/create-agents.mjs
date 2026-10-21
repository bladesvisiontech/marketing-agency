#!/usr/bin/env node
// Crea (o actualiza) los agentes de voz con los que se graban las llamadas del
// demo: uno por industria e idioma (16). Cada agente trae de fábrica su saludo,
// su negocio ficticio y su voz, para grabar desde el panel sin llenar nada.
//
// Uso:
//   npm run agents                        # crea los que falten
//   npm run agents -- --only=dental       # solo dental (es y en)
//   npm run agents -- --only=dental-en    # solo dental en inglés
//   npm run agents -- --update            # actualiza prompt, saludo y voz de los ya creados
//
// Requiere RETELL_API_KEY en .env.local y las voces en scripts/voice-demo/config.mjs.
// Guarda los IDs en scripts/voice-demo/agents.generated.json (ignorado por git).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPrompt, INDUSTRY_PROMPTS, GREETINGS, BUSINESS_NAMES } from "./prompts.mjs";
import { VOICES, RETELL_LANGUAGE, MODEL_CONFIG, STT_MODE } from "./config.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(here, "agents.generated.json");
const API = "https://api.retellai.com";
const LANGS = ["es", "en"];

loadDotEnv(join(process.cwd(), ".env.local"));

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const apiKey = process.env.RETELL_API_KEY;
if (!apiKey) fail("Falta RETELL_API_KEY en .env.local");

const keys = Object.keys(INDUSTRY_PROMPTS)
  .flatMap((slug) => LANGS.map((lang) => ({ slug, lang, key: `${slug}-${lang}` })))
  .filter(({ slug, key }) => !args.only || args.only === slug || args.only === key);
if (keys.length === 0) fail(`Nada coincide con --only=${args.only}`);

for (const { lang } of keys) {
  if (!VOICES[lang]?.voice_id) fail(`Falta el voice_id de "${lang}" en scripts/voice-demo/config.mjs (corre npm run voices).`);
}

const saved = existsSync(OUT_FILE) ? JSON.parse(readFileSync(OUT_FILE, "utf8")) : {};

for (const { slug, lang, key } of keys) {
  const persona = VOICES[lang].persona;
  const business = BUSINESS_NAMES[slug];
  const llmBody = {
    model_config: MODEL_CONFIG,
    general_prompt: buildPrompt(slug),
    begin_message: GREETINGS[slug][lang].replaceAll("{business}", business),
    default_dynamic_variables: {
      agent_name: persona,
      business_name: business,
      language_name: lang === "es" ? "Spanish" : "English",
      caller_name: "",
      demo_channel: "recording",
    },
  };
  const voice = VOICES[lang];
  const agentBody = {
    voice_id: voice.voice_id,
    voice_model: voice.voice_model ?? null,
    language: RETELL_LANGUAGE[lang],
    stt_mode: STT_MODE,
  };

  const entry = saved[key];
  if (entry?.agent_id && args.update) {
    await api("PATCH", `/update-retell-llm/${entry.llm_id}`, llmBody);
    await api("PATCH", `/update-agent/${entry.agent_id}`, agentBody);
    console.log(`✅ ${key}: actualizado`);
    continue;
  }
  if (entry?.agent_id) {
    console.log(`↷  ${key}: ya existe (${entry.agent_id}). Usa --update para cambiarlo.`);
    continue;
  }

  const llm = await api("POST", "/create-retell-llm", {
    ...llmBody,
    start_speaker: "agent",
    general_tools: [
      {
        type: "end_call",
        name: "end_call",
        description: "End the call after saying goodbye, when the caller is done.",
      },
    ],
  });

  const agent = await api("POST", "/create-agent", {
    ...agentBody,
    agent_name: `Inmotion Demo · ${key}`,
    response_engine: { type: "retell-llm", llm_id: llm.llm_id },
    timezone: "America/Chicago",
    // Límites de costo: ninguna grabación pasa de 4 min ni se queda en silencio.
    max_call_duration_ms: 240_000,
    end_call_after_silence_ms: 30_000,
    data_storage_retention_days: 30,
    // Naturalidad
    enable_backchannel: true,
    backchannel_frequency: 0.6,
    responsiveness: 1,
    interruption_sensitivity: 0.9,
    begin_message_delay_ms: 400,
    handbook_config: {
      conversational_personality: true,
      natural_filler_words: true,
      high_empathy: true,
      echo_verification: true,
      speech_normalization: true,
      smart_matching: true,
      ai_disclosure: true,
      scope_boundaries: true,
    },
  });

  saved[key] = { agent_id: agent.agent_id, llm_id: llm.llm_id };
  writeFileSync(OUT_FILE, JSON.stringify(saved, null, 2) + "\n");
  console.log(`✅ ${key}: agente creado (${agent.agent_name ?? agent.agent_id})`);
}

console.log(`\n${Object.keys(saved).length} agentes en agents.generated.json`);

// ───────────────────────── helpers ─────────────────────────

async function api(method, path, body) {
  const res = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) fail(`${method} ${path} → ${res.status}\n${text}`);
  return text ? JSON.parse(text) : {};
}

function loadDotEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

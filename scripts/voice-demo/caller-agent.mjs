#!/usr/bin/env node
// Crea (o actualiza) el agente "cliente simulado" con la voz de Cody: llama a las
// recepcionistas del demo en inglés y actúa como un cliente real según el escenario de
// scripts/voice-demo/caller-scenarios.json (se le pasa en cada llamada como variables).
//
// Uso: node scripts/voice-demo/caller-agent.mjs
// Guarda los IDs en caller-agent.generated.json (ignorado por git).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(here, "caller-agent.generated.json");
const API = "https://api.retellai.com";

// Cody (ElevenLabs, comunidad): americano, natural, grabado como voz telefónica
const VOICE_ID = "custom_voice_4ecf760b8ab267ecf1f6e27bff";

const PROMPT = `
## Who you are
You are {{caller_name}}, a regular guy who lives in the Houston area. You're calling {{business_name}} on the phone as a customer. You are NOT an assistant and you are not helping anyone: you're the customer.

## What you want
{{scenario}}

## How you talk
- Talk like a real person on a phone call: relaxed, friendly, short sentences, contractions. Now and then a natural "um", "yeah", "oh, nice" or "gotcha", but don't overdo it.
- React to what the receptionist says before moving on ("Oh perfect", "Okay, cool").
- Your first reply is ONE short sentence with just the main reason for calling (for example: "Hi, yeah, I need to book a table for Saturday"). Nothing else.
- Bring up each extra detail or request in a later turn, one per turn, only after she has answered the previous one. Never list everything at once.
- Keep each of your turns to one or two short sentences.
- Answer her questions. If she asks for your number, it's {{caller_phone}}; say it in groups like a person would.
- Never say a calendar date; use "this Saturday", "Thursday", "next week".
- Let her finish talking before you answer.
- Never mention AI, scripts, prompts or that this is a test or a demo.

## Ending
When your requests are handled and she says goodbye, say a short, warm goodbye ("Awesome, thanks so much. Bye!") and then stay quiet. Don't keep the conversation going after the goodbye.
`.trim();

loadDotEnv(join(process.cwd(), ".env.local"));
const apiKey = process.env.RETELL_API_KEY;
if (!apiKey) fail("Falta RETELL_API_KEY en .env.local");

const saved = existsSync(OUT_FILE) ? JSON.parse(readFileSync(OUT_FILE, "utf8")) : {};
const llmBody = {
  model_config: { type: "cascading", primary: { model: "gpt-4.1" }, temperature: 0.7 },
  general_prompt: PROMPT,
  // Espera el saludo de la recepcionista
  start_speaker: "user",
  default_dynamic_variables: { caller_name: "Alex", caller_phone: "713-555-0100", business_name: "the business", scenario: "" },
};
const agentBody = {
  voice_id: VOICE_ID,
  voice_model: null,
  // Voz estable: con la temperatura por defecto (1) a veces sube de golpe el volumen en una frase
  voice_temperature: 0.6,
  language: "en-US",
  stt_mode: "fast",
  responsiveness: 0.9,
  // No se corta por los "mm-hmm" de la recepcionista ni dice los suyos
  interruption_sensitivity: 0.4,
  enable_backchannel: false,
  handbook_config: { natural_filler_words: true, conversational_personality: true },
};

if (saved.agent_id) {
  await api("PATCH", `/update-retell-llm/${saved.llm_id}`, llmBody);
  await api("PATCH", `/update-agent/${saved.agent_id}`, agentBody);
  console.log(`✅ cliente simulado actualizado (${saved.agent_id})`);
} else {
  const llm = await api("POST", "/create-retell-llm", llmBody);
  const agent = await api("POST", "/create-agent", {
    ...agentBody,
    agent_name: "Inmotion Demo · cliente simulado (Cody)",
    response_engine: { type: "retell-llm", llm_id: llm.llm_id },
    max_call_duration_ms: 240_000,
    end_call_after_silence_ms: 20_000,
    data_storage_retention_days: 30,
  });
  writeFileSync(OUT_FILE, JSON.stringify({ agent_id: agent.agent_id, llm_id: llm.llm_id }, null, 2) + "\n");
  console.log(`✅ cliente simulado creado (${agent.agent_id})`);
}

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
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

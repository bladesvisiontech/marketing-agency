#!/usr/bin/env node
// Baja las llamadas grabadas de cada agente y las mete al demo:
//   - audio en public/voice-demo/<industria>-<idioma>.m4a
//   - transcripción con tiempos en src/lib/voice-demo-recordings.json
//
// Uso:
//   npm run recordings                                  # última llamada terminada de cada agente
//   npm run recordings -- --only=dental-es              # solo esa
//   npm run recordings -- --only=dental-es --call=ID    # una llamada concreta (si grabaste varias)
//   npm run recordings -- --list                        # muestra las llamadas sin bajar nada
//
// Requiere RETELL_API_KEY en .env.local y agents.generated.json (npm run agents).
// Convierte con afconvert (viene con macOS); sin él guarda el archivo original.

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const AGENTS_FILE = join(here, "agents.generated.json");
const AUDIO_DIR = join(root, "public", "voice-demo");
const DATA_FILE = join(root, "src", "lib", "voice-demo-recordings.json");
const API = "https://api.retellai.com";
/** Llamadas más cortas que esto se consideran intentos fallidos */
const MIN_SECONDS = 20;

loadDotEnv(join(root, ".env.local"));

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const apiKey = process.env.RETELL_API_KEY;
if (!apiKey) fail("Falta RETELL_API_KEY en .env.local");
if (!existsSync(AGENTS_FILE)) fail("No existe agents.generated.json: corre primero npm run agents");
if (args.call && !args.only) fail("--call necesita --only=<industria>-<idioma>");

const agents = JSON.parse(readFileSync(AGENTS_FILE, "utf8"));
const data = existsSync(DATA_FILE) ? JSON.parse(readFileSync(DATA_FILE, "utf8")) : {};
const keys = Object.keys(agents).filter((k) => !args.only || k === args.only);
if (keys.length === 0) fail(`No hay agente "${args.only}" en agents.generated.json`);

for (const key of keys) {
  const calls = await listCalls(agents[key].agent_id);
  if (args.list) {
    console.log(`\n${key}`);
    for (const c of calls) {
      console.log(`  ${c.call_id}  ${Math.round((c.duration_ms ?? 0) / 1000)}s  ${new Date(c.start_timestamp).toLocaleString()}`);
    }
    if (calls.length === 0) console.log("  (sin llamadas)");
    continue;
  }

  const summary = args.call
    ? { call_id: String(args.call) }
    : calls.find((c) => (c.duration_ms ?? 0) >= MIN_SECONDS * 1000);
  if (!summary) {
    console.log(`·  ${key}: sin grabación todavía`);
    continue;
  }

  const call = await api("GET", `/v2/get-call/${summary.call_id}`);
  if (call.agent_id !== agents[key].agent_id) fail(`${key}: la llamada ${call.call_id} es de otro agente`);
  if (!call.recording_url) fail(`${key}: la llamada ${call.call_id} no tiene grabación`);

  const transcript = (call.transcript_object ?? [])
    .filter((u) => (u.role === "agent" || u.role === "user") && u.content?.trim())
    .map((u) => ({
      start: Math.round((u.words?.[0]?.start ?? 0) * 100) / 100,
      role: u.role === "agent" ? "agent" : "caller",
      text: u.content.trim(),
    }));
  if (transcript.length === 0) fail(`${key}: la llamada ${call.call_id} no trae transcripción`);

  mkdirSync(AUDIO_DIR, { recursive: true });
  const src = await saveAudio(call.recording_url, key);

  data[key] = {
    src,
    duration: Math.round((call.duration_ms ?? 0) / 100) / 10,
    transcript,
    callId: call.call_id,
  };
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
  console.log(`✅ ${key}: ${data[key].duration}s, ${transcript.length} frases → ${src}`);
}

// ───────────────────────── helpers ─────────────────────────

async function listCalls(agentId) {
  const res = await api("POST", "/v3/list-calls", {
    filter_criteria: {
      agent: [{ agent_id: agentId }],
      call_status: { type: "enum", op: "in", value: ["ended"] },
    },
    sort_order: "descending",
    limit: 20,
  });
  return res.items ?? [];
}

async function saveAudio(url, key) {
  const res = await fetch(url);
  if (!res.ok) fail(`${key}: no se pudo bajar la grabación (${res.status})`);
  const ext = (new URL(url).pathname.match(/\.(\w+)$/)?.[1] ?? "wav").toLowerCase();
  const tmp = join(tmpdir(), `voice-demo-${key}.${ext}`);
  writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));

  const out = join(AUDIO_DIR, `${key}.m4a`);
  try {
    // AAC a 96 kbps: suena bien en celular y pesa ~0.7 MB por minuto
    execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "96000", tmp, out]);
    rmSync(tmp);
    return `/voice-demo/${key}.m4a`;
  } catch {
    const raw = join(AUDIO_DIR, `${key}.${ext}`);
    writeFileSync(raw, readFileSync(tmp));
    rmSync(tmp);
    console.warn(`⚠️  ${key}: sin afconvert, se guardó el ${ext} original`);
    return `/voice-demo/${key}.${ext}`;
  }
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
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

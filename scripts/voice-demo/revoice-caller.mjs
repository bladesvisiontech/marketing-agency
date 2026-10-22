#!/usr/bin/env node
// Cambia la voz del CLIENTE en una grabación del demo por una voz nativa (ElevenLabs),
// sin tocar a la recepcionista: su canal se toma tal cual de la grabación multicanal
// de Retell (canal 0 = cliente, canal 1 = recepcionista) y se reconstruye la llamada.
//
// Uso:
//   node scripts/voice-demo/revoice-caller.mjs --only=contador-en --out=/tmp/prueba.m4a   # solo escuchar
//   node scripts/voice-demo/revoice-caller.mjs --only=contador-en --apply                 # reemplaza en el demo
//
// Las frases del cliente y la voz salen de scripts/voice-demo/caller-lines.json
// ({ "<clave>": { "voice": "<voice_id>", "lines": ["…", …] } }): una frase por cada turno
// del cliente, en orden, con lo que dijo de verdad (corrigiendo errores del transcriptor).
// Requiere RETELL_API_KEY y ELEVENLABS_API_KEY en .env.local, y ffmpeg.

import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const DATA_FILE = join(root, "src", "lib", "voice-demo-recordings.json");
const LINES_FILE = join(here, "caller-lines.json");
const RATE = 24000;
const TTS_MODEL = "eleven_v3";
// Mismo volumen para la recepcionista y el cliente
const LEVEL = "loudnorm=I=-19:TP=-2:LRA=7";

loadDotEnv(join(root, ".env.local"));
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const retellKey = process.env.RETELL_API_KEY;
const elevenKey = process.env.ELEVENLABS_API_KEY;
if (!retellKey || !elevenKey) fail("Faltan RETELL_API_KEY o ELEVENLABS_API_KEY en .env.local");
if (!args.only) fail("Usa --only=<industria>-en");
if (!args.apply && !args.out) fail("Usa --out=<archivo.m4a> para escuchar, o --apply para reemplazar en el demo");

const key = String(args.only);
const data = JSON.parse(readFileSync(DATA_FILE, "utf8"));
const rec = data[key];
if (!rec?.callId) fail(`${key} no está en el demo`);
const config = (existsSync(LINES_FILE) ? JSON.parse(readFileSync(LINES_FILE, "utf8")) : {})[key];
// --voice permite probar otra voz sin tocar caller-lines.json
const voiceId = String(args.voice ?? config?.voice ?? "");
// v3 solo acepta 0 (creativa), 0.5 (natural) o 1 (estable)
const stability = Number(args.stability ?? config?.stability ?? 0.5);

const call = await (
  await fetch(`https://api.retellai.com/v2/get-call/${rec.callId}`, { headers: { Authorization: `Bearer ${retellKey}` } })
).json();
if (!call.recording_multi_channel_url) fail(`${key}: la llamada no tiene grabación multicanal`);

const turns = (call.transcript_object ?? [])
  .filter((u) => (u.role === "agent" || u.role === "user") && u.content?.trim() && !/^\(.*\)$/.test(u.content.trim()))
  .map((u) => ({ role: u.role, text: u.content.trim(), start: u.words?.[0]?.start ?? 0, end: u.words?.at(-1)?.end ?? 0 }));
const callerTurns = turns.filter((t) => t.role === "user");

if (!config || config.lines?.length !== callerTurns.length) {
  console.error(`Faltan las frases del cliente en caller-lines.json para "${key}" (${callerTurns.length} turnos):`);
  callerTurns.forEach((t, i) => console.error(`  ${i}. ${t.text}`));
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), "revoice-"));
try {
  const multi = join(work, "multi.wav");
  writeFileSync(multi, Buffer.from(await (await fetch(call.recording_multi_channel_url)).arrayBuffer()));

  // Cada turno como un WAV mono de 24 kHz con el mismo volumen
  const pieces = [];
  let callerIndex = 0;
  for (const [i, t] of turns.entries()) {
    const file = join(work, `${String(i).padStart(3, "0")}.wav`);
    if (t.role === "agent") {
      const from = Math.max(0, t.start - 0.08);
      const to = t.end + 0.25;
      ffmpeg(["-ss", String(from), "-to", String(to), "-i", multi, "-af", `pan=mono|c0=c1,${LEVEL}`, file]);
      pieces.push({ role: "agent", text: t.text, file, originalStart: t.start, originalEnd: t.end });
    } else {
      const text = config.lines[callerIndex++];
      const pcm = join(work, `${i}.pcm`);
      writeFileSync(pcm, await tts(text, voiceId));
      ffmpeg(["-f", "s16le", "-ar", String(RATE), "-ac", "1", "-i", pcm, "-af", `silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,${LEVEL}`, file]);
      pieces.push({ role: "caller", text, file, originalStart: t.start, originalEnd: t.end });
    }
  }

  // Pausas naturales entre turnos (la recepcionista tarda un poco más en responder)
  let clock = 0.4;
  const transcript = [];
  const concatList = [];
  const silence = (seconds) => {
    const f = join(work, `sil-${concatList.length}.wav`);
    ffmpeg(["-f", "lavfi", "-i", `anullsrc=r=${RATE}:cl=mono`, "-t", seconds.toFixed(3), f]);
    concatList.push(f);
    clock += seconds;
  };
  silence(0.4);
  pieces.forEach((p, i) => {
    if (i > 0) {
      const prev = pieces[i - 1];
      silence(prev.role === p.role ? 0.25 : p.role === "agent" ? 0.75 : 0.45);
    }
    transcript.push({ start: Math.round(clock * 100) / 100, role: p.role, text: p.text });
    concatList.push(p.file);
    clock += duration(p.file);
  });
  silence(0.5);

  const listFile = join(work, "list.txt");
  writeFileSync(listFile, concatList.map((f) => `file '${f}'`).join("\n"));
  const wav = join(work, "final.wav");
  ffmpeg(["-f", "concat", "-safe", "0", "-i", listFile, wav]);
  const out = args.apply ? join(root, "public", "voice-demo", `${key}.m4a`) : String(args.out);
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "48000", wav, out], { stdio: "pipe" });
  const total = Math.round(duration(wav) * 10) / 10;

  if (args.apply) {
    data[key] = { ...rec, src: `/voice-demo/${key}.m4a`, duration: total, transcript, revoicedCaller: voiceId };
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
    console.log(`✅ ${key}: voz del cliente reemplazada (${total}s) → demo`);
  } else {
    console.log(`✅ ${key}: ${total}s → ${out}`);
  }
  for (const l of transcript) console.log(`  ${l.start.toFixed(1).padStart(6)}s ${l.role.padEnd(7)} ${l.text}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}

// ───────────────────────── helpers ─────────────────────────

function ffmpeg(params) {
  // Todo sale igual (24 kHz, mono, 16 bits) para que la unión final no se desfase:
  // loudnorm, por ejemplo, devuelve 192 kHz si no se fija la salida.
  const out = params.at(-1);
  const opts = params.slice(0, -1);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...opts, "-ar", String(RATE), "-ac", "1", "-sample_fmt", "s16", out], { stdio: "pipe" });
}

function duration(file) {
  return Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim(),
  );
}

async function tts(text, voiceId) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=pcm_${RATE}`, {
    method: "POST",
    headers: { "xi-api-key": elevenKey, "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: TTS_MODEL, voice_settings: { stability, similarity_boost: 0.8 } }),
  });
  if (!res.ok) fail(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return Buffer.from(await res.arrayBuffer());
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

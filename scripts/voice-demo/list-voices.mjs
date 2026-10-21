#!/usr/bin/env node
// Lista las voces disponibles en tu cuenta para escoger las de la demo.
//
// Uso:
//   node scripts/voice-demo/list-voices.mjs                # todas
//   node scripts/voice-demo/list-voices.mjs latin          # filtra por texto (acento, nombre, proveedor)
//   node scripts/voice-demo/list-voices.mjs --gender=female
//
// Escucha el preview de cada una y copia el voice_id a scripts/voice-demo/config.mjs.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

for (const f of [".env.local", ".env"]) {
  const file = join(process.cwd(), f);
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const apiKey = process.env.RETELL_API_KEY;
if (!apiKey) {
  console.error("❌ Falta RETELL_API_KEY en el entorno o en .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
const gender = args.find((a) => a.startsWith("--gender="))?.split("=")[1];
const query = args.filter((a) => !a.startsWith("--")).join(" ").toLowerCase();

const res = await fetch("https://api.retellai.com/list-voices", {
  headers: { Authorization: `Bearer ${apiKey}` },
});
if (!res.ok) {
  console.error(`❌ ${res.status} ${await res.text()}`);
  process.exit(1);
}

/** @type {Array<{voice_id:string,voice_name:string,provider:string,gender:string,accent?:string,age?:string,preview_audio_url?:string}>} */
const voices = await res.json();

const rows = voices.filter((v) => {
  if (gender && v.gender !== gender) return false;
  if (!query) return true;
  return [v.voice_name, v.accent, v.provider, v.voice_id].join(" ").toLowerCase().includes(query);
});

for (const v of rows) {
  console.log(
    [
      v.voice_id.padEnd(34),
      (v.voice_name || "").padEnd(14),
      (v.gender || "").padEnd(7),
      (v.accent || "-").padEnd(16),
      (v.provider || "").padEnd(11),
      v.preview_audio_url || "",
    ].join(" "),
  );
}
console.log(`\n${rows.length} de ${voices.length} voces`);

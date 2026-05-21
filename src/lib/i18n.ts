import type { Dictionary } from "@/dictionaries/en";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "es") {
    const mod = await import("@/dictionaries/es");
    return mod.default as unknown as Dictionary;
  }
  const mod = await import("@/dictionaries/en");
  return mod.default as unknown as Dictionary;
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Build an absolute path for a locale, stripping any existing /en or /es prefix */
export function localePath(locale: Locale, path: string): string {
  const clean = path.replace(/^\/(en|es)/, "");
  return `/${locale}${clean.startsWith("/") ? clean : `/${clean}`}`;
}

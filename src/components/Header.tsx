"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale: Locale = locale === "en" ? "es" : "en";
  const otherLabel = locale === "en" ? "ES" : "EN";

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    document.cookie = `NEXT_LOCALE=${otherLocale};path=/;max-age=31536000`;
    router.push(newPath);
  }

  const base = `/${locale}`;
  const navLinks = [
    { href: base, label: dict.nav.home },
    { href: `${base}/#services`, label: dict.nav.services },
    { href: `${base}/#cases`, label: dict.nav.cases },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
        <Link href={base} className="flex items-center">
          <Image src="/inmotion-logo.svg" alt="Inmotion" width={120} height={32} priority className="h-7 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 text-white/30 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors px-2 py-1 rounded border border-white/[0.08] hover:border-white/20"
            aria-label={`Switch to ${otherLabel}`}
          >
            {otherLabel}
          </button>
          <Link href={`${base}/contact`} className="btn-outline text-sm px-4 py-2">{dict.nav.contact}</Link>
          <Link href={`${base}/contact`} className="btn-primary text-sm px-4 py-2">{dict.nav.cta}</Link>
        </div>

        {/* Mobile: locale switcher only — bottom bar handles nav */}
        <button
          onClick={switchLocale}
          className="md:hidden text-white/30 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors border border-white/[0.08] px-2 py-1 rounded"
        >
          {otherLabel}
        </button>
      </nav>
    </header>
  );
}

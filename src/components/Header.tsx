"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
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
    // Swap /en/... ↔ /es/...
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
          <Image
            src="/inmotion-logo.svg"
            alt="Inmotion"
            width={120}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 text-white/30 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors px-2 py-1 rounded border border-white/[0.08] hover:border-white/20"
            aria-label={`Switch to ${otherLabel}`}
          >
            {otherLabel}
          </button>
          <Link href={`${base}/contact`} className="btn-outline text-sm px-4 py-2">
            {dict.nav.contact}
          </Link>
          <Link href={`${base}/contact`} className="btn-primary text-sm px-4 py-2">
            {dict.nav.cta}
          </Link>
        </div>

        {/* Mobile: only locale switcher in header */}
        <button
          onClick={switchLocale}
          className="md:hidden text-white/30 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors"
        >
          {otherLabel}
        </button>
      </nav>

      {/* Mobile accordion menu — slides down from top when open */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06] px-5 py-5 flex flex-col gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="divider" />
          <button
            onClick={switchLocale}
            className="text-white/30 text-sm text-left transition-colors"
          >
            {locale === "en" ? "🌐 Ver en Español" : "🌐 View in English"}
          </button>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-white/[0.08] bg-black/95 backdrop-blur-xl">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="flex flex-col items-center justify-center gap-1 flex-1 py-3 text-white/50 hover:text-white transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          <span className="text-[10px] uppercase tracking-widest font-medium">Menu</span>
        </button>
        <div className="w-px bg-white/[0.08]" />
        <a
          href="tel:+11234567890"
          className="flex flex-col items-center justify-center gap-1 flex-1 py-3 text-white/50 hover:text-white transition-colors"
        >
          <Phone size={20} />
          <span className="text-[10px] uppercase tracking-widest font-medium">Call</span>
        </a>
        <div className="w-px bg-white/[0.08]" />
        <Link
          href={`${base}/contact`}
          className="flex flex-col items-center justify-center gap-1 flex-[2] py-3 btn-primary rounded-none text-xs uppercase tracking-widest font-bold"
          onClick={() => setOpen(false)}
        >
          {dict.nav.cta}
        </Link>
      </div>
    </header>
  );
}

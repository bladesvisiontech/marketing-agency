"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function MobileBottomBar({ dict, locale }: Props) {
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const navLinks = [
    { href: base, label: dict.nav.home },
    { href: `${base}/#services`, label: dict.nav.services },
    { href: `${base}/#cases`, label: dict.nav.cases },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      {/* Accordion nav — slides over content */}
      {open && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-black/98 backdrop-blur-xl border-t border-white/[0.08] px-5 py-5 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm transition-colors py-1 border-b border-white/[0.05] last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* Fixed bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-white/[0.08] bg-black/98 backdrop-blur-xl">
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
          onClick={() => setOpen(false)}
          className="flex items-center justify-center flex-[2] py-3 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-colors"
        >
          {dict.nav.cta}
        </Link>
      </div>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#casos", label: "Casos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center">
          <Image
            src="/inmotion-logo.svg"
            alt="Inmotion"
            width={120}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contacto" className="btn-outline text-sm px-4 py-2">
            Contacto
          </Link>
          <Link href="/contacto" className="btn-primary text-sm px-4 py-2">
            Agendar llamada
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06] px-5 py-5 flex flex-col gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="divider" />
          <Link
            href="/contacto"
            className="btn-accent text-center py-3 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Agendar llamada
          </Link>
        </div>
      )}
    </header>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      {/* Top bar */}
      <div className="bg-green-500 text-black text-center text-sm py-2 px-4 font-medium">
        Tu sitio web debería generar clientes. No solo visitas.{" "}
        <Link href="/contacto" className="underline font-bold ml-1">
          Agendar llamada →
        </Link>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-white">
          Growth<span className="text-green-500">Lab</span>
        </Link>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="gradient-bg text-black font-semibold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Agendar llamada
          </Link>
        </div>
        {/* Mobile */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-white text-base transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="gradient-bg text-black font-semibold text-center px-5 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Agendar llamada
          </Link>
        </div>
      )}
    </header>
  );
}

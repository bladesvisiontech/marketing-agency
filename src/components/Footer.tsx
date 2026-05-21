import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const pages = [
  ["Inicio", "/"],
  ["Servicios", "/#servicios"],
  ["Casos", "/#casos"],
  ["Nosotros", "/nosotros"],
  ["Contacto", "/contacto"],
] as const;

const services = [
  ["Websites", "/servicios/websites"],
  ["SEO", "/servicios/seo"],
  ["Auditoría Digital", "/servicios/auditoria"],
  ["E-commerce", "/servicios/ecommerce"],
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex mb-4">
              <Image
                src="/inmotion-logo.svg"
                alt="Inmotion"
                width={110}
                height={30}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Diseño estratégico, SEO y e-commerce orientados a resultados. Convertimos visitas en clientes.
            </p>
            <div className="mt-5">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white/30 text-xs font-medium uppercase tracking-widest mb-4">Páginas</h5>
            <ul className="flex flex-col gap-2.5">
              {pages.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white/30 text-xs font-medium uppercase tracking-widest mb-4">Servicios</h5>
            <ul className="flex flex-col gap-2.5">
              {services.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Inmotion. Todos los derechos reservados.
          </p>
          <p className="text-white/25 text-xs">
            Diseñado para convertir.
          </p>
        </div>
      </div>
    </footer>
  );
}

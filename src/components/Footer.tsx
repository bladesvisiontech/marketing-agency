import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold text-white mb-3">
            Growth<span className="text-green-500">Lab</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Diseño estratégico, SEO y e-commerce orientados a resultados.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Páginas</h4>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            {[
              ["Inicio", "/"],
              ["Servicios", "/#servicios"],
              ["Casos", "/#casos"],
              ["Nosotros", "/nosotros"],
              ["Contacto", "/contacto"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-green-500 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors text-sm font-medium"
              aria-label="Instagram"
            >
              IG
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} GrowthLab. Todos los derechos reservados.
      </div>
    </footer>
  );
}

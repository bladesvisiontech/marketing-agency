import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Footer({ dict, locale }: FooterProps) {
  const base = `/${locale}`;
  const f = dict.footer;

  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8 px-5 overflow-hidden">
      <Image src="/footer.jpg" alt="" fill className="object-cover object-center opacity-40 pointer-events-none select-none" priority={false} />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top: logo + email big + nav links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 mb-16">
          {/* Left — logo, tagline, big email */}
          <div className="flex flex-col gap-4">
            <Link href={base} className="inline-flex">
              <Image src="/inmotion-logo.svg" alt="Inmotion" width={110} height={30} className="h-6 w-auto" />
            </Link>
            <p className="text-white/40 text-sm">{f.tagline}</p>
            <a
              href="mailto:info@inmotionteam.com"
              className="text-3xl md:text-5xl font-bold text-white hover:text-white/80 transition-colors tracking-tight mt-2"
            >
              info@inmotionteam.com
            </a>
          </div>

          {/* Right — nav columns */}
          <div className="flex gap-12 shrink-0">
            <div>
              <h5 className="text-white/30 text-xs font-medium uppercase tracking-widest mb-4">{f.pages_title}</h5>
              <ul className="flex flex-col gap-2.5">
                {f.pages.map(([label, path]) => (
                  <li key={label}>
                    <Link href={`${base}${path === "/" ? "" : path}`} className="text-white/50 hover:text-white text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white/30 text-xs font-medium uppercase tracking-widest mb-4">{f.services_title}</h5>
              <ul className="flex flex-col gap-2.5">
                {f.services.map(([label, path]) => (
                  <li key={label}>
                    <Link href={`${base}${path}`} className="text-white/50 hover:text-white text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Inmotion. {f.rights}</p>
          <p className="text-white/25 text-xs">{f.designed}</p>
        </div>
      </div>
    </footer>

  );
}

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
    <footer className="border-t border-white/[0.06] pt-16 pb-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href={base} className="inline-flex mb-4">
              <Image src="/inmotion-logo.svg" alt="Inmotion" width={110} height={30} className="h-6 w-auto" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">{f.tagline}</p>
          </div>

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

        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Inmotion. {f.rights}</p>
          <p className="text-white/25 text-xs">{f.designed}</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import {
  CheckCircle,
  TrendingUp,
  Globe,
  Search,
  ShoppingCart,
  ClipboardCheck,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const stats = [
  { value: "97%", label: "de consumidores buscan online antes de comprar.", source: "BrightLocal, 2024" },
  { value: "75%", label: "de usuarios nunca pasa de la página 1 de Google.", source: "HubSpot Research" },
  { value: "$6.3T", label: "en ventas online globales en 2024, creciendo 10% al año.", source: "Statista, 2024" },
  { value: "14×", label: "mayor tasa de cierre para leads SEO vs outbound marketing.", source: "Search Engine Journal" },
];

const services = [
  {
    Icon: Globe,
    title: "Websites",
    price: "USD 700",
    desc: "Landing pages y sitios estratégicos diseñados para generar contactos y ventas.",
    cta: "Quiero mi website",
    stripeHref: "https://buy.stripe.com/website700",
    internal: "/servicios/websites",
  },
  {
    Icon: Search,
    title: "SEO",
    price: "USD 500",
    desc: "Posicionamos tu negocio para que aparezca cuando tus clientes te buscan.",
    cta: "Quiero aparecer en Google",
    stripeHref: "https://buy.stripe.com/seo500",
    internal: "/servicios/seo",
  },
  {
    Icon: ClipboardCheck,
    title: "Auditoría Digital",
    price: "USD 800",
    desc: "Detectamos exactamente qué está frenando tus ventas online.",
    cta: "Quiero mi auditoría",
    stripeHref: "https://buy.stripe.com/auditoria800",
    internal: "/servicios/auditoria",
  },
  {
    Icon: ShoppingCart,
    title: "E-commerce",
    price: "USD 1400",
    desc: "Tiendas online optimizadas para vender desde el primer día.",
    cta: "Quiero mi e-commerce",
    stripeHref: "https://buy.stripe.com/ecommerce1400",
    internal: "/servicios/ecommerce",
  },
];

const benefits = [
  { Icon: Star, title: "Más confianza", desc: "Tu marca se ve profesional y lista para competir." },
  { Icon: TrendingUp, title: "Más conversiones", desc: "Cada sección está diseñada para generar acción." },
  { Icon: Search, title: "Más visibilidad", desc: "SEO y estructura optimizada para Google." },
  { Icon: Zap, title: "Más ventas", desc: "Menos fricción. Más resultados." },
];

const steps = [
  { n: "01", title: "Entendemos tu negocio." },
  { n: "02", title: "Detectamos oportunidades de crecimiento." },
  { n: "03", title: "Diseñamos una estrategia enfocada en conversión." },
  { n: "04", title: "Lanzamos un sistema preparado para vender." },
];

const testimonials = [
  { quote: "Pasamos de tener visitas a recibir clientes reales.", author: "E-commerce client" },
  { quote: "El nuevo sitio transmite mucha más confianza.", author: "Website client" },
  { quote: "El SEO empezó a traer leads en pocas semanas.", author: "SEO client" },
];

const problems = [
  "No genera contactos",
  "Carga lento",
  "No aparece en Google",
  "No transmite confianza",
  "No convierte visitas en ventas",
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
        {/* Beam */}
        <div className="beam" />
        {/* Radial fade over grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(100,60,200,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <AnimateIn>
            <div className="badge mb-6 mx-auto w-fit">
              <span className="glow-dot" />
              Diseño estratégico · SEO · E-commerce
            </div>
          </AnimateIn>

          <AnimateIn delay={80}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
              Tu negocio necesita{" "}
              <span className="gradient-text">más clientes.</span>
              <br className="hidden sm:block" />
              <span className="text-white/60"> No solo presencia online.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={160}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Creamos sitios web, SEO y e-commerce diseñados para convertir visitas en ventas.
            </p>
          </AnimateIn>

          <AnimateIn delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href="/contacto" className="btn-primary text-base px-6 py-3">
                Quiero vender más <ArrowRight size={16} />
              </Link>
              <Link href="/#servicios" className="btn-outline text-base px-6 py-3">
                Ver servicios
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={320}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-white/35 text-sm">
              {["Sitios web rápidos", "UX/UI orientado a conversión", "Estructura SEO-ready", "Diseño para generar ventas"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-[#97c121]" /> {t}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-sm border-y border-white/[0.06] bg-black">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn>
            <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-10">
              Los datos son claros. Tus competidores ya están online.
            </p>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {stats.map((s) => (
                <div key={s.value} className="bg-black p-8 text-center">
                  <div className="stat-value text-4xl md:text-5xl font-bold gradient-text mb-2">{s.value}</div>
                  <p className="text-white/40 text-sm leading-snug mb-1">{s.label}</p>
                  <p className="text-white/20 text-xs">{s.source}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <div className="badge mb-6 mx-auto w-fit">El problema</div>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Tu web puede estar perdiendo{" "}
              <span className="text-white/40">clientes todos los días.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-white/40 text-lg mb-10">
              La mayoría de los sitios web se ven bien. Pero no convierten.
            </p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <div className="card p-6 text-left inline-flex flex-col gap-3 w-full max-w-sm mx-auto">
              <p className="text-white/40 text-sm mb-2">Si tu página...</p>
              {problems.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500/70" />
                  <span className="text-white/60 text-sm">{p}</span>
                </div>
              ))}
              <div className="divider my-1" />
              <p className="text-white/80 text-sm font-medium">
                Está frenando tu crecimiento.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12 text-center">
            <div className="badge mb-4 mx-auto w-fit">La solución</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Diseñamos experiencias que convierten.
            </h2>
          </AnimateIn>

          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <div key={s.title} className="card p-6 flex flex-col">
                  <s.Icon size={24} className="text-white/40 mb-5" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold text-base mb-0.5">{s.title}</h3>
                  <p className="gradient-text font-bold text-xl mb-3">{s.price}</p>
                  <p className="text-white/40 text-sm flex-1 mb-5 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={s.stripeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent text-sm py-2.5"
                    >
                      {s.cta}
                    </a>
                    <Link
                      href={s.internal}
                      className="text-white/30 text-center text-xs hover:text-white/60 transition-colors flex items-center justify-center gap-1 py-1"
                    >
                      Ver detalles <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="section border-t border-white/[0.06] dot-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              No vendemos páginas web.{" "}
              <span className="text-white/40">Vendemos crecimiento.</span>
            </h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="card p-6 text-center">
                  <b.Icon size={28} className="mx-auto mb-4 text-white/30" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold mb-1.5">{b.title}</h3>
                  <p className="text-white/40 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Así trabajamos</h2>
            <p className="text-white/40 mt-3 max-w-md">Un proceso simple diseñado para maximizar resultados desde el primer día.</p>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((s) => (
                <div key={s.n} className="card p-7 flex items-start gap-5">
                  <span className="gradient-text font-bold text-3xl leading-none tabular-nums">{s.n}</span>
                  <div>
                    <p className="text-white font-medium leading-snug">{s.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="casos" className="section border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <AnimateIn className="mb-12 text-center">
            <div className="badge mb-4 mx-auto w-fit">Prueba social</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Negocios que necesitaban resultados.{" "}
              <span className="text-white/40">No solo diseño.</span>
            </h2>
          </AnimateIn>
          <AnimateIn stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div key={t.quote} className="card p-7">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-[#97c121] fill-[#97c121]" />
                    ))}
                  </div>
                  <p className="text-white/80 text-base leading-relaxed mb-5">&quot;{t.quote}&quot;</p>
                  <p className="text-white/25 text-sm">{t.author}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(100,60,200,0.08),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Tu competencia ya está creciendo online.
            </h2>
            <p className="text-white/40 text-lg mb-8">
              La diferencia es que algunos sitios venden. Y otros solo existen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contacto" className="btn-primary text-base px-7 py-3.5">
                Quiero una propuesta <ArrowRight size={16} />
              </Link>
              <Link href="/#servicios" className="btn-outline text-base px-7 py-3.5">
                Ver servicios
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

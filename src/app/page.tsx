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
} from "lucide-react";

const stats = [
  { value: "97%", label: "de consumidores buscan online antes de comprar.", source: "BrightLocal, 2024" },
  { value: "75%", label: "de usuarios nunca pasa de la página 1 de Google.", source: "HubSpot Research" },
  { value: "$6.3T", label: "en ventas online globales en 2024, creciendo 10% al año.", source: "Statista, 2024" },
  { value: "14x", label: "mayor tasa de cierre para leads SEO vs marketing outbound.", source: "Search Engine Journal" },
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
  { Icon: ShoppingCart, title: "Más ventas", desc: "Menos fricción. Más resultados." },
];

const steps = [
  { n: "01", title: "Entendemos tu negocio." },
  { n: "02", title: "Detectamos oportunidades de crecimiento." },
  { n: "03", title: "Diseñamos una estrategia enfocada en conversión." },
  { n: "04", title: "Lanzamos un sistema preparado para vender." },
];

const testimonials = [
  { quote: "Pasamos de tener visitas a recibir clientes reales.", author: "Cliente — E-commerce" },
  { quote: "El nuevo sitio transmite mucha más confianza.", author: "Cliente — Website" },
  { quote: "El SEO empezó a traer leads en pocas semanas.", author: "Cliente — SEO" },
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
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-sm font-medium mb-6">
            <CheckCircle size={14} /> Diseño estratégico · SEO · E-commerce
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Tu negocio necesita{" "}
            <span className="gradient-text">más clientes.</span>
            <br />
            No solo &quot;presencia online&quot;.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Creamos sitios web, SEO y e-commerce diseñados para convertir visitas en ventas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contacto"
              className="gradient-bg text-black font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
            >
              Quiero vender más
            </Link>
            <Link
              href="/#servicios"
              className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/5 transition-colors"
            >
              Ver servicios
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-400 text-sm">
            {["Sitios web rápidos", "UX/UI orientado a conversión", "Estructura SEO-ready", "Diseño para generar leads y ventas"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET REALITY */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tus competidores ya están online.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Los datos son claros: los negocios sin presencia digital fuerte pierden clientes cada día frente a competidores que invirtieron en crecer online.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.value} className="bg-black border border-white/10 rounded-2xl p-6 text-center card-hover">
                <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-3">{s.value}</div>
                <p className="text-gray-300 text-sm mb-2">{s.label}</p>
                <p className="text-gray-600 text-xs">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tu web puede estar perdiendo clientes todos los días.
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            La mayoría de los sitios web se ven bien. Pero no convierten.
          </p>
          <p className="text-gray-300 mb-6">Si tu página:</p>
          <div className="flex flex-col gap-3 items-center mb-8">
            {problems.map((p) => (
              <div key={p} className="flex items-center gap-3 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>
          <p className="text-white font-semibold text-xl">
            Entonces está <span className="text-red-400">frenando tu crecimiento.</span>
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Diseñamos experiencias que convierten.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-black border border-white/10 rounded-2xl p-6 flex flex-col card-hover">
                <s.Icon size={32} className="text-green-500 mb-4" />
                <h3 className="text-white font-bold text-xl mb-1">{s.title}</h3>
                <p className="gradient-text font-extrabold text-2xl mb-3">{s.price}</p>
                <p className="text-gray-400 text-sm flex-1 mb-6">{s.desc}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={s.stripeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-bg text-black font-semibold text-center py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    {s.cta}
                  </a>
                  <Link
                    href={s.internal}
                    className="text-gray-400 text-center text-sm hover:text-green-400 transition-colors flex items-center justify-center gap-1"
                  >
                    Ver detalles <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              No vendemos páginas web.{" "}
              <span className="gradient-text">Vendemos crecimiento.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-6 rounded-2xl border border-white/10 bg-zinc-950 card-hover">
                <b.Icon size={36} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Así trabajamos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex items-start gap-4 bg-black border border-white/10 rounded-2xl p-6">
                <span className="gradient-text font-extrabold text-4xl leading-none">{s.n}</span>
                <p className="text-white text-lg font-medium pt-1">{s.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="casos" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Negocios que necesitaban resultados. No solo diseño.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.quote} className="bg-zinc-950 border border-white/10 rounded-2xl p-8 card-hover">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-green-500 fill-green-500" />
                  ))}
                </div>
                <p className="text-white text-lg font-medium mb-4">&quot;{t.quote}&quot;</p>
                <p className="text-gray-500 text-sm">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-green-950/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Tu competencia ya está invirtiendo en crecer online.
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            La diferencia es que algunos sitios venden. Y otros solo existen.
          </p>
          <Link
            href="/contacto"
            className="gradient-bg text-black font-bold px-10 py-5 rounded-full text-xl hover:opacity-90 transition-opacity inline-block"
          >
            Quiero una propuesta
          </Link>
        </div>
      </section>
    </>
  );
}

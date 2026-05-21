import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import ChatBot from "@/components/ChatBot";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Digital Marketing Agency | Websites, SEO & E-commerce — Inmotion"
      : "Agencia de Marketing Digital | Websites, SEO y E-commerce — Inmotion",
    description: isEn
      ? "We build websites, SEO systems, and e-commerce experiences designed to turn traffic into revenue."
      : "Creamos sitios web, SEO y e-commerce diseñados para generar clientes y aumentar ventas.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${geist.variable} scroll-smooth`}>
      <body className="bg-black text-white antialiased min-h-full flex flex-col">
        <Header dict={dict} locale={locale as Locale} />
        <main className="pt-14 pb-20 md:pb-0 flex-1">{children}</main>
        <Footer dict={dict} locale={locale as Locale} />
        {/* Mobile bottom bar — rendered outside header to avoid fixed-in-filter bug */}
        <MobileBottomBar dict={dict} locale={locale as Locale} />
        {/* AI chatbot — replaces WhatsApp bubble */}
        <ChatBot />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agencia de Marketing Digital | Websites, SEO y E-commerce — GrowthLab",
  description:
    "Creamos sitios web, SEO y e-commerce diseñados para generar clientes y aumentar ventas.",
  openGraph: {
    title: "GrowthLab | Marketing Digital",
    description:
      "Creamos sitios web, SEO y e-commerce diseñados para generar clientes y aumentar ventas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} scroll-smooth`}>
      <body className="bg-black text-white antialiased min-h-full flex flex-col">
        <Header />
        <main className="pt-[88px] flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

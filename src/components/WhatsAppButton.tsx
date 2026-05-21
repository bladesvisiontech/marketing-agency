import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-24 md:bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#97c121] text-black shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(151,193,33,0.4)] transition-all duration-200"
    >
      <MessageCircle size={22} />
    </a>
  );
}

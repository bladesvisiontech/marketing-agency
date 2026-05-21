import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 gradient-bg text-black p-4 rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-110"
    >
      <MessageCircle size={24} />
    </a>
  );
}

// Demo de recepcionista IA: industrias, grabaciones y valores de referencia.
// Todo lo de aquí es público (se manda al navegador). Los negocios son ficticios.

import type { Locale } from "@/lib/i18n";
import recordings from "@/lib/voice-demo-recordings.json";

export type DemoLang = Locale;
type Localized<T = string> = Record<DemoLang, T>;

export type IndustrySlug =
  | "restaurante"
  | "barberia"
  | "contador"
  | "abogado"
  | "hvac"
  | "dental"
  | "taller"
  | "bienes-raices";

export type IndustryIcon =
  | "UtensilsCrossed"
  | "Scissors"
  | "Calculator"
  | "Scale"
  | "Snowflake"
  | "Smile"
  | "Wrench"
  | "House";

export type TranscriptLine = {
  /** Segundo del audio en que empieza la frase */
  start: number;
  role: "agent" | "caller";
  text: string;
};

export type Recording = {
  /** Ruta dentro de /public */
  src: string;
  /** Duración en segundos (se muestra antes de que cargue el audio) */
  duration: number;
  transcript: TranscriptLine[];
};

export type Industry = {
  slug: IndustrySlug;
  icon: IndustryIcon;
  name: Localized;
  tagline: Localized;
  /** Negocio ficticio que representa la recepcionista en la grabación */
  businessName: string;
  handles: Localized<string[]>;
  /** Guion corto para el vendedor (solo con ?ref=) */
  sellerPitch: Localized<string[]>;
  roi: { missedCallsPerWeek: number; avgTicket: number; closeRate: number };
};

/**
 * Rango aproximado de lo que el cliente paga al mes a la plataforma de voz.
 * Mientras sea null, la web lo explica sin cifras. Ponlo cuando esté
 * confirmado con los precios reales, por ejemplo: { min: 40, max: 150 }.
 */
export const PLATFORM_MONTHLY_RANGE: { min: number; max: number } | null = null;

/**
 * Grabaciones reales de cada industria e idioma. Una industria sin grabación
 * se muestra como "en preparación". El JSON y los audios de public/voice-demo/
 * los genera `npm run recordings`.
 */
export const RECORDINGS = recordings as Partial<Record<`${IndustrySlug}-${DemoLang}`, Recording>>;

export function getRecording(slug: IndustrySlug, lang: DemoLang): Recording | undefined {
  return RECORDINGS[`${slug}-${lang}`];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "restaurante",
    icon: "UtensilsCrossed",
    name: { es: "Restaurante", en: "Restaurant" },
    tagline: {
      es: "Toma reservas, contesta el menú y pedidos de catering.",
      en: "Takes reservations, answers menu and catering questions.",
    },
    businessName: "La Fogata Cocina Latina",
    handles: {
      es: [
        "Reservas de mesa y grupos grandes",
        "Horario, ubicación y parqueo",
        "Preguntas del menú y opciones sin gluten o vegetarianas",
        "Pedidos de catering y eventos",
      ],
      en: [
        "Table and large-party reservations",
        "Hours, location and parking",
        "Menu questions, gluten-free and vegetarian options",
        "Catering and event orders",
      ],
    },
    sellerPitch: {
      es: [
        "En hora pico nadie puede contestar el teléfono: cada llamada perdida es una mesa vacía.",
        "La recepcionista toma la reserva completa mientras la cocina trabaja.",
        "Los pedidos de catering son los tickets más altos: no se deben ir al buzón.",
      ],
      en: [
        "At rush hour nobody can pick up — every missed call is an empty table.",
        "The receptionist books the full reservation while the kitchen keeps working.",
        "Catering requests are the biggest tickets; they shouldn't hit voicemail.",
      ],
    },
    roi: { missedCallsPerWeek: 25, avgTicket: 85, closeRate: 40 },
  },
  {
    slug: "barberia",
    icon: "Scissors",
    name: { es: "Barbería y salón", en: "Barbershop & salon" },
    tagline: {
      es: "Agenda cortes con el barbero que el cliente quiere.",
      en: "Books cuts with the barber each client wants.",
    },
    businessName: "Corte Fino Barber Studio",
    handles: {
      es: [
        "Citas con barbero específico",
        "Precios de cortes, barba y combos",
        "Cambios y cancelaciones de cita",
        "Tiempo de espera para walk-ins",
      ],
      en: [
        "Appointments with a specific barber",
        "Pricing for cuts, beard and combos",
        "Rescheduling and cancellations",
        "Walk-in wait times",
      ],
    },
    sellerPitch: {
      es: [
        "El barbero no puede soltar la máquina para contestar: la recepcionista agenda por él.",
        "Llena los huecos de la agenda con clientes que antes colgaban.",
        "Contesta a las 10 de la noche, cuando la gente realmente piensa en su corte.",
      ],
      en: [
        "Barbers can't put down the clippers to answer — the receptionist books for them.",
        "Fills empty slots with callers who used to hang up.",
        "Answers at 10pm, when people actually think about their next cut.",
      ],
    },
    roi: { missedCallsPerWeek: 20, avgTicket: 40, closeRate: 60 },
  },
  {
    slug: "contador",
    icon: "Calculator",
    name: { es: "Contador / Taxes", en: "Accounting / Taxes" },
    tagline: {
      es: "Agenda citas de taxes, ITIN y explica qué documentos traer.",
      en: "Books tax and ITIN appointments and explains what to bring.",
    },
    businessName: "Rivera Tax & Accounting",
    handles: {
      es: [
        "Citas para declaración de impuestos",
        "Trámite de ITIN y renovaciones",
        "Lista de documentos que debe traer",
        "Recados para el contador con el motivo de la llamada",
      ],
      en: [
        "Tax return appointments",
        "ITIN applications and renewals",
        "Checklist of documents to bring",
        "Messages for the accountant with the reason for the call",
      ],
    },
    sellerPitch: {
      es: [
        "En temporada de taxes el teléfono no para: la recepcionista absorbe el volumen.",
        "Cada cliente que no contesta se va con otro preparador esa misma semana.",
        "El cliente llega con los documentos correctos y la cita rinde más.",
      ],
      en: [
        "During tax season the phone never stops — the receptionist absorbs the volume.",
        "A caller who doesn't get through goes to another preparer that same week.",
        "Clients arrive with the right documents, so each appointment goes further.",
      ],
    },
    roi: { missedCallsPerWeek: 30, avgTicket: 250, closeRate: 35 },
  },
  {
    slug: "abogado",
    icon: "Scale",
    name: { es: "Abogados", en: "Law firm" },
    tagline: {
      es: "Recibe casos nuevos 24/7 y agenda la consulta.",
      en: "Takes new-case intake 24/7 and books the consult.",
    },
    businessName: "Morales Law Group",
    handles: {
      es: [
        "Intake de casos nuevos (accidentes, inmigración, familia)",
        "Agenda de consultas con el abogado",
        "Detecta casos urgentes y los marca para devolver la llamada",
        "Nunca da consejo legal: toma la información y agenda",
      ],
      en: [
        "New-case intake (accidents, immigration, family)",
        "Consultation scheduling with the attorney",
        "Flags urgent cases for a priority callback",
        "Never gives legal advice — gathers facts and books",
      ],
    },
    sellerPitch: {
      es: [
        "Un caso de accidente que no se contesta se va con el siguiente bufete en Google.",
        "La recepcionista hace el intake completo, incluso a medianoche o en fin de semana.",
        "El abogado recibe el caso resumido antes de devolver la llamada.",
      ],
      en: [
        "An unanswered accident case goes to the next firm on Google.",
        "The receptionist runs full intake, even at midnight or on weekends.",
        "The attorney gets a case summary before calling back.",
      ],
    },
    roi: { missedCallsPerWeek: 10, avgTicket: 2500, closeRate: 15 },
  },
  {
    slug: "hvac",
    icon: "Snowflake",
    name: { es: "Aire acondicionado / HVAC", en: "HVAC & plumbing" },
    tagline: {
      es: "Agenda visitas técnicas y detecta emergencias.",
      en: "Books service calls and catches emergencies.",
    },
    businessName: "Polar Air Heating & Cooling",
    handles: {
      es: [
        "Visitas de servicio y mantenimiento",
        "Explica la tarifa de diagnóstico",
        "Detecta emergencias y las escala",
        "Toma dirección y datos del equipo",
      ],
      en: [
        "Service and maintenance visits",
        "Explains the diagnostic fee",
        "Detects emergencies and escalates them",
        "Captures address and equipment details",
      ],
    },
    sellerPitch: {
      es: [
        "En verano en Houston el técnico está en un ático, no en el teléfono.",
        "Cada llamada perdida en julio es un trabajo que se lleva la competencia.",
        "Contesta de noche y deja la visita lista para la mañana.",
      ],
      en: [
        "In a Houston summer the tech is in an attic, not on the phone.",
        "Every missed call in July is a job a competitor takes.",
        "Answers at night and has the visit booked by morning.",
      ],
    },
    roi: { missedCallsPerWeek: 15, avgTicket: 350, closeRate: 45 },
  },
  {
    slug: "dental",
    icon: "Smile",
    name: { es: "Clínica dental", en: "Dental clinic" },
    tagline: {
      es: "Agenda limpiezas, urgencias y preguntas de seguro.",
      en: "Books cleanings, urgent visits and insurance questions.",
    },
    businessName: "Sonrisa Dental Care",
    handles: {
      es: [
        "Citas de limpieza, revisión y blanqueamiento",
        "Prioriza dolor o urgencias",
        "Preguntas de seguros y planes de pago",
        "Pacientes nuevos y recordatorios",
      ],
      en: [
        "Cleanings, checkups and whitening appointments",
        "Prioritizes pain and urgent visits",
        "Insurance and payment-plan questions",
        "New patients and reminders",
      ],
    },
    sellerPitch: {
      es: [
        "La recepción está atendiendo pacientes en persona y el teléfono suena solo.",
        "Un paciente nuevo vale años de visitas: no puede ir al buzón.",
        "La recepcionista agenda familias completas en una sola llamada.",
      ],
      en: [
        "The front desk is checking patients in while the phone rings out.",
        "A new patient is worth years of visits — they can't hit voicemail.",
        "The receptionist books whole families in a single call.",
      ],
    },
    roi: { missedCallsPerWeek: 20, avgTicket: 220, closeRate: 50 },
  },
  {
    slug: "taller",
    icon: "Wrench",
    name: { es: "Taller mecánico", en: "Auto repair" },
    tagline: {
      es: "Agenda revisiones y da estimados de servicios comunes.",
      en: "Books inspections and quotes common services.",
    },
    businessName: "Torque Auto Repair",
    handles: {
      es: [
        "Citas de diagnóstico y mantenimiento",
        "Precios de servicios comunes (aceite, frenos, inspección)",
        "Toma marca, modelo y año del vehículo",
        "Recados sobre el estado de reparaciones",
      ],
      en: [
        "Diagnostic and maintenance appointments",
        "Pricing for common services (oil, brakes, inspection)",
        "Captures make, model and year",
        "Messages about repair status",
      ],
    },
    sellerPitch: {
      es: [
        "El mecánico tiene las manos llenas de grasa: no puede contestar.",
        "La recepcionista convierte la llamada en una cita con el carro ya identificado.",
        "Menos interrupciones en el taller, más carros en las bahías.",
      ],
      en: [
        "Mechanics have greasy hands — they can't pick up.",
        "The receptionist turns the call into a booked visit with the car already identified.",
        "Fewer interruptions in the shop, more cars in the bays.",
      ],
    },
    roi: { missedCallsPerWeek: 18, avgTicket: 300, closeRate: 40 },
  },
  {
    slug: "bienes-raices",
    icon: "House",
    name: { es: "Bienes raíces", en: "Real estate" },
    tagline: {
      es: "Califica compradores y vendedores y agenda visitas.",
      en: "Qualifies buyers and sellers and books showings.",
    },
    businessName: "Casa Propia Realty",
    handles: {
      es: [
        "Califica presupuesto, zona y tiempos",
        "Agenda visitas a propiedades",
        "Leads de vendedores que quieren valorar su casa",
        "Preguntas de compradores con ITIN",
      ],
      en: [
        "Qualifies budget, area and timeline",
        "Books property showings",
        "Seller leads who want a home valuation",
        "Questions from buyers using an ITIN",
      ],
    },
    sellerPitch: {
      es: [
        "El agente inmobiliario está en una visita: el lead del anuncio se enfría en minutos.",
        "La recepcionista contesta al instante y deja al comprador calificado y con cita.",
        "Más tiempo mostrando casas, menos tiempo devolviendo llamadas.",
      ],
      en: [
        "The realtor is at a showing while the listing lead goes cold in minutes.",
        "The receptionist answers instantly and leaves the buyer qualified and booked.",
        "More time showing homes, less time returning calls.",
      ],
    },
    roi: { missedCallsPerWeek: 8, avgTicket: 6000, closeRate: 5 },
  },
];

export function getIndustry(slug: string | null | undefined): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

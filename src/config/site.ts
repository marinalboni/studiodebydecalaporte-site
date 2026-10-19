// =============================================================================
// SITE CONFIG — single source of truth for this client's business data.
//
// This file (+ src/content/copy.ts + src/styles/tokens.css + the images in
// src/assets/) is the ONLY place client-specific facts should live.
// astro.config.mjs and the generated robots.txt / site.webmanifest read from
// this file too, so the domain is only ever set once (`siteUrl`).
// Components must never hard-code a name, phone number, price, color, etc.
//
// Fields marked "// TODO" are placeholders — real data has not been supplied
// yet. The site builds and renders with the placeholders so nothing blocks
// development; replace them before launch.
// =============================================================================

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/** One open/close block within a day. A day can have two blocks to represent a lunch break. */
export interface OpeningBlock {
  opens: string; // 24h "HH:MM"
  closes: string; // 24h "HH:MM"
}

export interface DayHours {
  day: Weekday;
  closed: boolean;
  /** Empty when closed. One entry = no break. Two entries = split by a lunch break. */
  blocks: OpeningBlock[];
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  /**
   * Price in the site's `currency`. Omit when it depends on an evaluation —
   * the card then shows copy.services.priceOnRequestLabel and the JSON-LD
   * offer carries no price.
   */
  price?: number;
  /** When true, price is displayed as "a partir de {price}" (starting at). */
  priceFrom?: boolean;
  /** Free-text duration, e.g. "45 min". */
  duration?: string;
  /** Featured services are highlighted / shown first in compact layouts. */
  featured?: boolean;
  /** Adds a secondary "Preencher anamnese" button linking to /ficha-de-anamnese (client-specific). */
  anamneseLink?: boolean;
}

/**
 * A group of services rendered as its own <h3> subsection. A client with a
 * single flat list uses one category with no `title` — the subsection
 * heading is then omitted and the grid renders exactly as a flat list.
 */
export interface ServiceCategory {
  id: string;
  title?: string;
  intro?: string;
  items: Service[];
}

export interface Testimonial {
  author: string;
  text: string;
  source: "Google";
}

export interface FaqItem {
  question: string;
  /** Leave empty ("") to keep a question drafted but hidden from the page and the JSON-LD. */
  answer: string;
}

/** Controls which sections render on the home page, and in what order. */
export type SectionId =
  | "hero"
  | "services"
  | "gallery"
  | "about"
  | "testimonials"
  | "location"
  | "faq"
  | "contact";

export interface SectionConfig {
  id: SectionId;
  enabled: boolean;
}

export interface FormConfig {
  provider: "netlify" | "formspree";
  /** Required when provider is "formspree". */
  formspreeId?: string;
  /** Path the visitor lands on after a successful submit. */
  successPath: string;
}

export interface FloatingWhatsAppConfig {
  /** Show the fixed WhatsApp button on every page. */
  enabled: boolean;
  /** Which bottom corner it sits in. */
  position: "right" | "left";
}

export interface SiteConfig {
  /** BCP-47 locale used on <html lang> and throughout formatting. */
  locale: string;
  /** Open Graph locale format, e.g. "pt_BR". */
  ogLocale: string;
  /** ISO 4217 currency code used for displayed prices. */
  currency: string;
  /** Absolute site URL, no trailing slash. Also feeds astro.config.mjs `site`, the sitemap and robots.txt. */
  siteUrl: string;
  /**
   * Pre-launch safety switch. While false, every page is noindex/nofollow and
   * robots.txt disallows everything (without linking the sitemap), so a
   * placeholder build deployed to the real domain can't get indexed.
   * Flip to true only once real content is in place.
   */
  launched: boolean;
  /** Which copy file this site uses — see src/content/copy.ts and copy.en.ts. */
  copyLocale: "pt-BR" | "en";

  business: {
    name: string;
    /** Short name (ideally ≤12 chars) shown under the home-screen icon — used by the web app manifest. */
    shortName: string;
    legalName?: string;
    shortDescription: string;
    longDescription: string;
    /** Omit when unknown — foundingDate is then left out of the JSON-LD. */
    foundingYear?: number;
    /** schema.org price range symbol, e.g. "$$". */
    priceRange: string;
    /** schema.org type — a LocalBusiness subtype. Examples: "HairSalon", "RoofingContractor", "Plumber". */
    schemaType: string;
  };

  contact: {
    phoneDisplay: string;
    /** E.164 format, e.g. "+5511999999999". */
    phoneE164: string;
    /** WhatsApp number, digits only, with country code, no symbols. */
    whatsappNumber: string;
    /** Default prefilled message for generic (non-service-specific) WhatsApp links. */
    whatsappDefaultMessage: string;
    /** Omit when the client has no public e-mail — the contact list and JSON-LD skip it. */
    email?: string;
  };

  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    /** ISO 3166-1 alpha-2 country code. */
    country: string;
    /** Omit until exact coordinates are known — GeoCoordinates is then left out of the JSON-LD. */
    geo?: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
    mapEmbedUrl: string;
    /** If false, the street/number are withheld from public pages (shown only after contact), common for home-based businesses. */
    showFullAddress: boolean;
  };

  hours: {
    days: DayHours[];
    notes?: string;
  };

  services: {
    showPrices: boolean;
    /** Rendered in this order. Use a single untitled category for a flat list. */
    categories: ServiceCategory[];
  };

  paymentMethods: string[];
  amenities: string[];

  about: {
    ownerName: string;
    yearsExperience?: number;
    certifications: string[];
  };

  testimonials: Testimonial[];
  faq: FaqItem[];

  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    googleBusinessProfileUrl?: string;
  };

  seo: {
    /** Fallback OG image, relative to src/assets or an absolute URL. Per-page titles/descriptions live in copy.ts. */
    ogImage: string;
    // No themeColor here on purpose: <meta name="theme-color"> and the
    // manifest's theme_color are read from --color-primary in
    // src/styles/tokens.css at build time (see src/lib/theme.ts).
  };

  ui: {
    floatingWhatsApp: FloatingWhatsAppConfig;
    /** Show a footer link to /ficha-de-anamnese. The page always exists; it's normally shared by link only. */
    showAnamneseInFooter: boolean;
  };

  /**
   * All image references + alt text in one place. Filenames are relative to
   * the matching src/assets/images/<folder>/ directory and are resolved via
   * import.meta.glob in the components that render them. Every photo needs
   * meaningful alt text here; purely decorative images use "".
   */
  images: {
    logo: { file: string; alt: string };
    hero: { file: string; alt: string };
    about: { file: string; alt: string };
    gallery: { file: string; alt: string }[];
  };

  sections: SectionConfig[];

  form: FormConfig;
}

const businessName = "Studio Dé by Andréa Laporte";

const address = {
  street: "Av. Francisco Gulin",
  number: "1579",
  complement: "Casa 2",
  neighborhood: "Santa Felicidade",
  city: "Curitiba",
  state: "PR",
  postalCode: "82410-010",
  country: "BR",
};

/** Google Business Profile share link (opens her listing with the correct pin). */
const googleBusinessProfileUrl = "https://share.google/k3QyXdKDiWl5m0CNh";

const site: SiteConfig = {
  locale: "pt-BR",
  ogLocale: "pt_BR",
  currency: "BRL",
  siteUrl: "https://studiodebydecalaporte.com.br",
  // TODO: set to true at launch (README checklist, step before submitting the sitemap).
  launched: false,
  copyLocale: "pt-BR",

  business: {
    name: businessName,
    shortName: "Studio Dé",
    // TODO: confirm whether a separate legal/trading name should appear in the footer and schema.
    legalName: undefined,
    shortDescription:
      "Terapia capilar, maquiagem, sobrancelhas e penteados em Santa Felicidade, Curitiba, com atendimento exclusivo e sem pressa.",
    // Exactly as published on her Google Business Profile — keep the two in sync.
    longDescription:
      "Atendimento exclusivo com hora marcada. Entre em contato para agendar seu horário! O Studio Dé by Andréa Laporte é um espaço dedicado à beleza, autoestima e bem-estar. Sob os cuidados de Andréa, oferece atendimento personalizado e acolhedor, respeitando as necessidades de cada pessoa. Os serviços incluem terapia capilar com protocolos personalizados, argiloterapia, chaterapia, vacuoterapia, ozonoterapia, laser capilar e microagulhamento com exossomos, além de corte de cabelo, maquiagem, design de sobrancelhas e penteados. Aqui, cada atendimento é único, com atenção aos detalhes e sem pressa, porque cuidar de você é tão importante quanto realçar sua beleza.",
    // TODO: confirm the year the business started.
    foundingYear: undefined,
    priceRange: "$$",
    // Matches her Google Business Profile category ("Salão de beleza").
    schemaType: "BeautySalon",
  },

  contact: {
    phoneDisplay: "(41) 99976-3703",
    phoneE164: "+5541999763703",
    whatsappNumber: "5541999763703",
    whatsappDefaultMessage: "Olá, Andréa! Gostaria de agendar um horário.",
    // TODO: add the public contact e-mail.
    email: undefined,
  },

  address: {
    ...address,
    // Pin of her Google Business Profile listing (the street-address geocode lands ~25 m off).
    geo: { lat: -25.3851078, lng: -49.3387907 },
    googleMapsUrl: googleBusinessProfileUrl,
    // Searching by business name resolves to her listing, so the embed shows the
    // right pin and her business card. Searching by street address does not.
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      `${businessName}, ${address.city}`,
    )}&output=embed`,
    // Client confirmed the exact street/number can be public (it's on her Google listing).
    showFullAddress: true,
  },

  hours: {
    days: [
      { day: "monday", closed: false, blocks: [{ opens: "08:00", closes: "20:00" }] },
      { day: "tuesday", closed: false, blocks: [{ opens: "08:00", closes: "20:00" }] },
      { day: "wednesday", closed: false, blocks: [{ opens: "08:00", closes: "20:00" }] },
      { day: "thursday", closed: false, blocks: [{ opens: "08:00", closes: "20:00" }] },
      { day: "friday", closed: false, blocks: [{ opens: "08:00", closes: "20:00" }] },
      { day: "saturday", closed: false, blocks: [{ opens: "09:00", closes: "18:00" }] },
      { day: "sunday", closed: false, blocks: [{ opens: "09:00", closes: "18:00" }] },
    ],
    notes: "Atendimento exclusivo com hora marcada.",
  },

  services: {
    showPrices: true,
    categories: [
      {
        id: "terapia-capilar",
        title: "Terapia capilar",
        intro:
          "Minha especialidade: cuidados com o couro cabeludo e os fios, sempre a partir de uma avaliação.",
        items: [
          {
            id: "terapia-capilar-personalizada",
            name: "Terapia Capilar Personalizada",
            description:
              "Avaliação do couro cabeludo e dos fios, seguida de um protocolo personalizado para as suas necessidades.",
            featured: true,
            anamneseLink: true,
          },
          {
            id: "microagulhamento-exossomos",
            name: "Microagulhamento + Exossomos",
            description:
              "Microagulhamento do couro cabeludo associado à aplicação de exossomos, realizado após avaliação como parte de um protocolo personalizado.",
            price: 800,
            priceFrom: true,
          },
          {
            id: "drug-delivery",
            name: "Drug Delivery",
            description:
              "Técnica que facilita a entrega de ativos ao couro cabeludo, aplicada conforme o protocolo definido na avaliação.",
            price: 300,
            priceFrom: true,
          },
          {
            id: "massagem-capilar-terapeutica",
            name: "Massagem Capilar Terapêutica",
            description:
              "Massagem no couro cabeludo que proporciona relaxamento e bem-estar, além de ativar a microcirculação local.",
            price: 80,
          },
          {
            id: "ozonoterapia-capilar",
            name: "Ozonoterapia Capilar",
            description:
              "Auxilia na recuperação da saúde capilar, trazendo inúmeros benefícios, como a hidratação dos fios, melhor penetração dos tratamentos e redução da caspa e de dermatites.",
            price: 160,
          },
          {
            id: "laser-capilar",
            name: "Laser Capilar",
            description:
              "Aplicação de laser no couro cabeludo como complemento do protocolo de cuidado capilar, auxiliando na circulação sanguínea e promovendo o crescimento e fortalecimento de novos fios.",
            price: 80,
          },
          {
            id: "alta-frequencia-capilar",
            name: "Alta Frequência Capilar",
            description:
              "Aplicação de alta frequência no couro cabeludo, recurso que complementa o cuidado com a saúde da região e tem propriedades bactericidas, fungicidas e cicatrizantes.",
            price: 80,
          },
          {
            id: "led-capilar",
            name: "LED Capilar",
            description:
              "Sessão de luz de LED no couro cabeludo, integrada ao protocolo de cuidado capilar: estimula os folículos, melhora a circulação e reduz a queda de cabelo.",
            price: 70,
          },
          {
            id: "vacuoterapia-capilar",
            name: "Vacuoterapia Capilar",
            description:
              "Técnica de sucção suave no couro cabeludo que aumenta a irrigação sanguínea do bulbo capilar, promovendo a vasodilatação. O resultado é um couro cabeludo livre de resíduos e mais suscetível à absorção de tratamentos de uso tópico.",
            price: 130,
          },
          {
            id: "chaterapia-capilar",
            name: "Chaterapia Capilar",
            description:
              "Aplicação de blends de chás e ervas no couro cabeludo e nos fios, um cuidado natural para o equilíbrio, estímulo e limpeza da região.",
            price: 130,
          },
          {
            id: "argiloterapia-capilar",
            name: "Argiloterapia Capilar",
            description:
              "As argilas têm propriedades que auxiliam no crescimento e fortalecimento dos cabelos. A Argiloterapia ajuda a controlar a oleosidade, promove a limpeza dos óstios foliculares, além de estimular a circulação sanguínea, o que pode contribuir para um couro cabeludo mais saudável e equilibrado.",
            price: 160,
          },
        ],
      },
      {
        id: "beleza",
        title: "Beleza",
        intro: "Cabelo, maquiagem e sobrancelhas.",
        items: [
          {
            id: "escova",
            name: "Escova",
            description: "Escova modeladora com acabamento liso ou com movimento.",
            price: 120,
            priceFrom: true,
          },
          {
            id: "sobrancelha-design",
            name: "Sobrancelha com Design",
            description:
              "Design e limpeza de sobrancelhas com aplicação de henna ou coloração de sobrancelhas, pensado para valorizar o formato do seu rosto.",
            price: 80,
          },
          {
            id: "limpeza-sobrancelha",
            name: "Limpeza de Sobrancelha",
            description: "Remoção dos pelos fora do desenho, mantendo o formato natural das sobrancelhas.",
            price: 60,
          },
          {
            id: "penteado-maquiagem",
            name: "Penteado + Maquiagem",
            description: "Combinação de penteado e maquiagem para eventos e ocasiões especiais.",
            price: 280,
          },
          {
            id: "maquiagem-profissional",
            name: "Maquiagem Profissional",
            description: "Maquiagem personalizada para o dia a dia, eventos ou ocasiões especiais.",
            price: 140,
            priceFrom: true,
          },
          {
            id: "curso-automaquiagem",
            name: "Curso de Automaquiagem Personalizado",
            description: "Aprenda a se maquiar com técnicas práticas que valorizam você, com leveza e confiança.",
            price: 200,
          },
          {
            id: "penteado",
            name: "Penteado",
            description: "Penteados para festas, casamentos e eventos especiais.",
            price: 120,
            priceFrom: true,
          },
          {
            id: "corte-masculino",
            name: "Corte Masculino",
            description: "Corte masculino feito com atenção ao seu estilo e ao formato do rosto.",
            price: 60,
          },
          {
            id: "corte-feminino",
            name: "Corte Feminino",
            description: "Corte personalizado de acordo com o formato do rosto e o tipo de cabelo.",
            price: 120,
          },
        ],
      },
    ],
  },

  // TODO: confirm accepted payment methods (also fill the hidden FAQ answer below).
  paymentMethods: [],
  // TODO: confirm amenities (parking, accessibility).
  amenities: [],

  about: {
    ownerName: "Andréa Laporte",
    yearsExperience: undefined,
    // TODO: list real courses/certifications, or leave empty to hide the list.
    certifications: [],
  },

  // TODO: add real Google reviews (with permission). Empty hides the section.
  testimonials: [],

  // Entries with an empty answer stay hidden (page and JSON-LD) until filled.
  faq: [
    {
      question: "Preciso agendar horário?",
      answer:
        "Sim. O atendimento é exclusivo, com hora marcada. É só chamar no WhatsApp para escolher o melhor dia e horário.",
    },
    {
      question: "Quais são os horários de atendimento?",
      answer:
        "De segunda a sexta, das 8h às 20h, e aos sábados e domingos, das 9h às 18h, sempre com hora marcada.",
    },
    {
      question: "Como funciona a terapia capilar?",
      answer:
        "Começa com uma conversa e uma avaliação do couro cabeludo e dos fios. A partir disso, é montado um protocolo personalizado para as suas necessidades.",
    },
    {
      question: "Preciso preencher alguma ficha antes da terapia capilar?",
      answer:
        "Sim. Antes da primeira sessão, você recebe o link da ficha de anamnese, com perguntas sobre sua saúde e seus cabelos, para que o protocolo seja mais assertivo.",
    },
    {
      question: "Onde fica o Studio Dé?",
      answer: "Na Av. Francisco Gulin, 1579, Casa 2, no bairro Santa Felicidade, em Curitiba.",
    },
    {
      question: "Quais são as formas de pagamento?",
      // TODO: fill in the accepted payment methods.
      answer: "",
    },
    {
      question: "Tem estacionamento?",
      // TODO: fill in the parking information.
      answer: "",
    },
  ],

  social: {
    // TODO: add the real social links. Omit any the client doesn't have.
    instagram: undefined,
    facebook: undefined,
    tiktok: undefined,
    googleBusinessProfileUrl,
  },

  seo: {
    // TODO: replace with a real 1200x630 image once branding/photos are ready.
    ogImage: "src/assets/brand/og-default.jpg",
  },

  ui: {
    // Fixed WhatsApp button shown on every page. Set enabled: false to hide it,
    // or position: "left" if something else needs the bottom-right corner.
    floatingWhatsApp: {
      enabled: true,
      position: "right",
    },
    showAnamneseInFooter: false,
  },

  images: {
    // TODO: replace the placeholder wordmark with the real logo.
    logo: { file: "logo.svg", alt: businessName },
    hero: {
      file: "studio-de-lavatorio-luz-natural.jpg",
      alt: "Lavatório do Studio Dé iluminado pela luz natural da janela",
    },
    about: {
      file: "andrea-laporte-no-studio.jpg",
      alt: "Andréa Laporte sentada na cadeira de atendimento do Studio Dé",
    },
    gallery: [
      { file: "penteado-semipreso-com-acessorio.jpg", alt: "Penteado semipreso com cachos e acessório de cabelo" },
      { file: "maquiagem-olhos-esfumados.jpg", alt: "Maquiagem com olhos esfumados e delineado" },
      { file: "penteado-tranca-lateral.jpg", alt: "Penteado com trança lateral longa" },
      { file: "corte-chanel.jpg", alt: "Corte chanel finalizado" },
      { file: "penteado-coque-baixo.jpg", alt: "Penteado com coque baixo texturizado" },
      { file: "escova-lisa-cabelo-longo.jpg", alt: "Escova lisa em cabelo longo" },
    ],
  },

  sections: [
    { id: "hero", enabled: true },
    { id: "services", enabled: true },
    { id: "gallery", enabled: true },
    { id: "about", enabled: true },
    { id: "testimonials", enabled: true },
    { id: "location", enabled: true },
    { id: "faq", enabled: true },
    { id: "contact", enabled: true },
  ],

  form: {
    provider: "netlify",
    successPath: "/obrigado",
  },
};

/** Every service across all categories, in display order. */
export const allServices: Service[] = site.services.categories.flatMap((category) => category.items);

/** FAQ entries that have an answer — drafts with an empty answer stay hidden. */
export const publishedFaq: FaqItem[] = site.faq.filter((item) => item.answer.trim() !== "");

export default site;

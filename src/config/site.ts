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
  /** Price in the site's `currency`. Omit entirely if truly variable and not quotable. */
  price?: number;
  /** When true, price is displayed as "a partir de {price}" (starting at). */
  priceFrom?: boolean;
  /** Free-text duration, e.g. "45 min". */
  duration?: string;
  /** Featured services are highlighted / shown first in compact layouts. */
  featured?: boolean;
}

export interface Testimonial {
  author: string;
  text: string;
  source: "Google";
}

export interface FaqItem {
  question: string;
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
    foundingYear: number;
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
    email: string;
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
    geo: {
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
    items: Service[];
  };

  paymentMethods: string[];
  amenities: string[];

  about: {
    ownerName: string;
    yearsExperience: number;
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
    space: { file: string; alt: string }[];
    gallery: { file: string; alt: string }[];
  };

  sections: SectionConfig[];

  form: FormConfig;
}

const site: SiteConfig = {
  locale: "pt-BR",
  ogLocale: "pt_BR",
  currency: "BRL",
  siteUrl: "https://studiodebydecalaporte.com.br",
  // TODO: set to true at launch (README checklist, step before submitting the sitemap).
  launched: false,
  copyLocale: "pt-BR",

  business: {
    name: "Studio de By Decá La Porte",
    shortName: "Studio Decá",
    // TODO: confirm whether a separate legal/trading name should appear in the footer and schema.
    legalName: undefined,
    shortDescription:
      "Salão de cabeleireiro domiciliar, atendimento personalizado e com hora marcada.",
    // TODO: replace with the real longer description (2-4 sentences) for the About section / meta description guidance.
    longDescription:
      "Studio de By Decá La Porte é um salão de cabeleireiro domiciliar que oferece atendimento individual, personalizado e com hora marcada, em um ambiente acolhedor e tranquilo.",
    // TODO: confirm the year the business started.
    foundingYear: 2010,
    priceRange: "$$",
    schemaType: "HairSalon",
  },

  contact: {
    // TODO: replace with the real phone number.
    phoneDisplay: "(11) 90000-0000",
    phoneE164: "+5511900000000",
    whatsappNumber: "5511900000000",
    whatsappDefaultMessage: "Olá! Gostaria de agendar um horário.",
    // TODO: replace with the real contact e-mail.
    email: "contato@studiodebydecalaporte.com.br",
  },

  address: {
    // TODO: replace with the real street address.
    street: "Rua Exemplo",
    number: "123",
    complement: undefined,
    neighborhood: "Bairro Exemplo",
    city: "São Paulo",
    state: "SP",
    postalCode: "00000-000",
    country: "BR",
    geo: {
      // TODO: replace with real coordinates (Google Maps → right-click → "What's here?").
      lat: -23.55052,
      lng: -46.633308,
    },
    // TODO: replace with the real "share" link from Google Maps for this address.
    googleMapsUrl: "https://maps.google.com/?q=Studio+de+By+Deca+La+Porte",
    // TODO: replace with the real Google Maps embed URL (Maps → Share → Embed a map).
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d-46.633308!3d-23.55052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAyLjAiUyA0NsKwMzcnNTkuNyJX!5e0!3m2!1spt-BR!2sbr!4v0",
    // Client confirmed the exact street/number can be public (it's on her Google listing).
    showFullAddress: true,
  },

  hours: {
    days: [
      {
        day: "monday",
        closed: true,
        blocks: [],
      },
      {
        day: "tuesday",
        closed: false,
        blocks: [{ opens: "09:00", closes: "18:00" }],
      },
      {
        day: "wednesday",
        closed: false,
        blocks: [{ opens: "09:00", closes: "18:00" }],
      },
      {
        day: "thursday",
        closed: false,
        blocks: [{ opens: "09:00", closes: "18:00" }],
      },
      {
        day: "friday",
        closed: false,
        blocks: [{ opens: "09:00", closes: "18:00" }],
      },
      {
        day: "saturday",
        closed: false,
        blocks: [{ opens: "09:00", closes: "14:00" }],
      },
      {
        day: "sunday",
        closed: true,
        blocks: [],
      },
    ],
    // TODO: confirm hours and whether a lunch-break split applies on any day (example of a split day: blocks: [{opens:"09:00",closes:"12:00"},{opens:"13:00",closes:"18:00"}]).
    notes: "Atendimento somente com hora marcada.",
  },

  services: {
    showPrices: true,
    // TODO: replace with the real service list, descriptions, prices and durations.
    items: [
      {
        id: "corte-feminino",
        name: "Corte Feminino",
        description: "Corte personalizado de acordo com o formato do rosto e tipo de cabelo.",
        price: 80,
        priceFrom: true,
        duration: "45 min",
        featured: true,
      },
      {
        id: "escova",
        name: "Escova",
        description: "Escova modeladora com acabamento liso ou com movimento.",
        price: 60,
        priceFrom: true,
        duration: "40 min",
        featured: true,
      },
      {
        id: "coloracao",
        name: "Coloração",
        description: "Coloração completa com produtos profissionais.",
        price: 150,
        priceFrom: true,
        duration: "2h",
        featured: true,
      },
      {
        id: "mechas",
        name: "Mechas / Luzes",
        description: "Técnica de mechas ou luzes personalizada para o seu estilo.",
        price: 220,
        priceFrom: true,
        duration: "2h30",
      },
      {
        id: "hidratacao",
        name: "Hidratação",
        description: "Tratamento de hidratação profunda para cabelos ressecados.",
        price: 70,
        priceFrom: true,
        duration: "30 min",
      },
      {
        id: "penteado",
        name: "Penteado para Eventos",
        description: "Penteados para festas, casamentos e eventos especiais.",
        price: 120,
        priceFrom: true,
        duration: "1h",
      },
    ],
  },

  // TODO: confirm accepted payment methods.
  paymentMethods: ["Dinheiro", "Pix", "Cartão de Débito", "Cartão de Crédito"],
  // TODO: confirm amenities (home-based business — things like parking and accessibility matter here).
  amenities: ["Estacionamento na rua", "Wi-Fi", "Ambiente climatizado"],

  about: {
    // TODO: confirm the owner's name as she wants it displayed.
    ownerName: "Decá La Porte",
    // TODO: confirm years of experience.
    yearsExperience: 15,
    // TODO: list real courses/certifications.
    certifications: ["Formação em Colorimetria", "Curso de Corte Avançado"],
  },

  // TODO: replace with real reviews (with permission), or leave empty to hide the section.
  testimonials: [
    {
      author: "Cliente Satisfeita",
      text: "Atendimento maravilhoso, super atenciosa e o resultado ficou incrível!",
      source: "Google",
    },
    {
      author: "Cliente Satisfeita",
      text: "Ambiente aconchegante e profissional muito cuidadosa com o cabelo.",
      source: "Google",
    },
  ],

  // TODO: review/adjust FAQ content for accuracy before launch.
  faq: [
    {
      question: "Preciso agendar horário?",
      answer: "Sim, o atendimento é feito somente com hora marcada, pelo WhatsApp.",
    },
    {
      question: "O salão tem estacionamento?",
      answer: "Há vagas disponíveis na rua, próximas ao local.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos dinheiro, Pix, cartão de débito e cartão de crédito.",
    },
  ],

  social: {
    // TODO: replace with the real social links. Omit any the client doesn't have.
    instagram: undefined,
    facebook: undefined,
    tiktok: undefined,
    googleBusinessProfileUrl: undefined,
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
  },

  // TODO: replace every placeholder file + alt text below with real photos once available.
  images: {
    logo: { file: "logo.svg", alt: "Studio de By Decá La Porte" },
    hero: {
      file: "hero-01.jpg",
      alt: "Interior aconchegante do Studio de By Decá La Porte",
    },
    about: {
      file: "about-01.jpg",
      alt: "Decá La Porte, cabeleireira e proprietária do Studio de By Decá La Porte",
    },
    space: [
      { file: "space-01.jpg", alt: "Área de atendimento do salão" },
      { file: "space-02.jpg", alt: "Recepção do salão" },
    ],
    gallery: [
      { file: "gallery-01.jpg", alt: "Corte e finalização realizados no salão" },
      { file: "gallery-02.jpg", alt: "Coloração realizada no salão" },
      { file: "gallery-03.jpg", alt: "Penteado para evento realizado no salão" },
      { file: "gallery-04.jpg", alt: "Mechas realizadas no salão" },
      { file: "gallery-05.jpg", alt: "Hidratação realizada no salão" },
      { file: "gallery-06.jpg", alt: "Ambiente do salão" },
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

export default site;

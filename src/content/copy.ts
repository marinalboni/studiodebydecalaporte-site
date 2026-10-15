import type { Weekday } from "../config/site";

// =============================================================================
// SITE COPY (pt-BR) — every visible string on the site lives here.
//
// Components must import from this file (or site.ts for business facts) and
// never contain literal user-facing text. Strings containing {tokens} are
// filled at render time via src/lib/fill.ts using values from site.ts, so the
// wording stays consistent with the business data automatically.
//
// To localize for a future client: copy this file to copy.en.ts (same
// `SiteCopy` shape — TypeScript will flag any missing/misspelled key), write
// the English strings, then set `copyLocale: "en"` in that client's site.ts
// and update the import in the one place it's wired (see README).
// =============================================================================

export interface SiteCopy {
  meta: {
    skipToContent: string;
  };

  header: {
    navPrimaryLabel: string;
    navServices: string;
    navGallery: string;
    navAbout: string;
    navTestimonials: string;
    navLocation: string;
    navFaq: string;
    navContact: string;
    logoAlt: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
  };

  hero: {
    eyebrow: string;
    heading: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    priceFromPrefix: string;
    durationLabel: string;
    ctaLabel: string;
    whatsappMessageTemplate: string;
  };

  gallery: {
    eyebrow: string;
    heading: string;
    intro: string;
    lightboxCloseLabel: string;
    lightboxNextLabel: string;
    lightboxPrevLabel: string;
    lightboxOpenLabelTemplate: string;
  };

  about: {
    eyebrow: string;
    heading: string;
    intro: string;
    story: string;
    certificationsHeading: string;
  };

  testimonials: {
    eyebrow: string;
    heading: string;
    intro: string;
    ctaSeeAll: string;
    ctaLeaveReview: string;
    sourceLabel: string;
  };

  location: {
    eyebrow: string;
    heading: string;
    intro: string;
    addressHeading: string;
    addressWithheldNote: string;
    hoursHeading: string;
    closedLabel: string;
    directionsCta: string;
    mapFacade: {
      heading: string;
      body: string;
      buttonLabel: string;
      iframeTitle: string;
    };
    dayLabels: Record<Weekday, string>;
  };

  faq: {
    eyebrow: string;
    heading: string;
    intro: string;
  };

  contact: {
    eyebrow: string;
    heading: string;
    intro: string;
    phoneLabel: string;
    whatsappLabel: string;
    emailLabel: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailOptionalNote: string;
      serviceLabel: string;
      servicePlaceholder: string;
      serviceOtherOption: string;
      messageLabel: string;
      messagePlaceholder: string;
      consentLabelBefore: string;
      consentLinkText: string;
      consentLabelAfter: string;
      submitLabel: string;
      honeypotLabel: string;
      requiredError: string;
      invalidPhoneError: string;
      invalidEmailError: string;
      consentRequiredError: string;
    };
  };

  footer: {
    hoursHeading: string;
    navHeading: string;
    socialHeading: string;
    privacyLinkText: string;
    copyrightTemplate: string;
  };

  floatingWhatsapp: {
    /** Visible next to the icon on desktop; the accessible name on every screen size. */
    label: string;
  };

  pages: {
    home: {
      title: string;
      description: string;
      ogImageAlt: string;
    };
    obrigado: {
      title: string;
      description: string;
      heading: string;
      body: string;
      backHomeCta: string;
      whatsappCta: string;
    };
    privacy: {
      title: string;
      description: string;
      heading: string;
      updatedLabel: string;
      intro: string;
      sections: { heading: string; body: string }[];
    };
    notFound: {
      title: string;
      description: string;
      heading: string;
      body: string;
      backHomeCta: string;
    };
  };
}

const copy: SiteCopy = {
  meta: {
    skipToContent: "Pular para o conteúdo",
  },

  header: {
    navPrimaryLabel: "Navegação principal",
    navServices: "Serviços",
    navGallery: "Galeria",
    navAbout: "Sobre",
    navTestimonials: "Avaliações",
    navLocation: "Localização",
    navFaq: "Dúvidas",
    navContact: "Contato",
    logoAlt: "{businessName}",
    menuOpenLabel: "Abrir menu",
    menuCloseLabel: "Fechar menu",
  },

  hero: {
    eyebrow: "Salão de cabeleireiro em {neighborhood}",
    heading: "{businessName}, salão de cabeleireiro em {neighborhood}, {city}",
    intro:
      "Atendimento individual e personalizado, em um ambiente tranquilo e acolhedor, com hora marcada.",
    ctaPrimary: "Agendar pelo WhatsApp",
    ctaSecondary: "Ver serviços",
  },

  services: {
    eyebrow: "O que fazemos",
    heading: "Serviços",
    intro: "Conheça os principais serviços oferecidos. Valores sob consulta para técnicas personalizadas.",
    priceFromPrefix: "a partir de",
    durationLabel: "Duração",
    ctaLabel: "Agendar",
    whatsappMessageTemplate: "Olá! Gostaria de agendar: {service}",
  },

  gallery: {
    eyebrow: "Nosso trabalho",
    heading: "Galeria",
    intro: "Alguns trabalhos realizados no salão.",
    lightboxCloseLabel: "Fechar imagem ampliada",
    lightboxNextLabel: "Próxima imagem",
    lightboxPrevLabel: "Imagem anterior",
    lightboxOpenLabelTemplate: "Ampliar imagem: {alt}",
  },

  about: {
    eyebrow: "Quem cuida do seu cabelo",
    heading: "Sobre",
    intro: "Olá, eu sou {ownerName}.",
    story:
      "Há {yearsExperience} anos cuidando do cabelo das minhas clientes com carinho e atenção aos detalhes. Atendo em um espaço preparado no meu próprio lar, pensado para que você se sinta confortável do início ao fim do atendimento.\n\nCada atendimento é individual e com hora marcada, para garantir atenção total a cada cliente.",
    certificationsHeading: "Formação e certificações",
  },

  testimonials: {
    eyebrow: "O que dizem as clientes",
    heading: "Avaliações",
    intro: "Depoimentos de quem já passou pelo salão.",
    ctaSeeAll: "Ver todas as avaliações no Google",
    ctaLeaveReview: "Deixe sua avaliação",
    sourceLabel: "Avaliação do Google",
  },

  location: {
    eyebrow: "Como chegar",
    heading: "Localização e horários",
    intro: "Atendimento em {neighborhood}, {city}, somente com hora marcada.",
    addressHeading: "Endereço",
    addressWithheldNote:
      "Endereço completo enviado por WhatsApp após a confirmação do horário.",
    hoursHeading: "Horário de atendimento",
    closedLabel: "Fechado",
    directionsCta: "Como chegar no Google Maps",
    mapFacade: {
      heading: "Mapa",
      body: "Toque para carregar o mapa interativo do Google Maps.",
      buttonLabel: "Carregar mapa",
      iframeTitle: "Mapa de localização do {businessName}",
    },
    dayLabels: {
      monday: "Segunda-feira",
      tuesday: "Terça-feira",
      wednesday: "Quarta-feira",
      thursday: "Quinta-feira",
      friday: "Sexta-feira",
      saturday: "Sábado",
      sunday: "Domingo",
    },
  },

  faq: {
    eyebrow: "Dúvidas frequentes",
    heading: "Perguntas frequentes",
    intro: "Ainda com dúvidas? Fale com a gente pelo WhatsApp.",
  },

  contact: {
    eyebrow: "Fale com a gente",
    heading: "Contato",
    intro: "Prefere falar diretamente? Envie uma mensagem pelo WhatsApp ou preencha o formulário abaixo.",
    phoneLabel: "Telefone",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Seu nome completo",
      phoneLabel: "WhatsApp / Telefone",
      phonePlaceholder: "(00) 00000-0000",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      emailOptionalNote: "(opcional)",
      serviceLabel: "Serviço de interesse",
      servicePlaceholder: "Selecione um serviço",
      serviceOtherOption: "Outro",
      messageLabel: "Mensagem",
      messagePlaceholder: "Conte um pouco sobre o que você precisa",
      consentLabelBefore: "Li e concordo com a ",
      consentLinkText: "política de privacidade",
      consentLabelAfter: ".",
      submitLabel: "Enviar mensagem",
      honeypotLabel: "Não preencha este campo",
      requiredError: "Campo obrigatório.",
      invalidPhoneError: "Informe um telefone válido.",
      invalidEmailError: "Informe um e-mail válido.",
      consentRequiredError: "É necessário concordar com a política de privacidade.",
    },
  },

  footer: {
    hoursHeading: "Horário de atendimento",
    navHeading: "Navegação",
    socialHeading: "Redes sociais",
    privacyLinkText: "Política de privacidade",
    copyrightTemplate: "© {year} {businessName}. Todos os direitos reservados.",
  },

  floatingWhatsapp: {
    label: "Agendar pelo WhatsApp",
  },

  pages: {
    home: {
      title: "{businessName} | Salão de Cabeleireiro em {neighborhood}, {city}",
      description:
        "Salão de cabeleireiro domiciliar em {neighborhood}, {city}. Atendimento individual com hora marcada. Agende pelo WhatsApp.",
      ogImageAlt: "{businessName} — salão de cabeleireiro em {neighborhood}, {city}",
    },
    obrigado: {
      title: "Mensagem enviada | {businessName}",
      description: "Recebemos sua mensagem e entraremos em contato em breve.",
      heading: "Mensagem enviada!",
      body: "Obrigado pelo contato. Responderemos o mais breve possível. Se preferir uma resposta mais rápida, fale com a gente agora pelo WhatsApp.",
      backHomeCta: "Voltar para o início",
      whatsappCta: "Falar no WhatsApp agora",
    },
    privacy: {
      title: "Política de Privacidade | {businessName}",
      description: "Como o {businessName} trata os dados enviados pelo formulário de contato.",
      heading: "Política de Privacidade",
      updatedLabel: "Última atualização",
      intro:
        // TODO: review with the client / a professional before publishing — this is a placeholder LGPD-oriented notice covering only the contact form's data collection.
        "Esta política explica, de forma simples, quais dados o formulário de contato deste site coleta, por que motivo, e como você pode solicitar a remoção dos seus dados.",
      sections: [
        {
          heading: "Quais dados coletamos",
          body:
            "Quando você preenche o formulário de contato, coletamos: nome, telefone/WhatsApp, e-mail (se informado), serviço de interesse e a mensagem enviada. Não utilizamos cookies nem ferramentas de rastreamento neste site.",
        },
        {
          heading: "Por que coletamos esses dados",
          body:
            "Usamos essas informações exclusivamente para responder à sua solicitação de contato ou agendamento, por telefone, WhatsApp ou e-mail.",
        },
        {
          heading: "Como armazenamos",
          body:
            // TODO: confirm final form provider (Netlify Forms vs Formspree) before publishing so this paragraph names the right one.
            "As mensagens enviadas pelo formulário são processadas pelo provedor do formulário (Netlify Forms) e recebidas por e-mail pela responsável pelo salão. Não vendemos nem compartilhamos esses dados com terceiros para fins de marketing.",
        },
        {
          heading: "Seus direitos",
          body:
            "De acordo com a Lei Geral de Proteção de Dados (LGPD), você pode solicitar, a qualquer momento, acesso, correção ou exclusão dos seus dados. Para isso, entre em contato pelo e-mail ou WhatsApp informados nesta página.",
        },
      ],
    },
    notFound: {
      title: "Página não encontrada | {businessName}",
      description: "A página que você procura não existe ou foi movida.",
      heading: "Página não encontrada",
      body: "O endereço acessado não existe ou foi movido. Volte para o início ou fale com a gente pelo WhatsApp.",
      backHomeCta: "Voltar para o início",
    },
  },
};

export default copy;

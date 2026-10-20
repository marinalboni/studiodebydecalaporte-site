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

export type AnamneseFieldType =
  | "email"
  | "text"
  | "tel"
  | "number"
  | "textarea"
  | "radio"
  | "checkbox";

export interface AnamneseField {
  /** Form field name — what shows up as the column in Netlify submissions. Checkbox groups get "[]" appended. */
  name: string;
  type: AnamneseFieldType;
  label: string;
  required: boolean;
  help?: string;
  autocomplete?: string;
  min?: number;
  max?: number;
  /** Choices for radio/checkbox groups. Also used as the submitted values. */
  options?: string[];
  /** Option that comes with a "Qual?" text input for details. */
  otherOption?: string;
  /** Checkbox option that unchecks every other option (e.g. "Nenhuma das opções acima"). */
  exclusiveOption?: string;
}

export interface AnamneseSection {
  id: string;
  heading: string;
  fields: AnamneseField[];
}

export interface AnamneseCopy {
  title: string;
  description: string;
  heading: string;
  intro: string;
  requiredNote: string;
  /** Small progress label above each section heading, e.g. "Parte 2 de 4". */
  stepLabelTemplate: string;
  optionalNote: string;
  otherDetailLabel: string;
  sections: AnamneseSection[];
  consentLabelBefore: string;
  consentLinkText: string;
  consentLabelAfter: string;
  submitLabel: string;
  honeypotLabel: string;
  /**
   * Readable summary sent as one extra field (filled by JS on submit), so the
   * notification e-mail lists every question next to its answer.
   */
  summary: {
    /** Form field name — becomes the label of the summary in the e-mail. */
    fieldName: string;
    /** Shown in place of the answer for questions left blank. */
    emptyAnswer: string;
  };
  errors: {
    required: string;
    email: string;
    tel: string;
    number: string;
    checkboxGroup: string;
    radioGroup: string;
    consent: string;
  };
}

export interface SiteCopy {
  meta: {
    skipToContent: string;
  };

  header: {
    navPrimaryLabel: string;
    navServices: string;
    navGallery: string;
    navAbout: string;
    navLocation: string;
    navFaq: string;
    navContact: string;
    /** Small line under the business short name in the header logo. */
    logoByline: string;
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
    /** Shown instead of a price for services without one (priced after an evaluation). */
    priceOnRequestLabel: string;
    /** Badge on featured service cards. */
    featuredBadge: string;
    /** Secondary button on services with `anamneseLink`, pointing to /ficha-de-anamnese. */
    anamneseCtaLabel: string;
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
    /** Optional lead line under the heading; "" hides it. */
    intro: string;
    story: string;
    /** Link to /minha-historia at the end of the story. */
    storyLinkLabel: string;
    certificationsHeading: string;
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
    /** Accessible name of the embedded Google Maps iframe. */
    mapIframeTitle: string;
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
    storyLinkText: string;
    anamneseLinkText: string;
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
      /** Shown instead of heading/body when arriving from the anamnese form (?ficha=1, needs JS). */
      fichaHeading: string;
      fichaBody: string;
    };
    story: {
      title: string;
      description: string;
      heading: string;
      /** Blank-line separated paragraphs; **bold** supported. */
      body: string;
      ctaBody: string;
      ctaLabel: string;
    };
    anamnese: AnamneseCopy;
    privacy: {
      title: string;
      description: string;
      heading: string;
      updatedLabel: string;
      /** ISO date (YYYY-MM-DD). Change it whenever the policy text changes. */
      updatedDate: string;
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
    navLocation: "Localização",
    navFaq: "Dúvidas",
    navContact: "Contato",
    logoByline: "by {ownerName}",
    menuOpenLabel: "Abrir menu",
    menuCloseLabel: "Fechar menu",
  },

  hero: {
    eyebrow: "{businessName}",
    heading: "Terapia capilar em {neighborhood}, {city}",
    intro:
      "Protocolos personalizados para a saúde do couro cabeludo e dos fios, além de maquiagem, sobrancelhas e penteados. Atendimento exclusivo, com hora marcada e sem pressa.",
    ctaPrimary: "Agendar pelo WhatsApp",
    ctaSecondary: "Ver serviços",
  },

  services: {
    eyebrow: "O que eu faço",
    heading: "Serviços",
    intro:
      "Cada atendimento começa com uma conversa e uma avaliação, para que o cuidado seja pensado para você.",
    priceFromPrefix: "a partir de",
    priceOnRequestLabel: "Sob avaliação",
    featuredBadge: "Minha especialidade",
    anamneseCtaLabel: "Preencher anamnese",
    durationLabel: "Duração",
    ctaLabel: "Agendar",
    whatsappMessageTemplate: "Olá, Andréa! Gostaria de agendar: {service}",
  },

  gallery: {
    eyebrow: "Nosso trabalho",
    heading: "Galeria",
    intro: "Alguns trabalhos realizados no studio.",
    lightboxCloseLabel: "Fechar imagem ampliada",
    lightboxNextLabel: "Próxima imagem",
    lightboxPrevLabel: "Imagem anterior",
    lightboxOpenLabelTemplate: "Ampliar imagem: {alt}",
  },

  about: {
    eyebrow: "Quem cuida de você",
    heading: "Prazer, sou a Andréa (Deca)",
    intro: "",
    story:
      "Aos 54 anos, deixei o trabalho corporativo para seguir um sonho: cuidar da autoestima das pessoas. Comecei pela maquiagem, inspirada numa lembrança de infância: minha mãe se arrumando em frente ao espelho antes de ir trabalhar. Aos 83 anos, ela ainda faz isso todos os dias, agora por si mesma, para se sentir bem.\n\nFui ampliando minha formação com design de sobrancelhas e penteados até chegar à terapia capilar, que entrou na minha vida por experiência própria: enfrentei queda de cabelo sem motivo aparente e as mudanças da menopausa. Entendendo melhor esse universo, percebi como o estresse, a ansiedade e a rotina afetam o couro cabeludo e os fios, e passei a criar protocolos personalizados para ajudar quem passa pelo mesmo.\n\nAqui não existe atendimento \"fast\". Cada pessoa é recebida com tempo, atenção e cuidado, porque a beleza não cabe num padrão de tempo. **Bora se reinventar?**",
    storyLinkLabel: "Leia minha história completa",
    certificationsHeading: "Formação e certificações",
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
    mapIframeTitle: "Mapa do {businessName}",
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
    intro: "Ainda com dúvidas? Fale comigo pelo WhatsApp.",
  },

  contact: {
    eyebrow: "Fale comigo",
    heading: "Contato",
    intro: "Prefere falar diretamente? Envie uma mensagem pelo WhatsApp ou preencha o formulário abaixo.",
    phoneLabel: "Telefone",
    emailLabel: "E-mail",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Seu nome completo",
      phoneLabel: "WhatsApp / Telefone",
      phonePlaceholder: "Somente números, com DDD",
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
      invalidPhoneError: "Informe um telefone só com números, com pelo menos 9 dígitos.",
      invalidEmailError: "Informe um e-mail válido.",
      consentRequiredError: "É necessário concordar com a política de privacidade.",
    },
  },

  footer: {
    hoursHeading: "Horário de atendimento",
    navHeading: "Navegação",
    socialHeading: "Redes sociais",
    privacyLinkText: "Política de privacidade",
    storyLinkText: "Minha história",
    anamneseLinkText: "Ficha de anamnese capilar",
    copyrightTemplate: "© {year} {businessName}. Todos os direitos reservados.",
  },

  floatingWhatsapp: {
    label: "Agendar pelo WhatsApp",
  },

  pages: {
    home: {
      title: "Terapia Capilar em {neighborhood}, {city} | {shortName}",
      description:
        "Terapia capilar personalizada, maquiagem, sobrancelhas e penteados em {neighborhood}, {city}. Atendimento exclusivo com hora marcada. Agende pelo WhatsApp.",
      ogImageAlt: "{businessName}: terapia capilar em {neighborhood}, {city}",
    },
    obrigado: {
      title: "Mensagem enviada | {businessName}",
      description: "Recebemos sua mensagem e entraremos em contato em breve.",
      heading: "Mensagem enviada!",
      body: "Obrigado pelo contato. Responderemos o mais breve possível. Se preferir uma resposta mais rápida, fale com a gente agora pelo WhatsApp.",
      backHomeCta: "Voltar para o início",
      whatsappCta: "Falar no WhatsApp agora",
      fichaHeading: "Ficha enviada!",
      fichaBody: "Recebi sua ficha! Vou analisar suas respostas antes do seu atendimento.",
    },
    story: {
      title: "Minha história | {businessName}",
      description:
        "A história de Andréa Laporte (Deca), que aos 54 anos deixou o trabalho corporativo pelo universo da beleza e hoje se dedica à terapia capilar em Curitiba.",
      heading: "Minha história",
      body:
        "Alô, você! Me chamo Andréa (Deca), uma mulher 50+ que encontrou uma nova rota de vida e profissão no universo da beleza.\n\n" +
        "Aos 54 anos me desliguei do trabalho corporativo em busca de um sonho: potencializar a autoestima das pessoas, de fazer e receber o bem, de realizar uma troca sincera em cada atendimento, enfim, um (re)alinhamento no meu propósito de vida!\n\n" +
        "Comecei meus estudos pela estética da maquiagem, que sempre me encantou em função de minha memória afetiva e da lembrança de minha infância. Quando pequenina, ficava observando minha mãe em frente ao espelho fazendo sua maquiagem para ir trabalhar e, até hoje, ela faz isso todos os dias, aos 83 anos. Hoje, não mais para o trabalho, mas por si própria, para genuinamente se sentir bem e confiante para encarar o dia a dia.\n\n" +
        "E essa conversa é sobre isso, de agir e reagir com autoconfiança, de estar e se sentir bem!\n\n" +
        "A cada nova jornada de estudos me sentia mais atenta, pronta para ir além, de compreender algo novo e de ampliar minha visão da vida. A maturidade dos 50+ nos estimula e permite menos cobranças internas e um pouco mais de tempo para nós mesmas. E a engrenagem ganha um novo ritmo com novos conhecimentos, com diversas interações com pessoas que passam a compartilhar suas histórias de forma única, na adrenalina nas aulas práticas, num verdadeiro prazer de conhecer e querer mais e mais, sempre em busca de um atendimento cada vez mais personalizado com experiências encantadoras numa relação de causa (pela pessoa) e efeito (para a pessoa).\n\n" +
        "Simplesmente não fazer mais do mesmo, e sim, fazer algo diferente como prestadora de serviço, pois, afinal, o serviço em sua essência tem por finalidade servir as pessoas, e não o contrário. Quantas vezes chegamos em um salão querendo ser únicas(os), especiais, mas naquele dia o horário está curto, os profissionais estão correndo, cheios de atendimentos e acabamos sendo mais um de tantos? Protocolos preestabelecidos, programados para vender mais do mesmo, o famoso \"fast\" atendimento.\n\n" +
        "Percebendo a minha própria expectativa como frequentadora dos salões de beleza, não vejo sentido algum em entregar um serviço \"fast\" por acreditar que a beleza jamais poderá ser tangibilizada por um padrão de tempo.\n\n" +
        "Mas, voltando aos meus estudos, existem outras atividades na área da beleza que acrescentei em minha formação até chegar na terapia capilar, onde, por experiência própria, pude encontrar respostas que me auxiliaram a melhor compreender o momento que passava, pois estava com muitas quedas capilares sem motivos aparentes e, além de tudo, também chegou a famosa menopausa, que muda tudo e mais um pouco no nosso corpo e também no nosso cabelo.\n\n" +
        "Passei a conhecer mais e entender melhor sobre esse universo e percebi que o estresse do dia a dia, as ansiedades, a rotina exaustiva nos trazem problemas capilares, dermatites, quedas de cabelo, excesso de oleosidade, coceiras, irritação e então passei a elaborar protocolos para ajudar as pessoas a tratarem problemas capilares semelhantes aos meus.\n\n" +
        "Com o firme propósito de servir na área da beleza estética como maquiadora, design de sobrancelhas, penteadora e terapeuta capilar, quero oferecer a melhor experiência de estima, entregar um sentimento de alta satisfação para cada pessoa que venha compartilhar seu precioso tempo comigo, na exata proporção que seus desejos merecem! **Bora se reinventar?**",
      ctaBody: "Vamos conversar? Me chame no WhatsApp para agendar o seu horário.",
      ctaLabel: "Agendar pelo WhatsApp",
    },
    anamnese: {
      title: "Ficha de Anamnese Capilar | {shortName}",
      description:
        "Ficha de anamnese capilar do {businessName}, preenchida antes da primeira sessão de terapia capilar.",
      heading: "Ficha de Anamnese Capilar",
      intro:
        "A ficha de anamnese capilar é um passo fundamental para qualquer procedimento capilar, seja um tratamento estético ou uma terapia capilar. Ela permite entender as particularidades de cada pessoa e garante que o tratamento seja personalizado e mais assertivo. Suas respostas são confidenciais e usadas apenas para planejar o seu atendimento.",
      requiredNote: "Os campos marcados com * são obrigatórios.",
      stepLabelTemplate: "Parte {current} de {total}",
      optionalNote: "(opcional)",
      otherDetailLabel: "Qual?",
      sections: [
        {
          id: "dados",
          heading: "Seus dados",
          fields: [
            { name: "email", type: "email", label: "E-mail", required: true, autocomplete: "email" },
            { name: "nome", type: "text", label: "Nome completo", required: true, autocomplete: "name" },
            { name: "telefone", type: "tel", label: "Telefone", required: true, autocomplete: "tel" },
            { name: "idade", type: "number", label: "Qual a sua idade?", required: true, min: 0, max: 120 },
          ],
        },
        {
          id: "queixa",
          heading: "Sua queixa",
          fields: [
            {
              name: "queixa_principal",
              type: "textarea",
              label: "Qual a sua queixa principal em relação ao couro cabeludo?",
              required: false,
            },
            {
              name: "queixa_outras_areas",
              type: "text",
              label: "Dentro dessa queixa, ela afeta outras áreas do corpo? Se sim, quais?",
              required: false,
            },
            {
              name: "queixa_inicio",
              type: "text",
              label: "Há quanto tempo começou com este problema?",
              required: false,
            },
            {
              name: "queixa_doenca_associada",
              type: "text",
              label: "Ele está associado a alguma doença sazonal ou congênita?",
              required: false,
            },
            {
              name: "queixa_evolucao",
              type: "radio",
              label: "O problema está:",
              required: false,
              options: ["Aumentando", "Estável", "Diminuindo"],
            },
            {
              name: "alteracoes_couro_cabeludo",
              type: "checkbox",
              label: "Quais dessas alterações você apresenta no couro cabeludo?",
              required: false,
              options: [
                "Dor",
                "Coceira",
                "Ardor",
                "Inflamação",
                "Feridas",
                "Caspa",
                "Oleosidade",
                "Odor",
                "Descamação",
                "Sensibilidade excessiva",
                "Outra",
              ],
              otherOption: "Outra",
            },
            {
              name: "crises_anteriores",
              type: "text",
              label: "Já teve crises dessas queixas no passado? Se sim, há quanto tempo?",
              required: false,
            },
            {
              name: "mudancas_cabelo",
              type: "checkbox",
              label: "Com relação ao cabelo, ele ficou:",
              required: false,
              options: [
                "Mais fino",
                "Mais crespo",
                "Mais quebradiço",
                "Mais seco",
                "Mais oleoso",
                "Não cresce",
                "Muita queda",
                "Nenhuma das opções acima",
              ],
              exclusiveOption: "Nenhuma das opções acima",
            },
          ],
        },
        {
          id: "saude",
          heading: "Saúde",
          fields: [
            {
              name: "doencas_recentes",
              type: "textarea",
              label: "Descreva as últimas doenças relevantes (últimos 6 meses)",
              required: false,
            },
            {
              name: "cirurgias_internacoes",
              type: "textarea",
              label: "Operações, cirurgias e internações nos últimos 2 anos",
              required: false,
            },
            {
              name: "doenca_em_tratamento",
              type: "text",
              label:
                "Você tem alguma doença atual em tratamento (diabetes, hiper ou hipotireoidismo, ansiedade...)?",
              required: false,
            },
            {
              name: "aparelho_reprodutor",
              type: "text",
              label: "Tem algum problema no aparelho reprodutor? Se sim, quer compartilhar?",
              required: false,
              help: "Responda apenas se quiser.",
            },
            {
              name: "cardiaco",
              type: "radio",
              label: "É cardíaco?",
              required: false,
              options: ["Não", "Sim"],
            },
            {
              name: "pressao_arterial",
              type: "radio",
              label: "Tem problema de pressão arterial?",
              required: false,
              options: ["Alta", "Baixa", "Normal"],
            },
            {
              name: "marcapasso",
              type: "radio",
              label: "Usa marcapasso?",
              required: false,
              options: ["Não", "Sim"],
            },
            {
              name: "aparelho_implante_protese",
              type: "text",
              label: "Tem aparelho dentário, implante dentário ou próteses? Cite.",
              required: false,
            },
            {
              name: "medicamento_continuo",
              type: "text",
              label: "Faz uso de medicamento de uso contínuo? Qual?",
              required: false,
            },
            {
              name: "tratamento_capilar_atual",
              type: "text",
              label: "Faz tratamento capilar via oral ou tópico? Se sim, qual?",
              required: false,
            },
            {
              name: "antes_da_queda",
              type: "checkbox",
              label: "Se está com queda atualmente, nos meses que antecederam essa queda você:",
              required: false,
              options: [
                "Fez dietas",
                "Emagreceu",
                "Engordou",
                "Teve algum trauma emocional",
                "Fez cirurgia",
                "Outros",
                "Não estou com queda",
              ],
              otherOption: "Outros",
              exclusiveOption: "Não estou com queda",
            },
            {
              name: "alergias",
              type: "text",
              label: "Tem alergia a algum medicamento ou cosmético? Qual?",
              required: false,
            },
            {
              name: "filhos",
              type: "text",
              label: "Tem filhos? Se sim, quantos? Quando foi a última gestação?",
              required: false,
            },
            {
              name: "gravidez_queda",
              type: "text",
              label: "Se sim, a gravidez trouxe queda de cabelo?",
              required: false,
            },
            {
              name: "alteracao_hormonal",
              type: "text",
              label: "Tem alguma alteração hormonal (ex.: T3, T4, DHT, estrogênio...)? Qual?",
              required: false,
            },
            {
              name: "depressao",
              type: "text",
              label: "Já teve ou está com algum quadro de depressão?",
              required: false,
              help: "Responda apenas se quiser.",
            },
          ],
        },
        {
          id: "habitos",
          heading: "Hábitos e cuidados",
          fields: [
            {
              name: "carne_vermelha",
              type: "radio",
              label: "Ingere carne vermelha?",
              required: true,
              options: ["Não", "Pouco", "Normal (70 a 100 g)", "Muito"],
            },
            {
              name: "calvicie_familia",
              type: "text",
              label: "Alguém da família tem algum tipo de calvície? Se sim, quem (grau de parentesco)?",
              required: true,
            },
            {
              name: "frequencia_lavagem",
              type: "text",
              label: "Com que frequência você lava o cabelo?",
              required: true,
            },
            {
              name: "quimica",
              type: "text",
              label: "Faz química no cabelo? (coloração, progressiva, botox, permanente, luzes...)",
              required: true,
            },
            {
              name: "itens_uso",
              type: "checkbox",
              label: "Faz uso desses itens?",
              required: true,
              options: [
                "Gel",
                "Boné ou chapéu",
                "Penteados presos",
                "Escova elétrica",
                "Prancha térmica ou babyliss",
                "Nenhuma das opções acima",
              ],
              exclusiveOption: "Nenhuma das opções acima",
            },
            {
              name: "densidade",
              type: "text",
              label: "A densidade dos cabelos é a mesma em todo o couro cabeludo?",
              required: true,
            },
            {
              name: "maior_desejo",
              type: "textarea",
              label:
                "Me fale o que mais te incomoda hoje nos seus cabelos e qual o seu maior desejo de melhoria neles.",
              required: true,
            },
          ],
        },
      ],
      consentLabelBefore:
        "Autorizo o {businessName} a utilizar as informações desta ficha, incluindo dados sobre a minha saúde, exclusivamente para avaliar e planejar o meu atendimento, conforme a ",
      consentLinkText: "Política de Privacidade",
      consentLabelAfter: ".",
      submitLabel: "Enviar ficha",
      honeypotLabel: "Não preencha este campo",
      summary: {
        fieldName: "Respostas da ficha",
        emptyAnswer: "(sem resposta)",
      },
      errors: {
        required: "Campo obrigatório.",
        email: "Informe um e-mail válido.",
        tel: "Informe um telefone só com números, com pelo menos 9 dígitos.",
        number: "Informe uma idade válida, entre 0 e 120.",
        checkboxGroup: "Marque pelo menos uma opção.",
        radioGroup: "Escolha uma opção.",
        consent: "É necessário autorizar o uso das informações para enviar a ficha.",
      },
    },
    privacy: {
      title: "Política de Privacidade | {businessName}",
      description:
        "Como o {businessName} trata os dados enviados pelo formulário de contato e pela ficha de anamnese capilar.",
      heading: "Política de Privacidade",
      updatedLabel: "Última atualização",
      // Approved by Andréa on 2026-10-20. Update this date whenever the text below changes.
      updatedDate: "2026-10-20",
      intro:
        "Esta política explica, de forma simples, quais dados este site coleta, por que motivo, como eles são guardados e como você pode exercer os seus direitos previstos na Lei Geral de Proteção de Dados (LGPD).",
      sections: [
        {
          heading: "Quem é responsável pelos seus dados",
          body:
            "O {businessName}, sob a responsabilidade de {ownerName}, é quem decide como os dados enviados por este site são usados. Para qualquer assunto sobre os seus dados, fale pelo WhatsApp {phoneDisplay}.",
        },
        {
          heading: "Formulário de contato",
          body:
            "Quando você preenche o formulário de contato, coletamos: nome, telefone/WhatsApp, e-mail (se informado), serviço de interesse e a mensagem enviada. Esses dados são usados exclusivamente para responder à sua mensagem e agendar o seu atendimento.",
        },
        {
          heading: "Ficha de anamnese capilar",
          body:
            "Antes da primeira sessão de terapia capilar, você recebe o link da ficha de anamnese. Ela coleta dados pessoais (e-mail, nome, telefone e idade) e **informações sobre a sua saúde e os seus hábitos**, que a LGPD classifica como dados pessoais sensíveis (art. 11).\n\n" +
            "Esses dados só são coletados com o seu consentimento específico, dado na própria ficha, e são usados apenas para avaliar e planejar a sua terapia capilar. Eles nunca são vendidos nem compartilhados com terceiros.",
        },
        {
          heading: "Como os dados são guardados",
          body:
            "As mensagens e as fichas enviadas pelo site são processadas pelo provedor de formulários (Netlify Forms) e recebidas no e-mail do studio. Elas ficam guardadas apenas pelo tempo necessário para o seu atendimento e são excluídas depois disso, ou antes, se você pedir.",
        },
        {
          heading: "Seus direitos",
          body:
            "De acordo com a LGPD, você pode pedir, a qualquer momento, acesso, correção ou exclusão dos seus dados, e também revogar o consentimento dado na ficha de anamnese. Para isso, fale pelo WhatsApp {phoneDisplay}.",
        },
        {
          heading: "Mapa do Google Maps",
          body:
            "A seção “Localização” da página inicial exibe um mapa incorporado do Google Maps, que é carregado diretamente dos servidores do Google quando você chega a essa parte da página. Ao carregar o mapa, o Google pode coletar dados (como o seu endereço IP e informações do navegador) e definir cookies, de acordo com a [Política de Privacidade do Google](https://policies.google.com/privacy). O {businessName} não tem acesso a esses dados.",
        },
        {
          heading: "Cookies e rastreamento",
          body:
            "O próprio site não define cookies nem usa ferramentas de rastreamento ou de análise de visitas. Os únicos cookies que podem ser definidos são os do Google Maps, descritos acima.",
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

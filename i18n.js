const SUPPORTED_LANGUAGES = ["pt", "en", "es"];
const DEFAULT_LANGUAGE = "pt";
const STORAGE_KEY = "portfolio-lang";

const translations = {
  pt: {
    meta: {
      title: "Jaelson Santos | Desenvolvedor Full Stack",
      description: "Jaelson Santos — Full Stack em formação em Coimbra. Construo produtos digitais, aprendo todos os dias e aprofundo Java e backend sem deixar de trabalhar em full stack."
    },
    skipLink: "Saltar para conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    nav: {
      home: "Início",
      projects: "Projetos",
      work: "Como trabalho",
      about: "Sobre",
      stack: "Stack",
      contact: "Contacto"
    },
    hero: {
      kicker: "Full Stack em formação · Coimbra",
      title: "Construo produtos digitais e evoluo um pouco todos os dias.",
      lead: "Sou o Jaelson Santos. Formado em Contabilidade, a concluir Full Stack na Master D. Gosto de perceber o problema, falar com quem usa o produto e melhorar com feedback. Neste momento aprofundo Java e backend — sem deixar de construir em full stack.",
      ctaProjects: "Ver projetos",
      ctaCv: "Currículo"
    },
    cvModal: {
      title: "Descarregar currículo",
      desc: "Que versão prefere?",
      ptTitle: "Português (PT)",
      ptDesc: "Versão em português europeu",
      enTitle: "English",
      enDesc: "English version",
      close: "Fechar"
    },
    projects: {
      title: "Projetos em destaque",
      lead: "Organizados por impacto — o problema primeiro, a stack depois.",
      viewSite: "Ver site",
      viewCode: "Ver código",
      viewApi: "API / health",
      repoPublic: "Repositório público",
      repoPrivate: "Repositório privado",
      codeAccessModalTitle: "Solicitar acesso ao código",
      codeAccessModalDesc: "Este repositório é privado. Escolha como prefere contactar-me:",
      requestCodeLinkedIn: "Solicitar via LinkedIn",
      requestCodeWhatsApp: "Solicitar via WhatsApp",
      codeAccessMessage: "Olá Jaelson! Vi o seu portfólio e gostaria de solicitar acesso ao repositório privado do projeto {{projectName}}. Demo: {{projectUrl}}. Obrigado!",
      messageCopied: "Mensagem copiada — cole no LinkedIn (Ctrl+V / Cmd+V)",
      closeModal: "Fechar",
      status: {
        live: "Em produção",
        pilot: "Piloto",
        early: "Em início",
        standby: "Em standby"
      },
      items: {
        agendaPro: {
          title: "AgendaPro",
          problem: "Agendar um serviço sem dois clientes ficarem no mesmo horário.",
          solution: "Nasceu como desafio técnico. Hoje é um produto completo: visitante agenda sem login, cliente gere a sua conta e o admin controla a agenda com JWT.",
          note: "API em Java/Spring Boot, frontend em React, PostgreSQL em produção. A regra de ouro está na API e num índice único parcial na base de dados.",
          highlights: [
            "Disponibilidade por data e duração do serviço",
            "Auth admin e cliente (JWT + refresh)",
            "Validação na API e na UI",
            "Deploy real: Vercel + Render + Supabase Postgres"
          ]
        },
        teglion: {
          title: "Teglion",
          problem: "Escritórios de contabilidade em Portugal ainda vivem entre email, WhatsApp, pastas e Excel.",
          solution: "Um SaaS com portal do escritório e portal do cliente: pedidos de documentos, prazos, mensagens e calendário fiscal num só sítio.",
          note: "Há um piloto real com uma contabilista. Ela dá feedback; eu implemento. A minha formação em Contabilidade ajuda a perceber o fluxo. O produto está em evolução — ainda não está “pronto”.",
          highlights: [
            "Registo, convites e upload de documentos",
            "Mensagens escritório ↔ cliente",
            "Tarefas, obrigações e calendário fiscal",
            "Blog SEO e smoke de segurança no backend"
          ]
        },
        afdigital: {
          title: "AfDigital",
          problem: "Precisávamos de uma presença séria para desenvolver sites e sistemas sob medida — e captar clientes de forma honesta.",
          solution: "Agência que criei com a minha esposa (julho 2026). Site institucional bilingue com Construtor de Ideias: o visitante monta um briefing visual antes da reunião.",
          note: "Ainda estamos no início e a captar clientes. Sem inventar portfólio de clientes nem faturação.",
          highlights: [
            "Site orientado a conversão (PT/EN)",
            "Construtor de Ideias como diferencial",
            "Captação de leads em implementação",
            "Negócio real, fase inicial"
          ]
        },
        saasude: {
          title: "SaaSude",
          description: "SaaS multi-clínica (agenda, equipa, clientes, documentos). Pausado enquanto a prioridade de estudo e produto mudou."
        },
        crmd2d: {
          title: "CRM D2D Portugal",
          description: "CRM para vendedores door-to-door: vendas, comissões, metas e plano de campo. Em standby por limite de projetos no Supabase free."
        },
        luxxEstetica: {
          title: "Luxx Estética",
          description: "Site institucional para clínica de estética, com integração de agendamento."
        },
        imigran: {
          title: "Imigran Construtora",
          description: "Site institucional para apresentar serviços e facilitar contacto."
        },
        codeRockers: {
          title: "The Code Rockers",
          description: "Website académico Master D — HTML semântico, CSS e Bootstrap."
        },
        lojaMasterD: {
          title: "Loja Arctic Monkeys",
          description: "Caso prático Master D: catálogo AJAX/JSON e DOM."
        },
        todoMasterD: {
          title: "To-Do List Master D",
          description: "Exercício de JS com localStorage, histórico e validação."
        }
      }
    },
    work: {
      title: "Como trabalho",
      lead: "A forma de pensar importa mais do que a ferramenta do momento.",
      principles: [
        "Começo pelo problema, não pela ferramenta.",
        "Falo com quem vai usar o produto.",
        "Prefiro código claro a código “inteligente”.",
        "Documento o que decido — para mim e para outros.",
        "Entrego, peço feedback e ajusto.",
        "Estudo todos os dias; mudo de stack se o projeto pedir."
      ]
    },
    about: {
      title: "Sobre mim",
      p1: "Comecei pela Contabilidade. Gostava de sistemas, de organização e de perceber como um negócio funciona por dentro. Em 2023 entrei a sério na programação.",
      p2: "Hoje estou a concluir Full Stack na Master D, em Coimbra. Construo produtos próprios — Teglion, AfDigital, AgendaPro — e trato cada um como software real: problema, utilizadores, deploy, documentação.",
      p3: "Estudo todos os dias. Neste momento aprofundo Java, tipagem forte e backend, porque acredito que isso facilita aprender outras linguagens depois. Continuo full stack: se o projeto pedir React, Node ou outra stack, aprendo e entrego.",
      lookingTitle: "O que procuro",
      looking: [
        "Primeira oportunidade como desenvolvedor júnior",
        "Equipas que valorizem evolução e mentoria",
        "Remoto, híbrido ou presencial em Portugal",
        "Projetos com problemas reais — qualquer stack razoável"
      ]
    },
    stack: {
      title: "Stack",
      lead: "Uma coluna é prioridade de estudo. A outra é experiência prática.",
      focusTitle: "A aprofundar",
      experienceTitle: "Experiência prática",
      focus: ["Java", "Spring Boot", "PostgreSQL", "JPA", "REST APIs", "JWT", "Docker"],
      experience: ["React", "TypeScript", "JavaScript", "Node.js", "Supabase", "MongoDB", "MySQL", "HTML", "CSS", "Bootstrap", "Angular", "PHP", "Git"]
    },
    standby: {
      title: "Em standby",
      lead: "Pausados de propósito — não abandonados. A prioridade actual mudou."
    },
    education: {
      title: "Formação e outros projetos",
      lead: "Base académica e exercícios que mostram consistência — sem competir com os destaques.",
      items: [
        { status: "Em curso", title: "Full Stack Developer", org: "Master D · Coimbra", period: "Dez 2025 – Atual" },
        { status: "Concluído", title: "Bacharelado em Ciências Contábeis", org: "Cruzeiro do Sul", period: "2024 – 2025" }
      ]
    },
    other: {
      title: "Outros projetos"
    },
    contact: {
      title: "Vamos conversar",
      subtitle: "Para oportunidades, feedback sobre projetos ou uma conversa rápida.",
      name: "Nome",
      email: "Email",
      message: "Mensagem",
      send: "Enviar mensagem",
      whatsappText: "Olá Jaelson! Vi o teu portfólio e gostaria de falar contigo.",
      formError: "Preencha corretamente nome, email e mensagem.",
      formSending: "A enviar...",
      formSuccess: "Mensagem enviada. Obrigado pelo contacto.",
      formFail: "Não foi possível enviar agora. Tente novamente em instantes.",
      rights: "Todos os direitos reservados."
    }
  },
  en: {
    meta: {
      title: "Jaelson Santos | Full Stack Developer",
      description: "Jaelson Santos — Full Stack developer in training in Coimbra. I build digital products, learn every day, and deepen Java and backend without leaving full stack work behind."
    },
    skipLink: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    nav: {
      home: "Home",
      projects: "Projects",
      work: "How I work",
      about: "About",
      stack: "Stack",
      contact: "Contact"
    },
    hero: {
      kicker: "Full Stack in training · Coimbra",
      title: "I build digital products and get a little better every day.",
      lead: "I'm Jaelson Santos. Accounting graduate, finishing Full Stack at Master D. I like understanding the problem, talking to the people who use the product, and improving with feedback. Right now I'm deepening Java and backend — while still building full stack.",
      ctaProjects: "View projects",
      ctaCv: "Resume"
    },
    cvModal: {
      title: "Download resume",
      desc: "Which version would you like?",
      ptTitle: "Portuguese (PT)",
      ptDesc: "European Portuguese version",
      enTitle: "English",
      enDesc: "English version",
      close: "Close"
    },
    projects: {
      title: "Featured projects",
      lead: "Ordered by impact — problem first, stack second.",
      viewSite: "View site",
      viewCode: "View code",
      viewApi: "API / health",
      repoPublic: "Public repository",
      repoPrivate: "Private repository",
      codeAccessModalTitle: "Request code access",
      codeAccessModalDesc: "This repository is private. Choose how you'd like to reach me:",
      requestCodeLinkedIn: "Request via LinkedIn",
      requestCodeWhatsApp: "Request via WhatsApp",
      codeAccessMessage: "Hi Jaelson! I saw your portfolio and would like access to the private repo for {{projectName}}. Demo: {{projectUrl}}. Thanks!",
      messageCopied: "Message copied — paste it on LinkedIn (Ctrl+V / Cmd+V)",
      closeModal: "Close",
      status: {
        live: "Live",
        pilot: "Pilot",
        early: "Early stage",
        standby: "On standby"
      },
      items: {
        agendaPro: {
          title: "AgendaPro",
          problem: "Book a service without two clients ending up in the same slot.",
          solution: "Started as a technical challenge. Today it's a full product: visitors book without login, clients manage their account, and admins run the schedule with JWT.",
          note: "Java/Spring Boot API, React frontend, PostgreSQL in production. The core rule lives in the API and a partial unique index in the database.",
          highlights: [
            "Availability by date and service duration",
            "Admin and client auth (JWT + refresh)",
            "Validation on API and UI",
            "Real deploy: Vercel + Render + Supabase Postgres"
          ]
        },
        teglion: {
          title: "Teglion",
          problem: "Small accounting firms in Portugal still run on email, WhatsApp, shared folders and spreadsheets.",
          solution: "A SaaS with firm and client portals: document requests, deadlines, messaging and a tax calendar in one place.",
          note: "There's a real pilot with an accountant. She gives feedback; I ship changes. My accounting background helps. The product is evolving — it's not “done”.",
          highlights: [
            "Sign-up, invites and document uploads",
            "Firm ↔ client messaging",
            "Tasks, obligations and tax calendar",
            "SEO blog and backend security smoke checks"
          ]
        },
        afdigital: {
          title: "AfDigital",
          problem: "We needed a serious presence to build custom sites and systems — and to win clients honestly.",
          solution: "An agency I started with my wife (July 2026). Bilingual institutional site with an Idea Builder: visitors assemble a visual brief before the meeting.",
          note: "We're still early and looking for clients. No invented client list or revenue claims.",
          highlights: [
            "Conversion-focused site (PT/EN)",
            "Idea Builder as the main differentiator",
            "Lead capture in progress",
            "Real business, early stage"
          ]
        },
        saasude: {
          title: "SaaSude",
          description: "Multi-clinic SaaS (schedule, team, clients, documents). On standby while study and product priorities shifted."
        },
        crmd2d: {
          title: "CRM D2D Portugal",
          description: "CRM for door-to-door sellers: sales, commissions, goals and field planning. On standby due to Supabase free-tier limits."
        },
        luxxEstetica: {
          title: "Luxx Estética",
          description: "Institutional site for an aesthetics clinic, with booking integration."
        },
        imigran: {
          title: "Imigran Construtora",
          description: "Institutional site to present services and make contact easy."
        },
        codeRockers: {
          title: "The Code Rockers",
          description: "Master D academic website — semantic HTML, CSS and Bootstrap."
        },
        lojaMasterD: {
          title: "Arctic Monkeys Store",
          description: "Master D case study: AJAX/JSON catalogue and DOM work."
        },
        todoMasterD: {
          title: "To-Do List Master D",
          description: "JS exercise with localStorage, history and validation."
        }
      }
    },
    work: {
      title: "How I work",
      lead: "How I think matters more than whichever tool I'm using today.",
      principles: [
        "I start with the problem, not the tool.",
        "I talk to the people who will use the product.",
        "I prefer clear code over “clever” code.",
        "I document decisions — for myself and for others.",
        "I ship, ask for feedback, and adjust.",
        "I study every day; I'll switch stacks if the project needs it."
      ]
    },
    about: {
      title: "About me",
      p1: "I started in Accounting. I liked systems, organisation, and understanding how a business works from the inside. In 2023 I committed seriously to programming.",
      p2: "I'm finishing Full Stack at Master D in Coimbra. I build my own products — Teglion, AfDigital, AgendaPro — and treat each one as real software: problem, users, deploy, docs.",
      p3: "I study every day. Right now I'm deepening Java, strong typing and backend, because I believe that makes learning other languages easier later. I stay full stack: if a project needs React, Node or another stack, I learn and deliver.",
      lookingTitle: "What I'm looking for",
      looking: [
        "A first junior developer role",
        "Teams that value growth and mentorship",
        "Remote, hybrid or on-site in Portugal",
        "Projects with real problems — any reasonable stack"
      ]
    },
    stack: {
      title: "Stack",
      lead: "One column is study focus. The other is practical experience.",
      focusTitle: "Deepening now",
      experienceTitle: "Practical experience",
      focus: ["Java", "Spring Boot", "PostgreSQL", "JPA", "REST APIs", "JWT", "Docker"],
      experience: ["React", "TypeScript", "JavaScript", "Node.js", "Supabase", "MongoDB", "MySQL", "HTML", "CSS", "Bootstrap", "Angular", "PHP", "Git"]
    },
    standby: {
      title: "On standby",
      lead: "Paused on purpose — not abandoned. Priorities changed."
    },
    education: {
      title: "Education and other projects",
      lead: "Academic base and exercises that show consistency — without competing with the highlights.",
      items: [
        { status: "In progress", title: "Full Stack Developer", org: "Master D · Coimbra", period: "Dec 2025 – Present" },
        { status: "Completed", title: "Bachelor in Accounting Sciences", org: "Cruzeiro do Sul", period: "2024 – 2025" }
      ]
    },
    other: {
      title: "Other projects"
    },
    contact: {
      title: "Let's talk",
      subtitle: "For opportunities, project feedback, or a short conversation.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      whatsappText: "Hi Jaelson! I saw your portfolio and would like to talk.",
      formError: "Please fill in name, email and message correctly.",
      formSending: "Sending...",
      formSuccess: "Message sent. Thanks for reaching out.",
      formFail: "Couldn't send right now. Please try again shortly.",
      rights: "All rights reserved."
    }
  },
  es: {
    meta: {
      title: "Jaelson Santos | Desarrollador Full Stack",
      description: "Jaelson Santos — Full Stack en formación en Coímbra. Construyo productos digitales, aprendo cada día y profundizo en Java y backend sin dejar el trabajo full stack."
    },
    skipLink: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      work: "Cómo trabajo",
      about: "Sobre mí",
      stack: "Stack",
      contact: "Contacto"
    },
    hero: {
      kicker: "Full Stack en formación · Coímbra",
      title: "Construyo productos digitales y mejoro un poco cada día.",
      lead: "Soy Jaelson Santos. Formado en Contabilidad, terminando Full Stack en Master D. Me gusta entender el problema, hablar con quien usa el producto y mejorar con feedback. Ahora profundizo en Java y backend — sin dejar de construir en full stack.",
      ctaProjects: "Ver proyectos",
      ctaCv: "Currículum"
    },
    cvModal: {
      title: "Descargar currículum",
      desc: "¿Qué versión prefieres?",
      ptTitle: "Portugués (PT)",
      ptDesc: "Versión en portugués europeo",
      enTitle: "English",
      enDesc: "Versión en inglés",
      close: "Cerrar"
    },
    projects: {
      title: "Proyectos destacados",
      lead: "Ordenados por impacto — primero el problema, después la stack.",
      viewSite: "Ver sitio",
      viewCode: "Ver código",
      viewApi: "API / health",
      repoPublic: "Repositorio público",
      repoPrivate: "Repositorio privado",
      codeAccessModalTitle: "Solicitar acceso al código",
      codeAccessModalDesc: "Este repositorio es privado. Elige cómo prefieres contactarme:",
      requestCodeLinkedIn: "Solicitar por LinkedIn",
      requestCodeWhatsApp: "Solicitar por WhatsApp",
      codeAccessMessage: "¡Hola Jaelson! Vi tu portafolio y me gustaría acceso al repositorio privado de {{projectName}}. Demo: {{projectUrl}}. ¡Gracias!",
      messageCopied: "Mensaje copiado — pégalo en LinkedIn (Ctrl+V / Cmd+V)",
      closeModal: "Cerrar",
      status: {
        live: "En producción",
        pilot: "Piloto",
        early: "En inicio",
        standby: "En standby"
      },
      items: {
        agendaPro: {
          title: "AgendaPro",
          problem: "Agendar un servicio sin que dos clientes ocupen el mismo horario.",
          solution: "Nació como reto técnico. Hoy es un producto completo: el visitante agenda sin login, el cliente gestiona su cuenta y el admin controla la agenda con JWT.",
          note: "API en Java/Spring Boot, frontend en React, PostgreSQL en producción. La regla clave está en la API y en un índice único parcial en la base de datos.",
          highlights: [
            "Disponibilidad por fecha y duración del servicio",
            "Auth admin y cliente (JWT + refresh)",
            "Validación en API y UI",
            "Deploy real: Vercel + Render + Supabase Postgres"
          ]
        },
        teglion: {
          title: "Teglion",
          problem: "Los despachos contables en Portugal aún viven entre email, WhatsApp, carpetas y Excel.",
          solution: "Un SaaS con portal del despacho y del cliente: pedidos de documentos, plazos, mensajes y calendario fiscal en un solo lugar.",
          note: "Hay un piloto real con una contable. Ella da feedback; yo implemento. Mi formación en Contabilidad ayuda. El producto está en evolución — aún no está “listo”.",
          highlights: [
            "Registro, invitaciones y subida de documentos",
            "Mensajes despacho ↔ cliente",
            "Tareas, obligaciones y calendario fiscal",
            "Blog SEO y smoke de seguridad en el backend"
          ]
        },
        afdigital: {
          title: "AfDigital",
          problem: "Necesitábamos una presencia seria para desarrollar sitios y sistemas a medida — y captar clientes con honestidad.",
          solution: "Agencia que creé con mi esposa (julio 2026). Sitio institucional bilingüe con Constructor de Ideas: el visitante arma un briefing visual antes de la reunión.",
          note: "Aún estamos al inicio y captando clientes. Sin inventar cartera ni facturación.",
          highlights: [
            "Sitio orientado a conversión (PT/EN)",
            "Constructor de Ideas como diferencial",
            "Captación de leads en implementación",
            "Negocio real, fase inicial"
          ]
        },
        saasude: {
          title: "SaaSude",
          description: "SaaS multi-clínica (agenda, equipo, clientes, documentos). En standby mientras cambió la prioridad de estudio y producto."
        },
        crmd2d: {
          title: "CRM D2D Portugal",
          description: "CRM para vendedores puerta a puerta: ventas, comisiones, metas y plan de campo. En standby por límite de proyectos en Supabase free."
        },
        luxxEstetica: {
          title: "Luxx Estética",
          description: "Sitio institucional para clínica de estética, con integración de agendamiento."
        },
        imigran: {
          title: "Imigran Construtora",
          description: "Sitio institucional para presentar servicios y facilitar el contacto."
        },
        codeRockers: {
          title: "The Code Rockers",
          description: "Sitio académico Master D — HTML semántico, CSS y Bootstrap."
        },
        lojaMasterD: {
          title: "Tienda Arctic Monkeys",
          description: "Caso práctico Master D: catálogo AJAX/JSON y DOM."
        },
        todoMasterD: {
          title: "To-Do List Master D",
          description: "Ejercicio de JS con localStorage, historial y validación."
        }
      }
    },
    work: {
      title: "Cómo trabajo",
      lead: "La forma de pensar importa más que la herramienta del momento.",
      principles: [
        "Empiezo por el problema, no por la herramienta.",
        "Hablo con quien va a usar el producto.",
        "Prefiero código claro a código “inteligente”.",
        "Documento lo que decido — para mí y para otros.",
        "Entrego, pido feedback y ajusto.",
        "Estudio todos los días; cambio de stack si el proyecto lo pide."
      ]
    },
    about: {
      title: "Sobre mí",
      p1: "Empecé por Contabilidad. Me gustaban los sistemas, la organización y entender cómo funciona un negocio por dentro. En 2023 entré en serio en la programación.",
      p2: "Hoy termino Full Stack en Master D, en Coímbra. Construyo productos propios — Teglion, AfDigital, AgendaPro — y trato cada uno como software real: problema, usuarios, deploy, documentación.",
      p3: "Estudio todos los días. Ahora profundizo en Java, tipado fuerte y backend, porque creo que eso facilita aprender otros lenguajes después. Sigo siendo full stack: si el proyecto pide React, Node u otra stack, aprendo y entrego.",
      lookingTitle: "Lo que busco",
      looking: [
        "Primera oportunidad como desarrollador junior",
        "Equipos que valoren evolución y mentoría",
        "Remoto, híbrido o presencial en Portugal",
        "Proyectos con problemas reales — cualquier stack razonable"
      ]
    },
    stack: {
      title: "Stack",
      lead: "Una columna es prioridad de estudio. La otra es experiencia práctica.",
      focusTitle: "Profundizando",
      experienceTitle: "Experiencia práctica",
      focus: ["Java", "Spring Boot", "PostgreSQL", "JPA", "REST APIs", "JWT", "Docker"],
      experience: ["React", "TypeScript", "JavaScript", "Node.js", "Supabase", "MongoDB", "MySQL", "HTML", "CSS", "Bootstrap", "Angular", "PHP", "Git"]
    },
    standby: {
      title: "En standby",
      lead: "Pausados a propósito — no abandonados. La prioridad actual cambió."
    },
    education: {
      title: "Formación y otros proyectos",
      lead: "Base académica y ejercicios que muestran constancia — sin competir con los destacados.",
      items: [
        { status: "En curso", title: "Full Stack Developer", org: "Master D · Coímbra", period: "Dic 2025 – Actual" },
        { status: "Completado", title: "Licenciatura en Ciencias Contables", org: "Cruzeiro do Sul", period: "2024 – 2025" }
      ]
    },
    other: {
      title: "Otros proyectos"
    },
    contact: {
      title: "Hablemos",
      subtitle: "Para oportunidades, feedback de proyectos o una conversa rápida.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      whatsappText: "¡Hola Jaelson! Vi tu portafolio y me gustaría hablar contigo.",
      formError: "Completa correctamente nombre, email y mensaje.",
      formSending: "Enviando...",
      formSuccess: "Mensaje enviado. Gracias por contactar.",
      formFail: "No fue posible enviar ahora. Inténtalo de nuevo en un momento.",
      rights: "Todos los derechos reservados."
    }
  }
};

function getStoredLanguage() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("lang");
  if (SUPPORTED_LANGUAGES.includes(fromQuery)) return fromQuery;

  const stored = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

function t(lang, key) {
  return getNestedValue(translations[lang], key) ?? getNestedValue(translations[DEFAULT_LANGUAGE], key) ?? key;
}

function updateSocialMeta(lang) {
  const title = t(lang, "meta.title");
  const description = t(lang, "meta.description");
  const locale = lang === "pt" ? "pt_PT" : lang === "es" ? "es_ES" : "en_US";

  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = description;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  const twDesc = document.querySelector('meta[name="twitter:description"]');

  if (ogTitle) ogTitle.content = title;
  if (ogDesc) ogDesc.content = description;
  if (ogLocale) ogLocale.content = locale;
  if (twTitle) twTitle.content = title;
  if (twDesc) twDesc.content = description;
}

function applyTranslations(lang) {
  document.documentElement.lang = lang === "pt" ? "pt-PT" : lang === "es" ? "es-ES" : "en";
  updateSocialMeta(lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(lang, el.dataset.i18n);
    if (Array.isArray(value)) return;
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(lang, el.dataset.i18nAria));
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  localStorage.setItem(STORAGE_KEY, lang);

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);

  document.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (SUPPORTED_LANGUAGES.includes(lang)) applyTranslations(lang);
    });
  });
}

function initI18n() {
  initLanguageSwitcher();
  applyTranslations(getStoredLanguage());
}

window.I18n = { t, applyTranslations, getStoredLanguage, initI18n, SUPPORTED_LANGUAGES };

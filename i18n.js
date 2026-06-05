const SUPPORTED_LANGUAGES = ["pt", "en", "es"];
const DEFAULT_LANGUAGE = "pt";
const STORAGE_KEY = "portfolio-lang";

const translations = {
  pt: {
    meta: {
      title: "Jaelson Santos | Desenvolvedor Full Stack",
      description: "Portfólio de Jaelson Santos, desenvolvedor Full Stack em Coimbra. Projetos SaaS, CRM, cibersegurança e produtos digitais com foco em resultado."
    },
    skipLink: "Saltar para conteúdo",
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Competências",
      projects: "Projetos",
      education: "Formação",
      contact: "Contato"
    },
    hero: {
      kicker: "DESENVOLVEDOR FULL STACK · CIBERSEGURANÇA",
      title: "Transformo ideias em aplicações web que resolvem problemas reais de negócio",
      lead: "Sou o Jaelson Santos, em Coimbra. Desenvolvo SaaS, CRM e plataformas web com JavaScript, React e Node.js. Tenho base sólida em vendas B2B — uso essa visão para criar produtos orientados ao utilizador. Atualmente aprofundo cibersegurança, Python e formação Full Stack.",
      ctaProjects: "Ver projetos",
      ctaCv: "Baixar currículo"
    },
    about: {
      title: "Sobre mim",
      p1: "Estou em formação Full Stack na Master D (Coimbra) e construo projetos reais com frontend, backend, APIs e bases de dados. Antes disso, trabalhei mais de três anos em vendas B2B — prospeção, gestão de carteira, planeamento de rotas e liderança comercial.",
      p2: "Essa combinação de tecnologia e negócio permite-me pensar em produto de forma prática: entendo o que equipas comerciais precisam e traduzo isso em software funcional. Estudo cibersegurança (certificação Google em curso), Python no freeCodeCamp e publiquei um ebook profissional sobre redes e segurança.",
      lookingTitle: "O que procuro agora",
      looking: [
        "Primeira oportunidade como Desenvolvedor Júnior",
        "Estágio ou posição remunerada",
        "Remoto, híbrido ou presencial em Portugal",
        "Projetos Web, SaaS, CRM e plataformas",
        "Equipas que valorizem crescimento e mentoria"
      ]
    },
    skills: {
      title: "Competências",
      techTitle: "Stack técnica",
      softTitle: "Competências transferíveis",
      tech: ["JavaScript (ES6+)", "React", "Node.js", "HTML & CSS", "APIs REST", "MongoDB", "Express", "Git / GitHub", "Firebase", "Bootstrap", "OWASP ZAP", "Python (em curso)"],
      soft: ["Comunicação e negociação B2B", "Gestão de clientes e CRM", "Resolução de problemas", "Pensamento orientado a negócio", "Trabalho autónomo e aprendizagem contínua"]
    },
    education: {
      title: "Formação e certificações",
      items: [
        { status: "Em curso", title: "Full Stack Developer", org: "Master D · Coimbra", period: "Dez 2025 – Atual" },
        { status: "Em curso", title: "Certificação Google em Cibersegurança", org: "Google / Coursera", period: "2025 – Atual" },
        { status: "Em curso", title: "Python & Desenvolvimento Web", org: "freeCodeCamp", period: "2025 – Atual" },
        { status: "Concluído", title: "Bacharelado em Ciências Contábeis", org: "Cruzeiro do Sul", period: "2024 – 2025" }
      ],
      ebookTitle: "Publicação digital",
      ebookName: "Conectar e Proteger: Redes e Segurança de Redes",
      ebookDesc: "Ebook profissional com 4 módulos sobre fundamentos de redes, TCP/IP, cibersegurança (CIA, firewalls, criptografia) e defesa ativa (Zero Trust, SOC, EDR). Inclui apêndices para CCNA/Security+.",
      ebookCta: "Ver na Hotmart"
    },
    projects: {
      title: "Projetos em destaque",
      filter: "Filtrar",
      viewSite: "Ver site",
      viewCode: "Ver código",
      repoPublic: "Repositório público",
      repoPrivate: "Repositório privado",
      codeAccessModalTitle: "Solicitar acesso ao código",
      codeAccessModalDesc: "Este repositório é privado. Escolha como prefere contactar-me:",
      requestCodeLinkedIn: "Solicitar via LinkedIn",
      requestCodeWhatsApp: "Solicitar via WhatsApp",
      codeAccessMessage: "Olá Jaelson! Vi o seu portfólio e gostaria de solicitar acesso ao repositório privado do projeto {{projectName}}. Demo: {{projectUrl}}. Obrigado!",
      messageCopied: "Mensagem copiada — cole no LinkedIn (Ctrl+V / Cmd+V)",
      closeModal: "Fechar",
      prev: "Projeto anterior",
      next: "Próximo projeto",
      filters: { all: "Todos", frontend: "Frontend", backend: "Backend", uxui: "UX/UI" },
      items: {
        crmd2d: { title: "CRM D2D Portugal", description: "CRM pessoal para organização de rotas comerciais, gestão de clientes e melhoria de vendas door-to-door." },
        saasude: { title: "SaaSude", description: "SaaS para clínicas de estética com gestão multi-utilizador e operação real." },
        teglion: { title: "Teglion", description: "SaaS para escritórios de contabilidade com foco em gestão financeira." },
        futureClinic: { title: "Future Clinic", description: "Landing page para clínicas com foco em conversão e confiança." },
        luxxEstetica: { title: "Luxx Estética", description: "Página para clínica de estética com agendamento e presença digital profissional." },
        imigran: { title: "Imigran Construtora", description: "Site institucional com estrutura clara e objetiva." },
        clubFlix: { title: "Club Flix", description: "Interface de streaming com foco em experiência do utilizador." },
        ideaServi: { title: "IdeaServi", description: "Fluxo de solicitação de serviços com foco em produto digital." },
        codeRockers: { title: "The Code Rockers", description: "Projeto académico Master D com páginas semânticas e acessíveis." },
        bijusMaya: { title: "Bijus da Maya", description: "Landing artesanal para divulgação e encomendas online." },
        todoMasterD: { title: "ToDoList Master D", description: "To-do list com localStorage, histórico e validação de formulários." }
      }
    },
    testimonials: {
      title: "Feedback de clientes e parceiros",
      items: [
        { quote: "Jaelson entregou um site acima do esperado, com comunicação clara e muito compromisso.", name: "Pedro Vinicius", role: "Gestor Comercial" },
        { quote: "Tivemos melhoria na apresentação da empresa e mais contactos vindos do site.", name: "João Oliveira", role: "Empresário" },
        { quote: "Excelente organização e cuidado com os detalhes de UX. Recomendo com confiança.", name: "Ana Costa", role: "Coordenadora de Projetos" }
      ]
    },
    contact: {
      title: "Vamos falar do seu projeto",
      subtitle: "Envie os dados no formulário. Retorno com proposta e próximos passos.",
      name: "Nome",
      email: "Email",
      message: "Mensagem",
      send: "Enviar mensagem",
      whatsappText: "Olá! Vim do seu portfólio e gostaria de saber mais sobre como pode ajudar.",
      formError: "Preencha corretamente nome, email e mensagem.",
      formSending: "A enviar mensagem...",
      formSuccess: "Mensagem enviada com sucesso. Obrigado pelo contacto.",
      formFail: "Não foi possível enviar agora. Tente novamente em instantes.",
      rights: "Todos os direitos reservados."
    },
    openMenu: "Abrir menu"
  },
  en: {
    meta: {
      title: "Jaelson Santos | Full Stack Developer",
      description: "Portfolio of Jaelson Santos, Full Stack Developer in Coimbra. SaaS, CRM, cybersecurity projects and digital products focused on results."
    },
    skipLink: "Skip to content",
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      contact: "Contact"
    },
    hero: {
      kicker: "FULL STACK DEVELOPER · CYBERSECURITY",
      title: "I turn ideas into web applications that solve real business problems",
      lead: "I'm Jaelson Santos, based in Coimbra. I build SaaS, CRM and web platforms with JavaScript, React and Node.js. My solid B2B sales background helps me create user-oriented products. Currently deepening cybersecurity, Python and Full Stack training.",
      ctaProjects: "View projects",
      ctaCv: "Download resume"
    },
    about: {
      title: "About me",
      p1: "I'm training as a Full Stack Developer at Master D (Coimbra) and building real projects with frontend, backend, APIs and databases. Before that, I spent over three years in B2B sales — prospecting, account management, route planning and sales leadership.",
      p2: "This blend of technology and business lets me think practically about product: I understand what sales teams need and translate it into working software. I'm studying cybersecurity (Google certification in progress), Python on freeCodeCamp and published a professional ebook on networks and security.",
      lookingTitle: "What I'm looking for",
      looking: [
        "First opportunity as Junior Developer",
        "Paid internship or entry-level role",
        "Remote, hybrid or on-site in Portugal",
        "Web, SaaS, CRM and platform projects",
        "Teams that value growth and mentorship"
      ]
    },
    skills: {
      title: "Skills",
      techTitle: "Technical stack",
      softTitle: "Transferable skills",
      tech: ["JavaScript (ES6+)", "React", "Node.js", "HTML & CSS", "REST APIs", "MongoDB", "Express", "Git / GitHub", "Firebase", "Bootstrap", "OWASP ZAP", "Python (in progress)"],
      soft: ["Communication and B2B negotiation", "Client management and CRM", "Problem solving", "Business-oriented thinking", "Self-directed learning"]
    },
    education: {
      title: "Education & certifications",
      items: [
        { status: "In progress", title: "Full Stack Developer", org: "Master D · Coimbra", period: "Dec 2025 – Present" },
        { status: "In progress", title: "Google Cybersecurity Certificate", org: "Google / Coursera", period: "2025 – Present" },
        { status: "In progress", title: "Python & Web Development", org: "freeCodeCamp", period: "2025 – Present" },
        { status: "Completed", title: "Bachelor in Accounting Sciences", org: "Cruzeiro do Sul", period: "2024 – 2025" }
      ],
      ebookTitle: "Digital publication",
      ebookName: "Connect and Protect: Networks and Network Security",
      ebookDesc: "Professional ebook with 4 modules on network fundamentals, TCP/IP, cybersecurity (CIA, firewalls, cryptography) and active defense (Zero Trust, SOC, EDR). Includes CCNA/Security+ appendices.",
      ebookCta: "View on Hotmart"
    },
    projects: {
      title: "Featured projects",
      filter: "Filter",
      viewSite: "View site",
      viewCode: "View code",
      repoPublic: "Public repository",
      repoPrivate: "Private repository",
      codeAccessModalTitle: "Request code access",
      codeAccessModalDesc: "This repository is private. Choose how you would like to contact me:",
      requestCodeLinkedIn: "Request via LinkedIn",
      requestCodeWhatsApp: "Request via WhatsApp",
      codeAccessMessage: "Hi Jaelson! I saw your portfolio and would like to request access to the private repository for {{projectName}}. Demo: {{projectUrl}}. Thank you!",
      messageCopied: "Message copied — paste it on LinkedIn (Ctrl+V / Cmd+V)",
      closeModal: "Close",
      prev: "Previous project",
      next: "Next project",
      filters: { all: "All", frontend: "Frontend", backend: "Backend", uxui: "UX/UI" },
      items: {
        crmd2d: { title: "CRM D2D Portugal", description: "Personal CRM for commercial route organization, client management and door-to-door sales improvement." },
        saasude: { title: "SaaSude", description: "SaaS for aesthetic clinics with multi-user management and real operations." },
        teglion: { title: "Teglion", description: "SaaS for accounting firms focused on financial management." },
        futureClinic: { title: "Future Clinic", description: "Landing page for clinics focused on conversion and trust." },
        luxxEstetica: { title: "Luxx Estética", description: "Aesthetic clinic page with scheduling and professional digital presence." },
        imigran: { title: "Imigran Construtora", description: "Corporate website with clear and objective structure." },
        clubFlix: { title: "Club Flix", description: "Streaming interface focused on user experience." },
        ideaServi: { title: "IdeaServi", description: "Service request flow focused on digital product." },
        codeRockers: { title: "The Code Rockers", description: "Master D academic project with semantic and accessible pages." },
        bijusMaya: { title: "Bijus da Maya", description: "Artisan landing page for promotion and online orders." },
        todoMasterD: { title: "ToDoList Master D", description: "To-do list with localStorage, history and form validation." }
      }
    },
    testimonials: {
      title: "Client and partner feedback",
      items: [
        { quote: "Jaelson delivered a website above expectations, with clear communication and strong commitment.", name: "Pedro Vinicius", role: "Sales Manager" },
        { quote: "We improved our company presentation and got more contacts from the website.", name: "João Oliveira", role: "Business Owner" },
        { quote: "Excellent organization and attention to UX details. I recommend with confidence.", name: "Ana Costa", role: "Project Coordinator" }
      ]
    },
    contact: {
      title: "Let's talk about your project",
      subtitle: "Send your details in the form. I'll reply with a proposal and next steps.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      whatsappText: "Hello! I came from your portfolio and would like to know more about how you can help.",
      formError: "Please fill in name, email and message correctly.",
      formSending: "Sending message...",
      formSuccess: "Message sent successfully. Thank you for reaching out.",
      formFail: "Could not send right now. Please try again shortly.",
      rights: "All rights reserved."
    },
    openMenu: "Open menu"
  },
  es: {
    meta: {
      title: "Jaelson Santos | Desarrollador Full Stack",
      description: "Portafolio de Jaelson Santos, desarrollador Full Stack en Coímbra. Proyectos SaaS, CRM, ciberseguridad y productos digitales orientados a resultados."
    },
    skipLink: "Saltar al contenido",
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      skills: "Competencias",
      projects: "Proyectos",
      education: "Formación",
      contact: "Contacto"
    },
    hero: {
      kicker: "DESARROLLADOR FULL STACK · CIBERSEGURIDAD",
      title: "Transformo ideas en aplicaciones web que resuelven problemas reales de negocio",
      lead: "Soy Jaelson Santos, en Coímbra. Desarrollo SaaS, CRM y plataformas web con JavaScript, React y Node.js. Tengo una sólida base en ventas B2B — uso esa visión para crear productos orientados al usuario. Actualmente profundizo en ciberseguridad, Python y formación Full Stack.",
      ctaProjects: "Ver proyectos",
      ctaCv: "Descargar currículum"
    },
    about: {
      title: "Sobre mí",
      p1: "Estoy en formación Full Stack en Master D (Coímbra) y construyo proyectos reales con frontend, backend, APIs y bases de datos. Antes, trabajé más de tres años en ventas B2B — prospección, gestión de cartera, planificación de rutas y liderazgo comercial.",
      p2: "Esta combinación de tecnología y negocio me permite pensar en producto de forma práctica: entiendo lo que los equipos comerciales necesitan y lo traduzco en software funcional. Estudio ciberseguridad (certificación Google en curso), Python en freeCodeCamp y publiqué un ebook profesional sobre redes y seguridad.",
      lookingTitle: "Lo que busco ahora",
      looking: [
        "Primera oportunidad como Desarrollador Junior",
        "Prácticas o puesto remunerado",
        "Remoto, híbrido o presencial en Portugal",
        "Proyectos Web, SaaS, CRM y plataformas",
        "Equipos que valoren el crecimiento y la mentoría"
      ]
    },
    skills: {
      title: "Competencias",
      techTitle: "Stack técnico",
      softTitle: "Competencias transferibles",
      tech: ["JavaScript (ES6+)", "React", "Node.js", "HTML & CSS", "APIs REST", "MongoDB", "Express", "Git / GitHub", "Firebase", "Bootstrap", "OWASP ZAP", "Python (en curso)"],
      soft: ["Comunicación y negociación B2B", "Gestión de clientes y CRM", "Resolución de problemas", "Pensamiento orientado al negocio", "Aprendizaje autónomo y continuo"]
    },
    education: {
      title: "Formación y certificaciones",
      items: [
        { status: "En curso", title: "Full Stack Developer", org: "Master D · Coímbra", period: "Dic 2025 – Actual" },
        { status: "En curso", title: "Certificación Google en Ciberseguridad", org: "Google / Coursera", period: "2025 – Actual" },
        { status: "En curso", title: "Python y Desarrollo Web", org: "freeCodeCamp", period: "2025 – Actual" },
        { status: "Completado", title: "Licenciatura en Ciencias Contables", org: "Cruzeiro do Sul", period: "2024 – 2025" }
      ],
      ebookTitle: "Publicación digital",
      ebookName: "Conectar y Proteger: Redes y Seguridad de Redes",
      ebookDesc: "Ebook profesional con 4 módulos sobre fundamentos de redes, TCP/IP, ciberseguridad (CIA, firewalls, criptografía) y defensa activa (Zero Trust, SOC, EDR). Incluye apéndices para CCNA/Security+.",
      ebookCta: "Ver en Hotmart"
    },
    projects: {
      title: "Proyectos destacados",
      filter: "Filtrar",
      viewSite: "Ver sitio",
      viewCode: "Ver código",
      repoPublic: "Repositorio público",
      repoPrivate: "Repositorio privado",
      codeAccessModalTitle: "Solicitar acceso al código",
      codeAccessModalDesc: "Este repositorio es privado. Elige cómo prefieres contactarme:",
      requestCodeLinkedIn: "Solicitar por LinkedIn",
      requestCodeWhatsApp: "Solicitar por WhatsApp",
      codeAccessMessage: "¡Hola Jaelson! Vi tu portafolio y me gustaría solicitar acceso al repositorio privado del proyecto {{projectName}}. Demo: {{projectUrl}}. ¡Gracias!",
      messageCopied: "Mensaje copiado — pégalo en LinkedIn (Ctrl+V / Cmd+V)",
      closeModal: "Cerrar",
      prev: "Proyecto anterior",
      next: "Próximo proyecto",
      filters: { all: "Todos", frontend: "Frontend", backend: "Backend", uxui: "UX/UI" },
      items: {
        crmd2d: { title: "CRM D2D Portugal", description: "CRM personal para organización de rutas comerciales, gestión de clientes y mejora de ventas puerta a puerta." },
        saasude: { title: "SaaSude", description: "SaaS para clínicas de estética con gestión multi-usuario y operación real." },
        teglion: { title: "Teglion", description: "SaaS para despachos contables enfocado en gestión financiera." },
        futureClinic: { title: "Future Clinic", description: "Landing page para clínicas enfocada en conversión y confianza." },
        luxxEstetica: { title: "Luxx Estética", description: "Página para clínica de estética con agendamiento y presencia digital profesional." },
        imigran: { title: "Imigran Construtora", description: "Sitio institucional con estructura clara y objetiva." },
        clubFlix: { title: "Club Flix", description: "Interfaz de streaming enfocada en experiencia de usuario." },
        ideaServi: { title: "IdeaServi", description: "Flujo de solicitud de servicios enfocado en producto digital." },
        codeRockers: { title: "The Code Rockers", description: "Proyecto académico Master D con páginas semánticas y accesibles." },
        bijusMaya: { title: "Bijus da Maya", description: "Landing artesanal para promoción y pedidos online." },
        todoMasterD: { title: "ToDoList Master D", description: "To-do list con localStorage, historial y validación de formularios." }
      }
    },
    testimonials: {
      title: "Feedback de clientes y socios",
      items: [
        { quote: "Jaelson entregó un sitio por encima de lo esperado, con comunicación clara y mucho compromiso.", name: "Pedro Vinicius", role: "Gestor Comercial" },
        { quote: "Mejoramos la presentación de la empresa y recibimos más contactos desde el sitio.", name: "João Oliveira", role: "Empresario" },
        { quote: "Excelente organización y cuidado con los detalles de UX. Lo recomiendo con confianza.", name: "Ana Costa", role: "Coordinadora de Proyectos" }
      ]
    },
    contact: {
      title: "Hablemos de tu proyecto",
      subtitle: "Envía tus datos en el formulario. Respondo con propuesta y próximos pasos.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      whatsappText: "¡Hola! Vine de tu portafolio y me gustaría saber más sobre cómo puedes ayudar.",
      formError: "Completa correctamente nombre, email y mensaje.",
      formSending: "Enviando mensaje...",
      formSuccess: "Mensaje enviado con éxito. Gracias por contactar.",
      formFail: "No fue posible enviar ahora. Inténtalo de nuevo en un momento.",
      rights: "Todos los derechos reservados."
    },
    openMenu: "Abrir menú"
  }
};

function getStoredLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

function t(lang, key) {
  return getNestedValue(translations[lang], key) ?? getNestedValue(translations[DEFAULT_LANGUAGE], key) ?? key;
}

function applyTranslations(lang) {
  document.documentElement.lang = lang === "pt" ? "pt-PT" : lang === "es" ? "es-ES" : "en";

  document.title = t(lang, "meta.title");
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t(lang, "meta.description");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = t(lang, key);
    if (Array.isArray(value)) return;
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(lang, el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(lang, el.dataset.i18nAria));
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  localStorage.setItem(STORAGE_KEY, lang);
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

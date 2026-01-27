// Serviço de email usando Brevo (mais simples que SMTP).
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

// Lê variáveis do .env para não deixar dados sensíveis no código.
const getBrevoConfig = () => {
  const { BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME, BREVO_TO_EMAIL } = process.env;

  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !BREVO_TO_EMAIL) {
    return null;
  }

  return {
    apiKey: BREVO_API_KEY,
    senderEmail: BREVO_SENDER_EMAIL,
    senderName: BREVO_SENDER_NAME || 'Portfolio Jaelson Santos',
    toEmail: BREVO_TO_EMAIL
  };
};

// Envia o email com os dados do formulário.
const sendContactEmail = async ({ name, email, subject, message }) => {
  const config = getBrevoConfig();

  // Se faltar config, aviso o backend para responder com erro.
  if (!config) {
    return { sent: false, reason: 'Brevo não configurado.' };
  }

  // Payload simples para evitar campos desnecessários.
  const payload = {
    sender: {
      email: config.senderEmail,
      name: config.senderName
    },
    to: [{ email: config.toEmail }],
    replyTo: {
      email,
      name
    },
    subject: subject || 'Contato do Portfolio',
    textContent: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
  };

  // Fetch nativo para manter o backend leve.
  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': config.apiKey
    },
    body: JSON.stringify(payload)
  });

  // Se o Brevo falhar, mostro o erro para debug no log.
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo error: ${response.status} ${errorBody}`);
  }

  return { sent: true };
};

// Envia um email de resposta automática para quem preencheu o formulário.
const sendAutoReply = async ({ name, email }) => {
  const config = getBrevoConfig();

  if (!config) {
    return { sent: false, reason: 'Brevo não configurado.' };
  }

  const portfolioUrl = process.env.PORTFOLIO_URL || 'https://portfolio-santos.vercel.app';
  const githubUrl = process.env.GITHUB_URL || 'https://github.com/JaelsonS';
  const linkedinUrl = process.env.LINKEDIN_URL || 'https://www.linkedin.com/in/jaelson-santos-8628b52a4/';
  const whatsappUrl = process.env.WHATSAPP_URL || 'https://wa.me/351916447990';

  const payload = {
    sender: {
      email: config.senderEmail,
      name: config.senderName
    },
    to: [{ email }],
    subject: 'Obrigado pelo contato! 🙌',
    textContent:
      `Olá ${name || 'tudo bem'}!\n\n` +
      'Obrigado por entrar em contato pelo meu portfolio. Vou responder o mais rápido possível.\n\n' +
      'Enquanto isso, deixo meus links diretos abaixo:\n' +
      `WhatsApp: ${whatsappUrl}\n` +
      `LinkedIn: ${linkedinUrl}\n` +
      `GitHub: ${githubUrl}\n` +
      `Portfolio: ${portfolioUrl}\n\n` +
      'Abraço,\nJaelson Santos'
  };

  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': config.apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo error (auto-reply): ${response.status} ${errorBody}`);
  }

  return { sent: true };
};

module.exports = { sendContactEmail, sendAutoReply };

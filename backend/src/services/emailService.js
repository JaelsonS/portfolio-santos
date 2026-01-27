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

module.exports = { sendContactEmail };

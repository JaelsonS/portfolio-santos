const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const getBrevoConfig = () => {
  // Brevo evita configurar SMTP no Render e simplifica o deploy.
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

const sendContactEmail = async ({ name, email, subject, message }) => {
  const config = getBrevoConfig();

  if (!config) {
    return { sent: false, reason: 'Brevo não configurado.' };
  }

  // Payload direto para reduzir risco de erros e manter suporte fácil.
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

  // Fetch nativo mantém dependências menores e o bundle do backend simples.
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
    throw new Error(`Brevo error: ${response.status} ${errorBody}`);
  }

  return { sent: true };
};

module.exports = { sendContactEmail };

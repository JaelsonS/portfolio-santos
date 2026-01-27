// Rotas do formulário de contato.
const express = require('express');
const { validateContact } = require('../middleware/validateContact');
const { sendContactEmail, sendAutoReply } = require('../services/emailService');

const router = express.Router();

// Recebe o formulário, valida e envia email.
router.post('/', validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Envio direto porque o volume é pequeno e fica mais simples.
    const emailResult = await sendContactEmail({ name, email, subject, message });

    // Se o Brevo não estiver configurado, aviso o frontend.
    if (!emailResult.sent) {
      const missing = emailResult.missing || [];
      return res.status(500).json({
        success: false,
        message: missing.length
          ? 'Configuração do envio incompleta no servidor.'
          : 'Envio não configurado. Tente novamente mais tarde.',
        errors: missing.map((name) => ({
          field: name,
          message: `Variável ${name} não configurada.`
        }))
      });
    }

    // Resposta automática para confirmar que o contato foi recebido.
    const autoReplyResult = await sendAutoReply({ name, email });

    return res.status(200).json({
      success: true,
      email: emailResult,
      autoReply: autoReplyResult
    });
  } catch (error) {
    // Se der erro, devolvo mensagem genérica para o usuário.
    console.error('Erro ao enviar contato:', error);
    return res.status(500).json({
      success: false,
      message: 'Falha ao enviar. Verifique a configuração e tente novamente.',
      errors: [{
        field: 'brevo',
        message: error?.message || 'Erro desconhecido no serviço de email.'
      }]
    });
  }
});

module.exports = router;

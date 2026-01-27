const express = require('express');
const { validateContact } = require('../middleware/validateContact');
const { sendContactEmail } = require('../services/emailService');

const router = express.Router();

router.post('/', validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Envio síncrono para manter fluxo simples enquanto o volume é baixo.
    const emailResult = await sendContactEmail({ name, email, subject, message });

    if (!emailResult.sent) {
      return res.status(500).json({
        success: false,
        message: 'Envio não configurado. Configure o Brevo antes de usar.'
      });
    }

    return res.status(200).json({
      success: true,
      email: emailResult
    });
  } catch (error) {
    console.error('Erro ao enviar contato:', error);
    return res.status(500).json({
      success: false,
      message: 'Não foi possível enviar sua mensagem. Tente novamente.'
    });
  }
});

module.exports = router;

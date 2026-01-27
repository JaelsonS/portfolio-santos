// Regex simples para validar email sem complicar.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validação básica para não enviar dados vazios.
const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body || {};
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Informe um nome válido.' });
  }

  if (!email || !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Informe um email válido.' });
  }

  if (subject && subject.trim().length > 120) {
    errors.push({ field: 'subject', message: 'Assunto muito longo.' });
  }

  if (!message || message.trim().length < 10) {
    errors.push({ field: 'message', message: 'A mensagem deve ter pelo menos 10 caracteres.' });
  }

  // Se tiver erro, devolvo lista para o frontend mostrar.
  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos. Verifique os campos e tente novamente.',
      errors
    });
  }

  return next();
};

module.exports = { validateContact };

// Servidor simples para receber o contato do portfolio.
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contact');

// Carrega variáveis do .env para não deixar dados no código.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Lista de frontends permitidos (Vercel e local).
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Helmet dá um nível básico de segurança nos headers.
app.use(helmet());
// CORS claro para o navegador aceitar o frontend.
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true
  })
);
// Aceita JSON pequeno para evitar payload grande por engano.
app.use(express.json({ limit: '1mb' }));

// Rate limit simples para evitar spam no formulário.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Healthcheck simples para o Render.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rota principal do formulário.
app.use('/api/contact', contactRoutes);

// Erro genérico para não quebrar o backend.
app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno no servidor. Tente novamente mais tarde.'
  });
});

// Inicia o servidor.
app.listen(PORT, () => {
  console.log(`Servidor ativo em http://localhost:${PORT}`);
});

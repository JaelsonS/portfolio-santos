import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Permitir que frontend se conecte
app.use(cors());

// Entender JSON no corpo das requisições
app.use(express.json());

// Rota 1: Página inicial da API
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Backend do Portfolio Santos Tech',
    status: 'online',
    version: '1.0.0',
    author: 'Jaelson Santos'
  });
});

// Rota 2: Verificar saúde da API
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'portfolio-backend'
  });
});

// Rota 3: Receber contatos (SIMULADO por enquanto)
app.post('/api/contact', (req, res) => {
  console.log('📨 Dados recebidos:', req.body);
  
  const { name, email, message } = req.body;
  
  // Validar dados
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Por favor, preencha todos os campos'
    });
  }
  
  // Simular processamento
  console.log(`📝 Contato de: ${name} (${email})`);
  console.log(`💬 Mensagem: ${message}`);
  
  // Responder com sucesso
  res.json({
    success: true,
    message: 'Mensagem recebida com sucesso! (Modo teste)',
    receivedData: {
      name,
      email,
      message,
      receivedAt: new Date().toISOString()
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('✅ BACKEND INICIADO COM SUCESSO!');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log('📨 Rota de contato: POST http://localhost:${PORT}/api/contact');
  console.log('='.repeat(50));
});
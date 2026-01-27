# Portfolio — Jaelson Santos

Portfolio pessoal moderno, responsivo e acessível, focado em candidaturas a estágio ou vaga júnior fullstack. O projeto foi organizado para crescimento e inclui backend funcional para envio de contato por email. Links diretos (WhatsApp, LinkedIn, GitHub) são intencionais para manter clareza e simplicidade no contacto.

## Objetivo

Apresentar um perfil profissional com foco em clareza, legibilidade, performance e experiência do recrutador, demonstrando domínio de frontend e backend.

## Stack

**Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5

**Backend**
- Node.js + Express
- Brevo API (email)

## Estrutura do projeto

portfolio-santos/
├── frontend/
│   ├── index.html
│   ├── styles/              # Bundle principal de estilos (importa os CSS legados)
│   │   └── main.css
│   ├── style/               # Estilos atuais (legado)
│   ├── js/
│   │   ├── main.js
│   │   ├── animations.js
│   │   └── form-handler.js
│   └── assets/
│       ├── images/
│       └── icons/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   └── contact.js
│   │   ├── middleware/
│   │   │   └── validateContact.js
│   │   └── services/
│   │       └── emailService.js
│   ├── package.json
│   └── .env.example
└── README.md
```

> Nota: o arquivo frontend/styles/main.css importa os estilos existentes em frontend/style para manter compatibilidade sem reescrever toda a base.

## Como rodar localmente

### 1) Frontend
Abra o arquivo frontend/index.html com Live Server ou outro servidor estático.

Se o backend estiver em outra URL, atualize o atributo data-api-base no body:

```
<body data-api-base="http://localhost:3001">
```

### 2) Backend

1. Entre na pasta backend
2. Instale dependências
3. Crie o .env baseado no .env.example
4. Inicie o servidor

> Nota: o backend assume Node.js 18+ por causa do fetch nativo.

## Variáveis de ambiente

Arquivo: backend/.env

```
PORT=3001
CORS_ORIGIN=http://localhost:5500,http://127.0.0.1:5500,https://seu-portfolio.vercel.app

BREVO_API_KEY=seu_token_brevo
BREVO_SENDER_EMAIL=seu_email@dominio.com
BREVO_SENDER_NAME=Portfolio Jaelson Santos
BREVO_TO_EMAIL=jaelsonsilva345@gmail.com
```

## Como funciona o envio de email

- O endpoint POST /api/contact valida os dados e envia email via Brevo API.
- Se o Brevo não estiver configurado, o endpoint retorna erro com instruções.

## Contato direto via redes

- WhatsApp, LinkedIn e GitHub são links diretos, sem integração de API.
- Decisão intencional para reduzir complexidade e deixar o portfolio mais claro para o recrutador.

## API

### POST /api/contact

Payload:

```
{
	"name": "Seu Nome",
	"email": "email@dominio.com",
	"subject": "Assunto (opcional)",
	"message": "Sua mensagem"
}
```

Resposta de sucesso:

```
{
	"success": true,
	"email": { "sent": true }
}
```

## Deploy

**Frontend**: Vercel.

**Backend**: Render.

Após o deploy do backend, atualize data-api-base para a URL do servidor e ajuste CORS_ORIGIN no .env.

## Decisões técnicas

- Uso de Express com validação simples para manter o backend leve e fácil de escalar.
- Brevo API para email evita configuração de SMTP no Render e simplifica o deploy.
- Links diretos nas redes reduzem manutenção e mantêm o foco na mensagem.
- Separação de serviços/rotas facilita evolução sem reescrever o frontend.

## Próximos passos sugeridos

- Adicionar mais projetos e casos de estudo.
- Criar testes básicos para validação do endpoint.
- Separar componentes HTML caso migre para um framework (React/Next.js).


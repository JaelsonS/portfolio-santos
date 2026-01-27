# Portfolio — Jaelson Santos

Este é o meu portfolio pessoal. Ele é simples, direto e pensado para recrutadores. Organizei o projeto em frontend e backend para ficar mais claro e fácil de manter.

## O que eu quis mostrar aqui

- Um layout moderno, responsivo e acessível.
- Um formulário funcional para contato.
- Links diretos para WhatsApp, LinkedIn e GitHub.

## Stack que usei

**Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5

**Backend**
- Node.js + Express
- Brevo API para enviar email

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

## Como rodar localmente

### Frontend
- Abra frontend/index.html com Live Server (ou outro servidor estático).
- Em produção, o frontend usa o Render no atributo data-api-base.
- Para testar localmente, troque para http://localhost:3001.

```
<body data-api-base="https://portfolio-santos.onrender.com">
```

### Backend
1. Entre na pasta backend
2. Instale dependências
3. Crie o .env baseado no .env.example
4. Inicie o servidor

> Nota: uso Node.js 18+ por causa do fetch nativo.

## Variáveis de ambiente

Arquivo: backend/.env

```
PORT=3001
CORS_ORIGIN=http://localhost:5500,http://127.0.0.1:5500,https://seu-portfolio.vercel.app

BREVO_API_KEY=seu_token_brevo
BREVO_SENDER_EMAIL=seu_email@dominio.com
BREVO_SENDER_NAME=Portfolio Jaelson Santos
BREVO_TO_EMAIL=jaelsonsilva345@gmail.com

PORTFOLIO_URL=https://portfolio-santos.vercel.app
GITHUB_URL=https://github.com/JaelsonS
LINKEDIN_URL=https://www.linkedin.com/in/jaelson-santos-8628b52a4/
WHATSAPP_URL=https://wa.me/351916447990
```

## Como funciona o envio de email

- O formulário chama o backend (Render) em /api/contact.
- O backend valida os dados e envia o email pela Brevo API.
- Depois disso, a pessoa recebe um email automático de confirmação com meus links.

## Como testar a integração

**Local**
- Frontend com Live Server.
- Backend rodando em http://localhost:3001.
- No HTML, use data-api-base apontando para localhost.

**Produção**
- Frontend no Vercel: https://portfolio-santos.vercel.app/
- Backend no Render: https://portfolio-santos.onrender.com
- O formulário deve enviar e o Brevo entregar o email.

## Por que links diretos nas redes

Eu preferi links diretos (WhatsApp, LinkedIn e GitHub) porque isso deixa o contato mais simples e rápido. Também evita manutenção extra no backend e deixa o portfolio mais claro para o recrutador.

## API

### POST /api/contact

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
  "email": { "sent": true },
  "autoReply": { "sent": true }
}
```

## Deploy

- **Frontend**: Vercel
- **Backend**: Render

Depois do deploy, atualize o data-api-base no HTML e o CORS_ORIGIN no .env.

## Decisões que tomei

- Brevo para email: evita configurar SMTP no Render.
- Links diretos nas redes: menos complexidade e mais clareza.
- Frontend e backend separados: organização simples e fácil de crescer.

## Próximos passos

- Adicionar mais cases e projetos.
- Criar testes básicos do endpoint.
- Migrar para React/Next.js quando fizer sentido.


# Jaelson Santos — Personal Portfolio

A multilingual personal portfolio built to connect with recruiters, clients, and collaborators. The site is a lightweight static landing page focused on clarity, accessibility, real project outcomes, and a professional developer profile.

**Live demo:** [portfolio-santos.vercel.app](https://portfolio-santos.vercel.app/)

---

## Overview

This portfolio presents Jaelson Santos as a Full Stack Developer based in Coimbra, Portugal, with a strong background in B2B sales and ongoing training in cybersecurity and Python. It highlights SaaS products, CRM tools, landing pages, and digital platforms with live demos and transparent repository visibility.

### Key features

- Responsive, modern UI with smooth scroll navigation
- **Multilingual support** — Portuguese, English, and Spanish (language preference saved in the browser)
- Project showcase with category filters and carousel layout
- **Repository visibility tags** — each project is labeled as public or private
- Skills, education, and certifications sections
- Cybersecurity ebook published on Hotmart
- Downloadable CV in PDF
- Contact form with client-side validation and Formspree integration
- Private repository access requests via LinkedIn or WhatsApp

---

## Tech stack

| Layer | Technologies |
|-------|--------------|
| Markup & styling | HTML5, CSS3, Bootstrap 5 |
| Logic | JavaScript (ES6+) |
| Icons & fonts | Font Awesome, Google Fonts (Manrope, Sora) |
| Internationalization | Custom `i18n.js` module (PT / EN / ES) |
| Contact | [Formspree](https://formspree.io/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Project structure

```
portfolio-santos/
├── index.html          # Main page and sections
├── styles.css          # Custom styles and components
├── main.js             # Projects, carousel, modal, form logic
├── i18n.js             # Translations and language switcher
├── assets/
│   ├── images/         # Project thumbnails, profile, branding
│   └── docs/
│       └── JaelsonSantos_CV_Fullstack.pdf
└── README.md
```

---

## Getting started

### Prerequisites

- A modern web browser
- Optional: a local static file server (recommended for testing)

### Run locally

1. Clone the repository.
2. Serve the project folder with any static server, or open `index.html` with Live Server.

```bash
git clone https://github.com/JaelsonS/portfolio-santos.git
cd portfolio-santos
python3 -m http.server 8080
```

3. Open `http://localhost:8080` in your browser.

No backend is required. The contact form submits directly to Formspree.

---

## Featured projects

Each project card includes:

- **View site** — opens the live demo
- **View code** — opens the public GitHub repository, or a modal to request access for private repos
- **Visibility tag** — `Public repository` or `Private repository`

| Project | Live demo | GitHub |
|---------|-----------|--------|
| **CRM D2D Portugal** | [Demo](https://crmd2d.vercel.app/login) | Private — request access |
| SaaSude | [saasude.com](https://saasude.com) | Private — request access |
| Teglion | [teglion.com](https://www.teglion.com) | Private — request access |
| Future Clinic | [Demo](https://future-taupe-nine.vercel.app/) | [Public](https://github.com/JaelsonS/Future) |
| Luxx Estética | [Demo](https://saude-com-amor.vercel.app/) | Private — request access |
| Imigran Construtora | [Demo](https://imigran-construtora.vercel.app/) | Private — request access |
| Club Flix | [Demo](https://club-flix.vercel.app/) | [Public](https://github.com/JaelsonS/club-flix) |
| IdeaServi | [ideaservi.com](https://ideaservi.com) | Private — request access |
| The Code Rockers | [Demo](https://the-code-rockers-website.vercel.app/) | [Public](https://github.com/JaelsonS/the-code-rockers-website) |
| Bijus da Maya | [Demo](https://bijusda-maya.vercel.app/) | [Public](https://github.com/JaelsonS/BijusdaMaya) |
| ToDoList Master D | [Demo](https://exc-to-do-list-master-d.vercel.app/) | [Public](https://github.com/JaelsonS/excToDoListMasterD) |

### Private repositories

For projects marked as **Private repository**, clicking **View code** opens a modal with two contact options:

- **LinkedIn** — opens a compose window with a pre-filled professional message (copied to clipboard)
- **WhatsApp** — opens a chat at **+351 916 447 990** with a pre-filled message

### Public repositories

For projects marked as **Public repository**, **View code** links directly to the GitHub repository.

---

## Education & publications

| Status | Item |
|--------|------|
| In progress | Full Stack Developer — Master D, Coimbra |
| In progress | Google Cybersecurity Certificate — Google / Coursera |
| In progress | Python & Web Development — freeCodeCamp |
| Completed | Bachelor in Accounting Sciences — Cruzeiro do Sul |
| Published | [Connect and Protect: Networks and Network Security](https://hotmart.com/pt-br/marketplace/produtos/conectar-e-proteger-redes-e-seguranca-de-redes/P106151051D) (Hotmart) |

---

## Contact form

The contact form is integrated with Formspree:

- **Endpoint:** `https://formspree.io/f/xzdapvgl`
- **Configuration:** `main.js`

For local or staging tests, authorize your domain in the Formspree dashboard if submissions are blocked.

---

## Contact

| Channel | Link |
|---------|------|
| Portfolio | [portfolio-santos.vercel.app](https://portfolio-santos.vercel.app/) |
| LinkedIn | [linkedin.com/in/jaelson-santos-8628b52a4](https://www.linkedin.com/in/jaelson-santos-8628b52a4/) |
| GitHub | [github.com/JaelsonS](https://github.com/JaelsonS) |
| Email | jaelsonsilva345@gmail.com |
| WhatsApp | +351 916 447 990 |

---

## License

Personal project — © Jaelson Santos. All rights reserved.

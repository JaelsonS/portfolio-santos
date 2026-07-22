const CV_PATH = "assets/docs/JaelsonSantos_CV_Fullstack.pdf";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdapvgl";
const LINKEDIN_RECIPIENT = "jaelson-santos-8628b52a4";
const LINKEDIN_COMPOSE_URL = `https://www.linkedin.com/messaging/compose/?recipient=${LINKEDIN_RECIPIENT}`;
const WHATSAPP_PHONE = "351916447990";

const projects = [
  {
    id: "agendaPro",
    tier: "featured",
    status: "live",
    live: "https://service-scheduler-puce.vercel.app",
    code: "https://github.com/JaelsonS/service-scheduler",
    api: "https://service-scheduler-l3g7.onrender.com/actuator/health",
    stack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "JWT", "Flyway", "Docker"]
  },
  {
    id: "teglion",
    tier: "featured",
    status: "pilot",
    live: "https://www.teglion.com",
    stack: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Stripe", "Brevo"]
  },
  {
    id: "afdigital",
    tier: "featured",
    status: "early",
    live: "https://afdigitalweb.com",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Zustand", "Supabase"]
  },
  {
    id: "saasude",
    tier: "standby",
    status: "standby",
    live: "https://saasude.com",
    stack: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: "crmd2d",
    tier: "standby",
    status: "standby",
    live: "https://crmd2d.vercel.app/login",
    stack: ["React", "Supabase", "Tailwind"]
  },
  {
    id: "luxxEstetica",
    tier: "other",
    live: "https://saude-com-amor.vercel.app/",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript"]
  },
  {
    id: "imigran",
    tier: "other",
    live: "https://imigran-construtora.vercel.app/",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "codeRockers",
    tier: "other",
    live: "https://the-code-rockers-website.vercel.app/",
    code: "https://github.com/JaelsonS/the-code-rockers-website",
    stack: ["HTML", "CSS", "Bootstrap"]
  },
  {
    id: "lojaMasterD",
    tier: "other",
    live: "https://lojaonlinemasterd.vercel.app",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "todoMasterD",
    tier: "other",
    live: "https://exc-to-do-list-master-d.vercel.app/",
    code: "https://github.com/JaelsonS/excToDoListMasterD",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"]
  }
];

let currentLang = "pt";
let selectedProjectId = null;
let codeAccessFeedbackTimeoutId = null;
let lastFocusedBeforeModal = null;

const ICONS = {
  external:
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 5h5v5"/><path d="M10 14 19 5"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>',
  github:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.367 6.839 9.722.5.094.682-.222.682-.482 0-.237-.009-.866-.014-1.7-2.782.618-3.369-1.38-3.369-1.38-.454-1.18-1.11-1.495-1.11-1.495-.908-.636.069-.623.069-.623 1.004.072 1.532 1.06 1.532 1.06.892 1.57 2.341 1.116 2.91.854.091-.662.35-1.116.636-1.372-2.22-.259-4.555-1.14-4.555-5.077 0-1.122.39-2.04 1.029-2.76-.103-.253-.446-1.27.098-2.647 0 0 .84-.276 2.75 1.055A9.3 9.3 0 0 1 12 6.9c.85.004 1.705.118 2.504.346 1.909-1.331 2.747-1.055 2.747-1.055.546 1.377.203 2.394.1 2.647.64.72 1.028 1.638 1.028 2.76 0 3.948-2.338 4.815-4.566 5.07.359.317.679.943.679 1.902 0 1.372-.012 2.477-.012 2.813 0 .263.18.58.688.481C19.138 20.617 22 16.78 22 12.253 22 6.586 17.523 2 12 2z"/></svg>',
  code:
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  lock:
    '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  unlock:
    '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/></svg>',
  activity:
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  download:
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  arrowDown:
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
  send:
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  linkedin:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.125 2.062 2.062 0 0 1 .004 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  whatsapp:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
  folder:
    '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'
};

function icon(name) {
  return ICONS[name] || "";
}

function getLang() {
  return window.I18n?.getStoredLanguage?.() ?? "pt";
}

function translate(key) {
  return window.I18n?.t?.(currentLang, key) ?? key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function labelWithIcon(iconName, label) {
  return `${icon(iconName)}<span>${escapeHtml(label)}</span>`;
}

function getProjectContent(project) {
  return translate(`projects.items.${project.id}`);
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function findProject(projectId) {
  return projects.find((project) => project.id === projectId);
}

function getCodeAccessMessage(projectId) {
  const project = findProject(projectId);
  if (!project) return "";

  const content = getProjectContent(project);
  return translate("projects.codeAccessMessage")
    .replace("{{projectName}}", content.title)
    .replace("{{projectUrl}}", project.live);
}

function getRepositoryBadge(project) {
  const isPublic = Boolean(project.code);
  const badgeClass = isPublic ? "badge-repo--public" : "badge-repo--private";
  const label = translate(isPublic ? "projects.repoPublic" : "projects.repoPrivate");
  return `<span class="badge ${badgeClass}">${icon(isPublic ? "unlock" : "lock")}<span>${escapeHtml(label)}</span></span>`;
}

function getStatusBadge(status) {
  if (!status) return "";
  const label = translate(`projects.status.${status}`);
  return `<span class="badge badge-status badge-status--${escapeHtml(status)}"><span class="status-dot" aria-hidden="true"></span><span>${escapeHtml(label)}</span></span>`;
}

function getLiveButton(project, sizeClass = "btn-sm") {
  return `<a class="btn btn-primary ${sizeClass}" target="_blank" rel="noopener noreferrer" href="${escapeHtml(project.live)}">${labelWithIcon("external", translate("projects.viewSite"))}</a>`;
}

function getCodeButton(project, sizeClass = "btn-sm") {
  const label = labelWithIcon(project.code ? "github" : "code", translate("projects.viewCode"));

  if (project.code) {
    return `<a class="btn btn-outline ${sizeClass}" target="_blank" rel="noopener noreferrer" href="${escapeHtml(project.code)}">${label}</a>`;
  }

  return `<button type="button" class="btn btn-outline ${sizeClass} js-view-code" data-project-id="${escapeHtml(project.id)}">${label}</button>`;
}

function getApiButton(project, sizeClass = "btn-sm") {
  if (!project.api) return "";
  return `<a class="btn btn-outline ${sizeClass}" target="_blank" rel="noopener noreferrer" href="${escapeHtml(project.api)}">${labelWithIcon("activity", translate("projects.viewApi"))}</a>`;
}

function stackTags(stack = []) {
  if (!stack.length) return "";
  return `<ul class="stack-tags">${stack.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function featuredCardTemplate(project) {
  const content = getProjectContent(project);
  const highlights = Array.isArray(content.highlights) ? content.highlights : [];

  return `
    <article class="featured-card">
      <div class="featured-top">
        ${getStatusBadge(project.status)}
        ${getRepositoryBadge(project)}
      </div>
      <h3>${escapeHtml(content.title)}</h3>
      <p class="project-problem">${escapeHtml(content.problem)}</p>
      <p class="project-solution">${escapeHtml(content.solution)}</p>
      <p class="project-note">${escapeHtml(content.note)}</p>
      <ul class="project-highlights">
        ${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      ${stackTags(project.stack)}
      <div class="project-actions">
        ${getLiveButton(project)}
        ${getCodeButton(project)}
        ${getApiButton(project)}
      </div>
    </article>
  `;
}

function standbyCardTemplate(project) {
  const content = getProjectContent(project);
  return `
    <article class="standby-card">
      <div class="featured-top">
        ${getStatusBadge(project.status)}
        ${getRepositoryBadge(project)}
      </div>
      <h3>${escapeHtml(content.title)}</h3>
      <p>${escapeHtml(content.description)}</p>
      ${stackTags(project.stack)}
      <div class="project-actions">
        ${getLiveButton(project)}
        ${getCodeButton(project)}
      </div>
    </article>
  `;
}

function otherRowTemplate(project) {
  const content = getProjectContent(project);
  return `
    <article class="other-row">
      <div class="other-meta">
        <h4>${icon("folder")}<span>${escapeHtml(content.title)}</span></h4>
        <p>${escapeHtml(content.description)}</p>
      </div>
      <div class="project-actions">
        ${getLiveButton(project)}
        ${project.code ? getCodeButton(project) : ""}
      </div>
    </article>
  `;
}

function renderFeaturedProjects() {
  const container = document.getElementById("featuredProjects");
  if (!container) return;
  container.innerHTML = projects
    .filter((project) => project.tier === "featured")
    .map(featuredCardTemplate)
    .join("");
}

function renderStandbyProjects() {
  const container = document.getElementById("standbyProjects");
  if (!container) return;
  container.innerHTML = projects
    .filter((project) => project.tier === "standby")
    .map(standbyCardTemplate)
    .join("");
}

function renderOtherProjects() {
  const container = document.getElementById("otherProjects");
  if (!container) return;
  container.innerHTML = projects
    .filter((project) => project.tier === "other")
    .map(otherRowTemplate)
    .join("");
}

function renderWorkPrinciples() {
  const list = document.getElementById("workPrinciples");
  if (!list) return;
  const items = translate("work.principles");
  if (!Array.isArray(items)) return;
  list.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderLookingList() {
  const list = document.getElementById("lookingList");
  if (!list) return;
  const items = translate("about.looking");
  if (!Array.isArray(items)) return;
  list.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderSkills() {
  const focusList = document.getElementById("focusSkillsList");
  const experienceList = document.getElementById("experienceSkillsList");
  if (!focusList || !experienceList) return;

  const focus = translate("stack.focus");
  const experience = translate("stack.experience");

  focusList.innerHTML = (Array.isArray(focus) ? focus : [])
    .map((skill) => `<li>${escapeHtml(skill)}</li>`)
    .join("");

  experienceList.innerHTML = (Array.isArray(experience) ? experience : [])
    .map((skill) => `<li>${escapeHtml(skill)}</li>`)
    .join("");
}

function renderEducation() {
  const container = document.getElementById("educationList");
  if (!container) return;

  const items = translate("education.items");
  if (!Array.isArray(items)) return;

  container.innerHTML = items
    .map(
      (item) => `
        <article class="education-card">
          <span class="education-status">${escapeHtml(item.status)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.org)}</p>
          <small>${escapeHtml(item.period)}</small>
        </article>
      `
    )
    .join("");
}

function updateWhatsAppLink() {
  const link = document.getElementById("whatsappLink");
  if (!link) return;
  link.href = buildWhatsAppUrl(translate("contact.whatsappText"));
}

function renderDynamicContent() {
  currentLang = getLang();
  renderFeaturedProjects();
  renderStandbyProjects();
  renderOtherProjects();
  renderWorkPrinciples();
  renderLookingList();
  renderSkills();
  renderEducation();
  updateWhatsAppLink();
  initCvLink();
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("menuPrincipal");
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", translate(open ? "closeMenu" : "openMenu"));
  };

  toggle.addEventListener("click", () => {
    setOpen(!panel.classList.contains("is-open"));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    const valid =
      form.checkValidity() &&
      nome.value.trim().length >= 2 &&
      mensagem.value.trim().length >= 10;

    if (!valid) {
      status.textContent = translate("contact.formError");
      return;
    }

    status.textContent = translate("contact.formSending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: nome.value.trim(),
          email: email.value.trim(),
          mensagem: mensagem.value.trim()
        })
      });

      if (!response.ok) throw new Error("send failed");

      status.textContent = translate("contact.formSuccess");
      form.reset();
    } catch {
      status.textContent = translate("contact.formFail");
    }
  });
}

function initCvLink() {
  const cvLink = document.getElementById("cvDownload");
  if (cvLink) cvLink.href = CV_PATH;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}

function showCodeAccessFeedback(message) {
  const feedback = document.getElementById("codeAccessFeedback");
  if (!feedback) return;

  feedback.textContent = message;
  window.clearTimeout(codeAccessFeedbackTimeoutId);
  codeAccessFeedbackTimeoutId = window.setTimeout(() => {
    feedback.textContent = "";
  }, 5000);
}

function getFocusableElements(container) {
  return [...container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')];
}

function closeCodeAccessModal() {
  const modal = document.getElementById("codeAccessModal");
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  document.body.style.overflow = "";
  selectedProjectId = null;
  showCodeAccessFeedback("");
  lastFocusedBeforeModal?.focus();
}

function updateCodeAccessModal() {
  if (!selectedProjectId) return;

  const project = findProject(selectedProjectId);
  if (!project) return;

  const content = getProjectContent(project);
  const message = getCodeAccessMessage(selectedProjectId);
  const title = document.getElementById("codeAccessModalTitle");
  const description = document.getElementById("codeAccessModalDesc");
  const projectName = document.getElementById("codeAccessProjectName");
  const linkedInBtn = document.getElementById("codeAccessLinkedIn");
  const whatsappBtn = document.getElementById("codeAccessWhatsApp");
  const closeBtn = document.querySelector("#codeAccessModal .modal-close");

  if (title) title.textContent = translate("projects.codeAccessModalTitle");
  if (description) description.textContent = translate("projects.codeAccessModalDesc");
  if (projectName) projectName.textContent = content.title;
  if (closeBtn) closeBtn.setAttribute("aria-label", translate("projects.closeModal"));

  if (linkedInBtn) {
    linkedInBtn.href = LINKEDIN_COMPOSE_URL;
    linkedInBtn.innerHTML = labelWithIcon("linkedin", translate("projects.requestCodeLinkedIn"));
  }

  if (whatsappBtn) {
    whatsappBtn.href = buildWhatsAppUrl(message);
    whatsappBtn.innerHTML = labelWithIcon("whatsapp", translate("projects.requestCodeWhatsApp"));
  }

  showCodeAccessFeedback("");
}

function openCodeAccessModal(projectId) {
  const modal = document.getElementById("codeAccessModal");
  if (!modal) return;

  lastFocusedBeforeModal = document.activeElement;
  selectedProjectId = projectId;
  updateCodeAccessModal();
  modal.hidden = false;
  document.body.style.overflow = "hidden";

  const focusables = getFocusableElements(modal);
  focusables[0]?.focus();
}

function initCodeAccessModal() {
  const modal = document.getElementById("codeAccessModal");
  if (!modal) return;

  document.addEventListener("click", async (event) => {
    const viewCodeBtn = event.target.closest(".js-view-code");
    if (viewCodeBtn) {
      openCodeAccessModal(viewCodeBtn.dataset.projectId);
      return;
    }

    if (event.target.closest("[data-close-modal]")) {
      closeCodeAccessModal();
      return;
    }

    if (!event.target.closest("#codeAccessLinkedIn") || !selectedProjectId) return;

    try {
      await copyToClipboard(getCodeAccessMessage(selectedProjectId));
      showCodeAccessFeedback(translate("projects.messageCopied"));
    } catch {
      showCodeAccessFeedback(translate("projects.messageCopied"));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeCodeAccessModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = getFocusableElements(modal);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  window.I18n.initI18n();
  initCvLink();
  renderDynamicContent();

  document.addEventListener("languageChanged", (event) => {
    currentLang = event.detail.lang;
    renderDynamicContent();
    if (selectedProjectId) updateCodeAccessModal();

    const toggle = document.getElementById("navToggle");
    const panel = document.getElementById("menuPrincipal");
    if (toggle && panel) {
      toggle.setAttribute(
        "aria-label",
        translate(panel.classList.contains("is-open") ? "closeMenu" : "openMenu")
      );
    }
  });

  initReveal();
  initMobileNav();
  initForm();
  initCodeAccessModal();
});

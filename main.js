const CV_PATH = "assets/docs/JaelsonSantos_CV_Fullstack.pdf";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdapvgl";
const EBOOK_URL = "https://hotmart.com/pt-br/marketplace/produtos/conectar-e-proteger-redes-e-seguranca-de-redes/P106151051D";
const LINKEDIN_RECIPIENT = "jaelson-santos-8628b52a4";
const LINKEDIN_COMPOSE_URL = `https://www.linkedin.com/messaging/compose/?recipient=${LINKEDIN_RECIPIENT}`;
const WHATSAPP_PHONE = "351916447990";

const projects = [
  {
    id: "crmd2d",
    category: "backend",
    image: "assets/images/computer-program-coding-screen.jpg",
    live: "https://crmd2d.vercel.app/login",
    featured: true
  },
  {
    id: "saasude",
    category: "backend",
    image: "assets/images/saasude.svg",
    live: "https://saasude.com"
  },
  {
    id: "teglion",
    category: "backend",
    image: "assets/images/working-code.jpg",
    live: "https://www.teglion.com"
  },
  {
    id: "futureClinic",
    category: "frontend",
    image: "assets/images/site1.jpg",
    live: "https://future-taupe-nine.vercel.app/",
    code: "https://github.com/JaelsonS/Future"
  },
  {
    id: "luxxEstetica",
    category: "frontend",
    image: "assets/images/clienteComputador.jpg",
    live: "https://saude-com-amor.vercel.app/"
  },
  {
    id: "imigran",
    category: "uxui",
    image: "assets/images/medium-shot-senior-man-indoors.jpg",
    live: "https://imigran-construtora.vercel.app/"
  },
  {
    id: "clubFlix",
    category: "frontend",
    image: "assets/images/programming-background-with-person-working-with-codes-computer.jpg",
    live: "https://club-flix.vercel.app/",
    code: "https://github.com/JaelsonS/club-flix"
  },
  {
    id: "ideaServi",
    category: "uxui",
    image: "assets/images/young-man-wearing-blue-outfit-doing-holding-gesture.jpg",
    live: "https://ideaservi.com"
  },
  {
    id: "codeRockers",
    category: "frontend",
    image: "assets/images/log0.png",
    live: "https://the-code-rockers-website.vercel.app/",
    code: "https://github.com/JaelsonS/the-code-rockers-website"
  },
  {
    id: "bijusMaya",
    category: "uxui",
    image: "assets/images/mulhercomputador.jpg",
    live: "https://bijusda-maya.vercel.app/",
    code: "https://github.com/JaelsonS/BijusdaMaya"
  },
  {
    id: "todoMasterD",
    category: "backend",
    image: "assets/images/computer-program-coding-screen.jpg",
    live: "https://exc-to-do-list-master-d.vercel.app/",
    code: "https://github.com/JaelsonS/excToDoListMasterD"
  }
];

let currentFilter = "all";
let currentLang = "pt";
let selectedProjectId = null;
let codeAccessModal = null;
let codeAccessFeedbackTimeoutId = null;

function getLang() {
  return window.I18n?.getStoredLanguage?.() ?? "pt";
}

function translate(key) {
  return window.I18n?.t?.(currentLang, key) ?? key;
}

function getProjectsPerSlide() {
  return window.matchMedia("(min-width: 992px)").matches ? 2 : 1;
}

function getCategoryLabel(category) {
  return translate(`projects.filters.${category}`);
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

function getCodeButton(project) {
  if (project.code) {
    return `<a class="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer" href="${project.code}">${translate("projects.viewCode")}</a>`;
  }

  return `<button type="button" class="btn btn-outline-success btn-sm js-view-code" data-project-id="${project.id}">${translate("projects.viewCode")}</button>`;
}

function getRepositoryBadge(project) {
  const isPublic = Boolean(project.code);
  const badgeClass = isPublic ? "badge-repo--public" : "badge-repo--private";
  const label = translate(isPublic ? "projects.repoPublic" : "projects.repoPrivate");

  return `<span class="badge-repo ${badgeClass}">${label}</span>`;
}

function projectCardTemplate(project) {
  const content = getProjectContent(project);
  const categoryLabel = getCategoryLabel(project.category);
  const codeButton = getCodeButton(project);
  const repositoryBadge = getRepositoryBadge(project);

  return `
    <article class="project-slide${project.featured ? " project-slide--featured" : ""}">
      <div>
        <img src="${project.image}" alt="${content.title}" class="project-media" loading="lazy" decoding="async">
        <div class="project-badges">
          <span class="badge-category">${categoryLabel}</span>
          ${repositoryBadge}
        </div>
        <h3 class="h4 mt-2">${content.title}</h3>
        <p class="mb-0">${content.description}</p>
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <a class="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer" href="${project.live}">${translate("projects.viewSite")}</a>
        ${codeButton}
      </div>
    </article>
  `;
}

function projectSlideTemplate(projectsGroup, isActive) {
  return `
    <article class="carousel-item ${isActive ? "active" : ""}">
      <div class="projects-slide-grid">
        ${projectsGroup
          .map(
            (project) => `
              <div class="project-slide-col">
                ${projectCardTemplate(project)}
              </div>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function chunkProjects(list, size) {
  const groups = [];
  for (let i = 0; i < list.length; i += size) {
    groups.push(list.slice(i, i + size));
  }
  return groups;
}

function renderProjects(filter = currentFilter) {
  currentFilter = filter;
  const inner = document.getElementById("projectsCarouselInner");
  if (!inner) return;

  const filtered = filter === "all" ? projects : projects.filter((project) => project.category === filter);
  const groupedProjects = chunkProjects(filtered, getProjectsPerSlide());

  inner.innerHTML = groupedProjects
    .map((projectsGroup, idx) => projectSlideTemplate(projectsGroup, idx === 0))
    .join("");

  const carouselEl = document.getElementById("carouselProjetos");
  if (carouselEl && window.bootstrap?.Carousel) {
    window.bootstrap.Carousel.getOrCreateInstance(carouselEl).to(0);
  }

  updateFilterLabel(filter);
}

function updateFilterLabel(filter) {
  const filterLabel = document.getElementById("filterLabel");
  if (filterLabel) {
    filterLabel.textContent = getCategoryLabel(filter === "all" ? "all" : filter);
  }
}

function renderSkills() {
  const techList = document.getElementById("techSkillsList");
  const softList = document.getElementById("softSkillsList");
  if (!techList || !softList) return;

  const techSkills = translate("skills.tech");
  const softSkills = translate("skills.soft");

  techList.innerHTML = (Array.isArray(techSkills) ? techSkills : [])
    .map((skill) => `<li>${skill}</li>`)
    .join("");

  softList.innerHTML = (Array.isArray(softSkills) ? softSkills : [])
    .map((skill) => `<li>${skill}</li>`)
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
          <span class="education-status">${item.status}</span>
          <h3 class="h6 mb-1">${item.title}</h3>
          <p class="mb-1 text-muted-custom">${item.org}</p>
          <small class="text-muted-custom">${item.period}</small>
        </article>
      `
    )
    .join("");
}

function renderLookingList() {
  const list = document.getElementById("lookingList");
  if (!list) return;

  const items = translate("about.looking");
  if (!Array.isArray(items)) return;

  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderTestimonials() {
  const inner = document.getElementById("testimonialsInner");
  if (!inner) return;

  const items = translate("testimonials.items");
  const photos = ["assets/images/cliente1.jpg", "assets/images/cliente2.jpg", "assets/images/cliente3.jpg"];

  if (!Array.isArray(items)) return;

  inner.innerHTML = items
    .map(
      (item, index) => `
        <div class="carousel-item${index === 0 ? " active" : ""}">
          <article class="testimonial-card">
            <img src="${photos[index]}" class="testimonial-photo" alt="${item.name}" loading="lazy" decoding="async">
            <p>"${item.quote}"</p>
            <h3 class="h6 mb-0">${item.name}</h3>
            <small>${item.role}</small>
          </article>
        </div>
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
  renderLookingList();
  renderSkills();
  renderEducation();
  renderTestimonials();
  renderProjects(currentFilter);
  updateWhatsAppLink();

  const prevBtn = document.querySelector("#carouselProjetos .carousel-control-prev");
  const nextBtn = document.querySelector("#carouselProjetos .carousel-control-next");
  if (prevBtn) prevBtn.setAttribute("aria-label", translate("projects.prev"));
  if (nextBtn) nextBtn.setAttribute("aria-label", translate("projects.next"));
}

function initProjectsResponsiveRender() {
  let lastPerSlide = getProjectsPerSlide();
  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const nextPerSlide = getProjectsPerSlide();
      if (nextPerSlide !== lastPerSlide) {
        lastPerSlide = nextPerSlide;
        renderProjects(currentFilter);
      }
    }, 120);
  });
}

function initFilters() {
  document.querySelectorAll(".filter-option").forEach((option) => {
    option.addEventListener("click", () => {
      renderProjects(option.dataset.filter || "all");
    });
  });
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

function initMobileMenuClose() {
  const menu = document.getElementById("menuPrincipal");
  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (!menu?.classList.contains("show") || !window.bootstrap?.Collapse) return;
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
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
    const valid = form.checkValidity() && nome.value.trim().length >= 2 && mensagem.value.trim().length >= 10;

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

function initEbookLink() {
  const ebookLink = document.getElementById("ebookLink");
  if (ebookLink) ebookLink.href = EBOOK_URL;
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
  const closeBtn = document.querySelector("#codeAccessModal .btn-close");

  if (title) title.textContent = translate("projects.codeAccessModalTitle");
  if (description) description.textContent = translate("projects.codeAccessModalDesc");
  if (projectName) projectName.textContent = content.title;
  if (closeBtn) closeBtn.setAttribute("aria-label", translate("projects.closeModal"));

  if (linkedInBtn) {
    linkedInBtn.href = LINKEDIN_COMPOSE_URL;
    linkedInBtn.innerHTML = `<i class="fa-brands fa-linkedin me-1" aria-hidden="true"></i>${translate("projects.requestCodeLinkedIn")}`;
  }

  if (whatsappBtn) {
    whatsappBtn.href = buildWhatsAppUrl(message);
    whatsappBtn.innerHTML = `<i class="fa-brands fa-whatsapp me-1" aria-hidden="true"></i>${translate("projects.requestCodeWhatsApp")}`;
  }

  showCodeAccessFeedback("");
}

function openCodeAccessModal(projectId) {
  selectedProjectId = projectId;
  updateCodeAccessModal();
  codeAccessModal?.show();
}

function initCodeAccessModal() {
  const modalEl = document.getElementById("codeAccessModal");
  if (!modalEl || !window.bootstrap?.Modal) return;

  codeAccessModal = window.bootstrap.Modal.getOrCreateInstance(modalEl);

  document.addEventListener("click", async (event) => {
    const viewCodeBtn = event.target.closest(".js-view-code");
    if (viewCodeBtn) {
      openCodeAccessModal(viewCodeBtn.dataset.projectId);
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

  modalEl.addEventListener("hidden.bs.modal", () => {
    selectedProjectId = null;
    showCodeAccessFeedback("");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  window.I18n.initI18n();
  initCvLink();
  initEbookLink();
  renderDynamicContent();

  document.addEventListener("languageChanged", (event) => {
    currentLang = event.detail.lang;
    renderDynamicContent();
    if (selectedProjectId) updateCodeAccessModal();
  });

  initProjectsResponsiveRender();
  initFilters();
  initReveal();
  initMobileMenuClose();
  initForm();
  initCodeAccessModal();
});

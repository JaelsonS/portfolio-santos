const projects = [
  { title: "SaaSude", category: "backend", description: "SaaS para clínicas com gestão e operação real.", image: "assets/images/saasude.svg", live: "https://saasude.com", code: "https://github.com/JaelsonS/saaSude1.0" },
  { title: "Future Clinic", category: "frontend", description: "Landing para clínicas com foco em conversão.", image: "assets/images/site1.jpg", live: "https://future-taupe-nine.vercel.app/", code: "https://github.com/JaelsonS/Future" },
  { title: "Saúde com Amor", category: "frontend", description: "Página para clínica com agendamento e confiança.", image: "assets/images/clienteComputador.jpg", live: "https://saude-com-amor.vercel.app/", code: "https://github.com/JaelsonS/saudeComAmor" },
  { title: "Imigran Construtora", category: "uxui", description: "Site institucional com estrutura clara e objetiva.", image: "assets/images/medium-shot-senior-man-indoors.jpg", live: "https://imigran-construtora.vercel.app/", code: "https://github.com/JaelsonS/ImigranConstrutora" },
  { title: "Club Flix", category: "frontend", description: "Interface de streaming com foco em experiência.", image: "assets/images/programming-background-with-person-working-with-codes-computer.jpg", live: "https://club-flix.vercel.app/", code: "https://github.com/JaelsonS/ClubFlix" },
  { title: "IdeaServi", category: "uxui", description: "Fluxo de solicitação de serviços com foco em produto.", image: "assets/images/young-man-wearing-blue-outfit-doing-holding-gesture.jpg", live: "https://ideaservi.com", code: "https://github.com/JaelsonS/IdeaServi" },
  { title: "The Code Rockers", category: "frontend", description: "Projeto Master D com páginas semânticas.", image: "assets/images/log0.png", live: "https://the-code-rockers-website.vercel.app/", code: "https://github.com/JaelsonS/the-code-rockers-website" },
  { title: "Bijus da Maya", category: "uxui", description: "Landing artesanal para divulgação e encomendas.", image: "assets/images/mulhercomputador.jpg", live: "https://bijusda-maya.vercel.app/", code: "https://github.com/JaelsonS/BijusdaMaya" },
  { title: "ToDoList Master D", category: "backend", description: "To-do list com localStorage, histórico e validação.", image: "assets/images/computer-program-coding-screen.jpg", live: "https://exc-to-do-list-master-d.vercel.app/", code: "https://github.com/JaelsonS/excToDoListMasterD" }
];

const labels = {
  all: "Todos",
  frontend: "Frontend",
  backend: "Backend",
  uxui: "UX/UI"
};

function projectSlideTemplate(project, isActive) {
  return `
    <article class="carousel-item ${isActive ? "active" : ""}">
      <div class="project-slide">
        <div>
          <img src="${project.image}" alt="Imagem do projeto ${project.title}" class="project-media" loading="lazy" decoding="async">
          <span class="badge-category">${labels[project.category]}</span>
          <h3 class="h4 mt-2">${project.title}</h3>
          <p class="mb-0">${project.description}</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <a class="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer" href="${project.live}">Ver site</a>
          <a class="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer" href="${project.code}">Ver código</a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const inner = document.getElementById("projectsCarouselInner");
  if (!inner) return;

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  inner.innerHTML = filtered.map((project, idx) => projectSlideTemplate(project, idx === 0)).join("");

  const carouselEl = document.getElementById("carouselProjetos");
  if (carouselEl && window.bootstrap?.Carousel) {
    window.bootstrap.Carousel.getOrCreateInstance(carouselEl).to(0);
  }
}

function initFilters() {
  const options = document.querySelectorAll(".filter-option");
  const filterLabel = document.getElementById("filterLabel");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const filter = option.dataset.filter || "all";
      renderProjects(filter);
      if (filterLabel) {
        filterLabel.textContent = labels[filter] || "Todos";
      }
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
  const links = document.querySelectorAll(".navbar .nav-link");

  links.forEach((link) => {
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
  const formspreeEndpoint = "https://formspree.io/f/xzdapvgl";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    const valid = form.checkValidity() && nome.value.trim().length >= 2 && mensagem.value.trim().length >= 10;

    if (!valid) {
      status.textContent = "Preencha corretamente nome, email e mensagem.";
      return;
    }

    status.textContent = "A enviar mensagem...";

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          nome: nome.value.trim(),
          email: email.value.trim(),
          mensagem: mensagem.value.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      status.textContent = "Mensagem enviada com sucesso. Obrigado pelo contacto.";
      form.reset();
    } catch (error) {
      status.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  renderProjects("all");
  initFilters();
  initReveal();
  initMobileMenuClose();
  initForm();
});

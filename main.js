const PortfolioApp = {
    init() {
        // Aqui eu inicio todas as funções principais do site.
        this.initMenuToggle();
        this.initSmoothScroll();
        this.initActiveMenu();
        this.initForm();
        this.initReveal();
        this.initHabilidades();
        this.initVideoEmbed();
    },

    initMenuToggle() {
        // Controle do menu no mobile.
        const toggle = document.querySelector('.botao-menu');
        const menu = document.querySelector('.menu-principal');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Abrir menu');
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            if (!menu.classList.contains('is-open')) return;
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
            toggle.focus();
        });
    },

    initSmoothScroll() {
        // Scroll suave, mas respeitando acessibilidade.
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                history.pushState(null, '', href);
            });
        });
    },

    initActiveMenu() {
        // Deixo o link ativo conforme a seção atual.
        const navLinks = Array.from(document.querySelectorAll('.link-menu'));
        const sections = Array.from(document.querySelectorAll('section[id]'));
        if (!navLinks.length || !sections.length) return;

        const updateActive = () => {
            const scrollPosition = window.scrollY + 120;
            let currentId = '';

            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < bottom) {
                    currentId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${currentId}`;
                link.classList.toggle('active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        updateActive();
        window.addEventListener('scroll', updateActive);
        window.addEventListener('resize', updateActive);
    },

    initForm() {
        // Validação simples do formulário.
        const form = document.getElementById('formularioContato');
        if (!form) return;

        const status = form.querySelector('.status-formulario');
        const submitBtn = form.querySelector('button[type="submit"]');

        const setStatus = (message, type) => {
            if (!status) return;
            status.textContent = message;
            status.classList.remove('is-error', 'is-success');
            if (type === 'error') status.classList.add('is-error');
            if (type === 'success') status.classList.add('is-success');
        };

        const setFieldState = (field, isValid) => {
            field.classList.remove('is-invalid', 'is-valid');
            field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            form.setAttribute('aria-busy', 'true');

            const nameField = form.querySelector('#nome');
            const emailField = form.querySelector('#email');
            const subjectField = form.querySelector('#assunto');
            const messageField = form.querySelector('#mensagem');

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const subject = subjectField.value.trim() || 'Contato do Portfolio';
            const message = messageField.value.trim();

            let isValid = true;

            if (!name) {
                setFieldState(nameField, false);
                isValid = false;
            } else {
                setFieldState(nameField, true);
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setFieldState(emailField, false);
                isValid = false;
            } else {
                setFieldState(emailField, true);
            }

            if (!message || message.length < 10) {
                setFieldState(messageField, false);
                isValid = false;
            } else {
                setFieldState(messageField, true);
            }

            if (!isValid) {
                setStatus('Revise os campos destacados.', 'error');
                form.setAttribute('aria-busy', 'false');
                return;
            }

            setStatus('Enviando...', 'success');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }

            const payload = { name, email, subject, message };
            const formAction = form.getAttribute('action');

            try {
                if (!formAction) {
                    throw new Error('Formulário sem endpoint.');
                }

                const response = await fetch(formAction, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Falha no envio via API.');
                }

                setStatus('Mensagem enviada! Obrigado pelo contato. Vou responder o mais rápido possível. 😊', 'success');
                form.reset();
            } catch (error) {
                setStatus('Não consegui enviar agora. Tente novamente em instantes.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';
                }
                form.setAttribute('aria-busy', 'false');
            }
        });
    },

    initReveal() {
        // Animações simples quando os cards aparecem.
        const targets = document.querySelectorAll('[data-revelar]');
        if (!targets.length || !('IntersectionObserver' in window)) {
            targets.forEach(target => target.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        targets.forEach(target => observer.observe(target));
    },

    initHabilidades() {
        // Eu uso o data-level para preencher as barras.
        const barras = document.querySelectorAll('.nivel-habilidade');
        barras.forEach(barra => {
            const nivel = barra.dataset.level;
            if (!nivel) return;
            barra.style.width = `${nivel}%`;
        });
    },

    initVideoEmbed() {
        // Troca a capa pelo iframe quando o usuário clicar.
        const container = document.querySelector('.video-embed');
        if (!container) return;

        const src = container.getAttribute('data-video-src');
        if (!src) return;

        const template = container.innerHTML;

        const bindPlay = () => {
            const botao = container.querySelector('.botao-video');
            if (!botao) return;

            botao.addEventListener('click', () => {
                const iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.title = 'Vídeo de apresentação';
                iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.loading = 'lazy';
                container.innerHTML = '';
                container.appendChild(iframe);
                container.dataset.playing = 'true';
            });
        };

        bindPlay();

        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && container.dataset.playing === 'true') {
                        container.innerHTML = template;
                        container.dataset.playing = 'false';
                        bindPlay();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(container);
    }
};

document.addEventListener('DOMContentLoaded', () => PortfolioApp.init());

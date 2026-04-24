const PortfolioApp = {
    init() {
        this.initMenuToggle();
        this.initMenuCollapse();
        this.initSmoothScroll();
        this.initActiveMenu();
        this.initForm();
        this.initReveal();
        this.initHabilidades();
    },

    // Fecha o menu mobile ao clicar fora
    initMenuToggle() {
        const toggleBtn = document.querySelector('.botao-menu');
        const menu = document.getElementById('menu-principal');
        if (!toggleBtn || !menu || !window.bootstrap || !window.bootstrap.Collapse) return;

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
                if (menu.classList.contains('show')) {
                    window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
                }
            }
        });
    },

    initMenuCollapse() {
        const menu = document.getElementById('menu-principal');
        if (!menu || !window.bootstrap || !window.bootstrap.Collapse) return;

        const links = menu.querySelectorAll('a[href^="#"]');
        links.forEach((link) => {
            link.addEventListener('click', () => {
                const isDesktop = window.matchMedia('(min-width: 768px)').matches;
                if (isDesktop || !menu.classList.contains('show')) return;

                window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
            });
        });
    },

    initSmoothScroll() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#' || href === '#!') return;

                const targetId = href.slice(1);
                const target = document.getElementById(targetId);
                if (!target) return;

                e.preventDefault();

                const headerHeight = parseInt(
                    getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
                    10
                ) || 72;

                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
                window.scrollTo({
                    top: Math.max(0, top),
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                if (history.replaceState) {
                    history.replaceState(null, '', href);
                }

                if (!target.hasAttribute('tabindex')) {
                    target.setAttribute('tabindex', '-1');
                }
                target.focus({ preventScroll: true });
            });
        });
    },

    initActiveMenu() {
        const navLinks = Array.from(document.querySelectorAll('.link-menu'));
        const sections = Array.from(document.querySelectorAll('section[id]'));
        if (!navLinks.length || !sections.length) return;

        let ticking = false;

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

        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                updateActive();
                ticking = false;
            });
        };

        updateActive();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
    },

    initForm() {
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
            } catch {
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
        const targets = Array.from(document.querySelectorAll('[data-revelar]'));
        if (!targets.length) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        targets.forEach(target => {
            if (prefersReducedMotion || target.tagName === 'SECTION') {
                target.classList.add('is-visible');
            }
        });

        const revealTargets = targets.filter(target => !target.classList.contains('is-visible'));
        if (!revealTargets.length || !('IntersectionObserver' in window)) {
            revealTargets.forEach(target => target.classList.add('is-visible'));
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
            {
                threshold: 0.01,
                rootMargin: '0px 0px -8% 0px'
            }
        );

        revealTargets.forEach(target => observer.observe(target));
    },

    initHabilidades() {
        const barras = document.querySelectorAll('.nivel-habilidade');
        barras.forEach(barra => {
            const nivel = barra.dataset.level;
            if (!nivel) return;
            barra.style.width = `${nivel}%`;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => PortfolioApp.init());

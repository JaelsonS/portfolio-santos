// Orquestração simples do frontend para manter o bundle leve.
const CONFIG = {
    contactEmail: 'jaelsondev345@gmail.com',
    whatsappNumber: '+351916447990',
    linkedinUrl: 'https://www.linkedin.com/in/jaelson-santos-8628b52a4/',
    githubUrl: 'https://github.com/JaelsonS',
    portfolioUrl: 'https://jaelsons.github.io'
};

// Objeto principal para manter tudo organizado sem framework.
const PortfolioApp = {
    // Inicialização sequencial ajuda a debugar problemas em produção.
    init: function() {
        console.log('🚀 Portfolio Jaelson Santos iniciando...');
        
        // Loading simples evita dependências extras.
        this.hideLoading();
        
        // Cada módulo cuida de um pedaço de UX.
        this.initSmoothScroll();
        this.initNavbar();
        this.initBackToTop();
        this.initAnimations();
        this.initSkillBars();
        this.initWhatsAppFloat();
        this.initProjectCards();
        this.initTooltips();
        
        // Classe usada para transições leves.
        document.body.classList.add('page-transition');
        
        console.log('✅ Portfolio inicializado com sucesso!');
    },
    
    // Esconde loading quando o DOM já respondeu.
    hideLoading: function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            window.requestAnimationFrame(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 200);
            });
        }
    },
    
    // Scroll suave melhora navegação sem bibliotecas externas.
    initSmoothScroll: function() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                    
                    history.pushState(null, null, href);
                }
            });
        });
    },
    
    // Navbar reage ao scroll para manter contraste e foco.
    initNavbar: function() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) return;
        
        this.cacheSections();

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (scrollY > 100) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }

                    this.updateActiveNavLink(scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('resize', this.helpers.debounce(() => {
            this.cacheSections();
            this.updateActiveNavLink(window.scrollY);
        }, 200));
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        });
        
        this.updateActiveNavLink(window.scrollY);
    },

    // Cache das posições para evitar layout thrash no scroll.
    cacheSections: function() {
        const sections = document.querySelectorAll('section[id]');
        this.sectionCache = Array.from(sections).map(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            return {
                id: section.getAttribute('id'),
                top,
                bottom: top + height
            };
        });
    },
    
    // Link ativo ajuda a orientação em páginas longas.
    updateActiveNavLink: function(scrollY) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = (scrollY ?? window.scrollY) + 100;

        const sections = this.sectionCache || [];
        sections.forEach(section => {
            if (scrollPosition >= section.top && scrollPosition < section.bottom) {
                current = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    },
    
    // Voltar ao topo reduz esforço em mobile.
    initBackToTop: function() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },
    
    // Animações isoladas para poder desligar com prefers-reduced-motion.
    initAnimations: function() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        const animateElements = document.querySelectorAll(
            '.hero-content, .profile-container, .section-header, ' +
            '.about-card, .info-card, .skill-card, .project-card, ' +
            '.contact-info, .contact-form-container'
        );
        
        animateElements.forEach((el, index) => {
            el.classList.add('animate-element');
            el.style.setProperty('--i', index);
        });
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        if (entry.target.classList.contains('skill-card')) {
                            this.animateSkillBars(entry.target);
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-100px',
                threshold: 0.1
            }
        );
        
        animateElements.forEach(el => observer.observe(el));
    },
    
    // Barras começam em 0 para reforçar o efeito de progresso.
    initSkillBars: function() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            level.style.width = '0';
        });
    },
    
    animateSkillBars: function(skillCard) {
        const skillLevels = skillCard.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const levelValue = level.getAttribute('data-level');
            setTimeout(() => {
                level.style.width = levelValue + '%';
            }, 300);
        });
    },
    
    // Mantido por compatibilidade caso o form-handler seja removido.
    initContactForm: function() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim() || 'Contato do Portfolio',
                message: document.getElementById('message').value.trim()
            };
            
            if (!this.validateForm(formData)) {
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const mailtoLink = this.generateMailtoLink(formData);
                
                this.showSuccessMessage(submitBtn);
                
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 800);
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalContent;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    submitBtn.disabled = false;
                }, 5000);
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                this.showErrorMessage(submitBtn, originalContent);
            }
        });
    },
    
    // Validação local evita requisições desnecessárias.
    validateForm: function(formData) {
        this.removeErrorMessages();
        
        let isValid = true;
        
        if (!formData.name) {
            this.showFieldError('name', 'Por favor, insira seu nome');
            isValid = false;
        }
        
        if (!formData.email) {
            this.showFieldError('email', 'Por favor, insira seu email');
            isValid = false;
        } else if (!this.isValidEmail(formData.email)) {
            this.showFieldError('email', 'Por favor, insira um email válido');
            isValid = false;
        }
        
        if (!formData.message) {
            this.showFieldError('message', 'Por favor, insira sua mensagem');
            isValid = false;
        } else if (formData.message.length < 10) {
            this.showFieldError('message', 'A mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    },
    
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    showFieldError: function(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-floating');
        
        field.classList.add('is-invalid');
        formGroup.classList.add('has-error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
        
        if (!this.firstErrorField) {
            this.firstErrorField = field;
            field.focus();
        }
    },
    
    removeErrorMessages: function() {
        this.firstErrorField = null;
        
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        document.querySelectorAll('.has-error').forEach(el => {
            el.classList.remove('has-error');
        });
        
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.remove();
        });
    },
    
    generateMailtoLink: function(formData) {
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
            `Nome: ${formData.name}\n` +
            `Email: ${formData.email}\n\n` +
            `Mensagem:\n${formData.message}\n\n` +
            `---\nEnviado do portfolio: ${CONFIG.portfolioUrl}`
        );
        
        return `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    },
    
    showSuccessMessage: function(button) {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Mensagem Enviada!';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        
        button.classList.add('success-animation');
        setTimeout(() => {
            button.classList.remove('success-animation');
        }, 500);
    },
    
    showErrorMessage: function(button, originalContent) {
        button.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Erro ao Enviar';
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('btn-danger');
            button.classList.add('btn-primary');
            button.disabled = false;
        }, 3000);
    },
    
    // CTA do WhatsApp é link direto (sem API) para manter simplicidade.
    initWhatsAppFloat: function() {
        const whatsappFloat = document.getElementById('whatsappFloat');
        if (!whatsappFloat) return;
        
        const defaultMessage = encodeURIComponent(
            'Olá Jaelson! Vi seu portfolio e gostaria de conversar sobre oportunidades.'
        );
        whatsappFloat.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${defaultMessage}`;
        
        setTimeout(() => {
            whatsappFloat.classList.add('visible');
        }, 2000);
    },
    
    // Microinterações leves para dar feedback sem distrair.
    initProjectCards: function() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a, button')) {
                    card.classList.add('hover-scale');
                    setTimeout(() => {
                        card.classList.remove('hover-scale');
                    }, 300);
                }
            });
        });
    },
    
    // Tooltip simples para não pesar o bundle.
    initTooltips: function() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const tooltip = el.getAttribute('data-tooltip');
                const tooltipEl = document.createElement('div');
                
                tooltipEl.className = 'custom-tooltip';
                tooltipEl.textContent = tooltip;
                tooltipEl.style.position = 'fixed';
                tooltipEl.style.background = 'var(--dark)';
                tooltipEl.style.color = 'white';
                tooltipEl.style.padding = '0.5rem 1rem';
                tooltipEl.style.borderRadius = 'var(--radius-sm)';
                tooltipEl.style.fontSize = '0.9rem';
                tooltipEl.style.zIndex = '9999';
                tooltipEl.style.whiteSpace = 'nowrap';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.transform = 'translate(-50%, calc(-100% - 10px))';
                
                document.body.appendChild(tooltipEl);
                
                const rect = el.getBoundingClientRect();
                tooltipEl.style.top = `${rect.top}px`;
                tooltipEl.style.left = `${rect.left + rect.width / 2}px`;
                
                el._tooltip = tooltipEl;
            });
            
            el.addEventListener('mouseleave', () => {
                if (el._tooltip) {
                    el._tooltip.remove();
                    delete el._tooltip;
                }
            });
        });
    },
    
    // Helpers reutilizáveis em outras interações.
    helpers: {
        // Debounce reduz chamadas em sequência no input.
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle mantém listeners leves.
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        formatPhoneNumber: function(phone) {
            return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        },
        
        isMobile: function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        isIOS: function() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }
    }
};

// Inicializa após o DOM para garantir elementos prontos.
document.addEventListener('DOMContentLoaded', () => PortfolioApp.init());

// Compatibilidade mínima sem dependências externas.
if (typeof window.addEventListener === 'undefined') {
    window.addEventListener = function(event, callback) {
        window.attachEvent('on' + event, callback);
    };
}

// Polyfill para browsers antigos.
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill básico para Element.closest().
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.msMatchesSelector || 
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
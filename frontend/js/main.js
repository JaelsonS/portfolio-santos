// =============================================
// MAIN JS - PORTFOLIO JAELSON SANTOS
// =============================================

// Configurações globais
const CONFIG = {
    contactEmail: 'jaelsondev345@gmail.com',
    whatsappNumber: '+351916447990',
    linkedinUrl: 'https://www.linkedin.com/in/jaelson-santos-8628b52a4/',
    githubUrl: 'https://github.com/JaelsonS',
    portfolioUrl: 'https://jaelsons.github.io'
};

// Objeto principal da aplicação
const PortfolioApp = {
    // Inicializa todas as funcionalidades
    init: function() {
        console.log('🚀 Portfolio Jaelson Santos iniciando...');
        
        // Remove loading screen
        this.hideLoading();
        
        // Inicializa módulos
        this.initSmoothScroll();
        this.initNavbar();
        this.initBackToTop();
        this.initAnimations();
        this.initSkillBars();
        this.initContactForm();
        this.initWhatsAppFloat();
        this.initProjectCards();
        this.initTooltips();
        
        // Adiciona classe de inicialização
        document.body.classList.add('page-transition');
        
        console.log('✅ Portfolio inicializado com sucesso!');
    },
    
    // Esconde tela de loading
    hideLoading: function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    },
    
    // Smooth scroll para links internos
    initSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignora links vazios
                if (href === '#' || href === '#!') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Fecha navbar mobile se aberto
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Atualiza URL sem recarregar a página
                    history.pushState(null, null, href);
                }
            });
        });
    },
    
    // Navbar effects
    initNavbar: function() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) return;
        
        // Efeito de scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Atualiza link ativo
            this.updateActiveNavLink();
        });
        
        // Fecha navbar ao clicar em link (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        });
        
        // Adiciona classe ativa ao link da página atual
        this.updateActiveNavLink();
    },
    
    // Atualiza link ativo na navbar
    updateActiveNavLink: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    },
    
    // Botão "Voltar ao topo"
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
    
    // Sistema de animações
    initAnimations: function() {
        // Adiciona classes de animação aos elementos
        const animateElements = document.querySelectorAll(
            '.hero-content, .profile-container, .section-header, ' +
            '.about-card, .info-card, .skill-card, .project-card, ' +
            '.contact-info, .contact-form-container'
        );
        
        animateElements.forEach((el, index) => {
            el.classList.add('animate-element');
            el.style.setProperty('--i', index);
        });
        
        // Configura Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        // Animação específica para skills
                        if (entry.target.classList.contains('skill-card')) {
                            this.animateSkillBars(entry.target);
                        }
                        
                        // Para de observar após animar
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
        
        // Observa cada elemento
        animateElements.forEach(el => observer.observe(el));
    },
    
    // Anima as barras de skills
    initSkillBars: function() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            // Garante que as barras comecem em 0
            level.style.width = '0';
        });
    },
    
    // Anima barras de skills quando visíveis
    animateSkillBars: function(skillCard) {
        const skillLevels = skillCard.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const levelValue = level.getAttribute('data-level');
            setTimeout(() => {
                level.style.width = levelValue + '%';
            }, 300);
        });
    },
    
    // Formulário de contato
    initContactForm: function() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Dados do formulário
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim() || 'Contato do Portfolio',
                message: document.getElementById('message').value.trim()
            };
            
            // Validação
            if (!this.validateForm(formData)) {
                return;
            }
            
            // Feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            
            try {
                // Simula delay de rede
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Prepara link do email
                const mailtoLink = this.generateMailtoLink(formData);
                
                // Feedback de sucesso
                this.showSuccessMessage(submitBtn);
                
                // Redireciona para cliente de email
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 800);
                
                // Reseta formulário após 5 segundos
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
    
    // Valida dados do formulário
    validateForm: function(formData) {
        // Remove mensagens de erro anteriores
        this.removeErrorMessages();
        
        let isValid = true;
        
        // Valida nome
        if (!formData.name) {
            this.showFieldError('name', 'Por favor, insira seu nome');
            isValid = false;
        }
        
        // Valida email
        if (!formData.email) {
            this.showFieldError('email', 'Por favor, insira seu email');
            isValid = false;
        } else if (!this.isValidEmail(formData.email)) {
            this.showFieldError('email', 'Por favor, insira um email válido');
            isValid = false;
        }
        
        // Valida mensagem
        if (!formData.message) {
            this.showFieldError('message', 'Por favor, insira sua mensagem');
            isValid = false;
        } else if (formData.message.length < 10) {
            this.showFieldError('message', 'A mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    },
    
    // Valida formato de email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Mostra erro em campo específico
    showFieldError: function(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-floating');
        
        // Adiciona classe de erro
        field.classList.add('is-invalid');
        formGroup.classList.add('has-error');
        
        // Cria mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
        
        // Scroll para o primeiro erro
        if (!this.firstErrorField) {
            this.firstErrorField = field;
            field.focus();
        }
    },
    
    // Remove todas as mensagens de erro
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
    
    // Gera link mailto
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
    
    // Mostra mensagem de sucesso
    showSuccessMessage: function(button) {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Mensagem Enviada!';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        
        // Efeito visual adicional
        button.classList.add('success-animation');
        setTimeout(() => {
            button.classList.remove('success-animation');
        }, 500);
    },
    
    // Mostra mensagem de erro
    showErrorMessage: function(button, originalContent) {
        button.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Erro ao Enviar';
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
        
        // Restaura após 3 segundos
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('btn-danger');
            button.classList.add('btn-primary');
            button.disabled = false;
        }, 3000);
    },
    
    // WhatsApp float button
    initWhatsAppFloat: function() {
        const whatsappFloat = document.getElementById('whatsappFloat');
        if (!whatsappFloat) return;
        
        // Adiciona mensagem padrão
        const defaultMessage = encodeURIComponent(
            'Olá Jaelson! Vi seu portfolio e gostaria de conversar sobre oportunidades.'
        );
        whatsappFloat.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${defaultMessage}`;
        
        // Animação de entrada
        setTimeout(() => {
            whatsappFloat.classList.add('visible');
        }, 2000);
    },
    
    // Efeitos nos cards de projeto
    initProjectCards: function() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Efeito de clique
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
    
    // Tooltips
    initTooltips: function() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const tooltip = el.getAttribute('data-tooltip');
                const tooltipEl = document.createElement('div');
                
                tooltipEl.className = 'custom-tooltip';
                tooltipEl.textContent = tooltip;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.background = 'var(--dark)';
                tooltipEl.style.color = 'white';
                tooltipEl.style.padding = '0.5rem 1rem';
                tooltipEl.style.borderRadius = 'var(--radius-sm)';
                tooltipEl.style.fontSize = '0.9rem';
                tooltipEl.style.zIndex = '9999';
                tooltipEl.style.whiteSpace = 'nowrap';
                tooltipEl.style.pointerEvents = 'none';
                
                document.body.appendChild(tooltipEl);
                
                // Posiciona tooltip
                const rect = el.getBoundingClientRect();
                tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
                tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
                
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
    
    // Funções auxiliares
    helpers: {
        // Debounce para performance
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
        
        // Throttle para performance
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
        
        // Formata número de telefone
        formatPhoneNumber: function(phone) {
            return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        },
        
        // Detecta dispositivo móvel
        isMobile: function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        // Detecta iOS
        isIOS: function() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }
    }
};

// Inicializa app quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => PortfolioApp.init());

// Suporte para navegadores antigos
if (typeof window.addEventListener === 'undefined') {
    window.addEventListener = function(event, callback) {
        window.attachEvent('on' + event, callback);
    };
}

// Polyfill para forEach em NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill para Element.closest()
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
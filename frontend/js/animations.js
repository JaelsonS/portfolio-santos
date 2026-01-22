// =============================================
// ANIMAÇÕES ESPECÍFICAS
// =============================================

class PortfolioAnimations {
    constructor() {
        this.animationElements = [];
        this.observers = [];
        this.init();
    }
    
    init() {
        console.log('🎨 Inicializando animações...');
        
        // Configura todos os tipos de animação
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupTextAnimations();
        this.setupLoadingAnimations();
        this.setupParallaxEffect();
        
        // Inicia observadores
        this.startObservers();
        
        console.log('✅ Animações configuradas!');
    }
    
    // Animações baseadas no scroll
    setupScrollAnimations() {
        // Elementos que devem animar ao entrar na viewport
        const scrollElements = document.querySelectorAll(
            '.hero-content, .profile-container, .section-header, ' +
            '.about-card, .info-card, .skill-card, .project-card, ' +
            '.tech-icon, .contact-item, .github-cta'
        );
        
        // Adiciona classes de animação
        scrollElements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.dataset.animationIndex = index;
        });
        
        // Configura Intersection Observer
        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        // Adiciona delay baseado no índice
                        const index = parseInt(element.dataset.animationIndex) || 0;
                        const delay = Math.min(index * 0.1, 1);
                        
                        setTimeout(() => {
                            element.classList.add('animated');
                            
                            // Animação específica para cada tipo
                            this.animateElement(element);
                        }, delay * 1000);
                        
                        // Para de observar após animar
                        scrollObserver.unobserve(element);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.15
            }
        );
        
        // Inicia observação
        scrollElements.forEach(element => scrollObserver.observe(element));
        this.observers.push(scrollObserver);
    }
    
    // Animação específica por tipo de elemento
    animateElement(element) {
        // Remove classes de animação anteriores
        element.classList.remove('animate-on-scroll');
        
        // Animação baseada na classe do elemento
        if (element.classList.contains('skill-card')) {
            this.animateSkillCard(element);
        } else if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        } else if (element.classList.contains('tech-icon')) {
            this.animateTechIcon(element);
        } else if (element.classList.contains('section-header')) {
            this.animateSectionHeader(element);
        }
    }
    
    // Animação para cards de skills
    animateSkillCard(skillCard) {
        // Anima as barras de progresso
        const skillBars = skillCard.querySelectorAll('.skill-level');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                
                // Efeito de pulso no final
                setTimeout(() => {
                    bar.classList.add('pulse-glow');
                    setTimeout(() => {
                        bar.classList.remove('pulse-glow');
                    }, 1000);
                }, 300);
            }, index * 200);
        });
    }
    
    // Animação para cards de projeto
    animateProjectCard(projectCard) {
        // Efeito de entrada
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            projectCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0) scale(1)';
            
            // Efeito de brilho
            setTimeout(() => {
                projectCard.classList.add('hover-lift');
            }, 600);
        }, 100);
    }
    
    // Animação para ícones tech
    animateTechIcon(icon) {
        // Efeito de rotação e escala
        icon.style.transform = 'rotate(0deg) scale(0)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            icon.style.transform = 'rotate(360deg) scale(1)';
        }, 100);
    }
    
    // Animação para headers de seção
    animateSectionHeader(header) {
        const line = header.querySelector('.section-line');
        if (line) {
            line.style.width = '0';
            setTimeout(() => {
                line.style.transition = 'width 1s ease-in-out';
                line.style.width = '80px';
            }, 300);
        }
    }
    
    // Animações de hover
    setupHoverAnimations() {
        // Cards com efeito de hover
        const hoverCards = document.querySelectorAll('.card, .skill-card, .project-card');
        hoverCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.classList.add('hover-lift');
                
                // Efeito de sombra dinâmica
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift');
            });
        });
        
        // Botões com efeito de ripple
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                // Remove após animação
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    // Animações de texto
    setupTextAnimations() {
        // Efeito de digitação no hero
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.classList.add('typing');
            
            setTimeout(() => {
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    } else {
                        heroTitle.classList.remove('typing');
                    }
                };
                typeWriter();
            }, 1000);
        }
    }
    
    // Animações de loading
    setupLoadingAnimations() {
        // Anima tech icons no hero
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`;
            icon.classList.add('fade-in-image');
        });
    }
    
    // Efeito parallax suave
    setupParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Move background suavemente
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
    
    // Inicia todos os observadores
    startObservers() {
        // Observer para elementos que entram na viewport
        const viewportObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-viewport');
                    } else {
                        entry.target.classList.remove('in-viewport');
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        // Observa elementos importantes
        document.querySelectorAll('section').forEach(section => {
            viewportObserver.observe(section);
        });
        
        this.observers.push(viewportObserver);
    }
    
    // Limpa observadores (para performance)
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Inicializa animações quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const animations = new PortfolioAnimations();
    
    // Expõe globalmente para debug (opcional)
    window.portfolioAnimations = animations;
    
    // Adiciona CSS para animações dinâmicas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .in-viewport {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        /* Efeito de brilho dinâmico nos cards */
        .card:hover::before,
        .skill-card:hover::before,
        .project-card:hover::before {
            content: '';
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            z-index: 1;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});

// Polyfill para requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || 
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
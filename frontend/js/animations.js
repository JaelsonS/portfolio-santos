// Animações pensadas para dar contexto sem pesar no scroll.

class PortfolioAnimations {
    constructor() {
        this.animationElements = [];
        this.observers = [];
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }
    
    init() {
        console.log('🎨 Inicializando animações...');
        
        if (this.prefersReducedMotion) {
            this.revealAll();
            console.log('ℹ️ Animações reduzidas por preferência do utilizador.');
            return;
        }

        // Separar tipos de animação ajuda a isolar impacto de performance.
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupTextAnimations();
        this.setupLoadingAnimations();
        this.setupParallaxEffect();
        
        // Observers só iniciam após setup para evitar reflow extra.
        this.startObservers();
        
        console.log('✅ Animações configuradas!');
    }
    
    // Scroll animations com IntersectionObserver para reduzir custo em mobile.
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll(
            '.hero-content, .profile-container, .section-header, ' +
            '.about-card, .info-card, .skill-card, .project-card, ' +
            '.tech-icon, .contact-item, .github-cta'
        );

        scrollElements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.dataset.animationIndex = index;
        });

        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;

                        const index = parseInt(element.dataset.animationIndex) || 0;
                        const delay = Math.min(index * 0.1, 1);

                        setTimeout(() => {
                            element.classList.add('animated');

                            this.animateElement(element);
                        }, delay * 1000);

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
        
        scrollElements.forEach(element => scrollObserver.observe(element));
        this.observers.push(scrollObserver);
    }

    revealAll() {
        const elements = document.querySelectorAll(
            '.hero-content, .profile-container, .section-header, ' +
            '.about-card, .info-card, .skill-card, .project-card, ' +
            '.tech-icon, .contact-item, .github-cta'
        );

        elements.forEach(element => {
            element.classList.add('animated');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
    
    // Cada tipo tem microefeito próprio para evitar animação genérica demais.
    animateElement(element) {
        element.classList.remove('animate-on-scroll');

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
    
    // Skills animam só quando visíveis para poupar repaints.
    animateSkillCard(skillCard) {
        const skillBars = skillCard.querySelectorAll('.skill-level');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';

                setTimeout(() => {
                    bar.classList.add('pulse-glow');
                    setTimeout(() => {
                        bar.classList.remove('pulse-glow');
                    }, 1000);
                }, 300);
            }, index * 200);
        });
    }
    
    // Projeto entra com leve escala para reforçar hierarquia visual.
    animateProjectCard(projectCard) {
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            projectCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0) scale(1)';
            
            setTimeout(() => {
                projectCard.classList.add('hover-lift');
            }, 600);
        }, 100);
    }
    
    // Ícones com rotação curta para dar vida sem exagero.
    animateTechIcon(icon) {
        icon.style.transform = 'rotate(0deg) scale(0)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            icon.style.transform = 'rotate(360deg) scale(1)';
        }, 100);
    }
    
    // Linha da seção anima para guiar o olhar.
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
    
    // Hover é leve para não competir com o conteúdo.
    setupHoverAnimations() {
        const hoverCards = document.querySelectorAll('.card, .skill-card, .project-card');
        hoverCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.classList.add('hover-lift');

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
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    // Digitação no hero chama atenção sem peso de vídeo.
    setupTextAnimations() {
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
    
    // Ícones aparecem em sequência para dar ritmo.
    setupLoadingAnimations() {
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`;
            icon.classList.add('fade-in-image');
        });
    }
    
    // Parallax simples, sem libs, para evitar custos extras.
    setupParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
    
    // Observers separados para manter o controle e poder limpar se necessário.
    startObservers() {
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
        
        document.querySelectorAll('section').forEach(section => {
            viewportObserver.observe(section);
        });
        
        this.observers.push(viewportObserver);
    }
    
    // Limpeza evita leaks se houver navegação SPA no futuro.
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Inicializa após o DOM para evitar query em elementos inexistentes.
document.addEventListener('DOMContentLoaded', () => {
    const animations = new PortfolioAnimations();

    window.portfolioAnimations = animations;

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
        
        /* Brilho dinâmico nos cards para destacar interações */
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

// Polyfill por compatibilidade sem dependências externas.
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
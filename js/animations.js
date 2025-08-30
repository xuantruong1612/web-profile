// ========== ANIMATION CONTROLLER ========== //
class AnimationController {
    constructor() {
        this.isActive = true;
        this.observers = new Map();
        this.animations = new Map();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        if (this.reducedMotion) {
            console.log('⚡ Reduced motion detected - using minimal animations');
            this.initMinimalAnimations();
            return;
        }
        
        this.initScrollAnimations();
        this.initIntersectionObservers();
        this.initAdvancedEffects();
    }
    
    initMinimalAnimations() {
        // Simple fade-in animations only
        const elements = document.querySelectorAll('.skill-card, .project-card, .stat-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transition = 'opacity 0.3s ease';
            }, index * 100);
        });
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '0px 0px -10% 0px'
        };
        
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                const element = entry.target;
                
                if (ratio > 0.1) {
                    element.classList.add('visible');
                    this.triggerElementAnimation(element);
                }
                
                if (ratio > 0.5) {
                    element.classList.add('fully-visible');
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elements = document.querySelectorAll(`
            .section-header,
            .terminal-window,
            .stat-card,
            .skill-card,
            .project-card,
            .contact-card,
            .cyber-form
        `);
        
        elements.forEach(el => {
            el.classList.add('scroll-fade');
            this.scrollObserver.observe(el);
        });
    }
    
    triggerElementAnimation(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        // Different animations for different elements
        if (element.classList.contains('stat-card')) {
            this.animateStatCard(element);
        }
        
        if (element.classList.contains('skill-card')) {
            this.animateSkillCard(element);
        }
        
        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        }
    }
    
    animateStatCard(card) {
        const numberEl = card.querySelector('.stat-number');
        if (numberEl && !numberEl.dataset.animated) {
            this.animateNumber(numberEl);
            numberEl.dataset.animated = 'true';
        }
    }
    
    animateSkillCard(card) {
        const progressBar = card.querySelector('.skill-progress');
        if (progressBar && !progressBar.dataset.animated) {
            const level = parseInt(progressBar.dataset.level);
            setTimeout(() => {
                progressBar.style.width = `${level}%`;
                progressBar.classList.add('animate');
            }, Math.random() * 300);
            progressBar.dataset.animated = 'true';
        }
    }
    
    animateProjectCard(card) {
        // Add subtle entrance animation
        card.style.transform = 'translateY(30px)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, 100);
    }
    
    animateNumber(element) {
        const target = parseInt(element.dataset.target) || 
                      parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateNumber);
    }
    
    initAdvancedEffects() {
        if (this.reducedMotion) return;
        
        // Parallax effect for hero section
        this.initParallaxEffect();
        
        // Hover effects
        this.initHoverEffects();
        
        // Floating animations
        this.initFloatingAnimations();
    }
    
    initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero-bg, .grid-overlay');
        
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        };
        
        // Throttled scroll event
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    initHoverEffects() {
        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('.btn-cyber, .project-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (!this.reducedMotion) {
                    button.style.transform = 'translateY(-3px) scale(1.02)';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
        
        // Card hover effects
        const cards = document.querySelectorAll('.skill-card, .project-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.reducedMotion) {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                    card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.2)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
    
    initFloatingAnimations() {
        // Add floating animation to elements
        const floatingElements = document.querySelectorAll('.hologram-frame, .social-link');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
            element.classList.add('float-animation');
        });
    }
    
    // Add stagger animation to grids
    initStaggerAnimations() {
        const grids = document.querySelectorAll('.skills-grid, .projects-grid, .stats-grid');
        
        grids.forEach(grid => {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('fade-in');
            });
        });
    }
    
    // Cleanup method
    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        this.animations.clear();
        this.observers.clear();
    }
}

// ========== CSS ANIMATIONS ENHANCEMENT ========== //
const additionalStyles = `
/* Enhanced animations */
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(50px);
    }
}

.skill-progress.animate::after {
    animation-play-state: running;
}

.expert-glow {
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
}

.advanced-glow {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.fade-in {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

/* Improved scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #ff00ff, #00ffff);
}

/* Selection styling */
::selection {
    background: rgba(0, 255, 255, 0.3);
    color: #ffffff;
}

::-moz-selection {
    background: rgba(0, 255, 255, 0.3);
    color: #ffffff;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ========== INITIALIZE ANIMATIONS ========== //
window.animationController = new AnimationController();

// ========== EXPORT FUNCTIONS ========== //
if (typeof window !== 'undefined') {
    window.AnimationController = AnimationController;
    window.initAllAnimations = () => {
        if (window.animationController) {
            window.animationController.initStaggerAnimations();
        }
        if (typeof window.animateCounters === 'function') {
            window.animateCounters();
        }
    };
}

console.log('✨ Enhanced animations loaded');

// ========== COMPONENT FACTORY ========== //
class ComponentFactory {
    static createSkillCard(skill) {
        const trendingBadge = skill.trending ? 
            '<div class="trending-badge">🔥 Trending</div>' : '';
            
        const certificationBadge = skill.certification ? 
            `<div class="certification-badge">
                <i class="fas fa-certificate"></i>
                ${skill.certification}
            </div>` : '';
            
        const masteryLevel = skill.level >= 90 ? 'expert' : 
                           skill.level >= 80 ? 'advanced' : 
                           skill.level >= 70 ? 'proficient' : 'intermediate';
        
        return `
            <div class="skill-card" data-category="${skill.category}" style="--skill-color: ${skill.color}">
                ${trendingBadge}
                
                <div class="skill-icon" style="color: ${skill.color}">
                    <i class="${skill.icon}"></i>
                </div>
                
                <h3 class="skill-name">${skill.name}</h3>
                
                <div class="skill-experience">${skill.experience}</div>
                
                <div class="skill-level">
                    <div class="skill-progress" data-level="${skill.level}"></div>
                </div>
                
                <span class="skill-percentage">${skill.level}%</span>
                
                <div class="skill-meta">
                    <span class="projects-count">${skill.projects}+ projects</span>
                    <span class="since-year">Since ${skill.yearStarted}</span>
                </div>
                
                ${certificationBadge}
                
                <div class="mastery-level ${masteryLevel}">
                    <span class="mastery-text">${masteryLevel.toUpperCase()}</span>
                </div>
            </div>
        `;
    }

    static createProjectCard(project) {
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const statusBadge = project.status ? 
            `<span class="status-badge status-${project.status.toLowerCase()}">${project.status}</span>` : '';
        
        const difficultyStars = '★'.repeat(project.difficulty || 3);
        
        const metricsDisplay = project.metrics ? Object.entries(project.metrics).map(([key, value]) => 
            `<div class="metric-item">
                <span class="metric-label">${key}</span>
                <span class="metric-value">${value}</span>
            </div>`
        ).join('') : '';
        
        return `
            <div class="project-card" data-featured="${project.featured}">
                <div class="project-image">
                    <i class="${project.image}"></i>
                    ${statusBadge}
                    <div class="difficulty-indicator" title="Difficulty: ${project.difficulty}/5">
                        ${difficultyStars}
                    </div>
                </div>
                
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    ${project.subtitle ? `<p class="project-subtitle">${project.subtitle}</p>` : ''}
                    
                    <p class="project-description">${project.description}</p>
                    
                    ${project.metrics ? `
                        <div class="project-metrics">
                            ${metricsDisplay}
                        </div>
                    ` : ''}
                    
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    
                    <div class="project-info">
                        <div class="info-item">
                            <i class="fas fa-code"></i>
                            <span>${project.linesOfCode}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>${project.developmentTime}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-users"></i>
                            <span>Team of ${project.teamSize}</span>
                        </div>
                    </div>
                    
                    <div class="project-links">
                        <a href="${project.demoLink}" class="project-link demo" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </a>
                        <a href="${project.codeLink}" class="project-link code" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i>
                            Source Code
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// ========== RENDER FUNCTIONS ========== //
function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid || !window.skillsData) return;

    skillsGrid.innerHTML = window.skillsData
        .map(skill => ComponentFactory.createSkillCard(skill))
        .join('');

    // Animate skill progress bars after render
    setTimeout(() => {
        animateSkillBars();
    }, 500);
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid || !window.projectsData) return;

    // Show featured projects first
    const featuredProjects = window.projectsData.filter(p => p.featured);
    const otherProjects = window.projectsData.filter(p => !p.featured);
    const allProjects = [...featuredProjects, ...otherProjects];

    projectsGrid.innerHTML = allProjects
        .map(project => ComponentFactory.createProjectCard(project))
        .join('');
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const level = bar.dataset.level;
            bar.style.width = `${level}%`;
            
            // Add glow effect for high skills
            if (level >= 90) {
                bar.classList.add('expert-glow');
            } else if (level >= 80) {
                bar.classList.add('advanced-glow');
            }
        }, index * 100);
    });
}

// ========== SKILL FILTERING ========== //
function filterSkills(category) {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (card.style.opacity === '0') {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// ========== TYPING ANIMATION ========== //
class TypingAnimation {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            delayBetweenWords: options.delayBetweenWords || 2000,
            ...options
        };
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.currentText === currentWord) {
            typeSpeed = this.options.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ========== COUNTER ANIMATION ========== //
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target) || 
                  parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// ========== TOAST NOTIFICATIONS ========== //
class Toast {
    static show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '10001',
            background: type === 'success' ? 
                'linear-gradient(135deg, rgba(0, 255, 136, 0.9), rgba(0, 200, 100, 0.9))' : 
                'linear-gradient(135deg, rgba(255, 85, 85, 0.9), rgba(200, 50, 50, 0.9))',
            color: '#fff',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${type === 'success' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 85, 85, 0.3)'}`,
            animation: 'slideInRight 0.3s ease-out'
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// ========== FORM VALIDATOR ========== //
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static validateForm(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('Tên phải có ít nhất 2 ký tự');
        }
        
        if (!formData.email || !this.validateEmail(formData.email)) {
            errors.push('Email không hợp lệ');
        }
        
        if (!formData.subject || formData.subject.trim().length < 5) {
            errors.push('Tiêu đề phải có ít nhất 5 ký tự');
        }
        
        if (!formData.message || formData.message.trim().length < 10) {
            errors.push('Tin nhắn phải có ít nhất 10 ký tự');
        }
        
        return errors;
    }
}

// ========== EXPORT FUNCTIONS ========== //
if (typeof window !== 'undefined') {
    window.ComponentFactory = ComponentFactory;
    window.renderSkills = renderSkills;
    window.renderProjects = renderProjects;
    window.filterSkills = filterSkills;
    window.TypingAnimation = TypingAnimation;
    window.animateCounters = animateCounters;
    window.Toast = Toast;
    window.FormValidator = FormValidator;
}

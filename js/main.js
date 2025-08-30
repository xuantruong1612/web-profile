// ========== OPTIMIZED MAIN APPLICATION - FIXED ========== //
class OptimizedPortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.typingAnimation = null;
        this.performanceMode = this.detectPerformance();
        
        // ✅ Bind methods first
        this.bindMethods();
        this.init();
    }
    
    // ✅ Add method binding
    bindMethods() {
        this.onScroll = this.onScroll.bind(this);
        this.onResize = this.onResize.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    init() {
        console.log(`🚀 Portfolio starting in ${this.performanceMode} mode`);
        
        this.showLoadingScreen();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }
    
    detectPerformance() {
        // Simple performance detection
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        
        // Check for low-end indicators
        if (connection && connection.effectiveType === 'slow-2g') return 'low';
        if (hardwareConcurrency < 4 || deviceMemory < 4) return 'medium';
        if (window.innerWidth < 768) return 'mobile';
        
        return 'high';
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Optimize loading time based on performance
            const loadingTime = this.performanceMode === 'low' ? 1000 : 1500;
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.3s ease-out';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.onLoadingComplete();
                }, 300);
            }, loadingTime);
        } else {
            this.onLoadingComplete();
        }
    }
    
    onDOMReady() {
        console.log('📄 DOM Ready - Initializing components');
        this.initializeComponents();
    }
    
    onLoadingComplete() {
        console.log('✅ Loading Complete - Starting application');
        this.isLoaded = true;
        this.startApplication();
    }
    
    initializeComponents() {
        // Set performance mode attribute
        document.documentElement.setAttribute('data-performance', this.performanceMode);
        
        // Initialize core components
        this.renderComponents();
        this.initEventListeners();
        this.initAnimations();
        
        // Initialize particles based on performance
        if (this.performanceMode !== 'low') {
            this.initParticles();
        }
    }
    
    startApplication() {
        // Start main application features
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initNavbarEffects();
        this.initAccessibilityFeatures();
        
        console.log('🎉 Portfolio fully loaded and ready!');
        
        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('portfolioReady', {
            detail: { performanceMode: this.performanceMode }
        }));
    }
    
    renderComponents() {
        // Render skills and projects
        if (typeof window.renderSkills === 'function') {
            window.renderSkills();
        }
        if (typeof window.renderProjects === 'function') {
            window.renderProjects();
        }
    }
    
    // ✅ FIXED initEventListeners method
    initEventListeners() {
        this.initMobileMenu();
        this.initSkillFilters();
        this.initContactForm();
        this.initSmoothScroll();
        
        // ✅ Use properly bound methods with throttling
        const throttle = (func, limit) => {
            let inThrottle;
            return (...args) => {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        window.addEventListener('scroll', throttle(this.onScroll, 16));
        window.addEventListener('resize', throttle(this.onResize, 100));
        
        // Keyboard shortcuts
        this.initKeyboardShortcuts();
    }
    
    initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Update ARIA attributes
                const isActive = navMenu.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isActive);
                navMenu.setAttribute('aria-hidden', !isActive);
            });
            
            // Close menu when clicking on nav links
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Close menu with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                }
            });
        }
    }
    
    initSkillFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                
                // Filter skills
                const category = btn.dataset.category;
                if (typeof window.filterSkills === 'function') {
                    window.filterSkills(category);
                }
            });
        });
    }
    
    initContactForm() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit);
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        const errors = window.FormValidator ? 
            window.FormValidator.validateForm(data) : [];
        
        if (errors.length > 0) {
            this.showToast(errors[0], 'error');
            return;
        }
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span class="btn-content">
                <i class="fas fa-spinner fa-spin"></i>
                Đang gửi...
            </span>
        `;
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await this.simulateFormSubmission(data);
            
            this.showToast('Tin nhắn đã được gửi thành công! 🎉', 'success');
            e.target.reset();
            
            // Clear any field errors
            const fields = e.target.querySelectorAll('.form-group');
            fields.forEach(field => field.classList.remove('error'));
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showToast('Có lỗi xảy ra. Vui lòng thử lại sau!', 'error');
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Basic validation rules
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Tên phải có ít nhất 2 ký tự';
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Email không hợp lệ';
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Tiêu đề phải có ít nhất 5 ký tự';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Tin nhắn phải có ít nhất 10 ký tự';
                }
                break;
        }
        
        // Update field appearance
        const formGroup = field.closest('.form-group');
        if (!isValid) {
            formGroup.classList.add('error');
            this.showFieldError(field, errorMessage);
        } else {
            formGroup.classList.remove('error');
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        let errorEl = field.parentNode.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            field.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
        errorEl.style.cssText = `
            color: #ff5555;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            font-family: 'JetBrains Mono', monospace;
        `;
    }
    
    clearFieldError(field) {
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
        field.closest('.form-group').classList.remove('error');
    }
    
    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data submitted:', data);
                resolve({ success: true });
            }, 1500);
        });
    }
    
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        
        if (typingElement && window.typingRoles && window.TypingAnimation) {
            this.typingAnimation = new window.TypingAnimation(
                typingElement,
                window.typingRoles,
                {
                    typeSpeed: 80,
                    deleteSpeed: 40,
                    delayBetweenWords: 2500
                }
            );
        }
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateStatCard(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const elementsToObserve = document.querySelectorAll(`
            .section-header,
            .stat-card,
            .skill-card,
            .project-card,
            .contact-card,
            .cyber-form,
            .terminal-window
        `);
        
        elementsToObserve.forEach(el => {
            el.classList.add('scroll-fade');
            observer.observe(el);
        });
        
        // Initialize counter animations
        if (typeof window.animateCounters === 'function') {
            window.animateCounters();
        }
    }
    
    animateStatCard(card) {
        const numberEl = card.querySelector('.stat-number');
        if (numberEl && !numberEl.dataset.animated) {
            if (typeof window.animationController?.animateNumber === 'function') {
                window.animationController.animateNumber(numberEl);
            }
            numberEl.dataset.animated = 'true';
        }
    }
    
    initNavbarEffects() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        
        this.onScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };
    }
    
    initAnimations() {
        // Add basic CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .scroll-fade {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .scroll-fade.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .form-group.error input,
            .form-group.error textarea {
                border-color: #ff5555;
                box-shadow: 0 0 10px rgba(255, 85, 85, 0.3);
            }
            
            /* Enhanced loading states */
            .btn-cyber:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            .btn-cyber .fa-spin {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    initParticles() {
        if (typeof window.initParticles === 'function') {
            window.initParticles();
        }
    }
    
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key.toLowerCase()) {
                case 'h':
                    e.preventDefault();
                    this.scrollToSection('home');
                    break;
                case 's':
                    e.preventDefault();
                    this.scrollToSection('skills');
                    break;
                case 'p':
                    e.preventDefault();
                    this.scrollToSection('projects');
                    break;
                case 'c':
                    e.preventDefault();
                    this.scrollToSection('contact');
                    break;
                case '/':
                    e.preventDefault();
                    // Focus on search or contact form
                    const firstInput = document.querySelector('input[type="text"], input[type="email"]');
                    if (firstInput) firstInput.focus();
                    break;
            }
        });
    }
    
    initAccessibilityFeatures() {
        // Add ARIA labels and roles
        this.enhanceAccessibility();
        
        // Add focus management
        this.initFocusManagement();
        
        // Add screen reader announcements
        this.initScreenReaderSupport();
    }
    
    enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('.btn-cyber, .category-btn');
        buttons.forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });
        
        // Add roles to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.setAttribute('role', 'region');
            const heading = section.querySelector('h2');
            if (heading) {
                section.setAttribute('aria-labelledby', heading.id || `section-${section.id}`);
            }
        });
        
        // Add ARIA attributes to form
        const form = document.getElementById('contact-form');
        if (form) {
            form.setAttribute('novalidate', '');
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.setAttribute('aria-describedby', `${input.id}-help`);
            });
        }
    }
    
    initFocusManagement() {
        // Add visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .btn-cyber:focus,
            .nav-link:focus,
            .category-btn:focus,
            input:focus,
            textarea:focus {
                outline: 2px solid #00ffff;
                outline-offset: 2px;
            }
            
            /* Skip link for screen readers */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #00ffff;
                color: #000;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                z-index: 10000;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);
        
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    initScreenReaderSupport() {
        // Add live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        `;
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }
    
    announce(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            this.announce(`Navigated to ${sectionId} section`);
        }
    }
    
    showToast(message, type = 'success') {
        if (window.Toast) {
            window.Toast.show(message, type);
        } else {
            // Fallback toast
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#00ff88' : '#ff5555'};
                color: #000;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-family: 'JetBrains Mono', monospace;
                z-index: 10001;
                animation: slideInRight 0.3s ease-out;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
        
        // Announce to screen readers
        this.announce(message);
    }
    
    // ✅ Fixed onResize method
    onResize() {
        // Handle responsive behavior
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (window.innerWidth > 768) {
            if (navMenu) {
                navMenu.classList.remove('active');
                navMenu.setAttribute('aria-hidden', 'true');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Update particles based on screen size
        if (window.innerWidth < 768 && typeof window.pJSDom !== 'undefined') {
            // Reduce particles on mobile
            if (window.pJSDom[0].pJS.particles.number.value > 15) {
                window.pJSDom[0].pJS.particles.number.value = 15;
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }
    }
    
    // ✅ Fixed onScroll method
    onScroll() {
        // Scroll handling is done in initNavbarEffects
        // This method can be used for other scroll-based functionality
    }
}

// ========== INITIALIZE OPTIMIZED APPLICATION ========== //
const portfolio = new OptimizedPortfolioApp();

// Export for debugging and external access
if (typeof window !== 'undefined') {
    window.portfolio = portfolio;
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
        
        // Show user-friendly error message
        if (portfolio && typeof portfolio.showToast === 'function') {
            portfolio.showToast('Đã xảy ra lỗi nhỏ, trang web vẫn hoạt động bình thường.', 'error');
        }
    });
    
    // Performance monitoring
    window.addEventListener('load', () => {
        // Log performance metrics
        if (performance && performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📊 Page loaded in ${loadTime}ms`);
        }
        
        // Check for layout shifts
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.value > 0.1) {
                        console.warn('⚠️ Layout shift detected:', entry.value);
                    }
                }
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    });
}

console.log('🚀 Optimized Portfolio Application loaded successfully - FIXED!');

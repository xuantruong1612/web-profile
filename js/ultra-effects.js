// ========== ULTRA MODERN EFFECTS 2025 - COMPLETE FILE ========== //

/* ========== 1. TEXT SCRAMBLE EFFECT ========== */
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span style="color: #00ffff">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.element.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* ========== 2. MAGNETIC FIELD INTERACTIONS ========== */
class MagneticField {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic');
        this.strength = 0.3;
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Calculate distance and magnetic strength
                const distance = Math.sqrt(x*x + y*y);
                const maxDistance = Math.max(rect.width, rect.height);
                const strength = Math.min(distance / maxDistance, 1);
                
                // Apply magnetic transformation
                el.style.transform = `
                    perspective(1000px)
                    translate(${x * this.strength}px, ${y * this.strength}px) 
                    scale(${1 + strength * 0.05})
                    rotateX(${y * strength * 0.1}deg)
                    rotateY(${x * strength * 0.1}deg)
                `;
                
                // Add glow effect
                const glowIntensity = 1 - strength;
                el.style.boxShadow = `
                    0 0 ${20 * glowIntensity}px rgba(0, 255, 255, ${0.3 * glowIntensity})
                `;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.boxShadow = '';
            });
        });
    }
}

/* ========== 3. ENERGY FIELD PARTICLES ========== */
class EnergyField {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        this.container.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    createParticles() {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random() * 100 + 100,
                maxLife: 100,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 60 + 180,
                energy: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Reset particle if life is over
            if (particle.life <= 0) {
                particle.life = particle.maxLife;
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
            }
            
            // Draw particle
            const alpha = particle.life / particle.maxLife * particle.energy;
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 50%, ${alpha})`);
            gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const alpha = (100 - distance) / 100 * 0.3;
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

/* ========== 4. ADVANCED SCROLL REVEAL ========== */
class AdvancedScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const effect = entry.target.dataset.reveal;
                    this.applyEffect(entry.target, effect);
                }
            });
        }, observerOptions);
        
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    applyEffect(element, effect) {
        switch (effect) {
            case 'slide-up':
                element.classList.add('reveal-slide-up', 'visible');
                break;
            case 'fade-in':
                element.classList.add('reveal-fade-in', 'visible');
                break;
            case 'scale':
                element.classList.add('reveal-scale', 'visible');
                break;
            case 'scramble':
                const scramble = new TextScramble(element);
                scramble.setText(element.textContent);
                break;
        }
    }
}

/* ========== 5. LIQUID CURSOR TRAIL ========== */
class LiquidCursor {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
        
        this.animate();
    }
    
    addTrailPoint(x, y) {
        this.trail.push({
            x: x,
            y: y,
            life: 1,
            id: Date.now() + Math.random()
        });
        
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }
        
        // Create DOM element for trail point
        const trailEl = document.createElement('div');
        trailEl.className = 'liquid-cursor-trail';
        trailEl.style.left = x + 'px';
        trailEl.style.top = y + 'px';
        document.body.appendChild(trailEl);
        
        // Remove after animation
        setTimeout(() => trailEl.remove(), 2000);
    }
    
    animate() {
        this.trail.forEach((point, index) => {
            point.life -= 0.05;
            if (point.life <= 0) {
                this.trail.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

/* ========== 6. MORPHING LOADER ========== */
class MorphingLoader {
    constructor(element) {
        this.element = element;
        this.shapes = [
            'circle(50% at 50% 50%)',
            'polygon(50% 0%, 0% 100%, 100% 100%)',
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        ];
        this.currentShape = 0;
        this.init();
    }
    
    init() {
        this.element.style.clipPath = this.shapes[0];
        this.morph();
    }
    
    morph() {
        setInterval(() => {
            this.currentShape = (this.currentShape + 1) % this.shapes.length;
            this.element.style.clipPath = this.shapes[this.currentShape];
        }, 1000);
    }
}

/* ========== 7. GLASS CARD EFFECTS ========== */
class GlassCards {
    constructor() {
        this.cards = document.querySelectorAll('.glass-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${-rotateX}deg) 
                    rotateY(${rotateY}deg)
                    translateZ(20px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

/* ========== 8. ENHANCED SCRAMBLE FOR MULTIPLE ELEMENTS ========== */
function initEnhancedScramble() {
    // ✅ Apply scramble to specific selectors
    const scrambleSelectors = [
        '.hero-name',
        '.section-title', 
        '.glitch-text',
        '.terminal-title',
        '.nav-logo .logo-text',
        '.code-output',
        '[data-scramble]'
    ];
    
    scrambleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            const scramble = new TextScramble(element);
            const originalText = element.textContent;
            
            // Initial scramble with staggered delay
            setTimeout(() => {
                scramble.setText(originalText);
            }, index * 300);
            
            // Periodic scramble with different intervals
            const intervals = [6000, 8000, 10000, 12000];
            const intervalTime = intervals[index % intervals.length];
            
            setInterval(() => {
                scramble.setText(originalText);
            }, intervalTime);
            
            // Scramble on hover for interactive elements
            if (element.closest('.magnetic') || element.classList.contains('nav-link')) {
                element.addEventListener('mouseenter', () => {
                    scramble.setText(originalText);
                });
            }
            
            // Scramble when scrolled into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.scrambleViewed) {
                        scramble.setText(originalText);
                        entry.target.dataset.scrambleViewed = 'true';
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(element);
        });
    });
}

/* ========== INITIALIZATION ========== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Ultra Effects...');
    
    // Initialize all effects
    new MagneticField();
    new AdvancedScrollReveal();
    new GlassCards();
    
    // ✅ Initialize enhanced scramble for multiple elements
    setTimeout(() => {
        initEnhancedScramble();
    }, 500);
    
    // Initialize energy fields
    const energyContainers = document.querySelectorAll('.energy-field');
    energyContainers.forEach(container => {
        new EnergyField(container);
    });
    
    // Initialize liquid cursor (optional)
    if (window.matchMedia('(hover: hover)').matches) {
        new LiquidCursor();
    }
    
    // Initialize morphing loaders
    const morphingElements = document.querySelectorAll('.morphing-loader');
    morphingElements.forEach(element => {
        new MorphingLoader(element);
    });
    
    console.log('🎨 Ultra modern effects initialized!');
});

// Export for global access
if (typeof window !== 'undefined') {
    window.UltraEffects = {
        TextScramble,
        MagneticField,
        EnergyField,
        AdvancedScrollReveal,
        LiquidCursor,
        MorphingLoader,
        GlassCards,
        initEnhancedScramble
    };
}

console.log('✨ Ultra Effects System Loaded');

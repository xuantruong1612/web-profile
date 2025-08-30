// ========== ADVANCED ANIMATION CONTROLLER ========== //
class AdvancedAnimations {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.neuralNetwork = null;
        this.matrixRain = null;
        this.geometricShapes = [];
        
        this.init();
    }
    
    init() {
        if (this.isReducedMotion) {
            console.log('Reduced motion detected - skipping advanced animations');
            return;
        }
        
        this.createNeuralNetwork();
        this.createMatrixRain();
        this.createFloatingGeometry();
        this.initCyberHUD();
        this.init3DTilt();
        this.initAdvancedParticles();
        this.initGlitchEffects();
    }
    
    createNeuralNetwork() {
        const container = document.createElement('div');
        container.className = 'neural-network';
        document.body.appendChild(container);
        
        const nodes = [];
        const connections = [];
        
        // Create nodes
        for (let i = 0; i < 20; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(node);
            nodes.push({
                element: node,
                x: parseFloat(node.style.left),
                y: parseFloat(node.style.top)
            });
        }
        
        // Create connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) + 
                    Math.pow(nodes[i].y - nodes[j].y, 2)
                );
                
                if (distance < 30) {
                    const connection = document.createElement('div');
                    connection.className = 'neural-connection';
                    
                    const angle = Math.atan2(
                        nodes[j].y - nodes[i].y,
                        nodes[j].x - nodes[i].x
                    ) * 180 / Math.PI;
                    
                    connection.style.left = nodes[i].x + '%';
                    connection.style.top = nodes[i].y + '%';
                    connection.style.width = distance + 'vw';
                    connection.style.transform = `rotate(${angle}deg)`;
                    connection.style.animationDelay = Math.random() * 2 + 's';
                    
                    container.appendChild(connection);
                }
            }
        }
        
        this.neuralNetwork = container;
    }
    
    createMatrixRain() {
        const container = document.createElement('div');
        container.className = 'matrix-rain';
        document.body.appendChild(container);
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        container.appendChild(canvas);
        
        const matrix = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const matrixArray = matrix.split('');
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const matrixInterval = setInterval(drawMatrix, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        this.matrixRain = {
            container,
            interval: matrixInterval
        };
    }
    
    createFloatingGeometry() {
        const container = document.createElement('div');
        container.className = 'geometric-bg';
        document.body.appendChild(container);
        
        const shapes = [
            { type: 'triangle', color: 'linear-gradient(45deg, #00ffff, #ff00ff)' },
            { type: 'circle', color: 'linear-gradient(45deg, #ff00ff, #00ff88)' },
            { type: 'hexagon', color: 'linear-gradient(45deg, #00ff88, #ffff00)' },
            { type: 'diamond', color: 'linear-gradient(45deg, #ffff00, #00ffff)' },
            { type: 'star', color: 'linear-gradient(45deg, #ff00ff, #ffff00)' }
        ];
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            shape.style.background = shapeType.color;
            shape.style.width = (50 + Math.random() * 100) + 'px';
            shape.style.height = (50 + Math.random() * 100) + 'px';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 20 + 's';
            shape.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Apply different clip-paths based on type
            switch (shapeType.type) {
                case 'triangle':
                    shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                    break;
                case 'circle':
                    shape.style.borderRadius = '50%';
                    break;
                case 'hexagon':
                    shape.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
                    break;
                case 'diamond':
                    shape.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
                    break;
                case 'star':
                    shape.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                    break;
            }
            
            container.appendChild(shape);
            this.geometricShapes.push(shape);
        }
    }
    
    initCyberHUD() {
        const hud = document.createElement('div');
        hud.className = 'cyber-hud';
        
        // Add corner elements
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(corner => {
            const cornerEl = document.createElement('div');
            cornerEl.className = `hud-corner ${corner}`;
            hud.appendChild(cornerEl);
        });
        
        // Add scanning line
        const scanline = document.createElement('div');
        scanline.className = 'hud-scanline';
        hud.appendChild(scanline);
        
        document.body.appendChild(hud);
    }
    
    init3DTilt() {
        const tiltElements = document.querySelectorAll('.skill-card, .project-card, .stat-card');
        
        tiltElements.forEach(element => {
            element.classList.add('interactive-element');
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                `;
                
                // Update gradient based on mouse position
                const gradientX = (x / rect.width) * 100;
                const gradientY = (y / rect.height) * 100;
                
                element.style.background = `
                    radial-gradient(circle at ${gradientX}% ${gradientY}%, 
                    rgba(0, 255, 255, 0.1) 0%,
                    rgba(255, 0, 255, 0.05) 50%,
                    transparent 100%),
                    rgba(0, 0, 0, 0.7)
                `;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
                element.style.background = '';
            });
        });
    }
    
    initAdvancedParticles() {
        // Enhanced particle system with physics
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2';
        canvas.style.opacity = '0.6';
        
        document.getElementById('particles-js')?.appendChild(canvas);
        
        let particles = [];
        let mouse = { x: 0, y: 0 };
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        class AdvancedParticle {
            constructor() {
                this.reset();
                this.life = Math.random() * 100 + 100;
                this.maxLife = this.life;
                this.connections = [];
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 3 + 1;
                this.hue = Math.random() * 60 + 180;
                this.opacity = Math.random() * 0.5 + 0.5;
                this.trail = [];
            }
            
            update() {
                // Mouse attraction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.vx += (dx / distance) * force * 0.01;
                    this.vy += (dy / distance) * force * 0.01;
                }
                
                // Apply velocity
                this.x += this.vx;
                this.y += this.vy;
                
                // Add to trail
                this.trail.unshift({ x: this.x, y: this.y });
                if (this.trail.length > 10) this.trail.pop();
                
                // Boundary wrapping
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
                
                // Life cycle
                this.life--;
                if (this.life <= 0) {
                    this.reset();
                    this.life = this.maxLife;
                }
            }
            
            draw() {
                const alpha = this.opacity * (this.life / this.maxLife);
                
                // Draw trail
                for (let i = 0; i < this.trail.length; i++) {
                    const point = this.trail[i];
                    const trailAlpha = alpha * (1 - i / this.trail.length);
                    
                    ctx.save();
                    ctx.globalAlpha = trailAlpha;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, this.size * (1 - i / this.trail.length), 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
                    ctx.fill();
                    
                    // Glow effect
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
                    ctx.fill();
                    ctx.restore();
                }
                
                // Draw main particle
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
                ctx.fill();
                
                // Enhanced glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Create particles
        for (let i = 0; i < 80; i++) {
            particles.push(new AdvancedParticle());
        }
        
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw advanced connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const opacity = (120 - distance) / 120 * 0.3;
                        const gradient = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        
                        gradient.addColorStop(0, `hsla(${particles[i].hue}, 100%, 50%, ${opacity})`);
                        gradient.addColorStop(0.5, `hsla(${(particles[i].hue + particles[j].hue) / 2}, 100%, 50%, ${opacity * 0.5})`);
                        gradient.addColorStop(1, `hsla(${particles[j].hue}, 100%, 50%, ${opacity})`);
                        
                        ctx.save();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.hero-name, .section-title');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
            element.classList.add('glitch-title');
            
            // Random glitch trigger
            setInterval(() => {
                if (Math.random() > 0.95) {
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 50);
                }
            }, 1000);
        });
    }
    
    destroy() {
        // Cleanup function
        if (this.neuralNetwork) this.neuralNetwork.remove();
        if (this.matrixRain) {
            clearInterval(this.matrixRain.interval);
            this.matrixRain.container.remove();
        }
        
        this.geometricShapes.forEach(shape => shape.remove());
        
        const hud = document.querySelector('.cyber-hud');
        if (hud) hud.remove();
    }
}

// ========== AI ASSISTANT INTEGRATION ========== //
class AIAssistant {
    constructor() {
        this.responses = [
            "🤖 Analyzing your portfolio journey...",
            "🚀 Impressive tech stack detected!",
            "⚡ Performance optimization recommended!",
            "🎯 Ready to build amazing projects together?",
            "💡 Your creativity levels are off the charts!",
            "🔥 This portfolio is absolutely stunning!",
            "🌟 Future tech leader in the making!",
            "🎨 Perfect blend of design and functionality!"
        ];
        
        this.createAssistant();
    }
    
    createAssistant() {
        const assistant = document.createElement('div');
        assistant.innerHTML = `
            <div id="ai-assistant" class="ai-assistant">
                <div class="ai-avatar">
                    <div class="ai-face">
                        <div class="ai-eye left"></div>
                        <div class="ai-eye right"></div>
                        <div class="ai-mouth"></div>
                    </div>
                </div>
                <div class="ai-message" id="ai-message">
                    Welcome! I'm your AI assistant 🤖
                </div>
            </div>
        `;
        
        // Add styles
        const styles = `
            .ai-assistant {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: rgba(0, 0, 0, 0.9);
                border: 2px solid #00ffff;
                border-radius: 20px;
                padding: 1rem;
                max-width: 300px;
                backdrop-filter: blur(20px);
                z-index: 1000;
                opacity: 0;
                transform: translateY(100px);
                transition: all 0.5s ease;
                cursor: pointer;
            }
            
            .ai-assistant.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .ai-avatar {
                width: 50px;
                height: 50px;
                background: linear-gradient(45deg, #00ffff, #ff00ff);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                animation: aiPulse 2s ease-in-out infinite;
            }
            
            .ai-face {
                position: relative;
                width: 30px;
                height: 30px;
            }
            
            .ai-eye {
                width: 6px;
                height: 6px;
                background: #000;
                border-radius: 50%;
                position: absolute;
                top: 8px;
                animation: aiBlink 3s infinite;
            }
            
            .ai-eye.left { left: 6px; }
            .ai-eye.right { right: 6px; }
            
            .ai-mouth {
                width: 12px;
                height: 6px;
                border: 2px solid #000;
                border-top: none;
                border-radius: 0 0 12px 12px;
                position: absolute;
                bottom: 6px;
                left: 50%;
                transform: translateX(-50%);
                animation: aiTalk 1s ease-in-out infinite;
            }
            
            .ai-message {
                color: #00ffff;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9rem;
                text-align: center;
                line-height: 1.4;
            }
            
            @keyframes aiPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes aiBlink {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.1); }
            }
            
            @keyframes aiTalk {
                0%, 100% { transform: translateX(-50%) scaleY(1); }
                50% { transform: translateX(-50%) scaleY(0.8); }
            }
            
            @media (max-width: 768px) {
                .ai-assistant {
                    bottom: 20px;
                    right: 20px;
                    max-width: 250px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(assistant);
        
        // Show assistant after delay
        setTimeout(() => {
            assistant.querySelector('.ai-assistant').classList.add('show');
        }, 3000);
        
        // Add click interaction
        assistant.addEventListener('click', () => {
            this.showRandomMessage();
        });
        
        // Auto messages
        this.startAutoMessages();
    }
    
    showRandomMessage() {
        const messageEl = document.getElementById('ai-message');
        const randomResponse = this.responses[Math.floor(Math.random() * this.responses.length)];
        
        messageEl.style.opacity = '0';
        setTimeout(() => {
            messageEl.textContent = randomResponse;
            messageEl.style.opacity = '1';
        }, 300);
    }
    
    startAutoMessages() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.showRandomMessage();
            }
        }, 10000);
    }
}

// ========== INITIALIZE ADVANCED FEATURES ========== //
document.addEventListener('DOMContentLoaded', () => {
    // Initialize advanced animations
    setTimeout(() => {
        window.advancedAnimations = new AdvancedAnimations();
        window.aiAssistant = new AIAssistant();
    }, 2000);
});

console.log('🎆 Advanced animations loaded!');

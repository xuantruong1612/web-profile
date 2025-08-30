// ========== OPTIMIZED PARTICLES CONFIGURATION ========== //
window.initParticles = function() {
    // Check if particles.js is loaded
    if (typeof particlesJS === 'undefined') {
        console.warn('particles.js not loaded, creating fallback animation');
        createFallbackParticles();
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 25, // ✅ Giảm từ 100 xuống 25
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00ffff', '#ff00ff', '#00ff88'] // ✅ Màu sắc tối ưu
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3, // ✅ Giảm opacity
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5, // ✅ Giảm tốc độ animation
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2, // ✅ Giảm size
                random: true,
                anim: {
                    enable: true,
                    speed: 1, // ✅ Giảm tốc độ
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 100, // ✅ Giảm distance
                color: '#00ffff',
                opacity: 0.2, // ✅ Giảm opacity
                width: 1
            },
            move: {
                enable: true,
                speed: 1, // ✅ Giảm tốc độ
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false // ✅ Tắt hover interaction
                },
                onclick: {
                    enable: false // ✅ Tắt click interaction
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100, // ✅ Giảm distance
                    duration: 0.2 // ✅ Giảm duration
                },
                push: {
                    particles_nb: 2 // ✅ Giảm số particles thêm
                }
            }
        },
        retina_detect: true
    });
};

// ========== OPTIMIZED FALLBACK PARTICLES ========== //
function createFallbackParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');
    
    if (!particlesContainer) return;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    particlesContainer.appendChild(canvas);
    
    let particles = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simplified Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1; // ✅ Giảm tốc độ
            this.vy = (Math.random() - 0.5) * 1;
            this.color = `hsl(${180 + Math.random() * 60}, 100%, 50%)`;
            this.size = Math.random() * 2 + 1; // ✅ Giảm size
            this.opacity = Math.random() * 0.3 + 0.2; // ✅ Giảm opacity
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary check
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create fewer particles
    for (let i = 0; i < 20; i++) { // ✅ Giảm từ 50 xuống 20
        particles.push(new Particle());
    }
    
    // Optimized animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Simplified connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) { // ✅ Giảm distance
                    ctx.save();
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2; // ✅ Giảm opacity
                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

console.log('🌟 Optimized particles loaded');

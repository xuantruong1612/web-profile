// ========== BEAUTIFUL SMOOTH CUSTOM CURSOR - FIXED ========== //
class BeautifulCursor {
    constructor() {
        this.cursor = null;
        this.cursorInner = null;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.cursorX = this.mouseX;
        this.cursorY = this.mouseY;
        this.innerX = this.mouseX;
        this.innerY = this.mouseY;
        this.isVisible = true;
        
        this.createCursor();
        this.initEvents();
        this.animate();
    }
    
    createCursor() {
        // Check if device supports hover
        if (!window.matchMedia('(hover: hover)').matches) {
            return; // Don't create cursor on touch devices
        }
        
        // Outer cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 32px;
            height: 32px;
            border: 2px solid rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.1);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(3px);
            mix-blend-mode: difference;
            will-change: transform;
            contain: layout style paint;
        `;
        
        // Inner cursor dot
        this.cursorInner = document.createElement('div');
        this.cursorInner.className = 'custom-cursor-inner';
        this.cursorInner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 6px;
            height: 6px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.3);
            will-change: transform;
            contain: layout style paint;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorInner);
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';
    }
    
    initEvents() {
        if (!this.cursor) return;
        
        // Mouse move - throttled for performance
        let mouseMoveTimeout;
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Show cursor if hidden
            if (!this.isVisible) {
                this.show();
            }
            
            // Clear hide timeout
            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(() => {
                // Optional: Hide cursor after inactivity
            }, 3000);
        }, { passive: true });
        
        // Interactive elements selector
        const interactiveSelector = `
            a, button, .btn-cyber, .category-btn, .project-card, .skill-card,
            .social-link, .nav-link, input, textarea, .contact-method,
            .project-link, .tech-tag, [data-cursor="pointer"]
        `;
        
        // ✅ FIX: Check if target is Element and has matches method
        document.addEventListener('mouseenter', (e) => {
            if (e.target && 
                e.target.nodeType === Node.ELEMENT_NODE && 
                typeof e.target.matches === 'function' && 
                e.target.matches(interactiveSelector)) {
                this.expand();
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target && 
                e.target.nodeType === Node.ELEMENT_NODE && 
                typeof e.target.matches === 'function' && 
                e.target.matches(interactiveSelector)) {
                this.contract();
            }
        }, true);
        
        // Click effects
        document.addEventListener('mousedown', () => this.click(), { passive: true });
        document.addEventListener('mouseup', () => this.release(), { passive: true });
        
        // Hide/show on page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.hide();
            } else {
                this.show();
            }
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => this.hide());
        document.addEventListener('mouseenter', () => this.show());
        
        // Handle focus states
        document.addEventListener('focusin', (e) => {
            if (e.target && e.target.matches && e.target.matches('input, textarea, select')) {
                this.cursor.style.borderColor = 'rgba(255, 0, 255, 0.8)';
                this.cursorInner.style.background = '#ff00ff';
            }
        });
        
        document.addEventListener('focusout', () => {
            this.cursor.style.borderColor = 'rgba(0, 255, 255, 0.6)';
            this.cursorInner.style.background = '#00ffff';
        });
    }
    
    animate() {
        if (!this.cursor) return;
        
        // Smooth following with different speeds for outer and inner cursor
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;
        
        this.innerX += (this.mouseX - this.innerX) * 0.8;
        this.innerY += (this.mouseY - this.innerY) * 0.8;
        
        // ✅ FIX: Use transform3d for better performance and avoid layout shifts
        this.cursor.style.transform = `translate3d(${this.cursorX - 16}px, ${this.cursorY - 16}px, 0)`;
        this.cursorInner.style.transform = `translate3d(${this.innerX - 3}px, ${this.innerY - 3}px, 0)`;
        
        requestAnimationFrame(() => this.animate());
    }
    
    expand() {
        if (!this.cursor) return;
        
        // ✅ FIX: Use transform instead of changing width/height to avoid layout shifts
        this.cursor.style.transform += ' scale(1.5625)'; // 50px/32px = 1.5625
        this.cursor.style.borderColor = 'rgba(0, 255, 255, 0.8)';
        this.cursor.style.background = 'rgba(0, 255, 255, 0.05)';
        
        this.cursorInner.style.transform += ' scale(1.33)'; // 8px/6px = 1.33
        this.cursorInner.style.boxShadow = '0 0 15px #00ffff, 0 0 30px rgba(0, 255, 255, 0.5)';
    }
    
    contract() {
        if (!this.cursor) return;
        
        // ✅ FIX: Remove scale transform to return to original size
        this.cursor.style.transform = this.cursor.style.transform.replace(' scale(1.5625)', '');
        this.cursor.style.borderColor = 'rgba(0, 255, 255, 0.6)';
        this.cursor.style.background = 'rgba(0, 255, 255, 0.1)';
        
        this.cursorInner.style.transform = this.cursorInner.style.transform.replace(' scale(1.33)', '');
        this.cursorInner.style.boxShadow = '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.3)';
    }
    
    click() {
        if (!this.cursor) return;
        
        this.cursor.style.transform += ' scale(0.9)';
        this.cursorInner.style.transform += ' scale(1.5)';
        this.cursorInner.style.background = '#ff00ff';
        
        // Add ripple effect
        this.createRipple();
    }
    
    release() {
        if (!this.cursor) return;
        
        this.cursor.style.transform = this.cursor.style.transform.replace(' scale(0.9)', '');
        this.cursorInner.style.transform = this.cursorInner.style.transform.replace(' scale(1.5)', '');
        this.cursorInner.style.background = '#00ffff';
    }
    
    createRipple() {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: ${this.mouseY}px;
            left: ${this.mouseX}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9997;
            animation: rippleEffect 0.6s ease-out forwards;
            contain: layout style paint;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    hide() {
        if (!this.cursor) return;
        
        this.isVisible = false;
        this.cursor.style.opacity = '0';
        this.cursorInner.style.opacity = '0';
    }
    
    show() {
        if (!this.cursor) return;
        
        this.isVisible = true;
        this.cursor.style.opacity = '1';
        this.cursorInner.style.opacity = '1';
    }
    
    destroy() {
        if (this.cursor) {
            this.cursor.remove();
            this.cursorInner.remove();
            document.body.style.cursor = '';
            document.documentElement.style.cursor = '';
        }
    }
}

// ✅ FIX: Enhanced CSS to prevent layout shifts
const enhancedCursorCSS = `
@keyframes rippleEffect {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        width: 100px;
        height: 100px;
        opacity: 0;
    }
}

/* Prevent layout shifts */
.custom-cursor,
.custom-cursor-inner {
    contain: layout style paint;
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
}

/* Optimize performance */
@media (prefers-reduced-motion: reduce) {
    .custom-cursor,
    .custom-cursor-inner {
        transition: none !important;
        animation: none !important;
    }
}

/* Hide cursor on touch devices */
@media (hover: none) {
    .custom-cursor,
    .custom-cursor-inner {
        display: none !important;
    }
}
`;

const cursorStyleSheet = document.createElement('style');
cursorStyleSheet.textContent = enhancedCursorCSS;
document.head.appendChild(cursorStyleSheet);

// Initialize beautiful cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        window.beautifulCursor = new BeautifulCursor();
        console.log('✨ Enhanced cursor initialized');
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.beautifulCursor) {
        window.beautifulCursor.destroy();
    }
});

console.log('🎯 Enhanced cursor system loaded');

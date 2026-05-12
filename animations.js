/* ==============================================
   ANIMATIONS JAVASCRIPT - ADVANCED EFFECTS
   ============================================== */

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = window.scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Reveal on Scroll
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Counter Animation
class CounterAnimation {
    constructor(element, startValue = 0, endValue = 100, duration = 2000) {
        this.element = element;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.currentValue = startValue;
        this.startTime = null;
    }
    
    start() {
        this.startTime = Date.now();
        this.animate();
    }
    
    animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        this.currentValue = this.startValue + (this.endValue - this.startValue) * progress;
        
        if (this.currentValue % 1 > 0.5) {
            this.element.textContent = Math.ceil(this.currentValue);
        } else {
            this.element.textContent = Math.floor(this.currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

// Smooth Scroll Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, text, speed = 50, deleteSpeed = 30) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.index = 0;
        this.isDeleting = false;
    }
    
    start() {
        this.type();
    }
    
    type() {
        if (this.isDeleting) {
            this.element.textContent = this.text.substring(0, this.index - 1);
            this.index--;
        } else {
            this.element.textContent = this.text.substring(0, this.index + 1);
            this.index++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;
        
        if (!this.isDeleting && this.index === this.text.length) {
            typeSpeed = 2000; // Pause before deleting
            this.isDeleting = true;
        } else if (this.isDeleting && this.index === 0) {
            this.isDeleting = false;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            this.ctx.fillStyle = `rgba(46, 204, 113, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Page Transition
class PageTransition {
    constructor() {
        this.transitionDuration = 300;
    }
    
    fadeOut(callback) {
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(46, 204, 113, 0.9);
            z-index: 9999;
            animation: fadeOut ${this.transitionDuration}ms ease-in-out;
        `;
        
        document.body.appendChild(transition);
        
        setTimeout(() => {
            if (callback) callback();
            transition.remove();
        }, this.transitionDuration);
    }
    
    fadeIn() {
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(46, 204, 113, 0.9);
            z-index: 9999;
            opacity: 0;
            animation: fadeIn ${this.transitionDuration}ms ease-in-out;
        `;
        
        document.body.appendChild(transition);
        
        setTimeout(() => {
            transition.remove();
        }, this.transitionDuration);
    }
}

// Hover Ripple Effect
class RippleEffect {
    static init() {
        document.addEventListener('click', (e) => {
            const buttons = document.querySelectorAll('.btn, button');
            buttons.forEach(button => {
                if (button.contains(e.target)) {
                    RippleEffect.create(e, button);
                }
            });
        });
    }
    
    static create(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Keyboard Shortcuts
class KeyboardShortcuts {
    static init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Search initiated');
            }
            
            // Ctrl/Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                console.log('Help menu opened');
            }
            
            // Esc to close modals
            if (e.key === 'Escape') {
                const chatbot = document.getElementById('chatbot');
                if (chatbot && chatbot.classList.contains('open')) {
                    chatbot.classList.remove('open');
                }
            }
        });
    }
}

// Analytics Tracking
class Analytics {
    static trackPageView(pageName) {
        console.log(`Page View: ${pageName}`);
        // Send to analytics service
    }
    
    static trackEvent(eventName, eventData) {
        console.log(`Event: ${eventName}`, eventData);
        // Send to analytics service
    }
    
    static trackConversion(conversionName) {
        console.log(`Conversion: ${conversionName}`);
        // Send to analytics service
    }
}

// Form Validation
class FormValidator {
    static validate(form) {
        const formData = new FormData(form);
        const errors = {};
        
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                errors[key] = `${key} is required`;
            }
        }
        
        return Object.keys(errors).length === 0;
    }
    
    static showErrors(form, errors) {
        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.classList.add('error');
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = errors[fieldName];
                field.parentNode.appendChild(errorMsg);
            }
        });
    }
    
    static clearErrors(form) {
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        form.querySelectorAll('.error-message').forEach(msg => {
            msg.remove();
        });
    }
}

// Local Storage Manager
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
    
    static get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Storage error:', error);
            return null;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
    
    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
}

// Service Worker Registration
class ServiceWorkerManager {
    static register() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered:', registration))
                .catch(error => console.log('SW registration failed:', error));
        }
    }
}

// Export Classes
window.CounterAnimation = CounterAnimation;
window.TypewriterEffect = TypewriterEffect;
window.ParticleSystem = ParticleSystem;
window.PageTransition = PageTransition;
window.RippleEffect = RippleEffect;
window.KeyboardShortcuts = KeyboardShortcuts;
window.Analytics = Analytics;
window.FormValidator = FormValidator;
window.StorageManager = StorageManager;
window.ServiceWorkerManager = ServiceWorkerManager;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initRevealOnScroll();
    initSmoothScroll();
    initLazyLoading();
    RippleEffect.init();
    KeyboardShortcuts.init();
    
    // Track page view
    Analytics.trackPageView('Home');
});

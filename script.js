// Matrix Rain Animation
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()+-=[]{}|;:,.<>?';
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.drops = [];
        
        this.initializeCanvas();
        this.startAnimation();
    }
    
    initializeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columns = this.canvas.width / this.fontSize;
        for (let x = 0; x < columns; x++) {
            this.drops[x] = 1;
        }
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = this.fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    startAnimation() {
        setInterval(() => this.draw(), 70);
    }
}

// Cyberpunk HUD System
class CyberpunkHUD {
    constructor() {
        this.initializeHUD();
    }
    
    initializeHUD() {
        // Add scan lines effect
        this.createScanLines();
        // Add random system alerts
        this.startSystemAlerts();
    }
    
    createScanLines() {
        const scanLines = document.createElement('div');
        scanLines.className = 'scan-lines';
        scanLines.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
            background: linear-gradient(transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px, transparent 4px);
            background-size: 100% 4px;
            animation: scan-lines 0.1s linear infinite;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scan-lines {
                0% { transform: translateY(0); }
                100% { transform: translateY(4px); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(scanLines);
    }
        
    startSystemAlerts() {
        const alerts = [
            'NEURAL_LINK: ESTABLISHED',
            'ENCRYPTION: AES-256',
            'FIREWALL: ACTIVE',
            'QUANTUM_TUNNEL: STABLE',
            'BIOMETRIC: VERIFIED'
        ];
        
        setInterval(() => {
            if (Math.random() > 0.97) {
                this.showAlert(alerts[Math.floor(Math.random() * alerts.length)]);
            }
        }, 2000);
    }
    
    showAlert(message) {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            bottom: 120px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid var(--matrix-green);
            border-left: 3px solid var(--matrix-green);
            padding: 0.5rem 1rem;
            color: var(--matrix-green);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        alert.textContent = message;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
}

// Enhanced Typing Animation
class AdvancedTypingAnimation {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.loop = options.loop !== false;
        
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
                return;
            }
            
            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                if (this.loop && this.texts.length > 1) {
                    setTimeout(() => {
                        this.isDeleting = true;
                        this.type();
                    }, this.pauseTime);
                }
                return;
            }
            
            setTimeout(() => this.type(), this.typeSpeed);
        }
    }
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize matrix rain
    window.matrixRain = new MatrixRain();
    
    // Initialize cyberpunk HUD
    window.cyberpunkHUD = new CyberpunkHUD();
    
    // Enhanced hero typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
         
         const commands =[
            'echo /dev/cybersec_analyst',
            'echo /dev/software_engineer',
            'echo /dev/pentester',
            'echo /dev/tech_enthusiast',
            'echo /dev/ai_researcher',
            'echo /dev/opensource_contributor',
        ];
        new AdvancedTypingAnimation(typingElement, commands, {
            typeSpeed: 100,
            deleteSpeed: 60,
            pauseTime: 2000,
            loop: true
        });
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                mobileMenu.classList.remove('active');
            }
        });
    });
});

// Skill bar animations on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}

// Scroll event listener for animations
window.addEventListener('scroll', function() {
    animateSkillBars();
});

// Initialize animations on load
window.addEventListener('load', function() {
    animateSkillBars();
});

// Add glow effect to navigation links on hover
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px var(--matrix-green)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
});

// Parallax effect for hero background code
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach((block, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        block.style.transform = `translateY(${yPos}px) ${block.style.transform.replace(/translateY\([^)]*\)/, '')}`;
    });
});

// Add matrix rain effect (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Add terminal cursor blinking to other elements
document.addEventListener('DOMContentLoaded', function() {
    const blinkElements = document.querySelectorAll('.terminal-blink');
    
    blinkElements.forEach(element => {
        setInterval(() => {
            element.style.opacity = element.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
});

// Copy email to clipboard functionality
function copyEmail() {
    const email = 'nairityatale@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        // Show feedback
        const emailBtn = document.querySelector('a[href^="mailto:"]');
        const originalText = emailBtn.innerHTML;
        emailBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        emailBtn.style.background = 'var(--matrix-green)';
        
        setTimeout(() => {
            emailBtn.innerHTML = originalText;
            emailBtn.style.background = '';
        }, 2000);
    });
}

// Add click event to email button for copy functionality
document.addEventListener('DOMContentLoaded', function() {
    const emailBtn = document.querySelector('a[href^="mailto:"]');
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            copyEmail();
        });
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add loading screen (optional)
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div style="text-align: center; color: var(--matrix-green); font-family: 'JetBrains Mono', monospace;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">/nt_hompage <style="font-size: 1rem;">Initializing...<span style="animation: terminal-blink 1s infinite;">█</span></div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen (uncomment to enable)
showLoadingScreen();
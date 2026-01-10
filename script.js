// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const elements = section.querySelectorAll('.timeline-item, .education-card, .career-item, .achievement-card');
        
        elements.forEach((el, elIndex) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${elIndex * 0.1}s`;
        });
    });

    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax);

    // Timeline animation
    const careerItems = document.querySelectorAll('.career-item');
    
    function animateTimeline() {
        careerItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Initialize timeline items
    careerItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Initial check

    // Counter animation for achievements
    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Trigger counter animation when legacy section is visible
    const legacySection = document.querySelector('.legacy');
    const legacyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                legacyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (legacySection) {
        legacyObserver.observe(legacySection);
    }

    // Typewriter effect for hero title
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.education-card, .achievement-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title-line, .hero-subtitle, .hero-description, .cta-button');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Interactive timeline markers
    const careerMarkers = document.querySelectorAll('.career-marker');
    
    careerMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const careerItem = this.parentElement;
            const content = careerItem.querySelector('.career-content');
            
            // Toggle active state
            careerItem.classList.toggle('active');
            
            if (careerItem.classList.contains('active')) {
                content.style.transform = 'scale(1.05)';
                content.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            } else {
                content.style.transform = 'scale(1)';
                content.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        body.loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
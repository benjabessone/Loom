// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const header = document.querySelector('.header');
const faqItems = document.querySelectorAll('.faq-item');

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    console.log('Smooth scroll triggered');
    e.preventDefault();
    
    // Visual feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
    
    const targetId = this.getAttribute('href');
    console.log('Target ID:', targetId);
    const targetSection = document.querySelector(targetId);
    console.log('Target section found:', !!targetSection);
    
    if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        console.log('Scrolling to position:', targetPosition);
        
        // Always use JavaScript smooth scroll for consistent behavior
        const start = window.pageYOffset;
        const distance = targetPosition - start;
        const duration = 1000; // 1 second for smooth animation
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
        console.log('JavaScript smooth scroll animation started');
        
        // Update active nav link
        updateActiveNavLink(targetId);
        
        // Close mobile nav if open
        closeMobileNav();
    } else {
        console.error('Target section not found:', targetId);
    }
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Update active nav link based on scroll position
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + header.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(sectionId);
        }
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(25, 25, 40, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(110, 68, 255, 0.1)';
    } else {
        header.style.background = 'rgba(25, 25, 40, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Intersection Observer for animations
function createObserver() {
    // Skip animations on mobile devices to prevent flickering
    if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
        // On mobile, just make elements visible immediately
        const animatedElements = document.querySelectorAll(
            '.service-card, .testimonial-card, .section-header, .hero-content'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'none';
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .section-header, .hero-content'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Form validation and submission
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    const message = formData.get('message');
    if (!message || message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent)' : '#ff4757'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // In a real application, you would send the data to your server here
        console.log('Form data:', Object.fromEntries(formData));
    }, 2000);
}

// Floating cards animation enhancement
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    // Force clear all inline styles on mobile
    if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
        cards.forEach(card => {
            // Remove all inline styles that could interfere
            card.removeAttribute('style');
            // Allow subtle CSS animations but disable problematic transforms
            card.style.cssText = `
                transform: none !important; 
                position: static !important;
                top: auto !important;
                left: auto !important;
                right: auto !important;
                bottom: auto !important;
                will-change: auto !important;
            `;
            
            // Remove any event listeners that might interfere
            card.replaceWith(card.cloneNode(true));
        });
        return;
    }
    
    cards.forEach((card, index) => {
        // Clear any mobile styles first
        card.removeAttribute('style');
        
        // Only add hover effects on desktop
        if (window.matchMedia('(hover: hover)').matches) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
    });
}

// Service cards hover effect enhancement
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle glow effect
            card.style.boxShadow = '0 20px 60px rgba(110, 68, 255, 0.2), 0 0 0 1px rgba(110, 68, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

// Testimonial cards rotation
function rotateTestimonials() {
    // Skip rotation animations on mobile devices to prevent flickering
    if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.style.transform = 'none';
            card.style.borderColor = '';
            card.style.transition = 'none';
        });
        return;
    }
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function highlightTestimonial() {
        testimonialCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.borderColor = 'var(--accent-secondary)';
            } else {
                card.style.transform = '';
                card.style.borderColor = '';
            }
        });
        
        currentIndex = (currentIndex + 1) % testimonialCards.length;
    }
    
    // Highlight testimonials every 4 seconds
    if (testimonialCards.length > 0) {
        setInterval(highlightTestimonial, 4000);
    }
}

// Parallax effect for hero section
function addParallaxEffect() {
    // Disable parallax on mobile devices to prevent performance issues
    if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
        return;
    }
    
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Throttle scroll events for better performance
    const throttledScroll = throttle(() => {
        // Double-check mobile state on each scroll
        if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
            return;
        }
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
}

// FAQ Functionality
function toggleFaqItem() {
    this.classList.toggle('active');
}

// Initialize everything when DOM is loaded
function init() {
    console.log('Initializing landing page...');
    console.log('Nav links found:', navLinks.length);
    console.log('Nav toggle found:', !!navToggle);
    console.log('Header found:', !!header);
    
    // Initialize FAQ items
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // Navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
        console.log('Mobile nav toggle listener added');
    }
    
    // Add smooth scroll to navigation links
    navLinks.forEach((link, index) => {
        console.log(`Adding listener to nav link ${index}:`, link.getAttribute('href'));
        link.addEventListener('click', smoothScroll);
    });
    
    // Also add smooth scroll to hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach((button, index) => {
        console.log(`Adding listener to hero button ${index}:`, button.getAttribute('href'));
        button.addEventListener('click', function(e) {
            // Track button click
            if (typeof trackButtonClick === 'function') {
                trackButtonClick('hero_' + this.textContent.toLowerCase().replace(/\s+/g, '_'));
            }
            
            smoothScroll.call(this, e);
        });
    });
    
    // Scroll effects
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        updateNavOnScroll();
    });
    
    // Set initial active nav link
    updateActiveNavLink('#inicio');
    console.log('Initial active nav link set to #inicio');
    
    // Form handling with validation
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Track form submission
            if (typeof trackFormSubmission === 'function') {
                trackFormSubmission();
            }
            
            handleFormSubmission(e);
        });
    }
    
    // Animations and effects
    createObserver();
    enhanceFloatingCards();
    enhanceServiceCards();
    rotateTestimonials();
    addParallaxEffect();
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileNav();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', throttle(() => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
        // Re-apply mobile optimizations on resize
        enhanceFloatingCards();
        createObserver();
        rotateTestimonials();
        addParallaxEffect();
    }, 250));
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Form validation functions
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(e);
    
    // Validation rules
    switch(fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'El nombre es requerido';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'El email es requerido';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Por favor ingresa un email válido';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                errorMessage = 'Por favor ingresa un teléfono válido';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'El mensaje es requerido';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function clearError(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.name + '-error');
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function showError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function validateForm() {
    const form = document.querySelector('.contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        const event = { target: field };
        if (!validateField(event)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile nav with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileNav();
    }
    
    // Navigate with arrow keys when focus is on nav
    if (document.activeElement.classList.contains('nav-link')) {
        const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navLinks.length;
            navLinks[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
            navLinks[prevIndex].focus();
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events (remove duplicate listener)
// The scroll listener is already added in the init function with both handleHeaderScroll and updateNavOnScroll

// Export functions for potential external use
window.LandingPageJS = {
    toggleMobileNav,
    closeMobileNav,
    showNotification,
    init
};
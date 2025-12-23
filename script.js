/* =========================================
   TAMP CAFE — Interactive Experience
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCursorGlow();
    initMenuTabs();
    initReservationForm();
    initScrollAnimations();
    initSmoothScroll();
});

/* =========================================
   NAVIGATION
   ========================================= */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

/* =========================================
   CURSOR GLOW EFFECT
   ========================================= */

function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (!cursorGlow || window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const ease = 0.15;
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;
        
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
        
        requestAnimationFrame(animate);
    }

    animate();
}

/* =========================================
   MENU TABS
   ========================================= */

function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const sections = document.querySelectorAll('.menu-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-menu');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${target}-menu`) {
                    section.classList.add('active');
                }
            });
        });
    });
}

/* =========================================
   RESERVATION FORM
   ========================================= */

function initReservationForm() {
    const form = document.getElementById('reservation-form');
    const successMessage = document.getElementById('reservation-success');
    const successDetails = document.getElementById('success-details');
    const dateInput = document.getElementById('date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            guests: formData.get('guests'),
            date: formData.get('date'),
            time: formData.get('time'),
            occasion: formData.get('occasion'),
            requests: formData.get('requests')
        };

        // Format date
        const dateObj = new Date(data.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Format time
        const [hours, minutes] = data.time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        const formattedTime = `${displayHour}:${minutes} ${ampm}`;

        // Update success details
        successDetails.innerHTML = `
            <strong>${data.name}</strong><br>
            ${formattedDate} at ${formattedTime}<br>
            Party of ${data.guests}
            ${data.occasion ? `<br>Occasion: ${data.occasion.charAt(0).toUpperCase() + data.occasion.slice(1)}` : ''}
            ${data.requests ? `<br><br><em>"${data.requests}"</em>` : ''}
        `;

        // Show success message
        form.style.display = 'none';
        successMessage.classList.add('show');

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Log data (in production, send to server)
        console.log('Reservation submitted:', data);
    });
}

/* =========================================
   SCROLL ANIMATIONS
   ========================================= */

function initScrollAnimations() {
    // Add animation class to elements
    const animateElements = document.querySelectorAll(
        '.story-content, .story-visual, .philosophy-item, .menu-category, ' +
        '.gallery-item, .info-block, .visit-map, .reservation-header'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Create observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));
}

/* =========================================
   SMOOTH SCROLL
   ========================================= */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =========================================
   PARALLAX EFFECTS (Optional Enhancement)
   ========================================= */

function initParallax() {
    const hero = document.querySelector('.hero-bg');
    
    if (!hero || window.matchMedia('(max-width: 768px)').matches) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

/* =========================================
   IMAGE LAZY LOADING (For when real images are added)
   ========================================= */

function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* ================================================
   TAMP — Interactive Experience
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initNavigation();
    initMobileMenu();
    initMenuTabs();
    initReservationForm();
    initScrollAnimations();
    initSmoothScroll();
});

/* ================================================
   PRELOADER
   ================================================ */

function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000);
    });
}

/* ================================================
   CUSTOM CURSOR
   ================================================ */

function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animate() {
        // Cursor follows instantly
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Follower with delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .menu-item, .exp-card, .gallery-img');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ================================================
   NAVIGATION
   ================================================ */

function initNavigation() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
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

    sections.forEach(section => observer.observe(section));
}

/* ================================================
   MOBILE MENU
   ================================================ */

function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ================================================
   MENU TABS
   ================================================ */

function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const panels = document.querySelectorAll('.menu-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-panel') === target) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* ================================================
   RESERVATION FORM
   ================================================ */

function initReservationForm() {
    const form = document.getElementById('reservation-form');
    const success = document.getElementById('reserve-success');
    const successDetails = document.getElementById('success-details');
    const dateInput = document.getElementById('date');

    if (!form) return;

    // Set minimum date
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            guests: formData.get('guests'),
            date: formData.get('date'),
            time: formData.get('time'),
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

        // Update success message
        successDetails.innerHTML = `
            <strong>${data.name}</strong><br>
            ${formattedDate} at ${data.time}<br>
            Party of ${data.guests}
            ${data.requests ? `<br><br><em>"${data.requests}"</em>` : ''}
        `;

        // Show success
        form.style.display = 'none';
        success.classList.add('show');

        // Scroll to success
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });

        console.log('Reservation:', data);
    });
}

/* ================================================
   SCROLL ANIMATIONS
   ================================================ */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements
    const animateElements = document.querySelectorAll(
        '.exp-card, .menu-category, .story-text, .detail-item, .visual-image, .story-img'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80;
                const top = target.offsetTop - offset;
                
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================================
   PARALLAX (Optional)
   ================================================ */

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

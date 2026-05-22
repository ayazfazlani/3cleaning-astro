/**
 * H3cleaning Service — MAIN JAVASCRIPT
 * Mobile Nav | FAQ Accordion | Scroll Effects | Form
 */

// Animation keyframes (runs once)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(style);

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
    notification.style.cssText = `position:fixed;top:90px;right:1.5rem;background:${type === 'success' ? '#10b981' : '#ef4444'};color:white;padding:1rem 1.5rem;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.2);display:flex;align-items:center;gap:0.75rem;z-index:10000;animation:slideIn 0.3s ease;font-weight:500;`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/** @type {AbortController | null} */
let pageController = null;
/** @type {import('swiper').Swiper | null} */
let testimonialSwiper = null;

function revealElement(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function initPage() {
    // Tear down previous page listeners / swiper
    pageController?.abort();
    pageController = new AbortController();
    const { signal } = pageController;

    if (testimonialSwiper) {
        testimonialSwiper.destroy(true, true);
        testimonialSwiper = null;
    }

    // Mobile Navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';

        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        }, { signal });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }, { signal });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', function () {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        }, { signal });
    });

    // Scroll to Top
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        const onScroll = () => scrollTopBtn.classList.toggle('visible', window.pageYOffset > 500);
        onScroll();
        window.addEventListener('scroll', onScroll, { signal });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }), { signal });
    }

    // Smooth Scroll Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, { signal });
    });

    // Contact form — pre-fill service from URL
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        const serviceMap = {
            junk: 'junk-removal',
            pressure: 'pressure-washing',
            bin: 'trash-bin',
        };
        const param = new URLSearchParams(window.location.search).get('service');
        if (param && serviceMap[param]) {
            serviceSelect.value = serviceMap[param];
        }
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const payload = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'Unable to send your request.');
                }

                showNotification('Thank you! We will contact you shortly.', 'success');
                this.reset();
            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Something went wrong. Please call or WhatsApp us.';
                showNotification(msg, 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, { signal });
    }

    // Scroll-in animation — reveal immediately if already visible
    const animateSelector = '.service-card, .feature-item, .blog-card, .area-card, .testimonial-card';
    const animateEls = document.querySelectorAll(animateSelector);

    if (animateEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animateEls.forEach(el => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            if (isInViewport(el)) {
                revealElement(el);
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                observer.observe(el);
            }
        });
    }

    // Current Year
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = String(new Date().getFullYear());
    });

    // Swiper (testimonials)
    const swiperEl = document.querySelector('.testimonial-swiper');
    if (typeof Swiper !== 'undefined' && swiperEl) {
        testimonialSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            centeredSlides: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 30 },
            },
        });
    }
}

function boot() {
    // Run after paint so DOM from View Transitions is ready
    requestAnimationFrame(() => {
        requestAnimationFrame(initPage);
    });
}

// View Transitions: primary hook (first load + navigations)
document.addEventListener('astro:page-load', boot);

// First visit before ClientRouter is ready (no View Transitions / slow network)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
    boot();
}

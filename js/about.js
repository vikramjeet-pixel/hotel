/* ============================================================
   ABOUT.JS — Kings Court Hotel
   Scroll animations for timeline and story sections
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ─── Scroll Reveal Animation ─── */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ─── Timeline Marker Animation ─── */
    const timelineItems = document.querySelectorAll('.timeline__item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach((item, index) => {
        // Add inline transition delay for staggering
        item.style.transitionDelay = `${index * 100}ms`;
        // Initially hide (if CSS class didn't catch it, though .reveal-up does)
        // revealObserver handles the main animation. 
        // We can add a specific marker pop if we want.
    });

});

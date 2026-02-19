/* ============================================================
   OFFERS.JS — Kings Court Hotel
   Countdown timers, hero parallax, stat count-up,
   scroll reveal, loyalty form validation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ─── 1. Hero Parallax ─── */
    const heroBg = document.querySelector('.offers-hero__bg img');
    if (heroBg) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    heroBg.style.transform = `translateY(${scrollY * 0.16}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }


    /* ─── 2. Stat Count-Up ─── */
    const statNumbers = document.querySelectorAll('.offers-hero__stat-number[data-count]');
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
    const DURATION = 2000;

    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / DURATION, 1);
            const value = Math.round(easeOutCubic(progress) * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // Observe the stats strip
    const statsStrip = document.querySelector('.offers-hero__stats');
    if (statsStrip) {
        let counted = false;
        const statsObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    statNumbers.forEach(el => animateCount(el));
                }
            });
        }, { threshold: 0.5 });
        statsObs.observe(statsStrip);
    }


    /* ─── 3. Countdown Timers ─── */
    const countdownEls = document.querySelectorAll('[data-countdown]');

    function updateCountdown(container) {
        const endDateStr = container.getAttribute('data-countdown');
        const endDate = new Date(endDateStr).getTime();
        const now = Date.now();
        const diff = endDate - now;

        const daysEl = container.querySelector('[data-days]');
        const hoursEl = container.querySelector('[data-hours]');
        const minutesEl = container.querySelector('[data-minutes]');
        const secondsEl = container.querySelector('[data-seconds]');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            container.classList.add('expired');

            // Update title
            const titleEl = container.querySelector('.countdown__title');
            if (titleEl) {
                titleEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Offer has expired';
            }
            return false; // Signal to stop interval
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        return true; // Still counting
    }

    // Initialize all countdowns
    countdownEls.forEach(container => {
        updateCountdown(container); // Immediate first render
        const intervalId = setInterval(() => {
            const stillActive = updateCountdown(container);
            if (!stillActive) clearInterval(intervalId);
        }, 1000);
    });


    /* ─── 4. Scroll Reveal ─── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const revealObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObs.observe(el));
    }


    /* ─── 5. Smooth Scroll for Anchors ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    /* ─── 6. Loyalty Form Validation ─── */
    const loyaltyForm = document.getElementById('loyalty-form');
    if (loyaltyForm) {
        const nameInput = document.getElementById('loyalty-name');
        const emailInput = document.getElementById('loyalty-email');
        const consentInput = document.getElementById('loyalty-consent');
        const successEl = document.getElementById('loyalty-success');

        function validateField(input) {
            const errorEl = input.parentElement.querySelector('.loyalty-form__error');
            let valid = true;
            let msg = '';

            if (input.type === 'text') {
                if (!input.value.trim()) { valid = false; msg = 'Please enter your name.'; }
                else if (input.value.trim().length < 2) { valid = false; msg = 'Name must be at least 2 characters.'; }
            }

            if (input.type === 'email') {
                const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!input.value.trim()) { valid = false; msg = 'Please enter your email.'; }
                else if (!emailRe.test(input.value.trim())) { valid = false; msg = 'Please enter a valid email address.'; }
            }

            input.classList.toggle('input--valid', valid);
            input.classList.toggle('input--invalid', !valid);
            if (errorEl) {
                errorEl.textContent = valid ? '' : msg;
            }
            return valid;
        }

        // Live feedback
        [nameInput, emailInput].forEach(input => {
            if (!input) return;
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('input--invalid')) validateField(input);
            });
        });

        loyaltyForm.addEventListener('submit', e => {
            e.preventDefault();

            const nameValid = validateField(nameInput);
            const emailValid = validateField(emailInput);
            const consentValid = consentInput.checked;

            if (!consentValid) {
                consentInput.style.borderColor = '#e74c3c';
                consentInput.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.2)';
            } else {
                consentInput.style.borderColor = '';
                consentInput.style.boxShadow = '';
            }

            if (!nameValid || !emailValid || !consentValid) return;

            // Simulate submission
            const submitBtn = loyaltyForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Subscribing…';

            setTimeout(() => {
                loyaltyForm.style.display = 'none';
                successEl.hidden = false;
            }, 1500);
        });
    }


    /* ─── 7. Nav Scroll Behaviour ─── */
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('nav--scrolled', window.scrollY > 80);
        });
    }

    /* ─── 8. Mobile Menu Toggle ─── */
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('nav-mobile');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

});

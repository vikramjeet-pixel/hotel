/* ============================================================
   WEDDINGS.JS — Kings Court Hotel
   Hero parallax, floating particles, scroll reveal,
   form validation, and smooth interactions
   ============================================================ */

(function () {
    'use strict';

    /* ─────────────────────────────────────────
       HERO PARALLAX
    ───────────────────────────────────────── */
    const heroImg = document.getElementById('wd-hero-img');

    function updateHeroParallax() {
        if (!heroImg) return;
        const scrollY = window.scrollY;
        const heroEl = document.getElementById('wd-hero');
        if (!heroEl) return;
        const heroH = heroEl.offsetHeight;
        if (scrollY > heroH) return;
        const pct = scrollY / heroH;
        heroImg.style.transform = `translateY(${pct * 18}%)`;
    }

    /* ─────────────────────────────────────────
       WHY-US SECTION PARALLAX
    ───────────────────────────────────────── */
    const whyBg = document.querySelector('.wd-why__bg-img');

    function updateWhyParallax() {
        if (!whyBg) return;
        const rect = whyBg.closest('.wd-why').getBoundingClientRect();
        const winH = window.innerHeight;
        if (rect.bottom < 0 || rect.top > winH) return;
        const progress = (winH - rect.top) / (winH + rect.height);
        const offset = (progress - 0.5) * 60;
        whyBg.style.transform = `translateY(${offset}px)`;
    }

    /* ─────────────────────────────────────────
       SCROLL HANDLER
    ───────────────────────────────────────── */
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeroParallax();
                updateWhyParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeroParallax();
    updateWhyParallax();


    /* ─────────────────────────────────────────
       SCROLL REVEAL (IntersectionObserver)
    ───────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Stagger children if the element has multiple siblings
                    const siblings = entry.target.parentElement
                        ? Array.from(entry.target.parentElement.querySelectorAll('.reveal'))
                        : [];
                    const idx = siblings.indexOf(entry.target);
                    const delay = idx * 80;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el) => observer.observe(el));
    } else {
        // Fallback: reveal all immediately
        revealEls.forEach((el) => el.classList.add('revealed'));
    }


    /* ─────────────────────────────────────────
       SMOOTH SCROLL — Hero CTAs & anchor links
    ───────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;
            e.preventDefault();
            const navH = document.getElementById('main-nav')?.offsetHeight || 80;
            const top = targetEl.getBoundingClientRect().top + window.scrollY - navH - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    /* ─────────────────────────────────────────
       DATE MINIMUM — prevent past dates
    ───────────────────────────────────────── */
    const dateInput = document.getElementById('wd-date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }


    /* ─────────────────────────────────────────
       FORM VALIDATION
    ───────────────────────────────────────── */
    const form = document.getElementById('wd-enquiry-form');
    const submitBtn = document.getElementById('wd-submit-btn');
    const successMsg = document.getElementById('wd-form-success');

    if (!form) return;

    // Validation rules
    const validators = {
        'wd-name-1': {
            validate: (v) => v.trim().length >= 2,
            message: 'Please enter your name (at least 2 characters).'
        },
        'wd-name-2': {
            validate: (v) => v.trim().length >= 2,
            message: 'Please enter your partner\'s name.'
        },
        'wd-email': {
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
            message: 'Please enter a valid email address.'
        },
        'wd-phone': {
            validate: (v) => v.trim().length >= 7,
            message: 'Please enter a valid phone number.'
        },
        'wd-date': {
            validate: (v) => {
                if (!v) return false;
                const selected = new Date(v);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selected >= today;
            },
            message: 'Please select a future wedding date.'
        },
        'wd-guests': {
            validate: (v) => v !== '',
            message: 'Please select an approximate guest count.'
        }
    };

    function getErrorEl(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return null;
        // Find the next sibling .wd-form__error
        return field.parentElement.querySelector('.wd-form__error');
    }

    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const rule = validators[fieldId];
        const errorEl = getErrorEl(fieldId);
        if (!field || !rule || !errorEl) return true;

        const valid = rule.validate(field.value);
        if (!valid) {
            field.classList.add('is-error');
            errorEl.textContent = rule.message;
            return false;
        } else {
            field.classList.remove('is-error');
            errorEl.textContent = '';
            return true;
        }
    }

    function validateConsent() {
        const checkbox = document.getElementById('wd-consent');
        const errorEl = form.querySelector('.wd-form__error--consent');
        if (!checkbox || !errorEl) return true;

        if (!checkbox.checked) {
            errorEl.textContent = 'Please agree to be contacted about your enquiry.';
            return false;
        } else {
            errorEl.textContent = '';
            return true;
        }
    }

    // Live validation on blur
    Object.keys(validators).forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!field) return;

        field.addEventListener('blur', () => validateField(fieldId));
        field.addEventListener('input', () => {
            if (field.classList.contains('is-error')) validateField(fieldId);
        });
    });

    // Consent live check
    const consentBox = document.getElementById('wd-consent');
    if (consentBox) {
        consentBox.addEventListener('change', validateConsent);
    }

    // Form submit is handled by email-handler.js
    // (validation on submit is performed there)


    /* ─────────────────────────────────────────
       PACKAGE CARD — Enquiry pre-fill
       When a package CTA is clicked, pre-select
       that package in the enquiry form
    ───────────────────────────────────────── */
    const packageSelect = document.getElementById('wd-package');

    const packageMap = {
        'pkg-blossom-btn': 'blossom',
        'pkg-heritage-btn': 'heritage',
        'pkg-royal-btn': 'royal'
    };

    Object.entries(packageMap).forEach(([btnId, value]) => {
        const btn = document.getElementById(btnId);
        if (!btn || !packageSelect) return;
        btn.addEventListener('click', () => {
            packageSelect.value = value;
        });
    });


    /* ─────────────────────────────────────────
       VENUE CARD — Enquiry pre-fill
    ───────────────────────────────────────── */
    const venueMap = {
        'venue-great-hall': '101-150',
        'venue-garden-terrace': '51-100',
        'venue-oak-room': '1-20'
    };

    const guestsSelect = document.getElementById('wd-guests');

    Object.entries(venueMap).forEach(([cardId, guestRange]) => {
        const card = document.getElementById(cardId);
        if (!card || !guestsSelect) return;
        const btn = card.querySelector('.wd-venue-card__btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            guestsSelect.value = guestRange;
        });
    });


    /* ─────────────────────────────────────────
       HERO STATS — Count-up animation
    ───────────────────────────────────────── */
    const statsEl = document.querySelector('.wd-hero__stats');

    function animateCountUp(el, target, suffix) {
        const duration = 1800;
        const start = performance.now();
        const isNumeric = !isNaN(parseInt(target));
        const numTarget = parseInt(target);

        if (!isNumeric) return; // "Exclusive" — skip

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            const current = Math.round(eased * numTarget);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    if (statsEl) {
        const statNums = statsEl.querySelectorAll('.wd-hero__stat-num');
        const rawValues = ['40', '200', '380', 'Exclusive'];
        const suffixes = ['', '', '+', ''];

        // Trigger after a short delay for dramatic effect
        setTimeout(() => {
            statNums.forEach((el, i) => {
                if (rawValues[i] === 'Exclusive') {
                    el.textContent = 'Exclusive';
                    return;
                }
                animateCountUp(el, rawValues[i], suffixes[i]);
            });
        }, 800);
    }

})();

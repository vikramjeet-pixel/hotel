/* ============================================================
   EVENTS.JS — Kings Court Hotel
   Hero parallax, scroll reveal, form validation,
   package/room pre-fill, stat count-up
   ============================================================ */

(function () {
    'use strict';

    /* ─── HERO PARALLAX ─── */
    const heroImg = document.getElementById('ev-hero-img');

    function updateHeroParallax() {
        if (!heroImg) return;
        const scrollY = window.scrollY;
        const heroEl = document.getElementById('ev-hero');
        if (!heroEl || scrollY > heroEl.offsetHeight) return;
        heroImg.style.transform = `translateY(${(scrollY / heroEl.offsetHeight) * 16}%)`;
    }

    /* ─── SCROLL HANDLER ─── */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeroParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    updateHeroParallax();

    /* ─── SCROLL REVEAL ─── */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal') || []);
                const delay = siblings.indexOf(entry.target) * 70;
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                io.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    /* ─── SMOOTH SCROLL ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.getElementById(this.getAttribute('href').slice(1));
            if (!target) return;
            e.preventDefault();
            const navH = document.getElementById('main-nav')?.offsetHeight || 80;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 20, behavior: 'smooth' });
        });
    });

    /* ─── DATE MINIMUM ─── */
    const dateInput = document.getElementById('ev-date');
    if (dateInput) {
        const t = new Date();
        dateInput.min = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    }

    /* ─── STAT COUNT-UP ─── */
    const statsEl = document.querySelector('.ev-hero__stats');
    if (statsEl) {
        const nums = statsEl.querySelectorAll('.ev-stat__num');
        const targets = [5, 300, 28, 40];
        setTimeout(() => {
            nums.forEach((el, i) => {
                const target = targets[i];
                const start = performance.now();
                const dur = 1600;
                (function step(now) {
                    const p = Math.min((now - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(eased * target);
                    if (p < 1) requestAnimationFrame(step);
                })(start);
            });
        }, 600);
    }

    /* ─── PACKAGE PRE-FILL ─── */
    const pkgSelect = document.getElementById('ev-package');
    const pkgMap = {
        'pkg-essential-btn': 'essential',
        'pkg-premium-btn': 'premium',
        'pkg-residential-btn': 'residential'
    };
    Object.entries(pkgMap).forEach(([btnId, val]) => {
        const btn = document.getElementById(btnId);
        if (btn && pkgSelect) btn.addEventListener('click', () => { pkgSelect.value = val; });
    });

    /* ─── ROOM → DELEGATE PRE-FILL ─── */
    const delegatesSelect = document.getElementById('ev-delegates');
    const roomMap = {
        'room-great-hall': '201-300',
        'room-boardroom': '11-25',
        'room-oak': '26-50',
        'room-garden': '51-100',
        'room-terrace': '101-200'
    };
    Object.entries(roomMap).forEach(([cardId, val]) => {
        const card = document.getElementById(cardId);
        if (!card || !delegatesSelect) return;
        card.querySelector('.ev-room-card__btn')?.addEventListener('click', () => {
            delegatesSelect.value = val;
        });
    });

    /* ─── FORM VALIDATION ─── */
    const form = document.getElementById('ev-enquiry-form');
    const submitBtn = document.getElementById('ev-submit-btn');
    const successMsg = document.getElementById('ev-form-success');
    if (!form) return;

    const validators = {
        'ev-firstname': { validate: v => v.trim().length >= 2, message: 'Please enter your first name.' },
        'ev-lastname': { validate: v => v.trim().length >= 2, message: 'Please enter your last name.' },
        'ev-email': { validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: 'Please enter a valid email address.' },
        'ev-phone': { validate: v => v.trim().length >= 7, message: 'Please enter a valid phone number.' },
        'ev-company': { validate: v => v.trim().length >= 2, message: 'Please enter your company name.' },
        'ev-type': { validate: v => v !== '', message: 'Please select an event type.' },
        'ev-delegates': { validate: v => v !== '', message: 'Please select delegate count.' },
        'ev-date': {
            validate: v => {
                if (!v) return false;
                return new Date(v) >= new Date(new Date().toDateString());
            },
            message: 'Please select a future event date.'
        }
    };

    function getError(id) {
        return document.getElementById(id)?.parentElement?.querySelector('.ev-form__error');
    }

    function validateField(id) {
        const field = document.getElementById(id);
        const rule = validators[id];
        const errEl = getError(id);
        if (!field || !rule || !errEl) return true;
        const valid = rule.validate(field.value);
        field.classList.toggle('is-error', !valid);
        errEl.textContent = valid ? '' : rule.message;
        return valid;
    }

    Object.keys(validators).forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener('blur', () => validateField(id));
        field.addEventListener('input', () => { if (field.classList.contains('is-error')) validateField(id); });
        field.addEventListener('change', () => validateField(id));
    });

    // Form submit is handled by email-handler.js
    // (validation on submit is performed there)

})();

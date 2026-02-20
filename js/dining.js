/* ============================================================
   DINING.JS — Kings Court Hotel
   Parallax, venue tab switching, form validation
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════
       PARALLAX — Hero
       ══════════════════════════════════════════ */
    const heroImg = document.getElementById('dn-hero-img');

    const updateHeroParallax = () => {
        if (!heroImg) return;
        const scrollY = window.scrollY;
        // Move image up at 40% of scroll speed for parallax effect
        heroImg.style.transform = `translateY(${scrollY * 0.4}px)`;
    };

    window.addEventListener('scroll', updateHeroParallax, { passive: true });


    /* ══════════════════════════════════════════
       PARALLAX — Venue section strips
       ══════════════════════════════════════════ */
    const parallaxSections = [
        { container: document.getElementById('restaurant-parallax'), img: document.getElementById('restaurant-parallax-img') },
        { container: document.getElementById('bar-parallax'), img: document.getElementById('bar-parallax-img') },
        { container: document.querySelector('.dn-private__bg-img') ? { id: 'private' } : null, img: document.querySelector('.dn-private__bg-img') }
    ].filter(p => p.container && p.img);

    const updateSectionParallax = () => {
        parallaxSections.forEach(({ container, img }) => {
            if (!container || !img) return;
            const el = container.id ? container : img.closest('.dn-private');
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const viewH = window.innerHeight;
            // Only animate when in viewport
            if (rect.bottom < 0 || rect.top > viewH) return;
            const progress = (viewH - rect.top) / (viewH + rect.height);
            const offset = (progress - 0.5) * 80; // ±40px travel
            img.style.transform = `translateY(${offset}px)`;
        });
    };

    window.addEventListener('scroll', updateSectionParallax, { passive: true });
    updateSectionParallax(); // run on load


    /* ══════════════════════════════════════════
       VENUE TAB TOGGLE (form)
       ══════════════════════════════════════════ */
    const tabs = document.querySelectorAll('.dn-form__venue-tab');
    const venueInput = document.getElementById('form-venue');
    const timeSelect = document.getElementById('form-time');

    // Time options per venue
    const restaurantTimes = [
        { group: 'Lunch', options: [['12:00', '12:00 pm'], ['12:30', '12:30 pm'], ['13:00', '1:00 pm'], ['13:30', '1:30 pm'], ['14:00', '2:00 pm']] },
        { group: 'Afternoon Tea', options: [['15:00', '3:00 pm'], ['15:30', '3:30 pm'], ['16:00', '4:00 pm'], ['16:30', '4:30 pm']] },
        { group: 'Dinner', options: [['18:30', '6:30 pm'], ['19:00', '7:00 pm'], ['19:30', '7:30 pm'], ['20:00', '8:00 pm'], ['20:30', '8:30 pm'], ['21:00', '9:00 pm']] }
    ];

    const barTimes = [
        { group: 'Lunch', options: [['11:00', '11:00 am'], ['11:30', '11:30 am'], ['12:00', '12:00 pm'], ['12:30', '12:30 pm'], ['13:00', '1:00 pm'], ['13:30', '1:30 pm'], ['14:00', '2:00 pm']] },
        { group: 'Afternoon', options: [['14:30', '2:30 pm'], ['15:00', '3:00 pm'], ['15:30', '3:30 pm'], ['16:00', '4:00 pm'], ['16:30', '4:30 pm'], ['17:00', '5:00 pm'], ['17:30', '5:30 pm']] },
        { group: 'Evening', options: [['18:00', '6:00 pm'], ['18:30', '6:30 pm'], ['19:00', '7:00 pm'], ['19:30', '7:30 pm'], ['20:00', '8:00 pm'], ['20:30', '8:30 pm'], ['21:00', '9:00 pm'], ['21:30', '9:30 pm'], ['22:00', '10:00 pm']] }
    ];

    const buildTimeOptions = (groups) => {
        if (!timeSelect) return;
        timeSelect.innerHTML = '<option value="" disabled selected>Select time</option>';
        groups.forEach(({ group, options }) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group;
            options.forEach(([val, label]) => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = label;
                optgroup.appendChild(opt);
            });
            timeSelect.appendChild(optgroup);
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('dn-form__venue-tab--active');
                t.setAttribute('aria-pressed', 'false');
            });
            tab.classList.add('dn-form__venue-tab--active');
            tab.setAttribute('aria-pressed', 'true');

            const venue = tab.dataset.venue;
            if (venueInput) venueInput.value = venue;

            // Rebuild time options
            buildTimeOptions(venue === 'bar' ? barTimes : restaurantTimes);
        });
    });


    /* ══════════════════════════════════════════
       DATE — Set minimum to today
       ══════════════════════════════════════════ */
    const dateInput = document.getElementById('form-date');
    if (dateInput) {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        dateInput.min = todayStr;
    }


    /* ══════════════════════════════════════════
       FORM VALIDATION & SUBMISSION
       ══════════════════════════════════════════ */
    const form = document.getElementById('dn-reserve-form');
    const successEl = document.getElementById('form-success');
    const submitBtn = document.getElementById('reserve-submit-btn');

    const validators = {
        'form-first-name': {
            validate: (v) => v.trim().length >= 2,
            message: 'Please enter your first name (at least 2 characters).'
        },
        'form-last-name': {
            validate: (v) => v.trim().length >= 2,
            message: 'Please enter your last name (at least 2 characters).'
        },
        'form-email': {
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
            message: 'Please enter a valid email address.'
        },
        'form-phone': {
            validate: (v) => /^[\d\s\+\-\(\)]{7,}$/.test(v.trim()),
            message: 'Please enter a valid phone number.'
        },
        'form-date': {
            validate: (v) => {
                if (!v) return false;
                const selected = new Date(v);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selected >= today;
            },
            message: 'Please select a future date.'
        },
        'form-time': {
            validate: (v) => v !== '',
            message: 'Please select a time.'
        },
        'form-guests': {
            validate: (v) => v !== '',
            message: 'Please select the number of guests.'
        }
    };

    const showError = (id, message) => {
        const input = document.getElementById(id);
        if (!input) return;
        input.classList.add('is-error');
        const errorEl = input.closest('.dn-form__group')?.querySelector('.dn-form__error');
        if (errorEl) errorEl.textContent = message;
    };

    const clearError = (id) => {
        const input = document.getElementById(id);
        if (!input) return;
        input.classList.remove('is-error');
        const errorEl = input.closest('.dn-form__group')?.querySelector('.dn-form__error');
        if (errorEl) errorEl.textContent = '';
    };

    // Live validation on blur
    Object.keys(validators).forEach(id => {
        const input = document.getElementById(id);
        input?.addEventListener('blur', () => {
            const { validate, message } = validators[id];
            if (!validate(input.value)) {
                showError(id, message);
            } else {
                clearError(id);
            }
        });

        input?.addEventListener('input', () => {
            if (input.classList.contains('is-error')) {
                const { validate } = validators[id];
                if (validate(input.value)) clearError(id);
            }
        });
    });

    // Form submit is handled by email-handler.js
    // (validation on submit is performed there)


    /* ══════════════════════════════════════════
       SMOOTH SCROLL — hero CTA buttons
       ══════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const navH = document.getElementById('main-nav')?.offsetHeight || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navH - 24;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    /* ══════════════════════════════════════════
       MENU DOWNLOAD — Placeholder feedback
       ══════════════════════════════════════════ */
    document.querySelectorAll('.dn-menu-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Menu Downloaded';
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.pointerEvents = '';
            }, 2500);
        });
    });

});

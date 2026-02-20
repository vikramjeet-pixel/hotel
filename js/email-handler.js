/* ============================================================
   EMAIL-HANDLER.JS — Kings Court Hotel
   Frontend email integration for all enquiry forms
   Intercepts form submissions, validates, sends to API,
   and shows success/error feedback
   ============================================================ */

(function () {
    'use strict';

    const API_ENDPOINT = '/api/send-email';

    // ────────────────────────────────────────────────────────
    // VALIDATION HELPERS
    // ────────────────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;

    function showFieldError(input, errorEl, message) {
        if (input) input.classList.add('error', 'is-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }

    function clearFieldError(input, errorEl) {
        if (input) input.classList.remove('error', 'is-error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('visible');
        }
    }

    function validateRequired(value, minLen) {
        return value && value.trim().length >= (minLen || 2);
    }

    function validateEmail(value) {
        return emailRegex.test((value || '').trim());
    }

    function validatePhone(value) {
        return phoneRegex.test((value || '').trim());
    }

    // ────────────────────────────────────────────────────────
    // SUBMIT HANDLER FACTORY
    // ────────────────────────────────────────────────────────
    function createSubmitHandler(config) {
        const {
            formId,
            formType,
            collectData,
            validateFields,
            submitBtnSelector,
            successElId,
            onBeforeSubmit,
            onSuccess,
            resetFields,
        } = config;

        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Run custom validation
            const { valid, firstInvalid } = validateFields();
            if (!valid) {
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Collect form data
            const data = collectData();
            data.formType = formType;

            // Get submit button
            const submitBtn = form.querySelector(submitBtnSelector || 'button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Sending…';
            }

            if (onBeforeSubmit) onBeforeSubmit();

            try {
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // SUCCESS
                    if (resetFields) resetFields();

                    if (submitBtn) submitBtn.style.display = 'none';

                    const successEl = document.getElementById(successElId);
                    if (successEl) {
                        successEl.hidden = false;
                        successEl.classList.add('visible');
                        successEl.style.display = 'block';
                        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }

                    if (onSuccess) onSuccess(result);
                } else {
                    // API returned errors
                    const errMsg = result.errors
                        ? result.errors.join('\n')
                        : result.error || 'Something went wrong. Please try again.';
                    alert(errMsg);
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHtml;
                    }
                }
            } catch (err) {
                console.error('Email submission error:', err);
                alert('There was a network error. Please check your connection and try again, or contact us directly at info@kingscourthotel.co.uk');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }


    // ════════════════════════════════════════════════════════
    //  1. CONTACT FORM (contact.html)
    // ════════════════════════════════════════════════════════
    if (document.getElementById('contact-form')) {
        createSubmitHandler({
            formId: 'contact-form',
            formType: 'contact',
            successElId: 'ct-success',

            validateFields: function () {
                let valid = true;
                let firstInvalid = null;

                const checks = [
                    {
                        id: 'ct-name', errId: 'ct-name-error',
                        test: () => validateRequired(document.getElementById('ct-name')?.value),
                        msg: 'Please enter your name.'
                    },
                    {
                        id: 'ct-email', errId: 'ct-email-error',
                        test: () => validateEmail(document.getElementById('ct-email')?.value),
                        msg: 'Please enter a valid email address.'
                    },
                    {
                        id: 'ct-phone', errId: 'ct-phone-error',
                        test: () => validatePhone(document.getElementById('ct-phone')?.value),
                        msg: 'Please enter a valid phone number.'
                    },
                    {
                        id: 'ct-subject', errId: 'ct-subject-error',
                        test: () => validateRequired(document.getElementById('ct-subject')?.value),
                        msg: 'Please enter a subject.'
                    },
                    {
                        id: 'ct-message', errId: 'ct-message-error',
                        test: () => validateRequired(document.getElementById('ct-message')?.value, 10),
                        msg: 'Please enter your message (at least 10 characters).'
                    },
                ];

                checks.forEach(check => {
                    const input = document.getElementById(check.id);
                    const errEl = document.getElementById(check.errId);
                    if (!check.test()) {
                        showFieldError(input, errEl, check.msg);
                        if (!firstInvalid) firstInvalid = input;
                        valid = false;
                    } else {
                        clearFieldError(input, errEl);
                    }
                });

                return { valid, firstInvalid };
            },

            collectData: function () {
                return {
                    fullName: document.getElementById('ct-name')?.value?.trim(),
                    email: document.getElementById('ct-email')?.value?.trim(),
                    phone: document.getElementById('ct-phone')?.value?.trim(),
                    subject: document.getElementById('ct-subject')?.value?.trim(),
                    message: document.getElementById('ct-message')?.value?.trim(),
                };
            },

            resetFields: function () {
                const form = document.getElementById('contact-form');
                if (form) form.style.display = 'none';
            },
        });

        // Live error clearing for contact form
        document.querySelectorAll('#contact-form .ct-form__input, #contact-form .ct-form__textarea').forEach(input => {
            input.addEventListener('input', () => {
                const errEl = document.getElementById(input.id + '-error');
                clearFieldError(input, errEl);
            });
        });
    }


    // ════════════════════════════════════════════════════════
    //  2. WEDDING FORM (weddings.html)
    // ════════════════════════════════════════════════════════
    if (document.getElementById('wd-enquiry-form')) {
        createSubmitHandler({
            formId: 'wd-enquiry-form',
            formType: 'wedding',
            successElId: 'wd-form-success',
            submitBtnSelector: '#wd-submit-btn',

            validateFields: function () {
                let valid = true;
                let firstInvalid = null;

                const validators = {
                    'wd-name-1': { test: v => v.trim().length >= 2, msg: 'Please enter your name (at least 2 characters).' },
                    'wd-name-2': { test: v => v.trim().length >= 2, msg: "Please enter your partner's name." },
                    'wd-email': { test: v => emailRegex.test(v.trim()), msg: 'Please enter a valid email address.' },
                    'wd-phone': { test: v => v.trim().length >= 7, msg: 'Please enter a valid phone number.' },
                    'wd-date': { test: v => { if (!v) return false; return new Date(v) >= new Date(new Date().toDateString()); }, msg: 'Please select a future wedding date.' },
                    'wd-guests': { test: v => v !== '', msg: 'Please select an approximate guest count.' },
                };

                Object.entries(validators).forEach(([id, rule]) => {
                    const field = document.getElementById(id);
                    const errEl = field?.parentElement?.querySelector('.wd-form__error');
                    if (!field) return;
                    if (!rule.test(field.value)) {
                        field.classList.add('is-error');
                        if (errEl) errEl.textContent = rule.msg;
                        if (!firstInvalid) firstInvalid = field;
                        valid = false;
                    } else {
                        field.classList.remove('is-error');
                        if (errEl) errEl.textContent = '';
                    }
                });

                // Consent validation
                const consent = document.getElementById('wd-consent');
                const consentErr = document.querySelector('.wd-form__error--consent');
                if (consent && !consent.checked) {
                    if (consentErr) consentErr.textContent = 'Please agree to be contacted about your enquiry.';
                    if (!firstInvalid) firstInvalid = consent;
                    valid = false;
                } else if (consentErr) {
                    consentErr.textContent = '';
                }

                return { valid, firstInvalid };
            },

            collectData: function () {
                const name1 = document.getElementById('wd-name-1')?.value?.trim() || '';
                const name2 = document.getElementById('wd-name-2')?.value?.trim() || '';
                return {
                    fullName: name1 + (name2 ? ' & ' + name2 : ''),
                    partnerName: name2,
                    email: document.getElementById('wd-email')?.value?.trim(),
                    phone: document.getElementById('wd-phone')?.value?.trim(),
                    weddingDate: document.getElementById('wd-date')?.value,
                    guestCount: document.getElementById('wd-guests')?.value,
                    weddingPackage: document.getElementById('wd-package')?.options[document.getElementById('wd-package').selectedIndex]?.text,
                    referralSource: document.getElementById('wd-source')?.options[document.getElementById('wd-source').selectedIndex]?.text,
                    message: document.getElementById('wd-message')?.value?.trim() || 'No additional message provided.',
                };
            },

            resetFields: function () {
                const form = document.getElementById('wd-enquiry-form');
                form?.querySelectorAll('.wd-form__input, .wd-form__select, .wd-form__textarea').forEach(el => {
                    el.value = '';
                    el.classList.remove('is-error');
                });
                const consent = document.getElementById('wd-consent');
                if (consent) consent.checked = false;
                const submitBtn = document.getElementById('wd-submit-btn');
                if (submitBtn) submitBtn.style.display = 'none';
            },
        });
    }


    // ════════════════════════════════════════════════════════
    //  3. EVENTS FORM (events.html)
    // ════════════════════════════════════════════════════════
    if (document.getElementById('ev-enquiry-form')) {
        createSubmitHandler({
            formId: 'ev-enquiry-form',
            formType: 'events',
            successElId: 'ev-form-success',
            submitBtnSelector: '#ev-submit-btn',

            validateFields: function () {
                let valid = true;
                let firstInvalid = null;

                const validators = {
                    'ev-firstname': { test: v => v.trim().length >= 2, msg: 'Please enter your first name.' },
                    'ev-lastname': { test: v => v.trim().length >= 2, msg: 'Please enter your last name.' },
                    'ev-email': { test: v => emailRegex.test(v.trim()), msg: 'Please enter a valid email address.' },
                    'ev-phone': { test: v => v.trim().length >= 7, msg: 'Please enter a valid phone number.' },
                    'ev-company': { test: v => v.trim().length >= 2, msg: 'Please enter your company name.' },
                    'ev-type': { test: v => v !== '', msg: 'Please select an event type.' },
                    'ev-delegates': { test: v => v !== '', msg: 'Please select delegate count.' },
                    'ev-date': { test: v => { if (!v) return false; return new Date(v) >= new Date(new Date().toDateString()); }, msg: 'Please select a future event date.' },
                };

                Object.entries(validators).forEach(([id, rule]) => {
                    const field = document.getElementById(id);
                    const errEl = field?.parentElement?.querySelector('.ev-form__error');
                    if (!field) return;
                    if (!rule.test(field.value)) {
                        field.classList.add('is-error');
                        if (errEl) errEl.textContent = rule.msg;
                        if (!firstInvalid) firstInvalid = field;
                        valid = false;
                    } else {
                        field.classList.remove('is-error');
                        if (errEl) errEl.textContent = '';
                    }
                });

                return { valid, firstInvalid };
            },

            collectData: function () {
                const firstName = document.getElementById('ev-firstname')?.value?.trim() || '';
                const lastName = document.getElementById('ev-lastname')?.value?.trim() || '';

                // Collect checked facilities
                const facilities = [];
                document.querySelectorAll('#ev-enquiry-form .ev-form__checkbox:checked').forEach(cb => {
                    const label = cb.closest('.ev-form__check-label')?.textContent?.trim();
                    if (label) facilities.push(label);
                });

                return {
                    fullName: firstName + ' ' + lastName,
                    email: document.getElementById('ev-email')?.value?.trim(),
                    phone: document.getElementById('ev-phone')?.value?.trim(),
                    company: document.getElementById('ev-company')?.value?.trim(),
                    eventType: document.getElementById('ev-type')?.options[document.getElementById('ev-type').selectedIndex]?.text,
                    delegates: document.getElementById('ev-delegates')?.value,
                    eventDate: document.getElementById('ev-date')?.value,
                    duration: document.getElementById('ev-duration')?.options[document.getElementById('ev-duration').selectedIndex]?.text,
                    eventPackage: document.getElementById('ev-package')?.options[document.getElementById('ev-package').selectedIndex]?.text,
                    facilitiesRequired: facilities.length > 0 ? facilities.join(', ') : 'None specified',
                    message: document.getElementById('ev-notes')?.value?.trim() || 'No additional requirements specified.',
                };
            },

            resetFields: function () {
                const form = document.getElementById('ev-enquiry-form');
                form?.querySelectorAll('.ev-form__input, .ev-form__select, .ev-form__textarea').forEach(el => {
                    el.value = '';
                    el.classList.remove('is-error');
                });
                form?.querySelectorAll('.ev-form__checkbox').forEach(cb => cb.checked = false);
                const submitBtn = document.getElementById('ev-submit-btn');
                if (submitBtn) submitBtn.style.display = 'none';
            },
        });
    }


    // ════════════════════════════════════════════════════════
    //  4. BOOKING / STAY FORM (booking.html)
    // ════════════════════════════════════════════════════════
    if (document.getElementById('booking-form')) {
        createSubmitHandler({
            formId: 'booking-form',
            formType: 'stay',
            successElId: 'bk-success',

            validateFields: function () {
                let valid = true;
                let firstInvalid = null;

                const checks = [
                    { id: 'bk-checkin', test: () => !!document.getElementById('bk-checkin')?.value, msg: 'Please select check-in date.' },
                    { id: 'bk-checkout', test: () => !!document.getElementById('bk-checkout')?.value, msg: 'Please select check-out date.' },
                    { id: 'bk-name', test: () => validateRequired(document.getElementById('bk-name')?.value), msg: 'Please enter your full name.' },
                    { id: 'bk-email', test: () => validateEmail(document.getElementById('bk-email')?.value), msg: 'Please enter a valid email address.' },
                    { id: 'bk-phone', test: () => validatePhone(document.getElementById('bk-phone')?.value), msg: 'Please enter a valid phone number.' },
                ];

                checks.forEach(check => {
                    const input = document.getElementById(check.id);
                    if (!check.test()) {
                        if (input) input.classList.add('error');
                        if (!firstInvalid) firstInvalid = input;
                        valid = false;
                    } else {
                        if (input) input.classList.remove('error');
                    }
                });

                return { valid, firstInvalid };
            },

            collectData: function () {
                const roomSelect = document.getElementById('bk-room');
                const guestCount = document.getElementById('guest-count');
                const checkinVal = document.getElementById('bk-checkin')?.value;
                const checkoutVal = document.getElementById('bk-checkout')?.value;

                let nights = 0;
                if (checkinVal && checkoutVal) {
                    nights = Math.max(0, Math.round((new Date(checkoutVal) - new Date(checkinVal)) / (1000 * 60 * 60 * 24)));
                }

                const roomName = roomSelect?.options[roomSelect.selectedIndex]?.textContent?.split('—')[0]?.trim() || '';
                const ratePerNight = roomSelect?.options[roomSelect.selectedIndex]?.dataset?.price || '';

                return {
                    fullName: document.getElementById('bk-name')?.value?.trim(),
                    email: document.getElementById('bk-email')?.value?.trim(),
                    phone: document.getElementById('bk-phone')?.value?.trim(),
                    checkIn: checkinVal,
                    checkOut: checkoutVal,
                    roomType: roomName,
                    guests: guestCount?.textContent || '2',
                    specialRequests: document.getElementById('bk-requests')?.value?.trim() || 'None',
                    message: `Booking enquiry for ${roomName}. Check-in: ${checkinVal}, Check-out: ${checkoutVal}. ${nights} night(s) at £${ratePerNight}/night. Estimated total: £${nights * parseInt(ratePerNight || 0)}. Guests: ${guestCount?.textContent || '2'}. Special requests: ${document.getElementById('bk-requests')?.value?.trim() || 'None'}.`,
                };
            },

            resetFields: function () {
                const form = document.getElementById('booking-form');
                if (form) form.style.display = 'none';
            },
        });
    }

})();

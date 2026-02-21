/* ============================================================
   ROOM-DETAIL.JS — Kings Court Hotel
   Gallery slider, lightbox, availability form, sticky sidebar
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════
       GALLERY SLIDER
       ══════════════════════════════════════════ */
    const track = document.getElementById('rd-gallery-track');
    const slides = track ? Array.from(track.querySelectorAll('.rd-gallery__slide')) : [];
    const thumbBtns = Array.from(document.querySelectorAll('.rd-gallery__thumb'));
    const prevBtn = document.getElementById('rd-gallery-prev');
    const nextBtn = document.getElementById('rd-gallery-next');
    const counterCur = document.getElementById('rd-slide-current');
    const counterTot = document.getElementById('rd-slide-total');

    let currentSlide = 0;
    const totalSlides = slides.length;

    if (counterTot) counterTot.textContent = totalSlides;

    const goToSlide = (index) => {
        if (!track || totalSlides === 0) return;

        // Clamp
        currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

        // Move track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update counter
        if (counterCur) counterCur.textContent = currentSlide + 1;

        // Update thumbnails
        thumbBtns.forEach((btn, i) => {
            const isActive = i === currentSlide;
            btn.classList.toggle('rd-gallery__thumb--active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Update lightbox counter if open
        const lbCur = document.getElementById('rd-lb-current');
        if (lbCur) lbCur.textContent = currentSlide + 1;
    };

    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

    thumbBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.thumb, 10);
            goToSlide(idx);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('rd-lightbox')?.hidden === false) return; // lightbox handles its own keys
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // Touch / swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const galleryMain = document.getElementById('rd-gallery-main');

    galleryMain?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryMain?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        }
    }, { passive: true });

    // Mouse drag support
    let isDragging = false;
    let dragStartX = 0;

    galleryMain?.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
    });

    galleryMain?.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = dragStartX - e.clientX;
        if (Math.abs(diff) > 50) {
            goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        }
    });

    galleryMain?.addEventListener('mouseleave', () => { isDragging = false; });


    /* ══════════════════════════════════════════
       LIGHTBOX
       ══════════════════════════════════════════ */
    const lightbox = document.getElementById('rd-lightbox');
    const lbImg = document.getElementById('rd-lightbox-img');
    const lbCaption = document.getElementById('rd-lightbox-caption');
    const lbClose = document.getElementById('rd-lightbox-close');
    const lbPrev = document.getElementById('rd-lightbox-prev');
    const lbNext = document.getElementById('rd-lightbox-next');
    const lbBackdrop = document.getElementById('rd-lightbox-backdrop');
    const lbCurEl = document.getElementById('rd-lb-current');
    const lbTotEl = document.getElementById('rd-lb-total');
    const expandBtn = document.getElementById('rd-gallery-expand');

    // Collect all gallery images
    const galleryImages = slides.map(slide => ({
        src: slide.querySelector('img')?.src || '',
        alt: slide.querySelector('img')?.alt || ''
    }));

    if (lbTotEl) lbTotEl.textContent = galleryImages.length;

    let lbIndex = 0;

    const openLightbox = (index) => {
        if (!lightbox) return;
        lbIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        lightbox.classList.add('is-opening');
        lightbox.removeEventListener('animationend', () => { });
        lightbox.addEventListener('animationend', () => {
            lightbox.classList.remove('is-opening');
        }, { once: true });
        updateLightboxImage();
        lbClose?.focus();
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.add('is-closing');
        lightbox.addEventListener('animationend', () => {
            lightbox.hidden = true;
            lightbox.classList.remove('is-closing');
            document.body.style.overflow = '';
            expandBtn?.focus();
        }, { once: true });
    };

    const updateLightboxImage = () => {
        if (!lbImg || !galleryImages[lbIndex]) return;
        lbImg.classList.add('is-loading');
        const newSrc = galleryImages[lbIndex].src;
        const newAlt = galleryImages[lbIndex].alt;
        const tempImg = new Image();
        tempImg.onload = () => {
            lbImg.src = newSrc;
            lbImg.alt = newAlt;
            if (lbCaption) lbCaption.textContent = newAlt;
            if (lbCurEl) lbCurEl.textContent = lbIndex + 1;
            requestAnimationFrame(() => {
                lbImg.classList.remove('is-loading');
            });
        };
        tempImg.src = newSrc;
    };

    const lbGoTo = (index) => {
        lbIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    };

    expandBtn?.addEventListener('click', () => openLightbox(currentSlide));
    lbClose?.addEventListener('click', closeLightbox);
    lbBackdrop?.addEventListener('click', closeLightbox);
    lbPrev?.addEventListener('click', () => lbGoTo(lbIndex - 1));
    lbNext?.addEventListener('click', () => lbGoTo(lbIndex + 1));

    // Keyboard in lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox?.hidden !== false) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lbGoTo(lbIndex - 1);
        if (e.key === 'ArrowRight') lbGoTo(lbIndex + 1);
    });

    // Touch swipe in lightbox
    let lbTouchStart = 0;
    lightbox?.addEventListener('touchstart', (e) => {
        lbTouchStart = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox?.addEventListener('touchend', (e) => {
        const diff = lbTouchStart - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) lbGoTo(diff > 0 ? lbIndex + 1 : lbIndex - 1);
    }, { passive: true });


    /* ══════════════════════════════════════════
       AVAILABILITY FORM
       ══════════════════════════════════════════ */
    const form = document.getElementById('rd-avail-form');
    const checkinEl = document.getElementById('avail-checkin');
    const checkoutEl = document.getElementById('avail-checkout');
    const summaryEl = document.getElementById('avail-summary');
    const summaryLabel = document.getElementById('summary-rate-label');
    const summaryTotal = document.getElementById('summary-rate-total');
    const grandTotal = document.getElementById('summary-grand-total');

    const NIGHTLY_RATE = 195; // base rate

    // Set min dates
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    if (checkinEl) checkinEl.min = todayStr;
    if (checkoutEl) checkoutEl.min = todayStr;

    // Auto-set checkout to next day when checkin changes
    checkinEl?.addEventListener('change', () => {
        const checkin = new Date(checkinEl.value);
        if (!isNaN(checkin)) {
            const nextDay = new Date(checkin);
            nextDay.setDate(nextDay.getDate() + 1);
            const nextDayStr = nextDay.toISOString().split('T')[0];
            checkoutEl.min = nextDayStr;
            if (!checkoutEl.value || new Date(checkoutEl.value) <= checkin) {
                checkoutEl.value = nextDayStr;
            }
        }
        updatePriceSummary();
    });

    checkoutEl?.addEventListener('change', updatePriceSummary);

    function updatePriceSummary() {
        if (!checkinEl?.value || !checkoutEl?.value) {
            if (summaryEl) summaryEl.hidden = true;
            return;
        }
        const checkin = new Date(checkinEl.value);
        const checkout = new Date(checkoutEl.value);
        const nights = Math.round((checkout - checkin) / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            if (summaryEl) summaryEl.hidden = true;
            return;
        }

        const total = NIGHTLY_RATE * nights;

        if (summaryLabel) summaryLabel.textContent = `£${NIGHTLY_RATE} × ${nights} night${nights > 1 ? 's' : ''}`;
        if (summaryTotal) summaryTotal.textContent = `£${total}`;
        if (grandTotal) grandTotal.textContent = `£${total}`;
        if (summaryEl) summaryEl.hidden = false;
    }

    // Form validation & submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Clear previous errors
        form.querySelectorAll('.rd-avail-form__error').forEach(el => el.textContent = '');
        form.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));

        if (!checkinEl?.value) {
            showError(checkinEl, 'Please select a check-in date.');
            valid = false;
        }

        if (!checkoutEl?.value) {
            showError(checkoutEl, 'Please select a check-out date.');
            valid = false;
        } else if (checkinEl?.value && new Date(checkoutEl.value) <= new Date(checkinEl.value)) {
            showError(checkoutEl, 'Check-out must be after check-in.');
            valid = false;
        }

        if (valid) {
            window.open('https://www.bestwestern.co.uk/integrated-booking/kings-court-hotel-bw-signature-collection-by-best-western-84411/', '_blank');
        }
    });

    function showError(input, message) {
        if (!input) return;
        input.classList.add('is-error');
        const errorEl = input.closest('.rd-avail-form__field')?.querySelector('.rd-avail-form__error');
        if (errorEl) errorEl.textContent = message;
    }


    /* ══════════════════════════════════════════
       STICKY SIDEBAR — Scroll behaviour
       ══════════════════════════════════════════ */
    const sidebar = document.getElementById('rd-sidebar');
    const mobileBar = document.getElementById('rd-mobile-bar');
    const rdContent = document.getElementById('rd-content');

    // On desktop, the sidebar is CSS sticky. On mobile, show the bottom bar.
    // Hide mobile bar when sidebar is in viewport
    if (mobileBar && sidebar) {
        const sidebarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // On mobile, hide the bar when the sidebar form is visible
                if (window.innerWidth <= 1024) {
                    mobileBar.style.transform = entry.isIntersecting
                        ? 'translateY(100%)'
                        : 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        sidebarObserver.observe(sidebar);
    }

    // Mobile bar smooth scroll to sidebar
    document.getElementById('rd-mobile-book-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('rd-sidebar');
        if (target) {
            const navH = document.getElementById('main-nav')?.offsetHeight || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });


    /* ══════════════════════════════════════════
       URL PARAM — Dynamic room data
       ══════════════════════════════════════════ */
    const roomData = {
        single: {
            title: 'Single Room',
            category: 'Standard Room',
            price: 115,
            breadcrumb: 'Single Room',
            folder: 'single-room'
        },
        'standard-double': {
            title: 'Standard Double Room',
            category: 'Double Room',
            price: 145,
            breadcrumb: 'Standard Double Room',
            folder: 'standard-double-room'
        },
        king: {
            title: 'King Room',
            category: 'Premier Room',
            price: 195,
            breadcrumb: 'King Room',
            folder: 'king-room'
        },
        twin: {
            title: 'Twin Room',
            category: 'Twin Room',
            price: 175,
            breadcrumb: 'Twin Room',
            folder: 'twin-room'
        },
        quad: {
            title: 'Quad Room',
            category: 'Quad Room',
            price: 245,
            breadcrumb: 'Quad Room',
            folder: 'quad-room'
        }
    };

    const params = new URLSearchParams(window.location.search);
    const roomKey = params.get('room') || 'king';
    const room = roomData[roomKey] || roomData.king;

    // Update page elements
    const titleEl = document.getElementById('rd-title');
    const categoryEl = document.getElementById('rd-category');
    const breadcrumbEl = document.getElementById('rd-breadcrumb-current');
    const sidebarPrice = document.getElementById('sidebar-price');
    const mobileAmount = document.querySelector('.rd-mobile-bar__amount');

    if (titleEl) titleEl.textContent = room.title;
    if (categoryEl) categoryEl.textContent = room.category;
    if (breadcrumbEl) breadcrumbEl.textContent = room.breadcrumb;
    if (sidebarPrice) sidebarPrice.textContent = `£${room.price}`;
    if (mobileAmount) mobileAmount.textContent = `£${room.price}`;

    // Update images dynamically
    const mainImages = document.querySelectorAll('.rd-gallery__slide img');
    const thumbImages = document.querySelectorAll('.rd-gallery__thumb img');
    const imgNames = ['mobilescale.avif', 'mobilescale-1.avif', 'mobilescale-2.avif'];

    // Check if lengths match
    mainImages.forEach((img, idx) => {
        if (imgNames[idx]) {
            img.src = `assets/images/${room.folder}/${imgNames[idx]}`;
        }
    });
    thumbImages.forEach((img, idx) => {
        if (imgNames[idx]) {
            img.src = `assets/images/${room.folder}/${imgNames[idx]}`;
        }
    });

    // Update page title
    document.title = `${room.title} | Kings Court Hotel — Tudor Country Escape`;

    // Update NIGHTLY_RATE for price calc (re-assign via closure)
    // (We update the summary calc to use room.price)
    checkinEl?.addEventListener('change', () => {
        updatePriceSummaryDynamic(room.price);
    });
    checkoutEl?.addEventListener('change', () => {
        updatePriceSummaryDynamic(room.price);
    });

    function updatePriceSummaryDynamic(rate) {
        if (!checkinEl?.value || !checkoutEl?.value) {
            if (summaryEl) summaryEl.hidden = true;
            return;
        }
        const checkin = new Date(checkinEl.value);
        const checkout = new Date(checkoutEl.value);
        const nights = Math.round((checkout - checkin) / (1000 * 60 * 60 * 24));
        if (nights <= 0) { if (summaryEl) summaryEl.hidden = true; return; }
        const total = rate * nights;
        if (summaryLabel) summaryLabel.textContent = `£${rate} × ${nights} night${nights > 1 ? 's' : ''}`;
        if (summaryTotal) summaryTotal.textContent = `£${total}`;
        if (grandTotal) grandTotal.textContent = `£${total}`;
        if (summaryEl) summaryEl.hidden = false;
    }


    /* ══════════════════════════════════════════
       MOBILE BAR TRANSITION
       ══════════════════════════════════════════ */
    if (mobileBar) {
        mobileBar.style.transition = 'transform 0.35s ease';
    }

});

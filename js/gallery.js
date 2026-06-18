/* ============================================================
   GALLERY.JS — Kings Court Hotel
   Filter tabs, lightbox, keyboard nav, staggered reveal
   ============================================================ */

(function () {
    'use strict';

    /* ─── DOM References ─── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxTitle = lightbox.querySelector('.lightbox__title');
    const lightboxCat = lightbox.querySelector('.lightbox__cat');
    const btnClose = lightbox.querySelector('.lightbox__close');
    const btnPrev = lightbox.querySelector('.lightbox__prev');
    const btnNext = lightbox.querySelector('.lightbox__next');
    const overlay = lightbox.querySelector('.lightbox__overlay');

    let currentIndex = 0;
    let visibleItems = []; // Items currently passing the filter

    /* ─── Helpers ─── */
    function buildVisibleItems() {
        visibleItems = Array.from(
            document.querySelectorAll('.gallery-item:not(.hidden)')
        );
    }

    /* ─── FILTER TABS ─── */
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active state
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(function (item, i) {
                const cat = item.getAttribute('data-category');

                if (filter === 'all' || cat === filter) {
                    item.classList.remove('hidden');
                    // Staggered fade-in
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(16px)';
                    setTimeout(function () {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 40);
                } else {
                    item.classList.add('hidden');
                }
            });

            // Rebuild visible list after DOM settles
            setTimeout(buildVisibleItems, 50);
        });
    });

    /* ─── LIGHTBOX ─── */

    function openLightbox(index) {
        buildVisibleItems();
        if (index < 0 || index >= visibleItems.length) return;

        currentIndex = index;
        const item = visibleItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-item__caption');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = caption
            ? caption.querySelector('h3').textContent
            : '';
        lightboxCat.textContent = caption
            ? caption.querySelector('span').textContent
            : '';

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrev() {
        if (visibleItems.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxImage();
    }

    function showNext() {
        if (visibleItems.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        const item = visibleItems[currentIndex];
        if (!item) return;

        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-item__caption');

        // Fade transition
        lightboxImg.style.opacity = '0';
        setTimeout(function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = caption
                ? caption.querySelector('h3').textContent
                : '';
            lightboxCat.textContent = caption
                ? caption.querySelector('span').textContent
                : '';
            lightboxImg.style.opacity = '1';
        }, 200);
    }

    /* ─── Event Listeners ─── */

    // Click on gallery item to open lightbox
    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            buildVisibleItems();
            var idx = visibleItems.indexOf(item);
            if (idx !== -1) openLightbox(idx);
        });
    });

    // Close
    btnClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    // Nav
    btnPrev.addEventListener('click', function (e) { e.stopPropagation(); showPrev(); });
    btnNext.addEventListener('click', function (e) { e.stopPropagation(); showNext(); });

    // Keyboard
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    /* ─── Init ─── */
    buildVisibleItems();

    // Add transition for lightbox image
    lightboxImg.style.transition = 'opacity 0.2s ease';

})();

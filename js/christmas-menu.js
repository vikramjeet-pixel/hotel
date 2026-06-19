/* ═══════════════════════════════════════
   CHRISTMAS MENU – PREMIUM FLIPBOOK ENGINE
   Hyper-realistic page-turn with 12 images
   ═══════════════════════════════════════ */

(function () {
    'use strict';

    const IMAGES = [
        'assets/images/christmas menu 2026/page-01.jpg',
        'assets/images/christmas menu 2026/page-02.jpg',
        'assets/images/christmas menu 2026/page-03.jpg',
        'assets/images/christmas menu 2026/page-04.jpg',
        'assets/images/christmas menu 2026/page-05.jpg',
        'assets/images/christmas menu 2026/page-06.jpg',
        'assets/images/christmas menu 2026/page-07.jpg',
        'assets/images/christmas menu 2026/page-08.jpg',
        'assets/images/christmas menu 2026/page-09.jpg',
        'assets/images/christmas menu 2026/page-10.jpg',
        'assets/images/christmas menu 2026/page-11.jpg',
        'assets/images/christmas menu 2026/page-12.jpg',
    ];

    const book       = document.getElementById('flipbook');
    const leftPane   = document.getElementById('flipbook-left');
    const btnPrev    = document.getElementById('fb-prev');
    const btnNext    = document.getElementById('fb-next');
    const progress   = document.getElementById('fb-progress');
    const dotsWrap   = document.getElementById('fb-dots');

    if (!book) return;

    const totalLeaves = Math.ceil(IMAGES.length / 2); // 6
    let currentPage = 0;
    let isAnimating = false;

    // ─── Preload images for smooth flips ───
    IMAGES.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ─── Build structural elements ───
    // Shadow beneath book
    const shadow = document.createElement('div');
    shadow.className = 'flipbook-shadow';
    book.appendChild(shadow);

    // Page-stack edges (right side — unflipped pages)
    const edgesRight = document.createElement('div');
    edgesRight.className = 'flipbook__page-edges';
    book.appendChild(edgesRight);

    // Page-stack edges (left side — flipped pages)
    const edgesLeft = document.createElement('div');
    edgesLeft.className = 'flipbook__page-edges-left';
    book.appendChild(edgesLeft);

    // ─── Build leaves ───
    const leaves = [];
    for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'flipbook__page';
        leaf.style.zIndex = totalLeaves - i;

        // Front face
        const front = document.createElement('div');
        front.className = 'flipbook__face flipbook__face--front';
        const imgFront = document.createElement('img');
        imgFront.src = IMAGES[i * 2];
        imgFront.alt = `Christmas Menu – Page ${i * 2 + 1}`;
        imgFront.loading = i < 2 ? 'eager' : 'lazy';
        imgFront.draggable = false;
        front.appendChild(imgFront);

        // Page curl overlay (shows during transition)
        const curl = document.createElement('div');
        curl.className = 'flipbook__curl';
        front.appendChild(curl);

        // Back face
        const back = document.createElement('div');
        back.className = 'flipbook__face flipbook__face--back';
        const imgBack = document.createElement('img');
        imgBack.src = IMAGES[i * 2 + 1];
        imgBack.alt = `Christmas Menu – Page ${i * 2 + 2}`;
        imgBack.loading = i < 2 ? 'eager' : 'lazy';
        imgBack.draggable = false;
        back.appendChild(imgBack);

        leaf.appendChild(front);
        leaf.appendChild(back);
        book.appendChild(leaf);
        leaves.push(leaf);

        // Click to flip
        leaf.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isAnimating) return;

            if (leaf.classList.contains('--flipped')) {
                goToPage(i);
            } else {
                goToPage(i + 1);
            }
        });

        // Transition end handler
        leaf.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform') {
                leaf.classList.remove('--turning');
                isAnimating = false;
            }
        });
    }

    // ─── Build dots ───
    const dots = [];
    for (let i = 0; i <= totalLeaves; i++) {
        const dot = document.createElement('button');
        dot.className = 'flipbook-dot';
        dot.setAttribute('aria-label', `Go to page ${i === 0 ? 'cover' : i * 2}`);
        dot.addEventListener('click', () => {
            if (!isAnimating) goToPage(i);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
    }

    // ─── Navigation ───
    function goToPage(page) {
        page = Math.max(0, Math.min(totalLeaves, page));
        if (page === currentPage) return;

        isAnimating = true;
        const wasPage = currentPage;
        currentPage = page;

        leaves.forEach((leaf, i) => {
            if (i < page) {
                if (!leaf.classList.contains('--flipped')) {
                    leaf.classList.add('--turning');
                }
                leaf.classList.add('--flipped');
                leaf.style.zIndex = i + 1;
            } else {
                if (leaf.classList.contains('--flipped')) {
                    leaf.classList.add('--turning');
                }
                leaf.classList.remove('--flipped');
                leaf.style.zIndex = totalLeaves - i;
            }
        });

        // Update left pane after a short delay to sync with animation
        const delay = Math.abs(page - wasPage) > 1 ? 200 : 400;
        setTimeout(() => updateLeftPane(), delay);

        updateControls();
        updateEdges();

        // Safety: clear animation lock after max transition time
        setTimeout(() => { isAnimating = false; }, 1200);
    }

    function updateLeftPane() {
        if (currentPage === 0) {
            leftPane.innerHTML = '';
            leftPane.style.background = '#efe9dd';
        } else {
            const backImgSrc = IMAGES[(currentPage - 1) * 2 + 1];
            leftPane.style.background = 'none';
            leftPane.innerHTML = `<img src="${backImgSrc}" alt="Christmas Menu" draggable="false">`;
        }
    }

    function updateEdges() {
        // Show left page stack when pages have been flipped
        if (currentPage > 0) {
            edgesLeft.classList.add('--visible');
        } else {
            edgesLeft.classList.remove('--visible');
        }

        // Hide right page stack when all pages are flipped
        if (currentPage >= totalLeaves) {
            edgesRight.style.opacity = '0';
        } else {
            edgesRight.style.opacity = '1';
        }
    }

    function updateControls() {
        btnPrev.disabled = (currentPage === 0);
        btnNext.disabled = (currentPage === totalLeaves);

        // Progress text
        if (currentPage === 0) {
            progress.textContent = 'Cover';
        } else if (currentPage === totalLeaves) {
            progress.textContent = 'Back Cover';
        } else {
            const left  = currentPage * 2;
            const right = currentPage * 2 + 1;
            progress.textContent = `${left} · ${right}  of  ${IMAGES.length}`;
        }

        // Dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('--active', i === currentPage);
        });
    }

    // Button handlers
    btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAnimating) goToPage(currentPage - 1);
    });
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAnimating) goToPage(currentPage + 1);
    });

    // Keyboard navigation (only when in viewport)
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        const rect = book.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            goToPage(currentPage + 1);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            goToPage(currentPage - 1);
        }
    });

    // Touch / swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    book.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    book.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        const dx = touchStartX - e.changedTouches[0].screenX;
        const dy = touchStartY - e.changedTouches[0].screenY;

        // Only trigger if horizontal swipe is dominant
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx > 0) goToPage(currentPage + 1);
            else         goToPage(currentPage - 1);
        }
    }, { passive: true });

    // ─── Responsive Scaling ───
    function adjustScale() {
        const viewportWidth = window.innerWidth;
        const bookWidth = 640;
        const desktopWidth = 860;
        
        let scale = 1;
        if (viewportWidth <= 940) {
            const padding = 40;
            const availableWidth = viewportWidth - padding;
            scale = Math.min(1, availableWidth / bookWidth);
        } else {
            const padding = 40;
            const availableWidth = viewportWidth - padding;
            scale = Math.min(1, availableWidth / desktopWidth);
        }
        
        book.style.setProperty('--book-scale', scale);
    }
    
    window.addEventListener('resize', adjustScale);
    adjustScale();

    // ─── Initialize ───
    goToPage(0);
    updateEdges();

})();

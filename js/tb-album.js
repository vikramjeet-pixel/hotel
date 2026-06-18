/* ═══════════════════════════════════════
   TWISTED BOOT BAR – PHOTO ALBUM FLIPBOOK
   ═══════════════════════════════════════ */

(function () {
    'use strict';

    const IMAGES = [
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-27.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-106.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-131.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-76.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-5.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-83.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-124.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-3.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-134.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-63.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-6.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-77.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-128.jpg',
        'assets/twisted boot bar/Twisted_Boot_Re-launch_Beadie_Photography-129.jpg'
    ];

    const book       = document.getElementById('tb-flipbook');
    const leftPane   = document.getElementById('tb-flipbook-left');
    const btnPrev    = document.getElementById('tb-fb-prev');
    const btnNext    = document.getElementById('tb-fb-next');
    const progress   = document.getElementById('tb-fb-progress');
    const dotsWrap   = document.getElementById('tb-fb-dots');

    if (!book) return;

    const totalLeaves = Math.ceil(IMAGES.length / 2); // 7
    let currentPage = 0;
    let isAnimating = false;

    // ─── Preload images for smooth flips ───
    IMAGES.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ─── Build structural elements ───
    const shadow = document.createElement('div');
    shadow.className = 'flipbook-shadow';
    book.appendChild(shadow);

    const edgesRight = document.createElement('div');
    edgesRight.className = 'flipbook__page-edges';
    book.appendChild(edgesRight);

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
        imgFront.alt = `Photo Album – Page ${i * 2 + 1}`;
        imgFront.loading = i < 2 ? 'eager' : 'lazy';
        imgFront.draggable = false;
        front.appendChild(imgFront);

        const curl = document.createElement('div');
        curl.className = 'flipbook__curl';
        front.appendChild(curl);

        // Back face
        const back = document.createElement('div');
        back.className = 'flipbook__face flipbook__face--back';
        const imgBack = document.createElement('img');
        if (IMAGES[i * 2 + 1]) {
            imgBack.src = IMAGES[i * 2 + 1];
            imgBack.alt = `Photo Album – Page ${i * 2 + 2}`;
        } else {
            // Placeholder if odd number of pages
            imgBack.src = 'assets/images/gallery/compressed-kings-court-23.jpg';
            imgBack.alt = `Photo Album – Page ${i * 2 + 2}`;
        }
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

        const delay = Math.abs(page - wasPage) > 1 ? 200 : 400;
        setTimeout(() => updateLeftPane(), delay);

        updateControls();
        updateEdges();

        setTimeout(() => { isAnimating = false; }, 1200);
    }

    function updateLeftPane() {
        if (currentPage === 0) {
            leftPane.innerHTML = '';
            leftPane.style.background = '#efe9dd';
        } else {
            let backImgSrc = IMAGES[(currentPage - 1) * 2 + 1];
            if (!backImgSrc) {
                backImgSrc = 'assets/images/gallery/compressed-kings-court-23.jpg';
            }
            leftPane.style.background = 'none';
            leftPane.innerHTML = `<img src="${backImgSrc}" alt="Photo Album" draggable="false">`;
        }
    }

    function updateEdges() {
        if (currentPage > 0) {
            edgesLeft.classList.add('--visible');
        } else {
            edgesLeft.classList.remove('--visible');
        }

        if (currentPage >= totalLeaves) {
            edgesRight.style.opacity = '0';
        } else {
            edgesRight.style.opacity = '1';
        }
    }

    function updateControls() {
        btnPrev.disabled = (currentPage === 0);
        btnNext.disabled = (currentPage === totalLeaves);

        if (currentPage === 0) {
            progress.textContent = 'Cover';
        } else if (currentPage === totalLeaves) {
            progress.textContent = 'Back Cover';
        } else {
            const left  = currentPage * 2;
            let right = currentPage * 2 + 1;
            if (right > IMAGES.length) right = IMAGES.length;
            progress.textContent = `${left} · ${right}  of  ${IMAGES.length}`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle('--active', i === currentPage);
        });
    }

    btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAnimating) goToPage(currentPage - 1);
    });
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAnimating) goToPage(currentPage + 1);
    });

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

        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx > 0) goToPage(currentPage + 1);
            else         goToPage(currentPage - 1);
        }
    }, { passive: true });

    goToPage(0);
    updateEdges();

})();

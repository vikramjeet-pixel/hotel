/* ============================================================
   MAIN.JS — Kings Court Hotel
   Core site functionality: nav scroll, mobile menu, reveal
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Nav on Scroll ── */
  const nav = document.getElementById('main-nav');

  const handleNavScroll = () => {
    const isSolid = nav?.classList.contains('nav--solid');
    if (window.scrollY > 60 || isSolid) {
      nav?.classList.add('nav--scrolled');
      nav?.classList.remove('nav--transparent');
    } else {
      nav?.classList.remove('nav--scrolled');
      nav?.classList.add('nav--transparent');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  /* ── Mobile Menu Toggle ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  const mobileClose = document.getElementById('nav-mobile-close');

  const closeMobileMenu = () => {
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close button (X) inside mobile menu
  mobileClose?.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('.nav__mobile-link, .nav__mobile-sublink, .nav__mobile .btn').forEach(link => {
    if (link.classList.contains('nav__mobile-dropdown-toggle')) return;
    link.addEventListener('click', closeMobileMenu);
  });

  /* ── Mobile Dropdown Accordion Toggle ── */
  mobileMenu?.querySelectorAll('.nav__mobile-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Close other mobile dropdowns
      mobileMenu.querySelectorAll('.nav__mobile-dropdown').forEach(item => {
        item.classList.remove('active');
      });
      
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  /* ── Scroll Reveal Animation ── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Active Nav Link Highlight ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const currentHash = window.location.hash;
  const bestMatches = [];

  document.querySelectorAll('.nav__link, .nav__dropdown-menu a, .nav__mobile-sublink, .nav__mobile-link').forEach(link => {
    if (link.classList.contains('nav__mobile-dropdown-toggle')) return;
    if (link.classList.contains('nav__dropdown-trigger')) return; // skip trigger itself from matching directly

    const href = link.getAttribute('href');
    if (!href) return;

    // Split href into path and hash
    const [hrefPath, hrefHash] = href.split('#');
    const cleanHrefPath = hrefPath || 'index.html';

    if (cleanHrefPath === currentPage) {
      let score = 0;
      if (hrefHash) {
        if (currentHash === '#' + hrefHash) {
          score = 2; // Perfect page + hash match
        } else {
          score = 0; // Hash mismatch, do not match
        }
      } else {
        if (!currentHash) {
          score = 2; // Perfect page-only match (no hash on either)
        } else {
          score = 1; // Page match, but URL has hash and link does not
        }
      }

      if (score > 0) {
        bestMatches.push({ link, score });
      }
    }
  });

  // Find the highest score
  const maxScore = Math.max(...bestMatches.map(m => m.score), 0);
  const activeMatches = bestMatches.filter(m => m.score === maxScore);
  const highlightedDropdowns = new Set();

  activeMatches.forEach(({ link }) => {
    if (link.classList.contains('nav__mobile-sublink') || link.closest('.nav__mobile-links')) {
      link.classList.add('nav__mobile-link--active');
      
      const mobileDropdownParent = link.closest('.nav__mobile-dropdown');
      if (mobileDropdownParent) {
        const trigger = mobileDropdownParent.querySelector('.nav__mobile-dropdown-toggle');
        if (trigger) {
          trigger.classList.add('nav__mobile-link--active');
          mobileDropdownParent.classList.add('active');
        }
      }
    } else {
      const dropdownParent = link.closest('.nav__dropdown');
      if (dropdownParent) {
        const trigger = dropdownParent.querySelector('.nav__dropdown-trigger');
        if (trigger) {
          // Highlight only one dropdown parent to prevent double desktop highlight
          if (highlightedDropdowns.size === 0 || highlightedDropdowns.has(dropdownParent)) {
            link.style.color = 'var(--clr-gold)';
            trigger.style.color = 'var(--clr-gold)';
            highlightedDropdowns.add(dropdownParent);
          }
        }
      } else {
        link.style.color = 'var(--clr-gold)';
      }
    }
  });

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav?.offsetHeight || 90;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

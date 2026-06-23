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
  document.querySelectorAll('.nav__link, .nav__dropdown-menu a, .nav__mobile-sublink, .nav__mobile-link').forEach(link => {
    if (link.classList.contains('nav__mobile-dropdown-toggle')) return;
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.startsWith(currentPage + '#'))) {
      if (link.classList.contains('nav__mobile-sublink') || link.closest('.nav__mobile-links')) {
        link.classList.add('nav__mobile-link--active');
        
        // Highlight mobile parent trigger
        const mobileDropdownParent = link.closest('.nav__mobile-dropdown');
        if (mobileDropdownParent) {
          const trigger = mobileDropdownParent.querySelector('.nav__mobile-dropdown-toggle');
          if (trigger) {
            trigger.classList.add('nav__mobile-link--active');
            mobileDropdownParent.classList.add('active'); // Expand active accordion
          }
        }
      } else {
        link.style.color = 'var(--clr-gold)';
        
        // Highlight desktop parent trigger
        const dropdownParent = link.closest('.nav__dropdown');
        if (dropdownParent) {
          const trigger = dropdownParent.querySelector('.nav__dropdown-trigger');
          if (trigger) {
            trigger.style.color = 'var(--clr-gold)';
          }
        }
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

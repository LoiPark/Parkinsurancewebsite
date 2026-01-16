// ========================================
// Shared Navigation Module
// ========================================

export function initNavigation() {
  const dropdownTrigger = document.querySelector('[data-dropdown="solutions"]');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileDropdownTrigger = document.querySelector('[data-mobile-dropdown="solutions"]');

  // Desktop dropdown
  if (dropdownTrigger) {
    const dropdownBtn = dropdownTrigger.querySelector('.nav-link');
    
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = dropdownTrigger.classList.contains('active');
      closeAllDropdowns();
      if (!isActive) {
        dropdownTrigger.classList.add('active');
        dropdownBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      closeAllDropdowns();
    }
  });

  // Close dropdown on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      closeMobileNav();
    }
  });

  // Mobile menu
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.add('active');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  // Mobile dropdown
  if (mobileDropdownTrigger) {
    const mobileDropdownBtn = mobileDropdownTrigger.querySelector('.mobile-nav-link');
    mobileDropdownBtn.addEventListener('click', () => {
      mobileDropdownTrigger.classList.toggle('active');
    });
  }

  // Close mobile nav on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
      const btn = dropdown.querySelector('.nav-link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove('active');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
}


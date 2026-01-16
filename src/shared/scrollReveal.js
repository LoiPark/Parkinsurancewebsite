// ========================================
// Scroll Reveal Animation Module
// ========================================

export function initScrollReveal() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // If user prefers reduced motion, skip animations
  if (prefersReducedMotion) {
    // Make all reveal elements immediately visible
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Create IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is entering viewport - fade in
        entry.target.classList.add('is-visible');
      } else {
        // Element is leaving viewport - fade out
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  // Observe all elements with .reveal class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}


// Import styles
import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/expertise.css';
import './styles/solutions.css';
import './styles/footer.css';

// Import shared navigation
import { initNavigation } from './shared/nav.js';

// ========================================
// Data Configuration
// ========================================

const expertiseData = {
  expertise: {
    image: '/images/Expertise Image.jpg',
    alt: 'Expertise'
  },
  support: {
    image: '/images/Support Image.jpg',
    alt: 'Support'
  }
};

// Solution page URLs mapping
const solutionPages = {
  'auto': '/auto.html',
  'home': '/home.html',
  'health-medicare': '/health-medicare.html',
  'commercial': '/commercial.html',
  'life-insurance': '/life-insurance.html',
  'annuities': '/financial-planning.html'
};

// ========================================
// Hero Slideshow
// ========================================

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const controlBtn = document.querySelector('.hero-control');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  let isPlaying = true;
  let intervalId;
  const slideInterval = 5000;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startSlideshow() {
    if (!prefersReducedMotion && isPlaying) {
      intervalId = setInterval(nextSlide, slideInterval);
    }
  }

  function stopSlideshow() {
    clearInterval(intervalId);
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopSlideshow();
      showSlide(index);
      if (isPlaying) startSlideshow();
    });
  });

  // Play/Pause button
  if (controlBtn) {
    controlBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      controlBtn.setAttribute('data-playing', isPlaying);
      controlBtn.setAttribute('aria-label', isPlaying ? 'Pause slideshow' : 'Play slideshow');
      
      // Update icon
      if (isPlaying) {
        controlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        startSlideshow();
      } else {
        controlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        stopSlideshow();
      }
    });
  }

  // Start the slideshow
  if (!prefersReducedMotion) {
    startSlideshow();
  }
}

// ========================================
// Expertise Tabs
// ========================================

function initExpertiseTabs() {
  const tabs = document.querySelectorAll('.expertise-tab');
  const contents = document.querySelectorAll('.expertise-tab-content');
  const image = document.getElementById('expertise-image');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      const data = expertiseData[tabId];

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content
      contents.forEach(content => {
        content.classList.toggle('active', content.dataset.content === tabId);
      });

      // Update image
      if (image && data) {
        image.src = data.image;
        image.alt = data.alt;
      }
    });
  });
}

// ========================================
// Solutions Scroll
// ========================================

function initSolutionsScroll() {
  const panels = document.querySelectorAll('.solutions-panel');
  const backgrounds = document.querySelectorAll('.solutions-bg');
  const items = document.querySelectorAll('.solutions-item');
  const itemsArray = Array.from(items);
  const descriptions = document.querySelectorAll('.solutions-desc-text');
  const learnMoreBtn = document.querySelector('.solutions-learn-btn');
  const solutionsList = document.querySelector('.solutions-list');

  if (!panels.length) return;

  let activeSolutionId = 'auto'; // Default

  // Set up IntersectionObserver for scroll-driven activation
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const panelId = entry.target.dataset.panel;
        activateSolution(panelId);
      }
    });
  }, observerOptions);

  panels.forEach(panel => observer.observe(panel));

  // Click handlers for solution items
  items.forEach(item => {
    item.addEventListener('click', () => {
      const solutionId = item.dataset.solution;
      activateSolution(solutionId); // Update UI immediately on click
      const panel = document.getElementById(solutionId);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Initialize with default active solution on load
  activateSolution(activeSolutionId);

  function activateSolution(id) {
    activeSolutionId = id;

    // Find the active index
    const activeIndex = itemsArray.findIndex(item => item.dataset.solution === id);

    // Update backgrounds
    backgrounds.forEach(bg => {
      bg.classList.toggle('active', bg.dataset.bg === id);
    });

    // Update list items with visibility classes
    items.forEach((item, index) => {
      const isActive = item.dataset.solution === id;
      item.classList.toggle('active', isActive);
      
      // Visibility rules: hide items more than 1 position before active
      item.classList.toggle('is-hidden', index < activeIndex - 1);
      // Mark the immediately previous item
      item.classList.toggle('is-prev', index === activeIndex - 1);
    });

    // Translate the list upward to keep active item centered
    if (solutionsList) {
      // Calculate offset: move up by (activeIndex - 1) items to show prev item at top
      // Each item is roughly 4rem tall (font-size + gap)
      const offsetIndex = Math.max(0, activeIndex - 1);
      const offsetPerItem = 4; // rem
      const translateY = offsetIndex * offsetPerItem;
      solutionsList.style.transform = `translateY(-${translateY}rem)`;
    }

    // Update descriptions
    descriptions.forEach(desc => {
      desc.classList.toggle('active', desc.dataset.desc === id);
    });

    // Update Learn More button href
    if (learnMoreBtn && solutionPages[id]) {
      learnMoreBtn.href = solutionPages[id];
    }
  }
}

// ========================================
// Initialize App
// ========================================

function init() {
  initNavigation();
  initHeroSlideshow();
  initExpertiseTabs();
  initSolutionsScroll();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

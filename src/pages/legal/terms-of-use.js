// Import base styles
import '../../styles/base.css';
import '../../styles/nav.css';
import '../../styles/reveal.css';

// Import page-specific styles
import './terms-of-use.css';

// Import shared modules
import { initNavigation } from '../../shared/nav.js';
import { initScrollReveal } from '../../shared/scrollReveal.js';

// Initialize page
function init() {
  initNavigation();
  initScrollReveal();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


// Import base styles
import '../../styles/base.css';
import '../../styles/nav.css';

// Import page-specific styles
import './hero.css';
import './form.css';

// Import shared navigation
import { initNavigation } from '../../shared/nav.js';

// ========================================
// Form Handling
// ========================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('form-message');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    
    // Validate required fields
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    if (!firstName || !lastName || !email || !phone) {
      showMessage('error', 'Please fill in all required fields.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('error', 'Please enter a valid email address.');
      return;
    }
    
    // Get selected topics
    const topics = [];
    const topicCheckboxes = form.querySelectorAll('input[name="topics"]:checked');
    topicCheckboxes.forEach(checkbox => {
      topics.push(checkbox.value);
    });
    
    if (topics.length === 0) {
      showMessage('error', 'Please select at least one topic.');
      return;
    }
    
    // Disable submit button
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showMessage('success', 'Thank you for contacting us! We\'ll get back to you soon.');
      
      // Reset form
      form.reset();
      
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
      
      // Scroll to message
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
    } catch (error) {
      showMessage('error', 'Something went wrong. Please try again later.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  });
  
  function showMessage(type, text) {
    messageDiv.className = `form-message ${type} show`;
    messageDiv.innerHTML = `
      <div class="form-message-title">${type === 'success' ? 'Success!' : 'Error'}</div>
      <div>${text}</div>
    `;
  }
}

// ========================================
// Initialize Page
// ========================================

function init() {
  initNavigation();
  initContactForm();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


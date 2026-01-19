import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page app configuration
// This tells Vite to build all HTML pages as entry points
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        auto: resolve(__dirname, 'auto.html'),
        commercial: resolve(__dirname, 'commercial.html'),
        healthMedicare: resolve(__dirname, 'health-medicare.html'),
        lifeInsurance: resolve(__dirname, 'life-insurance.html'),
        financialPlanning: resolve(__dirname, 'financial-planning.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        termsOfUse: resolve(__dirname, 'terms-of-use.html'),
        termsOfBusiness: resolve(__dirname, 'terms-of-business.html'),
        compensationDisclosure: resolve(__dirname, 'compensation-disclosure.html'),
      },
    },
  },
});


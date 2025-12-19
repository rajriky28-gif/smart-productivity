import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for browser compatibility and inject API_KEY
    'process.env': {
      API_KEY: process.env.API_KEY || ''
    }
  },
  build: {
    // Increase chunk size warning limit to 3000kB to suppress warnings for large dependencies
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Split Framer Motion (Animation)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Split Lucide (Icons)
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            // Split Google GenAI SDK
            if (id.includes('@google/genai')) {
              return 'google-genai';
            }
            // Bundle remaining third-party dependencies into a general vendor chunk
            return 'vendor';
          }
        }
      }
    }
  }
});
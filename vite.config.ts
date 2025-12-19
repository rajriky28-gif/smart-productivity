import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the chunk size warning limit to 1600kB to suppress warnings
    // caused by large dependencies like framer-motion being bundled.
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy dependencies into separate vendor chunks for better caching
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-ai': ['@google/genai'],
        }
      }
    }
  }
});
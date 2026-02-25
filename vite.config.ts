import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Vite Configuration for Tone Navigator Project
 * 
 * This configuration sets up Vite as the build tool and development server
 * for the ARC, Tone Scale & Emotional Intelligence learning platform.
 * It includes React plugin support, path aliases, and development server settings.
 */

// Get __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * Root directory for the project
   * Vite will look for index.html in the root by default
   */
  root: '.',
  /**
   * React Plugin Configuration
   * Enables React JSX transformation and Fast Refresh for development
   */
  plugins: [react()],

  /**
   * Path Aliases Configuration
   * Allows importing from @/ instead of ../../../../src/
   * This makes imports cleaner and more maintainable
   */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  /**
   * Development Server Configuration
   * Sets up the local development server with hot module replacement
   */
  server: {
    /** Port for development server */
    port: 3000,
    
    /** Automatically open browser when dev server starts */
    open: true,
    
    /** Enable hot module replacement */
    hmr: {
      overlay: true,
    },
    
    /** Proxy API requests to backend if needed */
    proxy: {},
  },

  /**
   * Build Configuration
   * Optimizes the production build
   */
  build: {
    /** Output directory for production build */
    outDir: 'dist',
    
    /** Source map generation for debugging */
    sourcemap: true,
    
    
    /** Rollup options for further customization */
    rollupOptions: {
      output: {
        /** Manual chunk splitting for better code splitting */
        manualChunks: {
          /** Split React into separate chunk */
          react: ['react', 'react-dom', 'react-router-dom'],
          /** Split UI libraries into separate chunk */
          ui: ['framer-motion', 'lucide-react'],
          /** Split date utilities into separate chunk */
          utils: ['date-fns', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },

  /**
   * Preview Server Configuration
   * Sets up the preview server for production build testing
   */
  preview: {
    port: 4173,
    open: false,
  },
});
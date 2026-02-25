import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Vitest Configuration for Tone Navigator
 * 
 * Vitest is a Vite-native test runner. This configuration sets up testing
 * for the ARC, Tone Scale & Emotional Intelligence learning platform.
 */

// Get __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vitest configuration
 * 
 * This configures Vitest to work seamlessly with Vite and the project's
 * TypeScript configuration.
 */
export default defineConfig({
  /**
   * Test configuration
   */
  test: {
    /**
     * Environment - run tests in browser-like environment
     */
    environment: 'jsdom',

    /**
     * Global setup file (if needed for test utilities)
     */
    // globalSetup: './src/test/setup.ts',

    /**
     * Coverage configuration
     */
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/main.tsx',
        'src/App.tsx',
        'src/index.css',
        'src/types/**',
        'src/test/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    /**
     * Include test files
     */
    include: ['TESTS/**/*.test.{ts,tsx}'],

    /**
     * Exclude certain directories
     */
    exclude: ['node_modules/', 'dist/', '.idea/', '.git/'],

    /**
     * Test file patterns
     */
    globals: true,

    /**
     * Clear mocks between tests
     */
    clearMocks: true,

    /**
     * Collect coverage from all files
     */
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],

    /**
     * Update snapshot files
     */
    // updateSnapshot: 'new',
  },

  /**
   * Resolve configuration for path aliases
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
   * Define configuration for specific test files
   */
  define: {
    // Define global constants for tests
    'import.meta.env': {},
  },

  /**
   * Plugins - use React plugin for JSX support in tests
   */
  plugins: [react()],
});

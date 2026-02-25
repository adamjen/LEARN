/**
 * Tailwind CSS Configuration for Tone Navigator
 * 
 * This configuration file customizes Tailwind CSS for the ARC, Tone Scale &
 * Emotional Intelligence learning platform. It extends the default theme with
 * custom colors and utilities specific to the project.
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Content paths - files that contain Tailwind classes
   * Tailwind will scan these files and generate only used classes
   */
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  /**
   * Theme Extension - Custom colors and design tokens
   * These colors reflect the learning platform's aesthetic
   */
  theme: {
    /** Extend default colors with brand colors */
    extend: {
      colors: {
        /** Primary brand color - blue for trust and learning */
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        
        /** Secondary color - purple for creativity and wisdom */
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        
        /** Accent color - green for growth and learning */
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      
      /** Extend spacing scale */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      
      /** Extend typography */
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      
      /** Extend animation utilities */
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  /**
   * Plugins - Additional Tailwind functionality
   */
  plugins: [],
};
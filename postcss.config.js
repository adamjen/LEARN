/**
 * PostCSS Configuration for Tone Navigator
 * 
 * PostCSS processes CSS with plugins. In this project, it's used primarily
 * with Tailwind CSS to process the styles defined in src/index.css.
 */

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    /** Tailwind CSS plugin - processes Tailwind directives */
    tailwindcss: {},
    
    /** Autoprefixer - adds vendor prefixes for browser compatibility */
    autoprefixer: {
      /** Override browsers list if needed */
      // overrideBrowserslist: ['last 2 versions', '>1%'],
    },
  },
};
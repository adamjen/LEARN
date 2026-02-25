/**
 * ESLint Configuration for Tone Navigator
 * 
 * This configuration enforces code quality and consistency across the project.
 * It extends recommended configs for React, TypeScript, and modern JavaScript.
 */

module.exports = {
  /**
   * Root flag - indicates this is the top-level ESLint config
   */
  root: true,

  /**
   * Parser - TypeScript parser for handling TS/TSX files
   */
  parser: '@typescript-eslint/parser',

  /**
   * Parser options - configure how the parser handles the code
   */
  parserOptions: {
    /** Use the project's tsconfig.json */
    project: './tsconfig.json',
    
    /** ECMAScript version */
    ecmaVersion: 2022,
    
    /** Source type - modules */
    sourceType: 'module',
    
    /** JSX support enabled */
    ecmaFeatures: {
      jsx: true,
    },
  },

  /**
   * Plugins - ESLint plugins to use
   */
  plugins: ['react', 'react-hooks', '@typescript-eslint'],

  /**
   * Environment - defines global variables available
   */
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  /**
   * Settings - global settings for plugins
   */
  settings: {
    react: {
      /** React version for plugin */
      version: 'detect',
    },
  },

  /**
   * Extends - inherit configs from other configs
   */
  extends: [
    /** ESLint recommended rules */
    'eslint:recommended',
    
    /** TypeScript ESLint recommended rules */
    'plugin:@typescript-eslint/recommended',
    
    /** React recommended rules */
    'plugin:react/recommended',
    
    /** React hooks recommended rules */
    'plugin:react-hooks/recommended',
    
    /** Airbnb style guide (TypeScript variant) */
    'plugin:react/jsx-runtime',
  ],

  /**
   * Rules - custom rule configurations
   */
  rules: {
    /** React Hooks Rules */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /** React Rules */
    'react/prop-types': 'off',
    'react/display-name': 'off',

    /** TypeScript Rules */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    /** General Rules */
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    /** Complexity limits */
    'max-depth': ['warn', 3],
    'max-nested-callbacks': ['warn', 3],
  },

  /**
   * Ignore Patterns - files to ignore
   */
  ignorePatterns: [
    'dist/',
    'build/',
    'node_modules/',
    '*.min.js',
    '*.min.css',
    '*.svg',
  ],
};
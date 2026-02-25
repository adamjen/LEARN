/**
 * Custom Hooks Index
 * 
 * Re-exports all custom hooks for easy importing.
 * 
 * @module hooks
 */

// Game management hook
export { useGame } from './useGame';

// Tone Scale hook
export { useToneScale } from './useToneScale';

// ARC Triangle hook
export { useARCTriangle } from './useARCTriangle';

// Score tracking hook
export { useScore } from './useScore';

// Local Storage hooks
export { useLocalStorage, useSessionStorage, useLocalStorageArray, useLocalStorageObject } from './useLocalStorage';
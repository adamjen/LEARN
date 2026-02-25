/**
 * Utility Functions Index
 * 
 * Re-exports all utility functions for easy importing.
 * 
 * @module utils
 */

// Scoring utilities
export * from './scoring';

// Tone Scale utilities
export * from './toneScale';

// ARC Calculator utilities (renamed to avoid conflict with scoring.ts)
export {
  DEFAULT_ARC_STATE,
  calculateARCState,
  calculateARCImpact as calculateARCImpact,
  calculateARCImprovement,
  calculateARCDegradation,
  getARCQualityRating,
  calculateARCBalance,
  getARCColor,
  getARCColorBg,
  calculateARCChange,
  isARCOptimal,
  needsARCImprovement,
  getARCRecommendations,
} from './arcCalculator';
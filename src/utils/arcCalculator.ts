/**
 * ARC Calculator Utilities for Tone Navigator
 * 
 * This module provides utilities for calculating and analyzing
 * ARC (Appreciation, Reality, Communication) states and their impacts.
 * 
 * @module utils/arcCalculator
 */

import { ARCState } from '../types/game';

/**
 * Default ARC state
 * 
 * Represents a neutral ARC state with balanced values.
 */
export const DEFAULT_ARC_STATE: ARCState = {
  appreciation: 5,
  reality: 5,
  communication: 5,
  total: 15,
  average: 5,
};

/**
 * Calculate ARC state from individual values
 * 
 * Computes the total and average from individual ARC component values.
 * 
 * @param appreciation - Appreciation value (0-10)
 * @param reality - Reality value (0-10)
 * @param communication - Communication value (0-10)
 * @returns Complete ARC state object
 * 
 * @example
 * const state = calculateARCState(7, 5, 8);
 * // Returns: { appreciation: 7, reality: 5, communication: 8, total: 20, average: 6.67 }
 */
export const calculateARCState = (
  appreciation: number,
  reality: number,
  communication: number
): ARCState => {
  const total = appreciation + reality + communication;
  const average = total / 3;
  
  return {
    appreciation,
    reality,
    communication,
    total,
    average,
  };
};

/**
 * Calculate ARC impact from tone change
 * 
 * Distributes a tone change across the three ARC components.
 * 
 * @param toneChange - The tone change to distribute
 * @param distribution - Optional distribution pattern ('balanced', 'appreciation-focused', etc.)
 * @returns ARC impact distribution
 * 
 * @example
 * const impact = calculateARCImpact(3, 'balanced');
 * // Returns: { appreciation: 1, reality: 1, communication: 1 }
 */
export const calculateARCImpact = (
  toneChange: number,
  distribution: 'balanced' | 'appreciation-focused' | 'reality-focused' | 'communication-focused' = 'balanced'
): {
  appreciation: number;
  reality: number;
  communication: number;
  total: number;
} => {
  let appreciation = 0;
  let reality = 0;
  let communication = 0;
  
  switch (distribution) {
    case 'balanced':
      appreciation = toneChange / 3;
      reality = toneChange / 3;
      communication = toneChange / 3;
      break;
    case 'appreciation-focused':
      appreciation = toneChange * 0.5;
      reality = toneChange * 0.25;
      communication = toneChange * 0.25;
      break;
    case 'reality-focused':
      appreciation = toneChange * 0.25;
      reality = toneChange * 0.5;
      communication = toneChange * 0.25;
      break;
    case 'communication-focused':
      appreciation = toneChange * 0.25;
      reality = toneChange * 0.25;
      communication = toneChange * 0.5;
      break;
  }
  
  return {
    appreciation: Math.round(appreciation * 10) / 10,
    reality: Math.round(reality * 10) / 10,
    communication: Math.round(communication * 10) / 10,
    total: toneChange,
  };
};

/**
 * Calculate ARC improvement from response
 * 
 * Determines how an ARC state improves based on response quality.
 * 
 * @param currentARC - Current ARC state
 * @param isOptimal - Whether the response is optimal
 * @param toneChange - The tone change from the response
 * @returns Improved ARC state
 * 
 * @example
 * const improved = calculateARCImprovement({ appreciation: 5, reality: 5, communication: 5 }, true, 3);
 * // Returns: { appreciation: 6, reality: 6, communication: 6, total: 18, average: 6 }
 */
export const calculateARCImprovement = (
  currentARC: ARCState,
  isOptimal: boolean,
  toneChange: number
): ARCState => {
  if (!isOptimal) {
    return currentARC;
  }
  
  // Calculate improvement per component
  const improvement = toneChange / 3;
  
  return {
    appreciation: Math.min(10, currentARC.appreciation + improvement),
    reality: Math.min(10, currentARC.reality + improvement),
    communication: Math.min(10, currentARC.communication + improvement),
    total: Math.min(30, currentARC.total + toneChange),
    average: Math.min(10, currentARC.average + improvement),
  };
};

/**
 * Calculate ARC degradation from non-optimal response
 * 
 * Determines how an ARC state degrades based on non-optimal response.
 * 
 * @param currentARC - Current ARC state
 * @param toneChange - The tone change (should be negative)
 * @returns Degraded ARC state
 * 
 * @example
 * const degraded = calculateARCDegradation({ appreciation: 7, reality: 6, communication: 8 }, -2);
 * // Returns: { appreciation: 6.33, reality: 5.33, communication: 7.33, total: 19, average: 6.33 }
 */
export const calculateARCDegradation = (
  currentARC: ARCState,
  toneChange: number
): ARCState => {
  // Calculate degradation per component
  const degradation = toneChange / 3;
  
  return {
    appreciation: Math.max(0, currentARC.appreciation + degradation),
    reality: Math.max(0, currentARC.reality + degradation),
    communication: Math.max(0, currentARC.communication + degradation),
    total: Math.max(0, currentARC.total + toneChange),
    average: Math.max(0, currentARC.average + degradation),
  };
};

/**
 * Get ARC quality rating
 * 
 * Provides a qualitative rating based on ARC total score.
 * 
 * @param arcState - The ARC state to evaluate
 * @returns Quality rating string
 * 
 * @example
 * const rating = getARCQualityRating({ appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 });
 * // Returns: 'Excellent'
 */
export const getARCQualityRating = (arcState: ARCState): string => {
  const average = arcState.average;
  
  if (average >= 8) return 'Excellent';
  if (average >= 6) return 'Good';
  if (average >= 4) return 'Fair';
  if (average >= 2) return 'Poor';
  return 'Critical';
};

/**
 * Calculate ARC balance
 * 
 * Measures how balanced the ARC components are (0-100%).
 * 
 * @param arcState - The ARC state to evaluate
 * @returns Balance percentage (0-100)
 * 
 * @example
 * const balance = calculateARCBalance({ appreciation: 7, reality: 7, communication: 7, total: 21, average: 7 });
 * // Returns: 100
 */
export const calculateARCBalance = (arcState: ARCState): number => {
  const { appreciation, reality, communication } = arcState;
  
  // Calculate variance from average
  const variance = Math.abs(appreciation - arcState.average) + 
                   Math.abs(reality - arcState.average) + 
                   Math.abs(communication - arcState.average);
  
  // Convert to balance percentage (max variance is 10, which gives 0% balance)
  const balance = Math.max(0, 100 - (variance / 10) * 100);
  
  return Math.round(balance);
};

/**
 * Get ARC color based on total score
 * 
 * Returns an appropriate color based on the ARC total score.
 * 
 * @param arcState - The ARC state
 * @returns CSS color class
 * 
 * @example
 * const color = getARCColor({ appreciation: 7, reality: 6, communication: 8, total: 21, average: 7 });
 * // Returns: 'text-green-600'
 */
export const getARCColor = (arcState: ARCState): string => {
  const average = arcState.average;
  
  if (average >= 8) return 'text-green-600';
  if (average >= 6) return 'text-green-500';
  if (average >= 4) return 'text-yellow-500';
  if (average >= 2) return 'text-orange-500';
  return 'text-red-500';
};

/**
 * Get ARC background color based on total score
 * 
 * Returns an appropriate background color based on the ARC total score.
 * 
 * @param arcState - The ARC state
 * @returns CSS color class
 * 
 * @example
 * const bg = getARCBgColor({ appreciation: 7, reality: 6, communication: 8, total: 21, average: 7 });
 * // Returns: 'bg-green-50'
 */
export const getARCColorBg = (arcState: ARCState): string => {
  const average = arcState.average;
  
  if (average >= 8) return 'bg-green-100';
  if (average >= 6) return 'bg-green-50';
  if (average >= 4) return 'bg-yellow-50';
  if (average >= 2) return 'bg-orange-50';
  return 'bg-red-50';
};

/**
 * Calculate ARC change from two states
 * 
 * Calculates the change between two ARC states.
 * 
 * @param previous - Previous ARC state
 * @param current - Current ARC state
 * @returns Change in each component and total
 * 
 * @example
 * const change = calculateARCChange(
 *   { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 },
 *   { appreciation: 7, reality: 6, communication: 8, total: 21, average: 7 }
 * );
 * // Returns: { appreciation: 2, reality: 1, communication: 3, total: 6 }
 */
export const calculateARCChange = (
  previous: ARCState,
  current: ARCState
): {
  appreciation: number;
  reality: number;
  communication: number;
  total: number;
} => {
  return {
    appreciation: current.appreciation - previous.appreciation,
    reality: current.reality - previous.reality,
    communication: current.communication - previous.communication,
    total: current.total - previous.total,
  };
};

/**
 * Check if ARC state is optimal
 * 
 * Determines if an ARC state represents an optimal level.
 * 
 * @param arcState - The ARC state to evaluate
 * @returns True if ARC state is optimal
 * 
 * @example
 * const isOptimal = isARCOptimal({ appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 });
 * // Returns: true
 */
export const isARCOptimal = (arcState: ARCState): boolean => {
  return arcState.average >= 7;
};

/**
 * Check if ARC state needs improvement
 * 
 * Determines if an ARC state needs improvement.
 * 
 * @param arcState - The ARC state to evaluate
 * @returns True if ARC state needs improvement
 * 
 * @example
 * const needsImprovement = needsARCImprovement({ appreciation: 4, reality: 3, communication: 5, total: 12, average: 4 });
 * // Returns: true
 */
export const needsARCImprovement = (arcState: ARCState): boolean => {
  return arcState.average < 5;
};

/**
 * Get ARC recommendations
 * 
 * Provides recommendations for improving ARC based on current state.
 * 
 * @param arcState - The ARC state
 * @returns Array of recommendations
 * 
 * @example
 * const recommendations = getARCRecommendations({ appreciation: 3, reality: 4, communication: 2, total: 9, average: 3 });
 * // Returns: ['Focus on building appreciation', 'Improve communication skills', ...]
 */
export const getARCRecommendations = (arcState: ARCState): string[] => {
  const recommendations: string[] = [];
  
  if (arcState.appreciation < 4) {
    recommendations.push('Focus on building appreciation for others');
  }
  if (arcState.reality < 4) {
    recommendations.push('Work on shared understanding and truth');
  }
  if (arcState.communication < 4) {
    recommendations.push('Improve information exchange and listening');
  }
  
  if (arcState.average >= 7) {
    recommendations.push('Maintain your strong ARC - keep practicing!');
  }
  
  return recommendations.length > 0 ? recommendations : ['Your ARC is balanced - continue practicing!'];
};

export default {
  DEFAULT_ARC_STATE,
  calculateARCState,
  calculateARCImpact,
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
};
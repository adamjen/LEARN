/**
 * ARC Calculator Utility Tests
 * 
 * Comprehensive unit tests for arcCalculator.ts including:
 * - ARC state calculations
 * - ARC impact distribution
 * - ARC improvement and degradation
 * - Quality ratings
 * - Balance calculations
 * - Recommendations
 * 
 * @module tests/utils/arcCalculator
 */

import { describe, it, expect, beforeEach } from 'vitest';
import * as arcCalculator from '../../src/utils/arcCalculator';
import { ARCState } from '../../src/types/game';

describe('ARC Calculator Utilities', () => {
  beforeEach(() => {
    // No mocks needed for this module
  });

  describe('DEFAULT_ARC_STATE', () => {
    it('should have balanced default values', () => {
      expect(arcCalculator.DEFAULT_ARC_STATE.appreciation).toBe(5);
      expect(arcCalculator.DEFAULT_ARC_STATE.reality).toBe(5);
      expect(arcCalculator.DEFAULT_ARC_STATE.communication).toBe(5);
      expect(arcCalculator.DEFAULT_ARC_STATE.total).toBe(15);
      expect(arcCalculator.DEFAULT_ARC_STATE.average).toBe(5);
    });
  });

  describe('calculateARCState', () => {
    it('should calculate state from individual values', () => {
      const result = arcCalculator.calculateARCState(7, 5, 8);
      expect(result.appreciation).toBe(7);
      expect(result.reality).toBe(5);
      expect(result.communication).toBe(8);
      expect(result.total).toBe(20);
      expect(result.average).toBe(6.666666666666667);
    });

    it('should handle equal values', () => {
      const result = arcCalculator.calculateARCState(5, 5, 5);
      expect(result.total).toBe(15);
      expect(result.average).toBe(5);
    });

    it('should handle maximum values', () => {
      const result = arcCalculator.calculateARCState(10, 10, 10);
      expect(result.total).toBe(30);
      expect(result.average).toBe(10);
    });

    it('should handle minimum values', () => {
      const result = arcCalculator.calculateARCState(0, 0, 0);
      expect(result.total).toBe(0);
      expect(result.average).toBe(0);
    });

    it('should handle mixed values', () => {
      const result = arcCalculator.calculateARCState(3, 7, 5);
      expect(result.total).toBe(15);
      expect(result.average).toBe(5);
    });
  });

  describe('calculateARCImpact', () => {
    it('should distribute balanced equally', () => {
      const result = arcCalculator.calculateARCImpact(9, 'balanced');
      expect(result.appreciation).toBe(3);
      expect(result.reality).toBe(3);
      expect(result.communication).toBe(3);
      expect(result.total).toBe(9);
    });

    it('should distribute appreciation-focused', () => {
      const result = arcCalculator.calculateARCImpact(10, 'appreciation-focused');
      expect(result.appreciation).toBe(5);
      expect(result.reality).toBe(2.5);
      expect(result.communication).toBe(2.5);
      expect(result.total).toBe(10);
    });

    it('should distribute reality-focused', () => {
      const result = arcCalculator.calculateARCImpact(10, 'reality-focused');
      expect(result.appreciation).toBe(2.5);
      expect(result.reality).toBe(5);
      expect(result.communication).toBe(2.5);
      expect(result.total).toBe(10);
    });

    it('should distribute communication-focused', () => {
      const result = arcCalculator.calculateARCImpact(10, 'communication-focused');
      expect(result.appreciation).toBe(2.5);
      expect(result.reality).toBe(2.5);
      expect(result.communication).toBe(5);
      expect(result.total).toBe(10);
    });

    it('should handle negative tone change', () => {
      const result = arcCalculator.calculateARCImpact(-9, 'balanced');
      expect(result.appreciation).toBe(-3);
      expect(result.reality).toBe(-3);
      expect(result.communication).toBe(-3);
      expect(result.total).toBe(-9);
    });

    it('should default to balanced distribution', () => {
      const result = arcCalculator.calculateARCImpact(6);
      expect(result.appreciation).toBe(2);
      expect(result.reality).toBe(2);
      expect(result.communication).toBe(2);
    });

    it('should round to one decimal place', () => {
      const result = arcCalculator.calculateARCImpact(7, 'balanced');
      expect(result.appreciation).toBe(2.3);
      expect(result.reality).toBe(2.3);
      expect(result.communication).toBe(2.3);
    });
  });

  describe('calculateARCImprovement', () => {
    it('should return unchanged state for non-optimal responses', () => {
      const current: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCImprovement(current, false, 3);
      expect(result).toEqual(current);
    });

    it('should improve state for optimal responses', () => {
      const current: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCImprovement(current, true, 3);
      expect(result.appreciation).toBe(6);
      expect(result.reality).toBe(6);
      expect(result.communication).toBe(6);
      expect(result.total).toBe(18);
      expect(result.average).toBe(6);
    });

    it('should cap at maximum values', () => {
      const current: ARCState = { appreciation: 9, reality: 9, communication: 9, total: 27, average: 9 };
      const result = arcCalculator.calculateARCImprovement(current, true, 5);
      expect(result.appreciation).toBe(10);
      expect(result.reality).toBe(10);
      expect(result.communication).toBe(10);
      expect(result.total).toBe(30);
      expect(result.average).toBe(10);
    });

    it('should handle zero tone change', () => {
      const current: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCImprovement(current, true, 0);
      expect(result.appreciation).toBe(5);
      expect(result.average).toBe(5);
    });

    it('should handle small improvements', () => {
      const current: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCImprovement(current, true, 1);
      expect(result.appreciation).toBe(5.333333333333333);
      expect(result.average).toBe(5.333333333333333);
    });
  });

  describe('calculateARCDegradation', () => {
    it('should degrade state for negative tone change', () => {
      const current: ARCState = { appreciation: 7, reality: 6, communication: 8, total: 21, average: 7 };
      const result = arcCalculator.calculateARCDegradation(current, -3);
      expect(result.appreciation).toBe(6);
      expect(result.reality).toBe(5.666666666666667);
      expect(result.communication).toBe(7);
      expect(result.total).toBe(18);
      expect(result.average).toBe(6);
    });

    it('should not go below zero', () => {
      const current: ARCState = { appreciation: 1, reality: 1, communication: 1, total: 3, average: 1 };
      const result = arcCalculator.calculateARCDegradation(current, -10);
      expect(result.appreciation).toBe(0);
      expect(result.reality).toBe(0);
      expect(result.communication).toBe(0);
      expect(result.total).toBe(0);
      expect(result.average).toBe(0);
    });

    it('should handle zero tone change', () => {
      const current: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCDegradation(current, 0);
      expect(result).toEqual(current);
    });

    it('should handle small degradation', () => {
      const current: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCDegradation(current, -1);
      expect(result.appreciation).toBe(4.666666666666667);
      expect(result.average).toBe(4.666666666666667);
    });
  });

  describe('getARCQualityRating', () => {
    it('should return "Excellent" for average >= 8', () => {
      const state: ARCState = { appreciation: 8, reality: 8, communication: 8, total: 24, average: 8 };
      expect(arcCalculator.getARCQualityRating(state)).toBe('Excellent');
    });

    it('should return "Good" for average 6-7', () => {
      const state: ARCState = { appreciation: 6, reality: 7, communication: 6, total: 19, average: 6.33 };
      expect(arcCalculator.getARCQualityRating(state)).toBe('Good');
    });

    it('should return "Fair" for average 4-5', () => {
      const state: ARCState = { appreciation: 4, reality: 5, communication: 4, total: 13, average: 4.33 };
      expect(arcCalculator.getARCQualityRating(state)).toBe('Fair');
    });

    it('should return "Poor" for average 2-3', () => {
      const state: ARCState = { appreciation: 2, reality: 3, communication: 2, total: 7, average: 2.33 };
      expect(arcCalculator.getARCQualityRating(state)).toBe('Poor');
    });

    it('should return "Critical" for average < 2', () => {
      const state: ARCState = { appreciation: 1, reality: 1, communication: 0, total: 2, average: 0.67 };
      expect(arcCalculator.getARCQualityRating(state)).toBe('Critical');
    });

    it('should handle zero average', () => {
      const state: ARCState = { appreciation: 0, reality: 0, communication: 0, total: 0, average: 0 };
      expect(arcCalculator.getARCQualityRating(state)).toBe('Critical');
    });
  });

  describe('calculateARCBalance', () => {
    it('should return 100% for perfectly balanced state', () => {
      const state: ARCState = { appreciation: 7, reality: 7, communication: 7, total: 21, average: 7 };
      expect(arcCalculator.calculateARCBalance(state)).toBe(100);
    });

    it('should return lower balance for unbalanced state', () => {
      const state: ARCState = { appreciation: 10, reality: 5, communication: 0, total: 15, average: 5 };
      const balance = arcCalculator.calculateARCBalance(state);
      expect(balance).toBe(0);
    });

    it('should return 0% for maximum variance', () => {
      const state: ARCState = { appreciation: 10, reality: 0, communication: 0, total: 10, average: 3.33 };
      const balance = arcCalculator.calculateARCBalance(state);
      expect(balance).toBe(0);
    });

    it('should handle moderate imbalance', () => {
      const state: ARCState = { appreciation: 8, reality: 5, communication: 4, total: 17, average: 5.67 };
      const balance = arcCalculator.calculateARCBalance(state);
      expect(balance).toBeGreaterThan(0);
      expect(balance).toBeLessThan(100);
    });

    it('should handle perfectly equal values', () => {
      const state: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      expect(arcCalculator.calculateARCBalance(state)).toBe(100);
    });
  });

  describe('getARCColor', () => {
    it('should return green for high average', () => {
      const state: ARCState = { appreciation: 8, reality: 8, communication: 8, total: 24, average: 8 };
      expect(arcCalculator.getARCColor(state)).toBe('text-green-600');
    });

    it('should return medium green for good average', () => {
      const state: ARCState = { appreciation: 6, reality: 7, communication: 6, total: 19, average: 6.33 };
      expect(arcCalculator.getARCColor(state)).toBe('text-green-500');
    });

    it('should return yellow for fair average', () => {
      const state: ARCState = { appreciation: 4, reality: 5, communication: 4, total: 13, average: 4.33 };
      expect(arcCalculator.getARCColor(state)).toBe('text-yellow-500');
    });

    it('should return orange for poor average', () => {
      const state: ARCState = { appreciation: 2, reality: 3, communication: 2, total: 7, average: 2.33 };
      expect(arcCalculator.getARCColor(state)).toBe('text-orange-500');
    });

    it('should return red for critical average', () => {
      const state: ARCState = { appreciation: 1, reality: 1, communication: 0, total: 2, average: 0.67 };
      expect(arcCalculator.getARCColor(state)).toBe('text-red-500');
    });
  });

  describe('getARCColorBg', () => {
    it('should return light green background for high average', () => {
      const state: ARCState = { appreciation: 8, reality: 8, communication: 8, total: 24, average: 8 };
      expect(arcCalculator.getARCColorBg(state)).toBe('bg-green-100');
    });

    it('should return green background for good average', () => {
      const state: ARCState = { appreciation: 6, reality: 7, communication: 6, total: 19, average: 6.33 };
      expect(arcCalculator.getARCColorBg(state)).toBe('bg-green-50');
    });

    it('should return yellow background for fair average', () => {
      const state: ARCState = { appreciation: 4, reality: 5, communication: 4, total: 13, average: 4.33 };
      expect(arcCalculator.getARCColorBg(state)).toBe('bg-yellow-50');
    });

    it('should return orange background for poor average', () => {
      const state: ARCState = { appreciation: 2, reality: 3, communication: 2, total: 7, average: 2.33 };
      expect(arcCalculator.getARCColorBg(state)).toBe('bg-orange-50');
    });

    it('should return red background for critical average', () => {
      const state: ARCState = { appreciation: 1, reality: 1, communication: 0, total: 2, average: 0.67 };
      expect(arcCalculator.getARCColorBg(state)).toBe('bg-red-50');
    });
  });

  describe('calculateARCChange', () => {
    it('should calculate positive change', () => {
      const previous: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const current: ARCState = { appreciation: 7, reality: 6, communication: 8, total: 21, average: 7 };
      const result = arcCalculator.calculateARCChange(previous, current);
      expect(result.appreciation).toBe(2);
      expect(result.reality).toBe(1);
      expect(result.communication).toBe(3);
      expect(result.total).toBe(6);
    });

    it('should calculate negative change', () => {
      const previous: ARCState = { appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 };
      const current: ARCState = { appreciation: 6, reality: 5, communication: 6, total: 17, average: 5.67 };
      const result = arcCalculator.calculateARCChange(previous, current);
      expect(result.appreciation).toBe(-2);
      expect(result.reality).toBe(-2);
      expect(result.communication).toBe(-3);
      expect(result.total).toBe(-7);
    });

    it('should return zero change for same state', () => {
      const state: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const result = arcCalculator.calculateARCChange(state, state);
      expect(result.appreciation).toBe(0);
      expect(result.reality).toBe(0);
      expect(result.communication).toBe(0);
      expect(result.total).toBe(0);
    });
  });

  describe('isARCOptimal', () => {
    it('should return true for average >= 7', () => {
      const state: ARCState = { appreciation: 7, reality: 7, communication: 7, total: 21, average: 7 };
      expect(arcCalculator.isARCOptimal(state)).toBe(true);
    });

    it('should return true for high average', () => {
      const state: ARCState = { appreciation: 9, reality: 8, communication: 10, total: 27, average: 9 };
      expect(arcCalculator.isARCOptimal(state)).toBe(true);
    });

    it('should return false for average < 7', () => {
      const state: ARCState = { appreciation: 6, reality: 6, communication: 6, total: 18, average: 6 };
      expect(arcCalculator.isARCOptimal(state)).toBe(false);
    });

    it('should return false for low average', () => {
      const state: ARCState = { appreciation: 4, reality: 3, communication: 5, total: 12, average: 4 };
      expect(arcCalculator.isARCOptimal(state)).toBe(false);
    });
  });

  describe('needsARCImprovement', () => {
    it('should return true for average < 5', () => {
      const state: ARCState = { appreciation: 4, reality: 3, communication: 5, total: 12, average: 4 };
      expect(arcCalculator.needsARCImprovement(state)).toBe(true);
    });

    it('should return true for low average', () => {
      const state: ARCState = { appreciation: 2, reality: 2, communication: 3, total: 7, average: 2.33 };
      expect(arcCalculator.needsARCImprovement(state)).toBe(true);
    });

    it('should return false for average >= 5', () => {
      const state: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      expect(arcCalculator.needsARCImprovement(state)).toBe(false);
    });

    it('should return false for high average', () => {
      const state: ARCState = { appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 };
      expect(arcCalculator.needsARCImprovement(state)).toBe(false);
    });
  });

  describe('getARCRecommendations', () => {
    it('should provide recommendations for low appreciation', () => {
      const state: ARCState = { appreciation: 3, reality: 6, communication: 5, total: 14, average: 4.67 };
      const recommendations = arcCalculator.getARCRecommendations(state);
      expect(recommendations).toContain('Focus on building appreciation for others');
    });

    it('should provide recommendations for low reality', () => {
      const state: ARCState = { appreciation: 6, reality: 2, communication: 5, total: 13, average: 4.33 };
      const recommendations = arcCalculator.getARCRecommendations(state);
      expect(recommendations).toContain('Work on shared understanding and truth');
    });

    it('should provide recommendations for low communication', () => {
      const state: ARCState = { appreciation: 6, reality: 5, communication: 2, total: 13, average: 4.33 };
      const recommendations = arcCalculator.getARCRecommendations(state);
      expect(recommendations).toContain('Improve information exchange and listening');
    });

    it('should provide maintenance recommendation for high ARC', () => {
      const state: ARCState = { appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 };
      const recommendations = arcCalculator.getARCRecommendations(state);
      expect(recommendations).toContain('Maintain your strong ARC - keep practicing!');
    });

    it('should provide default message for balanced state', () => {
      const state: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const recommendations = arcCalculator.getARCRecommendations(state);
      expect(recommendations).toContain('Your ARC is balanced');
    });

    it('should return multiple recommendations when needed', () => {
      const state: ARCState = { appreciation: 2, reality: 2, communication: 2, total: 6, average: 2 };
      const recommendations = arcCalculator.getARCRecommendations(state);
      expect(recommendations.length).toBe(3);
    });
  });
});
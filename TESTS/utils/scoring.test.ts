/**
 * Scoring Utility Tests
 * 
 * Comprehensive unit tests for scoring.ts including:
 * - Response score calculations
 * - Feedback generation
 * - ARC impact calculations
 * - Difficulty and category bonuses
 * - Streak and achievement calculations
 * 
 * @module tests/utils/scoring
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as scoring from '../../src/utils/scoring';
import { ResponseOption } from '../../src/types/game';
import { ScenarioCategory, ScenarioDifficulty } from '../../src/types/scenarios';

describe('Scoring Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockOption: ResponseOption = {
    id: 'test-option-1',
    text: 'Test response option',
    toneImpact: 5,
    isOptimal: true
  };

  describe('calculateResponseScore', () => {
    it('should calculate score for optimal response with beginner difficulty', () => {
      const result = scoring.calculateResponseScore(
        mockOption,
        true,
        ScenarioDifficulty.BEGINNER
      );

      expect(result).toBeGreaterThan(0);
      expect(result).toBeGreaterThanOrEqual(100);
    });

    it('should calculate score for optimal response with expert difficulty', () => {
      const result = scoring.calculateResponseScore(
        mockOption,
        true,
        ScenarioDifficulty.EXPERT
      );

      expect(result).toBeGreaterThan(200);
    });

    it('should calculate lower score for non-optimal response', () => {
      const result = scoring.calculateResponseScore(
        mockOption,
        false,
        ScenarioDifficulty.INTERMEDIATE
      );

      expect(result).toBeLessThan(100);
      expect(result).toBeGreaterThanOrEqual(30);
    });

    it('should add tone impact bonus up to 50 points', () => {
      const highImpactOption: ResponseOption = {
        ...mockOption,
        toneImpact: 10
      };

      const result = scoring.calculateResponseScore(
        highImpactOption,
        true,
        ScenarioDifficulty.BEGINNER
      );

      // Base score 100 + tone bonus (10 * 10 = 100, capped at 50) = 150
      expect(result).toBeGreaterThanOrEqual(150);
    });

    it('should cap tone bonus at 50 points', () => {
      const maxImpactOption: ResponseOption = {
        ...mockOption,
        toneImpact: 100
      };

      const result = scoring.calculateResponseScore(
        maxImpactOption,
        true,
        ScenarioDifficulty.BEGINNER
      );

      // Base score 100 + tone bonus (capped at 50) = 150
      expect(result).toBeLessThanOrEqual(150);
    });
  });

  describe('calculateFeedback', () => {
    it('should generate feedback for optimal response', () => {
      const result = scoring.calculateFeedback(
        mockOption,
        5,
        true,
        'Great choice!',
        ['Learn from this experience']
      );

      expect(result.isOptimal).toBe(true);
      expect(result.toneChange).toBe(5);
      expect(result.newToneLevel).toBe(10);
      expect(result.explanation).toBe('Great choice!');
      expect(result.learningPoints).toEqual(['Learn from this experience']);
      expect(result.selectedOptionId).toBe('test-option-1');
      expect(result.timestamp).toBeDefined();
    });

    it('should generate feedback for non-optimal response', () => {
      const result = scoring.calculateFeedback(
        mockOption,
        5,
        false,
        'Not the best choice',
        ['Consider alternative approaches']
      );

      expect(result.isOptimal).toBe(false);
      expect(result.toneChange).toBe(5);
    });

    it('should include optional alternative suggestion', () => {
      const result = scoring.calculateFeedback(
        mockOption,
        5,
        false,
        'Not optimal',
        ['Point 1'],
        'Try this alternative instead'
      );

      expect(result.alternative).toBe('Try this alternative instead');
    });

    it('should calculate ARC impact based on tone change', () => {
      const result = scoring.calculateFeedback(
        mockOption,
        5,
        true,
        'Good',
        []
      );

      expect(result.arcImpact).toBeDefined();
      expect(result.arcImpact.total).toBe(5);
    });
  });

  describe('calculateARCImpact', () => {
    it('should distribute positive tone change across ARC components', () => {
      const result = scoring.calculateARCImpact(9);

      expect(result.total).toBe(9);
      expect(result.appreciation + result.reality + result.communication).toBe(9);
    });

    it('should distribute negative tone change across ARC components', () => {
      const result = scoring.calculateARCImpact(-9);

      expect(result.total).toBe(-9);
      expect(result.appreciation + result.reality + result.communication).toBe(-9);
    });

    it('should handle zero tone change', () => {
      const result = scoring.calculateARCImpact(0);

      expect(result.total).toBe(0);
      expect(result.appreciation).toBe(0);
      expect(result.reality).toBe(0);
      expect(result.communication).toBe(0);
    });

    it('should distribute impact equally across components', () => {
      const result = scoring.calculateARCImpact(6);

      expect(result.appreciation).toBe(2);
      expect(result.reality).toBe(2);
      expect(result.communication).toBe(2);
    });

    it('should handle odd tone changes with rounding', () => {
      const result = scoring.calculateARCImpact(7);

      expect(result.total).toBe(7);
      // Each component gets approximately 2.333, rounded to 2.3
      expect(result.appreciation).toBe(2.3);
    });
  });

  describe('getDifficultyMultiplier', () => {
    it('should return 1.0 for beginner difficulty', () => {
      expect(scoring.getDifficultyMultiplier(ScenarioDifficulty.BEGINNER)).toBe(1.0);
    });

    it('should return 1.2 for intermediate difficulty', () => {
      expect(scoring.getDifficultyMultiplier(ScenarioDifficulty.INTERMEDIATE)).toBe(1.2);
    });

    it('should return 1.5 for advanced difficulty', () => {
      expect(scoring.getDifficultyMultiplier(ScenarioDifficulty.ADVANCED)).toBe(1.5);
    });

    it('should return 2.0 for expert difficulty', () => {
      expect(scoring.getDifficultyMultiplier(ScenarioDifficulty.EXPERT)).toBe(2.0);
    });

    it('should default to 1.0 for unknown difficulty', () => {
      expect(scoring.getDifficultyMultiplier('unknown' as any)).toBe(1.0);
    });
  });

  describe('getCategoryBonus', () => {
    it('should return 10 for workplace category', () => {
      expect(scoring.getCategoryBonus(ScenarioCategory.WORKPLACE)).toBe(10);
    });

    it('should return 8 for family category', () => {
      expect(scoring.getCategoryBonus(ScenarioCategory.FAMILY)).toBe(8);
    });

    it('should return 6 for friends category', () => {
      expect(scoring.getCategoryBonus(ScenarioCategory.FRIENDS)).toBe(6);
    });

    it('should return 5 for general category', () => {
      expect(scoring.getCategoryBonus(ScenarioCategory.GENERAL)).toBe(5);
    });

    it('should return 0 for unknown category', () => {
      expect(scoring.getCategoryBonus('unknown' as any)).toBe(0);
    });
  });

  describe('calculateTotalScore', () => {
    it('should combine response score and category bonus', () => {
      const result = scoring.calculateTotalScore(
        mockOption,
        true,
        ScenarioDifficulty.BEGINNER,
        ScenarioCategory.WORKPLACE
      );

      // Response score: 100 * 1.0 + 50 (tone bonus) = 150
      // Category bonus: 10
      // Total: 160
      expect(result).toBe(160);
    });

    it('should handle zero category bonus', () => {
      const result = scoring.calculateTotalScore(
        mockOption,
        true,
        ScenarioDifficulty.BEGINNER,
        ScenarioCategory.GENERAL
      );

      expect(result).toBe(155);
    });

    it('should handle non-optimal responses', () => {
      const result = scoring.calculateTotalScore(
        mockOption,
        false,
        ScenarioDifficulty.INTERMEDIATE,
        ScenarioCategory.FRIENDS
      );

      // Response score: 30 * 1.2 + 50 = 86
      // Category bonus: 6
      // Total: 92
      expect(result).toBe(92);
    });
  });

  describe('calculateStreakBonus', () => {
    it('should return 0 for streak of 0', () => {
      expect(scoring.calculateStreakBonus(0)).toBe(0);
    });

    it('should return 5 for streak of 1', () => {
      expect(scoring.calculateStreakBonus(1)).toBe(5);
    });

    it('should return 10 for streak of 2', () => {
      expect(scoring.calculateStreakBonus(2)).toBe(10);
    });

    it('should return 15 for streak of 3', () => {
      expect(scoring.calculateStreakBonus(3)).toBe(15);
    });

    it('should return 20 for streak of 4', () => {
      expect(scoring.calculateStreakBonus(4)).toBe(20);
    });

    it('should return 25 for streak of 5', () => {
      expect(scoring.calculateStreakBonus(5)).toBe(25);
    });

    it('should return 35 for streak of 7', () => {
      expect(scoring.calculateStreakBonus(7)).toBe(35);
    });

    it('should return 45 for streak of 8', () => {
      expect(scoring.calculateStreakBonus(8)).toBe(45);
    });

    it('should return 65 for streak of 10', () => {
      // 35 + (10 - 7) * 10 = 35 + 30 = 65
      expect(scoring.calculateStreakBonus(10)).toBe(65);
    });
  });

  describe('calculateAchievementPoints', () => {
    it('should calculate points based on scenarios completed', () => {
      const result = scoring.calculateAchievementPoints(10, 5, 3);
      // 10 * 10 + 5 * 5 + 15 = 100 + 25 + 15 = 140
      expect(result).toBe(140);
    });

    it('should give points for positive tone achieved', () => {
      const result = scoring.calculateAchievementPoints(5, 10, 0);
      // 5 * 10 + 10 * 5 + 0 = 50 + 50 + 0 = 100
      expect(result).toBe(100);
    });

    it('should not give points for negative tone achieved', () => {
      const result = scoring.calculateAchievementPoints(5, -10, 0);
      // 5 * 10 + 0 + 0 = 50
      expect(result).toBe(50);
    });

    it('should include streak bonus in calculation', () => {
      const result = scoring.calculateAchievementPoints(0, 0, 5);
      // 0 + 0 + 25 = 25
      expect(result).toBe(25);
    });

    it('should handle zero values', () => {
      const result = scoring.calculateAchievementPoints(0, 0, 0);
      expect(result).toBe(0);
    });

    it('should handle high values', () => {
      const result = scoring.calculateAchievementPoints(50, 20, 10);
      // 50 * 10 + 20 * 5 + 65 = 500 + 100 + 65 = 665
      expect(result).toBe(665);
    });
  });

  describe('getResponseQualityRating', () => {
    it('should return "Excellent" for tone change >= 5 with optimal', () => {
      expect(scoring.getResponseQualityRating(5, true)).toBe('Excellent');
      expect(scoring.getResponseQualityRating(10, true)).toBe('Excellent');
    });

    it('should return "Great" for tone change 3-4 with optimal', () => {
      expect(scoring.getResponseQualityRating(3, true)).toBe('Great');
      expect(scoring.getResponseQualityRating(4, true)).toBe('Great');
    });

    it('should return "Good" for tone change 1-2 with optimal', () => {
      expect(scoring.getResponseQualityRating(1, true)).toBe('Good');
      expect(scoring.getResponseQualityRating(2, true)).toBe('Good');
    });

    it('should return "Average" for tone change 0 with optimal', () => {
      expect(scoring.getResponseQualityRating(0, true)).toBe('Average');
    });

    it('should return "Poor" for non-optimal responses', () => {
      expect(scoring.getResponseQualityRating(10, false)).toBe('Poor');
      expect(scoring.getResponseQualityRating(5, false)).toBe('Poor');
      expect(scoring.getResponseQualityRating(0, false)).toBe('Poor');
    });

    it('should handle negative tone changes with optimal', () => {
      expect(scoring.getResponseQualityRating(-5, true)).toBe('Average');
    });
  });

  describe('calculateEQImprovement', () => {
    it('should return 0 for non-optimal responses', () => {
      expect(scoring.calculateEQImprovement(false, 5)).toBe(0);
      expect(scoring.calculateEQImprovement(false, -3)).toBe(0);
    });

    it('should return base improvement of 2 for optimal with no tone change', () => {
      expect(scoring.calculateEQImprovement(true, 0)).toBe(2);
    });

    it('should add bonus for positive tone change', () => {
      const result = scoring.calculateEQImprovement(true, 3);
      // 2 + min(3 * 0.5, 3) = 2 + 1.5 = 3.5
      expect(result).toBe(3.5);
    });

    it('should cap tone bonus at 3', () => {
      const result = scoring.calculateEQImprovement(true, 10);
      // 2 + min(10 * 0.5, 3) = 2 + 3 = 5
      expect(result).toBe(5);
    });

    it('should round to one decimal place', () => {
      const result = scoring.calculateEQImprovement(true, 4);
      // 2 + min(4 * 0.5, 3) = 2 + 2 = 4
      expect(result).toBe(4);
    });

    it('should handle small positive tone changes', () => {
      const result = scoring.calculateEQImprovement(true, 1);
      // 2 + min(1 * 0.5, 3) = 2 + 0.5 = 2.5
      expect(result).toBe(2.5);
    });
  });
});
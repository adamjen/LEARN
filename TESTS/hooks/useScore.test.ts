/**
 * useScore Hook Tests
 * 
 * Comprehensive unit tests for useScore hook including:
 * - Score tracking
 * - Streak tracking
 * - Achievement tracking
 * - Scenario completion
 * - Utilities
 * 
 * @module tests/hooks/useScore
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScore } from '../../src/hooks/useScore';
import { ScenarioDifficulty } from '../../src/types/scenarios';

describe('useScore Hook', () => {
  beforeEach(() => {
    // No mocks needed for this hook
  });

  describe('initial state with default values', () => {
    it('should initialize with score of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.score).toBe(0);
    });

    it('should initialize with bestScore of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.bestScore).toBe(0);
    });

    it('should initialize with streak of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.streak).toBe(0);
    });

    it('should initialize with bestStreak of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.bestStreak).toBe(0);
    });

    it('should initialize with scenariosCompleted of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.scenariosCompleted).toBe(0);
    });

    it('should initialize with scenariosPlayed of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.scenariosPlayed).toBe(0);
    });

    it('should initialize with currentTone of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.currentTone).toBe(0);
    });

    it('should initialize with bestTone of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.bestTone).toBe(0);
    });

    it('should initialize with averageScore of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.averageScore).toBe(0);
    });

    it('should initialize with totalResponses of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.totalResponses).toBe(0);
    });

    it('should initialize with positiveResponses of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.positiveResponses).toBe(0);
    });

    it('should initialize with negativeResponses of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.negativeResponses).toBe(0);
    });
  });

  describe('initial state with custom values', () => {
    it('should initialize with custom score', () => {
      const { result } = renderHook(() => useScore(100));
      
      expect(result.current.scoreData.score).toBe(100);
    });

    it('should initialize with custom streak', () => {
      const { result } = renderHook(() => useScore(0, 5));
      
      expect(result.current.scoreData.streak).toBe(5);
    });

    it('should initialize with custom bestScore', () => {
      const { result } = renderHook(() => useScore(0, 0, 200));
      
      expect(result.current.scoreData.bestScore).toBe(200);
    });

    it('should initialize with custom bestStreak', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 10));
      
      expect(result.current.scoreData.bestStreak).toBe(10);
    });
  });

  describe('actions - addScore', () => {
    it('should add points to score', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.addScore(50);
      });
      
      expect(result.current.scoreData.score).toBe(50);
    });

    it('should update bestScore when score increases', () => {
      const { result } = renderHook(() => useScore(100));
      
      act(() => {
        result.current.actions.addScore(50);
      });
      
      expect(result.current.scoreData.bestScore).toBe(150);
    });

    it('should not update bestScore when score decreases', () => {
      const { result } = renderHook(() => useScore(200));
      
      act(() => {
        result.current.actions.addScore(-50);
      });
      
      expect(result.current.scoreData.bestScore).toBe(200);
    });
  });

  describe('actions - setScore', () => {
    it('should set score to new value', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.setScore(100);
      });
      
      expect(result.current.scoreData.score).toBe(100);
    });

    it('should update bestScore when setting higher value', () => {
      const { result } = renderHook(() => useScore(50));
      
      act(() => {
        result.current.actions.setScore(100);
      });
      
      expect(result.current.scoreData.bestScore).toBe(100);
    });

    it('should not update bestScore when setting lower value', () => {
      const { result } = renderHook(() => useScore(200));
      
      act(() => {
        result.current.actions.setScore(100);
      });
      
      expect(result.current.scoreData.bestScore).toBe(200);
    });
  });

  describe('actions - addStreak', () => {
    it('should increment streak', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.addStreak();
      });
      
      expect(result.current.scoreData.streak).toBe(1);
    });

    it('should update bestStreak when streak increases', () => {
      const { result } = renderHook(() => useScore(0, 5));
      
      act(() => {
        result.current.actions.addStreak();
      });
      
      expect(result.current.scoreData.bestStreak).toBe(6);
    });

    it('should not update bestStreak when streak is below best', () => {
      const { result } = renderHook(() => useScore(0, 5));
      
      act(() => {
        result.current.actions.addStreak();
      });
      
      expect(result.current.scoreData.bestStreak).toBe(5);
    });
  });

  describe('actions - resetStreak', () => {
    it('should reset streak to 0', () => {
      const { result } = renderHook(() => useScore(0, 5));
      
      act(() => {
        result.current.actions.resetStreak();
      });
      
      expect(result.current.scoreData.streak).toBe(0);
    });

    it('should not affect bestStreak', () => {
      const { result } = renderHook(() => useScore(0, 5));
      
      act(() => {
        result.current.actions.resetStreak();
      });
      
      expect(result.current.scoreData.bestStreak).toBe(5);
    });
  });

  describe('actions - completeScenario', () => {
    it('should increment scenariosCompleted', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.scenariosCompleted).toBe(1);
    });

    it('should increment scenariosPlayed', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.scenariosPlayed).toBe(1);
    });

    it('should update currentTone', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.currentTone).toBe(5);
    });

    it('should update bestTone for positive change', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(10);
      });
      
      expect(result.current.scoreData.bestTone).toBe(10);
    });

    it('should not update bestTone for negative change', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 0, 0, 10));
      
      act(() => {
        result.current.actions.completeScenario(-5);
      });
      
      expect(result.current.scoreData.bestTone).toBe(10);
    });

    it('should increment totalResponses', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.totalResponses).toBe(1);
    });

    it('should increment positiveResponses for positive tone change', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.positiveResponses).toBe(1);
    });

    it('should increment negativeResponses for negative tone change', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(-5);
      });
      
      expect(result.current.scoreData.negativeResponses).toBe(1);
    });

    it('should add streak for positive tone change', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.streak).toBe(1);
    });

    it('should reset streak for negative tone change', () => {
      const { result } = renderHook(() => useScore(0, 3));
      
      act(() => {
        result.current.actions.completeScenario(-5);
      });
      
      expect(result.current.scoreData.streak).toBe(0);
    });

    it('should not change streak for zero tone change', () => {
      const { result } = renderHook(() => useScore(0, 3));
      
      act(() => {
        result.current.actions.completeScenario(0);
      });
      
      expect(result.current.scoreData.streak).toBe(3);
    });
  });

  describe('actions - reset', () => {
    it('should reset all scores to 0', () => {
      const { result } = renderHook(() => useScore(100, 5, 200, 10));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.score).toBe(0);
      expect(result.current.scoreData.streak).toBe(0);
      expect(result.current.scoreData.bestScore).toBe(0);
      expect(result.current.scoreData.bestStreak).toBe(0);
    });

    it('should reset scenariosCompleted to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 5));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.scenariosCompleted).toBe(0);
    });

    it('should reset scenariosPlayed to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 10));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.scenariosPlayed).toBe(0);
    });

    it('should reset currentTone to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 0, 10));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.currentTone).toBe(0);
    });

    it('should reset bestTone to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 0, 0, 10));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.bestTone).toBe(0);
    });

    it('should reset totalResponses to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 0, 0, 0, 5));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.totalResponses).toBe(0);
    });

    it('should reset positiveResponses to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 0, 0, 0, 0, 3));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.positiveResponses).toBe(0);
    });

    it('should reset negativeResponses to 0', () => {
      const { result } = renderHook(() => useScore(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2));
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.scoreData.negativeResponses).toBe(0);
    });
  });

  describe('utilities - calculateResponseScore', () => {
    it('should calculate score for optimal response', () => {
      const { result } = renderHook(() => useScore());
      
      const score = result.current.utilities.calculateResponseScore(5, true, ScenarioDifficulty.BEGINNER);
      
      expect(score).toBeGreaterThan(0);
    });

    it('should calculate lower score for non-optimal response', () => {
      const { result } = renderHook(() => useScore());
      
      const optimal = result.current.utilities.calculateResponseScore(5, true, ScenarioDifficulty.BEGINNER);
      const nonOptimal = result.current.utilities.calculateResponseScore(5, false, ScenarioDifficulty.BEGINNER);
      
      expect(nonOptimal).toBeLessThan(optimal);
    });
  });

  describe('utilities - calculateStreakBonus', () => {
    it('should return 0 for streak of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.calculateStreakBonus(0)).toBe(0);
    });

    it('should return bonus for streak of 3', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.calculateStreakBonus(3)).toBe(15);
    });

    it('should return higher bonus for longer streaks', () => {
      const { result } = renderHook(() => useScore());
      
      const bonus3 = result.current.utilities.calculateStreakBonus(3);
      const bonus10 = result.current.utilities.calculateStreakBonus(10);
      
      expect(bonus10).toBeGreaterThan(bonus3);
    });
  });

  describe('utilities - calculateAchievementPoints', () => {
    it('should calculate points for scenarios completed', () => {
      const { result } = renderHook(() => useScore());
      
      const points = result.current.utilities.calculateAchievementPoints(10, 5, 3);
      
      expect(points).toBeGreaterThan(0);
    });

    it('should include tone points', () => {
      const { result } = renderHook(() => useScore());
      
      const points1 = result.current.utilities.calculateAchievementPoints(0, 0, 0);
      const points2 = result.current.utilities.calculateAchievementPoints(0, 10, 0);
      
      expect(points2).toBeGreaterThan(points1);
    });

    it('should include streak points', () => {
      const { result } = renderHook(() => useScore());
      
      const points1 = result.current.utilities.calculateAchievementPoints(0, 0, 0);
      const points2 = result.current.utilities.calculateAchievementPoints(0, 0, 5);
      
      expect(points2).toBeGreaterThan(points1);
    });
  });

  describe('utilities - getScorePercentage', () => {
    it('should return 0 when max is 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getScorePercentage(50, 0)).toBe(0);
    });

    it('should return 100 when current equals max', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getScorePercentage(100, 100)).toBe(100);
    });

    it('should return correct percentage', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getScorePercentage(50, 100)).toBe(50);
      expect(result.current.utilities.getScorePercentage(25, 100)).toBe(25);
    });
  });

  describe('utilities - getStreakMultiplier', () => {
    it('should return 1 for streak of 0', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getStreakMultiplier(0)).toBe(1);
    });

    it('should return 1.1 for streak of 1', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getStreakMultiplier(1)).toBe(1.1);
    });

    it('should return 1.2 for streak of 2', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getStreakMultiplier(2)).toBe(1.2);
    });

    it('should return 1.3 for streak of 3', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.utilities.getStreakMultiplier(3)).toBe(1.3);
    });

    it('should return higher multiplier for longer streaks', () => {
      const { result } = renderHook(() => useScore());
      
      const mult3 = result.current.utilities.getStreakMultiplier(3);
      const mult10 = result.current.utilities.getStreakMultiplier(10);
      
      expect(mult10).toBeGreaterThan(mult3);
    });
  });

  describe('utilities - getAchievements', () => {
    it('should return array of achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      
      expect(Array.isArray(achievements)).toBe(true);
      expect(achievements.length).toBeGreaterThan(0);
    });

    it('should include first_response achievement', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      
      const firstResponse = achievements.find(a => a.id === 'first_response');
      expect(firstResponse).toBeDefined();
      expect(firstResponse?.name).toBe('First Response');
    });

    it('should include tone achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      
      const toneAchievements = achievements.filter(a => a.id.startsWith('tone_'));
      expect(toneAchievements.length).toBeGreaterThan(0);
    });

    it('should include scenario achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      
      const scenarioAchievements = achievements.filter(a => a.id.startsWith('scenarios_'));
      expect(scenarioAchievements.length).toBeGreaterThan(0);
    });
  });

  describe('utilities - calculateTotalAchievementPoints', () => {
    it('should sum points for unlocked achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      const unlocked = achievements.filter(a => a.id === 'first_response');
      
      const points = result.current.utilities.calculateTotalAchievementPoints(unlocked);
      
      expect(points).toBe(10);
    });

    it('should return 0 for no unlocked achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      const locked = achievements.filter(a => !a.unlocked);
      
      const points = result.current.utilities.calculateTotalAchievementPoints(locked);
      
      expect(points).toBe(0);
    });
  });

  describe('utilities - getUnlockedAchievements', () => {
    it('should return only unlocked achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      const unlocked = result.current.utilities.getUnlockedAchievements(achievements);
      
      unlocked.forEach(a => expect(a.unlocked).toBe(true));
    });
  });

  describe('utilities - getUnlockedCount', () => {
    it('should return count of unlocked achievements', () => {
      const { result } = renderHook(() => useScore());
      
      const achievements = result.current.utilities.getAchievements();
      const unlocked = result.current.utilities.getUnlockedAchievements(achievements);
      
      const count = result.current.utilities.getUnlockedCount(achievements);
      
      expect(count).toBe(unlocked.length);
    });
  });

  describe('averageScore calculation', () => {
    it('should be 0 when no responses', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.averageScore).toBe(0);
    });

    it('should calculate average correctly', () => {
      const { result } = renderHook(() => useScore());
      
      act(() => {
        result.current.actions.addScore(100);
        result.current.actions.addScore(200);
      });
      
      act(() => {
        result.current.actions.completeScenario(5);
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.averageScore).toBe(150);
    });
  });

  describe('state updates trigger re-rendering', () => {
    it('should update when score changes', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.score).toBe(0);
      
      act(() => {
        result.current.actions.addScore(50);
      });
      
      expect(result.current.scoreData.score).toBe(50);
    });

    it('should update when streak changes', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.streak).toBe(0);
      
      act(() => {
        result.current.actions.addStreak();
      });
      
      expect(result.current.scoreData.streak).toBe(1);
    });

    it('should update when tone changes', () => {
      const { result } = renderHook(() => useScore());
      
      expect(result.current.scoreData.currentTone).toBe(0);
      
      act(() => {
        result.current.actions.completeScenario(5);
      });
      
      expect(result.current.scoreData.currentTone).toBe(5);
    });
  });
});
/**
 * useScore Hook
 * 
 * Custom hook for tracking scores, achievements, and progress.
 * Provides functions for calculating scores, tracking streaks, and managing achievements.
 * 
 * @module hooks/useScore
 */

import { useState, useCallback, useMemo } from 'react';
import { calculateResponseScore, calculateStreakBonus, calculateAchievementPoints } from '../utils/scoring';
import { ScenarioDifficulty } from '../types/scenarios';

/**
 * Score data interface
 */
interface ScoreData {
  /** Current score */
  score: number;
  /** Best score achieved */
  bestScore: number;
  /** Current streak */
  streak: number;
  /** Best streak achieved */
  bestStreak: number;
  /** Total scenarios completed */
  scenariosCompleted: number;
  /** Total scenarios played */
  scenariosPlayed: number;
  /** Current tone level */
  currentTone: number;
  /** Best tone achieved */
  bestTone: number;
  /** Average score */
  averageScore: number;
  /** Total responses given */
  totalResponses: number;
  /** Positive responses count */
  positiveResponses: number;
  /** Negative responses count */
  negativeResponses: number;
}

/**
 * Achievement interface
 */
interface Achievement {
  /** Achievement ID */
  id: string;
  /** Achievement name */
  name: string;
  /** Achievement description */
  description: string;
  /** Whether achievement is unlocked */
  unlocked: boolean;
  /** Unlock condition */
  unlockCondition: string;
  /** Points awarded */
  points: number;
}

/**
 * useScore Hook
 * 
 * Provides access to score data and utilities:
 * - Track current score and best score
 * - Track streaks (current and best)
 * - Track scenarios completed and played
 * - Track tone levels (current and best)
 * - Calculate response scores
 * - Calculate streak bonuses
 * - Calculate achievement points
 * - Track positive/negative responses
 * - Calculate average score
 * 
 * @param initialScore - Initial score (default: 0)
 * @param initialStreak - Initial streak (default: 0)
 * @param initialBestScore - Initial best score (default: 0)
 * @param initialBestStreak - Initial best streak (default: 0)
 * @returns Object containing score data and utilities
 * 
 * @example
 * const { scoreData, actions } = useScore();
 * 
 * return (
 *   <ScoreBoard
 *     currentTone={scoreData.currentTone}
 *     bestTone={scoreData.bestTone}
 *     scenariosCompleted={scoreData.scenariosCompleted}
 *     currentStreak={scoreData.streak}
 *     bestStreak={scoreData.bestStreak}
 *   />
 * );
 */
export const useScore = (
  initialScore: number = 0,
  initialStreak: number = 0,
  initialBestScore: number = 0,
  initialBestStreak: number = 0
) => {
  // Score state
  const [score, setScore] = useState<number>(initialScore);
  const [bestScore, setBestScore] = useState<number>(initialBestScore);
  const [streak, setStreak] = useState<number>(initialStreak);
  const [bestStreak, setBestStreak] = useState<number>(initialBestStreak);
  const [scenariosCompleted, setScenariosCompleted] = useState<number>(0);
  const [scenariosPlayed, setScenariosPlayed] = useState<number>(0);
  const [currentTone, setCurrentTone] = useState<number>(0);
  const [bestTone, setBestTone] = useState<number>(0);
  const [totalResponses, setTotalResponses] = useState<number>(0);
  const [positiveResponses, setPositiveResponses] = useState<number>(0);
  const [negativeResponses, setNegativeResponses] = useState<number>(0);

  // Calculate average score
  const averageScore = useMemo(() => {
    if (totalResponses === 0) return 0;
    return Math.round((score / totalResponses) * 10) / 10;
  }, [score, totalResponses]);

  // Memoize score data
  const scoreData = useMemo<ScoreData>(() => ({
    score,
    bestScore,
    streak,
    bestStreak,
    scenariosCompleted,
    scenariosPlayed,
    currentTone,
    bestTone,
    averageScore,
    totalResponses,
    positiveResponses,
    negativeResponses,
  }), [
    score,
    bestScore,
    streak,
    bestStreak,
    scenariosCompleted,
    scenariosPlayed,
    currentTone,
    bestTone,
    averageScore,
    totalResponses,
    positiveResponses,
    negativeResponses,
  ]);

  // Memoize utilities
  const utilities = useMemo(() => ({
    /** Calculate response score */
    calculateResponseScore: (toneImpact: number, isOptimal: boolean, difficulty: ScenarioDifficulty) =>
      calculateResponseScore({ id: '', text: '', toneImpact, isOptimal } as any, isOptimal, difficulty),
    
    /** Calculate streak bonus */
    calculateStreakBonus: (streakLength: number) => calculateStreakBonus(streakLength),
    
    /** Calculate achievement points */
    calculateAchievementPoints: (scenariosCompleted: number, bestTone: number, currentStreak: number) =>
      calculateAchievementPoints(scenariosCompleted, bestTone, currentStreak),
    
    /** Get score percentage (0-100) */
    getScorePercentage: (current: number, max: number) => {
      if (max === 0) return 0;
      return Math.round((current / max) * 100);
    },
    
    /** Get streak multiplier */
    getStreakMultiplier: (streakLength: number) => {
      if (streakLength === 0) return 1;
      if (streakLength < 3) return 1 + (streakLength * 0.1);
      if (streakLength < 7) return 1.3 + ((streakLength - 3) * 0.1);
      return 1.7 + ((streakLength - 7) * 0.15);
    },
    
    /** Get achievement list */
    getAchievements: (): Achievement[] => [
      {
        id: 'first_response',
        name: 'First Response',
        description: 'Make your first response',
        unlocked: totalResponses >= 1,
        unlockCondition: 'Make 1 response',
        points: 10,
      },
      {
        id: 'five_responses',
        name: 'Getting Started',
        description: 'Make 5 responses',
        unlocked: totalResponses >= 5,
        unlockCondition: 'Make 5 responses',
        points: 25,
      },
      {
        id: 'ten_responses',
        name: 'Regular Player',
        description: 'Make 10 responses',
        unlocked: totalResponses >= 10,
        unlockCondition: 'Make 10 responses',
        points: 50,
      },
      {
        id: 'twenty_responses',
        name: 'Dedicated Learner',
        description: 'Make 20 responses',
        unlocked: totalResponses >= 20,
        unlockCondition: 'Make 20 responses',
        points: 100,
      },
      {
        id: 'positive_streak_3',
        name: 'On a Roll',
        description: 'Achieve a 3-response positive streak',
        unlocked: streak >= 3,
        unlockCondition: 'Achieve 3 positive responses in a row',
        points: 30,
      },
      {
        id: 'positive_streak_5',
        name: 'Hot Streak',
        description: 'Achieve a 5-response positive streak',
        unlocked: streak >= 5,
        unlockCondition: 'Achieve 5 positive responses in a row',
        points: 50,
      },
      {
        id: 'positive_streak_10',
        name: 'Unstoppable',
        description: 'Achieve a 10-response positive streak',
        unlocked: streak >= 10,
        unlockCondition: 'Achieve 10 positive responses in a row',
        points: 100,
      },
      {
        id: 'tone_10',
        name: 'Cheerful',
        description: 'Reach tone level +10',
        unlocked: bestTone >= 10,
        unlockCondition: 'Reach tone level +10',
        points: 50,
      },
      {
        id: 'tone_15',
        name: 'Gay',
        description: 'Reach tone level +15',
        unlocked: bestTone >= 15,
        unlockCondition: 'Reach tone level +15',
        points: 75,
      },
      {
        id: 'tone_20',
        name: 'Mastery',
        description: 'Reach tone level +20',
        unlocked: bestTone >= 20,
        unlockCondition: 'Reach tone level +20',
        points: 100,
      },
      {
        id: 'tone_30',
        name: 'Ecstatic',
        description: 'Reach tone level +30',
        unlocked: bestTone >= 30,
        unlockCondition: 'Reach tone level +30',
        points: 200,
      },
      {
        id: 'scenarios_10',
        name: 'Novice Player',
        description: 'Complete 10 scenarios',
        unlocked: scenariosCompleted >= 10,
        unlockCondition: 'Complete 10 scenarios',
        points: 50,
      },
      {
        id: 'scenarios_25',
        name: 'Experienced Player',
        description: 'Complete 25 scenarios',
        unlocked: scenariosCompleted >= 25,
        unlockCondition: 'Complete 25 scenarios',
        points: 100,
      },
      {
        id: 'scenarios_50',
        name: 'Veteran Player',
        description: 'Complete 50 scenarios',
        unlocked: scenariosCompleted >= 50,
        unlockCondition: 'Complete 50 scenarios',
        points: 200,
      },
    ],
    
    /** Calculate total achievement points */
    calculateTotalAchievementPoints: (achievements: Achievement[]) => {
      return achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
    },
    
    /** Get unlocked achievements */
    getUnlockedAchievements: (achievements: Achievement[]) => {
      return achievements.filter(a => a.unlocked);
    },
    
    /** Get unlocked achievement count */
    getUnlockedCount: (achievements: Achievement[]) => {
      return achievements.filter(a => a.unlocked).length;
    },
  }), [totalResponses, streak, bestTone, scenariosCompleted]);

  // Actions
  const actions = useMemo(() => ({
    /** Add score */
    addScore: (points: number) => {
      setScore(prev => prev + points);
      setBestScore(prev => Math.max(prev, prev + points));
    },
    
    /** Set score */
    setScore: (newScore: number) => {
      setScore(newScore);
      setBestScore(prev => Math.max(prev, newScore));
    },
    
    /** Add to streak */
    addStreak: () => {
      setStreak(prev => prev + 1);
      setBestStreak(prev => Math.max(prev, streak + 1));
    },
    
    /** Reset streak */
    resetStreak: () => {
      setStreak(0);
    },
    
    /** Complete scenario */
    completeScenario: (toneChange: number) => {
      setScenariosCompleted(prev => prev + 1);
      setScenariosPlayed(prev => prev + 1);
      
      // Update tone
      setCurrentTone(prev => {
        const newTone = prev + toneChange;
        setBestTone(b => Math.max(b, newTone));
        return newTone;
      });
      
      // Update response counts
      setTotalResponses(prev => prev + 1);
      if (toneChange > 0) {
        setPositiveResponses(prev => prev + 1);
        actions.addStreak();
      } else if (toneChange < 0) {
        setNegativeResponses(prev => prev + 1);
        actions.resetStreak();
      }
    },
    
    /** Reset all scores */
    reset: () => {
      setScore(0);
      setBestScore(0);
      setStreak(0);
      setBestStreak(0);
      setScenariosCompleted(0);
      setScenariosPlayed(0);
      setCurrentTone(0);
      setBestTone(0);
      setTotalResponses(0);
      setPositiveResponses(0);
      setNegativeResponses(0);
    },
  }), [score, bestScore, streak, bestStreak, scenariosCompleted, scenariosPlayed, currentTone, bestTone, totalResponses, positiveResponses, negativeResponses]);

  return {
    scoreData,
    utilities,
    actions,
  };
};

export default useScore;
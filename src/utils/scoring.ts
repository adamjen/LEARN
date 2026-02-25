/**
 * Scoring Utilities for Tone Navigator
 * 
 * This module provides scoring calculation functions for the game mechanics,
 * including response evaluation, point calculation, and score tracking.
 * 
 * @module utils/scoring
 */

import { ResponseOption } from '../types/game';
import { ScenarioFeedback } from '../types/scenarios';
import { ScenarioCategory, ScenarioDifficulty } from '../types/scenarios';

/**
 * Calculate score for a response option
 * 
 * Determines the score based on whether the response is optimal,
 * the tone impact, and the scenario difficulty.
 * 
 * @param option - The response option to score
 * @param isOptimal - Whether the response is optimal
 * @param difficulty - The scenario difficulty level
 * @returns Calculated score
 * 
 * @example
 * const score = calculateResponseScore(option, true, ScenarioDifficulty.INTERMEDIATE);
 * // Returns: 150
 */
export const calculateResponseScore = (
  option: ResponseOption,
  isOptimal: boolean,
  difficulty: ScenarioDifficulty
): number => {
  // Base score for optimal responses
  let baseScore = isOptimal ? 100 : 30;
  
  // Difficulty multiplier
  const difficultyMultiplier: Record<ScenarioDifficulty, number> = {
    beginner: 1.0,
    intermediate: 1.2,
    advanced: 1.5,
    expert: 2.0,
  };
  
  // Tone impact bonus (up to 50 points)
  const toneBonus = Math.min(Math.abs(option.toneImpact) * 10, 50);
  
  // Calculate final score
  const score = baseScore * difficultyMultiplier[difficulty] + toneBonus;
  
  return Math.round(score);
};

/**
 * Calculate feedback for a response
 * 
 * Generates comprehensive feedback including tone change,
 * ARC impact, and learning points.
 * 
 * @param option - The selected response option
 * @param currentTone - Current tone level before response
 * @param isOptimal - Whether the response is optimal
 * @param explanation - Explanation for the tone impact
 * @param learningPoints - Array of learning points
 * @param alternative - Optional alternative suggestion
 * @returns Complete feedback object
 * 
 * @example
 * const feedback = calculateFeedback(option, 2, true, 'Good choice!', ['Learn from this']);
 */
export const calculateFeedback = (
  option: ResponseOption,
  currentTone: number,
  isOptimal: boolean,
  explanation: string,
  learningPoints: string[],
  alternative?: string
): ScenarioFeedback => {
  const toneChange = option.toneImpact;
  const newToneLevel = currentTone + toneChange;
  
  // Calculate ARC impact based on tone change
  const arcImpact = calculateARCImpact(toneChange);
  
  return {
    selectedOptionId: option.id,
    isOptimal,
    toneChange,
    newToneLevel,
    arcImpact,
    explanation,
    learningPoints,
    alternative,
    timestamp: new Date(),
  };
};

/**
 * Calculate ARC impact based on tone change
 * 
 * Distributes the tone impact across the three ARC components
 * (Appreciation, Reality, Communication).
 * 
 * @param toneChange - The tone change from the response
 * @returns ARC impact distribution
 * 
 * @example
 * const impact = calculateARCImpact(3);
 * // Returns: { appreciation: 1, reality: 1, communication: 1, total: 3 }
 */
export const calculateARCImpact = (toneChange: number): {
  appreciation: number;
  reality: number;
  communication: number;
  total: number;
} => {
  // Distribute tone change across ARC components
  // Each component gets approximately 1/3 of the total change
  const perComponent = toneChange / 3;
  
  return {
    appreciation: Math.round(perComponent * 10) / 10,
    reality: Math.round(perComponent * 10) / 10,
    communication: Math.round(perComponent * 10) / 10,
    total: toneChange,
  };
};

/**
 * Calculate scenario difficulty multiplier
 * 
 * Returns a multiplier based on the scenario difficulty level.
 * 
 * @param difficulty - The difficulty level
 * @returns Multiplier value
 * 
 * @example
 * const multiplier = getDifficultyMultiplier(ScenarioDifficulty.ADVANCED);
 * // Returns: 1.5
 */
export const getDifficultyMultiplier = (difficulty: ScenarioDifficulty): number => {
  const multipliers: Record<ScenarioDifficulty, number> = {
    beginner: 1.0,
    intermediate: 1.2,
    advanced: 1.5,
    expert: 2.0,
  };
  
  return multipliers[difficulty] || 1.0;
};

/**
 * Calculate category bonus
 * 
 * Returns a bonus based on the scenario category.
 * Categories that are more challenging get higher bonuses.
 * 
 * @param category - The scenario category
 * @returns Bonus value
 * 
 * @example
 * const bonus = getCategoryBonus(ScenarioCategory.WORKPLACE);
 * // Returns: 10
 */
export const getCategoryBonus = (category: ScenarioCategory): number => {
  const bonuses: Record<ScenarioCategory, number> = {
    workplace: 10,
    family: 8,
    friends: 6,
    general: 5,
  };
  
  return bonuses[category] || 0;
};

/**
 * Calculate total score for a scenario response
 * 
 * Combines response score, difficulty multiplier, and category bonus.
 * 
 * @param option - The selected response option
 * @param isOptimal - Whether the response is optimal
 * @param difficulty - The scenario difficulty
 * @param category - The scenario category
 * @returns Total calculated score
 * 
 * @example
 * const totalScore = calculateTotalScore(option, true, ScenarioDifficulty.INTERMEDIATE, ScenarioCategory.WORKPLACE);
 * // Returns: 220
 */
export const calculateTotalScore = (
  option: ResponseOption,
  isOptimal: boolean,
  difficulty: ScenarioDifficulty,
  category: ScenarioCategory
): number => {
  const responseScore = calculateResponseScore(option, isOptimal, difficulty);
  const categoryBonus = getCategoryBonus(category);
  
  return responseScore + categoryBonus;
};

/**
 * Calculate streak bonus
 * 
 * Calculates bonus points based on current streak length.
 * Longer streaks get higher bonuses.
 * 
 * @param streakLength - Current streak length
 * @returns Bonus points
 * 
 * @example
 * const bonus = calculateStreakBonus(5);
 * // Returns: 25
 */
export const calculateStreakBonus = (streakLength: number): number => {
  if (streakLength === 0) return 0;
  if (streakLength < 3) return streakLength * 5;
  if (streakLength < 7) return 15 + (streakLength - 3) * 5;
  return 35 + (streakLength - 7) * 10;
};

/**
 * Calculate achievement points
 * 
 * Calculates points awarded for completing scenarios and achieving milestones.
 * 
 * @param scenariosCompleted - Total scenarios completed
 * @param bestTone - Best tone level achieved
 * @param currentStreak - Current streak
 * @returns Total achievement points
 * 
 * @example
 * const points = calculateAchievementPoints(25, 15, 5);
 * // Returns: 500
 */
export const calculateAchievementPoints = (
  scenariosCompleted: number,
  bestTone: number,
  currentStreak: number
): number => {
  let points = 0;
  
  // Points for scenarios completed
  points += scenariosCompleted * 10;
  
  // Points for best tone achieved
  if (bestTone > 0) {
    points += bestTone * 5;
  }
  
  // Points for streak
  points += calculateStreakBonus(currentStreak);
  
  return points;
};

/**
 * Determine response quality rating
 * 
 * Provides a qualitative rating based on tone impact and optimality.
 * 
 * @param toneChange - The tone change from the response
 * @param isOptimal - Whether the response is optimal
 * @returns Quality rating string
 * 
 * @example
 * const rating = getResponseQualityRating(3, true);
 * // Returns: "Great"
 */
export const getResponseQualityRating = (
  toneChange: number,
  isOptimal: boolean
): string => {
  if (!isOptimal) return 'Poor';
  
  if (toneChange >= 5) return 'Excellent';
  if (toneChange >= 3) return 'Great';
  if (toneChange >= 1) return 'Good';
  return 'Average';
};

/**
 * Calculate EQ component improvement
 * 
 * Calculates improvement in EQ components based on response quality.
 * 
 * @param isOptimal - Whether the response is optimal
 * @param toneChange - The tone change
 * @returns Improvement percentage
 * 
 * @example
 * const improvement = calculateEQImprovement(true, 3);
 * // Returns: 3.5
 */
export const calculateEQImprovement = (
  isOptimal: boolean,
  toneChange: number
): number => {
  if (!isOptimal) return 0;
  
  // Base improvement for optimal response
  let improvement = 2;
  
  // Bonus for positive tone change
  if (toneChange > 0) {
    improvement += Math.min(toneChange * 0.5, 3);
  }
  
  return Math.round(improvement * 10) / 10;
};

export default {
  calculateResponseScore,
  calculateFeedback,
  calculateARCImpact,
  getDifficultyMultiplier,
  getCategoryBonus,
  calculateTotalScore,
  calculateStreakBonus,
  calculateAchievementPoints,
  getResponseQualityRating,
  calculateEQImprovement,
};
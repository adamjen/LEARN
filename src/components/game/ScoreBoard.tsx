/**
 * ScoreBoard Component
 * 
 * Displays player progress including current score, best tone reached,
 * and EQ component scores with visual progress indicators.
 * 
 * @module components/game/ScoreBoard
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { EQScores } from '../../store/progressStore';

interface ScoreBoardProps {
  /** Current tone level */
  currentTone: number;
  /** Best/highest tone level achieved */
  bestTone: number;
  /** EQ scores across different dimensions */
  eqScores: EQScores;
  /** Total scenarios completed */
  scenariosCompleted: number;
  /** Current streak */
  currentStreak: number;
  /** Best streak achieved */
  bestStreak: number;
  /** Whether to show animations */
  animated?: boolean;
}

/**
 * Get color based on tone level
 */
const getToneColor = (tone: number): string => {
  if (tone >= 15) return 'text-green-600';
  if (tone >= 5) return 'text-green-500';
  if (tone >= 0) return 'text-yellow-500';
  if (tone >= -10) return 'text-orange-500';
  return 'text-red-500';
};

/**
 * Get background color based on tone level
 */
const getToneBgColor = (tone: number): string => {
  if (tone >= 15) return 'bg-green-100';
  if (tone >= 5) return 'bg-green-50';
  if (tone >= 0) return 'bg-yellow-50';
  if (tone >= -10) return 'bg-orange-50';
  return 'bg-red-50';
};

/**
 * Get progress bar color based on score (0-100)
 */
const getProgressColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-green-400';
  if (score >= 40) return 'bg-yellow-500';
  if (score >= 20) return 'bg-orange-400';
  return 'bg-red-500';
};

/**
 * ScoreBoard Component
 * 
 * Displays comprehensive player progress information:
 * - Current tone level with visual indicator
 * - Best tone level achieved
 * - EQ component scores with progress bars
 * - Scenario completion statistics
 * - Streak information
 * 
 * @component
 * @example
 * <ScoreBoard
 *   currentTone={5}
 *   bestTone={12}
 *   eqScores={golemanScores}
 *   scenariosCompleted={25}
 *   currentStreak={3}
 *   bestStreak={7}
 * />
 */
export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  currentTone,
  bestTone,
  eqScores,
  scenariosCompleted,
  currentStreak,
  bestStreak,
  animated = true,
}) => {
  /**
   * Animation variants for fade-in effect
   */
  const fadeInVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  /**
   * Animation variants for scale effect
   */
  const scaleVariants = {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
  };

  /**
   * Format tone level for display
   */
  const formatTone = (tone: number): string => {
    const sign = tone >= 0 ? '+' : '';
    return `${sign}${tone.toFixed(1)}`;
  };

  /**
   * Get tone level name
   */
  const getToneName = (tone: number): string => {
    const toneNames: Record<string, string> = {
      '40': 'Serenity',
      '30': 'Ecstatic',
      '25': 'Peace',
      '20': 'Mastery',
      '15': 'Gay',
      '10': 'Cheerful',
      '5': 'Optimism',
      '0': 'Neutrality',
      '-5': 'Scepticism',
      '-10': 'Pessimism',
      '-15': 'Boredom',
      '-20': 'Disinterest',
      '-25': 'Gloom',
      '-30': 'Apathy',
      '-35': 'Despair',
      '-40': 'Total Failure',
    };

    // Find closest tone level
    const levels = Object.keys(toneNames).map(Number);
    const closest = levels.reduce((prev, curr) =>
      Math.abs(curr - tone) < Math.abs(prev - tone) ? curr : prev
    );

    return toneNames[String(closest)] || 'Unknown';
  };

  return (
    <motion.div
      variants={animated ? fadeInVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Player Progress</h2>
          <p className="text-purple-100">Track your emotional intelligence journey</p>
        </div>

        <div className="p-6">
          {/* Current Tone Level */}
          <div className={cn(
            'mb-6 p-4 rounded-lg',
            getToneBgColor(currentTone)
          )}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Current Tone Level</h3>
                <div className={cn('text-3xl font-bold', getToneColor(currentTone))}>
                  {formatTone(currentTone)}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {getToneName(currentTone)}
                </p>
              </div>
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center',
                getToneBgColor(currentTone)
              )}>
                <span className={cn('text-2xl font-bold', getToneColor(currentTone))}>
                  {currentTone >= 0 ? '+' : ''}{currentTone.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Best Tone Achieved */}
          <div className={cn(
            'mb-6 p-4 rounded-lg',
            bestTone >= 0 ? 'bg-green-50' : 'bg-yellow-50'
          )}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Best Tone Achieved</h3>
                <div className={cn('text-2xl font-bold', getToneColor(bestTone))}>
                  {formatTone(bestTone)}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {getToneName(bestTone)}
                </p>
              </div>
              <div className="flex items-center">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* EQ Scores */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">EQ Component Scores</h3>
            <div className="space-y-3">
              {[
                { name: 'Self-Awareness', score: eqScores.selfAwareness },
                { name: 'Self-Regulation', score: eqScores.selfRegulation },
                { name: 'Motivation', score: eqScores.motivation },
                { name: 'Empathy', score: eqScores.empathy },
                { name: 'Social Skills', score: eqScores.socialSkills },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={scaleVariants}
                  initial={animated ? 'initial' : undefined}
                  animate={animated ? 'animate' : undefined}
                  custom={index}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className={cn(
                      'font-bold',
                      item.score >= 70 ? 'text-green-600' :
                      item.score >= 50 ? 'text-yellow-600' :
                      'text-orange-600'
                    )}>
                      {item.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={cn(
                        'h-2 rounded-full',
                        getProgressColor(item.score)
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            {/* Scenarios Completed */}
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {scenariosCompleted}
              </div>
              <div className="text-sm text-gray-600">Scenarios Completed</div>
            </div>

            {/* Current Streak */}
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {currentStreak}
              </div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>

            {/* Best Streak */}
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {bestStreak}
              </div>
              <div className="text-sm text-gray-600">Best Streak</div>
            </div>

            {/* Total Played */}
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {scenariosCompleted}
              </div>
              <div className="text-sm text-gray-600">Total Played</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;
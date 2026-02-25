/**
 * ScenarioCard Component
 * 
 * Displays a game scenario with context, character information,
 * current tone level, ARC state, and response options.
 * 
 * @module components/game/ScenarioCard
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import ToneGauge from './ToneGauge';
import ARCTriangle from './ARCTriangle';
import { Scenario } from '../../store/gameStore';
import { ScenarioCategory, ScenarioDifficulty } from '../../types/scenarios';
import { ARCState } from '../../types/game';

interface ScenarioCardProps {
  /** Current scenario to display */
  scenario: Scenario;
  /** Current tone level */
  currentTone: number;
  /** Current ARC state */
  currentARC: ARCState;
  /** Whether scenario is loading */
  isLoading?: boolean;
  /** Callback when response is selected */
  onRespond: (optionId: string) => void;
  /** Callback when scenario changes */
  onScenarioChange?: (newScenario: Scenario) => void;
  /** Whether to show feedback after response */
  showFeedback?: boolean;
  /** Selected option for feedback */
  selectedOption?: { id: string; text: string; toneChange: number } | null;
  /** Feedback result */
  feedbackResult?: {
    isOptimal: boolean;
    toneChange: number;
    newToneLevel: number;
    explanation: string;
  } | null;
}

/**
 * Category color mapping for visual distinction
 */
const categoryColors: Record<ScenarioCategory, string> = {
  workplace: 'bg-blue-500',
  family: 'bg-green-500',
  friends: 'bg-purple-500',
  general: 'bg-gray-500',
};

/**
 * Difficulty badge colors
 */
const difficultyColors: Record<ScenarioDifficulty, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800',
};

/**
 * ScenarioCard Component
 * 
 * Displays scenario information including:
 * - Scenario title and context
 * - Character information
 * - Current tone level (ToneGauge)
 * - Current ARC state (ARCTriangle)
 * - Response options as clickable buttons
 * 
 * @component
 * @example
 * <ScenarioCard
 *   scenario={currentScenario}
 *   currentTone={tone}
 *   currentARC={arcState}
 *   onRespond={handleResponse}
 * />
 */
export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  currentTone,
  currentARC,
  isLoading = false,
  onRespond,
  onScenarioChange,
  showFeedback = false,
  selectedOption,
  feedbackResult,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  /**
   * Handle option click
   */
  const handleOptionClick = (optionId: string) => {
    setSelectedOptionId(optionId);
    onRespond(optionId);
  };

  /**
   * Get category display name
   */
  const getCategoryName = (category: ScenarioCategory): string => {
    const names: Record<ScenarioCategory, string> = {
      workplace: 'Workplace',
      family: 'Family',
      friends: 'Friends',
      general: 'General',
    };
    return names[category];
  };

  /**
   * Get difficulty display name
   */
  const getDifficultyName = (difficulty: ScenarioDifficulty): string => {
    const names: Record<ScenarioDifficulty, string> = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
    };
    return names[difficulty];
  };

  /**
   * Animation variants for scenario transitions
   */
  const scenarioVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  /**
   * Animation variants for response options
   */
  const optionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    }),
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scenario...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={scenario.id}
      variants={scenarioVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with category and difficulty */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className={cn('px-3 py-1 rounded-full text-sm font-medium', categoryColors[scenario.category])}>
              {getCategoryName(scenario.category)}
            </span>
            <span className={cn('px-3 py-1 rounded-full text-sm font-medium', difficultyColors[scenario.difficulty])}>
              {getDifficultyName(scenario.difficulty)}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{scenario.title}</h2>
        </div>

        {/* Scenario Context */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Scenario</h3>
            <p className="text-gray-600 leading-relaxed">{scenario.description}</p>
          </div>

          {/* Tone Gauge */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Tone Level</h3>
            <ToneGauge value={currentTone} size="large" showTooltip />
          </div>

          {/* ARC Triangle */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ARC State</h3>
            <ARCTriangle
              appreciation={currentARC.appreciation}
              reality={currentARC.reality}
              communication={currentARC.communication}
              animated
              size="large"
            />
          </div>

          {/* Response Options */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Response</h3>
            <div className="space-y-3">
              {scenario.options.map((option: { id: string; text: string; toneChange: number }, index: number) => (
                <motion.button
                  key={option.id}
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  onClick={() => handleOptionClick(option.id)}
                  className={cn(
                    'w-full p-4 rounded-lg border-2 text-left transition-all',
                    selectedOptionId === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50',
                    selectedOption?.id === option.id && 'ring-2 ring-blue-500'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option.text}</span>
                    <span className={cn(
                      'text-sm font-semibold',
                      option.toneChange >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {option.toneChange >= 0 ? '+' : ''}{option.toneChange.toFixed(1)}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          {showFeedback && feedbackResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'p-4 rounded-lg border',
                feedbackResult.isOptimal
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              )}
            >
              <div className="flex items-start">
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                  feedbackResult.isOptimal ? 'bg-green-100' : 'bg-red-100'
                )}>
                  {feedbackResult.isOptimal ? (
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className={cn('font-semibold mb-1', feedbackResult.isOptimal ? 'text-green-800' : 'text-red-800')}>
                    {feedbackResult.isOptimal ? 'Great Response!' : 'Consider a Different Approach'}
                  </h4>
                  <p className="text-gray-700 mb-2">{feedbackResult.explanation}</p>
                  <div className="text-sm text-gray-600">
                    Tone Change: <span className={cn('font-semibold', feedbackResult.toneChange >= 0 ? 'text-green-600' : 'text-red-600')}>
                      {feedbackResult.toneChange >= 0 ? '+' : ''}{feedbackResult.toneChange}
                    </span>
                    {' → '}New Level: {feedbackResult.newToneLevel}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ScenarioCard;
/**
 * FeedbackModal Component
 * 
 * Displays response feedback including correctness, tone change,
 * learning points, and educational explanations.
 * 
 * @module components/game/FeedbackModal
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/cn';
import { Button } from '../ui/Button';
import { ScenarioFeedback } from '../../types/scenarios';

interface FeedbackModalProps {
  /** Whether modal is visible */
  isOpen: boolean;
  /** Feedback data to display */
  feedback: ScenarioFeedback | null;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when continue button is clicked */
  onContinue?: () => void;
  /** Whether to show animations */
  animated?: boolean;
}

/**
 * Get icon based on feedback result
 */
const getFeedbackIcon = (isOptimal: boolean): JSX.Element => {
  if (isOptimal) {
    return (
      <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
};

/**
 * Get badge color based on feedback result
 */
const getBadgeColor = (isOptimal: boolean): string => {
  return isOptimal ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
};

/**
 * FeedbackModal Component
 * 
 * Displays comprehensive feedback after a response is selected:
 * - Success/error indicator
 * - Tone change result
 * - Detailed explanation
 * - Learning points
 * - Optional alternative suggestion
 * - Continue button to proceed
 * 
 * @component
 * @example
 * <FeedbackModal
 *   isOpen={showFeedback}
 *   feedback={feedbackData}
 *   onClose={() => setShowFeedback(false)}
 *   onContinue={nextScenario}
 * />
 */
export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  feedback,
  onClose,
  onContinue,
  animated = true,
}) => {
  /**
   * Animation variants for modal entrance
   */
  const modalVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  /**
   * Animation variants for content fade-in
   */
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  if (!isOpen || !feedback) {
    return null;
  }

  const { isOptimal, toneChange, newToneLevel, explanation, learningPoints, alternative } = feedback;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={cn(
              'p-6 text-white text-center',
              isOptimal ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'
            )}>
              <div className="flex justify-center mb-3">
                {getFeedbackIcon(isOptimal)}
              </div>
              <h2 className="text-2xl font-bold">
                {isOptimal ? 'Great Response!' : 'Learn from This Response'}
              </h2>
              <span className={cn(
                'inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium',
                getBadgeColor(isOptimal)
              )}>
                {isOptimal ? 'Optimal Choice' : 'Alternative Considered'}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tone Change */}
              <div className={cn(
                'mb-6 p-4 rounded-lg text-center',
                toneChange >= 0 ? 'bg-green-50' : 'bg-red-50'
              )}>
                <div className="text-sm text-gray-600 mb-1">Tone Change</div>
                <div className={cn(
                  'text-3xl font-bold',
                  toneChange >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {toneChange >= 0 ? '+' : ''}{toneChange}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  New Level: <span className="font-semibold">{newToneLevel.toFixed(1)}</span>
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why This Response?</h3>
                <p className="text-gray-700 leading-relaxed">{explanation}</p>
              </div>

              {/* Learning Points */}
              {learningPoints && learningPoints.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Learning Points</h3>
                  <ul className="space-y-2">
                    {learningPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="flex items-start"
                      >
                        <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alternative Suggestion */}
              {alternative && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Alternative Approach</h3>
                  <p className="text-blue-700">{alternative}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Review Again
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    onContinue?.();
                  }}
                  variant="primary"
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
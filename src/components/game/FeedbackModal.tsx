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
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

interface FeedbackModalProps {
  /** Whether modal is visible */
  isOpen: boolean;
  /** Feedback data to display */
  feedback: {
    isOptimal: boolean;
    toneChange: number;
    newToneLevel: number;
    explanation: string;
  } | null;
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
                {getFeedbackIcon(feedback.isOptimal)}
              </div>
            </div>

            {/* Title */}
            <h2 className={cn(
              'text-2xl font-bold text-center mb-4',
              feedback.isOptimal ? 'text-green-600' : 'text-orange-600'
            )}>
              {feedback.isOptimal ? 'Great Response!' : 'Consider a Different Approach'}
            </h2>

            {/* Explanation */}
            <p className="text-gray-700 text-center mb-6">
              {feedback.explanation}
            </p>

            {/* Tone Change Info */}
            <div className={cn(
              'p-4 rounded-lg mb-6',
              feedback.toneChange >= 0 ? 'bg-green-50' : 'bg-orange-50'
            )}>
              <div className="text-center">
                <span className="text-sm text-gray-600">Tone Change:</span>
                <div className="text-2xl font-bold mt-1">
                  <span className={cn(
                    feedback.toneChange >= 0 ? 'text-green-600' : 'text-orange-600'
                  )}>
                    {feedback.toneChange >= 0 ? '+' : ''}{feedback.toneChange}
                  </span>
                  {' → '}
                  <span className="text-gray-800">
                    New Level: {feedback.newToneLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Points */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Learning Points:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Active listening builds appreciation</li>
                <li>Clear communication prevents misunderstandings</li>
                <li>Reality checking helps align expectations</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Close
              </Button>
              {onContinue && (
                <Button
                  onClick={onContinue}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  Continue
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
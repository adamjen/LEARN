/**
 * TutorialModal Component
 * 
 * Provides an interactive onboarding tutorial explaining ARC Triangle,
 * Tone Scale, and game mechanics for new players.
 * 
 * @module components/game/TutorialModal
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

interface TutorialModalProps {
  /** Whether tutorial is visible */
  isOpen: boolean;
  /** Callback when tutorial is completed */
  onComplete: () => void;
  /** Callback when tutorial is skipped */
  onSkip: () => void;
  /** Whether to show animations */
  animated?: boolean;
}

/**
 * Tutorial step data
 */
interface TutorialStep {
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Step content (optional detailed content) */
  content?: React.ReactNode;
  /** Whether this step has interactive elements */
  isInteractive?: boolean;
}

/**
 * Tutorial steps for the game
 */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome to Tone Navigator!',
    description: 'This interactive tutorial will help you understand the core concepts of the game.',
    content: (
      <div className="space-y-4">
        <p>
          Tone Navigator is a learning game designed to help you develop emotional intelligence
          through practical scenarios and decision-making.
        </p>
        <p>
          You'll encounter various life situations and choose how to respond. Each choice affects
          your emotional state (tone level) and ARC (Appreciation, Reality, Communication).
        </p>
      </div>
    ),
  },
  {
    title: 'Understanding the Tone Scale',
    description: 'The Tone Scale measures emotional states from -40 to +40.',
    content: (
      <div className="space-y-4">
        <p>
          The Tone Scale, developed by L. Ron Hubbard in the 1950s, is an emotional gradient
          scale that measures states of consciousness from Total Failure (-40) to Serenity of Beingness (+40).
        </p>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Key Tone Levels:</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li><strong>+40:</strong> Serenity of Beingness - Peak state</li>
            <li><strong>+15:</strong> Gay (cheerful, carefree)</li>
            <li><strong>+10:</strong> Cheerful</li>
            <li><strong>+4:</strong> Enthusiasm</li>
            <li><strong>0:</strong> Neutrality - Body Death (neutral point)</li>
            <li><strong>-10:</strong> Pessimism</li>
            <li><strong>-20:</strong> Disinterest</li>
            <li><strong>-30:</strong> Apathy</li>
            <li><strong>-40:</strong> Total Failure</li>
          </ul>
        </div>
        <p>
          In the game, positive tone changes indicate good choices, while negative changes
          indicate choices that lower your emotional state.
        </p>
      </div>
    ),
  },
  {
    title: 'The ARC Triangle',
    description: 'ARC represents the three elements of successful interaction.',
    content: (
      <div className="space-y-4">
        <p>
          The ARC Triangle is a fundamental framework for understanding human interaction,
          consisting of three interdependent elements:
        </p>
        <div className="space-y-3">
          <div className="bg-green-50 rounded-lg p-3">
            <h4 className="font-semibold text-green-800">Appreciation</h4>
            <p className="text-green-700 text-sm">
              Value, care, or regard for others. Higher appreciation leads to better relationships.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-semibold text-blue-800">Reality</h4>
            <p className="text-blue-700 text-sm">
              Shared understanding or truth. More reality means better communication and understanding.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <h4 className="font-semibold text-purple-800">Communication</h4>
            <p className="text-purple-700 text-sm">
              Flow of information between parties. Effective communication strengthens all ARC elements.
            </p>
          </div>
        </div>
        <p>
          In the game, your ARC state is shown as three values (0-10 each). Good choices
          increase ARC, while poor choices decrease it.
        </p>
      </div>
    ),
  },
  {
    title: 'How to Play',
    description: 'Learn the basic game mechanics and how to make choices.',
    content: (
      <div className="space-y-4">
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Game Flow:</h4>
          <ol className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              Read the scenario description carefully
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              Check your current tone level and ARC state
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              Choose the best response from the options
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              See feedback on your choice and how it affected your tone
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              Continue to the next scenario
            </li>
          </ol>
        </div>
        <p>
          Your goal is to make choices that increase your tone level and ARC state.
          The game will help you learn which responses are most effective in different situations.
        </p>
      </div>
    ),
    isInteractive: true,
  },
  {
    title: 'Response Options',
    description: 'Learn how to evaluate and choose response options.',
    content: (
      <div className="space-y-4">
        <p>
          Each scenario presents multiple response options. Here's how to evaluate them:
        </p>
        <div className="space-y-3">
          <div className="bg-green-50 rounded-lg p-3">
            <h4 className="font-semibold text-green-800">Optimal Responses</h4>
            <p className="text-green-700 text-sm">
              These are marked with a checkmark and typically increase your tone level.
              They represent the best choice for the situation.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <h4 className="font-semibold text-orange-800">Non-Optimal Responses</h4>
            <p className="text-orange-700 text-sm">
              These may decrease your tone level. They're still valid choices, but
              there are better alternatives available.
            </p>
          </div>
        </div>
        <p>
          After making a choice, you'll see detailed feedback explaining why the response
          was optimal or not, along with learning points to help you improve.
        </p>
      </div>
    ),
  },
  {
    title: 'Your Progress',
    description: 'Track your improvement over time.',
    content: (
      <div className="space-y-4">
        <p>
          The game tracks your progress in several ways:
        </p>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Progress Tracking:</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li><strong>Current Tone:</strong> Your current emotional state</li>
            <li><strong>Best Tone:</strong> Highest tone level you've achieved</li>
            <li><strong>Scenarios Completed:</strong> Total scenarios you've played</li>
            <li><strong>Streak:</strong> Current run of good choices</li>
            <li><strong>EQ Scores:</strong> Your emotional intelligence in different areas</li>
          </ul>
        </div>
        <p>
          As you play more scenarios, your EQ scores will improve, and you'll see
          your tone level trend upward over time.
        </p>
      </div>
    ),
  },
  {
    title: 'Ready to Start?',
    description: 'You now understand the basics. Let\'s begin!',
    content: (
      <div className="space-y-4 text-center">
        <p>
          You're now ready to start playing Tone Navigator! Remember:
        </p>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-green-800 font-medium">
            Choose responses that increase your tone level and ARC state.
            The game will help you learn which choices work best in different situations.
          </p>
        </div>
        <p>
          Take your time, read each scenario carefully, and trust your instincts.
          You'll learn and improve with each choice you make.
        </p>
      </div>
    ),
  },
];

/**
 * TutorialModal Component
 * 
 * Displays an interactive tutorial explaining:
 * - Welcome and overview
 * - Tone Scale basics
 * - ARC Triangle framework
 * - Game mechanics
 * - Response options
 * - Progress tracking
 * - Ready to start
 * 
 * @component
 * @example
 * <TutorialModal
 *   isOpen={showTutorial}
 *   onComplete={() => setShowTutorial(false)}
 *   onSkip={() => setShowTutorial(false)}
 * />
 */
export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onComplete,
  onSkip,
  animated = true,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  /**
   * Animation variants for modal entrance
   */
  const modalVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  /**
   * Animation variants for content
   */
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  /**
   * Handle previous step
   */
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Handle skip
   */
  const handleSkip = () => {
    setHasStarted(true);
    onSkip();
  };

  /**
   * Handle start tutorial
   */
  const handleStart = () => {
    setHasStarted(true);
  };

  if (!isOpen) {
    return null;
  }

  const currentStepData = TUTORIAL_STEPS[currentStep];

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
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Tone Navigator Tutorial</h2>
                  <p className="text-blue-100 mt-1">
                    Learn the basics in just a few minutes
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {currentStep + 1}
                  </div>
                  <div className="text-sm text-blue-100">
                    of {TUTORIAL_STEPS.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-100 h-1">
              <div
                className="bg-primary h-1 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {!hasStarted ? (
                /* Welcome Screen */
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  className="text-center py-8"
                >
                  <div className="mb-6">
                    <svg className="w-20 h-20 mx-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to Tone Navigator!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    This interactive tutorial will teach you everything you need to know
                    about the Tone Scale, ARC Triangle, and how to play the game.
                  </p>
                  <Button
                    onClick={handleStart}
                    variant="primary"
                    className="px-8 py-3 text-lg"
                  >
                    Start Tutorial
                  </Button>
                </motion.div>
              ) : (
                /* Tutorial Content */
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {currentStepData.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentStepData.description}
                    </p>
                    {currentStepData.content && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        {currentStepData.content}
                      </div>
                    )}
                  </div>

                  {/* Interactive Step */}
                  {currentStepData.isInteractive && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-blue-800 font-medium mb-2">
                        Try it yourself!
                      </p>
                      <p className="text-blue-700 text-sm">
                        In the actual game, you'll see scenarios with response options.
                        Choose the option that best increases your tone level and ARC state.
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      className="flex-1"
                      disabled={currentStep > 0}
                    >
                      Skip Tutorial
                    </Button>
                    {currentStep > 0 && (
                      <Button
                        onClick={handlePrevious}
                        variant="outline"
                        className="flex-1"
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      variant="primary"
                      className="flex-1"
                    >
                      {currentStep === TUTORIAL_STEPS.length - 1 ? 'Start Game!' : 'Next'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TutorialModal;
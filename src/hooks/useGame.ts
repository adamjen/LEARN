/**
 * useGame Hook
 * 
 * Custom hook for managing game state and interactions.
 * Provides functions for starting, playing, and ending the game.
 * 
 * @module hooks/useGame
 */

import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../store/gameStore';
import { Scenario } from '../types/game';
import { ScenarioCategory, ScenarioDifficulty } from '../types/scenarios';

/**
 * Game state interface for the hook
 */
interface GameHookState {
  /** Current game state */
  gameState: GameState;
  /** Current tone level */
  currentTone: number;
  /** Current scenario */
  currentScenario: Scenario | null;
  /** Selected response option */
  selectedOption: string | null;
  /** Whether game is loading */
  isLoading: boolean;
  /** Whether feedback is shown */
  showFeedback: boolean;
  /** Feedback result */
  feedbackResult: {
    isOptimal: boolean;
    toneChange: number;
    newToneLevel: number;
    explanation: string;
  } | null;
}

/**
 * Game actions interface for the hook
 */
interface GameHookActions {
  /** Start a new game */
  startGame: (initialTone?: number) => void;
  /** Select a response option */
  selectResponse: (optionId: string) => void;
  /** Move to next scenario */
  nextScenario: (scenarios: Scenario[]) => void;
  /** End the current game */
  endGame: () => void;
  /** Reset the game */
  resetGame: () => void;
  /** Skip feedback and continue */
  continueGame: () => void;
}

/**
 * useGame Hook
 * 
 * Manages game state and provides actions for:
 * - Starting a new game
 * - Selecting response options
 * - Moving to next scenarios
 * - Ending the game
 * - Resetting the game
 * 
 * @returns Object containing game state and actions
 * 
 * @example
 * const { gameState, actions } = useGame();
 * 
 * return (
 *   <div>
 *     <ScenarioCard
 *       scenario={gameState.currentScenario}
 *       currentTone={gameState.currentTone}
 *       onRespond={actions.selectResponse}
 *     />
 *     <FeedbackModal
 *       isOpen={gameState.showFeedback}
 *       feedback={gameState.feedbackResult}
 *       onClose={actions.continueGame}
 *     />
 *   </div>
 * );
 */
export const useGame = (): {
  gameState: GameHookState;
  actions: GameHookActions;
} => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED);
  const [currentTone, setCurrentTone] = useState<number>(0);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackResult, setFeedbackResult] = useState<{
    isOptimal: boolean;
    toneChange: number;
    newToneLevel: number;
    explanation: string;
  } | null>(null);

  /**
   * Start a new game
   * 
   * @param initialTone - Optional starting tone level (defaults to 0)
   */
  const startGame = useCallback((initialTone: number = 0) => {
    setIsLoading(true);
    
    // Simulate loading scenarios
    setTimeout(() => {
      setCurrentTone(initialTone);
      setGameState(GameState.PLAYING);
      setSelectedOption(null);
      setShowFeedback(false);
      setFeedbackResult(null);
      setIsLoading(false);
    }, 500);
  }, []);

  /**
   * Select a response option
   * 
   * @param optionId - The ID of the selected option
   */
  const selectResponse = useCallback((optionId: string) => {
    if (!currentScenario) return;
    
    const option = currentScenario.options.find(opt => opt.id === optionId);
    if (!option) return;
    
    setSelectedOption(optionId);
    
    // Calculate feedback
    const toneChange = option.toneImpact;
    const newToneLevel = currentTone + toneChange;
    const isOptimal = option.isOptimal || false;
    const explanation = option.explanation || 'No explanation provided.';
    
    // Update tone
    setCurrentTone(newToneLevel);
    
    // Show feedback
    setFeedbackResult({
      isOptimal,
      toneChange,
      newToneLevel,
      explanation,
    });
    setShowFeedback(true);
  }, [currentScenario, currentTone]);

  /**
   * Move to next scenario
   * 
   * @param scenarios - Array of available scenarios
   */
  const nextScenario = useCallback((scenarios: Scenario[]) => {
    setIsLoading(true);
    
    // Simulate loading next scenario
    setTimeout(() => {
      // Select random scenario
      const randomIndex = Math.floor(Math.random() * scenarios.length);
      setCurrentScenario(scenarios[randomIndex]);
      setSelectedOption(null);
      setShowFeedback(false);
      setFeedbackResult(null);
      setIsLoading(false);
    }, 300);
  }, []);

  /**
   * End the current game
   */
  const endGame = useCallback(() => {
    setGameState(GameState.COMPLETED);
  }, []);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setGameState(GameState.NOT_STARTED);
    setCurrentTone(0);
    setCurrentScenario(null);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedbackResult(null);
  }, []);

  /**
   * Continue game after feedback
   */
  const continueGame = useCallback(() => {
    setShowFeedback(false);
    setSelectedOption(null);
    setFeedbackResult(null);
  }, []);

  return {
    gameState: {
      gameState,
      currentTone,
      currentScenario,
      selectedOption,
      isLoading,
      showFeedback,
      feedbackResult,
    },
    actions: {
      startGame,
      selectResponse,
      nextScenario,
      endGame,
      resetGame,
      continueGame,
    },
  };
};

export default useGame;
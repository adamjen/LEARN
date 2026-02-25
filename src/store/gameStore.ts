/**
 * Game Store - Zustand state management for game state
 * 
 * Manages the current game state including tone level, scenarios,
 * selected responses, and overall game progression.
 * 
 * @module store/gameStore
 */

import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

/**
 * Game state enumeration
 */
export enum GameState {
  NOT_STARTED = 'notStarted',
  PLAYING = 'playing',
  COMPLETED = 'completed',
}

/**
 * Represents a scenario in the game
 */
export interface Scenario {
  id: string;
  title: string;
  description: string;
  toneLevel: number;
  options: Array<{
    id: string;
    text: string;
    toneChange: number;
  }>;
}

/**
 * Represents a selected response in the game
 */
export interface SelectedResponse {
  scenarioId: string;
  optionId: string;
  toneChange: number;
  timestamp: number;
}

/**
 * Game store state interface
 */
interface GameStoreState {
  /** Current tone level (starts at neutral point 0.0) */
  currentToneLevel: number;
  
  /** Current scenario being played */
  currentScenario: Scenario | null;
  
  /** Currently selected response option */
  selectedResponse: SelectedResponse | null;
  
  /** Current game state */
  gameState: GameState;
  
  /** History of tone changes during the game */
  toneHistory: number[];
  
  /** Actions */
  startGame: (initialToneLevel?: number) => void;
  selectResponse: (scenarioId: string, optionId: string, toneChange: number) => void;
  nextScenario: (scenarios: Scenario[]) => void;
  endGame: () => void;
  setToneLevel: (level: number) => void;
  resetGame: () => void;
}

/**
 * State to persist (without actions)
 */
interface GameStorePersistState {
  currentToneLevel: number;
  currentScenario: Scenario | null;
  selectedResponse: SelectedResponse | null;
  gameState: GameState;
  toneHistory: number[];
}

/**
 * Default state values for the game store
 */
const defaultState: Omit<GameStoreState, 
  'startGame' | 'selectResponse' | 'nextScenario' | 'endGame' | 'setToneLevel' | 'resetGame'
> = {
  currentToneLevel: 0.0,
  currentScenario: null,
  selectedResponse: null,
  gameState: GameState.NOT_STARTED,
  toneHistory: [],
};

/**
 * Create the game store using Zustand with persist middleware
 * 
 * The store persists to localStorage under the key 'tone-navigator-game-store'
 * and only serializes the state properties (not the actions).
 * 
 * @returns Zustand store with game state and actions
 * 
 * @example
 * const { startGame, gameState } = useGameStore();
 * startGame(); // Begin a new game session
 */
export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,

      /**
       * Start a new game session
       * 
       * Initializes the game state with an optional starting tone level.
       * Sets the game state to PLAYING and resets the tone history.
       * 
       * @param initialToneLevel - Optional starting tone level (defaults to 0.0)
       * 
       * @example
       * startGame(10.0); // Start game at tone level +10
       */
      startGame: (initialToneLevel = 0.0) => {
        set({
          currentToneLevel: initialToneLevel,
          currentScenario: null,
          selectedResponse: null,
          gameState: GameState.PLAYING,
          toneHistory: [initialToneLevel],
        });
      },

      /**
       * Select a response option for the current scenario
       * 
       * Records the selected response and updates the tone level
       * based on the option's tone change value.
       * 
       * @param scenarioId - ID of the current scenario
       * @param optionId - ID of the selected option
       * @param toneChange - Tone level change from this response
       * 
       * @example
       * selectResponse('scenario-1', 'option-a', 2.5);
       */
      selectResponse: (scenarioId: string, optionId: string, toneChange: number) => {
        const { currentToneLevel } = get();
        const newToneLevel = currentToneLevel + toneChange;
        
        set({
          selectedResponse: {
            scenarioId,
            optionId,
            toneChange,
            timestamp: Date.now(),
          },
          currentToneLevel: newToneLevel,
          toneHistory: [...get().toneHistory, newToneLevel],
        });
      },

      /**
       * Move to the next scenario in the game
       * 
       * Sets the next scenario from the provided array.
       * If no scenarios remain, ends the game.
       * 
       * @param scenarios - Array of available scenarios
       * 
       * @example
       * const scenarios = useGameStore.getState().scenarios;
       * nextScenario(scenarios);
       */
      nextScenario: (scenarios: Scenario[]) => {
        const { gameState } = get();
        
        if (gameState !== GameState.PLAYING) {
          return;
        }

        // Find the next scenario (simple implementation - first scenario)
        const nextScenario = scenarios[0] || null;
        
        set({
          currentScenario: nextScenario,
          selectedResponse: null,
        });
      },

      /**
       * End the current game session
       * 
       * Sets the game state to COMPLETED and clears the current scenario.
       * 
       * @example
       * endGame(); // Mark game as completed
       */
      endGame: () => {
        set({
          gameState: GameState.COMPLETED,
          currentScenario: null,
        });
      },

      /**
       * Set the tone level directly
       * 
       * Updates the current tone level and records it in history.
       * Useful for testing or manual adjustments.
       * 
       * @param level - The tone level to set
       * 
       * @example
       * setToneLevel(15.0); // Set tone to +15 (Gay/Cheerful)
       */
      setToneLevel: (level: number) => {
        set({
          currentToneLevel: level,
          toneHistory: [...get().toneHistory, level],
        });
      },

      /**
       * Reset the game to initial state
       * 
       * Clears all game state and returns to NOT_STARTED state.
       * 
       * @example
       * resetGame(); // Reset game completely
       */
      resetGame: () => {
        set({
          ...defaultState,
        });
      },
    }),
    {
      /**
       * Storage key for localStorage persistence
       */
      name: 'tone-navigator-game-store',
      
      /**
       * Partialize function - only persist these state properties
       * Actions are not persisted as they are functions
       */
      partialize: (state): GameStorePersistState => ({
        currentToneLevel: state.currentToneLevel,
        currentScenario: state.currentScenario,
        selectedResponse: state.selectedResponse,
        gameState: state.gameState,
        toneHistory: state.toneHistory,
      }),
      
      /**
       * Version of the store state for migration purposes
       */
      version: 1,
      
      /**
       * Storage wrapper - uses localStorage with proper typing
       */
      storage: (typeof localStorage !== 'undefined' 
        ? ({
            getItem: (key: string): string | null => localStorage.getItem(key),
            setItem: (key: string, value: string): void => localStorage.setItem(key, value),
            removeItem: (key: string): void => localStorage.removeItem(key),
          }) as unknown as PersistStorage<GameStorePersistState>
        : undefined),
    }
  )
);

/**
 * Helper function to get scenarios for the game
 * 
 * This can be extended to load scenarios from external sources.
 * 
 * @returns Array of default scenarios for testing
 */
export const getDefaultScenarios = (): Scenario[] => [
  {
    id: 'scenario-1',
    title: 'Daily Challenge',
    description: 'A typical day at work with various social interactions',
    toneLevel: 0.0,
    options: [
      { id: 'opt-1', text: 'Ignore everyone and work silently', toneChange: -5.0 },
      { id: 'opt-2', text: 'Greet colleagues with a smile', toneChange: +3.0 },
      { id: 'opt-3', text: 'Discuss work concerns with teammates', toneChange: -1.0 },
    ],
  },
  {
    id: 'scenario-2',
    title: 'Weekend Plans',
    description: 'Friends asking about weekend activities',
    toneLevel: 5.0,
    options: [
      { id: 'opt-1', text: 'Make excuses to stay home', toneChange: -2.0 },
      { id: 'opt-2', text: 'Enthusiastically join the plans', toneChange: +5.0 },
      { id: 'opt-3', text: 'Suggest an alternative activity', toneChange: +2.0 },
    ],
  },
];

export default useGameStore;
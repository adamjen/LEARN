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
import { ScenarioCategory, ScenarioDifficulty } from '../types/scenarios';
import { ARCState } from '../types/game';

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
  context: string;
  category: ScenarioCategory;
  difficulty: ScenarioDifficulty;
  initialARC: ARCState;
  initialTone: number;
  toneLevel: number;
  options: Array<{
    id: string;
    text: string;
    toneChange: number;
  }>;
  tags?: string[];
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
  reset: () => void;
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
  'startGame' | 'selectResponse' | 'nextScenario' | 'endGame' | 'setToneLevel' | 'resetGame' | 'reset'
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
        // Generate initial demo scenario
        const initialScenario: Scenario = {
          id: 'demo-scenario-1',
          title: 'Workplace Communication Challenge',
          description: 'A team meeting has revealed conflicting information about project deadlines.',
          context: 'During a team meeting, you discover that different team members have been given different deadline dates for the same project. Some say it is due Friday, others say next Wednesday.',
          category: ScenarioCategory.WORKPLACE,
          difficulty: ScenarioDifficulty.BEGINNER,
          initialARC: {
            appreciation: 5,
            reality: 5,
            communication: 5,
            total: 15,
            average: 5,
          },
          initialTone: initialToneLevel,
          toneLevel: initialToneLevel,
          options: [
            {
              id: 'opt-1',
              text: 'Listen actively and ask clarifying questions to understand the confusion',
              toneChange: 2.5,
            },
            {
              id: 'opt-2',
              text: 'Express frustration about the confusion and lack of coordination',
              toneChange: -3,
            },
            {
              id: 'opt-3',
              text: 'Suggest a follow-up meeting to align everyone on the correct deadline',
              toneChange: 1.5,
            },
          ],
        };

        set({
          currentToneLevel: initialToneLevel,
          currentScenario: initialScenario,
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
        const { currentToneLevel, toneHistory } = get();
        const newToneLevel = currentToneLevel + toneChange;
        
        set({
          selectedResponse: {
            scenarioId,
            optionId,
            toneChange,
            timestamp: Date.now(),
          },
          currentToneLevel: newToneLevel,
          toneHistory: [...toneHistory, newToneLevel],
        });
      },

      /**
       * Move to the next scenario
       * 
       * Loads the next scenario from the provided array.
       * If no scenarios are provided, the current scenario is kept.
       * 
       * @param scenarios - Array of scenarios to choose from
       * 
       * @example
       * nextScenario(scenarioList); // Load next scenario
       */
      nextScenario: (scenarios: Scenario[] = []) => {
        const { currentScenario } = get();
        
        // If no scenarios provided, keep current scenario
        if (scenarios.length === 0) {
          return;
        }
        
        // Randomly select a scenario
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        set({
          currentScenario: scenarios[randomIndex],
        });
      },

      /**
       * End the current game session
       * 
       * Sets the game state to COMPLETED.
       * 
       * @example
       * endGame(); // Mark game as complete
       */
      endGame: () => {
        set({
          gameState: GameState.COMPLETED,
        });
      },

      /**
       * Set the tone level directly
       * 
       * @param level - The tone level to set
       * 
       * @example
       * setToneLevel(15.0); // Set tone to +15
       */
      setToneLevel: (level: number) => {
        const { toneHistory } = get();
        set({
          currentToneLevel: level,
          toneHistory: [...toneHistory, level],
        });
      },

      /**
       * Reset the game to initial state
       * 
       * Resets all game state including tone level, scenario, and history.
       * 
       * @example
       * resetGame(); // Reset game state
       */
      resetGame: () => {
        set({
          currentToneLevel: 0.0,
          currentScenario: null,
          selectedResponse: null,
          gameState: GameState.NOT_STARTED,
          toneHistory: [],
        });
      },

      /**
       * Reset the store to initial state
       * 
       * Clears all persisted state and returns to default values.
       * Useful for testing or manual state resets.
       */
      reset: () => {
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
       * Storage wrapper - uses localStorage
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
 * Helper function to create a scenario
 * 
 * @param id - Scenario ID
 * @param title - Scenario title
 * @param description - Scenario description
 * @param toneLevel - Initial tone level
 * @returns A new scenario object
 */
export const createScenario = (
  id: string,
  title: string,
  description: string,
  toneLevel: number
): Scenario => ({
  id,
  title,
  description,
  context: description,
  category: ScenarioCategory.GENERAL,
  difficulty: ScenarioDifficulty.BEGINNER,
  initialARC: {
    appreciation: 5,
    reality: 5,
    communication: 5,
    total: 15,
    average: 5,
  },
  initialTone: toneLevel,
  toneLevel,
  options: [],
});

/**
 * Helper function to reset the game store
 * Useful for testing or manual state resets
 */
export const resetGameStore = () => useGameStore.getState().reset();
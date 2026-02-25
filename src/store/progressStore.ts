/**
 * Progress Store - Zustand state management for player progress
 * 
 * Tracks player progress including scenarios completed, best tone levels,
 * EQ scores, and user settings preferences.
 * 
 * @module store/progressStore
 */

import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

/**
 * Emotional Intelligence (EQ) scores
 */
export interface EQScores {
  /** Self-awareness score (0-100) */
  selfAwareness: number;
  
  /** Self-regulation score (0-100) */
  selfRegulation: number;
  
  /** Motivation score (0-100) */
  motivation: number;
  
  /** Empathy score (0-100) */
  empathy: number;
  
  /** Social skills score (0-100) */
  socialSkills: number;
}

/**
 * Player progress data
 */
export interface PlayerProgress {
  /** Total scenarios completed */
  scenariosCompleted: number;
  
  /** Best (highest) tone level achieved */
  bestTone: number;
  
  /** Current tone level */
  currentTone: number;
  
  /** EQ scores across different dimensions */
  eqScores: EQScores;
  
  /** History of tone levels achieved */
  toneHistory: number[];
  
  /** Total scenarios played */
  totalScenariosPlayed: number;
  
  /** Current streak of completed scenarios */
  currentStreak: number;
  
  /** Best streak achieved */
  bestStreak: number;
}

/**
 * Player progress state interface
 */
interface ProgressStoreState {
  /** Player progress data */
  progress: PlayerProgress;
  
  /** User settings preferences */
  settings: {
    /** Difficulty level (easy, medium, hard) */
    difficulty: 'easy' | 'medium' | 'hard';
    
    /** Whether animations are enabled */
    animationsEnabled: boolean;
    
    /** Whether sound effects are enabled */
    soundEnabled: boolean;
    
    /** Whether tutorial is enabled */
    tutorialEnabled: boolean;
  };
  
  /** Actions */
  completeScenario: (toneChange: number) => void;
  updateToneHistory: (toneLevel: number) => void;
  updateEQScore: (dimension: keyof EQScores, score: number) => void;
  resetProgress: () => void;
  updateSettings: (settings: Partial<ProgressStoreState['settings']>) => void;
  resetStreak: () => void;
  incrementStreak: () => void;
}

/**
 * State to persist (without actions)
 */
interface ProgressStorePersistState {
  progress: PlayerProgress;
  settings: {
    difficulty: 'easy' | 'medium' | 'hard';
    animationsEnabled: boolean;
    soundEnabled: boolean;
    tutorialEnabled: boolean;
  };
}

/**
 * Default state values for the progress store
 */
const defaultProgress: PlayerProgress = {
  scenariosCompleted: 0,
  bestTone: 0.0,
  currentTone: 0.0,
  eqScores: {
    selfAwareness: 50,
    selfRegulation: 50,
    motivation: 50,
    empathy: 50,
    socialSkills: 50,
  },
  toneHistory: [],
  totalScenariosPlayed: 0,
  currentStreak: 0,
  bestStreak: 0,
};

const defaultSettings = {
  difficulty: 'medium' as const,
  animationsEnabled: true,
  soundEnabled: true,
  tutorialEnabled: true,
};

const defaultState: Omit<ProgressStoreState, 
  'completeScenario' | 'updateToneHistory' | 'updateEQScore' | 'resetProgress' | 'updateSettings' | 'resetStreak' | 'incrementStreak'
> = {
  progress: defaultProgress,
  settings: defaultSettings,
};

/**
 * Create the progress store using Zustand with persist middleware
 * 
 * The store persists to localStorage under the key 'tone-navigator-progress-store'
 * and tracks player progress across sessions.
 * 
 * @returns Zustand store with progress state and actions
 * 
 * @example
 * const { completeScenario, progress } = useProgressStore();
 * completeScenario(5.0); // Complete a scenario with +5 tone change
 */
export const useProgressStore = create<ProgressStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,

      /**
       * Mark a scenario as completed
       * 
       * Updates the player's progress including scenarios completed,
       * best tone achieved, and streak tracking.
       * 
       * @param toneChange - The tone level change from this scenario
       * 
       * @example
       * completeScenario(3.5); // Complete scenario with +3.5 tone
       */
      completeScenario: (toneChange: number) => {
        const { progress } = get();
        const newTone = progress.currentTone + toneChange;
        const newBestTone = Math.max(progress.bestTone, newTone);
        
        set({
          progress: {
            ...progress,
            scenariosCompleted: progress.scenariosCompleted + 1,
            currentTone: newTone,
            bestTone: newBestTone,
            totalScenariosPlayed: progress.totalScenariosPlayed + 1,
            currentStreak: progress.currentStreak + 1,
            bestStreak: Math.max(progress.bestStreak, progress.currentStreak + 1),
          },
        });
      },

      /**
       * Update the tone history
       * 
       * Adds a tone level to the history for tracking purposes.
       * 
       * @param toneLevel - The tone level to record
       * 
       * @example
       * updateToneHistory(15.0); // Record tone level +15
       */
      updateToneHistory: (toneLevel: number) => {
        set({
          progress: {
            ...get().progress,
            toneHistory: [...get().progress.toneHistory, toneLevel],
          },
        });
      },

      /**
       * Update an EQ score dimension
       * 
       * Updates a specific EQ dimension score.
       * 
       * @param dimension - The EQ dimension to update
       * @param score - The new score (0-100)
       * 
       * @example
       * updateEQScore('empathy', 75); // Set empathy to 75
       */
      updateEQScore: (dimension: keyof EQScores, score: number) => {
        const clampedScore = Math.min(100, Math.max(0, score));
        
        set({
          progress: {
            ...get().progress,
            eqScores: {
              ...get().progress.eqScores,
              [dimension]: clampedScore,
            },
          },
        });
      },

      /**
       * Reset all player progress
       * 
       * Resets all progress data to initial values.
       * Use with caution as this cannot be undone.
       * 
       * @example
       * resetProgress(); // Reset all progress
       */
      resetProgress: () => {
        set({
          progress: defaultProgress,
        });
      },

      /**
       * Update user settings
       * 
       * Merges the provided settings with existing settings.
       * 
       * @param settings - Partial settings object to update
       * 
       * @example
       * updateSettings({ animationsEnabled: false });
       */
      updateSettings: (settings: Partial<ProgressStoreState['settings']>) => {
        set({
          settings: {
            ...get().settings,
            ...settings,
          },
        });
      },

      /**
       * Reset the current streak
       * 
       * Sets the current streak to zero while preserving best streak.
       * 
       * @example
       * resetStreak(); // Reset current streak
       */
      resetStreak: () => {
        set({
          progress: {
            ...get().progress,
            currentStreak: 0,
          },
        });
      },

      /**
       * Increment the current streak
       * 
       * Increases the current streak and updates best streak if needed.
       * 
       * @example
       * incrementStreak(); // Increment current streak
       */
      incrementStreak: () => {
        set({
          progress: {
            ...get().progress,
            currentStreak: get().progress.currentStreak + 1,
            bestStreak: Math.max(
              get().progress.bestStreak,
              get().progress.currentStreak + 1
            ),
          },
        });
      },
    }),
    {
      /**
       * Storage key for localStorage persistence
       */
      name: 'tone-navigator-progress-store',
      
      /**
       * Partialize function - only persist these state properties
       */
      partialize: (state): ProgressStorePersistState => ({
        progress: state.progress,
        settings: state.settings,
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
          }) as unknown as PersistStorage<ProgressStorePersistState>
        : undefined),
    }
  )
);

/**
 * Helper function to calculate EQ score from game performance
 * 
 * Uses scenario completion rate and tone improvements to estimate EQ scores.
 * 
 * @param scenariosCompleted - Total scenarios completed
 * @param averageToneImprovement - Average tone improvement per scenario
 * @returns Partial EQ scores object
 */
export const calculateEQScores = (
  scenariosCompleted: number,
  averageToneImprovement: number
): Partial<EQScores> => {
  const baseScore = 50;
  const improvementFactor = Math.min(50, averageToneImprovement * 5);
  
  return {
    selfAwareness: Math.round(baseScore + improvementFactor * 0.2),
    selfRegulation: Math.round(baseScore + improvementFactor * 0.25),
    motivation: Math.round(baseScore + improvementFactor * 0.15),
    empathy: Math.round(baseScore + improvementFactor * 0.2),
    socialSkills: Math.round(baseScore + improvementFactor * 0.2),
  };
};

export default useProgressStore;
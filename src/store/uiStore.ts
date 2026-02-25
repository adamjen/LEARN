/**
 * UI Store - Zustand state management for UI state
 * 
 * Manages UI-related state including modal visibility, theme preferences,
 * notifications, and animation settings.
 * 
 * @module store/uiStore
 */

import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

/**
 * Modal types for the application
 */
export type ModalType =
  | 'settings'
  | 'tutorial'
  | 'gameOver'
  | 'scenarioDetails'
  | 'eqAssessment'
  | 'help';

/**
 * Notification types
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * Notification data structure
 */
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
}

/**
 * Theme preferences
 */
export interface ThemePreferences {
  /** Current theme mode (light, dark, auto) */
  mode: 'light' | 'dark' | 'auto';
  
  /** Primary accent colour */
  accentColor: string;
  
  /** High contrast mode enabled */
  highContrast: boolean;
}

/**
 * UI store state interface
 */
interface UIStoreState {
  /** Currently visible modal (null if none) */
  activeModal: ModalType | null;
  
  /** Modal data payload (optional context data) */
  modalData: Record<string, unknown>;
  
  /** Currently displayed notification */
  notification: Notification | null;
  
  /** Theme preferences */
  theme: ThemePreferences;
  
  /** Whether animations are enabled */
  animationsEnabled: boolean;
  
  /** Whether sound effects are enabled */
  soundEnabled: boolean;
  
  /** Actions */
  openModal: (modal: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  setNotification: (type: NotificationType, message: string, duration?: number) => void;
  clearNotification: () => void;
  toggleAnimations: () => void;
  toggleSound: () => void;
  setTheme: (theme: Partial<ThemePreferences>) => void;
  resetUI: () => void;
}

/**
 * State to persist (without actions)
 */
interface UIStorePersistState {
  theme: ThemePreferences;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

/**
 * Default state values for the UI store
 */
const defaultTheme: ThemePreferences = {
  mode: 'auto' as const,
  accentColor: '#3b82f6',
  highContrast: false,
};

const defaultState: Omit<UIStoreState, 
  'openModal' | 'closeModal' | 'setNotification' | 'clearNotification' | 'toggleAnimations' | 'toggleSound' | 'setTheme' | 'resetUI'
> = {
  activeModal: null,
  modalData: {},
  notification: null,
  theme: defaultTheme,
  animationsEnabled: true,
  soundEnabled: true,
};

/**
 * Create the UI store using Zustand with persist middleware
 * 
 * The store persists theme preferences and settings to localStorage
 * under the key 'tone-navigator-ui-store'.
 * 
 * @returns Zustand store with UI state and actions
 * 
 * @example
 * const { openModal, activeModal } = useUIStore();
 * openModal('settings'); // Open settings modal
 */
export const useUIStore = create<UIStoreState>()(
  persist(
    (set, get) => ({
      ...defaultState,

      /**
       * Open a modal
       * 
       * Sets the active modal and optionally passes data to it.
       * 
       * @param modal - The modal type to open
       * @param data - Optional data to pass to the modal
       * 
       * @example
       * openModal('tutorial'); // Open tutorial modal
       * openModal('scenarioDetails', { scenarioId: '123' }); // Open with data
       */
      openModal: (modal: ModalType, data: Record<string, unknown> = {}) => {
        set({
          activeModal: modal,
          modalData: data,
        });
      },

      /**
       * Close the currently active modal
       * 
       * Clears the active modal and its data.
       * 
       * @example
       * closeModal(); // Close current modal
       */
      closeModal: () => {
        set({
          activeModal: null,
          modalData: {},
        });
      },

      /**
       * Set a notification
       * 
       * Displays a notification with the specified type and message.
       * Automatically clears after the specified duration (default: 5000ms).
       * 
       * @param type - The notification type
       * @param message - The notification message
       * @param duration - Duration in milliseconds (default: 5000)
       * 
       * @example
       * setNotification('success', 'Scenario completed!');
       */
      setNotification: (
        type: NotificationType,
        message: string,
        duration: number = 5000
      ) => {
        const notification: Notification = {
          id: Date.now().toString(),
          type,
          message,
          timestamp: Date.now(),
        };

        set({ notification });

        // Auto-clear after duration
        setTimeout(() => {
          set({ notification: null });
        }, duration);
      },

      /**
       * Clear the current notification
       * 
       * @example
       * clearNotification(); // Clear notification
       */
      clearNotification: () => {
        set({ notification: null });
      },

      /**
       * Toggle animations on/off
       * 
       * @example
       * toggleAnimations(); // Toggle animations
       */
      toggleAnimations: () => {
        set({
          animationsEnabled: !get().animationsEnabled,
        });
      },

      /**
       * Toggle sound effects on/off
       * 
       * @example
       * toggleSound(); // Toggle sound
       */
      toggleSound: () => {
        set({
          soundEnabled: !get().soundEnabled,
        });
      },

      /**
       * Set theme preferences
       * 
       * Merges the provided theme settings with existing theme.
       * 
       * @param theme - Partial theme object to update
       * 
       * @example
       * setTheme({ mode: 'dark', accentColor: '#10b981' });
       */
      setTheme: (theme: Partial<ThemePreferences>) => {
        set({
          theme: {
            ...get().theme,
            ...theme,
          },
        });
      },

      /**
       * Reset UI state to defaults
       * 
       * Clears all UI state including modals, notifications, and settings.
       * 
       * @example
       * resetUI(); // Reset all UI state
       */
      resetUI: () => {
      set({
      ...defaultState,
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
      name: 'tone-navigator-ui-store',
      
      /**
       * Partialize function - only persist these state properties
       */
      partialize: (state): UIStorePersistState => ({
        theme: state.theme,
        animationsEnabled: state.animationsEnabled,
        soundEnabled: state.soundEnabled,
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
          }) as unknown as PersistStorage<UIStorePersistState>
        : undefined),
    }
  )
);

/**
 * Helper function to create a notification ID
 * 
 * @returns Unique notification ID
 */
export const createNotificationId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Helper function to get notification colour based on type
 * 
 * @param type - The notification type
 * @returns Tailwind colour class
 */
export const getNotificationColour = (type: NotificationType): string => {
  const colours = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };
  
  return colours[type] || colours.info;
};

export default useUIStore;

/**
 * Helper function to reset the UI store
 * Useful for testing or manual state resets
 */
export const resetUIStore = () => useUIStore.getState().reset();
/**
 * Store Index - Central export point for all Zustand stores
 * 
 * This module provides a single import point for all application stores.
 * All stores are configured with persist middleware for localStorage persistence.
 * 
 * @module store
 * 
 * @example
 * import { useGameStore, useProgressStore, useUIStore } from '@/store';
 */

// Import and re-export all stores and related types
export {
  useGameStore,
  GameState,
  Scenario,
  SelectedResponse,
} from './gameStore';

export {
  useProgressStore,
  calculateEQScores,
  EQScores,
  PlayerProgress,
} from './progressStore';

export {
  useUIStore,
  createNotificationId,
  getNotificationColour,
  ModalType,
  NotificationType,
  Notification,
  ThemePreferences,
} from './uiStore';
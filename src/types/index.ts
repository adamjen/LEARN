/**
 * Type Exports for Tone Navigator
 * 
 * This module provides a consolidated export of all type definitions
 * used throughout the Tone Navigator application. Import from here
 * to access all types in a single statement.
 * 
 * @module types
 */

// Export game types
export type {
  ToneLevel,
  ToneScale,
  ARCState,
  Scenario,
  ResponseOption,
  PlayerProgress,
  GameSettings,
} from './game';

// Export scenario types
export type {
  ScenarioCategory,
  ScenarioDifficulty,
  ScenarioFeedback,
} from './scenarios';

// Export framework types
export type {
  EQModel,
  EQComponent,
  ARCComponent,
  ToneLevelReference,
  ToneLevelReferences,
} from './frameworks';
/**
 * Core Game Types for Tone Navigator
 *
 * This module defines the fundamental data structures for the Tone Navigator application,
 * including Tone Scale levels, ARC State tracking, and game scenario structures.
 *
 * @module types/game
 */

import { ScenarioCategory, ScenarioDifficulty } from './scenarios';

/**
 * Represents a single level on the Tone Scale (-40 to +40)
 *
 * The Tone Scale, developed by L. Ron Hubbard in the 1950s, is an emotional gradient
 * scale used to measure emotional states. This type captures the essential properties
 * of each tone level for use in the game mechanics.
 *
 * @see {@link https://learn-doocs.github.io/TONE-SCALE/} Tone Scale documentation
 * @see {@link GLOSSARY.md} Glossary for terminology
 */
export interface ToneLevel {
  /** Numeric value on the scale from -40 to +40 */
  value: number;
  
  /** Display name for the tone level */
  name: string;
  
  /** Brief description of the emotional state */
  description: string;
  
  /** Category classification (emotional, mental, neutral) */
  category: 'emotional' | 'mental' | 'neutral';
  
  /** Whether this is an above-zero (positive) tone */
  isPositive: boolean;
}

/**
 * Complete Tone Scale from -40 to +40
 * 
 * Contains all 34 tone levels defined by L. Ron Hubbard, representing the full
 * emotional gradient from Total Failure (-40) to Serenity of Beingness (+40).
 * 
 * @remarks
 * This scale is referenced throughout the application for:
 * - Player progress tracking
 * - Scenario difficulty determination
 * - Response impact calculation
 * 
 * @see {@link ToneLevel} Individual tone level structure
 */
export interface ToneScale {
  /** Complete array of all tone levels from -40 to +40 */
  levels: ToneLevel[];
  
  /** Minimum value on the scale (-40) */
  minValue: -40;
  
  /** Maximum value on the scale (+40) */
  maxValue: 40;
  
  /** Neutral point (0.0) */
  neutralPoint: 0;
}

/**
 * Represents the current ARC (Appreciation, Reality, Communication) state
 * 
 * The ARC Triangle is a fundamental concept in human interaction, representing
 * the three interdependent elements that create successful communication and
 * relationships. Each component is measured on a scale from 0 to 10.
 * 
 * @remarks
 * Based on the ARC framework from Scientology (1950s), this type tracks:
 * - Appreciation: Value, care, or regard for others
 * - Reality: Shared understanding or truth
 * - Communication: Flow of information between parties
 * 
 * @see {@link https://learn-doocs.github.io/ARC-TRIANGLE/} ARC Triangle documentation
 * @see {@link GLOSSARY.md} Glossary for terminology
 */
export interface ARCState {
  /** Appreciation level (0-10) - value/care/regard for others */
  appreciation: number;
  
  /** Reality level (0-10) - shared understanding/truth */
  reality: number;
  
  /** Communication level (0-10) - information exchange */
  communication: number;
  
  /** Combined ARC score (sum of all three components) */
  total: number;
  
  /** Average ARC score across all components */
  average: number;
}

/**
 * Represents a game scenario with context and choices
 * 
 * Scenarios are structured situations that players encounter in the game,
 * designed to help them practice emotional intelligence and ARC application
 * in realistic contexts.
 * 
 * @remarks
 * Each scenario includes:
 * - Context describing the situation
 * - Category for filtering and organisation
 * - Difficulty level for progression
 * - Multiple response options with tone impacts
 * 
 * @see {@link ResponseOption} Response choice structure
 * @see {@link ScenarioCategory} Scenario classification
 * @see {@link ScenarioDifficulty} Difficulty levels
 */
export interface Scenario {
  /** Unique identifier for the scenario */
  id: string;
  
  /** Title or brief description of the scenario */
  title: string;
  
  /** Detailed context describing the situation */
  context: string;
  
  /** Category classification (workplace, family, friends, general) */
  category: ScenarioCategory;
  
  /** Difficulty level for progression */
  difficulty: ScenarioDifficulty;
  
  /** Initial ARC state for this scenario */
  initialARC: ARCState;
  
  /** Initial tone level for the scenario */
  initialTone: number;
  
  /** Array of possible response options */
  options: ResponseOption[];
  
  /** Optional learning objective for this scenario */
  learningObjective?: string;
  
  /** Tags for categorisation and search */
  tags: string[];
}

/**
 * Represents a response choice within a scenario
 * 
 * Each response option has an associated tone impact, allowing the game
 * to track how different choices affect the player's emotional state.
 * 
 * @remarks
 * Response options include:
 * - Text display for the choice
 * - Tone impact (positive, negative, or neutral)
 * - Optional explanation of the impact
 * 
 * @see {@link Scenario} Parent scenario structure
 */
export interface ResponseOption {
  /** Unique identifier for this option */
  id: string;
  
  /** Display text for the response choice */
  text: string;
  
  /** Change in tone level when this option is selected */
  toneImpact: number;
  
  /** Impact on ARC components (optional detail) */
  arcImpact?: {
    appreciation?: number;
    reality?: number;
    communication?: number;
  };
  
  /** Explanation of why this response affects tone this way */
  explanation?: string;
  
  /** Whether this is considered an optimal response */
  isOptimal?: boolean;
}

/**
 * Tracks player progress through the game
 * 
 * This type maintains comprehensive tracking of a player's journey,
 * including tone levels, ARC states, completed scenarios, and statistics.
 * 
 * @remarks
 * Progress tracking includes:
 * - Current tone level and history
 * - ARC state evolution over time
 * - Completed scenarios with scores
 * - Performance statistics
 * 
 * @see {@link Scenario} Scenario structure
 * @see {@link ARCState} ARC state tracking
 */
export interface PlayerProgress {
  /** Current tone level */
  currentTone: number;
  
  /** Historical tone levels (for trend analysis) */
  toneHistory: number[];
  
  /** Current ARC state */
  currentARC: ARCState;
  
  /** ARC state history over time */
  arcHistory: ARCState[];
  
  /** Completed scenarios with scores */
  completedScenarios: Array<{
    scenarioId: string;
    score: number;
    timestamp: Date;
    selectedOptionId: string;
  }>;
  
  /** Total scenarios completed */
  totalCompleted: number;
  
  /** Average tone level across all scenarios */
  averageTone: number;
  
  /** Highest tone level achieved */
  highestTone: number;
  
  /** Current streak of positive responses */
  positiveStreak: number;
  
  /** Total responses given */
  totalResponses: number;
}

/**
 * Game configuration and settings
 * 
 * Controls various aspects of game behaviour, including difficulty,
 * feedback mechanisms, and progression rules.
 * 
 * @remarks
 * Settings include:
 * - Starting tone level
 * - Feedback verbosity
 * - Scenario selection mode
 * - Progression rules
 * 
 * @see {@link PlayerProgress} Player progress tracking
 */
export interface GameSettings {
  /** Starting tone level for new players */
  startingTone: number;
  
  /** Whether to show detailed feedback after each response */
  showDetailedFeedback: boolean;
  
  /** Scenario selection mode: 'random', 'sequential', or 'adaptive' */
  scenarioSelection: 'random' | 'sequential' | 'adaptive';
  
  /** Minimum tone level for gameplay */
  minTone: number;
  
  /** Maximum tone level for gameplay */
  maxTone: number;
  
  /** Whether to enable adaptive difficulty */
  adaptiveDifficulty: boolean;
  
  /** Number of scenarios per session */
  scenariosPerSession: number;
  
  /** Whether to show explanations for tone impacts */
  showExplanations: boolean;
  
  /** Default scenario category filter */
  defaultCategory?: ScenarioCategory;
}
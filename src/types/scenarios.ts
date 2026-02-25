/**
 * Scenario Types for Tone Navigator
 * 
 * This module defines scenario-related types including categories,
 * difficulty levels, and feedback structures for the game mechanics.
 * 
 * @module types/scenarios
 */

/**
 * Scenario category classification
 * 
 * Categories used to organise scenarios into different life contexts,
 * allowing players to practice emotional intelligence in specific situations.
 * 
 * @remarks
 * Categories are based on common life contexts where ARC application
 * and emotional regulation are valuable skills.
 * 
 * @see {@link Scenario} Scenario structure
 */
export enum ScenarioCategory {
  /** Workplace scenarios - professional relationships and situations */
  WORKPLACE = 'workplace',
  
  /** Family scenarios - relationships with family members */
  FAMILY = 'family',
  
  /** Friends scenarios - social relationships with friends */
  FRIENDS = 'friends',
  
  /** General scenarios - everyday situations not specific to any category */
  GENERAL = 'general'
}

/**
 * Scenario difficulty level
 * 
 * Defines the complexity and challenge level of scenarios, allowing
 * for progressive difficulty as players develop their skills.
 * 
 * @remarks
 * Difficulty levels range from beginner to advanced, with each level
 * requiring more sophisticated emotional intelligence and ARC application.
 * 
 * @see {@link Scenario} Scenario structure
 */
export enum ScenarioDifficulty {
  /** Beginner - simple scenarios for learning basic concepts */
  BEGINNER = 'beginner',
  
  /** Intermediate - moderate complexity requiring more nuanced responses */
  INTERMEDIATE = 'intermediate',
  
  /** Advanced - complex scenarios requiring advanced emotional intelligence */
  ADVANCED = 'advanced',
  
  /** Expert - highly complex scenarios for mastery level */
  EXPERT = 'expert'
}

/**
 * Feedback structure for scenario responses
 * 
 * Provides detailed feedback to players after they make a response choice,
 * including tone impact analysis and learning recommendations.
 * 
 * @remarks
 * Feedback includes:
 * - Tone level change explanation
 * - ARC component impact analysis
 * - Learning points and suggestions
 * - Whether the response was optimal
 * 
 * @see {@link ResponseOption} Response option structure
 * @see {@link ARCState} ARC state tracking
 */
export interface ScenarioFeedback {
  /** Selected response option ID */
  selectedOptionId: string;
  
  /** Whether the response was optimal */
  isOptimal: boolean;
  
  /** Change in tone level */
  toneChange: number;
  
  /** New tone level after response */
  newToneLevel: number;
  
  /** Impact on ARC components */
  arcImpact: {
    appreciation: number;
    reality: number;
    communication: number;
    total: number;
  };
  
  /** Explanation of the tone impact */
  explanation: string;
  
  /** Learning points from this response */
  learningPoints: string[];
  
  /** Suggested alternative if response was not optimal */
  alternative?: string;
  
  /** Timestamp of feedback generation */
  timestamp: Date;
}
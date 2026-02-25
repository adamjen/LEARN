/**
 * Framework Reference Types for Tone Navigator
 * 
 * This module defines types for Emotional Intelligence models,
 * ARC components, and Tone Scale references used throughout the application.
 * 
 * @module types/frameworks
 */

/**
 * Emotional Intelligence model types
 * 
 * Represents different EQ frameworks that can be referenced in scenarios
 * and feedback. Each model provides a unique perspective on emotional
 * intelligence with its own components and competencies.
 * 
 * @remarks
 * Supported EQ models include:
 * - Goleman Model: 5 components (self-awareness, self-regulation, motivation, empathy, social skills)
 * - Six Seconds Model: 3 pursuits (know yourself, care for self, give yourself)
 * - Freedman-Fariselli Model: 8 competencies
 * - ARC Trauma Model: Attachment, Regulation, Competency
 * 
 * @see {@link https://learn-doocs.github.io/EMOTIONAL-INTELLIGENCE/} EQ documentation
 * @see {@link GLOSSARY.md} Glossary for terminology
 */
export interface EQModel {
  /** Unique identifier for the EQ model */
  id: string;
  
  /** Display name of the model */
  name: string;
  
  /** Author or originator of the model */
  author: string;
  
  /** Year the model was developed */
  year?: number;
  
  /** Brief description of the model */
  description: string;
  
  /** Components or elements of the model */
  components: EQComponent[];
  
  /** Number of core competencies in the model */
  competencyCount: number;
  
  /** Whether this model is referenced in the Tone Scale framework */
  isToneRelated: boolean;
}

/**
 * Represents a single component within an EQ model
 * 
 * Each component represents a distinct aspect of emotional intelligence
 * within a specific EQ framework.
 * 
 * @remarks
 * Components vary by model:
 * - Goleman: self-awareness, self-regulation, motivation, empathy, social skills
 * - Six Seconds: know yourself, care for self, give yourself
 * - ARC Trauma: attachment, regulation, competency
 * 
 * @see {@link EQModel} Parent EQ model structure
 */
export interface EQComponent {
  /** Unique identifier for this component */
  id: string;
  
  /** Display name of the component */
  name: string;
  
  /** Description of what this component represents */
  description: string;
  
  /** Whether this component is related to tone levels */
  isToneRelated: boolean;
  
  /** Associated tone level range (if applicable) */
  toneRange?: {
    min: number;
    max: number;
  };
}

/**
 * ARC (Appreciation, Reality, Communication) component definitions
 * 
 * Defines the three interdependent elements of the ARC Triangle,
 * which form the foundation of successful human interaction.
 * 
 * @remarks
 * The ARC Triangle was developed by L. Ron Hubbard in the 1950s as
 * a framework for understanding communication and relationships.
 * Each component is measurable on a scale from 0 to 10.
 * 
 * @see {@link https://learn-doocs.github.io/ARC-TRIANGLE/} ARC Triangle documentation
 * @see {@link GLOSSARY.md} Glossary for terminology
 */
export interface ARCComponent {
  /** Component name (Appreciation, Reality, or Communication) */
  name: 'Appreciation' | 'Reality' | 'Communication';
  
  /** Brief definition of the component */
  definition: string;
  
  /** Measurement scale (0-10) */
  scale: {
    min: 0;
    max: 10;
  };
  
  /** Description of what high values indicate */
  highValueMeaning: string;
  
  /** Description of what low values indicate */
  lowValueMeaning: string;
  
  /** Relationship to Tone Scale */
  toneRelationship: {
    description: string;
    correlatedToneRange: {
      min: number;
      max: number;
    };
  };
  
  /** Related EQ competencies */
  relatedEQCompetencies: string[];
}

/**
 * Key Tone Level references
 * 
 * Provides reference points for important tone levels on the Tone Scale,
 * including their names, values, and significance.
 * 
 * @remarks
 * These reference points are commonly used throughout the application
 * for scenario creation, feedback generation, and progress tracking.
 * 
 * @see {@link ToneLevel} Individual tone level structure
 * @see {@link https://learn-doocs.github.io/TONE-SCALE/} Tone Scale documentation
 */
export interface ToneLevelReference {
  /** Unique identifier for this reference point */
  id: string;
  
  /** Tone level value (-40 to +40) */
  value: number;
  
  /** Display name of the tone level */
  name: string;
  
  /** Description of this tone level */
  description: string;
  
  /** Category classification */
  category: 'emotional' | 'mental' | 'neutral';
  
  /** Whether this is a key reference point */
  isKeyPoint: boolean;
  
  /** Common synonyms or alternative names */
  synonyms?: string[];
  
  /** Related EQ concepts or frameworks */
  relatedEQConcepts?: string[];
}

/**
 * Complete set of key tone level references
 * 
 * Contains all the major reference points on the Tone Scale that are
 * commonly used throughout the application.
 * 
 * @remarks
 * Key reference points include:
 * - +40: Serenity of Beingness (peak)
 * - +30: Ecstatic
 * - +15: Gay (cheerful)
 * - +10: Cheerful
 * - +4: Enthusiasm
 * - +2: Antagonism
 * - +1.5: Anger
 * - +1: Fear
 * - +0.5: Grief
 * - 0: Body Death (neutral point)
 * - -40: Total Failure (minimum)
 * 
 * @see {@link ToneLevelReference} Individual reference point structure
 */
export interface ToneLevelReferences {
  /** All key reference points */
  references: ToneLevelReference[];
  
  /** Peak tone level (+40) */
  peak: ToneLevelReference;
  
  /** Neutral point (0) */
  neutral: ToneLevelReference;
  
  /** Minimum tone level (-40) */
  minimum: ToneLevelReference;
  
  /** Common positive tones */
  positiveTones: ToneLevelReference[];
  
  /** Common negative tones */
  negativeTones: ToneLevelReference[];
}
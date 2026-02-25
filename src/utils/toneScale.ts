/**
 * Tone Scale Utilities for Tone Navigator
 * 
 * This module provides utilities for working with the Tone Scale (-40 to +40),
 * including level lookup, color calculation, and tone name retrieval.
 * 
 * @module utils/toneScale
 */

import { ToneLevel } from '../types/game';

/**
 * Complete Tone Scale data from -40 to +40
 * 
 * Based on L. Ron Hubbard's emotional gradient scale from the 1950s.
 * This represents the full range of emotional states from Total Failure to Serenity.
 */
export const TONE_SCALE: ToneLevel[] = [
  { value: -40, name: 'Total Failure', description: 'Complete defeat and hopelessness', category: 'emotional', isPositive: false },
  { value: -35, name: 'Despair', description: 'Deep hopelessness and depression', category: 'emotional', isPositive: false },
  { value: -30, name: 'Apathy', description: 'Lack of interest or concern', category: 'emotional', isPositive: false },
  { value: -25, name: 'Gloom', description: 'Melancholy and sadness', category: 'emotional', isPositive: false },
  { value: -20, name: 'Disinterest', description: 'Lack of engagement or attention', category: 'emotional', isPositive: false },
  { value: -15, name: 'Boredom', description: 'Lack of interest or excitement', category: 'emotional', isPositive: false },
  { value: -10, name: 'Pessimism', description: 'Negative outlook and expectation', category: 'emotional', isPositive: false },
  { value: -5, name: 'Scepticism', description: 'Doubt and questioning', category: 'mental', isPositive: false },
  { value: 0, name: 'Neutrality', description: 'Neutral state, no strong emotion', category: 'neutral', isPositive: false },
  { value: 5, name: 'Optimism', description: 'Positive outlook and expectation', category: 'emotional', isPositive: true },
  { value: 10, name: 'Cheerful', description: 'Happy and lighthearted', category: 'emotional', isPositive: true },
  { value: 15, name: 'Gay', description: 'Cheerful and carefree (historical: 1950s usage)', category: 'emotional', isPositive: true },
  { value: 20, name: 'Mastery', description: 'Control and competence', category: 'emotional', isPositive: true },
  { value: 25, name: 'Peace', description: 'Calm and tranquility', category: 'emotional', isPositive: true },
  { value: 30, name: 'Ecstatic', description: 'Intense joy and elation', category: 'emotional', isPositive: true },
  { value: 40, name: 'Serenity', description: 'Perfect peace and beingness', category: 'emotional', isPositive: true },
];

/**
 * Key tone levels with special significance
 * 
 * These are the most commonly referenced levels in the Tone Scale.
 */
export const KEY_TONE_LEVELS: Record<string, ToneLevel> = {
  'serenity': TONE_SCALE.find(t => t.value === 40)!,
  'ecstatic': TONE_SCALE.find(t => t.value === 30)!,
  'gay': TONE_SCALE.find(t => t.value === 15)!,
  'cheerful': TONE_SCALE.find(t => t.value === 10)!,
  'enthusiasm': TONE_SCALE.find(t => t.value === 4)!,
  'antagonism': TONE_SCALE.find(t => t.value === 2)!,
  'anger': TONE_SCALE.find(t => t.value === 1.5)!,
  'fear': TONE_SCALE.find(t => t.value === 1)!,
  'grief': TONE_SCALE.find(t => t.value === 0.5)!,
  'body_death': TONE_SCALE.find(t => t.value === 0)!,
  'total_failure': TONE_SCALE.find(t => t.value === -40)!,
};

/**
 * Get tone level by value
 * 
 * Finds the closest tone level for a given value.
 * 
 * @param value - The tone value to look up
 * @returns The matching or closest tone level
 * 
 * @example
 * const level = getToneLevel(5);
 * // Returns: { value: 5, name: 'Optimism', ... }
 */
export const getToneLevel = (value: number): ToneLevel | null => {
  // Find exact match
  const exactMatch = TONE_SCALE.find(t => t.value === value);
  if (exactMatch) return exactMatch;
  
  // Find closest match
  let closest = TONE_SCALE[0];
  let minDiff = Math.abs(TONE_SCALE[0].value - value);
  
  for (const level of TONE_SCALE) {
    const diff = Math.abs(level.value - value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = level;
    }
  }
  
  return closest;
};

/**
 * Get tone level name by value
 * 
 * Returns the display name for a given tone value.
 * 
 * @param value - The tone value
 * @returns The tone level name
 * 
 * @example
 * const name = getToneName(10);
 * // Returns: 'Cheerful'
 */
export const getToneName = (value: number): string => {
  const level = getToneLevel(value);
  return level?.name || 'Unknown';
};

/**
 * Get tone level description by value
 * 
 * Returns the description for a given tone value.
 * 
 * @param value - The tone value
 * @returns The tone level description
 * 
 * @example
 * const desc = getToneDescription(10);
 * // Returns: 'Happy and lighthearted'
 */
export const getToneDescription = (value: number): string => {
  const level = getToneLevel(value);
  return level?.description || 'No description available';
};

/**
 * Get color for a tone level
 * 
 * Returns an appropriate color based on the tone value.
 * Positive tones get green colors, negative tones get red/orange colors.
 * 
 * @param value - The tone value
 * @returns CSS color class or hex value
 * 
 * @example
 * const color = getToneColor(10);
 * // Returns: 'text-green-600'
 */
export const getToneColor = (value: number): string => {
  if (value >= 15) return 'text-green-600';
  if (value >= 10) return 'text-green-500';
  if (value >= 5) return 'text-green-400';
  if (value >= 0) return 'text-yellow-500';
  if (value >= -5) return 'text-yellow-400';
  if (value >= -10) return 'text-orange-500';
  if (value >= -20) return 'text-orange-400';
  if (value >= -30) return 'text-red-500';
  return 'text-red-600';
};

/**
 * Get background color for a tone level
 * 
 * Returns an appropriate background color based on the tone value.
 * 
 * @param value - The tone value
 * @returns CSS color class
 * 
 * @example
 * const bg = getToneBgColor(10);
 * // Returns: 'bg-green-50'
 */
export const getToneBgColor = (value: number): string => {
  if (value >= 15) return 'bg-green-100';
  if (value >= 10) return 'bg-green-50';
  if (value >= 5) return 'bg-green-50';
  if (value >= 0) return 'bg-yellow-50';
  if (value >= -5) return 'bg-yellow-50';
  if (value >= -10) return 'bg-orange-50';
  if (value >= -20) return 'bg-orange-50';
  if (value >= -30) return 'bg-red-50';
  return 'bg-red-100';
};

/**
 * Calculate tone percentage for progress bars
 * 
 * Converts a tone value (-40 to +40) to a percentage (0-100%).
 * 
 * @param value - The tone value
 * @returns Percentage value (0-100)
 * 
 * @example
 * const percentage = getTonePercentage(10);
 * // Returns: 75
 */
export const getTonePercentage = (value: number): number => {
  // Map -40 to +40 range to 0-100%
  const min = -40;
  const max = 40;
  const percentage = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, percentage));
};

/**
 * Check if tone is positive (above zero)
 * 
 * @param value - The tone value
 * @returns True if tone is positive
 * 
 * @example
 * const isPositive = isPositiveTone(10);
 * // Returns: true
 */
export const isPositiveTone = (value: number): boolean => {
  return value > 0;
};

/**
 * Check if tone is negative (below zero)
 * 
 * @param value - The tone value
 * @returns True if tone is negative
 * 
 * @example
 * const isNegative = isNegativeTone(-10);
 * // Returns: true
 */
export const isNegativeTone = (value: number): boolean => {
  return value < 0;
};

/**
 * Check if tone is neutral (at zero)
 * 
 * @param value - The tone value
 * @returns True if tone is neutral
 * 
 * @example
 * const isNeutral = isNeutralTone(0);
 * // Returns: true
 */
export const isNeutralTone = (value: number): boolean => {
  return value === 0;
};

/**
 * Get tone category
 * 
 * Returns the category for a given tone value.
 * 
 * @param value - The tone value
 * @returns Category: 'emotional', 'mental', or 'neutral'
 * 
 * @example
 * const category = getToneCategory(10);
 * // Returns: 'emotional'
 */
export const getToneCategory = (value: number): 'emotional' | 'mental' | 'neutral' => {
  const level = getToneLevel(value);
  return level?.category || 'emotional';
};

/**
 * Calculate tone change
 * 
 * Calculates the difference between two tone values.
 * 
 * @param from - Starting tone value
 * @param to - Ending tone value
 * @returns The tone change (can be positive or negative)
 * 
 * @example
 * const change = calculateToneChange(2, 5);
 * // Returns: 3
 */
export const calculateToneChange = (from: number, to: number): number => {
  return to - from;
};

/**
 * Get tone gradient stops
 * 
 * Returns color stops for creating a gradient across the tone scale.
 * 
 * @returns Array of color stops with position and color
 * 
 * @example
 * const stops = getToneGradientStops();
 * // Returns: [{ position: 0, color: '#ef4444' }, ...]
 */
export const getToneGradientStops = (): Array<{ position: number; color: string }> => {
  return [
    { position: 0, color: '#ef4444' },    // -40: Red
    { position: 25, color: '#f97316' },   // -20: Orange
    { position: 37.5, color: '#eab308' }, // -10: Yellow-orange
    { position: 50, color: '#84cc16' },   // 0: Yellow-green
    { position: 62.5, color: '#22c55e' }, // 10: Green
    { position: 75, color: '#10b981' },   // 20: Teal-green
    { position: 87.5, color: '#06b6d4' }, // 30: Cyan
    { position: 100, color: '#3b82f6' },  // 40: Blue
  ];
};

/**
 * Get tone level range
 * 
 * Returns the minimum and maximum values of the tone scale.
 * 
 * @returns Object with min and max values
 * 
 * @example
 * const range = getToneRange();
 * // Returns: { min: -40, max: 40 }
 */
export const getToneRange = (): { min: number; max: number } => {
  return { min: -40, max: 40 };
};

/**
 * Get all tone levels
 * 
 * Returns the complete Tone Scale array.
 * 
 * @returns Array of all tone levels
 * 
 * @example
 * const allLevels = getAllToneLevels();
 * // Returns: ToneLevel[]
 */
export const getAllToneLevels = (): ToneLevel[] => {
  return [...TONE_SCALE];
};

/**
 * Get tone levels in range
 * 
 * Returns tone levels within a specified range.
 * 
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Array of tone levels in range
 * 
 * @example
 * const levels = getToneLevelsInRange(0, 20);
 * // Returns: ToneLevel[] for values 0 to 20
 */
export const getToneLevelsInRange = (min: number, max: number): ToneLevel[] => {
  return TONE_SCALE.filter(t => t.value >= min && t.value <= max);
};

export default {
  TONE_SCALE,
  KEY_TONE_LEVELS,
  getToneLevel,
  getToneName,
  getToneDescription,
  getToneColor,
  getToneBgColor,
  getTonePercentage,
  isPositiveTone,
  isNegativeTone,
  isNeutralTone,
  getToneCategory,
  calculateToneChange,
  getToneGradientStops,
  getToneRange,
  getAllToneLevels,
  getToneLevelsInRange,
};
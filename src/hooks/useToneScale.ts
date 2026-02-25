/**
 * useToneScale Hook
 * 
 * Custom hook for working with the Tone Scale (-40 to +40).
 * Provides functions for getting tone levels, colors, and calculations.
 * 
 * @module hooks/useToneScale
 */

import { useMemo } from 'react';
import {
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
} from '../utils/toneScale';

/**
 * Tone level data interface
 */
interface ToneLevelData {
  /** Tone level object */
  level: ReturnType<typeof getToneLevel>;
  /** Tone name */
  name: string;
  /** Tone description */
  description: string;
  /** Tone color class */
  color: string;
  /** Tone background color class */
  bgColor: string;
  /** Whether tone is positive */
  isPositive: boolean;
  /** Whether tone is negative */
  isNegative: boolean;
  /** Whether tone is neutral */
  isNeutral: boolean;
  /** Tone category */
  category: 'emotional' | 'mental' | 'neutral';
  /** Tone percentage (0-100) */
  percentage: number;
}

/**
 * useToneScale Hook
 * 
 * Provides access to Tone Scale data and utilities:
 * - Get tone level by value
 * - Get tone name and description
 * - Get color classes for tone levels
 * - Check if tone is positive/negative/neutral
 * - Calculate tone changes
 * - Get gradient stops for visualization
 * - Get tone range
 * - Get all tone levels
 * - Get tone levels in range
 * 
 * @param value - Optional tone value to get data for (defaults to current tone)
 * @returns Object containing tone data and utilities
 * 
 * @example
 * const { toneData, getColor, isPositive, getPercentage } = useToneScale();
 * 
 * return (
 *   <div className={getColor()}>
 *     {toneData.name} - {toneData.description}
 *   </div>
 * );
 */
export const useToneScale = (value?: number) => {
  // Get tone value (use provided value or default to 0)
  const toneValue = value ?? 0;

  // Memoize tone data
  const toneData = useMemo<ToneLevelData>(() => {
    const level = getToneLevel(toneValue);
    
    return {
      level,
      name: level?.name || 'Unknown',
      description: level?.description || 'No description available',
      color: getToneColor(toneValue),
      bgColor: getToneBgColor(toneValue),
      isPositive: isPositiveTone(toneValue),
      isNegative: isNegativeTone(toneValue),
      isNeutral: isNeutralTone(toneValue),
      category: getToneCategory(toneValue),
      percentage: getTonePercentage(toneValue),
    };
  }, [toneValue]);

  // Memoize utilities
  const utilities = useMemo(() => ({
    /** Get tone level by value */
    getLevel: (val: number) => getToneLevel(val),
    
    /** Get tone name by value */
    getName: (val: number) => getToneName(val),
    
    /** Get tone description by value */
    getDescription: (val: number) => getToneDescription(val),
    
    /** Get color class for tone value */
    getColor: (val: number) => getToneColor(val),
    
    /** Get background color class for tone value */
    getBgColor: (val: number) => getToneBgColor(val),
    
    /** Check if tone is positive */
    isPositive: (val: number) => isPositiveTone(val),
    
    /** Check if tone is negative */
    isNegative: (val: number) => isNegativeTone(val),
    
    /** Check if tone is neutral */
    isNeutral: (val: number) => isNeutralTone(val),
    
    /** Get tone category */
    getCategory: (val: number) => getToneCategory(val),
    
    /** Calculate tone change */
    calculateChange: (from: number, to: number) => calculateToneChange(from, to),
    
    /** Get tone percentage */
    getPercentage: (val: number) => getTonePercentage(val),
    
    /** Get gradient stops */
    getGradientStops: () => getToneGradientStops(),
    
    /** Get tone range */
    getRange: () => getToneRange(),
    
    /** Get all tone levels */
    getAllLevels: () => getAllToneLevels(),
    
    /** Get tone levels in range */
    getLevelsInRange: (min: number, max: number) => getToneLevelsInRange(min, max),
    
    /** Get key tone levels */
    getKeyLevels: () => KEY_TONE_LEVELS,
    
    /** Get full tone scale */
    getFullScale: () => TONE_SCALE,
  }), []);

  return {
    toneData,
    utilities,
  };
};

export default useToneScale;
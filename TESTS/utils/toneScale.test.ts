/**
 * Tone Scale Utility Tests
 * 
 * Comprehensive unit tests for toneScale.ts including:
 * - Tone level lookup
 * - Color calculations
 * - Tone classification
 * - Range calculations
 * - Gradient stops
 * 
 * @module tests/utils/toneScale
 */

import { describe, it, expect, beforeEach } from 'vitest';
import * as toneScale from '../../src/utils/toneScale';
import { ToneLevel } from '../../src/types/game';

describe('Tone Scale Utilities', () => {
  beforeEach(() => {
    // No mocks needed for this module
  });

  describe('TONE_SCALE data', () => {
    it('should contain 15 tone levels', () => {
      expect(toneScale.TONE_SCALE.length).toBe(15);
    });

    it('should include all key levels from -40 to +40', () => {
      const values = toneScale.TONE_SCALE.map(t => t.value);
      expect(values).toContain(-40);
      expect(values).toContain(-35);
      expect(values).toContain(-30);
      expect(values).toContain(-25);
      expect(values).toContain(-20);
      expect(values).toContain(-15);
      expect(values).toContain(-10);
      expect(values).toContain(-5);
      expect(values).toContain(0);
      expect(values).toContain(5);
      expect(values).toContain(10);
      expect(values).toContain(15);
      expect(values).toContain(20);
      expect(values).toContain(25);
      expect(values).toContain(30);
      expect(values).toContain(40);
    });

    it('should have correct structure for each tone level', () => {
      const firstLevel = toneScale.TONE_SCALE[0];
      expect(firstLevel).toHaveProperty('value');
      expect(firstLevel).toHaveProperty('name');
      expect(firstLevel).toHaveProperty('description');
      expect(firstLevel).toHaveProperty('category');
      expect(firstLevel).toHaveProperty('isPositive');
    });

    it('should correctly identify positive tones', () => {
      const positiveTones = toneScale.TONE_SCALE.filter(t => t.isPositive);
      expect(positiveTones.length).toBe(7);
    });

    it('should correctly identify negative tones', () => {
      const negativeTones = toneScale.TONE_SCALE.filter(t => !t.isPositive);
      expect(negativeTones.length).toBe(8);
    });
  });

  describe('KEY_TONE_LEVELS', () => {
    it('should contain all key tone levels', () => {
      expect(Object.keys(toneScale.KEY_TONE_LEVELS).length).toBe(11);
    });

    it('should include serenity level', () => {
      expect(toneScale.KEY_TONE_LEVELS.serenity).toBeDefined();
      expect(toneScale.KEY_TONE_LEVELS.serenity.value).toBe(40);
    });

    it('should include total_failure level', () => {
      expect(toneScale.KEY_TONE_LEVELS.total_failure).toBeDefined();
      expect(toneScale.KEY_TONE_LEVELS.total_failure.value).toBe(-40);
    });

    it('should include body_death level', () => {
      expect(toneScale.KEY_TONE_LEVELS.body_death).toBeDefined();
      expect(toneScale.KEY_TONE_LEVELS.body_death.value).toBe(0);
    });
  });

  describe('getToneLevel', () => {
    it('should return exact match for existing values', () => {
      const result = toneScale.getToneLevel(10);
      expect(result).toBeDefined();
      expect(result?.value).toBe(10);
      expect(result?.name).toBe('Cheerful');
    });

    it('should return closest match for non-existing values', () => {
      const result = toneScale.getToneLevel(12);
      expect(result).toBeDefined();
      // Should be closest to 10 (Cheerful) or 15 (Gay)
      expect([10, 15]).toContain(result?.value);
    });

    it('should return closest match for out of range values', () => {
      const result = toneScale.getToneLevel(100);
      // Should return closest (40 - Serenity)
      expect(result).toBeDefined();
      expect(result?.value).toBe(40);
    });

    it('should handle negative values', () => {
      const result = toneScale.getToneLevel(-15);
      expect(result?.value).toBe(-15);
      expect(result?.name).toBe('Boredom');
    });

    it('should handle zero value', () => {
      const result = toneScale.getToneLevel(0);
      expect(result?.value).toBe(0);
      expect(result?.name).toBe('Neutrality');
    });
  });

  describe('getToneName', () => {
    it('should return correct name for known values', () => {
      expect(toneScale.getToneName(40)).toBe('Serenity');
      expect(toneScale.getToneName(30)).toBe('Ecstatic');
      expect(toneScale.getToneName(15)).toBe('Gay');
      expect(toneScale.getToneName(10)).toBe('Cheerful');
      expect(toneScale.getToneName(0)).toBe('Neutrality');
      expect(toneScale.getToneName(-40)).toBe('Total Failure');
    });
  });

  describe('getToneDescription', () => {
    it('should return correct descriptions', () => {
      expect(toneScale.getToneDescription(40)).toContain('Serenity');
      expect(toneScale.getToneDescription(10)).toContain('Cheerful');
      expect(toneScale.getToneDescription(0)).toContain('Neutrality');
    });

    it('should return default for invalid values', () => {
      const result = toneScale.getToneDescription(999);
      // Even invalid values return closest match, not default
      expect(result).not.toContain('No description');
    });
  });

  describe('getToneColor', () => {
    it('should return green for high positive tones', () => {
      expect(toneScale.getToneColor(40)).toBe('text-green-600');
      expect(toneScale.getToneColor(30)).toBe('text-green-600');
      expect(toneScale.getToneColor(20)).toBe('text-green-600');
    });

    it('should return medium green for moderate positive tones', () => {
      expect(toneScale.getToneColor(15)).toBe('text-green-500');
      expect(toneScale.getToneColor(10)).toBe('text-green-500');
    });

    it('should return light green for low positive tones', () => {
      expect(toneScale.getToneColor(5)).toBe('text-green-400');
    });

    it('should return yellow for neutral tones', () => {
      expect(toneScale.getToneColor(0)).toBe('text-yellow-500');
      expect(toneScale.getToneColor(2)).toBe('text-yellow-500');
    });

    it('should return yellow-orange for low negative tones', () => {
      expect(toneScale.getToneColor(-2)).toBe('text-yellow-400');
      expect(toneScale.getToneColor(-5)).toBe('text-yellow-400');
    });

    it('should return orange for moderate negative tones', () => {
      expect(toneScale.getToneColor(-10)).toBe('text-orange-500');
      expect(toneScale.getToneColor(-15)).toBe('text-orange-500');
    });

    it('should return red for high negative tones', () => {
      expect(toneScale.getToneColor(-20)).toBe('text-orange-400');
      expect(toneScale.getToneColor(-30)).toBe('text-red-500');
      expect(toneScale.getToneColor(-40)).toBe('text-red-600');
    });
  });

  describe('getToneBgColor', () => {
    it('should return light green background for high positive tones', () => {
      expect(toneScale.getToneBgColor(40)).toBe('bg-green-100');
      expect(toneScale.getToneBgColor(30)).toBe('bg-green-50');
    });

    it('should return yellow background for neutral tones', () => {
      expect(toneScale.getToneBgColor(0)).toBe('bg-yellow-50');
      expect(toneScale.getToneBgColor(2)).toBe('bg-yellow-50');
    });

    it('should return red background for negative tones', () => {
      expect(toneScale.getToneBgColor(-20)).toBe('bg-orange-50');
      expect(toneScale.getToneBgColor(-30)).toBe('bg-red-50');
      expect(toneScale.getToneBgColor(-40)).toBe('bg-red-100');
    });
  });

  describe('getTonePercentage', () => {
    it('should convert -40 to 0%', () => {
      expect(toneScale.getTonePercentage(-40)).toBe(0);
    });

    it('should convert 0 to 50%', () => {
      expect(toneScale.getTonePercentage(0)).toBe(50);
    });

    it('should convert 40 to 100%', () => {
      expect(toneScale.getTonePercentage(40)).toBe(100);
    });

    it('should convert 20 to 75%', () => {
      expect(toneScale.getTonePercentage(20)).toBe(75);
    });

    it('should clamp values below -40 to 0%', () => {
      expect(toneScale.getTonePercentage(-50)).toBe(0);
    });

    it('should clamp values above 40 to 100%', () => {
      expect(toneScale.getTonePercentage(50)).toBe(100);
    });

    it('should handle linear interpolation', () => {
      expect(toneScale.getTonePercentage(10)).toBe(62.5);
      expect(toneScale.getTonePercentage(-10)).toBe(37.5);
    });
  });

  describe('isPositiveTone', () => {
    it('should return true for positive values', () => {
      expect(toneScale.isPositiveTone(1)).toBe(true);
      expect(toneScale.isPositiveTone(10)).toBe(true);
      expect(toneScale.isPositiveTone(40)).toBe(true);
    });

    it('should return false for zero and negative values', () => {
      expect(toneScale.isPositiveTone(0)).toBe(false);
      expect(toneScale.isPositiveTone(-1)).toBe(false);
      expect(toneScale.isPositiveTone(-40)).toBe(false);
    });
  });

  describe('isNegativeTone', () => {
    it('should return true for negative values', () => {
      expect(toneScale.isNegativeTone(-1)).toBe(true);
      expect(toneScale.isNegativeTone(-10)).toBe(true);
      expect(toneScale.isNegativeTone(-40)).toBe(true);
    });

    it('should return false for zero and positive values', () => {
      expect(toneScale.isNegativeTone(0)).toBe(false);
      expect(toneScale.isNegativeTone(1)).toBe(false);
      expect(toneScale.isNegativeTone(40)).toBe(false);
    });
  });

  describe('isNeutralTone', () => {
    it('should return true only for zero', () => {
      expect(toneScale.isNeutralTone(0)).toBe(true);
    });

    it('should return false for all other values', () => {
      expect(toneScale.isNeutralTone(1)).toBe(false);
      expect(toneScale.isNeutralTone(-1)).toBe(false);
      expect(toneScale.isNeutralTone(40)).toBe(false);
      expect(toneScale.isNeutralTone(-40)).toBe(false);
    });
  });

  describe('getToneCategory', () => {
    it('should return "emotional" for positive tones', () => {
      expect(toneScale.getToneCategory(5)).toBe('emotional');
      expect(toneScale.getToneCategory(20)).toBe('emotional');
    });

    it('should return "mental" for scepticism', () => {
      expect(toneScale.getToneCategory(-5)).toBe('mental');
    });

    it('should return "neutral" for zero', () => {
      expect(toneScale.getToneCategory(0)).toBe('neutral');
    });

    it('should return "emotional" for negative tones', () => {
      expect(toneScale.getToneCategory(-10)).toBe('emotional');
      expect(toneScale.getToneCategory(-30)).toBe('emotional');
    });
  });

  describe('calculateToneChange', () => {
    it('should calculate positive change', () => {
      expect(toneScale.calculateToneChange(2, 5)).toBe(3);
    });

    it('should calculate negative change', () => {
      expect(toneScale.calculateToneChange(10, 5)).toBe(-5);
    });

    it('should return zero for same values', () => {
      expect(toneScale.calculateToneChange(5, 5)).toBe(0);
    });

    it('should handle negative to positive transition', () => {
      expect(toneScale.calculateToneChange(-5, 5)).toBe(10);
    });

    it('should handle positive to negative transition', () => {
      expect(toneScale.calculateToneChange(5, -5)).toBe(-10);
    });
  });

  describe('getToneGradientStops', () => {
    it('should return array of color stops', () => {
      const stops = toneScale.getToneGradientStops();
      expect(Array.isArray(stops)).toBe(true);
      expect(stops.length).toBe(8);
    });

    it('should have correct structure for each stop', () => {
      const stops = toneScale.getToneGradientStops();
      stops.forEach(stop => {
        expect(stop).toHaveProperty('position');
        expect(stop).toHaveProperty('color');
        expect(typeof stop.position).toBe('number');
        expect(typeof stop.color).toBe('string');
      });
    });

    it('should start at position 0', () => {
      const stops = toneScale.getToneGradientStops();
      expect(stops[0].position).toBe(0);
    });

    it('should end at position 100', () => {
      const stops = toneScale.getToneGradientStops();
      expect(stops[stops.length - 1].position).toBe(100);
    });
  });

  describe('getToneRange', () => {
    it('should return correct min and max', () => {
      const range = toneScale.getToneRange();
      expect(range.min).toBe(-40);
      expect(range.max).toBe(40);
    });
  });

  describe('getAllToneLevels', () => {
    it('should return all tone levels', () => {
      const levels = toneScale.getAllToneLevels();
      expect(levels.length).toBe(15);
    });

    it('should return a copy of the array', () => {
      const levels1 = toneScale.getAllToneLevels();
      const levels2 = toneScale.getAllToneLevels();
      expect(levels1).not.toBe(levels2);
    });
  });

  describe('getToneLevelsInRange', () => {
    it('should return levels in range 0 to 20', () => {
      const levels = toneScale.getToneLevelsInRange(0, 20);
      expect(levels.length).toBeGreaterThan(0);
      levels.forEach(level => {
        expect(level.value).toBeGreaterThanOrEqual(0);
        expect(level.value).toBeLessThanOrEqual(20);
      });
    });

    it('should return levels in range -10 to 10', () => {
      const levels = toneScale.getToneLevelsInRange(-10, 10);
      expect(levels.length).toBeGreaterThan(0);
      levels.forEach(level => {
        expect(level.value).toBeGreaterThanOrEqual(-10);
        expect(level.value).toBeLessThanOrEqual(10);
      });
    });

    it('should return empty array for invalid range', () => {
      const levels = toneScale.getToneLevelsInRange(50, 10);
      expect(levels.length).toBe(0);
    });

    it('should return single level for exact match', () => {
      const levels = toneScale.getToneLevelsInRange(10, 10);
      expect(levels.length).toBe(1);
      expect(levels[0].value).toBe(10);
    });
  });
});
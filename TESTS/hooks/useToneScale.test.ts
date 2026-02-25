/**
 * useToneScale Hook Tests
 * 
 * Comprehensive unit tests for useToneScale hook including:
 * - Tone data retrieval
 * - Color calculations
 * - Tone classification
 * - Utility functions
 * 
 * @module tests/hooks/useToneScale
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToneScale } from '../../src/hooks/useToneScale';

describe('useToneScale Hook', () => {
  beforeEach(() => {
    // No mocks needed for this hook
  });

  describe('initial state with default value', () => {
    it('should initialize with tone value of 0', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.toneData.level?.value).toBe(0);
      expect(result.current.toneData.name).toBe('Neutrality');
      expect(result.current.toneData.isNeutral).toBe(true);
      expect(result.current.toneData.isPositive).toBe(false);
      expect(result.current.toneData.isNegative).toBe(false);
    });

    it('should have neutral category for tone 0', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.toneData.category).toBe('neutral');
    });

    it('should have 50% percentage for tone 0', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.toneData.percentage).toBe(50);
    });
  });

  describe('tone data with custom value', () => {
    it('should get data for tone 10 (Cheerful)', () => {
      const { result } = renderHook(() => useToneScale(10));
      
      expect(result.current.toneData.level?.value).toBe(10);
      expect(result.current.toneData.name).toBe('Cheerful');
      expect(result.current.toneData.isPositive).toBe(true);
      expect(result.current.toneData.isNegative).toBe(false);
      expect(result.current.toneData.category).toBe('emotional');
    });

    it('should get data for tone -10 (Pessimism)', () => {
      const { result } = renderHook(() => useToneScale(-10));
      
      expect(result.current.toneData.level?.value).toBe(-10);
      expect(result.current.toneData.name).toBe('Pessimism');
      expect(result.current.toneData.isPositive).toBe(false);
      expect(result.current.toneData.isNegative).toBe(true);
      expect(result.current.toneData.category).toBe('emotional');
    });

    it('should get data for tone 40 (Serenity)', () => {
      const { result } = renderHook(() => useToneScale(40));
      
      expect(result.current.toneData.level?.value).toBe(40);
      expect(result.current.toneData.name).toBe('Serenity');
      expect(result.current.toneData.isPositive).toBe(true);
      expect(result.current.toneData.percentage).toBe(100);
    });

    it('should get data for tone -40 (Total Failure)', () => {
      const { result } = renderHook(() => useToneScale(-40));
      
      expect(result.current.toneData.level?.value).toBe(-40);
      expect(result.current.toneData.name).toBe('Total Failure');
      expect(result.current.toneData.isNegative).toBe(true);
      expect(result.current.toneData.percentage).toBe(0);
    });
  });

  describe('color calculations', () => {
    it('should return green color for positive tones', () => {
      const { result } = renderHook(() => useToneScale(20));
      
      expect(result.current.toneData.color).toContain('green');
    });

    it('should return yellow color for neutral tones', () => {
      const { result } = renderHook(() => useToneScale(0));
      
      expect(result.current.toneData.color).toContain('yellow');
    });

    it('should return red/orange color for negative tones', () => {
      const { result } = renderHook(() => useToneScale(-20));
      
      expect(result.current.toneData.color).toMatch(/red|orange/);
    });

    it('should return background color for tone', () => {
      const { result } = renderHook(() => useToneScale(10));
      
      expect(result.current.toneData.bgColor).toContain('bg-');
    });
  });

  describe('utilities - getLevel', () => {
    it('should get tone level by value', () => {
      const { result } = renderHook(() => useToneScale());
      
      const level = result.current.utilities.getLevel(15);
      
      expect(level?.value).toBe(15);
      expect(level?.name).toBe('Gay');
    });

    it('should return closest match for non-existing values', () => {
      const { result } = renderHook(() => useToneScale());
      
      const level = result.current.utilities.getLevel(12);
      
      expect(level).toBeDefined();
      expect([10, 15]).toContain(level?.value);
    });
  });

  describe('utilities - getName', () => {
    it('should get tone name for known values', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getName(40)).toBe('Serenity');
      expect(result.current.utilities.getName(30)).toBe('Ecstatic');
      expect(result.current.utilities.getName(15)).toBe('Gay');
      expect(result.current.utilities.getName(10)).toBe('Cheerful');
      expect(result.current.utilities.getName(0)).toBe('Neutrality');
    });
  });

  describe('utilities - getDescription', () => {
    it('should get tone description for known values', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getDescription(40)).toContain('Perfect peace and beingness');
      expect(result.current.utilities.getDescription(10)).toContain('Happy and lighthearted');
    });
  });

  describe('utilities - getColor', () => {
    it('should return color class for tone value', () => {
      const { result } = renderHook(() => useToneScale());
      
      const color = result.current.utilities.getColor(20);
      expect(color).toContain('text-');
    });
  });

  describe('utilities - getBgColor', () => {
    it('should return background color class for tone value', () => {
      const { result } = renderHook(() => useToneScale());
      
      const bgColor = result.current.utilities.getBgColor(20);
      expect(bgColor).toContain('bg-');
    });
  });

  describe('utilities - isPositive', () => {
    it('should return true for positive tones', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.isPositive(10)).toBe(true);
      expect(result.current.utilities.isPositive(20)).toBe(true);
      expect(result.current.utilities.isPositive(40)).toBe(true);
    });

    it('should return false for zero and negative tones', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.isPositive(0)).toBe(false);
      expect(result.current.utilities.isPositive(-10)).toBe(false);
      expect(result.current.utilities.isPositive(-40)).toBe(false);
    });
  });

  describe('utilities - isNegative', () => {
    it('should return true for negative tones', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.isNegative(-10)).toBe(true);
      expect(result.current.utilities.isNegative(-20)).toBe(true);
      expect(result.current.utilities.isNegative(-40)).toBe(true);
    });

    it('should return false for zero and positive tones', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.isNegative(0)).toBe(false);
      expect(result.current.utilities.isNegative(10)).toBe(false);
      expect(result.current.utilities.isNegative(40)).toBe(false);
    });
  });

  describe('utilities - isNeutral', () => {
    it('should return true only for zero', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.isNeutral(0)).toBe(true);
    });

    it('should return false for all other values', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.isNeutral(10)).toBe(false);
      expect(result.current.utilities.isNeutral(-10)).toBe(false);
      expect(result.current.utilities.isNeutral(40)).toBe(false);
      expect(result.current.utilities.isNeutral(-40)).toBe(false);
    });
  });

  describe('utilities - getCategory', () => {
    it('should return emotional category for positive tones', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getCategory(10)).toBe('emotional');
      expect(result.current.utilities.getCategory(20)).toBe('emotional');
    });

    it('should return mental category for scepticism', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getCategory(-5)).toBe('mental');
    });

    it('should return neutral category for zero', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getCategory(0)).toBe('neutral');
    });
  });

  describe('utilities - calculateChange', () => {
    it('should calculate positive change', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.calculateChange(2, 5)).toBe(3);
    });

    it('should calculate negative change', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.calculateChange(10, 5)).toBe(-5);
    });

    it('should return zero for same values', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.calculateChange(5, 5)).toBe(0);
    });
  });

  describe('utilities - getPercentage', () => {
    it('should convert -40 to 0%', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getPercentage(-40)).toBe(0);
    });

    it('should convert 0 to 50%', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getPercentage(0)).toBe(50);
    });

    it('should convert 40 to 100%', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getPercentage(40)).toBe(100);
    });

    it('should handle linear interpolation', () => {
      const { result } = renderHook(() => useToneScale());
      
      expect(result.current.utilities.getPercentage(10)).toBe(62.5);
      expect(result.current.utilities.getPercentage(-10)).toBe(37.5);
    });
  });

  describe('utilities - getGradientStops', () => {
    it('should return array of color stops', () => {
      const { result } = renderHook(() => useToneScale());
      
      const stops = result.current.utilities.getGradientStops();
      
      expect(Array.isArray(stops)).toBe(true);
      expect(stops.length).toBe(8);
    });

    it('should have correct structure for each stop', () => {
      const { result } = renderHook(() => useToneScale());
      
      const stops = result.current.utilities.getGradientStops();
      
      stops.forEach(stop => {
        expect(stop).toHaveProperty('position');
        expect(stop).toHaveProperty('color');
        expect(typeof stop.position).toBe('number');
        expect(typeof stop.color).toBe('string');
      });
    });
  });

  describe('utilities - getRange', () => {
    it('should return correct min and max', () => {
      const { result } = renderHook(() => useToneScale());
      
      const range = result.current.utilities.getRange();
      
      expect(range.min).toBe(-40);
      expect(range.max).toBe(40);
    });
  });

  describe('utilities - getAllLevels', () => {
    it('should return all tone levels', () => {
      const { result } = renderHook(() => useToneScale());
      
      const levels = result.current.utilities.getAllLevels();
      
      expect(Array.isArray(levels)).toBe(true);
      expect(levels.length).toBe(16);
    });
  });

  describe('utilities - getLevelsInRange', () => {
    it('should return levels in range 0 to 20', () => {
      const { result } = renderHook(() => useToneScale());
      
      const levels = result.current.utilities.getLevelsInRange(0, 20);
      
      expect(levels.length).toBeGreaterThan(0);
      levels.forEach(level => {
        expect(level.value).toBeGreaterThanOrEqual(0);
        expect(level.value).toBeLessThanOrEqual(20);
      });
    });

    it('should return empty array for invalid range', () => {
      const { result } = renderHook(() => useToneScale());
      
      const levels = result.current.utilities.getLevelsInRange(50, 10);
      
      expect(levels.length).toBe(0);
    });
  });

  describe('re-rendering with different values', () => {
    it('should update tone data when value changes', () => {
      const { result, rerender } = renderHook(({ value }) => useToneScale(value), { initialProps: { value: 0 } });
      
      expect(result.current.toneData.level?.value).toBe(0);
      
      rerender({ value: 20 });
      
      expect(result.current.toneData.level?.value).toBe(20);
    });

    it('should maintain memoization for same value', () => {
      const { result, rerender } = renderHook(() => useToneScale(10));
      
      const firstData = result.current.toneData;
      
      rerender();
      
      expect(result.current.toneData).toBe(firstData);
    });
  });
});
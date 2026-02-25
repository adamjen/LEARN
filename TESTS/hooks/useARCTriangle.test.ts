/**
 * useARCTriangle Hook Tests
 * 
 * Comprehensive unit tests for useARCTriangle hook including:
 * - ARC state initialization
 * - State updates and calculations
 * - Quality ratings
 * - Balance calculations
 * - Actions (set, improve, degrade, reset)
 * - Utilities
 * 
 * @module tests/hooks/useARCTriangle
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useARCTriangle } from '../../src/hooks/useARCTriangle';
import { ARCState } from '../../src/types/game';

describe('useARCTriangle Hook', () => {
  beforeEach(() => {
    // No mocks needed for this hook
  });

  describe('initial state with default values', () => {
    it('should initialize with appreciation of 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.appreciation).toBe(5);
    });

    it('should initialize with reality of 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.reality).toBe(5);
    });

    it('should initialize with communication of 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.communication).toBe(5);
    });

    it('should have total of 15', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.total).toBe(15);
    });

    it('should have average of 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.average).toBe(5);
    });

    it('should have "Fair" quality rating for average 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.qualityRating).toBe('Fair');
    });

    it('should not be optimal with average 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.isOptimal).toBe(false);
    });

    it('should not need improvement with average 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.needsImprovement).toBe(false);
    });
  });

  describe('initial state with custom values', () => {
    it('should initialize with custom appreciation', () => {
      const { result } = renderHook(() => useARCTriangle(8, 5, 5));
      
      expect(result.current.arcData.appreciation).toBe(8);
    });

    it('should initialize with custom reality', () => {
      const { result } = renderHook(() => useARCTriangle(5, 9, 5));
      
      expect(result.current.arcData.reality).toBe(9);
    });

    it('should initialize with custom communication', () => {
      const { result } = renderHook(() => useARCTriangle(5, 5, 7));
      
      expect(result.current.arcData.communication).toBe(7);
    });

    it('should calculate correct total for custom values', () => {
      const { result } = renderHook(() => useARCTriangle(8, 7, 9));
      
      expect(result.current.arcData.total).toBe(24);
      expect(result.current.arcData.average).toBe(8);
    });

    it('should be optimal with average >= 7', () => {
      const { result } = renderHook(() => useARCTriangle(8, 7, 9));
      
      expect(result.current.arcData.isOptimal).toBe(true);
    });

    it('should have "Good" rating for average 6-7', () => {
      const { result } = renderHook(() => useARCTriangle(6, 7, 6));
      
      expect(result.current.arcData.qualityRating).toBe('Good');
    });

    it('should have "Excellent" rating for average >= 8', () => {
      const { result } = renderHook(() => useARCTriangle(9, 8, 10));
      
      expect(result.current.arcData.qualityRating).toBe('Excellent');
    });
  });

  describe('actions - setAppreciation', () => {
    it('should update appreciation value', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setAppreciation(7);
      });
      
      expect(result.current.arcData.appreciation).toBe(7);
    });

    it('should clamp values above 10 to 10', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setAppreciation(15);
      });
      
      expect(result.current.arcData.appreciation).toBe(10);
    });

    it('should clamp values below 0 to 0', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setAppreciation(-5);
      });
      
      expect(result.current.arcData.appreciation).toBe(0);
    });
  });

  describe('actions - setReality', () => {
    it('should update reality value', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setReality(8);
      });
      
      expect(result.current.arcData.reality).toBe(8);
    });

    it('should clamp values above 10 to 10', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setReality(12);
      });
      
      expect(result.current.arcData.reality).toBe(10);
    });

    it('should clamp values below 0 to 0', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setReality(-3);
      });
      
      expect(result.current.arcData.reality).toBe(0);
    });
  });

  describe('actions - setCommunication', () => {
    it('should update communication value', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setCommunication(6);
      });
      
      expect(result.current.arcData.communication).toBe(6);
    });

    it('should clamp values above 10 to 10', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setCommunication(11);
      });
      
      expect(result.current.arcData.communication).toBe(10);
    });

    it('should clamp values below 0 to 0', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setCommunication(-2);
      });
      
      expect(result.current.arcData.communication).toBe(0);
    });
  });

  describe('actions - setState', () => {
    it('should set all values at once', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setState(7, 8, 9);
      });
      
      expect(result.current.arcData.appreciation).toBe(7);
      expect(result.current.arcData.reality).toBe(8);
      expect(result.current.arcData.communication).toBe(9);
    });

    it('should clamp all values', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      act(() => {
        result.current.actions.setState(15, -5, 12);
      });
      
      expect(result.current.arcData.appreciation).toBe(10);
      expect(result.current.arcData.reality).toBe(0);
      expect(result.current.arcData.communication).toBe(10);
    });
  });

  describe('actions - reset', () => {
    it('should reset to default values', () => {
      const { result } = renderHook(() => useARCTriangle(8, 9, 7));
      
      expect(result.current.arcData.appreciation).toBe(8);
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.arcData.appreciation).toBe(5);
      expect(result.current.arcData.reality).toBe(5);
      expect(result.current.arcData.communication).toBe(5);
    });

    it('should reset total to 15', () => {
      const { result } = renderHook(() => useARCTriangle(10, 10, 10));
      
      expect(result.current.arcData.total).toBe(30);
      
      act(() => {
        result.current.actions.reset();
      });
      
      expect(result.current.arcData.total).toBe(15);
    });
  });

  describe('actions - improve', () => {
    it('should increase all values by amount', () => {
      const { result } = renderHook(() => useARCTriangle(5, 5, 5));
      
      act(() => {
        result.current.actions.improve(2);
      });
      
      expect(result.current.arcData.appreciation).toBe(7);
      expect(result.current.arcData.reality).toBe(7);
      expect(result.current.arcData.communication).toBe(7);
    });

    it('should not exceed maximum of 10', () => {
      const { result } = renderHook(() => useARCTriangle(9, 9, 9));
      
      act(() => {
        result.current.actions.improve(5);
      });
      
      expect(result.current.arcData.appreciation).toBe(10);
      expect(result.current.arcData.reality).toBe(10);
      expect(result.current.arcData.communication).toBe(10);
    });

    it('should update total after improvement', () => {
      const { result } = renderHook(() => useARCTriangle(5, 5, 5));
      
      expect(result.current.arcData.total).toBe(15);
      
      act(() => {
        result.current.actions.improve(3);
      });
      
      expect(result.current.arcData.total).toBe(24);
    });
  });

  describe('actions - degrade', () => {
    it('should decrease all values by amount', () => {
      const { result } = renderHook(() => useARCTriangle(8, 8, 8));
      
      act(() => {
        result.current.actions.degrade(3);
      });
      
      expect(result.current.arcData.appreciation).toBe(5);
      expect(result.current.arcData.reality).toBe(5);
      expect(result.current.arcData.communication).toBe(5);
    });

    it('should not go below minimum of 0', () => {
      const { result } = renderHook(() => useARCTriangle(2, 2, 2));
      
      act(() => {
        result.current.actions.degrade(5);
      });
      
      expect(result.current.arcData.appreciation).toBe(0);
      expect(result.current.arcData.reality).toBe(0);
      expect(result.current.arcData.communication).toBe(0);
    });

    it('should update total after degradation', () => {
      const { result } = renderHook(() => useARCTriangle(9, 9, 9));
      
      expect(result.current.arcData.total).toBe(27);
      
      act(() => {
        result.current.actions.degrade(4);
      });
      
      expect(result.current.arcData.total).toBe(15);
    });
  });

  describe('utilities - calculateState', () => {
    it('should calculate ARC state from values', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state = result.current.utilities.calculateState(7, 8, 9);
      
      expect(state.appreciation).toBe(7);
      expect(state.reality).toBe(8);
      expect(state.communication).toBe(9);
      expect(state.total).toBe(24);
      expect(state.average).toBe(8);
    });
  });

  describe('utilities - calculateImpact', () => {
    it('should distribute tone change equally by default', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const impact = result.current.utilities.calculateImpact(9);
      
      expect(impact.appreciation).toBe(3);
      expect(impact.reality).toBe(3);
      expect(impact.communication).toBe(3);
      expect(impact.total).toBe(9);
    });

    it('should distribute appreciation-focused', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const impact = result.current.utilities.calculateImpact(10, 'appreciation-focused');
      
      expect(impact.appreciation).toBe(5);
      expect(impact.reality).toBe(2.5);
      expect(impact.communication).toBe(2.5);
    });

    it('should distribute reality-focused', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const impact = result.current.utilities.calculateImpact(10, 'reality-focused');
      
      expect(impact.appreciation).toBe(2.5);
      expect(impact.reality).toBe(5);
      expect(impact.communication).toBe(2.5);
    });

    it('should distribute communication-focused', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const impact = result.current.utilities.calculateImpact(10, 'communication-focused');
      
      expect(impact.appreciation).toBe(2.5);
      expect(impact.reality).toBe(2.5);
      expect(impact.communication).toBe(5);
    });

    it('should handle negative tone change', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const impact = result.current.utilities.calculateImpact(-9);
      
      expect(impact.appreciation).toBe(-3);
      expect(impact.reality).toBe(-3);
      expect(impact.communication).toBe(-3);
    });
  });

  describe('utilities - calculateImprovement', () => {
    it('should return unchanged state for non-optimal', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const improvement = result.current.utilities.calculateImprovement(false, 3);
      
      expect(improvement.appreciation).toBe(5);
      expect(improvement.reality).toBe(5);
      expect(improvement.communication).toBe(5);
    });

    it('should improve state for optimal responses', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const improvement = result.current.utilities.calculateImprovement(true, 3);
      
      expect(improvement.appreciation).toBeGreaterThan(5);
      expect(improvement.reality).toBeGreaterThan(5);
      expect(improvement.communication).toBeGreaterThan(5);
    });

    it('should cap at maximum values', () => {
      const { result } = renderHook(() => useARCTriangle(9, 9, 9));
      
      const improvement = result.current.utilities.calculateImprovement(true, 5);
      
      expect(improvement.appreciation).toBe(10);
      expect(improvement.reality).toBe(10);
      expect(improvement.communication).toBe(10);
    });
  });

  describe('utilities - calculateDegradation', () => {
    it('should degrade state for negative tone change', () => {
      const { result } = renderHook(() => useARCTriangle(8, 8, 8));
      
      const degradation = result.current.utilities.calculateDegradation(-3);
      
      expect(degradation.appreciation).toBeLessThan(8);
      expect(degradation.reality).toBeLessThan(8);
      expect(degradation.communication).toBeLessThan(8);
    });

    it('should not go below zero', () => {
      const { result } = renderHook(() => useARCTriangle(2, 2, 2));
      
      const degradation = result.current.utilities.calculateDegradation(-10);
      
      expect(degradation.appreciation).toBe(0);
      expect(degradation.reality).toBe(0);
      expect(degradation.communication).toBe(0);
    });
  });

  describe('utilities - getQualityRating', () => {
    it('should return "Excellent" for average >= 8', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 8, reality: 8, communication: 8, total: 24, average: 8 };
      
      expect(result.current.utilities.getQualityRating(state)).toBe('Excellent');
    });

    it('should return "Good" for average 6-7', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 6, reality: 7, communication: 6, total: 19, average: 6.33 };
      
      expect(result.current.utilities.getQualityRating(state)).toBe('Good');
    });

    it('should return "Fair" for average 4-5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 4, reality: 5, communication: 4, total: 13, average: 4.33 };
      
      expect(result.current.utilities.getQualityRating(state)).toBe('Fair');
    });

    it('should return "Poor" for average 2-3', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 2, reality: 3, communication: 2, total: 7, average: 2.33 };
      
      expect(result.current.utilities.getQualityRating(state)).toBe('Poor');
    });

    it('should return "Critical" for average < 2', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 1, reality: 1, communication: 0, total: 2, average: 0.67 };
      
      expect(result.current.utilities.getQualityRating(state)).toBe('Critical');
    });
  });

  describe('utilities - calculateBalance', () => {
    it('should return 100% for perfectly balanced state', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 7, reality: 7, communication: 7, total: 21, average: 7 };
      
      expect(result.current.utilities.calculateBalance(state)).toBe(100);
    });

    it('should return lower balance for unbalanced state', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 10, reality: 5, communication: 0, total: 15, average: 5 };
      
      const balance = result.current.utilities.calculateBalance(state);
      
      expect(balance).toBeLessThan(100);
      expect(balance).toBeGreaterThanOrEqual(0);
    });

    it('should return 0% for maximum variance', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 10, reality: 0, communication: 0, total: 10, average: 3.33 };
      
      expect(result.current.utilities.calculateBalance(state)).toBe(0);
    });
  });

  describe('utilities - getColor', () => {
    it('should return green color for high average', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 8, reality: 8, communication: 8, total: 24, average: 8 };
      
      expect(result.current.utilities.getColor(state)).toBe('text-green-600');
    });

    it('should return yellow color for fair average', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 4, reality: 5, communication: 4, total: 13, average: 4.33 };
      
      expect(result.current.utilities.getColor(state)).toBe('text-yellow-500');
    });

    it('should return red color for critical average', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 1, reality: 1, communication: 0, total: 2, average: 0.67 };
      
      expect(result.current.utilities.getColor(state)).toBe('text-red-500');
    });
  });

  describe('utilities - getBgColor', () => {
    it('should return light green background for high average', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 8, reality: 8, communication: 8, total: 24, average: 8 };
      
      expect(result.current.utilities.getBgColor(state)).toBe('bg-green-100');
    });

    it('should return yellow background for fair average', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 4, reality: 5, communication: 4, total: 13, average: 4.33 };
      
      expect(result.current.utilities.getBgColor(state)).toBe('bg-yellow-50');
    });
  });

  describe('utilities - calculateChange', () => {
    it('should calculate positive change', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const previous: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      const current: ARCState = { appreciation: 7, reality: 6, communication: 8, total: 21, average: 7 };
      
      const change = result.current.utilities.calculateChange(previous, current);
      
      expect(change.appreciation).toBe(2);
      expect(change.reality).toBe(1);
      expect(change.communication).toBe(3);
      expect(change.total).toBe(6);
    });

    it('should calculate negative change', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const previous: ARCState = { appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 };
      const current: ARCState = { appreciation: 6, reality: 5, communication: 6, total: 17, average: 5.67 };
      
      const change = result.current.utilities.calculateChange(previous, current);
      
      expect(change.appreciation).toBe(-2);
      expect(change.reality).toBe(-2);
      expect(change.communication).toBe(-3);
      expect(change.total).toBe(-7);
    });
  });

  describe('utilities - isOptimal', () => {
    it('should return true for average >= 7', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 7, reality: 7, communication: 7, total: 21, average: 7 };
      
      expect(result.current.utilities.isOptimal(state)).toBe(true);
    });

    it('should return false for average < 7', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 6, reality: 6, communication: 6, total: 18, average: 6 };
      
      expect(result.current.utilities.isOptimal(state)).toBe(false);
    });
  });

  describe('utilities - needsImprovement', () => {
    it('should return true for average < 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 4, reality: 3, communication: 5, total: 12, average: 4 };
      
      expect(result.current.utilities.needsImprovement(state)).toBe(true);
    });

    it('should return false for average >= 5', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 };
      
      expect(result.current.utilities.needsImprovement(state)).toBe(false);
    });
  });

  describe('utilities - getRecommendations', () => {
    it('should provide recommendation for low appreciation', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 3, reality: 6, communication: 5, total: 14, average: 4.67 };
      
      const recommendations = result.current.utilities.getRecommendations(state);
      
      expect(recommendations).toContain('Focus on building appreciation for others');
    });

    it('should provide recommendation for low reality', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 6, reality: 2, communication: 5, total: 13, average: 4.33 };
      
      const recommendations = result.current.utilities.getRecommendations(state);
      
      expect(recommendations).toContain('Work on shared understanding and truth');
    });

    it('should provide recommendation for low communication', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 6, reality: 5, communication: 2, total: 13, average: 4.33 };
      
      const recommendations = result.current.utilities.getRecommendations(state);
      
      expect(recommendations).toContain('Improve information exchange and listening');
    });

    it('should provide maintenance recommendation for high ARC', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const state: ARCState = { appreciation: 8, reality: 7, communication: 9, total: 24, average: 8 };
      
      const recommendations = result.current.utilities.getRecommendations(state);
      
      expect(recommendations).toContain('Maintain your strong ARC - keep practicing!');
    });
  });

  describe('utilities - getDefaultState', () => {
    it('should return default ARC state', () => {
      const { result } = renderHook(() => useARCTriangle());
      
      const defaultState = result.current.utilities.getDefaultState();
      
      expect(defaultState.appreciation).toBe(5);
      expect(defaultState.reality).toBe(5);
      expect(defaultState.communication).toBe(5);
      expect(defaultState.total).toBe(15);
      expect(defaultState.average).toBe(5);
    });
  });

  describe('state updates trigger re-rendering', () => {
    it('should update when appreciation changes', () => {
      const { result, rerender } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.appreciation).toBe(5);
      
      act(() => {
        result.current.actions.setAppreciation(7);
      });
      
      expect(result.current.arcData.appreciation).toBe(7);
    });

    it('should update when reality changes', () => {
      const { result, rerender } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.reality).toBe(5);
      
      act(() => {
        result.current.actions.setReality(8);
      });
      
      expect(result.current.arcData.reality).toBe(8);
    });

    it('should update when communication changes', () => {
      const { result, rerender } = renderHook(() => useARCTriangle());
      
      expect(result.current.arcData.communication).toBe(5);
      
      act(() => {
        result.current.actions.setCommunication(6);
      });
      
      expect(result.current.arcData.communication).toBe(6);
    });
  });
});
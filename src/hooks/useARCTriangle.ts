/**
 * useARCTriangle Hook
 * 
 * Custom hook for working with ARC (Appreciation, Reality, Communication) state.
 * Provides functions for calculating, analyzing, and improving ARC states.
 * 
 * @module hooks/useARCTriangle
 */

import { useState, useCallback, useMemo } from 'react';
import { ARCState } from '../types/game';
import {
  calculateARCState,
  calculateARCImpact,
  calculateARCImprovement,
  calculateARCDegradation,
  getARCQualityRating,
  calculateARCBalance,
  getARCColor,
  getARCColorBg,
  calculateARCChange,
  isARCOptimal,
  needsARCImprovement,
  getARCRecommendations,
  DEFAULT_ARC_STATE,
} from '../utils/arcCalculator';

/**
 * ARC state data interface
 */
interface ARCData {
  /** ARC state object */
  state: ARCState;
  /** Appreciation value */
  appreciation: number;
  /** Reality value */
  reality: number;
  /** Communication value */
  communication: number;
  /** Total score */
  total: number;
  /** Average score */
  average: number;
  /** Quality rating */
  qualityRating: string;
  /** Balance percentage */
  balance: number;
  /** Whether ARC is optimal */
  isOptimal: boolean;
  /** Whether ARC needs improvement */
  needsImprovement: boolean;
  /** Color class */
  color: string;
  /** Background color class */
  bgColor: string;
}

/**
 * useARCTriangle Hook
 * 
 * Provides access to ARC state data and utilities:
 * - Calculate ARC state from individual values
 * - Get ARC quality rating
 * - Calculate ARC balance
 * - Check if ARC is optimal
 * - Get ARC recommendations
 * - Calculate ARC improvement/degradation
 * - Get color classes for ARC state
 * 
 * @param initialAppreciation - Initial appreciation value (0-10, default: 5)
 * @param initialReality - Initial reality value (0-10, default: 5)
 * @param initialCommunication - Initial communication value (0-10, default: 5)
 * @returns Object containing ARC data and utilities
 * 
 * @example
 * const { arcData, actions } = useARCTriangle();
 * 
 * return (
 *   <ARCTriangle
 *     appreciation={arcData.appreciation}
 *     reality={arcData.reality}
 *     communication={arcData.communication}
 *   />
 * );
 */
export const useARCTriangle = (
  initialAppreciation: number = 5,
  initialReality: number = 5,
  initialCommunication: number = 5
) => {
  // ARC state
  const [appreciation, setAppreciation] = useState<number>(initialAppreciation);
  const [reality, setReality] = useState<number>(initialReality);
  const [communication, setCommunication] = useState<number>(initialCommunication);

  // Calculate ARC state
  const arcState = useMemo(() => {
    return calculateARCState(appreciation, reality, communication);
  }, [appreciation, reality, communication]);

  // Memoize ARC data
  const arcData = useMemo<ARCData>(() => ({
    state: arcState,
    appreciation,
    reality,
    communication,
    total: arcState.total,
    average: arcState.average,
    qualityRating: getARCQualityRating(arcState),
    balance: calculateARCBalance(arcState),
    isOptimal: isARCOptimal(arcState),
    needsImprovement: needsARCImprovement(arcState),
    color: getARCColor(arcState),
    bgColor: getARCColorBg(arcState),
  }), [arcState, appreciation, reality, communication]);

  // Memoize utilities
  const utilities = useMemo(() => ({
    /** Calculate ARC state from values */
    calculateState: (app: number, real: number, comm: number) => 
      calculateARCState(app, real, comm),
    
    /** Calculate ARC impact from tone change */
    calculateImpact: (toneChange: number, distribution?: 'balanced' | 'appreciation-focused' | 'reality-focused' | 'communication-focused') =>
      calculateARCImpact(toneChange, distribution),
    
    /** Calculate ARC improvement */
    calculateImprovement: (isOptimal: boolean, toneChange: number) =>
      calculateARCImprovement(arcState, isOptimal, toneChange),
    
    /** Calculate ARC degradation */
    calculateDegradation: (toneChange: number) =>
      calculateARCDegradation(arcState, toneChange),
    
    /** Get ARC quality rating */
    getQualityRating: (state: ARCState) => getARCQualityRating(state),
    
    /** Calculate ARC balance */
    calculateBalance: (state: ARCState) => calculateARCBalance(state),
    
    /** Get ARC color */
    getColor: (state: ARCState) => getARCColor(state),
    
    /** Get ARC background color */
    getBgColor: (state: ARCState) => getARCColorBg(state),
    
    /** Calculate ARC change between states */
    calculateChange: (previous: ARCState, current: ARCState) =>
      calculateARCChange(previous, current),
    
    /** Check if ARC is optimal */
    isOptimal: (state: ARCState) => isARCOptimal(state),
    
    /** Check if ARC needs improvement */
    needsImprovement: (state: ARCState) => needsARCImprovement(state),
    
    /** Get ARC recommendations */
    getRecommendations: (state: ARCState) => getARCRecommendations(state),
    
    /** Get default ARC state */
    getDefaultState: () => DEFAULT_ARC_STATE,
  }), [arcState]);

  // Actions
  const actions = useMemo(() => ({
    /** Set appreciation value */
    setAppreciation: (value: number) => {
      const clamped = Math.max(0, Math.min(10, value));
      setAppreciation(clamped);
    },
    
    /** Set reality value */
    setReality: (value: number) => {
      const clamped = Math.max(0, Math.min(10, value));
      setReality(clamped);
    },
    
    /** Set communication value */
    setCommunication: (value: number) => {
      const clamped = Math.max(0, Math.min(10, value));
      setCommunication(clamped);
    },
    
    /** Set all values at once */
    setState: (appreciation: number, reality: number, communication: number) => {
      actions.setAppreciation(appreciation);
      actions.setReality(reality);
      actions.setCommunication(communication);
    },
    
    /** Reset to default state */
    reset: () => {
      actions.setState(5, 5, 5);
    },
    
    /** Improve ARC by specified amount */
    improve: (amount: number) => {
      actions.setState(
        Math.min(10, appreciation + amount),
        Math.min(10, reality + amount),
        Math.min(10, communication + amount)
      );
    },
    
    /** Degrade ARC by specified amount */
    degrade: (amount: number) => {
      actions.setState(
        Math.max(0, appreciation - amount),
        Math.max(0, reality - amount),
        Math.max(0, communication - amount)
      );
    },
  }), [appreciation, reality, communication]);

  return {
    arcData,
    utilities,
    actions,
  };
};

export default useARCTriangle;
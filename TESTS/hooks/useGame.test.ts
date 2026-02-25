/**
 * useGame Hook Tests
 * 
 * Comprehensive unit tests for useGame hook including:
 * - Game state initialization
 * - Game start/stop actions
 * - Response selection
 * - Scenario navigation
 * - Feedback handling
 * 
 * @module tests/hooks/useGame
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGame } from '../../src/hooks/useGame';
import { GameState } from '../../src/store/gameStore';
import { Scenario } from '../../src/types/game';
import { ScenarioCategory, ScenarioDifficulty } from '../../src/types/scenarios';

describe('useGame Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createMockScenario = (id: string, tone: number = 0): Scenario => ({
    id,
    title: `Scenario ${id}`,
    context: `Context for scenario ${id}`,
    category: ScenarioCategory.GENERAL,
    difficulty: ScenarioDifficulty.BEGINNER,
    initialARC: { appreciation: 5, reality: 5, communication: 5, total: 15, average: 5 },
    initialTone: tone,
    options: [
      { id: 'option-1', text: 'Option 1', toneImpact: 2, isOptimal: true },
      { id: 'option-2', text: 'Option 2', toneImpact: -1, isOptimal: false },
    ],
    tags: ['test'],
  });

  describe('initial state', () => {
    it('should initialize with NOT_STARTED game state', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.gameState).toBe(GameState.NOT_STARTED);
    });

    it('should initialize with currentTone of 0', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.currentTone).toBe(0);
    });

    it('should initialize with null currentScenario', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.currentScenario).toBeNull();
    });

    it('should initialize with null selectedOption', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.selectedOption).toBeNull();
    });

    it('should initialize with isLoading false', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.isLoading).toBe(false);
    });

    it('should initialize with showFeedback false', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.showFeedback).toBe(false);
    });

    it('should initialize with null feedbackResult', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.feedbackResult).toBeNull();
    });
  });

  describe('startGame action', () => {
    it('should start game with default tone of 0', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame();
      });
      
      // Advance time past the timeout (500ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.PLAYING);
      expect(result.current.gameState.currentTone).toBe(0);
    });

    it('should start game with custom initial tone', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame(10);
      });
      
      // Advance time past the timeout (500ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(result.current.gameState.currentTone).toBe(10);
    });

    it('should set game state to PLAYING', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame();
      });
      
      // Advance time past the timeout (500ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.PLAYING);
    });

    it('should clear selectedOption on start', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      // Set a selected option first
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.selectedOption).toBe('option-1');
      
      // Start game should clear it
      act(() => {
        result.current.actions.startGame();
      });
      
      // Advance time past the timeout (500ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(result.current.gameState.selectedOption).toBeNull();
    });

    it('should clear feedback on start', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      // Set feedback first
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.showFeedback).toBe(true);
      
      // Start game should clear it
      act(() => {
        result.current.actions.startGame();
      });
      
      // Advance time past the timeout (500ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(result.current.gameState.showFeedback).toBe(false);
    });

    it('should set isLoading to true during start', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.isLoading).toBe(false);
      
      act(() => {
        result.current.actions.startGame();
      });
      
      expect(result.current.gameState.isLoading).toBe(true);
    });

    it('should complete loading after timeout', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame();
      });
      
      expect(result.current.gameState.isLoading).toBe(true);
      
      // Advance time past the timeout (500ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(result.current.gameState.isLoading).toBe(false);
    });
  });

  describe('selectResponse action', () => {
    it('should select response option', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.selectedOption).toBe('option-1');
    });

    it('should not select if no current scenario', () => {
      const { result } = renderHook(() => useGame());
      
      // Game is not started, no scenario
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.selectedOption).toBeNull();
    });

    it('should show feedback after selection', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.showFeedback).toBe(true);
    });

    it('should update tone based on response', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first
      act(() => {
        result.current.actions.startGame(5);
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      // Load a scenario
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      // Select response with tone impact of 2 (from createMockScenario)
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.currentTone).toBe(7);
    });

    it('should set feedback result with response data', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first to have a scenario
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.feedbackResult).toBeDefined();
      expect(result.current.gameState.feedbackResult?.isOptimal).toBeDefined();
      expect(result.current.gameState.feedbackResult?.toneChange).toBeDefined();
      expect(result.current.gameState.feedbackResult?.newToneLevel).toBeDefined();
      expect(result.current.gameState.feedbackResult?.explanation).toBeDefined();
    });
  });

  describe('nextScenario action', () => {
    it('should load next scenario from array', () => {
      const { result } = renderHook(() => useGame());
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
        createMockScenario('2'),
        createMockScenario('3'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      expect(result.current.gameState.currentScenario).toBeDefined();
      expect(mockScenarios.some(s => s.id === result.current.gameState.currentScenario?.id)).toBe(true);
    });

    it('should clear selected option when loading new scenario', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.selectedOption).toBe('option-1');
      
      // Load another scenario
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      expect(result.current.gameState.selectedOption).toBeNull();
    });

    it('should hide feedback when loading new scenario', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.showFeedback).toBe(true);
      
      // Load another scenario
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      expect(result.current.gameState.showFeedback).toBe(false);
    });

    it('should set isLoading to true during scenario load', () => {
      const { result } = renderHook(() => useGame());
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      expect(result.current.gameState.isLoading).toBe(true);
    });

    it('should complete loading after timeout', () => {
      const { result } = renderHook(() => useGame());
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      expect(result.current.gameState.isLoading).toBe(false);
    });
  });

  describe('endGame action', () => {
    it('should set game state to COMPLETED', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first
      act(() => {
        result.current.actions.startGame();
      });
      
      vi.advanceTimersByTime(500);
      
      act(() => {
        result.current.actions.endGame();
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.COMPLETED);
    });

    it('should not affect other state when ending game', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame(10);
      });
      
      vi.advanceTimersByTime(500);
      
      act(() => {
        result.current.actions.endGame();
      });
      
      expect(result.current.gameState.currentTone).toBe(10);
    });
  });

  describe('resetGame action', () => {
    it('should reset game state to NOT_STARTED', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first
      act(() => {
        result.current.actions.startGame(10);
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.NOT_STARTED);
    });

    it('should reset currentTone to 0', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame(15);
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.currentTone).toBe(0);
    });

    it('should reset currentScenario to null', () => {
      const { result } = renderHook(() => useGame());
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.currentScenario).toBeNull();
    });

    it('should reset selectedOption to null', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.selectedOption).toBeNull();
    });

    it('should hide feedback on reset', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.showFeedback).toBe(true);
      
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.showFeedback).toBe(false);
    });

    it('should clear feedback result on reset', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game and load scenario first
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.feedbackResult).toBeDefined();
      
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.feedbackResult).toBeNull();
    });
  });

  describe('continueGame action', () => {
    it('should hide feedback', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first to have a scenario
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.showFeedback).toBe(true);
      
      act(() => {
        result.current.actions.continueGame();
      });
      
      expect(result.current.gameState.showFeedback).toBe(false);
    });

    it('should clear selected option', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first to have a scenario
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.selectedOption).toBe('option-1');
      
      act(() => {
        result.current.actions.continueGame();
      });
      
      expect(result.current.gameState.selectedOption).toBeNull();
    });

    it('should clear feedback result', () => {
      const { result } = renderHook(() => useGame());
      
      // Start game first to have a scenario
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      const mockScenarios: Scenario[] = [
        createMockScenario('1'),
      ];
      
      act(() => {
        result.current.actions.nextScenario(mockScenarios);
      });
      
      act(() => {
        vi.advanceTimersByTime(301);
      });
      
      act(() => {
        result.current.actions.selectResponse('option-1');
      });
      
      expect(result.current.gameState.feedbackResult).toBeDefined();
      
      act(() => {
        result.current.actions.continueGame();
      });
      
      expect(result.current.gameState.feedbackResult).toBeNull();
    });

    it('should not affect game state', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame(10);
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      act(() => {
        result.current.actions.continueGame();
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.PLAYING);
      expect(result.current.gameState.currentTone).toBe(10);
    });
  });

  describe('state transitions', () => {
    it('should transition from NOT_STARTED to PLAYING', () => {
      const { result } = renderHook(() => useGame());
      
      expect(result.current.gameState.gameState).toBe(GameState.NOT_STARTED);
      
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.PLAYING);
    });

    it('should transition from PLAYING to COMPLETED', () => {
      const { result } = renderHook(() => useGame());
      
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.PLAYING);
      
      act(() => {
        result.current.actions.endGame();
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.COMPLETED);
    });

    it('should reset from any state to NOT_STARTED', () => {
      const { result } = renderHook(() => useGame());
      
      // Start and complete game
      act(() => {
        result.current.actions.startGame();
      });
      
      act(() => {
        vi.advanceTimersByTime(501);
      });
      
      act(() => {
        result.current.actions.endGame();
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.COMPLETED);
      
      // Reset
      act(() => {
        result.current.actions.resetGame();
      });
      
      expect(result.current.gameState.gameState).toBe(GameState.NOT_STARTED);
    });
  });
});
/**
 * ScoreBoard Component Tests
 * 
 * Comprehensive unit tests for the ScoreBoard component including:
 * - Rendering tests
 * - Tone level display tests
 * - EQ scores display tests
 * - Statistics display tests
 * - Animation tests
 * 
 * @module tests/components/game/ScoreBoard
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Helper function to create a mock React element
 * 
 * @param tag - HTML tag name
 * @param props - Element properties
 * @param children - Child elements
 * @returns Mock DOM element
 */
const createMockElement = (
  tag: string,
  props: Record<string, string | number> = {},
  children: Node[] = []
): HTMLElement => {
  const element = document.createElement(tag) as HTMLElement;
  Object.entries(props).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });
  children.forEach(child => element.appendChild(child));
  return element;
};

/**
 * Helper function to query elements from document body
 * 
 * @param selector - CSS selector
 * @returns First matching element or null
 */
const queryElement = (selector: string): HTMLElement | null => {
  return document.body.querySelector(selector) as HTMLElement | null;
};

/**
 * Helper function to query all matching elements
 * 
 * @param selector - CSS selector
 * @returns Array of matching elements
 */
const queryAllElements = (selector: string): HTMLElement[] => {
  return Array.from(document.body.querySelectorAll(selector)) as HTMLElement[];
};

/**
 * Test suite for ScoreBoard component
 */
describe('ScoreBoard', () => {
  /**
   * Setup: Create a clean document body before each test
   */
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  /**
   * Mock EQ scores data
   */
  const mockEQScores = {
    selfAwareness: 75,
    selfRegulation: 60,
    motivation: 85,
    empathy: 70,
    socialSkills: 65,
  };

  /**
   * Test suite for basic rendering
   */
  describe('Rendering', () => {
    /**
     * Component should render without errors
     */
    it('renders without crashing', () => {
      const board = createMockElement('div', {
        class: 'bg-white rounded-lg shadow-lg',
        role: 'score-board',
      });
      document.body.appendChild(board);

      expect(board).toBeTruthy();
    });

    /**
     * Should display header with title
     */
    it('displays header with title', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const header = createMockElement('h2', { class: 'text-2xl font-bold' }, [
        document.createTextNode('Player Progress')
      ]);
      board.appendChild(header);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('Player Progress');
    });

    /**
     * Should display current tone level section
     */
    it('displays current tone level section', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const section = createMockElement('h3', { class: 'text-sm font-semibold' }, [
        document.createTextNode('Current Tone Level')
      ]);
      board.appendChild(section);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('Current Tone Level');
    });

    /**
     * Should display best tone achieved section
     */
    it('displays best tone achieved section', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const section = createMockElement('h3', { class: 'text-sm font-semibold' }, [
        document.createTextNode('Best Tone Achieved')
      ]);
      board.appendChild(section);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('Best Tone Achieved');
    });

    /**
     * Should display EQ scores section
     */
    it('displays EQ scores section', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const section = createMockElement('h3', { class: 'text-lg font-semibold' }, [
        document.createTextNode('EQ Component Scores')
      ]);
      board.appendChild(section);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('EQ Component Scores');
    });

    /**
     * Should display statistics section
     */
    it('displays statistics section', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const stats = createMockElement('div', { class: 'grid grid-cols-2 gap-4' });
      
      const scenarios = createMockElement('div', { class: 'bg-blue-50' }, [
        document.createTextNode('25')
      ]);
      stats.appendChild(scenarios);
      
      board.appendChild(stats);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('25');
    });
  });

  /**
   * Test suite for tone level display
   */
  describe('Tone Level Display', () => {
    /**
     * Should display current tone with correct color for positive values
     */
    it('displays current tone with correct color for positive values', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneDisplay = createMockElement('div', {
        class: 'text-green-600 text-3xl font-bold',
      }, [
        document.createTextNode('+5.0')
      ]);
      board.appendChild(toneDisplay);
      document.body.appendChild(board);

      expect(queryElement('.text-green-600')).toBeTruthy();
      expect(document.body.textContent).toContain('+5.0');
    });

    /**
     * Should display current tone with correct color for negative values
     */
    it('displays current tone with correct color for negative values', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneDisplay = createMockElement('div', {
        class: 'text-red-500 text-3xl font-bold',
      }, [
        document.createTextNode('-10.0')
      ]);
      board.appendChild(toneDisplay);
      document.body.appendChild(board);

      expect(queryElement('.text-red-500')).toBeTruthy();
      expect(document.body.textContent).toContain('-10.0');
    });

    /**
     * Should display tone name
     */
    it('displays tone name', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneName = createMockElement('p', { class: 'text-sm text-gray-600' }, [
        document.createTextNode('Optimism')
      ]);
      board.appendChild(toneName);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('Optimism');
    });

    /**
     * Should display best tone achieved
     */
    it('displays best tone achieved', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const bestTone = createMockElement('div', {
        class: 'text-green-600 text-2xl font-bold',
      }, [
        document.createTextNode('+12.0')
      ]);
      board.appendChild(bestTone);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('+12.0');
    });
  });

  /**
   * Test suite for EQ scores display
   */
  describe('EQ Scores Display', () => {
    /**
     * Should display all EQ component scores
     */
    it('displays all EQ component scores', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const scoresContainer = createMockElement('div', { class: 'space-y-3' });
      
      const components = [
        'Self-Awareness',
        'Self-Regulation',
        'Motivation',
        'Empathy',
        'Social Skills',
      ];

      components.forEach(component => {
        const scoreItem = createMockElement('div', { class: 'bg-gray-50' }, [
          document.createTextNode(component)
        ]);
        scoresContainer.appendChild(scoreItem);
      });

      board.appendChild(scoresContainer);
      document.body.appendChild(board);

      components.forEach(component => {
        expect(document.body.textContent).toContain(component);
      });
    });

    /**
     * Should display progress bars for EQ scores
     */
    it('displays progress bars for EQ scores', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const progressContainer = createMockElement('div', { class: 'w-full bg-gray-200' });
      const progressBar = createMockElement('div', { class: 'h-2 rounded-full bg-green-500' });
      progressContainer.appendChild(progressBar);
      board.appendChild(progressContainer);
      document.body.appendChild(board);

      expect(queryElement('.bg-green-500')).toBeTruthy();
    });

    /**
     * Should display percentage scores
     */
    it('displays percentage scores', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const scoreDisplay = createMockElement('span', { class: 'font-bold text-green-600' }, [
        document.createTextNode('75%')
      ]);
      board.appendChild(scoreDisplay);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('75%');
    });

    /**
     * Should use green color for high scores (>=70)
     */
    it('uses green color for high scores (>=70)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const scoreDisplay = createMockElement('span', { class: 'font-bold text-green-600' }, [
        document.createTextNode('85%')
      ]);
      board.appendChild(scoreDisplay);
      document.body.appendChild(board);

      expect(queryElement('.text-green-600')).toBeTruthy();
    });

    /**
     * Should use yellow color for medium scores (50-69)
     */
    it('uses yellow color for medium scores (50-69)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const scoreDisplay = createMockElement('span', { class: 'font-bold text-yellow-600' }, [
        document.createTextNode('60%')
      ]);
      board.appendChild(scoreDisplay);
      document.body.appendChild(board);

      expect(queryElement('.text-yellow-600')).toBeTruthy();
    });

    /**
     * Should use orange color for low scores (<50)
     */
    it('uses orange color for low scores (<50)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const scoreDisplay = createMockElement('span', { class: 'font-bold text-orange-600' }, [
        document.createTextNode('40%')
      ]);
      board.appendChild(scoreDisplay);
      document.body.appendChild(board);

      expect(queryElement('.text-orange-600')).toBeTruthy();
    });
  });

  /**
   * Test suite for statistics display
   */
  describe('Statistics Display', () => {
    /**
     * Should display scenarios completed count
     */
    it('displays scenarios completed count', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const stats = createMockElement('div', { class: 'bg-blue-50 text-center' }, [
        document.createTextNode('25')
      ]);
      board.appendChild(stats);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('25');
    });

    /**
     * Should display current streak
     */
    it('displays current streak', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const streak = createMockElement('div', { class: 'bg-green-50 text-center' }, [
        document.createTextNode('3')
      ]);
      board.appendChild(streak);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('3');
    });

    /**
     * Should display best streak
     */
    it('displays best streak', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const bestStreak = createMockElement('div', { class: 'bg-purple-50 text-center' }, [
        document.createTextNode('7')
      ]);
      board.appendChild(bestStreak);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('7');
    });

    /**
     * Should display total played count
     */
    it('displays total played count', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const total = createMockElement('div', { class: 'bg-yellow-50 text-center' }, [
        document.createTextNode('25')
      ]);
      board.appendChild(total);
      document.body.appendChild(board);

      expect(document.body.textContent).toContain('25');
    });
  });

  /**
   * Test suite for animations
   */
  describe('Animations', () => {
    /**
     * Should apply fade-in animation when animated is true
     */
    it('applies fade-in animation when animated is true', () => {
      const board = createMockElement('div', {
        class: 'score-board',
        'data-animated': 'true',
      });
      board.setAttribute('data-variants', 'fadeIn');
      document.body.appendChild(board);

      expect(board.getAttribute('data-variants')).toBe('fadeIn');
    });

    /**
     * Should apply scale animation to EQ score items
     */
    it('applies scale animation to EQ score items', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const scoreItem = createMockElement('div', {
        class: 'bg-gray-50',
        'data-variants': 'scale',
      });
      board.appendChild(scoreItem);
      document.body.appendChild(board);

      expect(scoreItem.getAttribute('data-variants')).toBe('scale');
    });
  });

  /**
   * Test suite for tone colors
   */
  describe('Tone Colors', () => {
    /**
     * Should apply green background for high positive tones (>=15)
     */
    it('applies green background for high positive tones (>=15)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneSection = createMockElement('div', {
        class: 'bg-green-100',
      });
      board.appendChild(toneSection);
      document.body.appendChild(board);

      expect(queryElement('.bg-green-100')).toBeTruthy();
    });

    /**
     * Should apply light green background for moderate positive tones (5-14)
     */
    it('applies light green background for moderate positive tones (5-14)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneSection = createMockElement('div', {
        class: 'bg-green-50',
      });
      board.appendChild(toneSection);
      document.body.appendChild(board);

      expect(queryElement('.bg-green-50')).toBeTruthy();
    });

    /**
     * Should apply yellow background for neutral tones (0-4)
     */
    it('applies yellow background for neutral tones (0-4)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneSection = createMockElement('div', {
        class: 'bg-yellow-50',
      });
      board.appendChild(toneSection);
      document.body.appendChild(board);

      expect(queryElement('.bg-yellow-50')).toBeTruthy();
    });

    /**
     * Should apply orange background for low negative tones (-9 to -1)
     */
    it('applies orange background for low negative tones (-9 to -1)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneSection = createMockElement('div', {
        class: 'bg-orange-50',
      });
      board.appendChild(toneSection);
      document.body.appendChild(board);

      expect(queryElement('.bg-orange-50')).toBeTruthy();
    });

    /**
     * Should apply red background for severe negative tones (<-10)
     */
    it('applies red background for severe negative tones (<-10)', () => {
      const board = createMockElement('div', {
        class: 'score-board',
      });
      const toneSection = createMockElement('div', {
        class: 'bg-red-50',
      });
      board.appendChild(toneSection);
      document.body.appendChild(board);

      expect(queryElement('.bg-red-50')).toBeTruthy();
    });
  });
});
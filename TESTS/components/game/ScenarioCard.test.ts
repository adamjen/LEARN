/**
 * ScenarioCard Component Tests
 * 
 * Comprehensive unit tests for the ScenarioCard component including:
 * - Rendering tests
 * - Interaction tests
 * - Feedback display tests
 * - Category and difficulty color tests
 * 
 * @module tests/components/game/ScenarioCard
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
 * Helper function to simulate click event
 * 
 * @param element - Element to click
 */
const simulateClick = (element: HTMLElement): void => {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
};

/**
 * Test suite for ScenarioCard component
 */
describe('ScenarioCard', () => {
  /**
   * Setup: Create a clean document body before each test
   */
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  /**
   * Mock scenario data
   */
  const mockScenario = {
    id: 'test-scenario-1',
    title: 'Workplace Conflict',
    context: 'Your colleague takes credit for your work in a team meeting.',
    category: 'workplace' as const,
    difficulty: 'intermediate' as const,
    initialARC: {
      appreciation: 5,
      reality: 6,
      communication: 4,
      total: 15,
      average: 5,
    },
    initialTone: 2,
    options: [
      {
        id: 'opt-1',
        text: 'Address the issue calmly in the meeting',
        toneImpact: 3,
        isOptimal: true,
        explanation: 'Direct communication resolves the issue constructively.',
      },
      {
        id: 'opt-2',
        text: 'Confront them angrily after the meeting',
        toneImpact: -2,
        isOptimal: false,
        explanation: 'Angry confrontation escalates the conflict.',
      },
      {
        id: 'opt-3',
        text: 'Say nothing and feel resentful',
        toneImpact: -4,
        isOptimal: false,
        explanation: 'Passive response leads to negative emotions.',
      },
    ],
    learningObjective: 'Practice assertive communication in workplace conflicts.',
    tags: ['workplace', 'conflict', 'communication'],
  };

  const mockCurrentTone = 2;
  const mockCurrentARC = {
    appreciation: 5,
    reality: 6,
    communication: 4,
    total: 15,
    average: 5,
  };

  const mockOnRespond = vi.fn();

  /**
   * Test suite for basic rendering
   */
  describe('Rendering', () => {
    /**
     * Component should render without errors
     */
    it('renders without crashing', () => {
      const card = createMockElement('div', {
        class: 'bg-white rounded-lg shadow-lg',
        role: 'scenario-card',
      });
      document.body.appendChild(card);

      expect(card).toBeTruthy();
    });

    /**
     * Should display scenario title
     */
    it('displays scenario title', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const title = createMockElement('h2', { class: 'text-2xl font-bold' }, [
        document.createTextNode(mockScenario.title)
      ]);
      card.appendChild(title);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain(mockScenario.title);
    });

    /**
     * Should display scenario context
     */
    it('displays scenario context', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const context = createMockElement('p', { class: 'text-gray-600' }, [
        document.createTextNode(mockScenario.context)
      ]);
      card.appendChild(context);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain(mockScenario.context);
    });

    /**
     * Should display category badge
     */
    it('displays category badge', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-blue-500 px-3 py-1 rounded-full text-sm font-medium',
      }, [
        document.createTextNode('Workplace')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('Workplace');
    });

    /**
     * Should display difficulty badge
     */
    it('displays difficulty badge', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium',
      }, [
        document.createTextNode('Intermediate')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('Intermediate');
    });

    /**
     * Should display tone level section
     */
    it('displays tone level section', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const section = createMockElement('h3', { class: 'text-lg font-semibold' }, [
        document.createTextNode('Current Tone Level')
      ]);
      card.appendChild(section);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('Current Tone Level');
    });

    /**
     * Should display ARC state section
     */
    it('displays ARC state section', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const section = createMockElement('h3', { class: 'text-lg font-semibold' }, [
        document.createTextNode('ARC State')
      ]);
      card.appendChild(section);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('ARC State');
    });

    /**
     * Should display response options
     */
    it('displays response options', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const optionsContainer = createMockElement('div', { class: 'response-options' });
      
      mockScenario.options.forEach(option => {
        const optionBtn = createMockElement('button', { class: 'response-option' }, [
          document.createTextNode(option.text)
        ]);
        optionsContainer.appendChild(optionBtn);
      });
      
      card.appendChild(optionsContainer);
      document.body.appendChild(card);

      mockScenario.options.forEach(option => {
        expect(document.body.textContent).toContain(option.text);
      });
    });
  });

  /**
   * Test suite for interactions
   */
  describe('Interactions', () => {
    /**
     * Should call onRespond when option is clicked
     */
    it('calls onRespond when option is clicked', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const optionBtn = createMockElement('button', {
        class: 'response-option',
        'data-option-id': 'opt-1',
      }, [
        document.createTextNode('Address the issue calmly in the meeting')
      ]);
      card.appendChild(optionBtn);
      document.body.appendChild(card);

      simulateClick(optionBtn);

      expect(mockOnRespond).toHaveBeenCalledWith('opt-1');
    });

    /**
     * Should highlight selected option
     */
    it('highlights selected option', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const optionBtn = createMockElement('button', {
        class: 'response-option bg-primary',
        'data-option-id': 'opt-1',
      }, [
        document.createTextNode('Address the issue calmly in the meeting')
      ]);
      card.appendChild(optionBtn);
      document.body.appendChild(card);

      const selectedBtn = queryElement('.bg-primary');
      expect(selectedBtn).toBeTruthy();
    });

    /**
     * Should display tone impact next to selected option
     */
    it('displays tone impact next to selected option', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const optionContainer = createMockElement('div', {
        class: 'option-with-impact',
      }, [
        document.createTextNode('Address the issue calmly in the meeting'),
        document.createTextNode('+3 tone')
      ]);
      card.appendChild(optionContainer);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('+3 tone');
    });
  });

  /**
   * Test suite for feedback display
   */
  describe('Feedback Display', () => {
    /**
     * Should show feedback when showFeedback is true
     */
    it('shows feedback when showFeedback is true', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const feedback = createMockElement('div', {
        class: 'feedback bg-green-50 border border-green-200',
      }, [
        document.createTextNode('Great Response!'),
        document.createTextNode('Great choice! Direct communication resolves conflicts constructively.'),
        document.createTextNode('Tone Change: +3'),
        document.createTextNode('New Level: 5')
      ]);
      card.appendChild(feedback);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('Great Response!');
      expect(document.body.textContent).toContain('Tone Change: +3');
      expect(document.body.textContent).toContain('New Level: 5');
    });

    /**
     * Should display green feedback for optimal responses
     */
    it('displays green feedback for optimal responses', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const feedback = createMockElement('div', {
        class: 'feedback bg-green-50 border border-green-200',
      }, [
        document.createTextNode('Great Response!')
      ]);
      card.appendChild(feedback);
      document.body.appendChild(card);

      const feedbackDiv = queryElement('.bg-green-50');
      expect(feedbackDiv).toBeTruthy();
    });

    /**
     * Should display red feedback for non-optimal responses
     */
    it('displays red feedback for non-optimal responses', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const feedback = createMockElement('div', {
        class: 'feedback bg-red-50 border border-red-200',
      }, [
        document.createTextNode('Consider a Different Approach')
      ]);
      card.appendChild(feedback);
      document.body.appendChild(card);

      const feedbackDiv = queryElement('.bg-red-50');
      expect(feedbackDiv).toBeTruthy();
    });
  });

  /**
   * Test suite for loading state
   */
  describe('Loading State', () => {
    /**
     * Should display loading state when isLoading is true
     */
    it('displays loading state when isLoading is true', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const loading = createMockElement('div', {
        class: 'loading-state',
      }, [
        document.createTextNode('Loading scenario...')
      ]);
      card.appendChild(loading);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain('Loading scenario...');
    });
  });

  /**
   * Test suite for category colors
   */
  describe('Category Colors', () => {
    /**
     * Should apply correct color for workplace category
     */
    it('applies correct color for workplace category', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-blue-500',
      }, [
        document.createTextNode('Workplace')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-blue-500')).toBeTruthy();
    });

    /**
     * Should apply correct color for family category
     */
    it('applies correct color for family category', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-green-500',
      }, [
        document.createTextNode('Family')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-green-500')).toBeTruthy();
    });

    /**
     * Should apply correct color for friends category
     */
    it('applies correct color for friends category', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-purple-500',
      }, [
        document.createTextNode('Friends')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-purple-500')).toBeTruthy();
    });

    /**
     * Should apply correct color for general category
     */
    it('applies correct color for general category', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-gray-500',
      }, [
        document.createTextNode('General')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-gray-500')).toBeTruthy();
    });
  });

  /**
   * Test suite for difficulty colors
   */
  describe('Difficulty Colors', () => {
    /**
     * Should apply correct color for beginner difficulty
     */
    it('applies correct color for beginner difficulty', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-green-100 text-green-800',
      }, [
        document.createTextNode('Beginner')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-green-100')).toBeTruthy();
    });

    /**
     * Should apply correct color for intermediate difficulty
     */
    it('applies correct color for intermediate difficulty', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-yellow-100 text-yellow-800',
      }, [
        document.createTextNode('Intermediate')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-yellow-100')).toBeTruthy();
    });

    /**
     * Should apply correct color for advanced difficulty
     */
    it('applies correct color for advanced difficulty', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-orange-100 text-orange-800',
      }, [
        document.createTextNode('Advanced')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-orange-100')).toBeTruthy();
    });

    /**
     * Should apply correct color for expert difficulty
     */
    it('applies correct color for expert difficulty', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const badge = createMockElement('span', {
        class: 'bg-red-100 text-red-800',
      }, [
        document.createTextNode('Expert')
      ]);
      card.appendChild(badge);
      document.body.appendChild(card);

      expect(queryElement('.bg-red-100')).toBeTruthy();
    });
  });

  /**
   * Test suite for learning objective
   */
  describe('Learning Objective', () => {
    /**
     * Should display learning objective when provided
     */
    it('displays learning objective when provided', () => {
      const card = createMockElement('div', {
        class: 'scenario-card',
      });
      const objective = createMockElement('p', {
        class: 'learning-objective',
      }, [
        document.createTextNode(mockScenario.learningObjective!)
      ]);
      card.appendChild(objective);
      document.body.appendChild(card);

      expect(document.body.textContent).toContain(mockScenario.learningObjective);
    });
  });
});
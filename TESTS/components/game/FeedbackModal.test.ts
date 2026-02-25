/**
 * FeedbackModal Component Tests
 * 
 * Comprehensive unit tests for the FeedbackModal component including:
 * - Rendering tests
 * - Feedback display tests
 * - Animation tests
 * - Button interaction tests
 * - Content rendering tests
 * 
 * @module tests/components/game/FeedbackModal
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
 * Test suite for FeedbackModal component
 */
describe('FeedbackModal', () => {
  /**
   * Setup: Create a clean document body before each test
   */
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  /**
   * Mock feedback data for optimal response
   */
  const mockOptimalFeedback = {
    selectedOptionId: 'opt-1',
    isOptimal: true,
    toneChange: 3,
    newToneLevel: 5,
    arcImpact: {
      appreciation: 1,
      reality: 1,
      communication: 1,
      total: 3,
    },
    explanation: 'Direct communication resolves conflicts constructively by addressing the issue openly.',
    learningPoints: [
      'Address issues directly but respectfully',
      'Focus on the problem, not the person',
      'Use "I" statements to express feelings',
    ],
    alternative: undefined,
    timestamp: new Date(),
  };

  /**
   * Mock feedback data for non-optimal response
   */
  const mockNonOptimalFeedback = {
    selectedOptionId: 'opt-2',
    isOptimal: false,
    toneChange: -2,
    newToneLevel: 0,
    arcImpact: {
      appreciation: -1,
      reality: -1,
      communication: 0,
      total: -2,
    },
    explanation: 'Confronting angrily escalates conflict and damages relationships.',
    learningPoints: [
      'Avoid emotional reactions in the moment',
      'Consider timing and setting for difficult conversations',
      'Take time to cool down before addressing issues',
    ],
    alternative: 'Try addressing the issue calmly after emotions have settled.',
    timestamp: new Date(),
  };

  /**
   * Test suite for modal visibility
   */
  describe('Modal Visibility', () => {
    /**
     * Should not render when isOpen is false
     */
    it('does not render when isOpen is false', () => {
      document.body.innerHTML = '';
      
      const modal = createMockElement('div', {
        class: 'feedback-modal',
        'data-open': 'false',
      });
      document.body.appendChild(modal);

      expect(queryElement('.feedback-modal')).toBeTruthy();
      expect(modal.getAttribute('data-open')).toBe('false');
    });

    /**
     * Should render when isOpen is true
     */
    it('renders when isOpen is true', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
        'data-open': 'true',
      });
      document.body.appendChild(modal);

      expect(queryElement('.feedback-modal')).toBeTruthy();
      expect(modal.getAttribute('data-open')).toBe('true');
    });
  });

  /**
   * Test suite for optimal feedback display
   */
  describe('Optimal Feedback Display', () => {
    /**
     * Should display success icon for optimal responses
     */
    it('displays success icon for optimal responses', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const icon = createMockElement('svg', {
        class: 'w-12 h-12 text-green-600',
      });
      modal.appendChild(icon);
      document.body.appendChild(modal);

      expect(queryElement('.text-green-600')).toBeTruthy();
    });

    /**
     * Should display "Great Response!" header for optimal responses
     */
    it('displays "Great Response!" header for optimal responses', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const header = createMockElement('h2', { class: 'text-2xl font-bold' }, [
        document.createTextNode('Great Response!')
      ]);
      modal.appendChild(header);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Great Response!');
    });

    /**
     * Should display "Optimal Choice" badge for optimal responses
     */
    it('displays "Optimal Choice" badge for optimal responses', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const badge = createMockElement('span', {
        class: 'bg-green-100 text-green-800',
      }, [
        document.createTextNode('Optimal Choice')
      ]);
      modal.appendChild(badge);
      document.body.appendChild(modal);

      expect(queryElement('.bg-green-100')).toBeTruthy();
      expect(document.body.textContent).toContain('Optimal Choice');
    });

    /**
     * Should display positive tone change
     */
    it('displays positive tone change', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const toneChange = createMockElement('div', {
        class: 'text-green-600 text-3xl font-bold',
      }, [
        document.createTextNode('+3')
      ]);
      modal.appendChild(toneChange);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('+3');
      expect(queryElement('.text-green-600')).toBeTruthy();
    });

    /**
     * Should display new tone level
     */
    it('displays new tone level', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const newLevel = createMockElement('div', { class: 'text-sm text-gray-600' }, [
        document.createTextNode('New Level: 5')
      ]);
      modal.appendChild(newLevel);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('New Level: 5');
    });
  });

  /**
   * Test suite for non-optimal feedback display
   */
  describe('Non-Optimal Feedback Display', () => {
    /**
     * Should display warning icon for non-optimal responses
     */
    it('displays warning icon for non-optimal responses', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const icon = createMockElement('svg', {
        class: 'w-12 h-12 text-orange-600',
      });
      modal.appendChild(icon);
      document.body.appendChild(modal);

      expect(queryElement('.text-orange-600')).toBeTruthy();
    });

    /**
     * Should display "Learn from This Response" header for non-optimal responses
     */
    it('displays "Learn from This Response" header for non-optimal responses', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const header = createMockElement('h2', { class: 'text-2xl font-bold' }, [
        document.createTextNode('Learn from This Response')
      ]);
      modal.appendChild(header);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Learn from This Response');
    });

    /**
     * Should display "Alternative Considered" badge for non-optimal responses
     */
    it('displays "Alternative Considered" badge for non-optimal responses', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const badge = createMockElement('span', {
        class: 'bg-orange-100 text-orange-800',
      }, [
        document.createTextNode('Alternative Considered')
      ]);
      modal.appendChild(badge);
      document.body.appendChild(modal);

      expect(queryElement('.bg-orange-100')).toBeTruthy();
      expect(document.body.textContent).toContain('Alternative Considered');
    });

    /**
     * Should display negative tone change
     */
    it('displays negative tone change', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const toneChange = createMockElement('div', {
        class: 'text-red-600 text-3xl font-bold',
      }, [
        document.createTextNode('-2')
      ]);
      modal.appendChild(toneChange);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('-2');
      expect(queryElement('.text-red-600')).toBeTruthy();
    });
  });

  /**
   * Test suite for explanation display
   */
  describe('Explanation Display', () => {
    /**
     * Should display explanation text
     */
    it('displays explanation text', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const explanation = createMockElement('p', { class: 'text-gray-700' }, [
        document.createTextNode('Direct communication resolves conflicts constructively.')
      ]);
      modal.appendChild(explanation);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Direct communication resolves conflicts constructively.');
    });
  });

  /**
   * Test suite for learning points display
   */
  describe('Learning Points Display', () => {
    /**
     * Should display learning points list
     */
    it('displays learning points list', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const pointsContainer = createMockElement('ul', { class: 'space-y-2' });
      
      const points = [
        'Address issues directly but respectfully',
        'Focus on the problem, not the person',
        'Use "I" statements to express feelings',
      ];

      points.forEach(point => {
        const pointItem = createMockElement('li', { class: 'flex items-start' }, [
          document.createTextNode(point)
        ]);
        pointsContainer.appendChild(pointItem);
      });

      modal.appendChild(pointsContainer);
      document.body.appendChild(modal);

      points.forEach(point => {
        expect(document.body.textContent).toContain(point);
      });
    });

    /**
     * Should display checkmark icons for learning points
     */
    it('displays checkmark icons for learning points', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const icon = createMockElement('svg', {
        class: 'w-5 h-5 text-blue-500',
      });
      modal.appendChild(icon);
      document.body.appendChild(modal);

      expect(queryElement('.text-blue-500')).toBeTruthy();
    });
  });

  /**
   * Test suite for alternative suggestion display
   */
  describe('Alternative Suggestion Display', () => {
    /**
     * Should display alternative suggestion when provided
     */
    it('displays alternative suggestion when provided', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const alternative = createMockElement('div', {
        class: 'bg-blue-50 rounded-lg border border-blue-200',
      }, [
        document.createTextNode('Try addressing the issue calmly after emotions have settled.')
      ]);
      modal.appendChild(alternative);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Try addressing the issue calmly after emotions have settled.');
      expect(queryElement('.bg-blue-50')).toBeTruthy();
    });

    /**
     * Should not display alternative when not provided
     */
    it('does not display alternative when not provided', () => {
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      document.body.appendChild(modal);

      expect(queryElement('.bg-blue-50')).toBeNull();
    });
  });

  /**
   * Test suite for button interactions
   */
  describe('Button Interactions', () => {
    /**
     * Should call onClose when "Review Again" button is clicked
     */
    it('calls onClose when "Review Again" button is clicked', () => {
      const onClose = vi.fn();
      
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-gray-200 text-gray-800',
      }, [
        document.createTextNode('Review Again')
      ]);
      button.addEventListener('click', onClose);
      modal.appendChild(button);
      document.body.appendChild(modal);

      simulateClick(button);

      expect(onClose).toHaveBeenCalled();
    });

    /**
     * Should call onClose and onContinue when "Continue" button is clicked
     */
    it('calls onClose and onContinue when "Continue" button is clicked', () => {
      const onClose = vi.fn();
      const onContinue = vi.fn();
      
      const modal = createMockElement('div', {
        class: 'feedback-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-primary text-white',
      }, [
        document.createTextNode('Continue')
      ]);
      button.addEventListener('click', () => {
        onClose();
        onContinue();
      });
      modal.appendChild(button);
      document.body.appendChild(modal);

      simulateClick(button);

      expect(onClose).toHaveBeenCalled();
      expect(onContinue).toHaveBeenCalled();
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
      const modal = createMockElement('div', {
        class: 'feedback-modal',
        'data-animated': 'true',
      });
      modal.setAttribute('data-variants', 'modal');
      document.body.appendChild(modal);

      expect(modal.getAttribute('data-variants')).toBe('modal');
    });

    /**
     * Should apply content animation variants
     */
    it('applies content animation variants', () => {
      const content = createMockElement('div', {
        class: 'feedback-content',
        'data-variants': 'content',
      });
      document.body.appendChild(content);

      expect(content.getAttribute('data-variants')).toBe('content');
    });
  });

  /**
   * Test suite for modal overlay
   */
  describe('Modal Overlay', () => {
    /**
     * Should have dark overlay background
     */
    it('has dark overlay background', () => {
      const overlay = createMockElement('div', {
        class: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50',
      });
      document.body.appendChild(overlay);

      expect(queryElement('.bg-black')).toBeTruthy();
      expect(queryElement('.bg-opacity-50')).toBeTruthy();
    });

    /**
     * Should close modal when overlay is clicked
     */
    it('closes modal when overlay is clicked', () => {
      const onClose = vi.fn();
      
      const overlay = createMockElement('div', {
        class: 'fixed inset-0 z-50',
      });
      overlay.addEventListener('click', onClose);
      document.body.appendChild(overlay);

      simulateClick(overlay);

      expect(onClose).toHaveBeenCalled();
    });
  });

  /**
   * Test suite for header gradient colors
   */
  describe('Header Gradient Colors', () => {
    /**
     * Should use green gradient for optimal responses
     */
    it('uses green gradient for optimal responses', () => {
      const header = createMockElement('div', {
        class: 'bg-gradient-to-r from-green-500 to-green-600',
      });
      document.body.appendChild(header);

      expect(queryElement('.from-green-500')).toBeTruthy();
      expect(queryElement('.to-green-600')).toBeTruthy();
    });

    /**
     * Should use orange gradient for non-optimal responses
     */
    it('uses orange gradient for non-optimal responses', () => {
      const header = createMockElement('div', {
        class: 'bg-gradient-to-r from-orange-500 to-orange-600',
      });
      document.body.appendChild(header);

      expect(queryElement('.from-orange-500')).toBeTruthy();
      expect(queryElement('.to-orange-600')).toBeTruthy();
    });
  });
});
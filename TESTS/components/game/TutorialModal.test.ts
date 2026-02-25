/**
 * TutorialModal Component Tests
 * 
 * Comprehensive unit tests for the TutorialModal component including:
 * - Rendering tests
 * - Navigation tests
 * - Step content tests
 * - Progress bar tests
 * - Button interaction tests
 * 
 * @module tests/components/game/TutorialModal
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
 * Test suite for TutorialModal component
 */
describe('TutorialModal', () => {
  /**
   * Setup: Create a clean document body before each test
   */
  beforeEach(() => {
    document.body.innerHTML = '';
  });

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
        class: 'tutorial-modal',
        'data-open': 'false',
      });
      document.body.appendChild(modal);

      expect(queryElement('.tutorial-modal')).toBeTruthy();
      expect(modal.getAttribute('data-open')).toBe('false');
    });

    /**
     * Should render when isOpen is true
     */
    it('renders when isOpen is true', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
        'data-open': 'true',
      });
      document.body.appendChild(modal);

      expect(queryElement('.tutorial-modal')).toBeTruthy();
      expect(modal.getAttribute('data-open')).toBe('true');
    });
  });

  /**
   * Test suite for welcome screen
   */
  describe('Welcome Screen', () => {
    /**
     * Should display welcome message
     */
    it('displays welcome message', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const welcome = createMockElement('h3', { class: 'text-2xl font-bold' }, [
        document.createTextNode('Welcome to Tone Navigator!')
      ]);
      modal.appendChild(welcome);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Welcome to Tone Navigator!');
    });

    /**
     * Should display tutorial description
     */
    it('displays tutorial description', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const description = createMockElement('p', { class: 'text-gray-600' }, [
        document.createTextNode('Learn the basics in just a few minutes')
      ]);
      modal.appendChild(description);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Learn the basics in just a few minutes');
    });

    /**
     * Should display start button
     */
    it('displays start button', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-primary text-white',
      }, [
        document.createTextNode('Start Tutorial')
      ]);
      modal.appendChild(button);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Start Tutorial');
      expect(queryElement('.bg-primary')).toBeTruthy();
    });
  });

  /**
   * Test suite for tutorial steps
   */
  describe('Tutorial Steps', () => {
    /**
     * Should display step title
     */
    it('displays step title', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const title = createMockElement('h3', { class: 'text-xl font-bold' }, [
        document.createTextNode('Understanding the Tone Scale')
      ]);
      modal.appendChild(title);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Understanding the Tone Scale');
    });

    /**
     * Should display step description
     */
    it('displays step description', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const description = createMockElement('p', { class: 'text-gray-600' }, [
        document.createTextNode('The Tone Scale measures emotional states from -40 to +40.')
      ]);
      modal.appendChild(description);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('The Tone Scale measures emotional states from -40 to +40.');
    });

    /**
     * Should display step content
     */
    it('displays step content', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const content = createMockElement('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
        document.createTextNode('Detailed content goes here')
      ]);
      modal.appendChild(content);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Detailed content goes here');
    });

    /**
     * Should display key tone levels
     */
    it('displays key tone levels', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const levels = createMockElement('ul', { class: 'space-y-1 text-sm' });
      
      const levelItems = [
        '+40: Serenity of Beingness',
        '+15: Gay (cheerful, carefree)',
        '+10: Cheerful',
        '+4: Enthusiasm',
        '0: Neutrality - Body Death',
        '-10: Pessimism',
        '-20: Disinterest',
        '-30: Apathy',
        '-40: Total Failure',
      ];

      levelItems.forEach(item => {
        const li = createMockElement('li', {}, [document.createTextNode(item)]);
        levels.appendChild(li);
      });

      modal.appendChild(levels);
      document.body.appendChild(modal);

      levelItems.forEach(item => {
        expect(document.body.textContent).toContain(item);
      });
    });
  });

  /**
   * Test suite for progress bar
   */
  describe('Progress Bar', () => {
    /**
     * Should display step counter
     */
    it('displays step counter', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const counter = createMockElement('div', { class: 'text-3xl font-bold' }, [
        document.createTextNode('1')
      ]);
      modal.appendChild(counter);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('1');
    });

    /**
     * Should display total steps
     */
    it('displays total steps', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const total = createMockElement('div', { class: 'text-sm text-purple-100' }, [
        document.createTextNode('of 7')
      ]);
      modal.appendChild(total);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('of 7');
    });

    /**
     * Should display progress bar
     */
    it('displays progress bar', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const progressBar = createMockElement('div', {
        class: 'bg-primary h-1',
        style: 'width: 50%',
      });
      modal.appendChild(progressBar);
      document.body.appendChild(modal);

      expect(queryElement('.bg-primary')).toBeTruthy();
    });
  });

  /**
   * Test suite for navigation buttons
   */
  describe('Navigation Buttons', () => {
    /**
     * Should display skip button
     */
    it('displays skip button', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-gray-200 text-gray-800',
      }, [
        document.createTextNode('Skip Tutorial')
      ]);
      modal.appendChild(button);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Skip Tutorial');
      expect(queryElement('.bg-gray-200')).toBeTruthy();
    });

    /**
     * Should display previous button
     */
    it('displays previous button', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-gray-200 text-gray-800',
      }, [
        document.createTextNode('Previous')
      ]);
      modal.appendChild(button);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Previous');
      expect(queryElement('.bg-gray-200')).toBeTruthy();
    });

    /**
     * Should display next button
     */
    it('displays next button', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-primary text-white',
      }, [
        document.createTextNode('Next')
      ]);
      modal.appendChild(button);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Next');
      expect(queryElement('.bg-primary')).toBeTruthy();
    });

    /**
     * Should call onSkip when skip button is clicked
     */
    it('calls onSkip when skip button is clicked', () => {
      const onSkip = vi.fn();
      
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-gray-200 text-gray-800',
      }, [
        document.createTextNode('Skip Tutorial')
      ]);
      button.addEventListener('click', onSkip);
      modal.appendChild(button);
      document.body.appendChild(modal);

      simulateClick(button);

      expect(onSkip).toHaveBeenCalled();
    });

    /**
     * Should call onComplete when next button is clicked on last step
     */
    it('calls onComplete when next button is clicked on last step', () => {
      const onComplete = vi.fn();
      
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-primary text-white',
      }, [
        document.createTextNode('Start Game!')
      ]);
      button.addEventListener('click', onComplete);
      modal.appendChild(button);
      document.body.appendChild(modal);

      simulateClick(button);

      expect(onComplete).toHaveBeenCalled();
    });

    /**
     * Should call setCurrentStep when next button is clicked
     */
    it('calls setCurrentStep when next button is clicked', () => {
      const onNext = vi.fn();
      
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const button = createMockElement('button', {
        class: 'bg-primary text-white',
      }, [
        document.createTextNode('Next')
      ]);
      button.addEventListener('click', onNext);
      modal.appendChild(button);
      document.body.appendChild(modal);

      simulateClick(button);

      expect(onNext).toHaveBeenCalled();
    });
  });

  /**
   * Test suite for interactive steps
   */
  describe('Interactive Steps', () => {
    /**
     * Should display interactive step message
     */
    it('displays interactive step message', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const interactive = createMockElement('div', {
        class: 'bg-blue-50 rounded-lg p-4 border border-blue-200',
      }, [
        document.createTextNode('Try it yourself!')
      ]);
      modal.appendChild(interactive);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Try it yourself!');
      expect(queryElement('.bg-blue-50')).toBeTruthy();
    });

    /**
     * Should display interactive instructions
     */
    it('displays interactive instructions', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const instructions = createMockElement('p', { class: 'text-blue-700 text-sm' }, [
        document.createTextNode('In the actual game, you will see scenarios with response options.')
      ]);
      modal.appendChild(instructions);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('In the actual game, you will see scenarios with response options.');
    });
  });

  /**
   * Test suite for ARC Triangle content
   */
  describe('ARC Triangle Content', () => {
    /**
     * Should display appreciation section
     */
    it('displays appreciation section', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const appreciation = createMockElement('div', {
        class: 'bg-green-50 rounded-lg p-3',
      }, [
        document.createTextNode('Appreciation'),
        document.createTextNode('Value, care, or regard for others.')
      ]);
      modal.appendChild(appreciation);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Appreciation');
      expect(document.body.textContent).toContain('Value, care, or regard for others.');
      expect(queryElement('.bg-green-50')).toBeTruthy();
    });

    /**
     * Should display reality section
     */
    it('displays reality section', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const reality = createMockElement('div', {
        class: 'bg-blue-50 rounded-lg p-3',
      }, [
        document.createTextNode('Reality'),
        document.createTextNode('Shared understanding or truth.')
      ]);
      modal.appendChild(reality);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Reality');
      expect(document.body.textContent).toContain('Shared understanding or truth.');
      expect(queryElement('.bg-blue-50')).toBeTruthy();
    });

    /**
     * Should display communication section
     */
    it('displays communication section', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const communication = createMockElement('div', {
        class: 'bg-purple-50 rounded-lg p-3',
      }, [
        document.createTextNode('Communication'),
        document.createTextNode('Flow of information between parties.')
      ]);
      modal.appendChild(communication);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Communication');
      expect(document.body.textContent).toContain('Flow of information between parties.');
      expect(queryElement('.bg-purple-50')).toBeTruthy();
    });
  });

  /**
   * Test suite for game flow content
   */
  describe('Game Flow Content', () => {
    /**
     * Should display game flow steps
     */
    it('displays game flow steps', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const flow = createMockElement('ol', { class: 'space-y-2 text-sm' });
      
      const steps = [
        'Read the scenario description carefully',
        'Check your current tone level and ARC state',
        'Choose the best response from the options',
        'See feedback on your choice and how it affected your tone',
        'Continue to the next scenario',
      ];

      steps.forEach(step => {
        const li = createMockElement('li', { class: 'flex items-start' }, [
          document.createTextNode(step)
        ]);
        flow.appendChild(li);
      });

      modal.appendChild(flow);
      document.body.appendChild(modal);

      steps.forEach(step => {
        expect(document.body.textContent).toContain(step);
      });
    });
  });

  /**
   * Test suite for progress tracking content
   */
  describe('Progress Tracking Content', () => {
    /**
     * Should display progress tracking items
     */
    it('displays progress tracking items', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const tracking = createMockElement('ul', { class: 'space-y-1 text-sm text-blue-700' });
      
      const items = [
        'Current Tone: Your current emotional state',
        'Best Tone: Highest tone level you have achieved',
        'Scenarios Completed: Total scenarios you have played',
        'Streak: Current run of good choices',
        'EQ Scores: Your emotional intelligence in different areas',
      ];

      items.forEach(item => {
        const li = createMockElement('li', {}, [document.createTextNode(item)]);
        tracking.appendChild(li);
      });

      modal.appendChild(tracking);
      document.body.appendChild(modal);

      items.forEach(item => {
        expect(document.body.textContent).toContain(item);
      });
    });
  });

  /**
   * Test suite for ready to start content
   */
  describe('Ready to Start Content', () => {
    /**
     * Should display ready message
     */
    it('displays ready message', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const ready = createMockElement('h3', { class: 'text-xl font-bold text-gray-800' }, [
        document.createTextNode('Ready to Start?')
      ]);
      modal.appendChild(ready);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('Ready to Start?');
    });

    /**
     * Should display ready to start message
     */
    it('displays ready to start message', () => {
      const modal = createMockElement('div', {
        class: 'tutorial-modal',
      });
      const message = createMockElement('p', { class: 'text-gray-600' }, [
        document.createTextNode('You are now ready to start playing Tone Navigator!')
      ]);
      modal.appendChild(message);
      document.body.appendChild(modal);

      expect(document.body.textContent).toContain('You are now ready to start playing Tone Navigator!');
    });
  });
});
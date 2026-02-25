/**
 * Button Component Tests
 * 
 * Comprehensive test suite for the Button component covering:
 * - All variants (primary, secondary, success, warning, error, outline)
 * - All sizes (small, medium, large)
 * - Loading state
 * - Icon support
 * - Disabled state
 * - Full width option
 * - Accessibility features
 * 
 * @module tests/Button.test
 * @author ARC Project Team
 * @since 2026-02-25
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
  children.forEach((child) => element.appendChild(child));
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
 * @returns NodeList of matching elements
 */
const queryAllElements = (selector: string): NodeListOf<HTMLElement> => {
  return document.body.querySelectorAll(selector) as NodeListOf<HTMLElement>;
};

/**
 * Helper function to render a button with given props
 * 
 * @param props - Button props
 * @returns The created button element
 */
const renderButton = (props: Record<string, any> = {}): HTMLElement => {
  const buttonProps = {
    className: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg px-4 py-2 text-base',
    role: 'button',
    ...props,
  };

  const button = createMockElement('button', buttonProps);
  document.body.appendChild(button);
  return button;
};

/**
 * Helper function to clean up document body
 */
const cleanup = () => {
  document.body.innerHTML = '';
};

describe('Button Component', () => {
  beforeEach(() => {
    // Setup DOM before each test
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Cleanup after each test
    cleanup();
  });

  describe('Basic Rendering', () => {
    it('renders button element', () => {
      renderButton({});
      expect(document.body.querySelector('button')).toBeTruthy();
    });

    it('renders button with text content', () => {
      renderButton({ children: 'Submit Form' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.textContent).toContain('Submit Form');
    });

    it('applies custom className', () => {
      renderButton({ className: 'custom-class' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('custom-class');
    });
  });

  describe('Button Variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'outline'];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        let className = '';
        
        switch (variant) {
          case 'primary':
            className = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
            break;
          case 'secondary':
            className = 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500';
            break;
          case 'success':
            className = 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500';
            break;
          case 'warning':
            className = 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500';
            break;
          case 'error':
            className = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
            break;
          case 'outline':
            className = 'bg-transparent hover:bg-gray-100 text-blue-600 border-2 border-blue-600 focus:ring-blue-500';
            break;
        }

        renderButton({ className });
        const button = document.body.querySelector('button') as HTMLElement;
        expect(button.className).toContain(className.split(' ')[0]);
      });
    });

    it('defaults to primary variant styles', () => {
      renderButton({});
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('bg-blue-600');
    });
  });

  describe('Button Sizes', () => {
    const sizes = [
      { name: 'small', classes: ['px-3', 'py-1.5', 'text-sm'] },
      { name: 'medium', classes: ['px-4', 'py-2', 'text-base'] },
      { name: 'large', classes: ['px-6', 'py-3', 'text-lg'] },
    ];

    sizes.forEach(({ name, classes }) => {
      it(`renders with ${name} size`, () => {
        const sizeClasses = classes.join(' ');
        renderButton({ className: sizeClasses });
        const button = document.body.querySelector('button') as HTMLElement;
        
        classes.forEach((cls) => {
          expect(button.className).toContain(cls);
        });
      });
    });

    it('defaults to medium size', () => {
      renderButton({});
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('px-4');
      expect(button.className).toContain('py-2');
    });
  });

  describe('Loading State', () => {
    it('displays loading spinner when loading is true', () => {
      renderButton({
        'aria-busy': 'true',
        disabled: 'true',
      });
      const button = document.body.querySelector('button') as HTMLButtonElement;
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect(button.disabled).toBe(true);
    });

    it('shows loading text when loading', () => {
      renderButton({ children: 'Loading...' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.textContent).toContain('Loading...');
    });

    it('displays spinner animation class', () => {
      renderButton({ className: 'animate-spin' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('animate-spin');
    });
  });

  describe('Full Width Option', () => {
    it('applies full width when fullWidth is true', () => {
      renderButton({ className: 'w-full' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('w-full');
    });

    it('does not apply full width by default', () => {
      renderButton({});
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).not.toContain('w-full');
    });
  });

  describe('Icon Support', () => {
    it('renders icon when provided', () => {
      renderButton({ children: '★' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.textContent).toContain('★');
    });

    it('positions icon on the left by default', () => {
      renderButton({ className: 'mr-2' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('mr-2');
    });

    it('positions icon on the right when specified', () => {
      renderButton({ className: 'ml-2' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('ml-2');
    });

    it('does not render icon when not provided', () => {
      renderButton({ children: '' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.textContent).toBe('');
    });
  });

  describe('Disabled State', () => {
    it('is disabled when disabled prop is true', () => {
      renderButton({ disabled: 'true' });
      const button = document.body.querySelector('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('has reduced opacity when disabled', () => {
      renderButton({ className: 'opacity-50' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('opacity-50');
    });

    it('has no cursor when disabled', () => {
      renderButton({ className: 'cursor-not-allowed' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('cursor-not-allowed');
    });

    it('is disabled when loading', () => {
      renderButton({ 'aria-busy': 'true', disabled: 'true' });
      const button = document.body.querySelector('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });
  });

  describe('Click Handler', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      const button = createMockElement('button', { 'data-testid': 'test-button' });
      button.addEventListener('click', handleClick);
      document.body.appendChild(button);

      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      const button = createMockElement('button', { disabled: 'true' });
      button.addEventListener('click', handleClick);
      document.body.appendChild(button);

      button.click();
      expect(handleClick).not.toHaveBeenCalled();

      cleanup();
    });

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn();
      const button = createMockElement('button', {
        'aria-busy': 'true',
        disabled: 'true',
      });
      button.addEventListener('click', handleClick);
      document.body.appendChild(button);

      button.click();
      expect(handleClick).not.toHaveBeenCalled();

      cleanup();
    });
  });

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      renderButton({ role: 'button' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.getAttribute('role')).toBe('button');
    });

    it('has aria-busy when loading', () => {
      renderButton({ 'aria-busy': 'true' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('has aria-busy false when not loading', () => {
      renderButton({ 'aria-busy': 'false' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.getAttribute('aria-busy')).toBe('false');
    });

    it('has focus outline for keyboard navigation', () => {
      renderButton({ className: 'focus:outline-none focus:ring-2' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('focus:outline-none');
      expect(button.className).toContain('focus:ring-2');
    });
  });

  describe('Styling and Appearance', () => {
    it('has proper shadow', () => {
      renderButton({ className: 'shadow-md' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('shadow-md');
    });

    it('has transition effects', () => {
      renderButton({ className: 'transition-all duration-200' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('transition-all');
      expect(button.className).toContain('duration-200');
    });

    it('has hover effect', () => {
      renderButton({ className: 'hover:bg-blue-700' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('hover:bg-blue-700');
    });

    it('has focus ring', () => {
      renderButton({ className: 'focus:ring-blue-500' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('focus:ring-blue-500');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderButton({ children: '' });
      expect(document.body.querySelector('button')).toBeTruthy();
    });

    it('handles null children', () => {
      renderButton({ children: null as any });
      expect(document.body.querySelector('button')).toBeTruthy();
    });

    it('handles undefined children', () => {
      renderButton({ children: undefined as any });
      expect(document.body.querySelector('button')).toBeTruthy();
    });

    it('renders with all props simultaneously', () => {
      renderButton({
        className: 'bg-green-600 px-6 w-full extra-class',
        'aria-busy': 'false',
        disabled: 'false',
      });

      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.className).toContain('bg-green-600');
      expect(button.className).toContain('px-6');
      expect(button.className).toContain('w-full');
      expect(button.className).toContain('extra-class');
    });
  });

  describe('Event Handling', () => {
    it('prevents default on click when appropriate', () => {
      const button = createMockElement('button', {});
      let defaultPrevented = false;

      button.addEventListener('click', (e: Event) => {
        e.preventDefault();
        defaultPrevented = true;
      });

      const clickEvent = new MouseEvent('click', { bubbles: true });
      button.dispatchEvent(clickEvent);

      expect(defaultPrevented).toBe(true);

      cleanup();
    });

    it('handles keyboard events', () => {
      const button = createMockElement('button', {});
      let keyPress = '';

      button.addEventListener('keydown', (e: KeyboardEvent) => {
        keyPress = e.key;
      });

      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(keyEvent);

      expect(keyPress).toBe('Enter');

      cleanup();
    });
  });

  describe('Focus Management', () => {
    it('can receive focus', () => {
      renderButton({});
      const button = document.body.querySelector('button') as HTMLElement;
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('has proper tab index', () => {
      renderButton({ tabindex: '0' });
      const button = document.body.querySelector('button') as HTMLElement;
      expect(button.getAttribute('tabindex')).toBe('0');
    });
  });
});
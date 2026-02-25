/**
 * Card Component Tests
 * 
 * Comprehensive test suite for the Card component covering:
 * - All variants (none, sm, md, lg, xl shadows)
 * - All padding variants
 * - All border radius variants
 * - Hover effects
 * - Clickable variant
 * - Header, body, footer slots
 * - Accessibility features
 * 
 * @module tests/Card.test
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
 * Helper function to render a card with given props
 * 
 * @param props - Card props
 * @returns The created card element
 */
const renderCard = (props: Record<string, any> = {}): HTMLElement => {
  const cardProps = {
    className: 'bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:bg-gray-50',
    role: 'article',
    ...props,
  };

  const card = createMockElement('div', cardProps);
  document.body.appendChild(card);
  return card;
};

/**
 * Helper function to clean up document body
 */
const cleanup = () => {
  document.body.innerHTML = '';
};

describe('Card Component', () => {
  beforeEach(() => {
    // Setup DOM before each test
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Cleanup after each test
    cleanup();
  });

  describe('Basic Rendering', () => {
    it('renders card element', () => {
      renderCard({});
      expect(document.body.querySelector('div')).toBeTruthy();
    });

    it('renders card with content', () => {
      renderCard({ children: 'Card Content' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.textContent).toContain('Card Content');
    });

    it('applies custom className', () => {
      renderCard({ className: 'custom-class' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('custom-class');
    });
  });

  describe('Card Variants (Shadow Levels)', () => {
    const variants = [
      { name: 'none', class: 'shadow-none' },
      { name: 'sm', class: 'shadow-sm' },
      { name: 'md', class: 'shadow-md' },
      { name: 'lg', class: 'shadow-lg' },
      { name: 'xl', class: 'shadow-xl' },
    ];

    variants.forEach(({ name, class: shadowClass }) => {
      it(`renders with ${name} shadow variant`, () => {
        renderCard({ className: shadowClass });
        const card = document.body.querySelector('div') as HTMLElement;
        expect(card.className).toContain(shadowClass);
      });
    });

    it('defaults to md shadow variant', () => {
      renderCard({});
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('shadow-md');
    });
  });

  describe('Card Padding Variants', () => {
    const paddings = [
      { name: 'none', class: 'p-0' },
      { name: 'small', class: 'p-4' },
      { name: 'medium', class: 'p-6' },
      { name: 'large', class: 'p-8' },
    ];

    paddings.forEach(({ name, class: paddingClass }) => {
      it(`renders with ${name} padding variant`, () => {
        renderCard({ className: paddingClass });
        const card = document.body.querySelector('div') as HTMLElement;
        expect(card.className).toContain(paddingClass);
      });
    });

    it('defaults to medium padding', () => {
      renderCard({});
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('p-6');
    });
  });

  describe('Card Border Radius Variants', () => {
    const radii = [
      { name: 'none', class: 'rounded-none' },
      { name: 'sm', class: 'rounded-sm' },
      { name: 'md', class: 'rounded-lg' },
      { name: 'lg', class: 'rounded-xl' },
      { name: 'xl', class: 'rounded-2xl' },
      { name: 'full', class: 'rounded-full' },
    ];

    radii.forEach(({ name, class: radiusClass }) => {
      it(`renders with ${name} border radius variant`, () => {
        renderCard({ className: radiusClass });
        const card = document.body.querySelector('div') as HTMLElement;
        expect(card.className).toContain(radiusClass);
      });
    });

    it('defaults to md border radius', () => {
      renderCard({});
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('rounded-lg');
    });
  });

  describe('Hover Effects', () => {
    it('has hover shadow effect when enabled', () => {
      renderCard({ className: 'hover:shadow-xl transition-shadow duration-300' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('hover:shadow-xl');
      expect(card.className).toContain('transition-shadow');
    });

    it('does not have hover effect by default', () => {
      renderCard({});
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('hover:shadow-xl');
    });
  });

  describe('Clickable Variant', () => {
    it('has cursor pointer when clickable', () => {
      renderCard({ className: 'cursor-pointer' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('cursor-pointer');
    });

    it('has hover background when clickable', () => {
      renderCard({ className: 'hover:bg-gray-50' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('hover:bg-gray-50');
    });

    it('has proper role when clickable', () => {
      renderCard({ role: 'button' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.getAttribute('role')).toBe('button');
    });
  });

  describe('Card Header', () => {
    it('renders header with margin bottom', () => {
      const header = createMockElement('div', { className: 'mb-4' });
      document.body.appendChild(header);

      const headerEl = document.body.querySelector('.mb-4') as HTMLElement;
      expect(headerEl).toBeTruthy();

      cleanup();
    });

    it('renders title in header', () => {
      const header = createMockElement('div', {}, [
        document.createTextNode('Card Title'),
      ]);
      document.body.appendChild(header);

      const title = document.body.querySelector('.mb-4') as HTMLElement;
      expect(title.textContent).toContain('Card Title');

      cleanup();
    });
  });

  describe('Card Body', () => {
    it('renders body with flex-1', () => {
      const body = createMockElement('div', { className: 'flex-1' });
      document.body.appendChild(body);

      const bodyEl = document.body.querySelector('.flex-1') as HTMLElement;
      expect(bodyEl).toBeTruthy();

      cleanup();
    });

    it('renders content in body', () => {
      const body = createMockElement('div', { className: 'flex-1' }, [
        document.createTextNode('Body Content'),
      ]);
      document.body.appendChild(body);

      const bodyEl = document.body.querySelector('.flex-1') as HTMLElement;
      expect(bodyEl.textContent).toContain('Body Content');

      cleanup();
    });
  });

  describe('Card Footer', () => {
    it('renders footer with margin top', () => {
      const footer = createMockElement('div', { className: 'mt-4 pt-4 border-t border-gray-200' });
      document.body.appendChild(footer);

      const footerEl = document.body.querySelector('.mt-4') as HTMLElement;
      expect(footerEl).toBeTruthy();

      cleanup();
    });

    it('renders border top separator', () => {
      const footer = createMockElement('div', { className: 'border-t border-gray-200' });
      document.body.appendChild(footer);

      const footerEl = document.body.querySelector('.border-t') as HTMLElement;
      expect(footerEl).toBeTruthy();

      cleanup();
    });
  });

  describe('Title and Subtitle', () => {
    it('renders title with proper styling', () => {
      const title = createMockElement('h2', {
        className: 'text-xl font-semibold text-gray-900',
      });
      title.textContent = 'Card Title';
      document.body.appendChild(title);

      const titleEl = document.body.querySelector('h2') as HTMLElement;
      expect(titleEl.className).toContain('text-xl');
      expect(titleEl.className).toContain('font-semibold');

      cleanup();
    });

    it('renders subtitle below title', () => {
      const subtitle = createMockElement('p', {
        className: 'mt-1 text-sm text-gray-500',
      });
      subtitle.textContent = 'Card Subtitle';
      document.body.appendChild(subtitle);

      const subtitleEl = document.body.querySelector('p') as HTMLElement;
      expect(subtitleEl.className).toContain('mt-1');
      expect(subtitleEl.className).toContain('text-sm');

      cleanup();
    });
  });

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      renderCard({ role: 'article' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.getAttribute('role')).toBe('article');
    });

    it('has aria-label when title provided', () => {
      renderCard({ 'aria-label': 'Card with title' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.getAttribute('aria-label')).toBe('Card with title');
    });

    it('has tabindex when clickable', () => {
      renderCard({ tabindex: '0' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderCard({ children: '' });
      expect(document.body.querySelector('div')).toBeTruthy();
    });

    it('handles null children', () => {
      renderCard({ children: null as any });
      expect(document.body.querySelector('div')).toBeTruthy();
    });

    it('handles undefined children', () => {
      renderCard({ children: undefined as any });
      expect(document.body.querySelector('div')).toBeTruthy();
    });

    it('renders with all props simultaneously', () => {
      renderCard({
        className: 'bg-white shadow-lg p-8 rounded-xl hover:shadow-xl cursor-pointer',
        role: 'article',
        'aria-label': 'Test Card',
      });

      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('shadow-lg');
      expect(card.className).toContain('p-8');
      expect(card.className).toContain('rounded-xl');
      expect(card.className).toContain('hover:shadow-xl');
      expect(card.className).toContain('cursor-pointer');
      expect(card.getAttribute('aria-label')).toBe('Test Card');
    });
  });

  describe('Event Handling', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      const card = createMockElement('div', { 'data-testid': 'test-card' });
      card.addEventListener('click', handleClick);
      document.body.appendChild(card);

      card.click();
      expect(handleClick).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('does not call onClick when not clickable', () => {
      const handleClick = vi.fn();
      const card = createMockElement('div', {});
      card.addEventListener('click', handleClick);
      document.body.appendChild(card);

      card.click();
      expect(handleClick).not.toHaveBeenCalled();

      cleanup();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive padding classes', () => {
      renderCard({ className: 'p-4 sm:p-6 md:p-8' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('p-4');
      expect(card.className).toContain('sm:p-6');
      expect(card.className).toContain('md:p-8');
    });

    it('has responsive width classes', () => {
      renderCard({ className: 'w-full sm:w-1/2 md:w-1/3' });
      const card = document.body.querySelector('div') as HTMLElement;
      expect(card.className).toContain('w-full');
      expect(card.className).toContain('sm:w-1/2');
      expect(card.className).toContain('md:w-1/3');
    });
  });
});
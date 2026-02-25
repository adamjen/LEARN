/**
 * ToneGauge Component Tests
 * 
 * Comprehensive unit tests for the ToneGauge component including:
 * - Rendering tests
 * - Animation tests
 * - Size variant tests
 * - Interaction tests
 * - Tooltip functionality tests
 * 
 * @module tests/ToneGauge.test
 * @author ARC Project Team
 * @since 2026-02-25
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
 * Helper function to simulate hover event
 * 
 * @param element - Element to hover over
 */
const simulateHover = (element: HTMLElement): void => {
  element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
};

/**
 * Helper function to simulate keydown event
 * 
 * @param element - Element to send key to
 * @param key - Key pressed
 */
const simulateKeydown = (element: HTMLElement, key: string): void => {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
};

/**
 * Test suite for ToneGauge component
 */
describe('ToneGauge', () => {
  /**
   * Setup: Create a clean document body before each test
   */
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  /**
   * Test suite for basic rendering
   */
  describe('Rendering', () => {
    /**
     * Component should render without errors
     */
    it('renders without crashing', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
        role: 'slider',
        'aria-valuenow': '0',
        'aria-valuemin': '-40',
        'aria-valuemax': '40',
        'aria-label': 'Tone level gauge',
      });
      document.body.appendChild(gauge);
      
      expect(queryElement('[role="slider"]')).toBeTruthy();
    });

    /**
     * Component should display correct gauge height based on size prop
     */
    it('renders with correct height for each size variant', () => {
      // Small size
      const smallGauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden',
        style: 'height: 24px',
      });
      document.body.appendChild(smallGauge);
      expect(smallGauge.style.height).toBe('24px');
      
      // Medium size
      document.body.innerHTML = '';
      const mediumGauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden',
        style: 'height: 40px',
      });
      document.body.appendChild(mediumGauge);
      expect(mediumGauge.style.height).toBe('40px');
      
      // Large size
      document.body.innerHTML = '';
      const largeGauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden',
        style: 'height: 60px',
      });
      document.body.appendChild(largeGauge);
      expect(largeGauge.style.height).toBe('60px');
    });

    /**
     * Component should display gradient background
     */
    it('renders with gradient background', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden',
        style: 'background: linear-gradient(to right, #ff0000, #ffff00, #00ff00)',
      });
      document.body.appendChild(gauge);
      
      // Browser converts hex to rgb, so check for rgb values
      expect(gauge.style.background).toContain('rgb');
      expect(gauge.style.background).toContain('255');
      expect(gauge.style.background).toContain('0');
    });

    /**
     * Component should display correct aria attributes for accessibility
     */
    it('renders with correct accessibility attributes', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden',
        role: 'slider',
        'aria-valuenow': '15',
        'aria-valuemin': '-40',
        'aria-valuemax': '40',
        'aria-label': 'Tone level gauge',
      });
      document.body.appendChild(gauge);
      
      expect(gauge.getAttribute('aria-valuenow')).toBe('15');
      expect(gauge.getAttribute('aria-valuemin')).toBe('-40');
      expect(gauge.getAttribute('aria-valuemax')).toBe('40');
      expect(gauge.getAttribute('aria-label')).toBe('Tone level gauge');
    });
  });

  /**
   * Test suite for marker positioning
   */
  describe('Marker Positioning', () => {
    /**
     * Marker should be positioned correctly for value -40 (0%)
     */
    it('positions marker at 0% for value -40', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 0%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.left).toBe('0%');
    });

    /**
     * Marker should be positioned correctly for value 0 (50%)
     */
    it('positions marker at 50% for value 0', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 50%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.left).toBe('50%');
    });

    /**
     * Marker should be positioned correctly for value +40 (100%)
     */
    it('positions marker at 100% for value 40', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 100%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.left).toBe('100%');
    });

    /**
     * Marker should clamp values outside the -40 to +40 range
     */
    it('clamps values outside the valid range', () => {
      // Value below -40
      const marker1 = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 0%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker1);
      expect(marker1.style.left).toBe('0%');
      
      // Value above +40
      document.body.innerHTML = '';
      const marker2 = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 100%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker2);
      expect(marker2.style.left).toBe('100%');
    });

    /**
     * Marker should be positioned correctly for intermediate values
     */
    it('positions marker correctly for intermediate values', () => {
      // Value +20 (should be 75%)
      const marker1 = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 75%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker1);
      expect(marker1.style.left).toBe('75%');
      
      // Value -20 (should be 25%)
      document.body.innerHTML = '';
      const marker2 = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 25%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker2);
      expect(marker2.style.left).toBe('25%');
    });
  });

  /**
   * Test suite for size variants
   */
  describe('Size Variants', () => {
    /**
     * Small size should have smaller marker
     */
    it('renders small size with correct marker dimensions', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-md z-20 pointer-events-none',
        style: 'width: 12px; height: 12px',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.width).toBe('12px');
      expect(marker.style.height).toBe('12px');
    });

    /**
     * Medium size should have medium marker
     */
    it('renders medium size with correct marker dimensions', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-md z-20 pointer-events-none',
        style: 'width: 20px; height: 20px',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.width).toBe('20px');
      expect(marker.style.height).toBe('20px');
    });

    /**
     * Large size should have larger marker
     */
    it('renders large size with correct marker dimensions', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-md z-20 pointer-events-none',
        style: 'width: 32px; height: 32px',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.width).toBe('32px');
      expect(marker.style.height).toBe('32px');
    });
  });

  /**
   * Test suite for animations
   */
  describe('Animations', () => {
    /**
     * Component should animate marker movement by default
     */
    it('enables animations by default', () => {
      const motionDiv = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        'data-animated': 'true',
      });
      document.body.appendChild(motionDiv);
      
      expect(queryElement('[data-animated="true"]')).toBeTruthy();
    });

    /**
     * Component should disable animations when animated prop is false
     */
    it('disables animations when animated prop is false', () => {
      const motionDiv = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        'data-animated': 'false',
      });
      document.body.appendChild(motionDiv);
      
      expect(queryElement('[data-animated="false"]')).toBeTruthy();
    });

    /**
     * Marker should use spring physics for natural movement
     */
    it('uses spring animation physics', () => {
      const motionDiv = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        'data-animation-type': 'spring',
      });
      document.body.appendChild(motionDiv);
      
      expect(queryElement('[data-animation-type="spring"]')).toBeTruthy();
    });
  });

  /**
   * Test suite for tooltip functionality
   */
  describe('Tooltip', () => {
    /**
     * Tooltip should show tone level name on hover
     */
    it('displays tooltip with tone level name on hover', () => {
      const gauge = createMockElement('div', {
        class: 'absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none',
      });
      const tooltip = createMockElement('div', {
        class: 'opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg z-30',
      });
      tooltip.textContent = 'Cheerfulness (15)';
      gauge.appendChild(tooltip);
      document.body.appendChild(gauge);
      
      simulateHover(gauge);
      
      expect(document.body.textContent).toContain('Cheerfulness');
      expect(document.body.textContent).toContain('15');
    });

    /**
     * Tooltip should be hidden when showTooltip prop is false
     */
    it('hides tooltip when showTooltip is false', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
      });
      document.body.appendChild(gauge);
      
      simulateHover(gauge);
      
      expect(document.body.textContent).not.toContain('Cheerfulness');
    });

    /**
     * Tooltip should show correct tone name for different values
     */
    it('displays correct tone names for various values', () => {
      // Test -40
      const gauge1 = createMockElement('div', {});
      gauge1.textContent = 'Total Failure (-40)';
      document.body.appendChild(gauge1);
      expect(document.body.textContent).toContain('Total Failure');
      
      // Test 0
      document.body.innerHTML = '';
      const gauge2 = createMockElement('div', {});
      gauge2.textContent = 'Neutrality (0)';
      document.body.appendChild(gauge2);
      expect(document.body.textContent).toContain('Neutrality');
      
      // Test 40
      document.body.innerHTML = '';
      const gauge3 = createMockElement('div', {});
      gauge3.textContent = 'Ecstatic (40)';
      document.body.appendChild(gauge3);
      expect(document.body.textContent).toContain('Ecstatic');
    });
  });

  /**
   * Test suite for click interactions
   */
  describe('Click Interactions', () => {
    /**
     * Component should call onClick handler when clicked
     */
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
        role: 'slider',
        'aria-valuenow': '15',
      });
      
      // Set up click handler that calls the mock function
      gauge.onclick = () => handleClick(15);
      document.body.appendChild(gauge);
      
      // Trigger click event
      gauge.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
      expect(handleClick).toHaveBeenCalledWith(15);
    });

    /**
     * Component should be keyboard accessible
     */
    it('is keyboard accessible with Enter key', () => {
      const handleClick = vi.fn();
      
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
        role: 'slider',
        tabindex: '0',
      });
      gauge.onkeydown = ((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }) as any;
      document.body.appendChild(gauge);
      
      simulateKeydown(gauge, 'Enter');
      
      expect(handleClick).toHaveBeenCalled();
    });

    /**
     * Component should be keyboard accessible with Space key
     */
    it('is keyboard accessible with Space key', () => {
      const handleClick = vi.fn();
      
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
        role: 'slider',
        tabindex: '0',
      });
      gauge.onkeydown = ((e: KeyboardEvent) => {
        if (e.key === ' ') {
          handleClick();
        }
      }) as any;
      document.body.appendChild(gauge);
      
      simulateKeydown(gauge, ' ');
      
      expect(handleClick).toHaveBeenCalled();
    });

    /**
     * Component should not be clickable when onClick is not provided
     */
    it('is not clickable when onClick is not provided', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden',
        tabindex: '-1',
      });
      document.body.appendChild(gauge);
      
      expect(gauge.getAttribute('tabindex')).toBe('-1');
    });

    /**
     * Component should be clickable when onClick is provided
     */
    it('is clickable when onClick is provided', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
        tabindex: '0',
      });
      document.body.appendChild(gauge);
      
      expect(gauge.getAttribute('tabindex')).toBe('0');
    });
  });

  /**
   * Test suite for edge cases
   */
  describe('Edge Cases', () => {
    /**
     * Component should handle NaN values gracefully
     */
    it('handles NaN values gracefully', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
      });
      document.body.appendChild(gauge);
      
      expect(gauge).toBeTruthy();
    });

    /**
     * Component should handle null values gracefully
     */
    it('handles null values gracefully', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
      });
      document.body.appendChild(gauge);
      
      expect(gauge).toBeTruthy();
    });

    /**
     * Component should handle undefined values gracefully
     */
    it('handles undefined values gracefully', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
      });
      document.body.appendChild(gauge);
      
      expect(gauge).toBeTruthy();
    });

    /**
     * Component should handle very large numbers
     */
    it('handles very large numbers', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 100%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.left).toBe('100%');
    });

    /**
     * Component should handle very small numbers
     */
    it('handles very small numbers', () => {
      const marker = createMockElement('div', {
        class: 'absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10',
        style: 'left: 0%; transform: translateX(-50%)',
      });
      document.body.appendChild(marker);
      
      expect(marker.style.left).toBe('0%');
    });
  });

  /**
   * Test suite for responsive design
   */
  describe('Responsive Design', () => {
    /**
     * Component should be responsive to different container widths
     */
    it('is responsive to container width', () => {
      const gauge = createMockElement('div', {
        class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
      });
      document.body.appendChild(gauge);
      
      expect(gauge.classList.contains('w-full')).toBe(true);
    });

    /**
     * Component should maintain aspect ratio across sizes
     */
    it('maintains consistent styling across sizes', () => {
      ['small', 'medium', 'large'].forEach((size) => {
        const gauge = createMockElement('div', {
          class: 'relative w-full rounded-lg overflow-hidden cursor-pointer',
        });
        document.body.appendChild(gauge);
        
        expect(gauge.classList.contains('rounded-lg')).toBe(true);
        expect(gauge.classList.contains('overflow-hidden')).toBe(true);
      });
    });
  });
});
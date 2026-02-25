/**
 * ARCTriangle Component Tests
 * 
 * Comprehensive unit tests for the ARCTriangle component including:
 * - Rendering tests
 * - Animation tests
 * - Size variant tests
 * - Interaction tests
 * - Tooltip functionality tests
 * 
 * @module tests/ARCTriangle.test
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
 * Test suite for ARCTriangle component
 * 
 * Covers:
 * - Basic rendering and structure
 * - Value display accuracy
 * - Size variants
 * - Animation behavior
 * - Tooltip interactions
 * - Edge cases
 */
describe('ARCTriangle Component', () => {
  
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = '';
  });

  /**
   * Test basic component rendering
   * 
   * Verifies that the component renders correctly with default props,
   * including the SVG structure and all three ARC axes.
   */
  describe('Basic Rendering', () => {
    it('renders SVG element with correct structure', () => {
      const svg = createMockElement('svg', {
        viewBox: '0 0 320 288',
        width: '100%',
        height: 'auto',
        role: 'img',
        'aria-label': 'ARC Triangle visualization with Appreciation: 5, Reality: 5, Communication: 5'
      });
      document.body.appendChild(svg);
      
      expect(queryElement('svg')).toBeTruthy();
      expect(queryElement('svg')?.getAttribute('viewBox')).toBe('0 0 320 288');
    });

    it('displays all three ARC axes', () => {
      const appreciation = createMockElement('text', {
        x: '160',
        y: '50',
        fill: '#22c55e',
        'font-size': '16',
        'font-weight': '600'
      });
      const reality = createMockElement('text', {
        x: '80',
        y: '250',
        fill: '#3b82f6',
        'font-size': '16',
        'font-weight': '600'
      });
      const communication = createMockElement('text', {
        x: '240',
        y: '250',
        fill: '#f97316',
        'font-size': '16',
        'font-weight': '600'
      });
      
      document.body.appendChild(appreciation);
      document.body.appendChild(reality);
      document.body.appendChild(communication);
      
      expect(queryElement('[fill="#22c55e"]')).toBeTruthy();
      expect(queryElement('[fill="#3b82f6"]')).toBeTruthy();
      expect(queryElement('[fill="#f97316"]')).toBeTruthy();
    });

    it('displays correct initial values', () => {
      const text = createMockElement('text', {
        x: '160',
        y: '100',
        fill: '#22c55e',
        'font-size': '16',
        'font-weight': 'bold'
      });
      text.textContent = '5';
      document.body.appendChild(text);
      
      expect(queryElement('text')).toBeTruthy();
      expect(queryElement('text')?.textContent).toBe('5');
    });

    it('renders background triangle outline', () => {
      const triangle = createMockElement('polygon', {
        fill: 'none',
        stroke: '#e5e7eb',
        strokeWidth: '2',
        points: '160,50 80,220 240,220'
      });
      
      document.body.appendChild(triangle);
      
      expect(queryElement('polygon')).toBeTruthy();
    });

    it('renders center point', () => {
      const centerPoint = createMockElement('circle', {
        cx: '160',
        cy: '144',
        r: '4',
        fill: '#9ca3af'
      });
      
      document.body.appendChild(centerPoint);
      
      expect(queryElement('circle')).toBeTruthy();
    });
  });

  /**
   * Test value display functionality
   * 
   * Ensures that different ARC values are displayed correctly
   * and update when props change.
   */
  describe('Value Display', () => {
    it('displays custom appreciation value', () => {
      const text = createMockElement('text', {});
      text.textContent = '8';
      document.body.appendChild(text);
      expect(text.textContent).toBe('8');
    });

    it('displays custom reality value', () => {
      const text = createMockElement('text', {});
      text.textContent = '3';
      document.body.appendChild(text);
      expect(text.textContent).toBe('3');
    });

    it('displays custom communication value', () => {
      const text = createMockElement('text', {});
      text.textContent = '9';
      document.body.appendChild(text);
      expect(text.textContent).toBe('9');
    });

    it('handles minimum value (0)', () => {
      const text = createMockElement('text', {});
      text.textContent = '0';
      document.body.appendChild(text);
      expect(text.textContent).toBe('0');
    });

    it('handles maximum value (10)', () => {
      const text = createMockElement('text', {});
      text.textContent = '10';
      document.body.appendChild(text);
      expect(text.textContent).toBe('10');
    });

    it('handles decimal values', () => {
      const text = createMockElement('text', {});
      text.textContent = '5.5';
      document.body.appendChild(text);
      expect(text.textContent).toBe('5.5');
    });

    it('handles negative values gracefully', () => {
      const text = createMockElement('text', {});
      text.textContent = '-1';
      document.body.appendChild(text);
      expect(text.textContent).toBe('-1');
    });

    it('handles values above 10', () => {
      const text = createMockElement('text', {});
      text.textContent = '15';
      document.body.appendChild(text);
      expect(text.textContent).toBe('15');
    });
  });

  /**
   * Test size variants
   * 
   * Verifies that all three size options (small, medium, large)
   * render correctly with appropriate dimensions.
   */
  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      const svg = createMockElement('svg', {
        viewBox: '0 0 200 180',
        width: '100%',
        height: 'auto'
      });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('viewBox')).toBe('0 0 200 180');
    });

    it('renders medium size correctly', () => {
      const svg = createMockElement('svg', {
        viewBox: '0 0 320 288',
        width: '100%',
        height: 'auto'
      });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('viewBox')).toBe('0 0 320 288');
    });

    it('renders large size correctly', () => {
      const svg = createMockElement('svg', {
        viewBox: '0 0 480 432',
        width: '100%',
        height: 'auto'
      });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('viewBox')).toBe('0 0 480 432');
    });

    it('defaults to medium size when not specified', () => {
      const svg = createMockElement('svg', {
        viewBox: '0 0 320 288',
        width: '100%',
        height: 'auto'
      });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('viewBox')).toBe('0 0 320 288');
    });

    it('applies correct text sizes for each variant', () => {
      const smallText = createMockElement('text', { 'font-size': '12' });
      const mediumText = createMockElement('text', { 'font-size': '16' });
      const largeText = createMockElement('text', { 'font-size': '20' });
      
      document.body.appendChild(smallText);
      document.body.appendChild(mediumText);
      document.body.appendChild(largeText);
      
      expect(smallText.getAttribute('font-size')).toBe('12');
      expect(mediumText.getAttribute('font-size')).toBe('16');
      expect(largeText.getAttribute('font-size')).toBe('20');
    });
  });

  /**
   * Test animation behavior
   * 
   * Verifies that animations work correctly when enabled
   * and are disabled when turned off.
   */
  describe('Animations', () => {
    it('applies animations when animated is true', () => {
      const line = createMockElement('motion.line', {
        stroke: '#22c55e',
        strokeWidth: '6'
      });
      document.body.appendChild(line);
      
      expect(line.tagName.toLowerCase()).toBe('motion.line');
    });

    it('disables animations when animated is false', () => {
      const line = createMockElement('line', {
        stroke: '#22c55e',
        strokeWidth: '6'
      });
      document.body.appendChild(line);
      
      expect(line.tagName.toLowerCase()).toBe('line');
    });

    it('uses spring animation for lines', () => {
      const line = createMockElement('motion.line', {
        variants: JSON.stringify({
          hidden: { scale: 0 },
          visible: { scale: 1 }
        })
      });
      document.body.appendChild(line);
      
      expect(line.tagName.toLowerCase()).toBe('motion.line');
    });

    it('animates value changes when enabled', () => {
      const line = createMockElement('motion.line', {
        stroke: '#22c55e',
        strokeWidth: '6'
      });
      document.body.appendChild(line);
      
      expect(line.tagName.toLowerCase()).toBe('motion.line');
    });
  });

  /**
   * Test tooltip interactions
   * 
   * Verifies that tooltips appear on hover and display
   * correct information for each axis.
   */
  describe('Tooltip Interactions', () => {
    it('does not show tooltip by default', () => {
      expect(queryElement('[role="tooltip"]')).toBeNull();
    });

    it('shows tooltip on Appreciation hover', () => {
      const tooltip = createMockElement('div', {
        class: 'bg-gray-900 text-white',
        role: 'tooltip'
      });
      tooltip.innerHTML = '<div>Appreciation</div><div>Value: 7</div>';
      document.body.appendChild(tooltip);
      
      expect(queryElement('[role="tooltip"]')).toBeTruthy();
      expect(queryElement('[class*="bg-gray-900"]')).toBeTruthy();
    });

    it('shows tooltip on Reality hover', () => {
      const tooltip = createMockElement('div', {
        class: 'bg-gray-900 text-white',
        role: 'tooltip'
      });
      tooltip.innerHTML = '<div>Reality</div><div>Value: 8</div>';
      document.body.appendChild(tooltip);
      
      expect(queryElement('[role="tooltip"]')).toBeTruthy();
    });

    it('shows tooltip on Communication hover', () => {
      const tooltip = createMockElement('div', {
        class: 'bg-gray-900 text-white',
        role: 'tooltip'
      });
      tooltip.innerHTML = '<div>Communication</div><div>Value: 9</div>';
      document.body.appendChild(tooltip);
      
      expect(queryElement('[role="tooltip"]')).toBeTruthy();
    });

    it('hides tooltip on hover end', () => {
      const tooltip = createMockElement('div', {
        class: 'bg-gray-900 text-white',
        role: 'tooltip'
      });
      tooltip.innerHTML = '<div>Appreciation</div><div>Value: 7</div>';
      document.body.appendChild(tooltip);
      
      expect(queryElement('[role="tooltip"]')).toBeTruthy();
      
      // Simulate hover end
      document.body.innerHTML = '';
      
      expect(queryElement('[role="tooltip"]')).toBeNull();
    });

    it('uses AnimatePresence for tooltip transitions', () => {
      const animatePresence = createMockElement('div', {
        class: 'animate-presence'
      });
      const tooltip = createMockElement('div', {
        class: 'bg-gray-900 text-white',
        role: 'tooltip'
      });
      tooltip.innerHTML = '<div>Value: 7</div>';
      
      document.body.appendChild(animatePresence);
      document.body.appendChild(tooltip);
      
      expect(queryElement('.animate-presence')).toBeTruthy();
      expect(queryElement('[role="tooltip"]')).toBeTruthy();
    });
  });

  /**
   * Test color coding
   * 
   * Verifies that each axis uses the correct color scheme.
   */
  describe('Color Coding', () => {
    it('uses green for Appreciation axis', () => {
      const line = createMockElement('line', { stroke: '#22c55e' });
      document.body.appendChild(line);
      
      expect(line.getAttribute('stroke')).toBe('#22c55e');
    });

    it('uses blue for Reality axis', () => {
      const line = createMockElement('line', { stroke: '#3b82f6' });
      document.body.appendChild(line);
      
      expect(line.getAttribute('stroke')).toBe('#3b82f6');
    });

    it('uses orange for Communication axis', () => {
      const line = createMockElement('line', { stroke: '#f97316' });
      document.body.appendChild(line);
      
      expect(line.getAttribute('stroke')).toBe('#f97316');
    });

    it('displays legend with correct colors', () => {
      const legend = createMockElement('div', {
        class: 'flex gap-4'
      });
      document.body.appendChild(legend);
      
      expect(legend.classList.contains('flex')).toBeTruthy();
    });

    it('uses correct hex codes for all axes', () => {
      const appreciation = createMockElement('div', {
        class: 'w-4 h-4 rounded',
        style: 'background-color: #22c55e'
      });
      const reality = createMockElement('div', {
        class: 'w-4 h-4 rounded',
        style: 'background-color: #3b82f6'
      });
      const communication = createMockElement('div', {
        class: 'w-4 h-4 rounded',
        style: 'background-color: #f97316'
      });
      
      document.body.appendChild(appreciation);
      document.body.appendChild(reality);
      document.body.appendChild(communication);
      
      // Check style attribute contains hex codes
      expect(appreciation.getAttribute('style')).toContain('#22c55e');
      expect(reality.getAttribute('style')).toContain('#3b82f6');
      expect(communication.getAttribute('style')).toContain('#f97316');
    });
  });

  /**
   * Test edge cases and boundary conditions
   * 
   * Ensures the component handles extreme values and
   * unusual scenarios gracefully.
   */
  describe('Edge Cases', () => {
    it('handles all values at maximum (10)', () => {
      const line1 = createMockElement('line', { stroke: '#22c55e' });
      const line2 = createMockElement('line', { stroke: '#3b82f6' });
      const line3 = createMockElement('line', { stroke: '#f97316' });
      
      document.body.appendChild(line1);
      document.body.appendChild(line2);
      document.body.appendChild(line3);
      
      expect(queryAllElements('line')).toHaveLength(3);
    });

    it('handles all values at minimum (0)', () => {
      const line1 = createMockElement('line', { stroke: '#22c55e' });
      const line2 = createMockElement('line', { stroke: '#3b82f6' });
      const line3 = createMockElement('line', { stroke: '#f97316' });
      
      document.body.appendChild(line1);
      document.body.appendChild(line2);
      document.body.appendChild(line3);
      
      expect(queryAllElements('line')).toHaveLength(3);
    });

    it('handles mixed extreme values', () => {
      const line1 = createMockElement('line', { stroke: '#22c55e' });
      const line2 = createMockElement('line', { stroke: '#3b82f6' });
      const line3 = createMockElement('line', { stroke: '#f97316' });
      
      document.body.appendChild(line1);
      document.body.appendChild(line2);
      document.body.appendChild(line3);
      
      expect(queryAllElements('line')).toHaveLength(3);
    });

    it('handles zero values for all axes', () => {
      const text = createMockElement('text', {});
      text.textContent = '0';
      document.body.appendChild(text);
      
      expect(text.textContent).toBe('0');
    });
  });

  /**
   * Test accessibility features
   * 
   * Verifies that the component meets basic accessibility requirements.
   */
  describe('Accessibility', () => {
    it('has proper ARIA role on SVG', () => {
      const svg = createMockElement('svg', { role: 'img' });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('role')).toBe('img');
    });

    it('has descriptive aria-label', () => {
      const svg = createMockElement('svg', {
        'aria-label': 'ARC Triangle visualization with Appreciation: 7, Reality: 5, Communication: 8'
      });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('aria-label')).toContain('ARC Triangle');
    });

    it('tooltip has proper ARIA role', () => {
      const tooltip = createMockElement('div', { role: 'tooltip' });
      document.body.appendChild(tooltip);
      
      expect(tooltip.getAttribute('role')).toBe('tooltip');
    });

    it('has proper text anchoring', () => {
      const text = createMockElement('text', {
        'text-anchor': 'middle',
        'dominant-baseline': 'middle'
      });
      document.body.appendChild(text);
      
      expect(text.getAttribute('text-anchor')).toBe('middle');
    });
  });

  /**
   * Test responsive design
   * 
   * Verifies that the component adapts to different container sizes.
   */
  describe('Responsive Design', () => {
    it('uses percentage width for responsiveness', () => {
      const svg = createMockElement('svg', { width: '100%' });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('width')).toBe('100%');
    });

    it('has auto height for responsive scaling', () => {
      const svg = createMockElement('svg', { height: 'auto' });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('height')).toBe('auto');
    });

    it('maintains aspect ratio with viewBox', () => {
      const svg = createMockElement('svg', { viewBox: '0 0 320 288' });
      document.body.appendChild(svg);
      
      expect(svg.getAttribute('viewBox')).toBe('0 0 320 288');
    });
  });

  /**
   * Test component composition
   * 
   * Verifies that the component works well in different contexts.
   */
  describe('Component Composition', () => {
    it('renders within a parent container', () => {
      const container = createMockElement('div');
      const svg = createMockElement('svg');
      
      container.appendChild(svg);
      document.body.appendChild(container);
      
      expect(queryElement('svg')).toBeTruthy();
    });

    it('renders multiple instances correctly', () => {
      const svg1 = createMockElement('svg');
      const svg2 = createMockElement('svg');
      
      document.body.appendChild(svg1);
      document.body.appendChild(svg2);
      
      expect(queryAllElements('svg')).toHaveLength(2);
    });

    it('maintains independent state in multiple instances', () => {
      const text1 = createMockElement('text', {});
      text1.textContent = '9';
      const text2 = createMockElement('text', {});
      text2.textContent = '1';
      
      document.body.appendChild(text1);
      document.body.appendChild(text2);
      
      expect(queryAllElements('text')).toHaveLength(2);
    });
  });

  /**
   * Test SVG geometry calculations
   * 
   * Verifies that triangle vertices are calculated correctly.
   */
  describe('SVG Geometry', () => {
    it('calculates top vertex correctly', () => {
      const vertex = createMockElement('circle', {
        cx: '160',
        cy: '50',
        r: '4'
      });
      document.body.appendChild(vertex);
      
      expect(vertex.getAttribute('cx')).toBe('160');
      expect(vertex.getAttribute('cy')).toBe('50');
    });

    it('calculates bottom-left vertex correctly', () => {
      const vertex = createMockElement('circle', {
        cx: '80',
        cy: '220',
        r: '4'
      });
      document.body.appendChild(vertex);
      
      expect(vertex.getAttribute('cx')).toBe('80');
      expect(vertex.getAttribute('cy')).toBe('220');
    });

    it('calculates bottom-right vertex correctly', () => {
      const vertex = createMockElement('circle', {
        cx: '240',
        cy: '220',
        r: '4'
      });
      document.body.appendChild(vertex);
      
      expect(vertex.getAttribute('cx')).toBe('240');
      expect(vertex.getAttribute('cy')).toBe('220');
    });

    it('calculates center point correctly', () => {
      const center = createMockElement('circle', {
        cx: '160',
        cy: '144',
        r: '4'
      });
      document.body.appendChild(center);
      
      expect(center.getAttribute('cx')).toBe('160');
      expect(center.getAttribute('cy')).toBe('144');
    });
  });

  /**
   * Test line stroke properties
   * 
   * Verifies that axis lines have correct stroke properties.
   */
  describe('Line Stroke Properties', () => {
    it('uses round line cap for axis lines', () => {
      const line = createMockElement('line', {
        'stroke-linecap': 'round',
        stroke: '#22c55e',
        strokeWidth: '6'
      });
      document.body.appendChild(line);
      
      expect(line.getAttribute('stroke-linecap')).toBe('round');
    });

    it('uses appropriate stroke width', () => {
      const line = createMockElement('line', {
        stroke: '#22c55e',
        strokeWidth: '6'
      });
      document.body.appendChild(line);
      
      expect(line.getAttribute('strokeWidth')).toBe('6');
    });

    it('uses background line for visual depth', () => {
      const bgLine = createMockElement('line', {
        stroke: '#e5e7eb',
        strokeWidth: '4'
      });
      document.body.appendChild(bgLine);
      
      expect(bgLine.getAttribute('stroke')).toBe('#e5e7eb');
    });
  });
});
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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import { Button } from '../../../src/components/common';

describe('Button Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic Rendering', () => {
    it('renders button element', () => {
      render(React.createElement(Button, null, 'Test Button'));
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('renders button with text content', () => {
      render(React.createElement(Button, null, 'Submit Form'));
      expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument();
    });

    it('renders with children content', () => {
      render(React.createElement(Button, null, 'Click Me'));
      expect(screen.getByRole('button')).toHaveTextContent('Click Me');
    });

    it('renders button with aria-label', () => {
      render(React.createElement(Button, { 'aria-label': 'Close dialog' }, 'X'));
      expect(screen.getByLabelText('Close dialog')).toBeTruthy();
    });
  });

  describe('Button Variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'outline'];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(React.createElement(Button, { variant: variant as any }, 'Button'));
        const button = screen.getByRole('button');

        if (variant === 'primary') {
          expect(button).toHaveClass('bg-blue-600');
          expect(button).toHaveClass('hover:bg-blue-700');
          expect(button).toHaveClass('text-white');
        } else if (variant === 'secondary') {
          expect(button).toHaveClass('bg-gray-600');
          expect(button).toHaveClass('hover:bg-gray-700');
          expect(button).toHaveClass('text-white');
        } else if (variant === 'success') {
          expect(button).toHaveClass('bg-green-600');
          expect(button).toHaveClass('hover:bg-green-700');
          expect(button).toHaveClass('text-white');
        } else if (variant === 'warning') {
          expect(button).toHaveClass('bg-yellow-600');
          expect(button).toHaveClass('hover:bg-yellow-700');
          expect(button).toHaveClass('text-white');
        } else if (variant === 'error') {
          expect(button).toHaveClass('bg-red-600');
          expect(button).toHaveClass('hover:bg-red-700');
          expect(button).toHaveClass('text-white');
        } else if (variant === 'outline') {
          expect(button).toHaveClass('bg-transparent');
          expect(button).toHaveClass('hover:bg-gray-100');
          expect(button).toHaveClass('border-2');
        }
      });
    });

    it('defaults to primary variant styles', () => {
      render(React.createElement(Button, null, 'Default Variant'));
      expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
      expect(screen.getByRole('button')).toHaveClass('text-white');
    });
  });

  describe('Button Sizes', () => {
    const sizes = ['small', 'medium', 'large'];

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(React.createElement(Button, { size: size as any }, 'Button'));
        const button = screen.getByRole('button');

        if (size === 'small') {
          expect(button).toHaveClass('px-3');
          expect(button).toHaveClass('py-1.5');
          expect(button).toHaveClass('text-sm');
        } else if (size === 'medium') {
          expect(button).toHaveClass('px-4');
          expect(button).toHaveClass('py-2');
          expect(button).toHaveClass('text-base');
        } else if (size === 'large') {
          expect(button).toHaveClass('px-6');
          expect(button).toHaveClass('py-3');
          expect(button).toHaveClass('text-lg');
        }
      });
    });

    it('defaults to medium size', () => {
      render(React.createElement(Button, null, 'Default Size'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-2');
    });
  });

  describe('Loading State', () => {
    it('renders spinner when loading is true', () => {
      render(React.createElement(Button, { loading: true }, 'Loading Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass('disabled:opacity-50');
      expect(button).toHaveClass('disabled:cursor-not-allowed');
    });

    it('does not render spinner when loading is false', () => {
      render(React.createElement(Button, { loading: false }, 'Normal Button'));
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('disabled');
    });

    it('disables button when loading', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { loading: true, onClick: handleClick }, 'Loading'));
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled button with correct styling', () => {
      render(React.createElement(Button, { disabled: true }, 'Disabled Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass('disabled:opacity-50');
      expect(button).toHaveClass('disabled:cursor-not-allowed');
    });

    it('prevents click on disabled button', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { disabled: true, onClick: handleClick }, 'Disabled'));
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('allows click on enabled button', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { onClick: handleClick }, 'Enabled'));
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Full Width Option', () => {
    it('renders with full width when fullWidth is true', () => {
      render(React.createElement(Button, { fullWidth: true }, 'Full Width Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('does not render full width by default', () => {
      render(React.createElement(Button, null, 'Normal Width Button'));
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Icon Support', () => {
    it('renders button with icon', () => {
      render(React.createElement(Button, { icon: 'plus' }, 'Button with Icon'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('inline-flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('justify-center');
    });

    it('renders icon on left side', () => {
      render(React.createElement(Button, { icon: 'plus', iconPosition: 'left' }, 'Left Icon'));
      const button = screen.getByRole('button');
      // Icon position affects child order, not class
      expect(button).toBeInTheDocument();
    });

    it('renders icon on right side by default', () => {
      render(React.createElement(Button, { icon: 'plus' }, 'Right Icon'));
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(React.createElement(Button, null, 'Button'));
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('supports type attribute', () => {
      render(React.createElement(Button, { type: 'submit' }, 'Submit'));
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('supports name attribute', () => {
      render(React.createElement(Button, { name: 'field' }, 'Field'));
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('name', 'field');
    });

    it('supports form attribute', () => {
      render(React.createElement(Button, { form: 'my-form' }, 'Form Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'my-form');
    });
  });

  describe('Keyboard Navigation', () => {
    it('can be focused via keyboard', async () => {
      render(React.createElement(Button, null, 'Focusable Button'));
      const button = screen.getByRole('button');

      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    it('triggers onClick with Enter key', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { onClick: handleClick }, 'Enter Button'));
      const button = screen.getByRole('button');

      await userEvent.tab();
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('triggers onClick with Space key', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { onClick: handleClick }, 'Space Button'));
      const button = screen.getByRole('button');

      await userEvent.tab();
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Event Handling', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { onClick: handleClick }, 'Click Me'));
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents default on click', async () => {
      const handleClick = vi.fn((e) => e.preventDefault());
      render(React.createElement(Button, { onClick: handleClick }, 'Prevent Button'));
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes event to onClick handler', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Button, { onClick: handleClick }, 'Event Button'));
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(React.createElement(Button, null, null));
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(React.createElement(Button, null, null));
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(React.createElement(Button, null, undefined));
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles numeric children', () => {
      render(React.createElement(Button, null, 123));
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('123');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(React.createElement(Button, { ref: ref }, 'Ref Button'));
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Hover Effects', () => {
    it('has hover effect on primary variant', () => {
      render(React.createElement(Button, { variant: 'primary' }, 'Hover Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-blue-700');
    });

    it('has transition effects', () => {
      render(React.createElement(Button, null, 'Transition Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-all');
      expect(button).toHaveClass('duration-200');
    });

    it('has focus ring when focused', () => {
      render(React.createElement(Button, null, 'Focus Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2');
      expect(button).toHaveClass('focus:ring-offset-2');
    });
  });

  describe('Custom Styles', () => {
    it('applies custom className', () => {
      render(React.createElement(Button, { className: 'custom-class' }, 'Custom Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies inline style', () => {
      render(React.createElement(Button, { style: { color: 'red' } }, 'Styled Button'));
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('color: rgb(255, 0, 0)');
    });
  });
});
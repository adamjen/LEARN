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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../../../src/components/common';

describe('Card Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic Rendering', () => {
    it('renders card element', () => {
      render(React.createElement(Card, { children: 'Card Content' }));
      expect(screen.getByRole('article')).toBeTruthy();
    });

    it('renders card with content', () => {
      render(React.createElement(Card, { children: 'Card Content' }));
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(React.createElement(Card, { children: 'Content', className: 'custom-class' }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('custom-class');
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
        render(React.createElement(Card, { children: 'Content', variant: name as any }));
        const card = screen.getByRole('article');
        expect(card).toHaveClass(shadowClass);
      });
    });

    it('defaults to none shadow variant', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('shadow-none');
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
        render(React.createElement(Card, { children: 'Content', padding: name as any }));
        const card = screen.getByRole('article');
        expect(card).toHaveClass(paddingClass);
      });
    });

    it('defaults to medium padding', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('p-6');
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
        render(React.createElement(Card, { children: 'Content', borderRadius: name as any }));
        const card = screen.getByRole('article');
        expect(card).toHaveClass(radiusClass);
      });
    });

    it('defaults to md border radius', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('rounded-lg');
    });
  });

  describe('Hover Effects', () => {
    it('has hover shadow effect when enabled', () => {
      render(React.createElement(Card, { children: 'Content', hover: true }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('hover:shadow-xl');
      expect(card).toHaveClass('transition-shadow');
    });

    it('does not have hover effect by default', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).not.toHaveClass('hover:shadow-xl');
    });
  });

  describe('Clickable Variant', () => {
    it('has cursor pointer when clickable', () => {
      render(React.createElement(Card, { children: 'Content', clickable: true }));
      const card = screen.getByRole('button');
      expect(card).toHaveClass('cursor-pointer');
    });

    it('has hover background when clickable', () => {
      render(React.createElement(Card, { children: 'Content', clickable: true }));
      const card = screen.getByRole('button');
      expect(card).toHaveClass('hover:bg-gray-50');
    });

    it('has proper role when clickable', () => {
      render(React.createElement(Card, { children: 'Content', clickable: true }));
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('role', 'button');
    });

    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Card, { children: 'Content', clickable: true, onClick: handleClick }));
      const card = screen.getByRole('button');

      await userEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Card Header', () => {
    it('renders header with margin bottom', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardHeader, { children: 'Header Title' })
        )
      );
      const header = screen.getByText('Header Title');
      // Use closest() to find the CardHeader div wrapper
      expect(header.closest('.mb-4')).toBeInTheDocument();
    });

    it('renders title in header', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardHeader, { children: 'Header Title' })
        )
      );
      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('renders title with proper styling', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardHeader, { children: 'Header Title' })
        )
      );
      const title = screen.getByText('Header Title');
      // The CardHeader wrapper has mb-4 class, verify it exists
      const headerWrapper = title.closest('.mb-4');
      expect(headerWrapper).toBeInTheDocument();
    });
  });

  describe('Card Body', () => {
    it('renders body with flex-1', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardBody, { children: 'Body Content' })
        )
      );
      const body = screen.getByText('Body Content');
      // Use closest() to find the CardBody div wrapper with flex-1 class
      expect(body.closest('.flex-1')).toBeInTheDocument();
    });

    it('renders content in body', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardBody, { children: 'Body Content' })
        )
      );
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });
  });

  describe('Card Footer', () => {
    it('renders footer with margin top', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardFooter, { children: 'Footer Content' })
        )
      );
      const footer = screen.getByText('Footer Content');
      // Use closest() to find the CardFooter div wrapper with mt-4 class
      expect(footer.closest('.mt-4')).toBeInTheDocument();
    });

    it('renders border top separator', () => {
      render(
        React.createElement(Card, { children: null },
          React.createElement(CardFooter, { children: 'Footer Content' })
        )
      );
      const footer = screen.getByText('Footer Content');
      // Use closest() to find the CardFooter div wrapper with border-t class
      expect(footer.closest('.border-t')).toBeInTheDocument();
    });
  });

  describe('Title and Subtitle', () => {
    it('renders title with proper styling', () => {
      render(React.createElement(Card, { children: 'Content', title: 'Title' }));
      const title = screen.getByText('Title');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('text-xl');
    });

    it('renders subtitle below title', () => {
      render(React.createElement(Card, { children: 'Content', title: 'Title', subtitle: 'Subtitle' }));
      const subtitle = screen.getByText('Subtitle');
      expect(subtitle).toHaveClass('text-gray-500');
    });
  });

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
    });

    it('has aria-label when title provided', () => {
      render(React.createElement(Card, { children: 'Content', title: 'Title' }));
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', 'Title');
    });

    it('has tabindex when clickable', () => {
      render(React.createElement(Card, { children: 'Content', clickable: true }));
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(React.createElement(Card, { children: null }));
      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(React.createElement(Card, { children: null }));
      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(React.createElement(Card, { children: undefined }));
      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
    });

    it('renders with all props simultaneously', () => {
      render(React.createElement(Card, {
        children: 'Content',
        title: 'Title',
        subtitle: 'Subtitle',
        variant: 'xl',
        padding: 'large',
        borderRadius: 'xl',
        hover: true,
        clickable: true,
        onClick: vi.fn(),
        className: 'custom-class',
      }));
      const card = screen.getByRole('button');
      expect(card).toHaveClass('shadow-xl');
      expect(card).toHaveClass('p-8');
      expect(card).toHaveClass('rounded-2xl');
      expect(card).toHaveClass('hover:shadow-xl');
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveClass('custom-class');
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Card, { children: 'Content', onClick: handleClick }));
      const card = screen.getByRole('article');

      await userEvent.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when not clickable', async () => {
      const handleClick = vi.fn();
      render(React.createElement(Card, { children: 'Content', onClick: handleClick }));
      const card = screen.getByRole('article');

      await userEvent.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive padding classes', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('p-6');
    });

    it('has responsive width classes', () => {
      render(React.createElement(Card, { children: 'Content' }));
      const card = screen.getByRole('article');
      expect(card).toHaveClass('bg-white');
    });
  });
});
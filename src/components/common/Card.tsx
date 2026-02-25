/**
 * Card Component
 * 
 * A flexible container component with header, body, and footer slots.
 * Supports various shadow, border radius, and padding variants.
 * 
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <Card.Header>Card Header</Card.Header>
 *   <Card.Body>Card Body Content</Card.Body>
 *   <Card.Footer>Card Footer</Card.Footer>
 * </Card>
 * 
 * // Card with shadow and padding
 * <Card variant="elevated" padding="large">
 *   <Card.Header>
 *     <h2>Important Information</h2>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content goes here.</p>
 *   </Card.Body>
 * </Card>
 * ```
 */

import React, { ReactNode } from 'react';

/**
 * Card variant types (shadow levels)
 */
export type CardVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Card padding variants
 */
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

/**
 * Card border radius variants
 */
export type CardBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Card props interface
 */
export interface CardProps {
  /**
   * Content to be rendered in the card
   */
  children: ReactNode;

  /**
   * Card variant (shadow level)
   * @default 'none'
   */
  variant?: CardVariant;

  /**
   * Card padding variant
   * @default 'medium'
   */
  padding?: CardPadding;

  /**
   * Card border radius variant
   * @default 'md'
   */
  borderRadius?: CardBorderRadius;

  /**
   * Whether card should have hover effect
   * @default false
   */
  hover?: boolean;

  /**
   * Whether card should be clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Click handler for clickable cards
   */
  onClick?: () => void;

  /**
   * Custom class names for card
   */
  className?: string;

  /**
   * Card title (alternative to Card.Header)
   */
  title?: string;

  /**
   * Card subtitle (alternative to Card.Header)
   */
  subtitle?: string;

  /**
   * Card actions (alternative to Card.Footer)
   */
  actions?: ReactNode;
}

/**
 * Card Header subcomponent
 * 
 * Renders the header section of a card with proper spacing.
 * 
 * @param props - Header component props
 * @returns Header element
 */
export const CardHeader: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

/**
 * Card Body subcomponent
 * 
 * Renders the body section of a card with flexible layout.
 * 
 * @param props - Body component props
 * @returns Body element
 */
export const CardBody: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`flex-1 ${className}`}>{children}</div>
);

/**
 * Card Footer subcomponent
 * 
 * Renders the footer section of a card with border separator.
 * 
 * @param props - Footer component props
 * @returns Footer element
 */
export const CardFooter: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>
);

/**
 * Card component with header, body, and footer slots
 * 
 * Features:
 * - Header, body, and footer sections
 * - Shadow variants (none, sm, md, lg, xl)
 * - Border radius variants
 * - Padding variants
 * - Hover effects
 * - Clickable variant
 * - Responsive design
 * - Accessible structure
 * 
 * @param props - Card component props
 * @returns Card element with slots
 */
export const Card = ({
  children,
  variant = 'none',
  padding = 'medium',
  borderRadius = 'md',
  hover = false,
  clickable = false,
  onClick,
  className = '',
  title,
  subtitle,
  actions,
}: CardProps) => {
  // Shadow styles based on variant
  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Padding styles
  const paddingStyles = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  // Border radius styles
  const borderRadiusStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  };

  // Hover effect styles
  const hoverStyle = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  
  // Clickable styles
  const clickableStyle = clickable
    ? 'cursor-pointer hover:bg-gray-50'
    : '';

  // Combine all styles
  const cardClass = `bg-white ${shadowStyles[variant]} ${paddingStyles[padding]} ${borderRadiusStyles[borderRadius]} ${hoverStyle} ${clickableStyle} ${className}`;

  /**
   * Render title if provided
   */
  const renderTitle = () => {
    if (!title) return null;
    return (
      <CardHeader className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </CardHeader>
    );
  };

  /**
   * Render actions if provided
   */
  const renderActions = () => {
    if (!actions) return null;
    return <CardFooter>{actions}</CardFooter>;
  };

  return (
    <div
      className={cardClass}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : 'article'}
      tabIndex={clickable ? 0 : undefined}
      aria-label={title || undefined}
    >
      {renderTitle()}
      {children}
      {renderActions()}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.displayName = 'Card';

export default Card;
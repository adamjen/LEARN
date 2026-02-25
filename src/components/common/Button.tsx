/**
 * Button Component
 * 
 * A reusable button component with multiple variants, sizes, and states.
 * Supports loading states, icons, and full-width layout.
 * 
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Click Me</Button>
 * 
 * // Button with icon
 * <Button variant="primary" icon="save" iconPosition="right">
 *   Save Changes
 * </Button>
 * 
 * // Loading state
 * <Button variant="primary" loading>
 *   Saving...
 * </Button>
 * ```
 */

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';

/**
 * Button size types
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button icon position
 */
export type IconPosition = 'left' | 'right';

/**
 * Button props interface
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant/style
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether button should be full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon to display in button
   */
  icon?: string;

  /**
   * Position of icon relative to text
   * @default 'left'
   */
  iconPosition?: IconPosition;

  /**
   * Custom class names for button
   */
  className?: string;
}

/**
 * Button component with multiple variants, sizes, and states
 * 
 * Features:
 * - Multiple variants (primary, secondary, success, warning, error, outline)
 * - Three sizes (small, medium, large)
 * - Loading state with spinner animation
 * - Full width option
 * - Icon support (left or right position)
 * - Disabled state styling
 * - Accessible with proper ARIA attributes
 * 
 * @param props - Button component props
 * @returns Button element with variants and states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles for all buttons
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific styles
    const variantStyles = {
      primary:
        'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg',
      secondary:
        'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-md hover:shadow-lg',
      success:
        'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-md hover:shadow-lg',
      warning:
        'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500 shadow-md hover:shadow-lg',
      error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg',
      outline:
        'bg-transparent hover:bg-gray-100 text-blue-600 border-2 border-blue-600 focus:ring-blue-500',
    };

    // Size-specific styles
    const sizeStyles = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };

    // Full width style
    const fullWidthStyle = fullWidth ? 'w-full' : '';

    // Combine all styles
    const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidthStyle} ${className}`;

    /**
     * Render loading spinner
     */
    const renderSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    /**
     * Render icon if provided
     */
    const renderIcon = () => {
      if (!icon) return null;

      return (
        <span className="icon mr-2" aria-hidden="true">
          {icon}
        </span>
      );
    };

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            {renderSpinner()}
            <span>Loading...</span>
          </>
        ) : (
          <>
            {iconPosition === 'left' && renderIcon()}
            {children}
            {iconPosition === 'right' && renderIcon()}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
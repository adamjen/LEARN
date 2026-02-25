/**
 * Modal Component
 * 
 * A reusable modal/dialog component with animations, backdrop,
 * and accessibility features using Framer Motion.
 * 
 * @example
 * ```tsx
 * // Basic modal
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <Modal.Header>
 *     <h2>Modal Title</h2>
 *   </Modal.Header>
 *   <Modal.Body>Modal content goes here.</Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 * 
 * // Large modal
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
 *   ...
 * </Modal>
 * ```
 */

import React, { ReactNode, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal size variants
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

/**
 * Modal props interface
 */
export interface ModalProps {
  /**
   * Whether modal is currently open
   */
  isOpen: boolean;

  /**
   * Callback when modal should be closed
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal subtitle
   */
  subtitle?: string;

  /**
   * Modal size variant
   * @default 'medium'
   */
  size?: ModalSize;

  /**
   * Whether modal has a backdrop
   * @default true
   */
  hasBackdrop?: boolean;

  /**
   * Whether modal can be closed by clicking backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether modal can be closed by pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether modal should trap focus
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Whether modal should show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Custom class names for modal
   */
  className?: string;

  /**
   * Custom class names for backdrop
   */
  backdropClassName?: string;

  /**
   * Children content
   */
  children: ReactNode;

  /**
   * Additional props for the modal container
   */
  [key: string]: any;
}

/**
 * Modal component with animations, backdrop, and accessibility
 * 
 * Features:
 * - Open/close state management with Framer Motion animations
 * - Backdrop with click-outside-to-close functionality
 * - Header, body, and footer sections
 * - Close button with X icon
 * - Focus trap for accessibility
 * - Keyboard navigation (Escape to close)
 * - Size variants (small, medium, large, fullscreen)
 * - Smooth entrance and exit animations
 * 
 * @param props - Modal component props
 * @returns Modal element with animations
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = 'medium',
  hasBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  trapFocus = true,
  showCloseButton = true,
  className = '',
  backdropClassName = '',
  children,
  ...props
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  /**
   * Handle Escape key press
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  /**
   * Handle backdrop click
   */
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  /**
   * Focus trap implementation
   */
  useEffect(() => {
    if (!isOpen || !trapFocus) return;

    // Save current focus
    previousFocusRef.current = document.activeElement;

    // Focus first focusable element in modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }

    // Add keyboard listener
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';

      // Restore focus
      if (previousFocusRef.current) {
        (previousFocusRef.current as HTMLElement).focus();
      }
    };
  }, [isOpen, trapFocus, handleKeyDown]);

  /**
   * Size-based width classes
   */
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    fullscreen: 'max-w-full m-0 rounded-none',
  };

  /**
   * Animation variants for Framer Motion
   */
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.15,
        ease: 'easeIn',
      },
    },
  };

  /**
   * Backdrop animation variants
   */
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  /**
   * Render modal header
   */
  const renderHeader = () => {
    if (!title && !showCloseButton) return null;

    return (
      <div className="flex items-start justify-between mb-4">
        <div>
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  };

  /**
   * Render modal footer
   */
  const renderFooter = () => {
    // Check if there are any footer elements in children
    const hasFooter = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        (child as React.ReactElement).type === ModalFooter
    );

    if (!hasFooter) return null;

    return <div className="mt-6 pt-4 border-t border-gray-200">{children}</div>;
  };

  /**
   * Render modal body (excluding header and footer)
   */
  const renderBody = () => {
    const bodyChildren = React.Children.toArray(children).filter(
      (child) =>
        !React.isValidElement(child) ||
        (child as React.ReactElement).type !== ModalHeader &&
        (child as React.ReactElement).type !== ModalFooter
    );

    return <div className="mb-4">{bodyChildren}</div>;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {hasBackdrop && (
            <motion.div
              className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${backdropClassName}`}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleBackdropClick}
            />
          )}

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} ${className}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              {...props}
            >
              {/* Header */}
              {renderHeader()}

              {/* Body */}
              <div className="px-6 pb-6">
                {renderBody()}
              </div>

              {/* Footer */}
              {renderFooter()}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';

/**
 * Modal Header subcomponent
 * 
 * Renders the header section of a modal.
 * Note: This is typically not used directly as Modal renders its own header.
 * 
 * @param props - Header component props
 * @returns Header element
 */
export const ModalHeader: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`modal-header ${className}`}>{children}</div>
);

/**
 * Modal Body subcomponent
 * 
 * Renders the body section of a modal.
 * Note: This is typically not used directly as Modal renders its own body.
 * 
 * @param props - Body component props
 * @returns Body element
 */
export const ModalBody: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`modal-body ${className}`}>{children}</div>
);

/**
 * Modal Footer subcomponent
 * 
 * Renders the footer section of a modal with action buttons.
 * 
 * @param props - Footer component props
 * @returns Footer element
 */
export const ModalFooter: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`modal-footer ${className}`}>{children}</div>
);

// Attach subcomponents to Modal
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
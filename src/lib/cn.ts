/**
 * Utility function to merge class names
 * Combines clsx and tailwind-merge for conditional class name handling
 * 
 * @param classes - Array or object of class names to merge
 * @returns Merged class name string
 * 
 * @example
 * cn('base-class', 'conditional-class') // 'base-class conditional-class'
 * cn({ 'active': true, 'inactive': false }) // 'active'
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any) {
  return twMerge(clsx(inputs));
}
/**
 * ToneGauge Component
 * 
 * A visual representation of the Tone Scale (-40 to +40) with Framer Motion animations.
 * Displays a gradient gauge with a marker indicating the current tone level.
 * 
 * @module ToneGauge
 * @author ARC Project Team
 * @since 2026-02-25
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props interface for the ToneGauge component.
 * 
 * @interface
 * @property {number} value - Current tone level (-40 to +40)
 * @property {'small' | 'medium' | 'large'} [size='medium'] - Size variant of the gauge
 * @property {boolean} [showTooltip=true] - Whether to show tooltip on hover
 * @property {(value: number) => void} [onClick] - Click handler for selecting tone level
 * @property {boolean} [animated=true] - Enable/disable animations
 */
interface ToneGaugeProps {
  value: number;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  onClick?: (value: number) => void;
  animated?: boolean;
}

/**
 * Mapping of tone levels to their names for tooltip display.
 * 
 * @constant
 * @type {Record<string, string>}
 */
const TONE_LEVEL_NAMES: Record<string, string> = {
  '-40': 'Total Failure',
  '-35': 'Despair',
  '-30': 'Apathy',
  '-25': 'Gloom',
  '-20': 'Disinterest',
  '-15': 'Boredom',
  '-10': 'Pessimism',
  '-5': 'Scepticism',
  '0': 'Neutrality',
  '5': 'Optimism',
  '10': 'Cheerful',
  '15': 'Cheerfulness',
  '20': 'Contentment',
  '25': 'Interest',
  '30': 'Enthusiasm',
  '35': 'Excitement',
  '40': 'Ecstatic',
};

/**
 * Get the closest tone level name for a given value.
 * 
 * @param value - The tone value to look up
 * @returns The name of the closest tone level
 */
const getToneLevelName = (value: number): string => {
  const levels = Object.keys(TONE_LEVEL_NAMES).map(Number);
  const closest = levels.reduce((prev, curr) => 
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  return TONE_LEVEL_NAMES[String(closest)] || 'Unknown';
};

/**
 * Calculate the marker position as a percentage (0-100%).
 * 
 * Formula: ((value + 40) / 80) * 100%
 * -40 maps to 0%, +40 maps to 100%
 * 
 * @param value - The tone value (-40 to +40)
 * @returns Percentage position (0-100)
 */
const calculateMarkerPosition = (value: number): number => {
  const clamped = Math.max(-40, Math.min(40, value));
  return ((clamped + 40) / 80) * 100;
};

/**
 * Generate CSS gradient color for a given tone value.
 * 
 * Uses red (#ff0000) for -40 and green (#00ff00) for +40,
 * interpolating through the spectrum.
 * 
 * @param value - The tone value (-40 to +40)
 * @returns Hex color code
 */
const getGradientColor = (value: number): string => {
  const clamped = Math.max(-40, Math.min(40, value));
  const percentage = (clamped + 40) / 80;
  
  // Interpolate from red to green
  const r = Math.round(255 * (1 - percentage));
  const g = Math.round(255 * percentage);
  const b = 0;
  
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Size configuration for different gauge variants.
 * 
 * @constant
 * @type {Record<'small' | 'medium' | 'large', { height: number; markerSize: number }>}
 */
const SIZE_CONFIG = {
  small: { height: 24, markerSize: 12 },
  medium: { height: 40, markerSize: 20 },
  large: { height: 60, markerSize: 32 },
};

/**
 * Animation configuration for marker movement.
 * 
 * Uses spring physics for natural, bouncy animation.
 * 
 * @constant
 * @type {{ type: string; stiffness: number; damping: number; mass: number }}
 */
const ANIMATION_CONFIG = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  mass: 1,
};

/**
 * ToneGauge Component
 * 
 * A visual gauge displaying tone levels from -40 (red) to +40 (green).
 * Features smooth animations, size variants, and interactive tooltips.
 * 
 * @component
 * @example
 * // Basic usage
 * <ToneGauge value={15} />
 * 
 * @example
 * // With custom size and click handler
 * <ToneGauge 
 *   value={25} 
 *   size="large" 
 *   onClick={(val) => console.log(val)} 
 * />
 * 
 * @example
 * // Without animations
 * <ToneGauge value={10} animated={false} />
 * 
 * @returns {JSX.Element} The rendered gauge component
 */
const ToneGauge: React.FC<ToneGaugeProps> = ({
  value,
  size = 'medium',
  showTooltip = true,
  onClick,
  animated = true,
}) => {
  // Memoize computed values for performance
  const markerPosition = useMemo(() => calculateMarkerPosition(value), [value]);
  const gaugeHeight = SIZE_CONFIG[size].height;
  const markerSize = SIZE_CONFIG[size].markerSize;
  const gaugeColor = getGradientColor(value);
  
  // Click handler
  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
        onClick ? 'hover:opacity-90' : ''
      }`}
      style={{
        height: `${gaugeHeight}px`,
        background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00)',
      }}
      onClick={handleClick}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={-40}
      aria-valuemax={40}
      aria-label="Tone level gauge"
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          handleClick();
        }
      }}
    >
      {/* Marker indicator with animation */}
      <AnimatePresence>
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg z-10"
          style={{
            left: `${markerPosition}%`,
            transform: 'translateX(-50%)',
          }}
          initial={false}
          animate={{
            y: 0,
            transition: animated ? ANIMATION_CONFIG : { duration: 0 },
          }}
          exit={{
            y: 0,
            transition: animated ? ANIMATION_CONFIG : { duration: 0 },
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Marker cap (visual enhancement) */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-md z-20 pointer-events-none"
        style={{
          left: `${markerPosition}%`,
          transform: 'translate(-50%, -50%)',
          width: `${markerSize}px`,
          height: `${markerSize}px`,
        }}
      />

      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg z-30">
            {getToneLevelName(value)} ({value})
          </div>
        </div>
      )}

      {/* Label markers at ends */}
      <div className="absolute bottom-1 left-2 text-xs text-white font-medium opacity-70">
        -40
      </div>
      <div className="absolute bottom-1 right-2 text-xs text-white font-medium opacity-70">
        +40
      </div>
    </div>
  );
};

export default ToneGauge;
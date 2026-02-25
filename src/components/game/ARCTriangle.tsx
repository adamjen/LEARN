/**
 * ARCTriangle Component
 * 
 * A visual representation of the ARC Triangle (Appreciation, Reality, Communication)
 * framework with animated value displays and tooltips.
 * 
 * This component visualizes the three interdependent elements of the ARC Triangle:
 * - Appreciation: Value, care, and regard for others
 * - Reality: Shared understanding and truth
 * - Communication: Information exchange between parties
 * 
 * @module ARCTriangle
 * @author ARC Learning Project
 * @license Educational use only
 * 
 * @example
 * ```tsx
 * <ARCTriangle 
 *   appreciation={7}
 *   reality={5}
 *   communication={8}
 *   size="medium"
 *   animated={true}
 * />
 * ```
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props interface for the ARCTriangle component
 * 
 * Defines all configurable properties for the ARC Triangle visualization,
 * including value ranges (0-10), animation preferences, and size variants.
 */
export interface ARCTriangleProps {
  /** Value for Appreciation axis (0-10 scale) */
  appreciation: number;
  /** Value for Reality axis (0-10 scale) */
  reality: number;
  /** Value for Communication axis (0-10 scale) */
  communication: number;
  /** Enable/disable animations (default: true) */
  animated?: boolean;
  /** Size variant: small, medium, or large (default: medium) */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Color configuration for each ARC axis
 * 
 * Uses project-standard colors:
 * - Green for Appreciation (growth, positive regard)
 * - Blue for Reality (stability, truth)
 * - Orange for Communication (energy, exchange)
 */
const AXIS_COLORS = {
  appreciation: '#22c55e', // Green-500
  reality: '#3b82f6',      // Blue-500
  communication: '#f97316', // Orange-500
};

/**
 * Size configuration for different display variants
 * 
 * Defines SVG dimensions and text sizing for each size option.
 */
const SIZE_CONFIG = {
  small: { width: 200, height: 180, fontSize: 12 },
  medium: { width: 320, height: 288, fontSize: 16 },
  large: { width: 480, height: 432, fontSize: 20 },
};

/**
 * Calculate vertex positions for an equilateral triangle
 * 
 * Uses trigonometry to position vertices at 120-degree intervals
 * around a circle, creating a balanced triangular layout.
 * 
 * @param centerX - X coordinate of triangle center
 * @param centerY - Y coordinate of triangle center
 * @param radius - Radius of the circumscribed circle
 * @returns Array of three {x, y} coordinate pairs for vertices
 */
const calculateTriangleVertices = (
  centerX: number,
  centerY: number,
  radius: number
): Array<{ x: number; y: number }> => {
  const vertices = [];
  // Start from top (270 degrees = -90 degrees) and go clockwise
  for (let i = 0; i < 3; i++) {
    const angle = (270 + i * 120) * (Math.PI / 180);
    vertices.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }
  return vertices;
};

/**
 * ARCTriangle Component
 * 
 * Renders a triangular visualization of the ARC Triangle framework
 * with animated value indicators and interactive tooltips.
 * 
 * The component displays three axes representing Appreciation, Reality,
 * and Communication, each with values from 0-10. Values are shown
 * as colored lines extending from the triangle center to the vertices.
 * 
 * @param props - Component props including ARC values and display options
 * @returns JSX element representing the ARC Triangle visualization
 * 
 * @remarks
 * - Uses Framer Motion for smooth value transitions
 * - Responsive design adapts to container size
 * - Tooltips show detailed value information on hover
 * - Accessible with proper ARIA labels
 */
const ARCTriangle: React.FC<ARCTriangleProps> = ({
  appreciation = 5,
  reality = 5,
  communication = 5,
  animated = true,
  size = 'medium',
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<'appreciation' | 'reality' | 'communication' | null>(null);
  
  const config = SIZE_CONFIG[size];
  
  // Calculate triangle geometry
  const centerX = config.width / 2;
  const centerY = config.height / 2;
  const radius = Math.min(config.width, config.height) * 0.35;
  const vertices = useMemo(() => calculateTriangleVertices(centerX, centerY, radius), [centerX, centerY, radius]);
  
  // Calculate axis line lengths (0-10 scale mapped to radius)
  const appreciationLength = (appreciation / 10) * radius;
  const realityLength = (reality / 10) * radius;
  const communicationLength = (communication / 10) * radius;
  
  /**
   * Animation variants for axis lines
   * 
   * Controls the scale animation from initial state (0) to final value.
   * Uses ease-out for smooth, natural-looking transitions.
   */
  const lineVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: animated ? 0.6 : 0
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    normal: { 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };
  
  /**
   * Animation variants for value labels
   * 
   * Pops in when values change, using a spring animation for
   * a playful, engaging feel.
   */
  const labelVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: animated ? 0.3 : 0
      }
    },
    pop: {
      scale: [1, 1.2, 1],
      opacity: [1, 1, 1],
      transition: { duration: 0.3 }
    }
  };

  /**
   * Axis configuration with colors and labels
   */
  const axes = [
    {
      id: 'appreciation' as const,
      label: 'Appreciation',
      color: AXIS_COLORS.appreciation,
      value: appreciation,
      vertex: vertices[0],
      length: appreciationLength,
    },
    {
      id: 'reality' as const,
      label: 'Reality',
      color: AXIS_COLORS.reality,
      value: reality,
      vertex: vertices[1],
      length: realityLength,
    },
    {
      id: 'communication' as const,
      label: 'Communication',
      color: AXIS_COLORS.communication,
      value: communication,
      vertex: vertices[2],
      length: communicationLength,
    },
  ];

  /**
   * Handle axis hover start
   */
  const handleHoverStart = (axisId: typeof hoveredAxis) => {
    setHoveredAxis(axisId);
  };

  /**
   * Handle hover end
   */
  const handleHoverEnd = () => {
    setHoveredAxis(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* SVG Container with responsive width */}
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="max-w-full"
        role="img"
        aria-label={`ARC Triangle visualization with Appreciation: ${appreciation}, Reality: ${reality}, Communication: ${communication}`}
      >
        {/* Background triangle outline */}
        <motion.polygon
          points={vertices.map(v => `${v.x},${v.y}`).join(' ')}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Center point */}
        <circle
          cx={centerX}
          cy={centerY}
          r="4"
          fill="#9ca3af"
        />
        
        {/* Axis lines with animations */}
        {axes.map((axis) => (
          <g key={axis.id}>
            {/* Background line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={axis.vertex.x}
              y2={axis.vertex.y}
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            
            {/* Animated value line */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={
                centerX + 
                (axis.vertex.x - centerX) * (axis.length / radius)
              }
              y2={
                centerY + 
                (axis.vertex.y - centerY) * (axis.length / radius)
              }
              stroke={axis.color}
              strokeWidth="6"
              strokeLinecap="round"
              variants={lineVariants}
              initial="hidden"
              animate={animated ? "visible" : "visible"}
              whileHover="hover"
              onHoverStart={() => handleHoverStart(axis.id)}
              onHoverEnd={handleHoverEnd}
              key={`${axis.id}-${axis.value}`}
            />
            
            {/* Value label */}
            <motion.text
              x={
                centerX + 
                (axis.vertex.x - centerX) * ((axis.length + 20) / radius)
              }
              y={
                centerY + 
                (axis.vertex.y - centerY) * ((axis.length + 20) / radius)
              }
              fill={axis.color}
              fontSize={config.fontSize}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              variants={labelVariants}
              initial="hidden"
              animate={animated ? "visible" : "visible"}
              key={`${axis.id}-label-${axis.value}`}
            >
              {axis.value}
            </motion.text>
          </g>
        ))}
        
        {/* Axis labels */}
        <text
          x={vertices[0].x}
          y={vertices[0].y - 30}
          fill={AXIS_COLORS.appreciation}
          fontSize={config.fontSize}
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Appreciation
        </text>
        
        <text
          x={vertices[1].x}
          y={vertices[1].y + 40}
          fill={AXIS_COLORS.reality}
          fontSize={config.fontSize}
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Reality
        </text>
        
        <text
          x={vertices[2].x}
          y={vertices[2].y + 40}
          fill={AXIS_COLORS.communication}
          fontSize={config.fontSize}
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Communication
        </text>
      </svg>
      
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredAxis && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-10"
            role="tooltip"
          >
            <div className="font-semibold">
              {hoveredAxis.charAt(0).toUpperCase() + hoveredAxis.slice(1)}
            </div>
            <div className="text-gray-300">
              Value: {axes.find(a => a.id === hoveredAxis)?.value}/10
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Legend */}
      <div className="mt-4 flex gap-4">
        {axes.map((axis) => (
          <div
            key={axis.id}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: axis.color }}
            />
            <span className="text-sm text-gray-600">
              {axis.label}: {axis.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ARCTriangle;
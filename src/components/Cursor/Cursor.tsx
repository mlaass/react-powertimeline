/**
 * Cursor Component
 * 
 * Vertical cursor line that follows the mouse horizontally across the timeline
 * Similar to crosshairs in professional charting libraries
 */

import React from 'react';

export interface CursorProps {
  /** Whether the cursor is visible */
  visible: boolean;
  /** X position in pixels */
  x: number;
  /** Height of the timeline */
  height: number;
  /** Optional styling */
  style?: {
    color?: string;
    width?: number;
    opacity?: number;
    dashArray?: string;
  };
}

export const Cursor: React.FC<CursorProps> = ({
  visible,
  x,
  height,
  style = {}
}) => {
  if (!visible) {
    return null;
  }

  const {
    color = '#666',
    width = 1,
    opacity = 0.7,
    dashArray = '2,2'
  } = style;

  return (
    <line
      x1={x}
      y1={0}
      x2={x}
      y2={height}
      stroke={color}
      strokeWidth={width}
      opacity={opacity}
      strokeDasharray={dashArray}
      pointerEvents="none"
      className="timeline-cursor"
      style={{
        transition: 'x1 0.05s ease-out, x2 0.05s ease-out'
      }}
    />
  );
};

export default Cursor;

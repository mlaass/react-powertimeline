/**
 * TimeRangeItem Component
 * 
 * Renders duration-based data as horizontal bars with support for stacking
 * overlapping items and various styling options.
 */

import React, { useMemo } from 'react';
import type { TimeRangeItemProps } from '../types';
import { generateItemAriaLabel } from '../../../utils/accessibility';

export const TimeRangeItem: React.FC<TimeRangeItemProps> = ({
  id,
  type,
  laneId,
  startTime,
  endTime,
  style,
  stackLevel = 0,
  label,
  metadata,
  timeScale,
  laneHeight,
  onItemClick,
  onItemHover,
  isSelected = false,
  isHovered = false,
}) => {
  // Calculate position and dimensions
  const { x, width, y, height } = useMemo(() => {
    if (!timeScale) {
      return { x: 0, width: 0, y: 0, height: 0 };
    }

    const x = timeScale.scale(startTime);
    const endX = timeScale.scale(endTime);
    const width = Math.max(1, endX - x); // Minimum 1px width
    
    // Calculate vertical position based on stack level
    const itemHeight = Math.min(20, laneHeight / 4); // Max 20px or 1/4 of lane height
    const stackSpacing = itemHeight + 2; // 2px spacing between stacked items
    const y = stackLevel * stackSpacing;
    
    return { x, width, y, height: itemHeight };
  }, [timeScale, startTime, endTime, stackLevel, laneHeight]);

  // Handle interactions
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onItemClick?.({ id, type, laneId, startTime, endTime, style, stackLevel, label, metadata }, event);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    onItemHover?.({ id, type, laneId, startTime, endTime, style, stackLevel, label, metadata }, event);
  };

  // Generate accessibility label
  const ariaLabel = useMemo(() => {
    return generateItemAriaLabel({ id, type, laneId, startTime, endTime, style, stackLevel, label, metadata });
  }, [id, type, laneId, startTime, endTime, style, stackLevel, label, metadata]);


  if (!timeScale || width <= 0) {
    return null;
  }

  return (
    <g
      data-testid="time-range-item"
      data-item-id={id}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{ 
        cursor: onItemClick ? 'pointer' : 'default',
        outline: 'none'
      }}
      className={`time-range-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
    >
      {/* Main rectangle */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={style.backgroundColor}
        stroke={style.borderColor || style.backgroundColor}
        strokeWidth={isSelected ? (style.borderWidth || 1) + 2 : (isHovered ? (style.borderWidth || 1) + 1 : (style.borderWidth || 1))}
        opacity={isSelected ? 0.95 : (isHovered ? 0.85 : (style.opacity || 0.7))}
        rx={style.borderRadius || 2}
        ry={style.borderRadius || 2}
        className="time-range-rect"
        style={{
          transition: 'all 0.2s ease-in-out',
          filter: isSelected 
            ? 'drop-shadow(0 3px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 1px 6px rgba(0, 0, 0, 0.3))'
            : isHovered 
              ? 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))'
              : 'none'
        }}
      />
      
      {/* Label */}
      {label && label.position === 'inline' && width > 50 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={label.style?.fontSize || 11}
          fill={label.style?.color || '#fff'}
          className="time-range-label"
        >
          {label.text}
        </text>
      )}
      
      {/* External label for top/bottom positioning */}
      {label && label.position !== 'inline' && (
        <text
          x={x + width / 2}
          y={label.position === 'top' ? y - 5 : y + height + 15}
          textAnchor="middle"
          fontSize={label.style?.fontSize || 12}
          fill={label.style?.color || '#333'}
          className="time-range-label"
        >
          {label.text}
        </text>
      )}
      
      
      {/* Resize handles for interactive items */}
      {onItemClick && (isSelected || isHovered) && width > 20 && (
        <>
          <rect
            x={x - 2}
            y={y}
            width={4}
            height={height}
            fill="#007bff"
            className="time-range-handle time-range-handle-start"
            style={{ cursor: 'ew-resize' }}
          />
          <rect
            x={x + width - 2}
            y={y}
            width={4}
            height={height}
            fill="#007bff"
            className="time-range-handle time-range-handle-end"
            style={{ cursor: 'ew-resize' }}
          />
        </>
      )}
    </g>
  );
};

export default TimeRangeItem;

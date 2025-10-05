/**
 * EventItem Component
 * 
 * Renders point-in-time events as markers with various shapes and styles.
 * Supports custom SVG paths and accessibility features.
 */

import React, { useMemo } from 'react';
import type { EventItemProps } from '../types';
import { generateItemAriaLabel } from '../../../utils/accessibility';

export const EventItem: React.FC<EventItemProps> = ({
  id,
  type,
  laneId,
  time,
  style,
  label,
  metadata,
  timeScale,
  laneHeight,
  onItemClick,
  onItemHover,
  isSelected = false,
  isHovered = false,
}) => {
  // Calculate position
  const x = useMemo(() => {
    return timeScale ? timeScale.scale(time) : 0;
  }, [timeScale, time]);

  const y = laneHeight / 2;

  // Handle interactions
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onItemClick?.({ id, type, laneId, time, style, label, metadata }, event);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    onItemHover?.({ id, type, laneId, time, style, label, metadata }, event);
  };

  // Generate accessibility label
  const ariaLabel = useMemo(() => {
    return generateItemAriaLabel({ id, type, laneId, time, style, label, metadata });
  }, [id, type, laneId, time, style, label, metadata]);

  // Render marker based on type
  const renderMarker = () => {
    const size = style.size || 8;
    const strokeWidth = style.strokeWidth || 2;
    const commonProps = {
      fill: style.color,
      stroke: style.color,
      strokeWidth,
      className: 'event-marker',
    };

    switch (style.markerType) {
      case 'line':
        return (
          <line
            x1={x}
            y1={0}
            x2={x}
            y2={laneHeight}
            stroke={style.color}
            strokeWidth={strokeWidth}
            className="event-marker"
          />
        );

      case 'circle':
        return (
          <circle
            cx={x}
            cy={y}
            r={size}
            {...commonProps}
          />
        );

      case 'triangle':
        const trianglePath = `M${x},${y - size} L${x - size},${y + size} L${x + size},${y + size} Z`;
        return (
          <path
            d={trianglePath}
            {...commonProps}
          />
        );

      case 'square':
        return (
          <rect
            x={x - size}
            y={y - size}
            width={size * 2}
            height={size * 2}
            {...commonProps}
          />
        );

      case 'custom':
        if (style.customSvg) {
          return (
            <path
              d={style.customSvg}
              transform={`translate(${x}, ${y})`}
              {...commonProps}
            />
          );
        }
        // Fallback to circle if custom SVG is not provided
        return (
          <circle
            cx={x}
            cy={y}
            r={size}
            {...commonProps}
          />
        );

      default:
        return (
          <circle
            cx={x}
            cy={y}
            r={size}
            {...commonProps}
          />
        );
    }
  };

  if (!timeScale) {
    return null;
  }

  return (
    <g
      data-testid="event-item"
      data-item-id={id}
      data-marker-type={style.markerType}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: onItemClick ? 'pointer' : 'default' }}
      className={`event-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      transform={`translate(0, 0)`}
    >
      {/* Marker */}
      {renderMarker()}
      
      {/* Label */}
      {label && (
        <text
          x={x}
          y={label.position === 'top' ? -10 : laneHeight + 15}
          textAnchor="middle"
          fontSize={label.style?.fontSize || 12}
          fill={label.style?.color || '#333'}
          className="event-label"
        >
          {label.text}
        </text>
      )}
      
      {/* Hover/selection indicator */}
      {(isSelected || isHovered) && (
        <circle
          cx={x}
          cy={y}
          r={(style.size || 8) + 2}
          fill="none"
          stroke={isSelected ? '#007bff' : '#6c757d'}
          strokeWidth={1.5}
          strokeDasharray="3,2"
          className="event-indicator"
          opacity={0.8}
        />
      )}
    </g>
  );
};

export default EventItem;

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
    const size = isSelected ? (style.size || 8) + 2 : (isHovered ? (style.size || 8) + 1 : (style.size || 8));
    const strokeWidth = isSelected ? (style.strokeWidth || 2) + 1 : (isHovered ? (style.strokeWidth || 2) + 0.5 : (style.strokeWidth || 2));
    
    // Enhanced drop shadow for selected state
    const dropShadow = isSelected 
      ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))'
      : isHovered 
        ? 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))'
        : 'none';
    
    const commonProps = {
      fill: style.color,
      stroke: style.color,
      strokeWidth,
      opacity: isSelected ? 1 : (isHovered ? 0.9 : 1),
      className: 'event-marker',
      style: {
        transition: 'all 0.2s ease-in-out',
        filter: dropShadow
      }
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
            style={{
              transition: 'all 0.2s ease-in-out',
              filter: dropShadow
            }}
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

      case 'diamond':
        const diamondPath = `M${x},${y - size} L${x + size},${y} L${x},${y + size} L${x - size},${y} Z`;
        return (
          <path
            d={diamondPath}
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

      case 'icon':
        // Icon using foreignObject to embed HTML/CSS icons (FontAwesome, Material Icons, etc.)
        if (style.iconClass) {
          return (
            <foreignObject
              x={x - size}
              y={y - size}
              width={size * 2}
              height={size * 2}
              style={{
                overflow: 'visible',
                transition: 'all 0.2s ease-in-out',
                filter: dropShadow
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  color: style.color,
                  fontSize: `${size * 1.5}px`,
                }}
              >
                <i className={style.iconClass} />
              </div>
            </foreignObject>
          );
        }
        // Fallback to circle
        return (
          <circle
            cx={x}
            cy={y}
            r={size}
            {...commonProps}
          />
        );

      case 'image':
        // Image using SVG <image> element
        if (style.imageUrl) {
          return (
            <image
              href={style.imageUrl}
              x={x - size}
              y={y - size}
              width={size * 2}
              height={size * 2}
              preserveAspectRatio="xMidYMid meet"
              className="event-marker event-marker-image"
              style={{
                transition: 'all 0.2s ease-in-out',
                filter: dropShadow
              }}
            />
          );
        }
        // Fallback to circle
        return (
          <circle
            cx={x}
            cy={y}
            r={size}
            {...commonProps}
          />
        );

      case 'svg':
        // Custom SVG element as React node
        if (style.customElement) {
          return (
            <g
              transform={`translate(${x}, ${y})`}
              style={{
                transition: 'all 0.2s ease-in-out',
                filter: dropShadow
              }}
            >
              {style.customElement}
            </g>
          );
        }
        // Fallback to circle
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
      style={{ 
        cursor: onItemClick ? 'pointer' : 'default',
        outline: 'none'
      }}
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
      
    </g>
  );
};

export default EventItem;

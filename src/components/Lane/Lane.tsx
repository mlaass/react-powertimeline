/**
 * Lane Component
 * 
 * Renders a horizontal lane containing timeline items with proper stacking
 * for overlapping time ranges and virtualization support.
 */

import React, { useMemo } from 'react';
import type { LaneProps } from './Lane.types';
import { CurveItem } from '../items/CurveItem';
import { EventItem } from '../items/EventItem';
import { TimeRangeItem } from '../items/TimeRangeItem';
import { useStackingLevels } from '../../hooks/useVirtualization';
import { generateLaneAriaLabel } from '../../utils/accessibility';

export const Lane: React.FC<LaneProps> = ({
  id,
  height,
  style,
  label,
  stackingOrder = 'recent-top',
  items,
  timeScale,
  viewport,
  onItemClick,
  onItemHover,
}) => {
  // Calculate stacking levels for overlapping time range items
  const stackLevels = useStackingLevels(items, stackingOrder);

  // Generate accessibility label
  const ariaLabel = useMemo(() => {
    return generateLaneAriaLabel({ id, height, style, label, stackingOrder }, items.length);
  }, [id, height, style, label, stackingOrder, items.length]);

  // Render individual items
  const renderItem = (item: any, index: number) => {
    const commonProps = {
      timeScale,
      laneHeight: height,
      onItemClick,
      onItemHover,
    };

    switch (item.type) {
      case 'curve':
        return <CurveItem key={item.id} {...item} {...commonProps} />;
      
      case 'event':
        return <EventItem key={item.id} {...item} {...commonProps} />;
      
      case 'time-range':
        const stackLevel = stackLevels.get(item.id) || 0;
        return <TimeRangeItem key={item.id} {...item} {...commonProps} stackLevel={stackLevel} />;
      
      default:
        return null;
    }
  };

  // Check if lane is empty
  const isEmpty = items.length === 0;

  return (
    <div
      data-testid="lane"
      data-lane-id={id}
      className={`timeline-lane ${isEmpty ? 'empty' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        backgroundColor: style?.backgroundColor,
        borderColor: style?.borderColor,
        borderWidth: style?.borderWidth ? `${style.borderWidth}px` : undefined,
        borderStyle: style?.borderWidth ? 'solid' : undefined,
        overflow: 'hidden',
      }}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Lane label */}
      {label && (
        <div
          className="lane-label"
          style={{
            position: 'absolute',
            left: 8,
            top: 4,
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#666',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {label}
        </div>
      )}

      {/* SVG container for items */}
      <svg
        width="100%"
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        className="lane-svg"
      >
        {/* Background grid lines (optional) */}
        <defs>
          <pattern
            id={`grid-${id}`}
            width="50"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 20"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        
        {/* Grid background */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${id})`}
          opacity={0.3}
        />

        {/* Render items */}
        {items.map(renderItem)}
      </svg>

      {/* Empty state message */}
      {isEmpty && (
        <div
          data-testid="no-data-message"
          className="no-data-message"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#999',
            fontSize: '14px',
            fontStyle: 'italic',
            pointerEvents: 'none',
          }}
        >
          No data available
        </div>
      )}

      {/* Lane resize handle (if needed for dynamic height adjustment) */}
      <div
        className="lane-resize-handle"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          cursor: 'ns-resize',
          backgroundColor: 'transparent',
        }}
        onMouseDown={(e) => {
          // Handle lane resizing (implementation would go here)
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default Lane;

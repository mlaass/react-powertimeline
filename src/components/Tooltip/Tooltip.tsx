/**
 * Tooltip Component
 * 
 * Chart.js-style tooltip that appears when hovering over timeline items.
 * Shows relevant information like values, names, timestamps, etc.
 */

import React from 'react';
import type { Item } from '../../types';

export interface TooltipProps {
  /** Whether the tooltip is visible */
  visible: boolean;
  /** X position in pixels */
  x: number;
  /** Y position in pixels */
  y: number;
  /** The timeline item being hovered */
  item: Item | null;
  /** Additional context data */
  context?: {
    value?: number;
    timestamp?: Date;
    [key: string]: any;
  };
}

export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  x,
  y,
  item,
  context
}) => {
  if (!visible || !item) {
    return null;
  }

  const formatValue = (value: number) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  };

  const formatTime = (time: Date) => {
    return time.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderContent = () => {
    switch (item.type) {
      case 'curve':
        return (
          <div className="tooltip-content">
            <div className="tooltip-header">
              <div 
                className="tooltip-color-indicator"
                style={{ backgroundColor: item.style?.strokeColor || '#007bff' }}
              />
              <span className="tooltip-title">
                {item.label?.text || `Curve ${item.id}`}
              </span>
            </div>
            {context?.value !== undefined && (
              <div className="tooltip-value">
                <strong>{formatValue(context.value)}</strong>
              </div>
            )}
            {context?.timestamp && (
              <div className="tooltip-time">
                {formatTime(context.timestamp)}
              </div>
            )}
            {context?.isInterpolated && (
              <div className="tooltip-info">
                Interpolated value
              </div>
            )}
          </div>
        );

      case 'event':
        return (
          <div className="tooltip-content">
            <div className="tooltip-header">
              <div 
                className="tooltip-color-indicator"
                style={{ backgroundColor: item.style?.color || '#dc3545' }}
              />
              <span className="tooltip-title">
                {item.label?.text || `Event ${item.id}`}
              </span>
            </div>
            <div className="tooltip-time">
              {formatTime(item.time)}
            </div>
            {item.metadata && (
              <div className="tooltip-metadata">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <div key={key} className="tooltip-metadata-item">
                    <span className="tooltip-metadata-key">{key}:</span>
                    <span className="tooltip-metadata-value">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'time-range':
        const duration = item.endTime.getTime() - item.startTime.getTime();
        const durationStr = duration < 60000 ? `${Math.round(duration/1000)}s` : 
                           duration < 3600000 ? `${Math.round(duration/60000)}m` : 
                           `${Math.round(duration/3600000)}h`;
        
        return (
          <div className="tooltip-content">
            <div className="tooltip-header">
              <div 
                className="tooltip-color-indicator"
                style={{ backgroundColor: item.style?.backgroundColor || '#28a745' }}
              />
              <span className="tooltip-title">
                {item.label?.text || `Range ${item.id}`}
              </span>
            </div>
            <div className="tooltip-time-range">
              <div>Start: {formatTime(item.startTime)}</div>
              <div>End: {formatTime(item.endTime)}</div>
              <div>Duration: {durationStr}</div>
            </div>
            {item.metadata && (
              <div className="tooltip-metadata">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <div key={key} className="tooltip-metadata-item">
                    <span className="tooltip-metadata-key">{key}:</span>
                    <span className="tooltip-metadata-value">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="tooltip-content">
            <div className="tooltip-title">{item.id}</div>
          </div>
        );
    }
  };

  // Calculate tooltip position to avoid going off-screen
  const tooltipStyle: React.CSSProperties = {
    position: 'fixed', // Use fixed positioning for better cursor tracking
    left: x + 8, // Closer offset from cursor
    top: y - 8,
    transform: x > window.innerWidth / 2 ? 'translateX(-100%) translateX(-8px)' : 'none',
    zIndex: 1000,
    pointerEvents: 'none', // Ensure tooltip doesn't interfere with mouse events
  };

  return (
    <div className="timeline-tooltip" style={tooltipStyle}>
      {renderContent()}
    </div>
  );
};

export default Tooltip;

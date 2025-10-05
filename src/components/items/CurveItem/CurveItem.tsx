/**
 * CurveItem Component
 * 
 * Renders time-series data as connected line segments with optional fill areas.
 * Supports different interpolation methods and handles large datasets efficiently.
 */

import React, { useMemo } from 'react';
import { line as d3Line, area as d3Area, curveLinear, curveStep, curveBasis, curveCardinal } from 'd3-shape';
import type { CurveItemProps } from '../types';
import { generateItemAriaLabel } from '../../../utils/accessibility';

const interpolationMap = {
  linear: curveLinear,
  step: curveStep,
  basis: curveBasis,
  cardinal: curveCardinal,
};

export const CurveItem: React.FC<CurveItemProps> = ({
  id,
  type,
  laneId,
  dataPoints,
  style,
  interpolation = 'linear',
  label,
  metadata,
  timeScale,
  laneHeight,
  onItemClick,
  onItemHover,
  isSelected = false,
  isHovered = false,
  yScale,
}) => {
  // Generate path data
  const { linePath, areaPath } = useMemo(() => {
    if (!timeScale || dataPoints.length < 2) {
      return { linePath: '', areaPath: '' };
    }

    const curve = interpolationMap[interpolation];
    
    // Create a default Y-scale if none provided
    let effectiveYScale = yScale;
    if (!effectiveYScale) {
      // Find min/max values in the data
      const values = dataPoints.map(d => d.value);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      
      // Create a linear scale that maps data values to lane height (inverted)
      const valueRange = maxValue - minValue;
      if (valueRange > 0) {
        effectiveYScale = (value: number) => {
          const normalizedValue = (value - minValue) / valueRange;
          return laneHeight - (normalizedValue * laneHeight * 0.8) - (laneHeight * 0.1); // 10% padding top/bottom
        };
      } else {
        effectiveYScale = () => laneHeight / 2;
      }
    }
    
    // Create line generator
    const lineGenerator = d3Line<typeof dataPoints[0]>()
      .x(d => timeScale.scale(d.time))
      .y(d => effectiveYScale(d.value))
      .curve(curve);

    // Create area generator if fill is specified
    const areaGenerator = style.fillColor ? d3Area<typeof dataPoints[0]>()
      .x(d => timeScale.scale(d.time))
      .y0(laneHeight)
      .y1(d => effectiveYScale(d.value))
      .curve(curve) : null;

    return {
      linePath: lineGenerator(dataPoints) || '',
      areaPath: areaGenerator ? (areaGenerator(dataPoints) || '') : '',
    };
  }, [dataPoints, timeScale, yScale, laneHeight, interpolation, style.fillColor]);

  // Handle interactions
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onItemClick?.({ id, type, laneId, dataPoints, style, interpolation, label, metadata }, event);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    onItemHover?.({ id, type, laneId, dataPoints, style, interpolation, label, metadata }, event);
  };

  // Generate accessibility label
  const ariaLabel = useMemo(() => {
    return generateItemAriaLabel({ id, type, laneId, dataPoints, style, interpolation, label, metadata });
  }, [id, type, laneId, dataPoints, style, interpolation, label, metadata]);

  if (!timeScale || dataPoints.length < 2) {
    return null;
  }

  return (
    <g
      data-testid="curve-item"
      data-item-id={id}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: onItemClick ? 'pointer' : 'default' }}
      className={`curve-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
    >
      {/* Fill area */}
      {style.fillColor && areaPath && (
        <path
          d={areaPath}
          fill={style.fillColor}
          opacity={style.opacity || 1}
          className="curve-fill"
        />
      )}
      
      {/* Line path */}
      <path
        d={linePath}
        fill="none"
        stroke={style.strokeColor}
        strokeWidth={style.strokeWidth || 2}
        opacity={style.opacity || 1}
        className="curve-line"
      />
      
      {/* Data points (optional, for interaction) */}
      {dataPoints.map((point, index) => {
        // Recreate the effective Y-scale for consistency
        let effectiveYScale = yScale;
        if (!effectiveYScale) {
          const values = dataPoints.map(d => d.value);
          const minValue = Math.min(...values);
          const maxValue = Math.max(...values);
          const valueRange = maxValue - minValue;
          if (valueRange > 0) {
            effectiveYScale = (value: number) => {
              const normalizedValue = (value - minValue) / valueRange;
              return laneHeight - (normalizedValue * laneHeight * 0.8) - (laneHeight * 0.1);
            };
          } else {
            effectiveYScale = () => laneHeight / 2;
          }
        }
        
        return (
          <circle
            key={index}
            cx={timeScale.scale(point.time)}
            cy={effectiveYScale(point.value)}
            r={2}
            fill={style.strokeColor}
            opacity={0}
            className="curve-point"
            style={{ cursor: onItemClick ? 'pointer' : 'default' }}
          />
        );
      })}
      
      {/* Label */}
      {label && (
        <text
          x={timeScale.scale(dataPoints[Math.floor(dataPoints.length / 2)].time)}
          y={label.position === 'top' ? -5 : laneHeight + 15}
          textAnchor="middle"
          fontSize={label.style?.fontSize || 12}
          fill={label.style?.color || '#333'}
          className="curve-label"
        >
          {label.text}
        </text>
      )}
    </g>
  );
};

export default CurveItem;

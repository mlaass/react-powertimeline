/**
 * TimelineAxis Component
 * 
 * Renders a time axis with appropriate tick marks and labels based on the
 * current time range and zoom level. Automatically adjusts granularity.
 */

import React, { useMemo, useRef, useEffect } from 'react';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import { 
  timeSecond, timeMinute, timeHour, timeDay, 
  timeWeek, timeMonth, timeYear 
} from 'd3-time';
import type { TimeRange, TimeScale } from '../../types';
import { useTimeScale } from '../../hooks/useTimeScale';

export interface TimelineAxisProps {
  /** Time range to display */
  timeRange: TimeRange;
  /** Width of the axis */
  width: number;
  /** Height of the axis */
  height: number;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const TimelineAxis: React.FC<TimelineAxisProps> = ({
  timeRange,
  width,
  height,
  className,
  style,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  // Create time scale
  const timeScale = useTimeScale(timeRange, [0, width]);

  // Determine appropriate time interval and format
  const { interval, format } = useMemo(() => {
    const duration = timeRange.end.getTime() - timeRange.start.getTime();
    const targetTicks = Math.max(4, Math.min(12, width / 80)); // 4-12 ticks based on width

    // Choose interval based on duration
    if (duration <= 60 * 1000) { // <= 1 minute
      return { interval: timeSecond.every(10), format: timeFormat('%H:%M:%S') };
    } else if (duration <= 60 * 60 * 1000) { // <= 1 hour
      return { interval: timeMinute.every(5), format: timeFormat('%H:%M') };
    } else if (duration <= 24 * 60 * 60 * 1000) { // <= 1 day
      return { interval: timeHour.every(2), format: timeFormat('%H:%M') };
    } else if (duration <= 7 * 24 * 60 * 60 * 1000) { // <= 1 week
      return { interval: timeDay.every(1), format: timeFormat('%m/%d') };
    } else if (duration <= 30 * 24 * 60 * 60 * 1000) { // <= 1 month
      return { interval: timeDay.every(Math.ceil(duration / (7 * 24 * 60 * 60 * 1000))), format: timeFormat('%m/%d') };
    } else if (duration <= 365 * 24 * 60 * 60 * 1000) { // <= 1 year
      return { interval: timeWeek.every(1), format: timeFormat('%m/%d') };
    } else {
      return { interval: timeMonth.every(1), format: timeFormat('%b %Y') };
    }
  }, [timeRange, width]);

  // Render axis using D3
  useEffect(() => {
    if (!gRef.current || !interval) return;

    const axis = axisBottom(timeScale.scale)
      .ticks(interval)
      .tickFormat(format as any);

    select(gRef.current)
      .call(axis)
      .selectAll('text')
      .attr('data-testid', 'time-label')
      .style('font-size', '12px')
      .style('fill', '#666');

    // Style the axis
    select(gRef.current)
      .selectAll('.domain')
      .style('stroke', '#ccc');

    select(gRef.current)
      .selectAll('.tick line')
      .style('stroke', '#ccc');

  }, [timeScale, interval, format]);

  return (
    <svg
      ref={svgRef}
      data-testid="timeline-axis"
      width={width}
      height={height}
      className={className}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        ...style,
      }}
      role="img"
      aria-label={`Timeline axis showing time from ${timeRange.start.toLocaleString()} to ${timeRange.end.toLocaleString()}`}
    >
      <g
        ref={gRef}
        transform={`translate(0, 0)`}
      />
    </svg>
  );
};

export default TimelineAxis;

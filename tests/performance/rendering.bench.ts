/**
 * Performance Benchmarks for Rendering
 * 
 * Tests rendering performance with various dataset sizes and configurations.
 * Target: <100ms initial render for 10k+ data points, 60fps interactions.
 */

import { bench, describe } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Helper to generate test data
function generateTestData(itemCount: number) {
  const lanes: Lane[] = [
    { id: 'metrics', height: 100, label: 'Metrics' },
    { id: 'events', height: 60, label: 'Events' },
    { id: 'ranges', height: 40, label: 'Ranges' },
  ];

  const items: (CurveItem | EventItem | TimeRangeItem)[] = [];
  const startTime = new Date('2024-01-01T00:00:00Z');

  for (let i = 0; i < itemCount; i++) {
    const time = new Date(startTime.getTime() + i * 60000); // 1 minute intervals
    
    if (i % 3 === 0) {
      // Curve items
      items.push({
        id: `curve-${i}`,
        type: 'curve',
        laneId: 'metrics',
        dataPoints: [
          { time, value: Math.random() * 100 },
          { time: new Date(time.getTime() + 30000), value: Math.random() * 100 },
        ],
        style: { strokeColor: '#007bff', strokeWidth: 2 },
      } as CurveItem);
    } else if (i % 3 === 1) {
      // Event items
      items.push({
        id: `event-${i}`,
        type: 'event',
        laneId: 'events',
        time,
        style: { markerType: 'circle', color: '#dc3545', size: 8 },
      } as EventItem);
    } else {
      // Time range items
      items.push({
        id: `range-${i}`,
        type: 'time-range',
        laneId: 'ranges',
        startTime: time,
        endTime: new Date(time.getTime() + 300000), // 5 minutes
        style: { backgroundColor: '#28a745', opacity: 0.7 },
      } as TimeRangeItem);
    }
  }

  const timeRange: TimeRange = {
    start: startTime,
    end: new Date(startTime.getTime() + itemCount * 60000),
  };

  return { lanes, items, timeRange };
}

describe('Rendering Performance Benchmarks', () => {
  bench('Render 100 items', () => {
    const { lanes, items, timeRange } = generateTestData(100);
    render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );
  });

  bench('Render 1,000 items', () => {
    const { lanes, items, timeRange } = generateTestData(1000);
    render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );
  });

  bench('Render 10,000 items (target performance)', () => {
    const { lanes, items, timeRange } = generateTestData(10000);
    render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );
  });

  bench('Render with virtualization enabled', () => {
    const { lanes, items, timeRange } = generateTestData(5000);
    render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
        bufferZone: 0.5, // Enable virtualization
      })
    );
  });

  bench('Re-render with new time range (pan simulation)', () => {
    const { lanes, items, timeRange } = generateTestData(1000);
    const { rerender } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );

    // Simulate pan by changing time range
    const newTimeRange: TimeRange = {
      start: new Date(timeRange.start.getTime() + 300000), // Pan 5 minutes
      end: new Date(timeRange.end.getTime() + 300000),
    };

    rerender(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: newTimeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );
  });

  bench('Re-render with zoom (scale change)', () => {
    const { lanes, items, timeRange } = generateTestData(1000);
    const { rerender } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );

    // Simulate zoom by changing time range duration
    const duration = timeRange.end.getTime() - timeRange.start.getTime();
    const newTimeRange: TimeRange = {
      start: timeRange.start,
      end: new Date(timeRange.start.getTime() + duration / 2), // Zoom in 2x
    };

    rerender(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: newTimeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );
  });
});

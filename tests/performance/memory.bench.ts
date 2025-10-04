/**
 * Performance Benchmarks for Memory Usage
 * 
 * Tests memory consumption and garbage collection behavior.
 * Target: <50MB memory usage for large datasets.
 */

import { bench, describe } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Helper to measure memory usage (approximation)
function measureMemory(): number {
  if (typeof performance !== 'undefined' && 'memory' in performance) {
    return (performance as any).memory.usedJSHeapSize;
  }
  return 0; // Fallback for environments without memory API
}

// Helper to generate large datasets
function generateLargeDataset(itemCount: number) {
  const lanes: Lane[] = Array.from({ length: 10 }, (_, i) => ({
    id: `lane-${i}`,
    height: 80,
    label: `Lane ${i}`,
  }));

  const items: (CurveItem | EventItem | TimeRangeItem)[] = [];
  const startTime = new Date('2024-01-01T00:00:00Z');

  for (let i = 0; i < itemCount; i++) {
    const time = new Date(startTime.getTime() + i * 10000); // 10 second intervals
    const laneId = `lane-${i % 10}`;
    
    if (i % 4 === 0) {
      // Curve items with multiple data points
      const dataPoints = Array.from({ length: 20 }, (_, j) => ({
        time: new Date(time.getTime() + j * 1000),
        value: Math.sin(j * 0.1) * 50 + 50,
      }));
      
      items.push({
        id: `curve-${i}`,
        type: 'curve',
        laneId,
        dataPoints,
        style: { strokeColor: `hsl(${i % 360}, 70%, 50%)`, strokeWidth: 2 },
      } as CurveItem);
    } else if (i % 4 === 1) {
      // Event items
      items.push({
        id: `event-${i}`,
        type: 'event',
        laneId,
        time,
        style: { markerType: 'circle', color: `hsl(${i % 360}, 70%, 50%)`, size: 6 },
        metadata: { category: 'test', severity: i % 3, source: `source-${i % 5}` },
      } as EventItem);
    } else {
      // Time range items
      items.push({
        id: `range-${i}`,
        type: 'time-range',
        laneId,
        startTime: time,
        endTime: new Date(time.getTime() + 60000 + Math.random() * 300000),
        style: { backgroundColor: `hsla(${i % 360}, 70%, 50%, 0.6)` },
        metadata: { type: 'process', duration: Math.random() * 300 },
      } as TimeRangeItem);
    }
  }

  const timeRange: TimeRange = {
    start: startTime,
    end: new Date(startTime.getTime() + itemCount * 10000),
  };

  return { lanes, items, timeRange };
}

describe('Memory Usage Benchmarks', () => {
  bench('Memory usage with 1,000 items', () => {
    const memoryBefore = measureMemory();
    const { lanes, items, timeRange } = generateLargeDataset(1000);
    
    const { unmount } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 1200,
        height: 600,
      })
    );

    const memoryAfter = measureMemory();
    const memoryUsed = memoryAfter - memoryBefore;
    
    // Log memory usage for monitoring
    console.log(`Memory used for 1,000 items: ${(memoryUsed / 1024 / 1024).toFixed(2)} MB`);
    
    unmount();
    cleanup();
  });

  bench('Memory usage with 10,000 items', () => {
    const memoryBefore = measureMemory();
    const { lanes, items, timeRange } = generateLargeDataset(10000);
    
    const { unmount } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 1200,
        height: 600,
        bufferZone: 0.3, // Enable aggressive virtualization
      })
    );

    const memoryAfter = measureMemory();
    const memoryUsed = memoryAfter - memoryBefore;
    
    // Log memory usage for monitoring (should be <50MB)
    console.log(`Memory used for 10,000 items: ${(memoryUsed / 1024 / 1024).toFixed(2)} MB`);
    
    unmount();
    cleanup();
  });

  bench('Memory cleanup after unmount', () => {
    const { lanes, items, timeRange } = generateLargeDataset(5000);
    
    const memoryBefore = measureMemory();
    
    // Render and immediately unmount multiple times
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(
        React.createElement(PowerTimeline, {
          lanes,
          items,
          initialTimeRange: timeRange,
          onViewChange: () => {},
          width: 800,
          height: 400,
        })
      );
      unmount();
    }
    
    cleanup();
    
    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }
    
    const memoryAfter = measureMemory();
    const memoryDiff = memoryAfter - memoryBefore;
    
    console.log(`Memory difference after cleanup: ${(memoryDiff / 1024 / 1024).toFixed(2)} MB`);
  });

  bench('Virtualization memory efficiency', () => {
    const { lanes, items, timeRange } = generateLargeDataset(20000);
    
    const memoryBefore = measureMemory();
    
    // Render with small viewport (should virtualize most items)
    const smallTimeRange: TimeRange = {
      start: timeRange.start,
      end: new Date(timeRange.start.getTime() + 3600000), // 1 hour window
    };
    
    const { unmount } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: smallTimeRange,
        onViewChange: () => {},
        width: 800,
        height: 400,
        bufferZone: 0.1, // Minimal buffer for maximum virtualization
      })
    );

    const memoryAfter = measureMemory();
    const memoryUsed = memoryAfter - memoryBefore;
    
    console.log(`Memory used with virtualization (20k items, 1h window): ${(memoryUsed / 1024 / 1024).toFixed(2)} MB`);
    
    unmount();
    cleanup();
  });

  bench('Memory usage with frequent updates', () => {
    const { lanes, items, timeRange } = generateLargeDataset(2000);
    
    const memoryBefore = measureMemory();
    
    const { rerender, unmount } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 400,
      })
    );

    // Simulate frequent pan operations
    const duration = timeRange.end.getTime() - timeRange.start.getTime();
    const panStep = duration * 0.1;
    
    for (let i = 0; i < 10; i++) {
      const newTimeRange: TimeRange = {
        start: new Date(timeRange.start.getTime() + i * panStep),
        end: new Date(timeRange.end.getTime() + i * panStep),
      };
      
      rerender(
        React.createElement(PowerTimeline, {
          lanes,
          items,
          initialTimeRange: newTimeRange,
          onViewChange: () => {},
          width: 800,
          height: 400,
        })
      );
    }

    const memoryAfter = measureMemory();
    const memoryUsed = memoryAfter - memoryBefore;
    
    console.log(`Memory used with frequent updates: ${(memoryUsed / 1024 / 1024).toFixed(2)} MB`);
    
    unmount();
    cleanup();
  });
});

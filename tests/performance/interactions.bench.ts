/**
 * Performance Benchmarks for Interactions
 * 
 * Tests interaction performance including pan, zoom, hover, and click operations.
 * Target: 60fps interactions, smooth user experience.
 */

import { bench, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Helper to generate interactive test data
function generateInteractiveData(itemCount: number) {
  const lanes: Lane[] = [
    { id: 'lane1', height: 100, label: 'Interactive Lane 1' },
    { id: 'lane2', height: 80, label: 'Interactive Lane 2' },
    { id: 'lane3', height: 60, label: 'Interactive Lane 3' },
  ];

  const items: (CurveItem | EventItem | TimeRangeItem)[] = [];
  const startTime = new Date('2024-01-01T00:00:00Z');

  for (let i = 0; i < itemCount; i++) {
    const time = new Date(startTime.getTime() + i * 30000); // 30 second intervals
    const laneId = lanes[i % 3].id;
    
    if (i % 3 === 0) {
      // Interactive curve items
      items.push({
        id: `curve-${i}`,
        type: 'curve',
        laneId,
        dataPoints: Array.from({ length: 10 }, (_, j) => ({
          time: new Date(time.getTime() + j * 3000),
          value: Math.random() * 100,
        })),
        style: { strokeColor: '#007bff', strokeWidth: 2 },
        label: { text: `Curve ${i}`, position: 'top' },
      } as CurveItem);
    } else if (i % 3 === 1) {
      // Interactive event items
      items.push({
        id: `event-${i}`,
        type: 'event',
        laneId,
        time,
        style: { markerType: 'circle', color: '#dc3545', size: 8 },
        label: { text: `Event ${i}`, position: 'top' },
        metadata: { clickable: true, category: 'interactive' },
      } as EventItem);
    } else {
      // Interactive time range items
      items.push({
        id: `range-${i}`,
        type: 'time-range',
        laneId,
        startTime: time,
        endTime: new Date(time.getTime() + 120000), // 2 minutes
        style: { backgroundColor: '#28a745', opacity: 0.7 },
        label: { text: `Range ${i}`, position: 'inline' },
        metadata: { resizable: true, type: 'interactive' },
      } as TimeRangeItem);
    }
  }

  const timeRange: TimeRange = {
    start: startTime,
    end: new Date(startTime.getTime() + itemCount * 30000),
  };

  return { lanes, items, timeRange };
}

describe('Interaction Performance Benchmarks', () => {
  bench('Mouse wheel zoom performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(1000);
    
    const { container } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    
    // Simulate multiple zoom operations
    for (let i = 0; i < 10; i++) {
      fireEvent.wheel(timeline!, { 
        deltaY: i % 2 === 0 ? -100 : 100, // Alternate zoom in/out
        clientX: 400 + i * 10, // Different cursor positions
        clientY: 150,
      });
    }
  });

  bench('Mouse drag pan performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(1000);
    
    const { container } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    
    // Simulate drag pan operation
    fireEvent.mouseDown(timeline!, { clientX: 100, clientY: 150 });
    
    // Simulate smooth drag with multiple move events
    for (let i = 0; i < 20; i++) {
      fireEvent.mouseMove(timeline!, { 
        clientX: 100 + i * 10, 
        clientY: 150,
      });
    }
    
    fireEvent.mouseUp(timeline!, { clientX: 300, clientY: 150 });
  });

  bench('Item hover performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(500);
    let hoverCount = 0;
    
    const { container } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        onItemHover: () => { hoverCount++; },
        width: 800,
        height: 300,
      })
    );

    // Find all interactive elements
    const interactiveElements = container.querySelectorAll('[data-testid*="item"]');
    
    // Simulate hovering over multiple items
    interactiveElements.forEach((element, index) => {
      if (index < 50) { // Limit to first 50 items for performance
        fireEvent.mouseEnter(element);
        fireEvent.mouseLeave(element);
      }
    });
    
    console.log(`Hover events triggered: ${hoverCount}`);
  });

  bench('Item click performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(500);
    let clickCount = 0;
    
    const { container } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        onItemClick: () => { clickCount++; },
        width: 800,
        height: 300,
      })
    );

    // Find all clickable elements
    const clickableElements = container.querySelectorAll('[data-testid*="item"]');
    
    // Simulate clicking multiple items rapidly
    clickableElements.forEach((element, index) => {
      if (index < 25) { // Limit to first 25 items
        fireEvent.click(element);
      }
    });
    
    console.log(`Click events triggered: ${clickCount}`);
  });

  bench('Keyboard navigation performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(1000);
    
    const { container } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    
    // Simulate keyboard navigation
    const keyEvents = [
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      '+', '-', '0', // Zoom controls
      'Home', 'End', // Navigation
    ];
    
    keyEvents.forEach(key => {
      for (let i = 0; i < 5; i++) {
        fireEvent.keyDown(timeline!, { key });
        fireEvent.keyUp(timeline!, { key });
      }
    });
  });

  bench('Touch gesture performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(800);
    
    const { container } = render(
      React.createElement(PowerTimeline, {
        lanes,
        items,
        initialTimeRange: timeRange,
        onViewChange: () => {},
        width: 800,
        height: 300,
      })
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    
    // Simulate pinch-to-zoom gesture
    const touch1 = { identifier: 1, clientX: 300, clientY: 150 };
    const touch2 = { identifier: 2, clientX: 500, clientY: 150 };
    
    fireEvent.touchStart(timeline!, { 
      touches: [touch1, touch2],
      changedTouches: [touch1, touch2],
    });
    
    // Simulate pinch gesture (moving touches apart)
    for (let i = 0; i < 10; i++) {
      const newTouch1 = { ...touch1, clientX: 300 - i * 5 };
      const newTouch2 = { ...touch2, clientX: 500 + i * 5 };
      
      fireEvent.touchMove(timeline!, { 
        touches: [newTouch1, newTouch2],
        changedTouches: [newTouch1, newTouch2],
      });
    }
    
    fireEvent.touchEnd(timeline!, { 
      touches: [],
      changedTouches: [touch1, touch2],
    });
  });

  bench('Viewport change performance', () => {
    const { lanes, items, timeRange } = generateInteractiveData(2000);
    
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

    // Simulate rapid viewport changes (like during smooth pan/zoom)
    const duration = timeRange.end.getTime() - timeRange.start.getTime();
    
    for (let i = 0; i < 30; i++) {
      const scale = 1 + (i * 0.1); // Gradual zoom
      const offset = i * duration * 0.02; // Gradual pan
      
      const newTimeRange: TimeRange = {
        start: new Date(timeRange.start.getTime() + offset),
        end: new Date(timeRange.start.getTime() + offset + duration / scale),
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
    }
  });
});

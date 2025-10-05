/**
 * Basic Timeline Example
 *
 * Demonstrates basic usage of PowerTimeline with simple data.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Helper function to generate sin/cos curves
function generateMathCurve(
  startTime: Date,
  endTime: Date,
  points: number,
  amplitude: number,
  frequency: number,
  phase: number,
  offset: number,
  type: 'sin' | 'cos' = 'sin'
) {
  const timeSpan = endTime.getTime() - startTime.getTime();
  const dataPoints: { time: Date; value: number }[] = [];

  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const time = new Date(startTime.getTime() + progress * timeSpan);

    // Calculate the mathematical function value
    const x = progress * frequency * 2 * Math.PI + phase;
    const rawValue = type === 'sin' ? Math.sin(x) : Math.cos(x);
    const value = amplitude * rawValue + offset;

    dataPoints.push({ time, value });
  }

  return dataPoints;
}

// Sample data for basic timeline
const lanes: Lane[] = [
  {
    id: 'events',
    height: 60,
    label: 'System Events',
    style: { backgroundColor: '#fff3cd' },
  },
  {
    id: 'metrics',
    height: 100,
    label: 'Performance Metrics',
    style: { backgroundColor: '#d1ecf1' },
  },
  {
    id: 'deployments',
    height: 40,
    label: 'Deployments',
    style: { backgroundColor: '#d4edda' },
  },
];

// Generate sample items
const items: (CurveItem | EventItem | TimeRangeItem)[] = [
  // System Events
  {
    id: 'startup',
    type: 'event',
    laneId: 'events',
    time: new Date('2024-01-01T09:00:00Z'),
    style: { markerType: 'circle', color: '#28a745', size: 10 },
    label: { text: 'System Startup', position: 'top' },
  },
  {
    id: 'error',
    type: 'event',
    laneId: 'events',
    time: new Date('2024-01-01T11:30:00Z'),
    style: { markerType: 'triangle', color: '#dc3545', size: 12 },
    label: { text: 'Error Detected', position: 'top' },
  },
  {
    id: 'maintenance',
    type: 'event',
    laneId: 'events',
    time: new Date('2024-01-01T14:00:00Z'),
    style: { markerType: 'square', color: '#ffc107', size: 8 },
    label: { text: 'Maintenance', position: 'top' },
  },

  // Sine wave - CPU Usage pattern
  {
    id: 'cpu-usage',
    type: 'curve',
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      new Date('2024-01-01T08:00:00Z'),
      new Date('2024-01-01T16:00:00Z'),
      40, // points
      30, // amplitude
      2, // frequency (2 cycles over 8 hours)
      0, // phase
      50 // offset (centers around 50%)
    ),
    style: {
      strokeColor: '#007bff',
      strokeWidth: 2,
      fillColor: 'rgba(0, 123, 255, 0.15)',
    },
    interpolation: 'linear',
    label: { text: 'CPU Usage % (sin)', position: 'top' },
  },

  // Cosine wave - Memory Usage pattern
  {
    id: 'memory-usage',
    type: 'curve',
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      new Date('2024-01-01T08:00:00Z'),
      new Date('2024-01-01T16:00:00Z'),
      35, // points
      20, // amplitude
      1.5, // frequency (1.5 cycles)
      Math.PI / 3, // 60-degree phase shift
      60, // offset (centers around 60%)
      'cos'
    ),
    style: {
      strokeColor: '#28a745',
      strokeWidth: 2.5,
      fillColor: 'rgba(40, 167, 69, 0.1)',
    },
    interpolation: 'linear',
    label: { text: 'Memory % (cos)', position: 'bottom' },
  },

  // High frequency sine - Network Throughput
  {
    id: 'network-throughput',
    type: 'curve',
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      new Date('2024-01-01T08:00:00Z'),
      new Date('2024-01-01T16:00:00Z'),
      60, // more points for high frequency
      15, // amplitude
      3, // frequency (3 cycles - higher frequency)
      Math.PI / 4, // 45-degree phase shift
      25 // offset
    ),
    style: {
      strokeColor: '#fd7e14',
      strokeWidth: 2,
    },
    interpolation: 'linear',
    label: { text: 'Network MB/s (sin, high freq)', position: 'top' },
  },

  // Deployments
  {
    id: 'deploy-v1',
    type: 'time-range',
    laneId: 'deployments',
    startTime: new Date('2024-01-01T10:00:00Z'),
    endTime: new Date('2024-01-01T10:15:00Z'),
    style: {
      backgroundColor: '#28a745',
      opacity: 0.8,
    },
    label: { text: 'v1.2.0 Deploy', position: 'inline' },
  },
  {
    id: 'deploy-hotfix',
    type: 'time-range',
    laneId: 'deployments',
    startTime: new Date('2024-01-01T12:00:00Z'),
    endTime: new Date('2024-01-01T12:05:00Z'),
    style: {
      backgroundColor: '#ffc107',
      opacity: 0.8,
    },
    label: { text: 'Hotfix Deploy', position: 'inline' },
  },
  {
    id: 'deploy-v2',
    type: 'time-range',
    laneId: 'deployments',
    startTime: new Date('2024-01-01T15:30:00Z'),
    endTime: new Date('2024-01-01T15:45:00Z'),
    style: {
      backgroundColor: '#17a2b8',
      opacity: 0.8,
    },
    label: { text: 'v2.0.0 Deploy', position: 'inline' },
  },
];

const initialTimeRange: TimeRange = {
  start: new Date('2024-01-01T08:00:00Z'),
  end: new Date('2024-01-01T16:00:00Z'),
};

function BasicTimelineExample() {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [currentTimeRange, setCurrentTimeRange] = React.useState<TimeRange>(initialTimeRange);

  const handleViewChange = (newTimeRange: TimeRange) => {
    setCurrentTimeRange(newTimeRange);
  };

  const handleItemClick = (item: any, event: React.MouseEvent) => {
    setSelectedItem(item);
    console.log('Item clicked:', item);
  };

  const handleItemHover = (item: any, event: React.MouseEvent) => {
    //console.log('Item hovered:', item);
  };

  return (
    <div>
      <PowerTimeline
        lanes={lanes}
        items={items}
        initialTimeRange={currentTimeRange}
        onViewChange={handleViewChange}
        onItemClick={handleItemClick}
        onItemHover={handleItemHover}
        width={800}
        height={300}
        ariaLabel="Basic system timeline showing events, metrics, and deployments"
      />

      {selectedItem && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>Selected Item:</strong> {selectedItem.id} ({selectedItem.type})
          {selectedItem.label && <span> - {selectedItem.label.text}</span>}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('timeline-root')!).render(
  <React.StrictMode>
    <BasicTimelineExample />
  </React.StrictMode>
);

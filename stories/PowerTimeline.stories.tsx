import type { Meta, StoryObj } from '@storybook/react';
import { PowerTimeline } from '../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../src/types';

const meta: Meta<typeof PowerTimeline> = {
  title: 'Components/PowerTimeline',
  component: PowerTimeline,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'PowerTimeline is a high-performance, interactive React component for visualizing multi-layered time-series data.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 300, max: 1600, step: 50 },
      description: 'Width of the timeline component',
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: 'Height of the timeline component',
    },
    bufferZone: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Buffer zone for virtualization (0.5 = 50% extra items rendered)',
    },
    onViewChange: { action: 'view-changed' },
    onItemClick: { action: 'item-clicked' },
    onItemHover: { action: 'item-hovered' },
  },
};

export default meta;
type Story = StoryObj<typeof PowerTimeline>;

// Sample data
const sampleLanes: Lane[] = [
  {
    id: 'metrics',
    height: 100,
    label: 'Performance Metrics',
    style: { backgroundColor: '#f8f9fa' },
  },
  {
    id: 'events',
    height: 60,
    label: 'System Events',
    style: { backgroundColor: '#e9ecef' },
  },
  {
    id: 'deployments',
    height: 40,
    label: 'Deployments',
    style: { backgroundColor: '#dee2e6' },
  },
];

const sampleItems = [
  // Curve items
  {
    id: 'cpu-usage',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: [
      { time: new Date('2024-01-01T00:00:00Z'), value: 45 },
      { time: new Date('2024-01-01T01:00:00Z'), value: 52 },
      { time: new Date('2024-01-01T02:00:00Z'), value: 38 },
      { time: new Date('2024-01-01T03:00:00Z'), value: 67 },
      { time: new Date('2024-01-01T04:00:00Z'), value: 41 },
    ],
    style: {
      strokeColor: '#007bff',
      strokeWidth: 2,
      fillColor: 'rgba(0, 123, 255, 0.1)',
    },
    label: { text: 'CPU Usage %', position: 'top' as const },
  } as CurveItem,
  
  {
    id: 'memory-usage',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: [
      { time: new Date('2024-01-01T00:00:00Z'), value: 65 },
      { time: new Date('2024-01-01T01:00:00Z'), value: 72 },
      { time: new Date('2024-01-01T02:00:00Z'), value: 68 },
      { time: new Date('2024-01-01T03:00:00Z'), value: 85 },
      { time: new Date('2024-01-01T04:00:00Z'), value: 71 },
    ],
    style: {
      strokeColor: '#28a745',
      strokeWidth: 2,
      fillColor: 'rgba(40, 167, 69, 0.1)',
    },
    label: { text: 'Memory Usage %', position: 'top' as const },
  } as CurveItem,

  // Event items
  {
    id: 'error-spike',
    type: 'event' as const,
    laneId: 'events',
    time: new Date('2024-01-01T01:30:00Z'),
    style: {
      markerType: 'circle' as const,
      color: '#dc3545',
      size: 10,
    },
    label: { text: 'Error Spike', position: 'top' as const },
  } as EventItem,

  {
    id: 'alert-resolved',
    type: 'event' as const,
    laneId: 'events',
    time: new Date('2024-01-01T03:15:00Z'),
    style: {
      markerType: 'triangle' as const,
      color: '#28a745',
      size: 8,
    },
    label: { text: 'Alert Resolved', position: 'top' as const },
  } as EventItem,

  // Time range items
  {
    id: 'deployment-1',
    type: 'time-range' as const,
    laneId: 'deployments',
    startTime: new Date('2024-01-01T02:00:00Z'),
    endTime: new Date('2024-01-01T02:15:00Z'),
    style: {
      backgroundColor: '#28a745',
      opacity: 0.7,
    },
    label: { text: 'v2.1.0 Deploy', position: 'inline' as const },
  } as TimeRangeItem,

  {
    id: 'maintenance',
    type: 'time-range' as const,
    laneId: 'deployments',
    startTime: new Date('2024-01-01T03:30:00Z'),
    endTime: new Date('2024-01-01T04:00:00Z'),
    style: {
      backgroundColor: '#ffc107',
      opacity: 0.6,
    },
    label: { text: 'Maintenance Window', position: 'inline' as const },
  } as TimeRangeItem,
];

const sampleTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

export const Default: Story = {
  args: {
    lanes: sampleLanes,
    items: sampleItems,
    initialTimeRange: sampleTimeRange,
    width: 800,
    height: 300,
    bufferZone: 0.5,
    ariaLabel: 'System performance timeline',
  },
};

export const LargeDataset: Story = {
  args: {
    lanes: sampleLanes,
    items: generateLargeDataset(1000),
    initialTimeRange: sampleTimeRange,
    width: 1000,
    height: 400,
    bufferZone: 0.3,
    ariaLabel: 'Large dataset timeline with 1000 items',
  },
};

export const SingleLane: Story = {
  args: {
    lanes: [sampleLanes[0]],
    items: sampleItems.filter(item => item.laneId === 'metrics'),
    initialTimeRange: sampleTimeRange,
    width: 800,
    height: 150,
    bufferZone: 0.5,
    ariaLabel: 'Single lane timeline',
  },
};

export const EventsOnly: Story = {
  args: {
    lanes: [sampleLanes[1]],
    items: sampleItems.filter(item => item.type === 'event'),
    initialTimeRange: sampleTimeRange,
    width: 800,
    height: 100,
    bufferZone: 0.5,
    ariaLabel: 'Events only timeline',
  },
};

export const CurvesOnly: Story = {
  args: {
    lanes: [sampleLanes[0]],
    items: sampleItems.filter(item => item.type === 'curve'),
    initialTimeRange: sampleTimeRange,
    width: 800,
    height: 150,
    bufferZone: 0.5,
    ariaLabel: 'Curves only timeline',
  },
};

export const TimeRangesOnly: Story = {
  args: {
    lanes: [sampleLanes[2]],
    items: sampleItems.filter(item => item.type === 'time-range'),
    initialTimeRange: sampleTimeRange,
    width: 800,
    height: 80,
    bufferZone: 0.5,
    ariaLabel: 'Time ranges only timeline',
  },
};

export const ResponsiveSmall: Story = {
  args: {
    lanes: sampleLanes,
    items: sampleItems,
    initialTimeRange: sampleTimeRange,
    width: 400,
    height: 200,
    bufferZone: 0.5,
    ariaLabel: 'Small responsive timeline',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const ResponsiveLarge: Story = {
  args: {
    lanes: sampleLanes,
    items: sampleItems,
    initialTimeRange: sampleTimeRange,
    width: 1400,
    height: 500,
    bufferZone: 0.7,
    ariaLabel: 'Large responsive timeline',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// Helper function to generate large dataset
function generateLargeDataset(itemCount: number) {
  const items: (CurveItem | EventItem | TimeRangeItem)[] = [];
  const startTime = new Date('2024-01-01T00:00:00Z');
  const timeSpan = 4 * 60 * 60 * 1000; // 4 hours

  for (let i = 0; i < itemCount; i++) {
    const progress = i / itemCount;
    const time = new Date(startTime.getTime() + progress * timeSpan);
    const laneId = sampleLanes[i % sampleLanes.length].id;
    
    if (i % 3 === 0) {
      // Generate curve items
      const dataPoints = Array.from({ length: 5 }, (_, j) => ({
        time: new Date(time.getTime() + j * 60000),
        value: Math.sin(progress * Math.PI * 2 + j * 0.5) * 30 + 50 + Math.random() * 10,
      }));
      
      items.push({
        id: `curve-${i}`,
        type: 'curve',
        laneId,
        dataPoints,
        style: {
          strokeColor: `hsl(${(i * 137.5) % 360}, 70%, 50%)`,
          strokeWidth: 1 + Math.random(),
        },
      } as CurveItem);
    } else if (i % 3 === 1) {
      // Generate event items
      items.push({
        id: `event-${i}`,
        type: 'event',
        laneId,
        time,
        style: {
          markerType: 'circle',
          color: `hsl(${(i * 137.5) % 360}, 70%, 50%)`,
          size: 4 + Math.random() * 4,
        },
      } as EventItem);
    } else {
      // Generate time range items
      const duration = 60000 + Math.random() * 600000; // 1-10 minutes
      const endTime = new Date(time.getTime() + duration);
      
      items.push({
        id: `range-${i}`,
        type: 'time-range',
        laneId,
        startTime: time,
        endTime,
        style: {
          backgroundColor: `hsla(${(i * 137.5) % 360}, 60%, 60%, 0.6)`,
        },
      } as TimeRangeItem);
    }
  }

  return items;
}

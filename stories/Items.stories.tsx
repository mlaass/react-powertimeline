import type { Meta, StoryObj } from '@storybook/react';
import { CurveItem } from '../src/components/items/CurveItem';
import { EventItem } from '../src/components/items/EventItem';
import { TimeRangeItem } from '../src/components/items/TimeRangeItem';
import type { CurveItem as CurveItemType, EventItem as EventItemType, TimeRangeItem as TimeRangeItemType, TimeRange } from '../src/types';

// Meta for CurveItem
const curveItemMeta: Meta<typeof CurveItem> = {
  title: 'Components/Items/CurveItem',
  component: CurveItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CurveItem renders time-series data as curves/lines with optional fill areas.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    height: {
      control: { type: 'number', min: 50, max: 200, step: 10 },
    },
    onClick: { action: 'clicked' },
    onHover: { action: 'hovered' },
  },
};

// Meta for EventItem
const eventItemMeta: Meta<typeof EventItem> = {
  title: 'Components/Items/EventItem',
  component: EventItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'EventItem renders point-in-time events as markers with various shapes and styles.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    height: {
      control: { type: 'number', min: 50, max: 200, step: 10 },
    },
    onClick: { action: 'clicked' },
    onHover: { action: 'hovered' },
  },
};

// Meta for TimeRangeItem
const timeRangeItemMeta: Meta<typeof TimeRangeItem> = {
  title: 'Components/Items/TimeRangeItem',
  component: TimeRangeItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TimeRangeItem renders time spans as rectangular bars with optional labels.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    height: {
      control: { type: 'number', min: 50, max: 200, step: 10 },
    },
    onClick: { action: 'clicked' },
    onHover: { action: 'hovered' },
  },
};

// Sample data
const visibleTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

// CurveItem Stories
type CurveStory = StoryObj<typeof CurveItem>;

const sampleCurveItem: CurveItemType = {
  id: 'curve-1',
  type: 'curve',
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
  label: { text: 'CPU Usage %', position: 'top' },
};

export const BasicCurve: CurveStory = {
  ...curveItemMeta,
  args: {
    item: sampleCurveItem,
    visibleTimeRange,
    width: 600,
    height: 100,
  },
};

export const ThickCurve: CurveStory = {
  ...curveItemMeta,
  args: {
    item: {
      ...sampleCurveItem,
      style: {
        ...sampleCurveItem.style,
        strokeWidth: 4,
      },
    },
    visibleTimeRange,
    width: 600,
    height: 100,
  },
};

export const FilledCurve: CurveStory = {
  ...curveItemMeta,
  args: {
    item: {
      ...sampleCurveItem,
      style: {
        strokeColor: '#28a745',
        strokeWidth: 2,
        fillColor: 'rgba(40, 167, 69, 0.3)',
      },
    },
    visibleTimeRange,
    width: 600,
    height: 100,
  },
};

export const SteppedCurve: CurveStory = {
  ...curveItemMeta,
  args: {
    item: {
      ...sampleCurveItem,
      interpolation: 'step',
      style: {
        strokeColor: '#dc3545',
        strokeWidth: 2,
      },
    },
    visibleTimeRange,
    width: 600,
    height: 100,
  },
};

// EventItem Stories
type EventStory = StoryObj<typeof EventItem>;

const sampleEventItem: EventItemType = {
  id: 'event-1',
  type: 'event',
  laneId: 'events',
  time: new Date('2024-01-01T02:00:00Z'),
  style: {
    markerType: 'circle',
    color: '#dc3545',
    size: 10,
  },
  label: { text: 'Error Event', position: 'top' },
};

export const CircleEvent: EventStory = {
  ...eventItemMeta,
  args: {
    item: sampleEventItem,
    visibleTimeRange,
    width: 600,
    height: 80,
  },
};

export const TriangleEvent: EventStory = {
  ...eventItemMeta,
  args: {
    item: {
      ...sampleEventItem,
      style: {
        markerType: 'triangle',
        color: '#ffc107',
        size: 12,
      },
      label: { text: 'Warning Event', position: 'top' },
    },
    visibleTimeRange,
    width: 600,
    height: 80,
  },
};

export const SquareEvent: EventStory = {
  ...eventItemMeta,
  args: {
    item: {
      ...sampleEventItem,
      style: {
        markerType: 'square',
        color: '#28a745',
        size: 10,
      },
      label: { text: 'Success Event', position: 'top' },
    },
    visibleTimeRange,
    width: 600,
    height: 80,
  },
};

export const DiamondEvent: EventStory = {
  ...eventItemMeta,
  args: {
    item: {
      ...sampleEventItem,
      style: {
        markerType: 'diamond',
        color: '#6f42c1',
        size: 12,
      },
      label: { text: 'Special Event', position: 'top' },
    },
    visibleTimeRange,
    width: 600,
    height: 80,
  },
};

export const LargeEvent: EventStory = {
  ...eventItemMeta,
  args: {
    item: {
      ...sampleEventItem,
      style: {
        markerType: 'circle',
        color: '#fd7e14',
        size: 20,
      },
      label: { text: 'Critical Event', position: 'top' },
    },
    visibleTimeRange,
    width: 600,
    height: 80,
  },
};

// TimeRangeItem Stories
type TimeRangeStory = StoryObj<typeof TimeRangeItem>;

const sampleTimeRangeItem: TimeRangeItemType = {
  id: 'range-1',
  type: 'time-range',
  laneId: 'deployments',
  startTime: new Date('2024-01-01T01:00:00Z'),
  endTime: new Date('2024-01-01T02:30:00Z'),
  style: {
    backgroundColor: '#28a745',
    opacity: 0.7,
  },
  label: { text: 'Deployment', position: 'inline' },
};

export const BasicTimeRange: TimeRangeStory = {
  ...timeRangeItemMeta,
  args: {
    item: sampleTimeRangeItem,
    visibleTimeRange,
    width: 600,
    height: 60,
  },
};

export const ShortTimeRange: TimeRangeStory = {
  ...timeRangeItemMeta,
  args: {
    item: {
      ...sampleTimeRangeItem,
      endTime: new Date('2024-01-01T01:15:00Z'),
      style: {
        backgroundColor: '#dc3545',
        opacity: 0.8,
      },
      label: { text: 'Quick Task', position: 'inline' },
    },
    visibleTimeRange,
    width: 600,
    height: 60,
  },
};

export const LongTimeRange: TimeRangeStory = {
  ...timeRangeItemMeta,
  args: {
    item: {
      ...sampleTimeRangeItem,
      startTime: new Date('2024-01-01T00:30:00Z'),
      endTime: new Date('2024-01-01T03:30:00Z'),
      style: {
        backgroundColor: '#6f42c1',
        opacity: 0.6,
      },
      label: { text: 'Long Process', position: 'inline' },
    },
    visibleTimeRange,
    width: 600,
    height: 60,
  },
};

export const TransparentTimeRange: TimeRangeStory = {
  ...timeRangeItemMeta,
  args: {
    item: {
      ...sampleTimeRangeItem,
      style: {
        backgroundColor: '#17a2b8',
        opacity: 0.3,
      },
      label: { text: 'Background Process', position: 'inline' },
    },
    visibleTimeRange,
    width: 600,
    height: 60,
  },
};

export const StackedTimeRanges: TimeRangeStory = {
  ...timeRangeItemMeta,
  args: {
    item: sampleTimeRangeItem,
    visibleTimeRange,
    width: 600,
    height: 120,
    stackLevel: 1,
  },
};

// Export all metas
export { curveItemMeta as default };
export const EventItemMeta = eventItemMeta;
export const TimeRangeItemMeta = timeRangeItemMeta;

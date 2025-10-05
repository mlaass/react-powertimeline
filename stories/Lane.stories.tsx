import type { Meta, StoryObj } from '@storybook/react';
import { Lane } from '../src/components/Lane';
import type { Lane as LaneType, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../src/types';

const meta: Meta<typeof Lane> = {
  title: 'Components/Lane',
  component: Lane,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Lane component represents a horizontal track in the timeline that contains items of the same category.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 1000, step: 50 },
      description: 'Width of the lane',
    },
    visibleTimeRange: {
      control: false,
      description: 'Currently visible time range',
    },
    onItemClick: { action: 'item-clicked' },
    onItemHover: { action: 'item-hovered' },
  },
};

export default meta;
type Story = StoryObj<typeof Lane>;

// Sample data
const sampleLane: LaneType = {
  id: 'sample-lane',
  height: 100,
  label: 'Sample Lane',
  style: { backgroundColor: '#f8f9fa' },
};

const visibleTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

const curveItems: CurveItem[] = [
  {
    id: 'curve-1',
    type: 'curve',
    laneId: 'sample-lane',
    dataPoints: [
      { time: new Date('2024-01-01T00:00:00Z'), value: 45 },
      { time: new Date('2024-01-01T01:00:00Z'), value: 52 },
      { time: new Date('2024-01-01T02:00:00Z'), value: 38 },
      { time: new Date('2024-01-01T03:00:00Z'), value: 67 },
    ],
    style: {
      strokeColor: '#007bff',
      strokeWidth: 2,
      fillColor: 'rgba(0, 123, 255, 0.1)',
    },
    label: { text: 'CPU Usage', position: 'top' },
  },
];

const eventItems: EventItem[] = [
  {
    id: 'event-1',
    type: 'event',
    laneId: 'sample-lane',
    time: new Date('2024-01-01T01:00:00Z'),
    style: {
      markerType: 'circle',
      color: '#dc3545',
      size: 8,
    },
    label: { text: 'Error', position: 'top' },
  },
  {
    id: 'event-2',
    type: 'event',
    laneId: 'sample-lane',
    time: new Date('2024-01-01T02:30:00Z'),
    style: {
      markerType: 'triangle',
      color: '#28a745',
      size: 10,
    },
    label: { text: 'Success', position: 'top' },
  },
];

const timeRangeItems: TimeRangeItem[] = [
  {
    id: 'range-1',
    type: 'time-range',
    laneId: 'sample-lane',
    startTime: new Date('2024-01-01T01:30:00Z'),
    endTime: new Date('2024-01-01T02:15:00Z'),
    style: {
      backgroundColor: '#28a745',
      opacity: 0.7,
    },
    label: { text: 'Deployment', position: 'inline' },
  },
  {
    id: 'range-2',
    type: 'time-range',
    laneId: 'sample-lane',
    startTime: new Date('2024-01-01T03:00:00Z'),
    endTime: new Date('2024-01-01T03:45:00Z'),
    style: {
      backgroundColor: '#ffc107',
      opacity: 0.6,
    },
    label: { text: 'Maintenance', position: 'inline' },
  },
];

export const WithCurves: Story = {
  args: {
    lane: sampleLane,
    items: curveItems,
    visibleTimeRange,
    width: 800,
  },
};

export const WithEvents: Story = {
  args: {
    lane: {
      ...sampleLane,
      height: 60,
      label: 'Events Lane',
    },
    items: eventItems,
    visibleTimeRange,
    width: 800,
  },
};

export const WithTimeRanges: Story = {
  args: {
    lane: {
      ...sampleLane,
      height: 80,
      label: 'Time Ranges Lane',
    },
    items: timeRangeItems,
    visibleTimeRange,
    width: 800,
  },
};

export const MixedItems: Story = {
  args: {
    lane: {
      ...sampleLane,
      height: 120,
      label: 'Mixed Items Lane',
    },
    items: [...curveItems, ...eventItems, ...timeRangeItems],
    visibleTimeRange,
    width: 800,
  },
};

export const EmptyLane: Story = {
  args: {
    lane: {
      ...sampleLane,
      label: 'Empty Lane',
    },
    items: [],
    visibleTimeRange,
    width: 800,
  },
};

export const CustomStyling: Story = {
  args: {
    lane: {
      ...sampleLane,
      label: 'Custom Styled Lane',
      style: {
        backgroundColor: '#e3f2fd',
        borderTop: '2px solid #1976d2',
        borderBottom: '1px solid #bbdefb',
      },
    },
    items: curveItems,
    visibleTimeRange,
    width: 800,
  },
};

export const TallLane: Story = {
  args: {
    lane: {
      ...sampleLane,
      height: 200,
      label: 'Tall Lane',
    },
    items: [
      ...curveItems,
      {
        id: 'curve-2',
        type: 'curve',
        laneId: 'sample-lane',
        dataPoints: [
          { time: new Date('2024-01-01T00:30:00Z'), value: 25 },
          { time: new Date('2024-01-01T01:30:00Z'), value: 35 },
          { time: new Date('2024-01-01T02:30:00Z'), value: 20 },
          { time: new Date('2024-01-01T03:30:00Z'), value: 45 },
        ],
        style: {
          strokeColor: '#28a745',
          strokeWidth: 2,
          fillColor: 'rgba(40, 167, 69, 0.1)',
        },
        label: { text: 'Memory Usage', position: 'bottom' },
      } as CurveItem,
    ],
    visibleTimeRange,
    width: 800,
  },
};

export const ShortLane: Story = {
  args: {
    lane: {
      ...sampleLane,
      height: 40,
      label: 'Short Lane',
    },
    items: eventItems,
    visibleTimeRange,
    width: 800,
  },
};

export const NarrowTimeRange: Story = {
  args: {
    lane: sampleLane,
    items: [...curveItems, ...eventItems, ...timeRangeItems],
    visibleTimeRange: {
      start: new Date('2024-01-01T01:00:00Z'),
      end: new Date('2024-01-01T02:00:00Z'),
    },
    width: 800,
  },
};

export const WideTimeRange: Story = {
  args: {
    lane: sampleLane,
    items: [...curveItems, ...eventItems, ...timeRangeItems],
    visibleTimeRange: {
      start: new Date('2024-01-01T00:00:00Z'),
      end: new Date('2024-01-01T08:00:00Z'),
    },
    width: 800,
  },
};

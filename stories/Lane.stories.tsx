import type { Meta, StoryObj } from '@storybook/react';
import { Lane } from '../src/components/Lane';
import type { Lane as LaneType, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../src/types';
import { scaleTime } from 'd3-scale';

const meta: Meta<typeof Lane> = {
  title: 'Components/Lane',
  component: Lane,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Lane component represents a horizontal track in the timeline that contains items of the same category.',
      },
    },
  },
  argTypes: {
    onItemClick: { action: 'item-clicked' },
    onItemHover: { action: 'item-hovered' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', border: '1px solid #ddd' }}>
        <Story />
      </div>
    ),
  ],
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

// Create a time scale for positioning items (800px wide)
const createTimeScale = (width: number = 800) => {
  return {
    domain: [visibleTimeRange.start, visibleTimeRange.end] as [Date, Date],
    range: [0, width] as [number, number],
    scale: scaleTime()
      .domain([visibleTimeRange.start, visibleTimeRange.end])
      .range([0, width]),
  };
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
    ...sampleLane,
    items: curveItems,
    timeScale: createTimeScale(800),
  },
};

export const WithEvents: Story = {
  args: {
    ...sampleLane,
    height: 60,
    label: 'Events Lane',
    items: eventItems,
    timeScale: createTimeScale(800),
  },
};

export const WithTimeRanges: Story = {
  args: {
    ...sampleLane,
    height: 80,
    label: 'Time Ranges Lane',
    items: timeRangeItems,
    timeScale: createTimeScale(800),
  },
};

export const MixedItems: Story = {
  args: {
    ...sampleLane,
    height: 120,
    label: 'Mixed Items Lane',
    items: [...curveItems, ...eventItems, ...timeRangeItems],
    timeScale: createTimeScale(800),
  },
};

export const EmptyLane: Story = {
  args: {
    ...sampleLane,
    label: 'Empty Lane',
    items: [],
    timeScale: createTimeScale(800),
  },
};

export const CustomStyling: Story = {
  args: {
    ...sampleLane,
    label: 'Custom Styled Lane',
    style: {
      backgroundColor: '#e3f2fd',
      borderTop: '2px solid #1976d2',
      borderBottom: '1px solid #bbdefb',
    },
    items: curveItems,
    timeScale: createTimeScale(800),
  },
};

export const TallLane: Story = {
  args: {
    ...sampleLane,
    height: 200,
    label: 'Tall Lane',
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
    timeScale: createTimeScale(800),
  },
};

export const ShortLane: Story = {
  args: {
    ...sampleLane,
    height: 40,
    label: 'Short Lane',
    items: eventItems,
    timeScale: createTimeScale(800),
  },
};

export const NarrowTimeRange: Story = {
  args: {
    ...sampleLane,
    items: [...curveItems, ...eventItems, ...timeRangeItems],
    timeScale: {
      domain: [new Date('2024-01-01T01:00:00Z'), new Date('2024-01-01T02:00:00Z')] as [Date, Date],
      range: [0, 800] as [number, number],
      scale: scaleTime()
        .domain([new Date('2024-01-01T01:00:00Z'), new Date('2024-01-01T02:00:00Z')])
        .range([0, 800]),
    },
  },
};

export const WideTimeRange: Story = {
  args: {
    ...sampleLane,
    items: [...curveItems, ...eventItems, ...timeRangeItems],
    timeScale: {
      domain: [new Date('2024-01-01T00:00:00Z'), new Date('2024-01-01T08:00:00Z')] as [Date, Date],
      range: [0, 800] as [number, number],
      scale: scaleTime()
        .domain([new Date('2024-01-01T00:00:00Z'), new Date('2024-01-01T08:00:00Z')])
        .range([0, 800]),
    },
  },
};

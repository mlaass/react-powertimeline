import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CurveItem } from '../src/components/items/CurveItem';
import { EventItem } from '../src/components/items/EventItem';
import { TimeRangeItem } from '../src/components/items/TimeRangeItem';
import type { CurveItem as CurveItemType, EventItem as EventItemType, TimeRangeItem as TimeRangeItemType, TimeRange } from '../src/types';
import { scaleTime } from 'd3-scale';

// Meta for CurveItem
const meta: Meta<typeof CurveItem> = {
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
};

export default meta;

// Sample data
const visibleTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

// Create a time scale for positioning items
const createTimeScale = (width: number = 600) => {
  return {
    domain: [visibleTimeRange.start, visibleTimeRange.end] as [Date, Date],
    range: [0, width] as [number, number],
    scale: scaleTime()
      .domain([visibleTimeRange.start, visibleTimeRange.end])
      .range([0, width]),
  };
};

// Wrapper component to render items in SVG
const ItemWrapper = ({ children, width, height }: { children: React.ReactNode; width: number; height: number }) => (
  <svg width={width} height={height} style={{ border: '1px solid #ddd', background: '#fff' }}>
    {children}
  </svg>
);

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
  render: (args) => (
    <ItemWrapper width={600} height={100}>
      <CurveItem
        {...sampleCurveItem}
        timeScale={createTimeScale(600)}
        laneHeight={100}
      />
    </ItemWrapper>
  ),
};

export const ThickCurve: CurveStory = {
  render: () => (
    <ItemWrapper width={600} height={100}>
      <CurveItem
        {...sampleCurveItem}
        style={{
          ...sampleCurveItem.style,
          strokeWidth: 4,
        }}
        timeScale={createTimeScale(600)}
        laneHeight={100}
      />
    </ItemWrapper>
  ),
};

export const FilledCurve: CurveStory = {
  render: () => (
    <ItemWrapper width={600} height={100}>
      <CurveItem
        {...sampleCurveItem}
        style={{
          strokeColor: '#28a745',
          strokeWidth: 2,
          fillColor: 'rgba(40, 167, 69, 0.3)',
        }}
        timeScale={createTimeScale(600)}
        laneHeight={100}
      />
    </ItemWrapper>
  ),
};

export const SteppedCurve: CurveStory = {
  render: () => (
    <ItemWrapper width={600} height={100}>
      <CurveItem
        {...sampleCurveItem}
        interpolation="step"
        style={{
          strokeColor: '#dc3545',
          strokeWidth: 2,
        }}
        timeScale={createTimeScale(600)}
        laneHeight={100}
      />
    </ItemWrapper>
  ),
};


import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TimeRangeItem } from '../src/components/items/TimeRangeItem';
import type { TimeRangeItem as TimeRangeItemType, TimeRange } from '../src/types';
import { scaleTime } from 'd3-scale';

const meta: Meta<typeof TimeRangeItem> = {
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
};

export default meta;

const visibleTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

const createTimeScale = (width: number = 600) => {
  return {
    domain: [visibleTimeRange.start, visibleTimeRange.end] as [Date, Date],
    range: [0, width] as [number, number],
    scale: scaleTime()
      .domain([visibleTimeRange.start, visibleTimeRange.end])
      .range([0, width]),
  };
};

const ItemWrapper = ({ children, width, height }: { children: React.ReactNode; width: number; height: number }) => (
  <svg width={width} height={height} style={{ border: '1px solid #ddd', background: '#fff' }}>
    {children}
  </svg>
);

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
  render: () => (
    <ItemWrapper width={600} height={60}>
      <TimeRangeItem
        {...sampleTimeRangeItem}
        timeScale={createTimeScale(600)}
        laneHeight={60}
      />
    </ItemWrapper>
  ),
};

export const ShortTimeRange: TimeRangeStory = {
  render: () => (
    <ItemWrapper width={600} height={60}>
      <TimeRangeItem
        {...sampleTimeRangeItem}
        endTime={new Date('2024-01-01T01:15:00Z')}
        style={{
          backgroundColor: '#dc3545',
          opacity: 0.8,
        }}
        label={{ text: 'Quick Task', position: 'inline' }}
        timeScale={createTimeScale(600)}
        laneHeight={60}
      />
    </ItemWrapper>
  ),
};

export const LongTimeRange: TimeRangeStory = {
  render: () => (
    <ItemWrapper width={600} height={60}>
      <TimeRangeItem
        {...sampleTimeRangeItem}
        startTime={new Date('2024-01-01T00:30:00Z')}
        endTime={new Date('2024-01-01T03:30:00Z')}
        style={{
          backgroundColor: '#6f42c1',
          opacity: 0.6,
        }}
        label={{ text: 'Long Process', position: 'inline' }}
        timeScale={createTimeScale(600)}
        laneHeight={60}
      />
    </ItemWrapper>
  ),
};

export const TransparentTimeRange: TimeRangeStory = {
  render: () => (
    <ItemWrapper width={600} height={60}>
      <TimeRangeItem
        {...sampleTimeRangeItem}
        style={{
          backgroundColor: '#17a2b8',
          opacity: 0.3,
        }}
        label={{ text: 'Background Process', position: 'inline' }}
        timeScale={createTimeScale(600)}
        laneHeight={60}
      />
    </ItemWrapper>
  ),
};

export const StackedTimeRanges: TimeRangeStory = {
  render: () => (
    <ItemWrapper width={600} height={120}>
      {/* First time range at stack level 0 */}
      <TimeRangeItem
        id="range-1"
        type="time-range"
        laneId="deployments"
        startTime={new Date('2024-01-01T01:00:00Z')}
        endTime={new Date('2024-01-01T02:30:00Z')}
        style={{
          backgroundColor: '#28a745',
          opacity: 0.7,
        }}
        label={{ text: 'Deployment 1', position: 'inline' }}
        stackLevel={0}
        timeScale={createTimeScale(600)}
        laneHeight={120}
      />
      {/* Second time range at stack level 1 (overlapping) */}
      <TimeRangeItem
        id="range-2"
        type="time-range"
        laneId="deployments"
        startTime={new Date('2024-01-01T01:30:00Z')}
        endTime={new Date('2024-01-01T03:00:00Z')}
        style={{
          backgroundColor: '#dc3545',
          opacity: 0.7,
        }}
        label={{ text: 'Deployment 2', position: 'inline' }}
        stackLevel={1}
        timeScale={createTimeScale(600)}
        laneHeight={120}
      />
      {/* Third time range at stack level 2 (overlapping) */}
      <TimeRangeItem
        id="range-3"
        type="time-range"
        laneId="deployments"
        startTime={new Date('2024-01-01T02:00:00Z')}
        endTime={new Date('2024-01-01T03:30:00Z')}
        style={{
          backgroundColor: '#6f42c1',
          opacity: 0.7,
        }}
        label={{ text: 'Deployment 3', position: 'inline' }}
        stackLevel={2}
        timeScale={createTimeScale(600)}
        laneHeight={120}
      />
    </ItemWrapper>
  ),
};

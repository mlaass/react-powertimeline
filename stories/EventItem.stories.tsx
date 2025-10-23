import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EventItem } from '../src/components/items/EventItem';
import type { EventItem as EventItemType, TimeRange } from '../src/types';
import { scaleTime } from 'd3-scale';

const meta: Meta<typeof EventItem> = {
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
  render: () => (
    <ItemWrapper width={600} height={80}>
      <EventItem
        {...sampleEventItem}
        timeScale={createTimeScale(600)}
        laneHeight={80}
      />
    </ItemWrapper>
  ),
};

export const TriangleEvent: EventStory = {
  render: () => (
    <ItemWrapper width={600} height={80}>
      <EventItem
        {...sampleEventItem}
        style={{
          markerType: 'triangle',
          color: '#ffc107',
          size: 12,
        }}
        label={{ text: 'Warning Event', position: 'top' }}
        timeScale={createTimeScale(600)}
        laneHeight={80}
      />
    </ItemWrapper>
  ),
};

export const SquareEvent: EventStory = {
  render: () => (
    <ItemWrapper width={600} height={80}>
      <EventItem
        {...sampleEventItem}
        style={{
          markerType: 'square',
          color: '#28a745',
          size: 10,
        }}
        label={{ text: 'Success Event', position: 'top' }}
        timeScale={createTimeScale(600)}
        laneHeight={80}
      />
    </ItemWrapper>
  ),
};

export const DiamondEvent: EventStory = {
  render: () => (
    <ItemWrapper width={600} height={80}>
      <EventItem
        {...sampleEventItem}
        style={{
          markerType: 'diamond',
          color: '#6f42c1',
          size: 12,
        }}
        label={{ text: 'Special Event', position: 'top' }}
        timeScale={createTimeScale(600)}
        laneHeight={80}
      />
    </ItemWrapper>
  ),
};

export const LargeEvent: EventStory = {
  render: () => (
    <ItemWrapper width={600} height={80}>
      <EventItem
        {...sampleEventItem}
        style={{
          markerType: 'circle',
          color: '#fd7e14',
          size: 20,
        }}
        label={{ text: 'Critical Event', position: 'top' }}
        timeScale={createTimeScale(600)}
        laneHeight={80}
      />
    </ItemWrapper>
  ),
};

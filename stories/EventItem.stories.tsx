import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { EventItem } from '../src/components/items/EventItem';
import type { EventItem as EventItemType, TimeRange, MarkerType } from '../src/types';
import { scaleTime } from 'd3-scale';

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
  argTypes: {
    style: {
      control: 'object',
      description: 'Style configuration for the marker',
    },
    'style.markerType': {
      control: 'select',
      options: ['circle', 'square', 'triangle', 'diamond', 'line', 'custom', 'icon', 'image', 'svg'],
      description: 'Type of marker to display',
    },
    'style.color': {
      control: 'color',
      description: 'Color of the marker',
    },
    'style.size': {
      control: { type: 'range', min: 4, max: 30, step: 1 },
      description: 'Size of the marker in pixels',
    },
    'style.strokeWidth': {
      control: { type: 'range', min: 1, max: 5, step: 0.5 },
      description: 'Stroke width for marker outline',
    },
    label: {
      control: 'object',
      description: 'Label configuration',
    },
  },
  decorators: [
    (Story) => (
      <ItemWrapper width={600} height={80}>
        <Story />
      </ItemWrapper>
    ),
  ],
};

export default meta;

type EventStory = StoryObj<typeof EventItem>;

const baseArgs = {
  id: 'event-1',
  type: 'event' as const,
  laneId: 'events',
  time: new Date('2024-01-01T02:00:00Z'),
  timeScale: createTimeScale(600),
  laneHeight: 80,
};

export const Circle: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'circle',
      color: '#dc3545',
      size: 10,
      strokeWidth: 2,
    },
    label: { text: 'Circle Event', position: 'top' },
  },
};

export const Triangle: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'triangle',
      color: '#ffc107',
      size: 12,
      strokeWidth: 2,
    },
    label: { text: 'Warning Event', position: 'top' },
  },
};

export const Square: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'square',
      color: '#28a745',
      size: 10,
      strokeWidth: 2,
    },
    label: { text: 'Success Event', position: 'top' },
  },
};

export const Diamond: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'diamond',
      color: '#6f42c1',
      size: 12,
      strokeWidth: 2,
    },
    label: { text: 'Special Event', position: 'top' },
  },
};

export const Line: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'line',
      color: '#17a2b8',
      size: 10,
      strokeWidth: 2,
    },
    label: { text: 'Timeline Marker', position: 'top' },
  },
};

export const Large: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'circle',
      color: '#fd7e14',
      size: 20,
      strokeWidth: 3,
    },
    label: { text: 'Critical Event', position: 'top' },
  },
};

export const Image: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'image',
      color: '#007bff',
      size: 12,
      imageUrl: 'https://api.iconify.design/mdi/alert.svg?color=%23dc3545',
    },
    label: { text: 'Image Event', position: 'top' },
  },
};

export const CustomSvg: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'svg',
      color: '#28a745',
      size: 12,
      customElement: (
        <g>
          {/* Custom star icon */}
          <path
            d="M 0,-10 L 2.5,-3 L 10,-3 L 4,2 L 6.5,10 L 0,5 L -6.5,10 L -4,2 L -10,-3 L -2.5,-3 Z"
            fill="#ffc107"
            stroke="#ff9800"
            strokeWidth="1"
          />
        </g>
      ),
    },
    label: { text: 'Custom SVG', position: 'top' },
  },
};

export const Emoji: EventStory = {
  args: {
    ...baseArgs,
    style: {
      markerType: 'svg',
      color: '#17a2b8',
      size: 12,
      customElement: (
        <text
          fontSize="20"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          🚀
        </text>
      ),
    },
    label: { text: 'Emoji Event', position: 'top' },
  },
};

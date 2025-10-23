import type { Meta, StoryObj } from '@storybook/react-vite';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

const meta: Meta<typeof PowerTimeline> = {
  title: 'Accessibility/PowerTimeline',
  component: PowerTimeline,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Accessibility-focused examples demonstrating WCAG 2.1 AA compliance, keyboard navigation, and screen reader support.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the timeline',
    },
    ariaDescription: {
      control: 'text',
      description: 'Detailed description for screen readers',
    },
    onViewChange: { action: 'view-changed' },
    onItemClick: { action: 'item-clicked' },
    onItemHover: { action: 'item-hovered' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
};

export default meta;
type Story = StoryObj<typeof PowerTimeline>;

// High contrast accessible lanes
const accessibleLanes: Lane[] = [
  {
    id: 'system-metrics',
    height: 100,
    label: 'System Performance Metrics',
    style: { 
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #000000',
    },
    ariaLabel: 'System performance metrics lane containing CPU and memory usage data',
  },
  {
    id: 'system-events',
    height: 80,
    label: 'System Events and Alerts',
    style: { 
      backgroundColor: '#f8f9fa',
      borderBottom: '2px solid #000000',
    },
    ariaLabel: 'System events lane containing error alerts and status changes',
  },
  {
    id: 'deployments',
    height: 60,
    label: 'Deployment Activities',
    style: { 
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #000000',
    },
    ariaLabel: 'Deployment activities lane showing release and maintenance windows',
  },
];

// High contrast accessible items
const accessibleItems = [
  // High contrast curve items
  {
    id: 'cpu-usage-accessible',
    type: 'curve' as const,
    laneId: 'system-metrics',
    dataPoints: [
      { time: new Date('2024-01-01T00:00:00Z'), value: 25 },
      { time: new Date('2024-01-01T01:00:00Z'), value: 45 },
      { time: new Date('2024-01-01T02:00:00Z'), value: 35 },
      { time: new Date('2024-01-01T03:00:00Z'), value: 65 },
      { time: new Date('2024-01-01T04:00:00Z'), value: 40 },
    ],
    style: {
      strokeColor: '#000000',
      strokeWidth: 3,
      fillColor: 'rgba(0, 0, 0, 0.1)',
    },
    label: { 
      text: 'CPU Usage Percentage', 
      position: 'top' as const,
    },
    ariaLabel: 'CPU usage curve showing values from 25% to 65% over 4 hours',
    ariaDescription: 'CPU usage started at 25%, peaked at 65% at 3 AM, and ended at 40%',
  } as CurveItem,

  {
    id: 'memory-usage-accessible',
    type: 'curve' as const,
    laneId: 'system-metrics',
    dataPoints: [
      { time: new Date('2024-01-01T00:00:00Z'), value: 60 },
      { time: new Date('2024-01-01T01:00:00Z'), value: 70 },
      { time: new Date('2024-01-01T02:00:00Z'), value: 65 },
      { time: new Date('2024-01-01T03:00:00Z'), value: 80 },
      { time: new Date('2024-01-01T04:00:00Z'), value: 75 },
    ],
    style: {
      strokeColor: '#333333',
      strokeWidth: 3,
      fillColor: 'rgba(51, 51, 51, 0.1)',
      strokeDasharray: '5,5',
    },
    label: { 
      text: 'Memory Usage Percentage', 
      position: 'bottom' as const,
    },
    ariaLabel: 'Memory usage curve showing values from 60% to 80% over 4 hours',
    ariaDescription: 'Memory usage gradually increased from 60% to 80%, with a dashed line pattern',
  } as CurveItem,

  // High contrast event items
  {
    id: 'critical-error-accessible',
    type: 'event' as const,
    laneId: 'system-events',
    time: new Date('2024-01-01T01:30:00Z'),
    style: {
      markerType: 'circle' as const,
      color: '#000000',
      size: 12,
      strokeColor: '#ffffff',
      strokeWidth: 2,
    },
    label: { 
      text: 'Critical Error Alert', 
      position: 'top' as const,
    },
    ariaLabel: 'Critical error event at 1:30 AM',
    ariaDescription: 'System encountered a critical error requiring immediate attention',
    metadata: {
      severity: 'critical',
      type: 'error',
      message: 'Database connection failed',
    },
  } as EventItem,

  {
    id: 'warning-accessible',
    type: 'event' as const,
    laneId: 'system-events',
    time: new Date('2024-01-01T02:45:00Z'),
    style: {
      markerType: 'triangle' as const,
      color: '#666666',
      size: 10,
      strokeColor: '#ffffff',
      strokeWidth: 2,
    },
    label: { 
      text: 'Performance Warning', 
      position: 'top' as const,
    },
    ariaLabel: 'Performance warning event at 2:45 AM',
    ariaDescription: 'System performance degraded, monitoring required',
    metadata: {
      severity: 'warning',
      type: 'performance',
      message: 'High CPU usage detected',
    },
  } as EventItem,

  {
    id: 'resolved-accessible',
    type: 'event' as const,
    laneId: 'system-events',
    time: new Date('2024-01-01T03:15:00Z'),
    style: {
      markerType: 'square' as const,
      color: '#000000',
      size: 10,
      strokeColor: '#ffffff',
      strokeWidth: 2,
    },
    label: { 
      text: 'Issue Resolved', 
      position: 'top' as const,
    },
    ariaLabel: 'Issue resolved event at 3:15 AM',
    ariaDescription: 'All system issues have been successfully resolved',
    metadata: {
      severity: 'info',
      type: 'resolution',
      message: 'All systems operational',
    },
  } as EventItem,

  // High contrast time range items
  {
    id: 'deployment-accessible',
    type: 'time-range' as const,
    laneId: 'deployments',
    startTime: new Date('2024-01-01T02:00:00Z'),
    endTime: new Date('2024-01-01T02:30:00Z'),
    style: {
      backgroundColor: '#000000',
      opacity: 0.8,
      strokeColor: '#ffffff',
      strokeWidth: 2,
    },
    label: { 
      text: 'Version 2.1.0 Deployment', 
      position: 'inline' as const,
    },
    ariaLabel: 'Version 2.1.0 deployment from 2:00 AM to 2:30 AM',
    ariaDescription: 'System deployment lasting 30 minutes, includes database migrations and service updates',
    metadata: {
      version: '2.1.0',
      type: 'deployment',
      duration: '30 minutes',
    },
  } as TimeRangeItem,

  {
    id: 'maintenance-accessible',
    type: 'time-range' as const,
    laneId: 'deployments',
    startTime: new Date('2024-01-01T03:30:00Z'),
    endTime: new Date('2024-01-01T04:00:00Z'),
    style: {
      backgroundColor: '#666666',
      opacity: 0.7,
      strokeColor: '#ffffff',
      strokeWidth: 2,
    },
    label: { 
      text: 'Scheduled Maintenance Window', 
      position: 'inline' as const,
    },
    ariaLabel: 'Scheduled maintenance window from 3:30 AM to 4:00 AM',
    ariaDescription: 'Planned maintenance window for system updates and optimizations',
    metadata: {
      type: 'maintenance',
      duration: '30 minutes',
      impact: 'low',
    },
  } as TimeRangeItem,
];

const accessibleTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

export const HighContrast: Story = {
  args: {
    lanes: accessibleLanes,
    items: accessibleItems,
    initialTimeRange: accessibleTimeRange,
    width: 1000,
    height: 300,
    bufferZone: 0.5,
    ariaLabel: 'System monitoring timeline showing performance metrics, events, and deployments over 4 hours',
    ariaDescription: 'Interactive timeline with keyboard navigation support. Use arrow keys to navigate, Enter to select items, and +/- keys to zoom.',
    tabIndex: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'High contrast version optimized for users with visual impairments. Features black and white color scheme with thick borders and clear labels.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  args: {
    lanes: accessibleLanes,
    items: accessibleItems,
    initialTimeRange: accessibleTimeRange,
    width: 1000,
    height: 300,
    bufferZone: 0.5,
    ariaLabel: 'Keyboard navigable system timeline',
    ariaDescription: 'Use Tab to focus, arrow keys to navigate items, Enter/Space to select, +/- to zoom, Home/End to go to timeline start/end',
    tabIndex: 0,
    keyboardNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation capabilities. Try using Tab, arrow keys, Enter, Space, +/-, and Home/End keys.',
      },
    },
  },
};

export const ScreenReaderOptimized: Story = {
  args: {
    lanes: accessibleLanes.map(lane => ({
      ...lane,
      ariaLabel: `${lane.label}: ${lane.ariaLabel}`,
    })),
    items: accessibleItems.map(item => ({
      ...item,
      ariaLabel: `${item.type} item: ${item.ariaLabel}`,
      ariaDescription: `${item.ariaDescription}. Press Enter for more details.`,
    })),
    initialTimeRange: accessibleTimeRange,
    width: 1000,
    height: 300,
    bufferZone: 0.5,
    ariaLabel: 'Screen reader optimized system monitoring timeline',
    ariaDescription: 'Timeline contains 3 lanes with 7 items total. Navigate with arrow keys, get item details with Enter key.',
    tabIndex: 0,
    announceChanges: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Optimized for screen readers with detailed ARIA labels, descriptions, and live region announcements.',
      },
    },
  },
};

export const LargeText: Story = {
  args: {
    lanes: accessibleLanes,
    items: accessibleItems,
    initialTimeRange: accessibleTimeRange,
    width: 1200,
    height: 400,
    bufferZone: 0.5,
    ariaLabel: 'Large text system timeline for users with visual impairments',
    fontSize: 'large',
    tabIndex: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger text and spacing for users who need enhanced readability.',
      },
    },
  },
};

export const ReducedMotion: Story = {
  args: {
    lanes: accessibleLanes,
    items: accessibleItems,
    initialTimeRange: accessibleTimeRange,
    width: 1000,
    height: 300,
    bufferZone: 0.5,
    ariaLabel: 'Reduced motion system timeline',
    ariaDescription: 'Timeline with minimal animations for users sensitive to motion',
    tabIndex: 0,
    reducedMotion: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Respects prefers-reduced-motion setting with minimal animations and transitions.',
      },
    },
  },
};

export const FocusManagement: Story = {
  args: {
    lanes: accessibleLanes,
    items: accessibleItems,
    initialTimeRange: accessibleTimeRange,
    width: 1000,
    height: 300,
    bufferZone: 0.5,
    ariaLabel: 'Focus management demonstration timeline',
    ariaDescription: 'Timeline demonstrating proper focus management and visual focus indicators',
    tabIndex: 0,
    showFocusIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates clear focus indicators and proper focus management throughout the timeline.',
      },
    },
  },
};

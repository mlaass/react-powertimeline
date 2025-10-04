import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PowerTimeline } from '@/components/PowerTimeline';
import type { PowerTimelineProps, Lane, CurveItem, EventItem, TimeRangeItem } from '@/types';

/**
 * Integration Test for Basic Timeline Rendering
 * 
 * These tests verify that the complete PowerTimeline component renders
 * correctly with different data types and configurations.
 * Tests MUST fail until implementation is complete.
 */

describe('Basic Timeline Rendering Integration', () => {
  const mockLanes: Lane[] = [
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

  const mockCurveItem: CurveItem = {
    id: 'cpu-usage',
    type: 'curve',
    laneId: 'metrics',
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
    label: { text: 'CPU Usage %', position: 'top' },
  };

  const mockEventItem: EventItem = {
    id: 'error-spike',
    type: 'event',
    laneId: 'events',
    time: new Date('2024-01-01T01:30:00Z'),
    style: {
      markerType: 'circle',
      color: '#dc3545',
      size: 10,
    },
    label: { text: 'Error Spike', position: 'top' },
  };

  const mockTimeRangeItem: TimeRangeItem = {
    id: 'deployment-1',
    type: 'time-range',
    laneId: 'deployments',
    startTime: new Date('2024-01-01T02:00:00Z'),
    endTime: new Date('2024-01-01T02:15:00Z'),
    style: {
      backgroundColor: '#28a745',
      opacity: 0.7,
    },
    label: { text: 'v2.1.0 Deploy', position: 'inline' },
  };

  const defaultProps: PowerTimelineProps = {
    lanes: mockLanes,
    items: [mockCurveItem, mockEventItem, mockTimeRangeItem],
    initialTimeRange: {
      start: new Date('2024-01-01T00:00:00Z'),
      end: new Date('2024-01-01T04:00:00Z'),
    },
    onViewChange: vi.fn(),
    width: 800,
    height: 300,
  };

  it('should render complete timeline with all components', () => {
    const { container } = render(<PowerTimeline {...defaultProps} />);

    // Should render main timeline container
    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toBeTruthy();

    // Should render all lanes
    const lanes = container.querySelectorAll('[data-testid="lane"]');
    expect(lanes).toHaveLength(3);

    // Should render timeline axis
    const axis = container.querySelector('[data-testid="timeline-axis"]');
    expect(axis).toBeTruthy();
  });

  it('should render all data item types correctly', () => {
    const { container } = render(<PowerTimeline {...defaultProps} />);

    // Should render curve item
    const curveItem = container.querySelector('[data-testid="curve-item"]');
    expect(curveItem).toBeTruthy();

    // Should render event item
    const eventItem = container.querySelector('[data-testid="event-item"]');
    expect(eventItem).toBeTruthy();

    // Should render time range item
    const timeRangeItem = container.querySelector('[data-testid="time-range-item"]');
    expect(timeRangeItem).toBeTruthy();
  });

  it('should apply lane styling correctly', () => {
    const { container } = render(<PowerTimeline {...defaultProps} />);

    const lanes = container.querySelectorAll('[data-testid="lane"]');
    
    // First lane (metrics) should have correct styling
    const metricsLane = lanes[0];
    expect(metricsLane).toHaveStyle({ backgroundColor: '#f8f9fa', height: '100px' });

    // Second lane (events) should have correct styling
    const eventsLane = lanes[1];
    expect(eventsLane).toHaveStyle({ backgroundColor: '#e9ecef', height: '60px' });

    // Third lane (deployments) should have correct styling
    const deploymentsLane = lanes[2];
    expect(deploymentsLane).toHaveStyle({ backgroundColor: '#dee2e6', height: '40px' });
  });

  it('should render lane labels', () => {
    const { getByText } = render(<PowerTimeline {...defaultProps} />);

    expect(getByText('Performance Metrics')).toBeTruthy();
    expect(getByText('System Events')).toBeTruthy();
    expect(getByText('Deployments')).toBeTruthy();
  });

  it('should render item labels', () => {
    const { getByText } = render(<PowerTimeline {...defaultProps} />);

    expect(getByText('CPU Usage %')).toBeTruthy();
    expect(getByText('Error Spike')).toBeTruthy();
    expect(getByText('v2.1.0 Deploy')).toBeTruthy();
  });

  it('should handle empty lanes gracefully', () => {
    const emptyProps = {
      ...defaultProps,
      lanes: [],
      items: [],
    };

    expect(() => {
      render(<PowerTimeline {...emptyProps} />);
    }).not.toThrow();

    const { container } = render(<PowerTimeline {...emptyProps} />);
    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toBeTruthy();
  });

  it('should handle empty items gracefully', () => {
    const emptyItemsProps = {
      ...defaultProps,
      items: [],
    };

    const { container } = render(<PowerTimeline {...emptyItemsProps} />);

    // Should render lanes but no items
    const lanes = container.querySelectorAll('[data-testid="lane"]');
    expect(lanes).toHaveLength(3);

    const items = container.querySelectorAll('[data-testid*="-item"]');
    expect(items).toHaveLength(0);
  });

  it('should show "No data" message in empty lanes', () => {
    const emptyItemsProps = {
      ...defaultProps,
      items: [],
    };

    const { container } = render(<PowerTimeline {...emptyItemsProps} />);

    // Should show "No data" messages
    const noDataMessages = container.querySelectorAll('[data-testid="no-data-message"]');
    expect(noDataMessages.length).toBeGreaterThan(0);
  });

  it('should render with correct dimensions', () => {
    const { container } = render(
      <PowerTimeline {...defaultProps} width={1000} height={500} />
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toHaveStyle({ width: '1000px', height: '500px' });
  });

  it('should apply custom className and styles', () => {
    const { container } = render(
      <PowerTimeline
        {...defaultProps}
        className="custom-timeline"
        style={{ border: '1px solid red' }}
      />
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toHaveClass('custom-timeline');
    expect(timeline).toHaveStyle({ border: '1px solid red' });
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(
      <PowerTimeline {...defaultProps} ariaLabel="System performance timeline" />
    );

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toHaveAttribute('role', 'application');
    expect(timeline).toHaveAttribute('aria-label', 'System performance timeline');
  });

  it('should render time axis with appropriate labels', () => {
    const { container } = render(<PowerTimeline {...defaultProps} />);

    const axis = container.querySelector('[data-testid="timeline-axis"]');
    expect(axis).toBeTruthy();

    // Should have time labels
    const timeLabels = container.querySelectorAll('[data-testid="time-label"]');
    expect(timeLabels.length).toBeGreaterThan(0);
  });

  it('should position items correctly in their lanes', () => {
    const { container } = render(<PowerTimeline {...defaultProps} />);

    // Curve item should be in metrics lane
    const curveItem = container.querySelector('[data-testid="curve-item"]');
    expect(curveItem?.closest('[data-lane-id="metrics"]')).toBeTruthy();

    // Event item should be in events lane
    const eventItem = container.querySelector('[data-testid="event-item"]');
    expect(eventItem?.closest('[data-lane-id="events"]')).toBeTruthy();

    // Time range item should be in deployments lane
    const timeRangeItem = container.querySelector('[data-testid="time-range-item"]');
    expect(timeRangeItem?.closest('[data-lane-id="deployments"]')).toBeTruthy();
  });
});

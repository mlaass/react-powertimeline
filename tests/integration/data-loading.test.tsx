import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { PowerTimeline } from '@/components/PowerTimeline';
import type { PowerTimelineProps, TimeRange, Item } from '@/types';

/**
 * Integration Test for Dynamic Data Loading
 * 
 * These tests verify that the timeline correctly handles dynamic data loading
 * scenarios and triggers appropriate callbacks. Tests MUST fail until 
 * implementation is complete.
 */

describe('Dynamic Data Loading Integration', () => {
  const mockOnViewChange = vi.fn();

  const initialTimeRange: TimeRange = {
    start: new Date('2024-01-01T00:00:00Z'),
    end: new Date('2024-01-01T04:00:00Z'),
  };

  const initialItems: Item[] = [
    {
      id: 'item-1',
      type: 'event',
      laneId: 'test-lane',
      time: new Date('2024-01-01T01:00:00Z'),
      style: { markerType: 'circle', color: '#007bff' },
    },
    {
      id: 'item-2',
      type: 'event',
      laneId: 'test-lane',
      time: new Date('2024-01-01T02:00:00Z'),
      style: { markerType: 'circle', color: '#28a745' },
    },
  ];

  const defaultProps: PowerTimelineProps = {
    lanes: [
      {
        id: 'test-lane',
        height: 100,
        label: 'Test Lane',
      },
    ],
    items: initialItems,
    initialTimeRange,
    onViewChange: mockOnViewChange,
    width: 800,
    height: 300,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger onViewChange when time range changes', async () => {
    const { container, rerender } = render(<PowerTimeline {...defaultProps} />);

    // Simulate pan operation that changes time range
    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toBeTruthy();

    // Trigger a view change (this would normally be done by pan/zoom)
    const newTimeRange: TimeRange = {
      start: new Date('2024-01-01T01:00:00Z'),
      end: new Date('2024-01-01T05:00:00Z'),
    };

    // Re-render with new time range to simulate view change
    rerender(<PowerTimeline {...defaultProps} initialTimeRange={newTimeRange} />);

    await waitFor(() => {
      expect(mockOnViewChange).toHaveBeenCalled();
    });
  });

  it('should handle loading state during data fetch', async () => {
    const LoadingTimeline = () => {
      const [isLoading, setIsLoading] = React.useState(false);
      const [items, setItems] = React.useState(initialItems);

      const handleViewChange = async (newTimeRange: TimeRange) => {
        setIsLoading(true);
        mockOnViewChange(newTimeRange);
        
        // Simulate async data loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Add new items for the new time range
        const newItems = [
          ...items,
          {
            id: 'new-item',
            type: 'event',
            laneId: 'test-lane',
            time: new Date('2024-01-01T04:30:00Z'),
            style: { markerType: 'circle', color: '#dc3545' },
          },
        ];
        
        setItems(newItems);
        setIsLoading(false);
      };

      return (
        <div>
          {isLoading && <div data-testid="loading-indicator">Loading...</div>}
          <PowerTimeline
            {...defaultProps}
            items={items}
            onViewChange={handleViewChange}
          />
        </div>
      );
    };

    const { getByTestId, queryByTestId } = render(<LoadingTimeline />);

    // Initially should not show loading
    expect(queryByTestId('loading-indicator')).toBeNull();

    // Trigger view change
    const timeline = getByTestId('power-timeline');
    // Simulate pan/zoom that triggers onViewChange
    // (This would be implemented in the actual component)

    // Should show loading indicator during data fetch
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeTruthy();
    });

    // Should hide loading indicator after data loads
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    }, { timeout: 200 });
  });

  it('should handle empty data gracefully', () => {
    const emptyProps = {
      ...defaultProps,
      items: [],
    };

    const { container } = render(<PowerTimeline {...emptyProps} />);

    // Should render empty state
    const noDataMessages = container.querySelectorAll('[data-testid="no-data-message"]');
    expect(noDataMessages.length).toBeGreaterThan(0);

    // Should still be interactive for loading new data
    const timeline = container.querySelector('[data-testid="power-timeline"]');
    expect(timeline).toBeTruthy();
  });

  it('should update items when new data is loaded', () => {
    const { container, rerender } = render(<PowerTimeline {...defaultProps} />);

    // Initially should have 2 items
    const initialItems = container.querySelectorAll('[data-testid*="-item"]');
    expect(initialItems).toHaveLength(2);

    // Add more items
    const newItems: Item[] = [
      ...initialItems,
      {
        id: 'item-3',
        type: 'event',
        laneId: 'test-lane',
        time: new Date('2024-01-01T03:00:00Z'),
        style: { markerType: 'circle', color: '#ffc107' },
      },
    ];

    rerender(<PowerTimeline {...defaultProps} items={newItems} />);

    // Should now have 3 items
    const updatedItems = container.querySelectorAll('[data-testid*="-item"]');
    expect(updatedItems).toHaveLength(3);
  });

  it('should handle data loading errors gracefully', async () => {
    const ErrorHandlingTimeline = () => {
      const [error, setError] = React.useState<string | null>(null);

      const handleViewChange = async (newTimeRange: TimeRange) => {
        try {
          mockOnViewChange(newTimeRange);
          // Simulate failed data loading
          throw new Error('Failed to load data');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      };

      return (
        <div>
          {error && <div data-testid="error-message">{error}</div>}
          <PowerTimeline
            {...defaultProps}
            onViewChange={handleViewChange}
          />
        </div>
      );
    };

    const { getByTestId } = render(<ErrorHandlingTimeline />);

    // Trigger view change that causes error
    const timeline = getByTestId('power-timeline');
    // (Error would be triggered by actual pan/zoom implementation)

    await waitFor(() => {
      expect(getByTestId('error-message')).toHaveTextContent('Failed to load data');
    });
  });

  it('should support incremental data loading', () => {
    const { container, rerender } = render(<PowerTimeline {...defaultProps} />);

    // Start with initial items
    expect(container.querySelectorAll('[data-testid*="-item"]')).toHaveLength(2);

    // Simulate loading more data for extended time range
    const extendedItems: Item[] = [
      ...initialItems,
      {
        id: 'item-before',
        type: 'event',
        laneId: 'test-lane',
        time: new Date('2023-12-31T23:00:00Z'), // Before initial range
        style: { markerType: 'circle', color: '#6c757d' },
      },
      {
        id: 'item-after',
        type: 'event',
        laneId: 'test-lane',
        time: new Date('2024-01-01T05:00:00Z'), // After initial range
        style: { markerType: 'circle', color: '#17a2b8' },
      },
    ];

    const extendedTimeRange: TimeRange = {
      start: new Date('2023-12-31T22:00:00Z'),
      end: new Date('2024-01-01T06:00:00Z'),
    };

    rerender(
      <PowerTimeline
        {...defaultProps}
        items={extendedItems}
        initialTimeRange={extendedTimeRange}
      />
    );

    // Should now show all items including those outside original range
    expect(container.querySelectorAll('[data-testid*="-item"]')).toHaveLength(4);
  });

  it('should handle real-time data updates', async () => {
    const RealTimeTimeline = () => {
      const [items, setItems] = React.useState(initialItems);

      React.useEffect(() => {
        // Simulate real-time data updates
        const interval = setInterval(() => {
          const newItem: Item = {
            id: `realtime-${Date.now()}`,
            type: 'event',
            laneId: 'test-lane',
            time: new Date(),
            style: { markerType: 'circle', color: '#e83e8c' },
          };
          
          setItems(prev => [...prev, newItem]);
        }, 100);

        return () => clearInterval(interval);
      }, []);

      return <PowerTimeline {...defaultProps} items={items} />;
    };

    const { container } = render(<RealTimeTimeline />);

    const initialCount = container.querySelectorAll('[data-testid*="-item"]').length;

    // Wait for real-time updates
    await waitFor(() => {
      const currentCount = container.querySelectorAll('[data-testid*="-item"]').length;
      expect(currentCount).toBeGreaterThan(initialCount);
    }, { timeout: 300 });
  });

  it('should optimize rendering for large datasets', () => {
    // Create large dataset
    const largeDataset: Item[] = Array.from({ length: 10000 }, (_, i) => ({
      id: `item-${i}`,
      type: 'event',
      laneId: 'test-lane',
      time: new Date(`2024-01-01T${String(i % 24).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00Z`),
      style: { markerType: 'circle', color: '#007bff' },
    })) as Item[];

    const startTime = performance.now();

    const { container } = render(
      <PowerTimeline {...defaultProps} items={largeDataset} />
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within performance target (<100ms)
    expect(renderTime).toBeLessThan(100);

    // Should only render visible items (virtualization)
    const renderedItems = container.querySelectorAll('[data-testid*="-item"]');
    expect(renderedItems.length).toBeLessThan(largeDataset.length);
  });

  it('should maintain scroll position during data updates', () => {
    const { container, rerender } = render(<PowerTimeline {...defaultProps} />);

    const timeline = container.querySelector('[data-testid="power-timeline"]');
    const initialScrollLeft = timeline?.scrollLeft || 0;

    // Update with new data
    const updatedItems = [
      ...initialItems,
      {
        id: 'new-item',
        type: 'event',
        laneId: 'test-lane',
        time: new Date('2024-01-01T01:30:00Z'),
        style: { markerType: 'circle', color: '#fd7e14' },
      },
    ];

    rerender(<PowerTimeline {...defaultProps} items={updatedItems} />);

    // Scroll position should be maintained
    const finalScrollLeft = timeline?.scrollLeft || 0;
    expect(finalScrollLeft).toBe(initialScrollLeft);
  });
});

/**
 * useVirtualization Hook
 * 
 * Custom hook for managing viewport-based virtualization in the PowerTimeline component.
 * Optimizes rendering performance by only rendering visible items plus a buffer zone.
 */

import { useMemo, useCallback } from 'react';
import type { Item, TimeRange, VirtualizationState } from '../types';
import { 
  calculateVisibleItems, 
  groupItemsByLane,
  calculateStackingLevels,
  checkPerformanceTargets 
} from '../utils/virtualization';

/**
 * Hook for managing virtualization state
 */
export function useVirtualization(
  items: Item[],
  visibleTimeRange: TimeRange,
  bufferZone: number = 0.5
): VirtualizationState {
  return useMemo(() => {
    return calculateVisibleItems(items, visibleTimeRange, bufferZone);
  }, [
    items,
    visibleTimeRange.start.getTime(),
    visibleTimeRange.end.getTime(),
    bufferZone,
  ]);
}

/**
 * Hook for managing virtualization with performance monitoring
 */
export function useVirtualizationWithPerformance(
  items: Item[],
  visibleTimeRange: TimeRange,
  bufferZone: number = 0.5,
  maxRenderCount: number = 1000,
  maxMemoryMB: number = 50
): {
  virtualizationState: VirtualizationState;
  performanceMetrics: {
    renderCountOk: boolean;
    memoryUsageOk: boolean;
    recommendations: string[];
  };
  itemsByLane: Map<string | number, Item[]>;
} {
  const virtualizationState = useVirtualization(items, visibleTimeRange, bufferZone);

  const performanceMetrics = useMemo(() => {
    return checkPerformanceTargets(virtualizationState, maxRenderCount, maxMemoryMB);
  }, [virtualizationState, maxRenderCount, maxMemoryMB]);

  const itemsByLane = useMemo(() => {
    return groupItemsByLane(virtualizationState.visibleItems);
  }, [virtualizationState.visibleItems]);

  return {
    virtualizationState,
    performanceMetrics,
    itemsByLane,
  };
}

/**
 * Hook for managing stacking levels for overlapping items
 */
export function useStackingLevels(
  items: Item[],
  stackingOrder: 'recent-top' | 'recent-bottom' | 'custom' = 'recent-top'
): Map<string | number, number> {
  return useMemo(() => {
    const timeRangeItems = items.filter(item => item.type === 'time-range') as any[];
    return calculateStackingLevels(timeRangeItems, stackingOrder);
  }, [items, stackingOrder]);
}

/**
 * Hook for creating optimized item renderers
 */
export function useItemRenderers(
  virtualizationState: VirtualizationState
): {
  shouldRenderItem: (itemId: string | number) => boolean;
  getItemRenderPriority: (itemId: string | number) => number;
} {
  const visibleItemIds = useMemo(() => {
    return new Set(virtualizationState.visibleItems.map(item => item.id));
  }, [virtualizationState.visibleItems]);

  const shouldRenderItem = useCallback((itemId: string | number) => {
    return visibleItemIds.has(itemId);
  }, [visibleItemIds]);

  const getItemRenderPriority = useCallback((itemId: string | number) => {
    // Higher priority for items closer to the center of the viewport
    const item = virtualizationState.visibleItems.find(item => item.id === itemId);
    if (!item) return 0;

    // Calculate distance from viewport center (simplified)
    const viewportCenter = new Date(
      (virtualizationState.visibleTimeRange.start.getTime() + 
       virtualizationState.visibleTimeRange.end.getTime()) / 2
    );

    let itemTime: Date;
    switch (item.type) {
      case 'event': {
        const eventItem = item as import('../types').EventItem;
        itemTime = eventItem.time;
        break;
      }
      case 'time-range': {
        const rangeItem = item as import('../types').TimeRangeItem;
        itemTime = new Date((rangeItem.startTime.getTime() + rangeItem.endTime.getTime()) / 2);
        break;
      }
      case 'curve': {
        const curveItem = item as import('../types').CurveItem;
        if (curveItem.dataPoints.length === 0) return 0;
        const midIndex = Math.floor(curveItem.dataPoints.length / 2);
        itemTime = curveItem.dataPoints[midIndex].time;
        break;
      }
      default:
        return 0;
    }

    const distance = Math.abs(itemTime.getTime() - viewportCenter.getTime());
    return 1 / (1 + distance); // Higher priority for closer items
  }, [virtualizationState]);

  return {
    shouldRenderItem,
    getItemRenderPriority,
  };
}

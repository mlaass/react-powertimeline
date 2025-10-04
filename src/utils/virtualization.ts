/**
 * Virtualization Utilities
 * 
 * Utilities for implementing viewport-based virtualization to optimize rendering
 * performance for large datasets.
 */

import type { 
  TimeRange, 
  VirtualizationState, 
  Item, 
  CurveItem, 
  EventItem, 
  TimeRangeItem 
} from '../types';
import { timeInRange, timeRangesOverlap, expandTimeRange } from './timeScale';

/**
 * Calculates which items should be rendered based on the visible time range and buffer zone
 */
export function calculateVisibleItems(
  items: Item[],
  visibleTimeRange: TimeRange,
  bufferZone: number = 0.5
): VirtualizationState {
  // Calculate buffered time range
  const bufferedTimeRange = expandTimeRange(visibleTimeRange, 1 + bufferZone * 2);
  
  // Filter items that intersect with the buffered time range
  const visibleItems = items.filter(item => isItemInTimeRange(item, bufferedTimeRange));

  return {
    visibleTimeRange,
    bufferedTimeRange,
    visibleItems,
    totalItems: items.length,
    renderCount: visibleItems.length,
  };
}

/**
 * Checks if an item intersects with a given time range
 */
export function isItemInTimeRange(item: Item, timeRange: TimeRange): boolean {
  switch (item.type) {
    case 'curve':
      return isCurveItemInTimeRange(item, timeRange);
    case 'event':
      return isEventItemInTimeRange(item, timeRange);
    case 'time-range':
      return isTimeRangeItemInTimeRange(item, timeRange);
    default:
      return false;
  }
}

/**
 * Checks if a curve item intersects with a time range
 */
function isCurveItemInTimeRange(item: CurveItem, timeRange: TimeRange): boolean {
  if (item.dataPoints.length === 0) return false;
  
  const firstPoint = item.dataPoints[0];
  const lastPoint = item.dataPoints[item.dataPoints.length - 1];
  
  const curveTimeRange: TimeRange = {
    start: firstPoint.time,
    end: lastPoint.time,
  };
  
  return timeRangesOverlap(curveTimeRange, timeRange);
}

/**
 * Checks if an event item intersects with a time range
 */
function isEventItemInTimeRange(item: EventItem, timeRange: TimeRange): boolean {
  return timeInRange(item.time, timeRange);
}

/**
 * Checks if a time range item intersects with a time range
 */
function isTimeRangeItemInTimeRange(item: TimeRangeItem, timeRange: TimeRange): boolean {
  const itemTimeRange: TimeRange = {
    start: item.startTime,
    end: item.endTime,
  };
  
  return timeRangesOverlap(itemTimeRange, timeRange);
}

/**
 * Groups items by lane for efficient rendering
 */
export function groupItemsByLane(items: Item[]): Map<string | number, Item[]> {
  const itemsByLane = new Map<string | number, Item[]>();
  
  for (const item of items) {
    const laneItems = itemsByLane.get(item.laneId) || [];
    laneItems.push(item);
    itemsByLane.set(item.laneId, laneItems);
  }
  
  return itemsByLane;
}

/**
 * Calculates stacking levels for overlapping time range items in a lane
 */
export function calculateStackingLevels(
  timeRangeItems: TimeRangeItem[],
  stackingOrder: 'recent-top' | 'recent-bottom' | 'custom' = 'recent-top'
): Map<string | number, number> {
  const stackLevels = new Map<string | number, number>();
  
  // Sort items based on stacking order
  const sortedItems = [...timeRangeItems].sort((a, b) => {
    if (stackingOrder === 'recent-top') {
      // Most recent items on top (higher stack level)
      return b.startTime.getTime() - a.startTime.getTime();
    } else if (stackingOrder === 'recent-bottom') {
      // Oldest items on top (higher stack level)
      return a.startTime.getTime() - b.startTime.getTime();
    } else {
      // Custom order - use provided stackLevel or default to 0
      return (a.stackLevel || 0) - (b.stackLevel || 0);
    }
  });
  
  // Assign stack levels
  const occupiedLevels: Array<{ start: Date; end: Date }> = [];
  
  for (const item of sortedItems) {
    let stackLevel = 0;
    
    // Find the first available stack level
    while (stackLevel < occupiedLevels.length) {
      const occupied = occupiedLevels[stackLevel];
      if (!occupied || item.startTime >= occupied.end || item.endTime <= occupied.start) {
        break;
      }
      stackLevel++;
    }
    
    // Occupy this level
    occupiedLevels[stackLevel] = {
      start: item.startTime,
      end: item.endTime,
    };
    
    stackLevels.set(item.id, stackLevel);
  }
  
  return stackLevels;
}

/**
 * Estimates memory usage for a given number of items
 */
export function estimateMemoryUsage(itemCount: number): number {
  // Rough estimate: each item uses approximately 1KB in memory
  const bytesPerItem = 1024;
  return itemCount * bytesPerItem;
}

/**
 * Checks if the current virtualization state meets performance targets
 */
export function checkPerformanceTargets(
  virtualizationState: VirtualizationState,
  maxRenderCount: number = 1000,
  maxMemoryMB: number = 50
): {
  renderCountOk: boolean;
  memoryUsageOk: boolean;
  recommendations: string[];
} {
  const renderCountOk = virtualizationState.renderCount <= maxRenderCount;
  const memoryUsage = estimateMemoryUsage(virtualizationState.renderCount);
  const memoryUsageOk = memoryUsage <= maxMemoryMB * 1024 * 1024;
  
  const recommendations: string[] = [];
  
  if (!renderCountOk) {
    recommendations.push(`Reduce buffer zone or viewport size. Currently rendering ${virtualizationState.renderCount} items, target is ${maxRenderCount}.`);
  }
  
  if (!memoryUsageOk) {
    recommendations.push(`Reduce dataset size or implement more aggressive virtualization. Current memory usage: ${Math.round(memoryUsage / 1024 / 1024)}MB, target is ${maxMemoryMB}MB.`);
  }
  
  return {
    renderCountOk,
    memoryUsageOk,
    recommendations,
  };
}

/**
 * Optimizes buffer zone based on interaction patterns
 */
export function optimizeBufferZone(
  interactionFrequency: number,
  panSpeed: number,
  baseBufferZone: number = 0.5
): number {
  // Increase buffer zone for frequent interactions or fast panning
  const interactionMultiplier = Math.min(interactionFrequency / 10, 2);
  const speedMultiplier = Math.min(panSpeed / 100, 2);
  
  return Math.min(baseBufferZone * (1 + interactionMultiplier + speedMultiplier), 2.0);
}

/**
 * Debounces virtualization updates to prevent excessive recalculations
 */
export function createVirtualizationDebouncer(
  updateFn: (state: VirtualizationState) => void,
  delay: number = 16 // ~60fps
): (items: Item[], timeRange: TimeRange, bufferZone: number) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (items: Item[], timeRange: TimeRange, bufferZone: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      const state = calculateVisibleItems(items, timeRange, bufferZone);
      updateFn(state);
    }, delay);
  };
}

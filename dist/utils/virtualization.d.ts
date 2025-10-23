import { TimeRange, VirtualizationState, Item, TimeRangeItem } from '../types';

/**
 * Calculates which items should be rendered based on the visible time range and buffer zone
 */
export declare function calculateVisibleItems(items: Item[], visibleTimeRange: TimeRange, bufferZone?: number): VirtualizationState;
/**
 * Checks if an item intersects with a given time range
 */
export declare function isItemInTimeRange(item: Item, timeRange: TimeRange): boolean;
/**
 * Groups items by lane for efficient rendering
 */
export declare function groupItemsByLane(items: Item[]): Map<string | number, Item[]>;
/**
 * Calculates stacking levels for overlapping time range items in a lane
 */
export declare function calculateStackingLevels(timeRangeItems: TimeRangeItem[], stackingOrder?: 'recent-top' | 'recent-bottom' | 'custom'): Map<string | number, number>;
/**
 * Estimates memory usage for a given number of items
 */
export declare function estimateMemoryUsage(itemCount: number): number;
/**
 * Checks if the current virtualization state meets performance targets
 */
export declare function checkPerformanceTargets(virtualizationState: VirtualizationState, maxRenderCount?: number, maxMemoryMB?: number): {
    renderCountOk: boolean;
    memoryUsageOk: boolean;
    recommendations: string[];
};
/**
 * Optimizes buffer zone based on interaction patterns
 */
export declare function optimizeBufferZone(interactionFrequency: number, panSpeed: number, baseBufferZone?: number): number;
/**
 * Debounces virtualization updates to prevent excessive recalculations
 */
export declare function createVirtualizationDebouncer(updateFn: (state: VirtualizationState) => void, delay?: number): (items: Item[], timeRange: TimeRange, bufferZone: number) => void;
//# sourceMappingURL=virtualization.d.ts.map
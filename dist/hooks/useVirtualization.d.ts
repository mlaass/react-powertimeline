import { Item, TimeRange, VirtualizationState } from '../types';

/**
 * Hook for managing virtualization state
 */
export declare function useVirtualization(items: Item[], visibleTimeRange: TimeRange, bufferZone?: number): VirtualizationState;
/**
 * Hook for managing virtualization with performance monitoring
 */
export declare function useVirtualizationWithPerformance(items: Item[], visibleTimeRange: TimeRange, bufferZone?: number, maxRenderCount?: number, maxMemoryMB?: number): {
    virtualizationState: VirtualizationState;
    performanceMetrics: {
        renderCountOk: boolean;
        memoryUsageOk: boolean;
        recommendations: string[];
    };
    itemsByLane: Map<string | number, Item[]>;
};
/**
 * Hook for managing stacking levels for overlapping items
 */
export declare function useStackingLevels(items: Item[], stackingOrder?: 'recent-top' | 'recent-bottom' | 'custom'): Map<string | number, number>;
/**
 * Hook for creating optimized item renderers
 */
export declare function useItemRenderers(virtualizationState: VirtualizationState): {
    shouldRenderItem: (itemId: string | number) => boolean;
    getItemRenderPriority: (itemId: string | number) => number;
};
//# sourceMappingURL=useVirtualization.d.ts.map
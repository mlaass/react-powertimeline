import { TimeRange, TimeScale } from '../types';

/**
 * Hook for creating and managing a D3 time scale
 */
export declare function useTimeScale(timeRange: TimeRange, pixelRange: [number, number]): TimeScale;
/**
 * Hook for creating a static reference time scale that doesn't change on pan/zoom
 * This is used for transform-based rendering where items are positioned once
 * and then transformed via SVG transform attribute.
 *
 * @param referenceTimeRange - The static time range to use as reference
 * @param pixelRange - The pixel range (typically [0, width])
 * @returns A stable time scale that only updates when reference range changes
 */
export declare function useReferenceTimeScale(referenceTimeRange: TimeRange, pixelRange: [number, number]): TimeScale;
/**
 * Hook for creating a time scale with update capabilities
 */
export declare function useUpdatableTimeScale(initialTimeRange: TimeRange, initialPixelRange: [number, number]): {
    timeScale: TimeScale;
    updateTimeRange: (newTimeRange: TimeRange) => TimeScale;
    updatePixelRange: (newPixelRange: [number, number]) => TimeScale;
    updateBoth: (newTimeRange: TimeRange, newPixelRange: [number, number]) => TimeScale;
};
//# sourceMappingURL=useTimeScale.d.ts.map
import { TimeRange, TimeScale } from '../types';

/**
 * Hook for creating and managing a D3 time scale
 */
export declare function useTimeScale(timeRange: TimeRange, pixelRange: [number, number]): TimeScale;
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
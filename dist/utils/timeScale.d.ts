import { TimeRange, TimeScale } from '../types';

/**
 * Creates a D3 time scale for mapping time domain to pixel range
 */
export declare function createTimeScale(timeRange: TimeRange, pixelRange: [number, number]): TimeScale;
/**
 * Updates an existing time scale with new domain or range
 */
export declare function updateTimeScale(timeScale: TimeScale, newTimeRange?: TimeRange, newPixelRange?: [number, number]): TimeScale;
/**
 * Converts a time value to pixel coordinate using the time scale
 */
export declare function timeToPixel(time: Date, timeScale: TimeScale): number;
/**
 * Converts a pixel coordinate to time value using the time scale
 */
export declare function pixelToTime(pixel: number, timeScale: TimeScale): Date;
/**
 * Calculates the time range for a given pixel range
 */
export declare function pixelRangeToTimeRange(pixelRange: [number, number], timeScale: TimeScale): TimeRange;
/**
 * Calculates the pixel range for a given time range
 */
export declare function timeRangeToPixelRange(timeRange: TimeRange, timeScale: TimeScale): [number, number];
/**
 * Calculates the duration in milliseconds for a time range
 */
export declare function getTimeRangeDuration(timeRange: TimeRange): number;
/**
 * Calculates the center point of a time range
 */
export declare function getTimeRangeCenter(timeRange: TimeRange): Date;
/**
 * Expands a time range by a given factor around its center
 */
export declare function expandTimeRange(timeRange: TimeRange, factor: number): TimeRange;
/**
 * Shifts a time range by a given offset in milliseconds
 */
export declare function shiftTimeRange(timeRange: TimeRange, offsetMs: number): TimeRange;
/**
 * Checks if two time ranges overlap
 */
export declare function timeRangesOverlap(range1: TimeRange, range2: TimeRange): boolean;
/**
 * Checks if a time point falls within a time range
 */
export declare function timeInRange(time: Date, timeRange: TimeRange): boolean;
/**
 * Clamps a time range to stay within bounds
 */
export declare function clampTimeRange(timeRange: TimeRange, bounds: TimeRange): TimeRange;
//# sourceMappingURL=timeScale.d.ts.map
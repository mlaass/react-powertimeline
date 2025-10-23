/**
 * useTimeScale Hook
 *
 * Custom hook for managing D3 time scales in the PowerTimeline component.
 * Handles creation, updates, and transformations between time and pixel coordinates.
 */

import { useMemo, useRef } from 'react';
import type { TimeRange, TimeScale } from '../types';
import { createTimeScale, updateTimeScale } from '../utils/timeScale';

/**
 * Hook for creating and managing a D3 time scale
 */
export function useTimeScale(
  timeRange: TimeRange,
  pixelRange: [number, number]
): TimeScale {
  return useMemo(() => {
    return createTimeScale(timeRange, pixelRange);
  }, [timeRange.start.getTime(), timeRange.end.getTime(), pixelRange[0], pixelRange[1]]);
}

/**
 * Hook for creating a static reference time scale that doesn't change on pan/zoom
 * This is used for transform-based rendering where items are positioned once
 * and then transformed via SVG transform attribute.
 *
 * @param referenceTimeRange - The static time range to use as reference
 * @param pixelRange - The pixel range (typically [0, width])
 * @returns A stable time scale that only updates when reference range changes
 */
export function useReferenceTimeScale(
  referenceTimeRange: TimeRange,
  pixelRange: [number, number]
): TimeScale {
  // Use ref to maintain stable reference across renders
  const timeScaleRef = useRef<TimeScale | null>(null);

  // Only recreate if reference range or pixel range actually changes
  return useMemo(() => {
    const newScale = createTimeScale(referenceTimeRange, pixelRange);
    timeScaleRef.current = newScale;
    return newScale;
  }, [
    referenceTimeRange.start.getTime(),
    referenceTimeRange.end.getTime(),
    pixelRange[0],
    pixelRange[1],
  ]);
}

/**
 * Hook for creating a time scale with update capabilities
 */
export function useUpdatableTimeScale(
  initialTimeRange: TimeRange,
  initialPixelRange: [number, number]
): {
  timeScale: TimeScale;
  updateTimeRange: (newTimeRange: TimeRange) => TimeScale;
  updatePixelRange: (newPixelRange: [number, number]) => TimeScale;
  updateBoth: (newTimeRange: TimeRange, newPixelRange: [number, number]) => TimeScale;
} {
  const timeScale = useTimeScale(initialTimeRange, initialPixelRange);

  const updateTimeRange = useMemo(() => {
    return (newTimeRange: TimeRange) => {
      return updateTimeScale(timeScale, newTimeRange);
    };
  }, [timeScale]);

  const updatePixelRange = useMemo(() => {
    return (newPixelRange: [number, number]) => {
      return updateTimeScale(timeScale, undefined, newPixelRange);
    };
  }, [timeScale]);

  const updateBoth = useMemo(() => {
    return (newTimeRange: TimeRange, newPixelRange: [number, number]) => {
      return updateTimeScale(timeScale, newTimeRange, newPixelRange);
    };
  }, [timeScale]);

  return {
    timeScale,
    updateTimeRange,
    updatePixelRange,
    updateBoth,
  };
}

/**
 * useTimeScale Hook
 * 
 * Custom hook for managing D3 time scales in the PowerTimeline component.
 * Handles creation, updates, and transformations between time and pixel coordinates.
 */

import { useMemo } from 'react';
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

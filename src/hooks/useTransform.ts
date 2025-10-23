/**
 * useTransform Hook
 *
 * Calculates SVG transform (translate + scale) to map from a reference time range
 * to the current visible time range. This enables GPU-accelerated pan/zoom by
 * avoiding per-item position recalculation.
 *
 * Performance: O(1) complexity regardless of item count
 */

import { useMemo } from 'react';
import type { TimeRange } from '../types';

export interface Transform {
  /** Horizontal translation in pixels */
  translateX: number;
  /** Horizontal scale factor */
  scaleX: number;
  /** SVG transform string ready to use */
  transformString: string;
}

/**
 * Calculate transform to map from reference time range to current view range
 *
 * @param referenceTimeRange - The static reference time range that items are positioned against
 * @param currentTimeRange - The current visible time range after pan/zoom
 * @param width - The width of the timeline in pixels
 * @returns Transform object with translateX, scaleX, and a ready-to-use transform string
 *
 * @example
 * ```tsx
 * const transform = useTransform(referenceTimeRange, currentTimeRange, 800);
 * return <g transform={transform.transformString}>
 *   {items}
 * </g>
 * ```
 */
export function useTransform(
  referenceTimeRange: TimeRange,
  currentTimeRange: TimeRange,
  width: number
): Transform {
  return useMemo(() => {
    // Calculate durations in milliseconds
    const referenceDuration = referenceTimeRange.end.getTime() - referenceTimeRange.start.getTime();
    const currentDuration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();

    // Scale factor: how much to zoom in/out
    // If current view is zoomed in (smaller duration), scaleX > 1
    // If current view is zoomed out (larger duration), scaleX < 1
    const scaleX = referenceDuration / currentDuration;

    // Calculate how much to shift horizontally
    // This accounts for both panning and the scaling center point
    const referenceStartMs = referenceTimeRange.start.getTime();
    const currentStartMs = currentTimeRange.start.getTime();
    const timeDelta = currentStartMs - referenceStartMs;

    // Pixels per millisecond at reference scale
    const pxPerMs = width / referenceDuration;

    // Translation accounts for both pan offset and scale adjustment
    const translateX = -timeDelta * pxPerMs * scaleX;

    // Create SVG transform string
    // Note: We only scale horizontally (scaleX), not vertically
    // This preserves item heights while allowing horizontal pan/zoom
    const transformString = `translate(${translateX}, 0) scale(${scaleX}, 1)`;

    return {
      translateX,
      scaleX,
      transformString,
    };
  }, [
    referenceTimeRange.start.getTime(),
    referenceTimeRange.end.getTime(),
    currentTimeRange.start.getTime(),
    currentTimeRange.end.getTime(),
    width,
  ]);
}

/**
 * Calculate the inverse scale factor to counter-scale elements
 * that should not be affected by zoom (like text labels)
 *
 * @param scaleX - The horizontal scale factor from useTransform
 * @returns Transform string to counter the scaling effect
 *
 * @example
 * ```tsx
 * const transform = useTransform(refRange, currentRange, 800);
 * const counterScale = useCounterScale(transform.scaleX);
 * return <text transform={counterScale}>Label</text>
 * ```
 */
export function useCounterScale(scaleX: number): string {
  return useMemo(() => {
    const inverseScale = 1 / scaleX;
    return `scale(${inverseScale}, 1)`;
  }, [scaleX]);
}

/**
 * Utility to combine parent transform with counter-scale for text elements
 */
export function getCounterScaledTransform(
  x: number,
  y: number,
  scaleX: number
): string {
  const inverseScale = 1 / scaleX;
  return `translate(${x}, ${y}) scale(${inverseScale}, 1)`;
}

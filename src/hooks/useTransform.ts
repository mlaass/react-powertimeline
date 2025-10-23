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
  /** SVG transform string ready to use (pan-only, no scale to avoid stretching) */
  transformString: string;
}

/**
 * Calculate transform to map from reference time range to current view range
 *
 * NOTE: This returns TRANSLATE-ONLY transform to avoid stretching artifacts.
 * Zoom is handled by recalculating the timeScale, not by SVG transform scaling.
 *
 * @param referenceTimeRange - The static reference time range that items are positioned against
 * @param currentTimeRange - The current visible time range after pan/zoom
 * @param width - The width of the timeline in pixels
 * @returns Transform object with translateX (scaleX provided for reference but not used in transform)
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

    // Calculate how much to shift horizontally for PANNING ONLY
    // For zoom, we recalculate the timeScale instead of using transform scale
    const referenceStartMs = referenceTimeRange.start.getTime();
    const currentStartMs = currentTimeRange.start.getTime();
    const timeDelta = currentStartMs - referenceStartMs;

    // Pixels per millisecond at reference scale
    const pxPerMs = width / referenceDuration;

    // Translation for pan offset only (no scale component to avoid stretching)
    const translateX = -timeDelta * pxPerMs;

    // Create SVG transform string with TRANSLATE ONLY
    // We do NOT apply scale transform to avoid stretching text, markers, and strokes
    // Zoom is handled by recalculating timeScale and re-rendering items with new positions
    const transformString = `translate(${translateX}, 0)`;

    return {
      translateX,
      scaleX, // Provided for reference but not used in transform
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

/**
 * Time Scale Utilities
 * 
 * Utilities for creating and managing D3 time scales for the PowerTimeline component.
 */

import { scaleTime } from 'd3-scale';
import type { TimeRange, TimeScale } from '../types';

/**
 * Creates a D3 time scale for mapping time domain to pixel range
 */
export function createTimeScale(
  timeRange: TimeRange,
  pixelRange: [number, number]
): TimeScale {
  const scale = scaleTime()
    .domain([timeRange.start, timeRange.end])
    .range(pixelRange);

  return {
    domain: [timeRange.start, timeRange.end],
    range: pixelRange,
    scale,
  };
}

/**
 * Updates an existing time scale with new domain or range
 */
export function updateTimeScale(
  timeScale: TimeScale,
  newTimeRange?: TimeRange,
  newPixelRange?: [number, number]
): TimeScale {
  const domain = newTimeRange ? [newTimeRange.start, newTimeRange.end] : timeScale.domain;
  const range = newPixelRange || timeScale.range;

  const scale = scaleTime()
    .domain(domain)
    .range(range);

  return {
    domain: domain as [Date, Date],
    range,
    scale,
  };
}

/**
 * Converts a time value to pixel coordinate using the time scale
 */
export function timeToPixel(time: Date, timeScale: TimeScale): number {
  return timeScale.scale(time);
}

/**
 * Converts a pixel coordinate to time value using the time scale
 */
export function pixelToTime(pixel: number, timeScale: TimeScale): Date {
  return timeScale.scale.invert(pixel);
}

/**
 * Calculates the time range for a given pixel range
 */
export function pixelRangeToTimeRange(
  pixelRange: [number, number],
  timeScale: TimeScale
): TimeRange {
  return {
    start: pixelToTime(pixelRange[0], timeScale),
    end: pixelToTime(pixelRange[1], timeScale),
  };
}

/**
 * Calculates the pixel range for a given time range
 */
export function timeRangeToPixelRange(
  timeRange: TimeRange,
  timeScale: TimeScale
): [number, number] {
  return [
    timeToPixel(timeRange.start, timeScale),
    timeToPixel(timeRange.end, timeScale),
  ];
}

/**
 * Calculates the duration in milliseconds for a time range
 */
export function getTimeRangeDuration(timeRange: TimeRange): number {
  return timeRange.end.getTime() - timeRange.start.getTime();
}

/**
 * Calculates the center point of a time range
 */
export function getTimeRangeCenter(timeRange: TimeRange): Date {
  const centerTime = (timeRange.start.getTime() + timeRange.end.getTime()) / 2;
  return new Date(centerTime);
}

/**
 * Expands a time range by a given factor around its center
 */
export function expandTimeRange(
  timeRange: TimeRange,
  factor: number
): TimeRange {
  const center = getTimeRangeCenter(timeRange);
  const duration = getTimeRangeDuration(timeRange);
  const newHalfDuration = (duration * factor) / 2;

  return {
    start: new Date(center.getTime() - newHalfDuration),
    end: new Date(center.getTime() + newHalfDuration),
  };
}

/**
 * Shifts a time range by a given offset in milliseconds
 */
export function shiftTimeRange(
  timeRange: TimeRange,
  offsetMs: number
): TimeRange {
  return {
    start: new Date(timeRange.start.getTime() + offsetMs),
    end: new Date(timeRange.end.getTime() + offsetMs),
  };
}

/**
 * Checks if two time ranges overlap
 */
export function timeRangesOverlap(
  range1: TimeRange,
  range2: TimeRange
): boolean {
  return range1.start < range2.end && range2.start < range1.end;
}

/**
 * Checks if a time point falls within a time range
 */
export function timeInRange(time: Date, timeRange: TimeRange): boolean {
  return time >= timeRange.start && time <= timeRange.end;
}

/**
 * Clamps a time range to stay within bounds
 */
export function clampTimeRange(
  timeRange: TimeRange,
  bounds: TimeRange
): TimeRange {
  const duration = getTimeRangeDuration(timeRange);
  
  let start = timeRange.start;
  let end = timeRange.end;

  // Clamp start
  if (start < bounds.start) {
    start = bounds.start;
    end = new Date(start.getTime() + duration);
  }

  // Clamp end
  if (end > bounds.end) {
    end = bounds.end;
    start = new Date(end.getTime() - duration);
  }

  // If duration is larger than bounds, center it
  if (duration > getTimeRangeDuration(bounds)) {
    const center = getTimeRangeCenter(bounds);
    const halfDuration = getTimeRangeDuration(bounds) / 2;
    return {
      start: new Date(center.getTime() - halfDuration),
      end: new Date(center.getTime() + halfDuration),
    };
  }

  return { start, end };
}

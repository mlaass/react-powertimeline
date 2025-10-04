import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimeScale } from '@/hooks/useTimeScale';
import type { TimeRange } from '@/types';

/**
 * Contract Test for useTimeScale Hook
 * 
 * These tests verify that the useTimeScale hook implements the exact
 * interface specified in the API contract. Tests MUST fail until implementation
 * is complete.
 */

describe('useTimeScale Contract', () => {
  const defaultTimeRange: TimeRange = {
    start: new Date('2024-01-01T00:00:00Z'),
    end: new Date('2024-01-01T04:00:00Z'),
  };

  const defaultPixelRange: [number, number] = [0, 800];

  it('should return a time scale function', () => {
    const { result } = renderHook(() =>
      useTimeScale(defaultTimeRange, defaultPixelRange)
    );

    expect(result.current).toBeDefined();
    expect(typeof result.current.scale).toBe('function');
  });

  it('should return scale with correct domain and range', () => {
    const { result } = renderHook(() =>
      useTimeScale(defaultTimeRange, defaultPixelRange)
    );

    const { scale } = result.current;
    
    // Domain should match the time range
    const domain = scale.domain();
    expect(domain[0]).toEqual(defaultTimeRange.start);
    expect(domain[1]).toEqual(defaultTimeRange.end);

    // Range should match the pixel range
    const range = scale.range();
    expect(range[0]).toBe(0);
    expect(range[1]).toBe(800);
  });

  it('should convert time to pixel coordinates correctly', () => {
    const { result } = renderHook(() =>
      useTimeScale(defaultTimeRange, defaultPixelRange)
    );

    const { scale } = result.current;

    // Start time should map to start pixel
    const startPixel = scale(defaultTimeRange.start);
    expect(startPixel).toBe(0);

    // End time should map to end pixel
    const endPixel = scale(defaultTimeRange.end);
    expect(endPixel).toBe(800);

    // Middle time should map to middle pixel
    const middleTime = new Date('2024-01-01T02:00:00Z');
    const middlePixel = scale(middleTime);
    expect(middlePixel).toBe(400);
  });

  it('should handle different time ranges', () => {
    const shortRange: TimeRange = {
      start: new Date('2024-01-01T00:00:00Z'),
      end: new Date('2024-01-01T00:05:00Z'), // 5 minutes
    };

    const longRange: TimeRange = {
      start: new Date('2024-01-01T00:00:00Z'),
      end: new Date('2025-01-01T00:00:00Z'), // 1 year
    };

    expect(() => {
      renderHook(() => useTimeScale(shortRange, defaultPixelRange));
    }).not.toThrow();

    expect(() => {
      renderHook(() => useTimeScale(longRange, defaultPixelRange));
    }).not.toThrow();
  });

  it('should handle different pixel ranges', () => {
    const smallRange: [number, number] = [0, 200];
    const largeRange: [number, number] = [0, 2000];

    expect(() => {
      renderHook(() => useTimeScale(defaultTimeRange, smallRange));
    }).not.toThrow();

    expect(() => {
      renderHook(() => useTimeScale(defaultTimeRange, largeRange));
    }).not.toThrow();
  });

  it('should provide invert function for pixel to time conversion', () => {
    const { result } = renderHook(() =>
      useTimeScale(defaultTimeRange, defaultPixelRange)
    );

    const { scale } = result.current;

    if ('invert' in scale) {
      // Pixel 0 should map to start time
      const startTime = scale.invert(0);
      expect(startTime).toEqual(defaultTimeRange.start);

      // Pixel 800 should map to end time
      const endTime = scale.invert(800);
      expect(endTime).toEqual(defaultTimeRange.end);

      // Pixel 400 should map to middle time
      const middleTime = scale.invert(400);
      expect(middleTime).toEqual(new Date('2024-01-01T02:00:00Z'));
    }
  });

  it('should update when time range changes', () => {
    const { result, rerender } = renderHook(
      ({ timeRange }) => useTimeScale(timeRange, defaultPixelRange),
      {
        initialProps: { timeRange: defaultTimeRange },
      }
    );

    const initialScale = result.current.scale;
    const initialStartPixel = initialScale(defaultTimeRange.start);
    expect(initialStartPixel).toBe(0);

    // Change time range
    const newTimeRange: TimeRange = {
      start: new Date('2024-01-01T01:00:00Z'),
      end: new Date('2024-01-01T05:00:00Z'),
    };

    rerender({ timeRange: newTimeRange });

    const updatedScale = result.current.scale;
    const updatedStartPixel = updatedScale(newTimeRange.start);
    expect(updatedStartPixel).toBe(0);
  });

  it('should handle edge cases gracefully', () => {
    // Same start and end time
    const sameTimeRange: TimeRange = {
      start: new Date('2024-01-01T00:00:00Z'),
      end: new Date('2024-01-01T00:00:00Z'),
    };

    expect(() => {
      renderHook(() => useTimeScale(sameTimeRange, defaultPixelRange));
    }).not.toThrow();

    // Zero pixel range
    const zeroPixelRange: [number, number] = [0, 0];

    expect(() => {
      renderHook(() => useTimeScale(defaultTimeRange, zeroPixelRange));
    }).not.toThrow();
  });
});

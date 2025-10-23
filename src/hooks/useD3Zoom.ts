/**
 * useD3Zoom Hook
 * 
 * Custom hook for managing D3 zoom behavior in the PowerTimeline component.
 * Handles pan, zoom, and touch gestures with React state integration.
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import type { TimeRange } from '../types';
import { 
  expandTimeRange, 
  shiftTimeRange, 
  getTimeRangeDuration, 
  getTimeRangeCenter,
  clampTimeRange 
} from '../utils/timeScale';

export interface UseD3ZoomOptions {
  /** Minimum zoom scale (how far you can zoom out) */
  minScale?: number;
  /** Maximum zoom scale (how far you can zoom in) */
  maxScale?: number;
  /** Minimum time range duration in milliseconds */
  minDuration?: number;
  /** Maximum time range duration in milliseconds */
  maxDuration?: number;
  /** Enable touch gestures */
  enableTouch?: boolean;
  /** Enable mouse wheel zoom */
  enableWheel?: boolean;
  /** Enable drag to pan */
  enableDrag?: boolean;
}

export interface UseD3ZoomReturn {
  /** Current time range */
  currentTimeRange: TimeRange;
  /** D3 zoom behavior instance */
  zoomBehavior: any;
  /** Apply zoom transformation programmatically */
  applyZoom?: (scale: number, translateX: number) => void;
  /** Zoom in programmatically */
  zoomIn?: () => void;
  /** Zoom out programmatically */
  zoomOut?: () => void;
  /** Reset zoom to initial state */
  resetZoom?: () => void;
  /** Zoom to fit a specific time range */
  zoomToFit?: (timeRange: TimeRange) => void;
}

/**
 * Hook for managing D3 zoom behavior
 */
export function useD3Zoom(
  initialTimeRange: TimeRange,
  onViewChange: (newTimeRange: TimeRange) => void,
  width: number,
  options: UseD3ZoomOptions = {}
): UseD3ZoomReturn {
  const {
    minScale = 0.1,
    maxScale = 100,
    minDuration = 1000, // 1 second
    maxDuration = 365 * 24 * 60 * 60 * 1000, // 1 year
    enableTouch = true,
    enableWheel = true,
    enableDrag = true,
  } = options;

  const [currentTimeRange, setCurrentTimeRange] = useState<TimeRange>(initialTimeRange);
  const zoomBehaviorRef = useRef<any>(null);
  const containerRef = useRef<SVGSVGElement | null>(null);

  // Create zoom behavior
  useEffect(() => {
    const zoomBehavior = d3Zoom()
      .scaleExtent([minScale, maxScale])
      .on('zoom', (event) => {
        const { transform } = event;
        handleZoomTransform(transform);
      });

    // Configure gesture support
    if (!enableTouch) {
      zoomBehavior.touchable(() => false);
    }
    if (!enableWheel) {
      zoomBehavior.wheelDelta(() => 0);
    }
    if (!enableDrag) {
      zoomBehavior.on('start drag', null);
    }

    zoomBehaviorRef.current = zoomBehavior;
  }, [minScale, maxScale, enableTouch, enableWheel, enableDrag]);

  // Handle zoom transformation
  const handleZoomTransform = useCallback((transform: any) => {
    const { k: scale, x: translateX } = transform;
    
    // Calculate new duration based on scale
    const originalDuration = getTimeRangeDuration(initialTimeRange);
    const newDuration = Math.max(minDuration, Math.min(maxDuration, originalDuration / scale));
    
    // Create a time scale from the original range to pixel coordinates
    const originalTimeScale = scaleTime()
      .domain([initialTimeRange.start, initialTimeRange.end])
      .range([0, width]);
    
    // Apply the inverse transform to get the new domain
    const newStart = originalTimeScale.invert(-translateX / scale);
    const newEnd = new Date(newStart.getTime() + newDuration);
    
    let newTimeRange: TimeRange = {
      start: newStart,
      end: newEnd,
    };

    // Clamp to reasonable bounds if needed
    const maxBounds: TimeRange = {
      start: new Date(initialTimeRange.start.getTime() - maxDuration),
      end: new Date(initialTimeRange.end.getTime() + maxDuration),
    };
    newTimeRange = clampTimeRange(newTimeRange, maxBounds);

    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
  }, [initialTimeRange, width, minDuration, maxDuration, onViewChange]);

  // Apply zoom programmatically
  const applyZoom = useCallback((scale: number, translateX: number) => {
    const transform = { k: scale, x: translateX, y: 0 };
    handleZoomTransform(transform);
  }, [handleZoomTransform]);

  // Zoom in programmatically
  const zoomIn = useCallback(() => {
    const newTimeRange = expandTimeRange(currentTimeRange, 0.5); // Zoom in by 50%
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
  }, [currentTimeRange, onViewChange]);

  // Zoom out programmatically
  const zoomOut = useCallback(() => {
    const newTimeRange = expandTimeRange(currentTimeRange, 2); // Zoom out by 200%
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
  }, [currentTimeRange, onViewChange]);

  // Reset zoom
  const resetZoom = useCallback(() => {
    setCurrentTimeRange(initialTimeRange);
    onViewChange(initialTimeRange);
    
    if (zoomBehaviorRef.current && containerRef.current) {
      select(containerRef.current).call(
        zoomBehaviorRef.current.transform,
        zoomIdentity
      );
    }
  }, [initialTimeRange, onViewChange]);

  // Zoom to fit specific time range
  const zoomToFit = useCallback((timeRange: TimeRange) => {
    setCurrentTimeRange(timeRange);
    onViewChange(timeRange);
  }, [onViewChange]);

  // Update current time range when initial range changes
  useEffect(() => {
    setCurrentTimeRange(initialTimeRange);
  }, [initialTimeRange.start.getTime(), initialTimeRange.end.getTime()]);

  return {
    currentTimeRange,
    zoomBehavior: zoomBehaviorRef.current,
    applyZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomToFit,
  };
}

/**
 * Hook for keyboard-controlled zoom
 */
export function useKeyboardZoom(
  zoomControls: Pick<UseD3ZoomReturn, 'zoomIn' | 'zoomOut' | 'resetZoom'>
): (event: React.KeyboardEvent) => void {
  return useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case '+':
      case '=':
        event.preventDefault();
        zoomControls.zoomIn?.();
        break;
      case '-':
      case '_':
        event.preventDefault();
        zoomControls.zoomOut?.();
        break;
      case '0':
      case 'Home':
        event.preventDefault();
        zoomControls.resetZoom?.();
        break;
    }
  }, [zoomControls]);
}

/**
 * Hook for touch gesture handling
 */
export function useTouchGestures(
  onPan: (deltaX: number) => void,
  onZoom: (scale: number, centerX: number) => void
): {
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchMove: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
} {
  const touchStateRef = useRef<{
    initialTouches: React.Touch[];
    lastTouches: React.Touch[];
    initialDistance: number;
    initialCenter: { x: number; y: number };
  } | null>(null);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    const touches = Array.from(event.touches);
    
    if (touches.length === 1 || touches.length === 2) {
      const initialDistance = touches.length === 2 
        ? Math.hypot(
            touches[1].clientX - touches[0].clientX,
            touches[1].clientY - touches[0].clientY
          )
        : 0;
      
      const initialCenter = touches.length === 2
        ? {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2,
          }
        : { x: touches[0].clientX, y: touches[0].clientY };

      touchStateRef.current = {
        initialTouches: touches,
        lastTouches: touches,
        initialDistance,
        initialCenter,
      };
    }
  }, []);

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    const touches = Array.from(event.touches);
    const touchState = touchStateRef.current;
    
    if (!touchState || touches.length !== touchState.initialTouches.length) {
      return;
    }

    if (touches.length === 1) {
      // Single touch - pan
      const deltaX = touches[0].clientX - touchState.lastTouches[0].clientX;
      onPan(deltaX);
    } else if (touches.length === 2) {
      // Two touches - pinch to zoom
      const currentDistance = Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      );
      
      const scale = currentDistance / touchState.initialDistance;
      const centerX = (touches[0].clientX + touches[1].clientX) / 2;
      
      onZoom(scale, centerX);
    }

    touchStateRef.current.lastTouches = touches;
  }, [onPan, onZoom]);

  const onTouchEnd = useCallback(() => {
    touchStateRef.current = null;
  }, []);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

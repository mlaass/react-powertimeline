import { TimeRange } from '../types';

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
export declare function useD3Zoom(initialTimeRange: TimeRange, onViewChange: (newTimeRange: TimeRange) => void, width: number, options?: UseD3ZoomOptions): UseD3ZoomReturn;
/**
 * Hook for keyboard-controlled zoom
 */
export declare function useKeyboardZoom(zoomControls: Pick<UseD3ZoomReturn, 'zoomIn' | 'zoomOut' | 'resetZoom'>): (event: React.KeyboardEvent) => void;
/**
 * Hook for touch gesture handling
 */
export declare function useTouchGestures(onPan: (deltaX: number) => void, onZoom: (scale: number, centerX: number) => void): {
    onTouchStart: (event: React.TouchEvent) => void;
    onTouchMove: (event: React.TouchEvent) => void;
    onTouchEnd: (event: React.TouchEvent) => void;
};
//# sourceMappingURL=useD3Zoom.d.ts.map
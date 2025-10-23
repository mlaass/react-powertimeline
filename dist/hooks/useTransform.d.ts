import { TimeRange } from '../types';

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
export declare function useTransform(referenceTimeRange: TimeRange, currentTimeRange: TimeRange, width: number): Transform;
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
export declare function useCounterScale(scaleX: number): string;
/**
 * Utility to combine parent transform with counter-scale for text elements
 */
export declare function getCounterScaledTransform(x: number, y: number, scaleX: number): string;
//# sourceMappingURL=useTransform.d.ts.map
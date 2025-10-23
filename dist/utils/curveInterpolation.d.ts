/**
 * Curve Interpolation Utilities
 *
 * Functions to interpolate curve values at any horizontal position
 */
export interface DataPoint {
    time: Date;
    value: number;
}
/**
 * Interpolates a curve value at a specific time position
 */
export declare function interpolateCurveValue(dataPoints: DataPoint[], targetTime: Date, interpolationType?: 'linear' | 'step' | 'basis' | 'cardinal'): number | null;
/**
 * Converts a horizontal pixel position to a time using the time scale
 */
export declare function pixelToTimeFromScale(pixelX: number, timeScale: {
    scale: any;
}): Date;
/**
 * Gets the interpolated value for a curve at a specific pixel position
 */
export declare function getCurveValueAtPixel(dataPoints: DataPoint[], pixelX: number, timeScale: {
    scale: any;
}, interpolationType?: 'linear' | 'step' | 'basis' | 'cardinal'): {
    value: number;
    time: Date;
} | null;
/**
 * Finds the curve with the highest visual position (lowest Y coordinate) at a specific pixel position
 */
export declare function findHighestCurveAtPixel(curves: Array<{
    id: string | number;
    dataPoints: DataPoint[];
    interpolation?: 'linear' | 'step' | 'basis' | 'cardinal';
}>, pixelX: number, timeScale: {
    scale: any;
}, laneHeight?: number): {
    curveId: string | number;
    value: number;
    time: Date;
    yPosition: number;
} | null;
//# sourceMappingURL=curveInterpolation.d.ts.map
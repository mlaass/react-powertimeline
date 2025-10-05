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
export function interpolateCurveValue(
  dataPoints: DataPoint[],
  targetTime: Date,
  interpolationType: 'linear' | 'step' | 'basis' | 'cardinal' = 'linear'
): number | null {
  if (dataPoints.length === 0) return null;
  if (dataPoints.length === 1) return dataPoints[0].value;

  const targetTimestamp = targetTime.getTime();
  
  // Find the two points that bracket the target time
  let leftPoint: DataPoint | null = null;
  let rightPoint: DataPoint | null = null;
  
  for (let i = 0; i < dataPoints.length - 1; i++) {
    const current = dataPoints[i];
    const next = dataPoints[i + 1];
    
    if (current.time.getTime() <= targetTimestamp && next.time.getTime() >= targetTimestamp) {
      leftPoint = current;
      rightPoint = next;
      break;
    }
  }
  
  // Handle edge cases
  if (!leftPoint && !rightPoint) {
    // Target is outside the data range
    if (targetTimestamp < dataPoints[0].time.getTime()) {
      return dataPoints[0].value;
    } else {
      return dataPoints[dataPoints.length - 1].value;
    }
  }
  
  if (!leftPoint) leftPoint = dataPoints[0];
  if (!rightPoint) rightPoint = dataPoints[dataPoints.length - 1];
  
  // If we're exactly on a data point, return its value
  if (leftPoint.time.getTime() === targetTimestamp) return leftPoint.value;
  if (rightPoint.time.getTime() === targetTimestamp) return rightPoint.value;
  
  // Interpolate based on type
  switch (interpolationType) {
    case 'step':
      // Step interpolation - use the left value
      return leftPoint.value;
      
    case 'linear':
    default:
      // Linear interpolation
      const leftTime = leftPoint.time.getTime();
      const rightTime = rightPoint.time.getTime();
      const timeRange = rightTime - leftTime;
      
      if (timeRange === 0) return leftPoint.value;
      
      const progress = (targetTimestamp - leftTime) / timeRange;
      return leftPoint.value + (rightPoint.value - leftPoint.value) * progress;
      
    case 'basis':
    case 'cardinal':
      // For now, fall back to linear interpolation
      // Could implement more sophisticated spline interpolation later
      const leftTimeB = leftPoint.time.getTime();
      const rightTimeB = rightPoint.time.getTime();
      const timeRangeB = rightTimeB - leftTimeB;
      
      if (timeRangeB === 0) return leftPoint.value;
      
      const progressB = (targetTimestamp - leftTimeB) / timeRangeB;
      return leftPoint.value + (rightPoint.value - leftPoint.value) * progressB;
  }
}

/**
 * Converts a horizontal pixel position to a time using the time scale
 */
export function pixelToTimeFromScale(
  pixelX: number,
  timeScale: { scale: any }
): Date {
  return timeScale.scale.invert(pixelX);
}

/**
 * Gets the interpolated value for a curve at a specific pixel position
 */
export function getCurveValueAtPixel(
  dataPoints: DataPoint[],
  pixelX: number,
  timeScale: { scale: any },
  interpolationType: 'linear' | 'step' | 'basis' | 'cardinal' = 'linear'
): { value: number; time: Date } | null {
  const targetTime = pixelToTimeFromScale(pixelX, timeScale);
  const value = interpolateCurveValue(dataPoints, targetTime, interpolationType);
  
  if (value === null) return null;
  
  return {
    value,
    time: targetTime
  };
}

/**
 * Finds the curve with the highest visual position (lowest Y coordinate) at a specific pixel position
 */
export function findHighestCurveAtPixel(
  curves: Array<{
    id: string | number;
    dataPoints: DataPoint[];
    interpolation?: 'linear' | 'step' | 'basis' | 'cardinal';
  }>,
  pixelX: number,
  timeScale: { scale: any },
  laneHeight: number = 100
): { curveId: string | number; value: number; time: Date; yPosition: number } | null {
  if (curves.length === 0) return null;
  
  const targetTime = pixelToTimeFromScale(pixelX, timeScale);
  let highestCurve: { curveId: string | number; value: number; time: Date; yPosition: number } | null = null;
  
  for (const curve of curves) {
    const value = interpolateCurveValue(
      curve.dataPoints, 
      targetTime, 
      curve.interpolation || 'linear'
    );
    
    if (value !== null) {
      // Convert data value to Y position using the same logic as CurveItem
      const values = curve.dataPoints.map(d => d.value);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const valueRange = maxValue - minValue;
      
      let yPosition: number;
      if (valueRange > 0) {
        const normalizedValue = (value - minValue) / valueRange;
        yPosition = laneHeight - (normalizedValue * laneHeight * 0.8) - (laneHeight * 0.1);
      } else {
        yPosition = laneHeight / 2;
      }
      
      // Find curve with lowest Y position (highest on screen)
      if (!highestCurve || yPosition < highestCurve.yPosition) {
        highestCurve = {
          curveId: curve.id,
          value,
          time: targetTime,
          yPosition
        };
      }
    }
  }
  
  return highestCurve;
}

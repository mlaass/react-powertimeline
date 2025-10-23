/**
 * TimelineAxis Component Types
 */

import type { TimeRange, TimeScale } from '../../types';

export type { TimeRange, TimeScale };

export interface TimelineAxisProps {
  /** Time range to display */
  timeRange: TimeRange;
  /** Width of the axis */
  width: number;
  /** Height of the axis */
  height: number;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

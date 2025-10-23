import { default as React } from 'react';
import { TimeRange } from '../../types';
import { Transform } from '../../hooks/useTransform';

export interface TimelineAxisProps {
    /** Reference time range (static) */
    referenceTimeRange: TimeRange;
    /** Current visible time range (for tick calculation) */
    currentTimeRange: TimeRange;
    /** View transform for pan/zoom */
    viewTransform: Transform;
    /** Width of the axis */
    width: number;
    /** Height of the axis */
    height: number;
    /** CSS class name */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
}
export declare const TimelineAxis: React.FC<TimelineAxisProps>;
export default TimelineAxis;
//# sourceMappingURL=TimelineAxis.d.ts.map
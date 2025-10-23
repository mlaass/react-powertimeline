import { default as React } from 'react';
import { TimeRange } from '../../types';

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
export declare const TimelineAxis: React.FC<TimelineAxisProps>;
export default TimelineAxis;
//# sourceMappingURL=TimelineAxis.d.ts.map
import { Item, ItemLabel, LabelStyle, CurveItem, DataPoint, CurveStyle, EventItem, EventStyle, TimeRangeItem, TimeRangeStyle, MarkerType, InterpolationType, LabelPosition } from '../../types';

export type { Item, ItemLabel, LabelStyle, CurveItem, DataPoint, CurveStyle, EventItem, EventStyle, TimeRangeItem, TimeRangeStyle, MarkerType, InterpolationType, LabelPosition, };
export interface BaseItemProps {
    /** Time scale for positioning */
    timeScale?: any;
    /** Lane height for vertical positioning */
    laneHeight: number;
    /** Callback for click events */
    onItemClick?: (item: Item, event: React.MouseEvent) => void;
    /** Callback for hover events */
    onItemHover?: (item: Item, event: React.MouseEvent) => void;
    /** Whether the item is currently selected */
    isSelected?: boolean;
    /** Whether the item is currently hovered */
    isHovered?: boolean;
}
export interface CurveItemProps extends CurveItem, BaseItemProps {
    /** Y-scale for value positioning */
    yScale?: any;
}
export interface EventItemProps extends EventItem, BaseItemProps {
}
export interface TimeRangeItemProps extends TimeRangeItem, BaseItemProps {
}
export interface ItemRenderContext {
    timeScale: any;
    laneHeight: number;
    viewport: any;
    isVirtualized: boolean;
}
//# sourceMappingURL=types.d.ts.map
import { Lane, LaneStyle, Item, ItemType, CurveItem, EventItem, TimeRangeItem, StackingOrder } from '../../types';
import { Transform } from '../../hooks/useTransform';

export type { Lane, LaneStyle, Item, ItemType, CurveItem, EventItem, TimeRangeItem, StackingOrder, };
export interface LaneProps extends Lane {
    /** Items to render in this lane */
    items: ItemType[];
    /** Time scale for positioning items (reference scale, static) */
    timeScale?: any;
    /** View transform for pan/zoom (translates from reference to current view) */
    viewTransform?: Transform;
    /** Viewport information for virtualization */
    viewport?: any;
    /** Callback for item interactions */
    onItemClick?: (item: Item, event: React.MouseEvent) => void;
    /** Callback for item hover */
    onItemHover?: (item: Item, event: React.MouseEvent) => void;
}
export interface LaneState {
    stackedItems: Map<string | number, number>;
    laneHeight: number;
    isExpanded: boolean;
}
//# sourceMappingURL=Lane.types.d.ts.map
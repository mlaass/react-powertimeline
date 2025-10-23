import { PowerTimelineProps, PowerTimelineRef, TimeRange, TimeScale, Viewport, VirtualizationState, Lane, Item, CurveItem, EventItem, TimeRangeItem, ItemType } from '../../types';

export type { PowerTimelineProps, PowerTimelineRef, TimeRange, TimeScale, Viewport, VirtualizationState, Lane, Item, CurveItem, EventItem, TimeRangeItem, ItemType, };
export interface PowerTimelineState {
    currentTimeRange: TimeRange;
    isInteracting: boolean;
    lastInteractionTime: number;
}
export interface PowerTimelineContext {
    timeScale: TimeScale;
    viewport: Viewport;
    virtualizationState: VirtualizationState;
}
//# sourceMappingURL=PowerTimeline.types.d.ts.map
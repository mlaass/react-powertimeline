/**
 * PowerTimeline Component Types
 * 
 * Re-exports main types for the PowerTimeline component from the central types module.
 * This provides a component-specific interface while maintaining consistency.
 */

export type {
  PowerTimelineProps,
  PowerTimelineRef,
  TimeRange,
  TimeScale,
  Viewport,
  VirtualizationState,
  Lane,
  Item,
  CurveItem,
  EventItem,
  TimeRangeItem,
  ItemType,
} from '../../types';

// PowerTimeline-specific internal types
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

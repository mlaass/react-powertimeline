/**
 * PowerTimeline React Component Library
 * 
 * Main entry point for the PowerTimeline component library.
 * Exports all public components, types, and utilities.
 */

// Main component
export { PowerTimeline as default } from './components/PowerTimeline';
export { PowerTimeline } from './components/PowerTimeline';

// Sub-components (for advanced usage)
export { Lane } from './components/Lane';
export { TimelineAxis } from './components/TimelineAxis';
export { CurveItem } from './components/items/CurveItem';
export { EventItem } from './components/items/EventItem';
export { TimeRangeItem } from './components/items/TimeRangeItem';
export { ErrorBoundary } from './components/ErrorBoundary';

// Hooks (for custom implementations)
export { useTimeScale } from './hooks/useTimeScale';
export { useVirtualization } from './hooks/useVirtualization';
export { useD3Zoom } from './hooks/useD3Zoom';

// Utilities (for advanced usage)
export * from './utils/timeScale';
export * from './utils/virtualization';
export * from './utils/accessibility';

// Types (for TypeScript users)
export type {
  PowerTimelineProps,
  PowerTimelineRef,
  TimeRange,
  TimeScale,
  Viewport,
  VirtualizationState,
  Lane as LaneType,
  LaneStyle,
  Item,
  ItemLabel,
  LabelStyle,
  CurveItem as CurveItemType,
  DataPoint,
  CurveStyle,
  EventItem as EventItemType,
  EventStyle,
  TimeRangeItem as TimeRangeItemType,
  TimeRangeStyle,
  ItemType,
  MarkerType,
  InterpolationType,
  StackingOrder,
  LabelPosition,
} from './types';

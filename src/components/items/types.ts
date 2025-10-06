/**
 * Item Component Types
 * 
 * Re-exports and extends types for all item components (CurveItem, EventItem, TimeRangeItem).
 */

import type {
  Item,
  ItemLabel,
  LabelStyle,
  CurveItem,
  DataPoint,
  CurveStyle,
  EventItem,
  EventStyle,
  TimeRangeItem,
  TimeRangeStyle,
  MarkerType,
  InterpolationType,
  LabelPosition,
} from '../../types';

// Re-export for consumers
export type {
  Item,
  ItemLabel,
  LabelStyle,
  CurveItem,
  DataPoint,
  CurveStyle,
  EventItem,
  EventStyle,
  TimeRangeItem,
  TimeRangeStyle,
  MarkerType,
  InterpolationType,
  LabelPosition,
};

// Base props for all item components
export interface BaseItemProps {
  /** Time scale for positioning */
  timeScale?: any; // Will be properly typed when D3 scale is implemented
  
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

// CurveItem component props
export interface CurveItemProps extends CurveItem, BaseItemProps {
  /** Y-scale for value positioning */
  yScale?: any; // Will be properly typed when D3 scale is implemented
}

// EventItem component props  
export interface EventItemProps extends EventItem, BaseItemProps {}

// TimeRangeItem component props
export interface TimeRangeItemProps extends TimeRangeItem, BaseItemProps {}

// Item rendering context
export interface ItemRenderContext {
  timeScale: any;
  laneHeight: number;
  viewport: any;
  isVirtualized: boolean;
}

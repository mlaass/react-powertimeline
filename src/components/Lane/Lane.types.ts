/**
 * Lane Component Types
 *
 * Re-exports and extends types specific to the Lane component.
 */

import type {
  Lane,
  LaneStyle,
  Item,
  ItemType,
  CurveItem,
  EventItem,
  TimeRangeItem,
  StackingOrder,
} from '../../types';
import type { Transform } from '../../hooks/useTransform';

export type {
  Lane,
  LaneStyle,
  Item,
  ItemType,
  CurveItem,
  EventItem,
  TimeRangeItem,
  StackingOrder,
};

// Lane-specific props interface
export interface LaneProps extends Lane {
  /** Items to render in this lane */
  items: ItemType[];

  /** Time scale for positioning items (reference scale, static) */
  timeScale?: any; // Will be properly typed when D3 scale is implemented

  /** View transform for pan/zoom (translates from reference to current view) */
  viewTransform?: Transform;

  /** Viewport information for virtualization */
  viewport?: any; // Will be properly typed when viewport is implemented

  /** Callback for item interactions */
  onItemClick?: (item: Item, event: React.MouseEvent) => void;

  /** Callback for item hover */
  onItemHover?: (item: Item, event: React.MouseEvent) => void;
}

// Lane-specific internal types
export interface LaneState {
  stackedItems: Map<string | number, number>; // item id -> stack level
  laneHeight: number;
  isExpanded: boolean;
}

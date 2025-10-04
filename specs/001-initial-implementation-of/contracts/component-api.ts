/**
 * PowerTimeline Component API Contract
 * 
 * This file defines the complete TypeScript interface contract for the PowerTimeline component.
 * All interfaces must be implemented exactly as specified to ensure API stability.
 */

// ============================================================================
// MAIN COMPONENT INTERFACE
// ============================================================================

export interface PowerTimelineProps {
  /** Array of lane configurations defining the timeline structure */
  lanes: Lane[];
  
  /** Array of data items to be rendered across the lanes */
  items: Array<CurveItem | EventItem | TimeRangeItem>;
  
  /** Initial time range to display when component mounts */
  initialTimeRange: TimeRange;
  
  /** Callback fired when the visible time range changes due to pan/zoom */
  onViewChange: (newTimeRange: TimeRange) => void;
  
  /** Optional callback fired when a data item is clicked */
  onItemClick?: (item: Item, event: React.MouseEvent) => void;
  
  /** Optional callback fired when a data item is hovered */
  onItemHover?: (item: Item, event: React.MouseEvent) => void;
  
  /** Component width in pixels */
  width: number;
  
  /** Component height in pixels */
  height: number;
  
  /** Buffer zone for virtualization as fraction of viewport width (default: 0.5) */
  bufferZone?: number;
  
  /** CSS class name for the root element */
  className?: string;
  
  /** Inline styles for the root element */
  style?: React.CSSProperties;
  
  /** Accessibility label for the timeline */
  ariaLabel?: string;
}

// ============================================================================
// LANE INTERFACES
// ============================================================================

export interface Lane {
  /** Unique identifier for the lane */
  id: string | number;
  
  /** Height of the lane in pixels */
  height: number;
  
  /** Visual styling for the lane */
  style?: LaneStyle;
  
  /** Optional label for the lane */
  label?: string;
  
  /** Stacking order for overlapping items in this lane */
  stackingOrder?: 'recent-top' | 'recent-bottom' | 'custom';
}

export interface LaneStyle {
  /** Background color of the lane */
  backgroundColor?: string;
  
  /** Border color of the lane */
  borderColor?: string;
  
  /** Border width in pixels */
  borderWidth?: number;
}

// ============================================================================
// BASE ITEM INTERFACES
// ============================================================================

export interface Item {
  /** Unique identifier for the item */
  id: string | number;
  
  /** ID of the lane this item belongs to */
  laneId: string | number;
  
  /** Optional label configuration */
  label?: ItemLabel;
  
  /** Additional metadata for the item */
  metadata?: Record<string, any>;
}

export interface ItemLabel {
  /** Text content of the label */
  text: string;
  
  /** Position of the label relative to the item */
  position: 'top' | 'bottom' | 'inline';
  
  /** Visual styling for the label */
  style?: LabelStyle;
}

export interface LabelStyle {
  /** Font size in pixels */
  fontSize?: number;
  
  /** Text color */
  color?: string;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Padding in pixels */
  padding?: number;
}

// ============================================================================
// CURVE ITEM INTERFACES (Time Series)
// ============================================================================

export interface CurveItem extends Item {
  type: 'curve';
  
  /** Array of data points defining the curve */
  dataPoints: DataPoint[];
  
  /** Visual styling for the curve */
  style: CurveStyle;
  
  /** Interpolation method for connecting points */
  interpolation?: 'linear' | 'step' | 'basis' | 'cardinal';
}

export interface DataPoint {
  /** Time coordinate */
  time: Date;
  
  /** Value coordinate */
  value: number;
}

export interface CurveStyle {
  /** Stroke color for the line */
  strokeColor: string;
  
  /** Stroke width in pixels (default: 2) */
  strokeWidth?: number;
  
  /** Optional fill color for area under curve */
  fillColor?: string;
  
  /** Opacity (0-1, default: 1) */
  opacity?: number;
}

// ============================================================================
// EVENT ITEM INTERFACES (Point-in-Time)
// ============================================================================

export interface EventItem extends Item {
  type: 'event';
  
  /** Time when the event occurs */
  time: Date;
  
  /** Visual styling for the event marker */
  style: EventStyle;
}

export interface EventStyle {
  /** Type of marker to display */
  markerType: 'line' | 'circle' | 'triangle' | 'square' | 'custom';
  
  /** Color of the marker */
  color: string;
  
  /** Size of the marker in pixels (default: 8) */
  size?: number;
  
  /** Stroke width for marker outline (default: 2) */
  strokeWidth?: number;
  
  /** Custom SVG path for markerType: 'custom' */
  customSvg?: string;
}

// ============================================================================
// TIME RANGE ITEM INTERFACES (Duration-Based)
// ============================================================================

export interface TimeRangeItem extends Item {
  type: 'time-range';
  
  /** Start time of the range */
  startTime: Date;
  
  /** End time of the range */
  endTime: Date;
  
  /** Visual styling for the time range */
  style: TimeRangeStyle;
  
  /** Stack level for overlapping items (auto-calculated if not provided) */
  stackLevel?: number;
}

export interface TimeRangeStyle {
  /** Background color of the range */
  backgroundColor: string;
  
  /** Border color */
  borderColor?: string;
  
  /** Border width in pixels (default: 1) */
  borderWidth?: number;
  
  /** Opacity (0-1, default: 0.7) */
  opacity?: number;
  
  /** Border radius in pixels (default: 2) */
  borderRadius?: number;
}

// ============================================================================
// UTILITY INTERFACES
// ============================================================================

export interface TimeRange {
  /** Start of the time range */
  start: Date;
  
  /** End of the time range */
  end: Date;
}

export interface TimeScale {
  /** Time domain [start, end] */
  domain: [Date, Date];
  
  /** Pixel range [start, end] */
  range: [number, number];
  
  /** D3 scale function */
  scale: d3.ScaleTime<number, number>;
}

export interface Viewport {
  /** Currently visible time range */
  timeRange: TimeRange;
  
  /** Pixel coordinates of the viewport */
  pixelRange: [number, number];
  
  /** Buffer zone size */
  bufferZone: number;
  
  /** Items currently in the viewport */
  visibleItems: Item[];
}

// ============================================================================
// COMPONENT REF INTERFACE
// ============================================================================

export interface PowerTimelineRef {
  /** Get the current visible time range */
  getTimeRange: () => TimeRange;
  
  /** Set the visible time range programmatically */
  setTimeRange: (timeRange: TimeRange) => void;
  
  /** Zoom to fit all data */
  zoomToFit: () => void;
  
  /** Get current viewport information */
  getViewport: () => Viewport;
}

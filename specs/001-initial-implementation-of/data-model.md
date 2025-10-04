# Data Model: PowerTimeline Component

## Core Entities

### PowerTimeline (Main Component)
```typescript
interface PowerTimelineProps {
  lanes: Lane[];
  items: Array<CurveItem | EventItem | TimeRangeItem>;
  initialTimeRange: TimeRange;
  onViewChange: (newTimeRange: TimeRange) => void;
  onItemClick?: (item: Item) => void;
  onItemHover?: (item: Item) => void;
  width: number;
  height: number;
  bufferZone?: number; // Default: 0.5 (50% of viewport width)
  className?: string;
  style?: React.CSSProperties;
}
```

**Validation Rules**:
- `width` and `height` must be positive numbers
- `initialTimeRange.start` must be before `initialTimeRange.end`
- `lanes` array must not be empty
- Each item's `laneId` must correspond to an existing lane
- `bufferZone` must be between 0 and 2 (0-200% of viewport)

**State Transitions**:
- Initial → Rendered: Component mounts with initial time range
- Rendered → Panning: User initiates pan gesture
- Panning → Rendered: Pan gesture completes, triggers onViewChange
- Rendered → Zooming: User initiates zoom gesture
- Zooming → Rendered: Zoom completes, triggers onViewChange

### Lane
```typescript
interface Lane {
  id: string | number;
  height: number;
  style?: LaneStyle;
  label?: string;
  stackingOrder?: 'recent-top' | 'recent-bottom' | 'custom';
}

interface LaneStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
```

**Validation Rules**:
- `id` must be unique within lanes array
- `height` must be positive number (minimum 20px for accessibility)
- `stackingOrder` defaults to 'recent-top'

### Base Item
```typescript
interface Item {
  id: string | number;
  laneId: string | number;
  label?: ItemLabel;
  metadata?: Record<string, any>;
}

interface ItemLabel {
  text: string;
  position: 'top' | 'bottom' | 'inline';
  style?: LabelStyle;
}

interface LabelStyle {
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  padding?: number;
}
```

**Validation Rules**:
- `id` must be unique within all items
- `laneId` must reference existing lane
- `label.text` required if label provided

### CurveItem (Time Series Data)
```typescript
interface CurveItem extends Item {
  type: 'curve';
  dataPoints: DataPoint[];
  style: CurveStyle;
  interpolation?: 'linear' | 'step' | 'basis' | 'cardinal';
}

interface DataPoint {
  time: Date;
  value: number;
}

interface CurveStyle {
  strokeColor: string;
  strokeWidth?: number; // Default: 2
  fillColor?: string; // Optional area fill
  opacity?: number; // Default: 1
}
```

**Validation Rules**:
- `dataPoints` must have at least 2 points
- `dataPoints` must be sorted by time (ascending)
- `value` must be finite number
- `strokeWidth` must be positive

**Relationships**:
- Belongs to one Lane (via laneId)
- Contains multiple DataPoints (time-ordered)

### EventItem (Point-in-Time)
```typescript
interface EventItem extends Item {
  type: 'event';
  time: Date;
  style: EventStyle;
}

interface EventStyle {
  markerType: 'line' | 'circle' | 'triangle' | 'square' | 'custom';
  color: string;
  size?: number; // Default: 8
  strokeWidth?: number; // Default: 2
  customSvg?: string; // For markerType: 'custom'
}
```

**Validation Rules**:
- `time` must be valid Date
- `size` must be positive number
- `customSvg` required if markerType is 'custom'

**Relationships**:
- Belongs to one Lane (via laneId)
- Positioned at specific time point

### TimeRangeItem (Duration-Based)
```typescript
interface TimeRangeItem extends Item {
  type: 'time-range';
  startTime: Date;
  endTime: Date;
  style: TimeRangeStyle;
  stackLevel?: number; // For overlapping items
}

interface TimeRangeStyle {
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number; // Default: 1
  opacity?: number; // Default: 0.7
  borderRadius?: number; // Default: 2
}
```

**Validation Rules**:
- `startTime` must be before `endTime`
- Duration must be at least 1 millisecond
- `stackLevel` auto-calculated if not provided

**Relationships**:
- Belongs to one Lane (via laneId)
- May overlap with other TimeRangeItems (stacking required)

## Supporting Types

### TimeRange
```typescript
interface TimeRange {
  start: Date;
  end: Date;
}
```

### TimeScale
```typescript
interface TimeScale {
  domain: [Date, Date];
  range: [number, number];
  scale: d3.ScaleTime<number, number>;
}
```

### Viewport
```typescript
interface Viewport {
  timeRange: TimeRange;
  pixelRange: [number, number];
  bufferZone: number;
  visibleItems: Item[];
}
```

### VirtualizationState
```typescript
interface VirtualizationState {
  visibleTimeRange: TimeRange;
  bufferedTimeRange: TimeRange;
  visibleItems: Item[];
  totalItems: number;
  renderCount: number;
}
```

## Data Flow Relationships

```
PowerTimeline
├── manages TimeScale (time domain ↔ pixel coordinates)
├── contains multiple Lanes
│   └── each Lane contains multiple Items
├── maintains Viewport state
├── handles VirtualizationState
└── triggers callbacks (onViewChange, onItemClick, onItemHover)

Items Hierarchy:
├── CurveItem → DataPoints (time-series)
├── EventItem → Single time point
└── TimeRangeItem → Time span with stacking

State Dependencies:
TimeScale → Viewport → VirtualizationState → Rendered Items
```

## Performance Considerations

### Memory Optimization
- Items outside buffered viewport not rendered to DOM
- DataPoints for CurveItems filtered by visible time range
- Stacking calculations cached per lane

### Rendering Optimization
- SVG elements created/destroyed based on virtualization
- D3 data binding for efficient updates
- React.memo for item components to prevent unnecessary re-renders

### Accessibility Data
- Each item includes ARIA labels derived from label.text or auto-generated
- Lane roles and descriptions for screen readers
- Keyboard navigation state tracked separately from visual state

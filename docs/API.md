# PowerTimeline API Reference

Complete API documentation for the PowerTimeline React component library.

## Table of Contents

- [Components](#components)
  - [PowerTimeline](#powertimeline)
  - [Lane](#lane)
  - [TimelineAxis](#timelineaxis)
  - [CurveItem](#curveitem)
  - [EventItem](#eventitem)
  - [TimeRangeItem](#timerangeitem)
  - [Tooltip](#tooltip)
  - [Cursor](#cursor)
- [Hooks](#hooks)
  - [useTimeScale](#usetimescale)
  - [useVirtualization](#usevirtualization)
  - [useD3Zoom](#used3zoom)
- [Types](#types)
- [Utilities](#utilities)

---

## Components

### PowerTimeline

The main timeline component that orchestrates all functionality.

#### Props

```typescript
interface PowerTimelineProps {
  lanes: Lane[];
  items: Array<CurveItem | EventItem | TimeRangeItem>;
  initialTimeRange: TimeRange;
  onViewChange: (newTimeRange: TimeRange) => void;
  onItemClick?: (item: Item, event: React.MouseEvent) => void;
  onItemHover?: (item: Item, event: React.MouseEvent) => void;
  width: number;
  height: number;
  bufferZone?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `lanes` | `Lane[]` | ✅ | - | Array of lane configurations defining the timeline structure |
| `items` | `Array<CurveItem \| EventItem \| TimeRangeItem>` | ✅ | - | Array of data items to be rendered across the lanes |
| `initialTimeRange` | `TimeRange` | ✅ | - | Initial time range to display when component mounts |
| `onViewChange` | `(newTimeRange: TimeRange) => void` | ✅ | - | Callback fired when the visible time range changes due to pan/zoom |
| `onItemClick` | `(item: Item, event: React.MouseEvent) => void` | ❌ | - | Callback fired when a data item is clicked |
| `onItemHover` | `(item: Item, event: React.MouseEvent) => void` | ❌ | - | Callback fired when a data item is hovered |
| `width` | `number` | ✅ | - | Component width in pixels |
| `height` | `number` | ✅ | - | Component height in pixels |
| `bufferZone` | `number` | ❌ | `0.5` | Buffer zone for virtualization as fraction of viewport width |
| `className` | `string` | ❌ | - | CSS class name for the root element |
| `style` | `React.CSSProperties` | ❌ | - | Inline styles for the root element |
| `ariaLabel` | `string` | ❌ | - | Accessibility label for the timeline |

#### Ref Methods

```typescript
interface PowerTimelineRef {
  getTimeRange: () => TimeRange;
  setTimeRange: (timeRange: TimeRange) => void;
  zoomToFit: () => void;
  getViewport: () => Viewport;
}
```

| Method | Returns | Description |
|--------|---------|-------------|
| `getTimeRange()` | `TimeRange` | Get the current visible time range |
| `setTimeRange(timeRange)` | `void` | Set the visible time range programmatically |
| `zoomToFit()` | `void` | Zoom to fit all data in the viewport |
| `getViewport()` | `Viewport` | Get current viewport information |

#### Example

```tsx
import React, { useRef } from 'react';
import { PowerTimeline, PowerTimelineRef } from 'react-powertimeline';

function MyComponent() {
  const timelineRef = useRef<PowerTimelineRef>(null);

  const handleZoomToFit = () => {
    timelineRef.current?.zoomToFit();
  };

  return (
    <>
      <button onClick={handleZoomToFit}>Zoom to Fit</button>
      <PowerTimeline
        ref={timelineRef}
        lanes={lanes}
        items={items}
        initialTimeRange={timeRange}
        onViewChange={(range) => console.log('View changed:', range)}
        width={800}
        height={300}
      />
    </>
  );
}
```

---

### Lane

Individual lane component (typically used internally by PowerTimeline).

#### Props

```typescript
interface Lane {
  id: string | number;
  height: number;
  style?: LaneStyle;
  label?: string;
  stackingOrder?: 'recent-top' | 'recent-bottom' | 'custom';
}
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string \| number` | ✅ | - | Unique identifier for the lane |
| `height` | `number` | ✅ | - | Height of the lane in pixels |
| `style` | `LaneStyle` | ❌ | - | Visual styling for the lane |
| `label` | `string` | ❌ | - | Optional label for the lane |
| `stackingOrder` | `'recent-top' \| 'recent-bottom' \| 'custom'` | ❌ | - | Stacking order for overlapping items in this lane |

#### LaneStyle

```typescript
interface LaneStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
```

---

### TimelineAxis

Timeline axis component for displaying time labels.

#### Props

Typically configured automatically by PowerTimeline. Can be used standalone for custom implementations.

---

### CurveItem

Time-series curve visualization component.

#### Type Definition

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
  strokeWidth?: number;
  fillColor?: string;
  opacity?: number;
}
```

#### Example

```tsx
const curveItem: CurveItem = {
  id: 'cpu-usage',
  type: 'curve',
  laneId: 'metrics',
  dataPoints: [
    { time: new Date('2024-01-01T10:00:00Z'), value: 45 },
    { time: new Date('2024-01-01T10:05:00Z'), value: 67 },
    { time: new Date('2024-01-01T10:10:00Z'), value: 52 },
  ],
  style: {
    strokeColor: '#007bff',
    strokeWidth: 2,
    fillColor: 'rgba(0, 123, 255, 0.1)',
    opacity: 1,
  },
  interpolation: 'linear',
  label: {
    text: 'CPU Usage',
    position: 'top',
  },
};
```

---

### EventItem

Point-in-time event marker component.

#### Type Definition

```typescript
interface EventItem extends Item {
  type: 'event';
  time: Date;
  style: EventStyle;
}

interface EventStyle {
  markerType: 'line' | 'circle' | 'triangle' | 'square' | 'diamond' | 'custom' | 'icon' | 'image' | 'svg';
  color: string;
  size?: number;
  strokeWidth?: number;
  customSvg?: string;
  iconClass?: string;
  imageUrl?: string;
  customElement?: React.ReactNode;
}
```

#### Marker Types

| Type | Description |
|------|-------------|
| `line` | Vertical line marker |
| `circle` | Circular marker |
| `triangle` | Triangle marker |
| `square` | Square marker |
| `diamond` | Diamond marker |
| `custom` | Custom SVG path (use `customSvg` prop) |
| `icon` | Icon class (use `iconClass` prop) |
| `image` | Image marker (use `imageUrl` prop) |
| `svg` | Custom React SVG element (use `customElement` prop) |

#### Example

```tsx
const eventItem: EventItem = {
  id: 'deployment-1',
  type: 'event',
  laneId: 'events',
  time: new Date('2024-01-01T12:00:00Z'),
  style: {
    markerType: 'circle',
    color: '#28a745',
    size: 10,
    strokeWidth: 2,
  },
  label: {
    text: 'Deployment',
    position: 'top',
    style: {
      fontSize: 12,
      color: '#333',
      backgroundColor: '#fff',
      padding: 4,
    },
  },
};
```

---

### TimeRangeItem

Duration-based time range visualization component.

#### Type Definition

```typescript
interface TimeRangeItem extends Item {
  type: 'time-range';
  startTime: Date;
  endTime: Date;
  style: TimeRangeStyle;
  stackLevel?: number;
}

interface TimeRangeStyle {
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  opacity?: number;
  borderRadius?: number;
}
```

#### Example

```tsx
const timeRangeItem: TimeRangeItem = {
  id: 'maintenance-window',
  type: 'time-range',
  laneId: 'operations',
  startTime: new Date('2024-01-01T14:00:00Z'),
  endTime: new Date('2024-01-01T16:00:00Z'),
  style: {
    backgroundColor: '#ffc107',
    borderColor: '#ff9800',
    borderWidth: 1,
    opacity: 0.7,
    borderRadius: 4,
  },
  label: {
    text: 'Maintenance',
    position: 'inline',
  },
};
```

---

### Tooltip

Tooltip component for displaying item information on hover.

Automatically managed by PowerTimeline. Can be customized through item metadata.

---

### Cursor

Cursor component for displaying current time position.

Automatically managed by PowerTimeline.

---

## Hooks

### useTimeScale

Hook for creating and managing D3 time scales.

#### Signature

```typescript
function useTimeScale(
  timeRange: TimeRange,
  width: number
): TimeScale;
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `timeRange` | `TimeRange` | The time domain to map |
| `width` | `number` | The pixel range width |

#### Returns

```typescript
interface TimeScale {
  domain: [Date, Date];
  range: [number, number];
  scale: ScaleTime<number, number>;
}
```

#### Example

```tsx
import { useTimeScale } from 'react-powertimeline';

function CustomComponent() {
  const timeRange = {
    start: new Date('2024-01-01'),
    end: new Date('2024-01-31'),
  };
  
  const timeScale = useTimeScale(timeRange, 800);
  
  // Use timeScale.scale to convert between time and pixels
  const pixelX = timeScale.scale(new Date('2024-01-15'));
}
```

---

### useVirtualization

Hook for managing virtualized rendering of timeline items.

#### Signature

```typescript
function useVirtualization(
  items: Item[],
  timeRange: TimeRange,
  bufferZone?: number
): VirtualizationState;
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `items` | `Item[]` | - | All timeline items |
| `timeRange` | `TimeRange` | - | Current visible time range |
| `bufferZone` | `number` | `0.5` | Buffer zone as fraction of viewport |

#### Returns

```typescript
interface VirtualizationState {
  visibleTimeRange: TimeRange;
  bufferedTimeRange: TimeRange;
  visibleItems: Item[];
  totalItems: number;
  renderCount: number;
}
```

---

### useD3Zoom

Hook for managing D3 zoom behavior (pan and zoom interactions).

#### Signature

```typescript
function useD3Zoom(
  svgRef: React.RefObject<SVGSVGElement>,
  onZoom: (transform: { x: number; y: number; k: number }) => void,
  options?: {
    minZoom?: number;
    maxZoom?: number;
    enablePan?: boolean;
    enableZoom?: boolean;
  }
): void;
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `svgRef` | `React.RefObject<SVGSVGElement>` | Reference to the SVG element |
| `onZoom` | `(transform) => void` | Callback fired on zoom/pan |
| `options` | `object` | Optional configuration |

---

## Types

### Core Types

#### TimeRange

```typescript
interface TimeRange {
  start: Date;
  end: Date;
}
```

#### TimeScale

```typescript
interface TimeScale {
  domain: [Date, Date];
  range: [number, number];
  scale: ScaleTime<number, number>;
}
```

#### Viewport

```typescript
interface Viewport {
  timeRange: TimeRange;
  pixelRange: [number, number];
  bufferZone: number;
  visibleItems: Item[];
}
```

#### VirtualizationState

```typescript
interface VirtualizationState {
  visibleTimeRange: TimeRange;
  bufferedTimeRange: TimeRange;
  visibleItems: Item[];
  totalItems: number;
  renderCount: number;
}
```

### Item Types

#### Item (Base)

```typescript
interface Item {
  id: string | number;
  type?: 'event' | 'time-range' | 'curve';
  laneId: string | number;
  label?: ItemLabel;
  metadata?: Record<string, any>;
}
```

#### ItemLabel

```typescript
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

### Utility Types

```typescript
type ItemType = CurveItem | EventItem | TimeRangeItem;
type MarkerType = 'line' | 'circle' | 'triangle' | 'square' | 'diamond' | 'custom' | 'icon' | 'image' | 'svg';
type InterpolationType = 'linear' | 'step' | 'basis' | 'cardinal';
type StackingOrder = 'recent-top' | 'recent-bottom' | 'custom';
type LabelPosition = 'top' | 'bottom' | 'inline';
```

---

## Utilities

### Time Scale Utilities

```typescript
// Create a time scale
function createTimeScale(
  timeRange: TimeRange,
  width: number
): TimeScale;

// Convert time to pixel position
function timeToPixel(
  time: Date,
  scale: TimeScale
): number;

// Convert pixel position to time
function pixelToTime(
  pixel: number,
  scale: TimeScale
): Date;
```

### Virtualization Utilities

```typescript
// Calculate visible items in viewport
function getVisibleItems(
  items: Item[],
  timeRange: TimeRange,
  bufferZone?: number
): Item[];

// Calculate buffered time range
function getBufferedTimeRange(
  timeRange: TimeRange,
  bufferZone: number
): TimeRange;
```

### Accessibility Utilities

```typescript
// Generate ARIA labels for items
function getItemAriaLabel(item: Item): string;

// Handle keyboard navigation
function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  items: Item[],
  currentIndex: number
): number;
```

---

## Best Practices

### Performance Optimization

1. **Use virtualization** for large datasets (>1000 items)
2. **Memoize callbacks** passed to `onViewChange`, `onItemClick`, etc.
3. **Optimize data structures** - use indexed lookups for lane/item access
4. **Debounce expensive operations** during pan/zoom

### Accessibility

1. **Always provide `ariaLabel`** for the timeline
2. **Include meaningful labels** for all items
3. **Test keyboard navigation** (arrow keys, tab, enter)
4. **Ensure sufficient color contrast** for markers and text

### Data Management

1. **Normalize time zones** - use UTC or consistent timezone
2. **Sort data points** in CurveItems by time
3. **Validate time ranges** - ensure start < end
4. **Handle edge cases** - empty datasets, single points, etc.

---

## Migration Guide

### From v0.0.x to v0.1.x

- `PowerTimelineProps.onViewChange` is now required
- `CurveStyle.strokeColor` is now required (was optional)
- Added new marker types: `'icon'`, `'image'`, `'svg'`
- Deprecated `stackLevel` auto-calculation (still supported)

---

## Support

- **GitHub Issues**: [react-powertimeline/issues](https://github.com/react-powertimeline/issues)
- **Documentation**: [Full Documentation](../README.md)
- **Examples**: [examples/](../examples/)
- **Storybook**: Run `npm run storybook` for interactive examples

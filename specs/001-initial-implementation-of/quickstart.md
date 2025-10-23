# PowerTimeline Component Quickstart Guide

## Installation

```bash
npm install @react-powertimeline
# or
yarn add @react-powertimeline
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { PowerTimeline } from '@react-powertimeline';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '@react-powertimeline';

function App() {
  // Define lanes
  const lanes: Lane[] = [
    {
      id: 'metrics',
      height: 100,
      label: 'Performance Metrics',
      style: { backgroundColor: '#f8f9fa' }
    },
    {
      id: 'events',
      height: 60,
      label: 'System Events',
      style: { backgroundColor: '#e9ecef' }
    },
    {
      id: 'deployments',
      height: 40,
      label: 'Deployments',
      style: { backgroundColor: '#dee2e6' }
    }
  ];

  // Define sample data
  const items = [
    // Curve item (time series data)
    {
      id: 'cpu-usage',
      type: 'curve' as const,
      laneId: 'metrics',
      dataPoints: [
        { time: new Date('2024-01-01T00:00:00Z'), value: 45 },
        { time: new Date('2024-01-01T01:00:00Z'), value: 52 },
        { time: new Date('2024-01-01T02:00:00Z'), value: 38 },
        { time: new Date('2024-01-01T03:00:00Z'), value: 67 }
      ],
      style: {
        strokeColor: '#007bff',
        strokeWidth: 2,
        fillColor: 'rgba(0, 123, 255, 0.1)'
      },
      label: { text: 'CPU Usage %', position: 'top' as const }
    } as CurveItem,

    // Event item (point in time)
    {
      id: 'error-spike',
      type: 'event' as const,
      laneId: 'events',
      time: new Date('2024-01-01T01:30:00Z'),
      style: {
        markerType: 'circle',
        color: '#dc3545',
        size: 10
      },
      label: { text: 'Error Spike', position: 'top' as const }
    } as EventItem,

    // Time range item (duration)
    {
      id: 'deployment-1',
      type: 'time-range' as const,
      laneId: 'deployments',
      startTime: new Date('2024-01-01T02:00:00Z'),
      endTime: new Date('2024-01-01T02:15:00Z'),
      style: {
        backgroundColor: '#28a745',
        opacity: 0.7
      },
      label: { text: 'v2.1.0 Deploy', position: 'inline' as const }
    } as TimeRangeItem
  ];

  // Initial time range
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start: new Date('2024-01-01T00:00:00Z'),
    end: new Date('2024-01-01T04:00:00Z')
  });

  // Handle view changes (pan/zoom)
  const handleViewChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
    
    // Fetch new data for the visible range
    console.log('Load data for:', newTimeRange);
  };

  // Handle item interactions
  const handleItemClick = (item: any, event: React.MouseEvent) => {
    console.log('Item clicked:', item);
  };

  const handleItemHover = (item: any, event: React.MouseEvent) => {
    console.log('Item hovered:', item);
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <PowerTimeline
        lanes={lanes}
        items={items}
        initialTimeRange={timeRange}
        onViewChange={handleViewChange}
        onItemClick={handleItemClick}
        onItemHover={handleItemHover}
        width={800}
        height={300}
        bufferZone={0.5}
        ariaLabel="System performance timeline"
      />
    </div>
  );
}

export default App;
```

## Key Features Demonstration

### 1. Multiple Data Types

```tsx
// Curve data (continuous metrics)
const cpuData: CurveItem = {
  id: 'cpu',
  type: 'curve',
  laneId: 'metrics',
  dataPoints: generateTimeSeriesData(),
  style: { strokeColor: '#007bff', strokeWidth: 2 },
  interpolation: 'linear'
};

// Event data (discrete occurrences)
const alertEvent: EventItem = {
  id: 'alert-1',
  type: 'event',
  laneId: 'alerts',
  time: new Date(),
  style: { markerType: 'triangle', color: '#ffc107', size: 12 }
};

// Time range data (durations)
const maintenanceWindow: TimeRangeItem = {
  id: 'maintenance-1',
  type: 'time-range',
  laneId: 'maintenance',
  startTime: new Date('2024-01-01T02:00:00Z'),
  endTime: new Date('2024-01-01T04:00:00Z'),
  style: { backgroundColor: '#6c757d', opacity: 0.5 }
};
```

### 2. Dynamic Data Loading

```tsx
const handleViewChange = async (newTimeRange: TimeRange) => {
  // Show loading state
  setLoading(true);
  
  try {
    // Fetch data for the new time range
    const newData = await fetchTimelineData(newTimeRange);
    setItems(newData);
  } catch (error) {
    console.error('Failed to load timeline data:', error);
  } finally {
    setLoading(false);
  }
};
```

### 3. Performance Optimization

```tsx
// Large dataset handling
const largeDataset = generateLargeDataset(10000); // 10k items

<PowerTimeline
  lanes={lanes}
  items={largeDataset}
  initialTimeRange={timeRange}
  onViewChange={handleViewChange}
  bufferZone={0.5} // Render 50% extra on each side
  width={1200}
  height={600}
/>
```

### 4. Accessibility Features

```tsx
<PowerTimeline
  lanes={lanes}
  items={items}
  initialTimeRange={timeRange}
  onViewChange={handleViewChange}
  ariaLabel="Application performance timeline showing CPU usage, events, and deployments"
  // Keyboard navigation automatically enabled
  // Screen reader support built-in
  // Focus management handled internally
/>
```

## Validation Checklist

### ✅ Basic Functionality
- [ ] Component renders without errors
- [ ] All three data types display correctly (curves, events, time ranges)
- [ ] Pan and zoom interactions work smoothly
- [ ] Callbacks fire when expected (onViewChange, onItemClick, onItemHover)

### ✅ Performance
- [ ] Smooth interactions at 60fps on desktop
- [ ] Large datasets (1000+ items) render without lag
- [ ] Memory usage stays under 50MB for typical datasets
- [ ] Only visible items are rendered to DOM

### ✅ Accessibility
- [ ] Keyboard navigation works (arrow keys, tab)
- [ ] Screen reader announces timeline content
- [ ] Focus indicators are visible
- [ ] Color is not the only means of conveying information

### ✅ Responsive Design
- [ ] Touch gestures work on mobile devices
- [ ] Component adapts to different screen sizes
- [ ] Text remains readable at different zoom levels

### ✅ Data Handling
- [ ] Empty data states display appropriate messages
- [ ] Invalid data is handled gracefully
- [ ] Overlapping time ranges stack correctly
- [ ] Dynamic data loading works smoothly

## Troubleshooting

### Common Issues

**Timeline not rendering:**
- Check that `width` and `height` props are positive numbers
- Ensure `lanes` array is not empty
- Verify all item `laneId` values match existing lane IDs

**Performance issues:**
- Reduce `bufferZone` if memory usage is high
- Implement data pagination for very large datasets
- Use `React.memo` for custom item renderers

**Accessibility problems:**
- Ensure `ariaLabel` is provided for the timeline
- Add meaningful `label.text` to data items
- Test with keyboard navigation and screen readers

### Performance Monitoring

```tsx
// Monitor performance in development
const handleViewChange = (newTimeRange: TimeRange) => {
  const startTime = performance.now();
  
  // Your data loading logic here
  loadData(newTimeRange).then(() => {
    const endTime = performance.now();
    console.log(`Data loading took ${endTime - startTime} milliseconds`);
  });
};
```

## Next Steps

1. **Explore Examples**: Check the `/examples` folder for more complex use cases
2. **Read API Documentation**: See full TypeScript interfaces in `/contracts`
3. **Performance Testing**: Run benchmarks for your specific use case
4. **Accessibility Testing**: Test with screen readers and keyboard navigation
5. **Custom Styling**: Implement your design system integration

For more advanced usage patterns and customization options, see the complete documentation and examples in the repository.

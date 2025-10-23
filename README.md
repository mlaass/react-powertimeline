# PowerTimeline React Component

A high-performance, interactive React component for visualizing multi-layered time-series data. Built with React 18, D3.js, and TypeScript for optimal performance and developer experience.

[![npm version](https://badge.fury.io/js/@react-powertimeline.svg)](https://badge.fury.io/js/@react-powertimeline)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Features

- **🚀 High Performance**: Handles 10k+ data points with smooth 60fps interactions
- **📊 Multiple Data Types**: Events, time ranges, and curve data visualization
- **🎯 Interactive**: Pan, zoom, click, and hover interactions with full keyboard support
- **♿ Accessible**: WCAG 2.1 AA compliant with screen reader support
- **🎨 Customizable**: Flexible theming and styling system
- **📱 Responsive**: Touch gestures and mobile-friendly design
- **⚡ Virtualized**: Efficient rendering for large datasets
- **🔧 TypeScript**: Full type safety and IntelliSense support

## 🚀 Quick Start

### Installation

```bash
npm install @react-powertimeline
# or
yarn add @react-powertimeline
# or
pnpm add @react-powertimeline
```

### Basic Usage

```tsx
import React from 'react';
import { PowerTimeline } from '@react-powertimeline';
import type { Lane, EventItem, TimeRange } from '@react-powertimeline';

const lanes: Lane[] = [
  { id: 'events', height: 60, label: 'System Events' },
  { id: 'metrics', height: 100, label: 'Performance' },
];

const items: EventItem[] = [
  {
    id: 'event-1',
    type: 'event',
    laneId: 'events',
    time: new Date('2024-01-01T10:00:00Z'),
    style: { markerType: 'circle', color: '#dc3545', size: 8 },
    label: { text: 'System Alert', position: 'top' },
  },
];

const timeRange: TimeRange = {
  start: new Date('2024-01-01T08:00:00Z'),
  end: new Date('2024-01-01T16:00:00Z'),
};

function MyTimeline() {
  return (
    <PowerTimeline
      lanes={lanes}
      items={items}
      initialTimeRange={timeRange}
      onViewChange={(range) => console.log('View changed:', range)}
      onItemClick={(item) => console.log('Item clicked:', item)}
      width={800}
      height={300}
    />
  );
}
```

## 📖 Documentation

### Core Components

#### PowerTimeline

The main timeline component that orchestrates all functionality.

```tsx
<PowerTimeline
  lanes={lanes}                    // Lane configuration
  items={items}                    // Timeline items data
  initialTimeRange={timeRange}     // Initial visible time range
  onViewChange={handleViewChange}  // View change callback
  onItemClick={handleItemClick}    // Item click callback
  onItemHover={handleItemHover}    // Item hover callback
  width={800}                      // Timeline width
  height={300}                     // Timeline height
  bufferZone={0.5}                // Virtualization buffer
  ariaLabel="Timeline description" // Accessibility label
/>
```

### Data Types

#### EventItem
Point-in-time events with customizable markers.

```tsx
const eventItem: EventItem = {
  id: 'unique-id',
  type: 'event',
  laneId: 'lane-id',
  time: new Date('2024-01-01T10:00:00Z'),
  style: {
    markerType: 'circle' | 'square' | 'triangle' | 'diamond',
    color: '#dc3545',
    size: 8,
  },
  label: { text: 'Event Label', position: 'top' | 'bottom' },
};
```

#### TimeRangeItem
Duration-based data as horizontal bars.

```tsx
const rangeItem: TimeRangeItem = {
  id: 'unique-id',
  type: 'time-range',
  laneId: 'lane-id',
  startTime: new Date('2024-01-01T10:00:00Z'),
  endTime: new Date('2024-01-01T11:00:00Z'),
  style: {
    backgroundColor: '#28a745',
    opacity: 0.7,
    borderRadius: 4,
  },
  label: { text: 'Process', position: 'inline' },
};
```

#### CurveItem
Time-series data as connected line segments.

```tsx
const curveItem: CurveItem = {
  id: 'unique-id',
  type: 'curve',
  laneId: 'lane-id',
  dataPoints: [
    { time: new Date('2024-01-01T10:00:00Z'), value: 25 },
    { time: new Date('2024-01-01T10:30:00Z'), value: 45 },
    { time: new Date('2024-01-01T11:00:00Z'), value: 30 },
  ],
  style: {
    strokeColor: '#007bff',
    strokeWidth: 2,
    fillColor: 'rgba(0, 123, 255, 0.1)',
  },
  interpolation: 'linear' | 'step' | 'basis',
};
```

### Advanced Features

#### Virtualization
Automatically enabled for large datasets to maintain performance.

```tsx
<PowerTimeline
  // ... other props
  bufferZone={0.5}  // Controls off-screen rendering (0.1 - 2.0)
/>
```

#### Custom Styling
Comprehensive theming support for brand integration.

```tsx
const customLane: Lane = {
  id: 'custom',
  height: 80,
  label: 'Custom Lane',
  style: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
  },
};
```

#### Error Boundaries
Built-in error handling with graceful fallbacks.

```tsx
import { ErrorBoundary } from '@react-powertimeline';

<ErrorBoundary
  fallback={<div>Timeline unavailable</div>}
  onError={(error, errorInfo) => console.error(error)}
>
  <PowerTimeline {...props} />
</ErrorBoundary>
```

## 🎮 Interactions

### Mouse & Touch
- **Zoom**: Mouse wheel or pinch gesture
- **Pan**: Click and drag or swipe
- **Select**: Click on items
- **Hover**: Mouse over for tooltips

### Keyboard Navigation
- **Arrow Keys**: Navigate timeline (←→) and lanes (↑↓)
- **+/-**: Zoom in/out
- **Home/End**: Go to start/end of timeline
- **Space**: Select focused item
- **Escape**: Clear selection

## 🎨 Theming

PowerTimeline supports comprehensive theming through CSS variables and style props:

```css
:root {
  --timeline-background: #ffffff;
  --timeline-border: #dee2e6;
  --lane-background: #f8f9fa;
  --item-primary: #007bff;
  --item-secondary: #6c757d;
}
```

## 📊 Performance

- **Target**: <100ms initial render for 10k+ items
- **Memory**: <50MB for large datasets
- **Interactions**: Smooth 60fps pan/zoom
- **Bundle Size**: <200KB minified + gzipped

## ♿ Accessibility

PowerTimeline is built with accessibility as a core principle:

- **WCAG 2.1 AA** compliant
- **Screen Reader** support (NVDA, JAWS, VoiceOver)
- **Keyboard Navigation** for all functionality
- **High Contrast** mode support
- **Reduced Motion** respect for user preferences
- **ARIA Labels** for comprehensive context

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm/yarn/pnpm

### Setup
```bash
git clone https://github.com/your-org/react-powertimeline.git
cd react-powertimeline
npm install
```

### Development Server
```bash
npm run dev
# Visit http://localhost:5173
```

### Testing
```bash
npm test              # Run tests
npm run test:coverage # Coverage report
npm run test:bench    # Performance benchmarks
```

### Building
```bash
npm run build         # Build library
npm run build:types   # Generate type definitions
```

## 📚 Examples

Explore comprehensive examples in the `/examples` directory:

- **[Basic Timeline](./examples/basic-timeline/)** - Simple usage patterns
- **[Large Dataset](./examples/large-dataset/)** - Performance with 10k+ items
- **[Accessibility](./examples/accessibility-demo/)** - WCAG compliance features
- **[Custom Styling](./examples/custom-styling/)** - Theming and visual customization
- **[Interactive Features](./examples/interactive-features/)** - Full interaction showcase

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **D3.js** - Powerful data visualization primitives
- **React** - Component architecture and ecosystem
- **Vite** - Fast development and build tooling
- **Vitest** - Modern testing framework

## 📞 Support

- **Documentation**: [Full API Reference](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/react-powertimeline/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/react-powertimeline/discussions)
- **Email**: support@powertimeline.dev

---

**PowerTimeline** - Built with ❤️ for the React community

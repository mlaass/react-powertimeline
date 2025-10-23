# PowerTimeline Examples

This directory contains interactive examples demonstrating various features and use cases of the PowerTimeline React component.

## 🚀 Quick Start

### Run Individual Examples

```bash
# Basic timeline example
npm run examples:basic

# Large dataset performance demo
npm run examples:large

# Accessibility features demo
npm run examples:accessibility

# Custom styling examples
npm run examples:styling

# Interactive features showcase
npm run examples:interactive
```

### Run Examples Server

```bash
# Show available examples
npm run examples

# Run specific example
npm run examples <example-name>
```

### Browse All Examples

Open `examples/index.html` in your browser to see an overview of all available examples with direct links.

## 📁 Available Examples

### 1. Basic Timeline (`basic-timeline/`)
**Purpose**: Introduction to PowerTimeline with fundamental features  
**Features**:
- Simple setup and configuration
- Mixed data types (curves, events, time ranges)
- Basic pan and zoom interactions
- Item click and hover handlers

**Run**: `npm run examples:basic`

### 2. Large Dataset (`large-dataset/`)
**Purpose**: Performance demonstration with large datasets  
**Features**:
- 10,000+ data points
- Virtualization controls
- Real-time performance monitoring
- Memory usage tracking
- FPS counter

**Run**: `npm run examples:large`

### 3. Accessibility Demo (`accessibility-demo/`)
**Purpose**: WCAG 2.1 AA compliance demonstration  
**Features**:
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus management
- ARIA labels and descriptions

**Run**: `npm run examples:accessibility`

### 4. Custom Styling (`custom-styling/`)
**Purpose**: Advanced styling and theming options  
**Features**:
- Custom themes
- CSS-in-JS styling
- Responsive design
- Animation effects
- Color schemes

**Run**: `npm run examples:styling`

### 5. Interactive Features (`interactive-features/`)
**Purpose**: Advanced user interactions  
**Features**:
- Item selection and multi-select
- Custom tooltips
- Context menus
- Real-time data updates
- Dynamic lane management

**Run**: `npm run examples:interactive`

## 🛠 Development

### Adding New Examples

1. Create a new directory in `examples/`
2. Add `index.html` and `main.tsx` files
3. Update the examples server script if needed
4. Add documentation to this README

### Example Structure

```
examples/
├── your-example/
│   ├── index.html          # HTML entry point
│   ├── main.tsx           # React application
│   └── README.md          # Example-specific docs
├── index.html             # Examples overview page
└── README.md              # This file
```

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Example - PowerTimeline</title>
    <!-- Add your styles here -->
</head>
<body>
    <div id="timeline-root"></div>
    <script type="module" src="./main.tsx"></script>
</body>
</html>
```

### TypeScript Entry Point

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../../src';
import type { Lane, TimeRange } from '../../src/types';

function YourExample() {
  // Your example implementation
  return (
    <PowerTimeline
      lanes={lanes}
      items={items}
      initialTimeRange={timeRange}
      // ... other props
    />
  );
}

ReactDOM.createRoot(document.getElementById('timeline-root')!).render(
  <React.StrictMode>
    <YourExample />
  </React.StrictMode>
);
```

## 🎨 Storybook Integration

For component-level exploration and testing, use Storybook:

```bash
npm run storybook
```

Storybook provides:
- Interactive component playground
- Props controls and knobs
- Accessibility testing
- Visual regression testing
- Documentation

## 📊 Performance Testing

The large dataset example includes built-in performance monitoring:

- **FPS Counter**: Real-time frame rate monitoring
- **Memory Usage**: JavaScript heap size tracking
- **Render Time**: Component render performance
- **Visible Items**: Virtualization effectiveness

## ♿ Accessibility Testing

The accessibility example demonstrates:

- **Keyboard Navigation**: Arrow keys, Tab, Enter, Space
- **Screen Reader Support**: ARIA labels, descriptions, live regions
- **High Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Clear focus indicators and logical tab order

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Module Resolution Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript Errors**
   ```bash
   # Run type checking
   npm run typecheck
   ```

### Getting Help

- Check the main [README.md](../README.md) for general setup
- Review component documentation in [src/](../src/)
- Browse Storybook stories for usage patterns
- Check the [issues](https://github.com/react-powertimeline/issues) page

## 📝 Contributing

When adding new examples:

1. Follow the existing structure and naming conventions
2. Include comprehensive documentation
3. Add performance considerations for large datasets
4. Ensure accessibility compliance
5. Test across different browsers and devices

## 📄 License

These examples are part of the PowerTimeline project and are licensed under the MIT License.

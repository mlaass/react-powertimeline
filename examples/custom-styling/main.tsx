/**
 * Custom Styling Example
 * 
 * Demonstrates PowerTimeline's theming and styling capabilities.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Theme configurations
const themes = {
  light: {
    background: '#ffffff',
    laneColors: ['#f8f9fa', '#e9ecef', '#dee2e6'],
    curveColor: '#007bff',
    eventColor: '#dc3545',
    rangeColor: '#28a745',
  },
  dark: {
    background: '#2c3e50',
    laneColors: ['#34495e', '#3c4858', '#455a64'],
    curveColor: '#74b9ff',
    eventColor: '#fd79a8',
    rangeColor: '#00b894',
  },
  neon: {
    background: '#0a0a0a',
    laneColors: ['#1a1a1a', '#2a2a2a', '#3a3a3a'],
    curveColor: '#00ff41',
    eventColor: '#ff0080',
    rangeColor: '#00d4ff',
  },
  pastel: {
    background: '#ffeaa7',
    laneColors: ['#fab1a0', '#e17055', '#fdcb6e'],
    curveColor: '#6c5ce7',
    eventColor: '#fd79a8',
    rangeColor: '#00b894',
  },
  corporate: {
    background: '#ecf0f1',
    laneColors: ['#bdc3c7', '#95a5a6', '#7f8c8d'],
    curveColor: '#2980b9',
    eventColor: '#e74c3c',
    rangeColor: '#27ae60',
  },
};

function CustomStylingExample() {
  const [currentTheme, setCurrentTheme] = React.useState<keyof typeof themes>('light');
  const [customStyles, setCustomStyles] = React.useState({
    curveColor: '#007bff',
    curveWidth: 2,
    eventColor: '#dc3545',
    eventSize: 8,
    rangeColor: '#28a745',
    rangeOpacity: 0.7,
  });

  // Generate styled data based on current theme and custom styles
  const generateStyledData = React.useCallback(() => {
    const theme = themes[currentTheme];
    
    const lanes: Lane[] = [
      {
        id: 'metrics',
        height: 100,
        label: 'Performance Metrics',
        style: { backgroundColor: theme.laneColors[0] },
      },
      {
        id: 'events',
        height: 60,
        label: 'System Events',
        style: { backgroundColor: theme.laneColors[1] },
      },
      {
        id: 'processes',
        height: 80,
        label: 'Background Processes',
        style: { backgroundColor: theme.laneColors[2] },
      },
    ];

    const items: (CurveItem | EventItem | TimeRangeItem)[] = [
      // Styled curve item
      {
        id: 'performance-curve',
        type: 'curve',
        laneId: 'metrics',
        dataPoints: [
          { time: new Date('2024-01-01T09:00:00Z'), value: 30 },
          { time: new Date('2024-01-01T09:30:00Z'), value: 45 },
          { time: new Date('2024-01-01T10:00:00Z'), value: 65 },
          { time: new Date('2024-01-01T10:30:00Z'), value: 80 },
          { time: new Date('2024-01-01T11:00:00Z'), value: 70 },
          { time: new Date('2024-01-01T11:30:00Z'), value: 55 },
          { time: new Date('2024-01-01T12:00:00Z'), value: 40 },
          { time: new Date('2024-01-01T12:30:00Z'), value: 35 },
        ],
        style: {
          strokeColor: customStyles.curveColor,
          strokeWidth: customStyles.curveWidth,
          fillColor: `${customStyles.curveColor}20`,
        },
        label: { text: 'CPU Usage', position: 'top' },
      },

      // Styled event items
      {
        id: 'startup-event',
        type: 'event',
        laneId: 'events',
        time: new Date('2024-01-01T09:00:00Z'),
        style: {
          markerType: 'circle',
          color: customStyles.eventColor,
          size: customStyles.eventSize,
        },
        label: { text: 'System Start', position: 'top' },
      },
      {
        id: 'alert-event',
        type: 'event',
        laneId: 'events',
        time: new Date('2024-01-01T10:30:00Z'),
        style: {
          markerType: 'triangle',
          color: customStyles.eventColor,
          size: customStyles.eventSize + 2,
        },
        label: { text: 'Alert Triggered', position: 'top' },
      },
      {
        id: 'recovery-event',
        type: 'event',
        laneId: 'events',
        time: new Date('2024-01-01T11:30:00Z'),
        style: {
          markerType: 'square',
          color: customStyles.eventColor,
          size: customStyles.eventSize,
        },
        label: { text: 'System Recovery', position: 'top' },
      },

      // Styled time range items
      {
        id: 'backup-process',
        type: 'time-range',
        laneId: 'processes',
        startTime: new Date('2024-01-01T09:15:00Z'),
        endTime: new Date('2024-01-01T09:45:00Z'),
        style: {
          backgroundColor: customStyles.rangeColor,
          opacity: customStyles.rangeOpacity,
        },
        label: { text: 'Database Backup', position: 'inline' },
      },
      {
        id: 'maintenance-window',
        type: 'time-range',
        laneId: 'processes',
        startTime: new Date('2024-01-01T11:00:00Z'),
        endTime: new Date('2024-01-01T11:45:00Z'),
        style: {
          backgroundColor: customStyles.rangeColor,
          opacity: customStyles.rangeOpacity,
          borderRadius: 4,
        },
        label: { text: 'Maintenance Window', position: 'inline' },
      },
      {
        id: 'data-sync',
        type: 'time-range',
        laneId: 'processes',
        startTime: new Date('2024-01-01T12:00:00Z'),
        endTime: new Date('2024-01-01T12:20:00Z'),
        style: {
          backgroundColor: customStyles.rangeColor,
          opacity: customStyles.rangeOpacity,
        },
        label: { text: 'Data Synchronization', position: 'inline' },
      },
    ];

    const timeRange: TimeRange = {
      start: new Date('2024-01-01T08:30:00Z'),
      end: new Date('2024-01-01T12:45:00Z'),
    };

    return { lanes, items, timeRange };
  }, [currentTheme, customStyles]);

  const [data, setData] = React.useState(() => generateStyledData());

  // Update data when theme or styles change
  React.useEffect(() => {
    setData(generateStyledData());
  }, [generateStyledData]);

  // Update timeline container theme
  React.useEffect(() => {
    const container = document.getElementById('timeline-root');
    if (container) {
      // Remove all theme classes
      container.className = 'timeline-container';
      // Add current theme class
      container.classList.add(`timeline-${currentTheme}`);
      
      // Apply theme background
      const theme = themes[currentTheme];
      container.style.backgroundColor = theme.background;
    }
  }, [currentTheme]);

  // Generate style code preview
  const generateStyleCode = React.useCallback(() => {
    return `const timelineStyles = {
  theme: '${currentTheme}',
  curve: {
    strokeColor: '${customStyles.curveColor}',
    strokeWidth: ${customStyles.curveWidth},
    fillColor: '${customStyles.curveColor}20'
  },
  event: {
    color: '${customStyles.eventColor}',
    size: ${customStyles.eventSize}
  },
  timeRange: {
    backgroundColor: '${customStyles.rangeColor}',
    opacity: ${customStyles.rangeOpacity}
  }
};`;
  }, [currentTheme, customStyles]);

  // Setup UI controls
  React.useEffect(() => {
    const themeButtons = document.querySelectorAll('.theme-button');
    const curveColorInput = document.getElementById('curve-color') as HTMLInputElement;
    const curveWidthInput = document.getElementById('curve-width') as HTMLInputElement;
    const eventColorInput = document.getElementById('event-color') as HTMLInputElement;
    const eventSizeInput = document.getElementById('event-size') as HTMLInputElement;
    const rangeColorInput = document.getElementById('range-color') as HTMLInputElement;
    const rangeOpacityInput = document.getElementById('range-opacity') as HTMLInputElement;
    const styleCodeEl = document.getElementById('style-code');

    // Update style code preview
    if (styleCodeEl) {
      styleCodeEl.textContent = generateStyleCode();
    }

    // Theme button handlers
    themeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const theme = target.dataset.theme as keyof typeof themes;
        
        // Update active state
        themeButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        setCurrentTheme(theme);
        
        // Update custom style inputs to match theme
        const themeConfig = themes[theme];
        if (curveColorInput) curveColorInput.value = themeConfig.curveColor;
        if (eventColorInput) eventColorInput.value = themeConfig.eventColor;
        if (rangeColorInput) rangeColorInput.value = themeConfig.rangeColor;
        
        setCustomStyles(prev => ({
          ...prev,
          curveColor: themeConfig.curveColor,
          eventColor: themeConfig.eventColor,
          rangeColor: themeConfig.rangeColor,
        }));
      });
    });

    // Custom style handlers
    if (curveColorInput) {
      curveColorInput.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value;
        setCustomStyles(prev => ({ ...prev, curveColor: value }));
      });
    }

    if (curveWidthInput) {
      curveWidthInput.addEventListener('input', (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        setCustomStyles(prev => ({ ...prev, curveWidth: value }));
        const valueSpan = document.getElementById('curve-width-value');
        if (valueSpan) valueSpan.textContent = `${value}px`;
      });
    }

    if (eventColorInput) {
      eventColorInput.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value;
        setCustomStyles(prev => ({ ...prev, eventColor: value }));
      });
    }

    if (eventSizeInput) {
      eventSizeInput.addEventListener('input', (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        setCustomStyles(prev => ({ ...prev, eventSize: value }));
        const valueSpan = document.getElementById('event-size-value');
        if (valueSpan) valueSpan.textContent = `${value}px`;
      });
    }

    if (rangeColorInput) {
      rangeColorInput.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value;
        setCustomStyles(prev => ({ ...prev, rangeColor: value }));
      });
    }

    if (rangeOpacityInput) {
      rangeOpacityInput.addEventListener('input', (e) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setCustomStyles(prev => ({ ...prev, rangeOpacity: value }));
        const valueSpan = document.getElementById('range-opacity-value');
        if (valueSpan) valueSpan.textContent = value.toString();
      });
    }
  }, [generateStyleCode]);

  // Update style code when styles change
  React.useEffect(() => {
    const styleCodeEl = document.getElementById('style-code');
    if (styleCodeEl) {
      styleCodeEl.textContent = generateStyleCode();
    }
  }, [generateStyleCode]);

  return (
    <PowerTimeline
      lanes={data.lanes}
      items={data.items}
      initialTimeRange={data.timeRange}
      onViewChange={(timeRange) => console.log('View changed:', timeRange)}
      onItemClick={(item) => console.log('Item clicked:', item)}
      width={1000}
      height={300}
      ariaLabel={`Styled timeline with ${currentTheme} theme`}
    />
  );
}

ReactDOM.createRoot(document.getElementById('timeline-root')!).render(
  <React.StrictMode>
    <CustomStylingExample />
  </React.StrictMode>
);

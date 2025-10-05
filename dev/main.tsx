/**
 * Development Entry Point
 * 
 * This file is used for development and testing of the PowerTimeline component.
 * It provides a basic example implementation.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../src';
import type { TimeRange } from '../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem } from '../src/types';

// Helper function to generate sin/cos curves
function generateMathCurve(
  id: string,
  startTime: Date,
  endTime: Date,
  points: number,
  amplitude: number,
  frequency: number,
  phase: number,
  offset: number,
  type: 'sin' | 'cos' = 'sin'
) {
  const timeSpan = endTime.getTime() - startTime.getTime();
  const dataPoints: { time: Date; value: number }[] = [];
  
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const time = new Date(startTime.getTime() + progress * timeSpan);
    
    // Calculate the mathematical function value
    const x = progress * frequency * 2 * Math.PI + phase;
    const rawValue = type === 'sin' ? Math.sin(x) : Math.cos(x);
    const value = amplitude * rawValue + offset;
    
    dataPoints.push({ time, value });
  }
  
  return dataPoints;
}

// Sample data for development
const lanes: Lane[] = [
  {
    id: 'metrics',
    height: 100,
    label: 'Performance Metrics',
    style: { backgroundColor: '#f8f9fa' },
  },
  {
    id: 'events',
    height: 60,
    label: 'System Events',
    style: { backgroundColor: '#e9ecef' },
  },
  {
    id: 'deployments',
    height: 40,
    label: 'Deployments',
    style: { backgroundColor: '#dee2e6' },
  },
];

const startTime = new Date('2024-01-01T00:00:00Z');
const endTime = new Date('2024-01-01T04:00:00Z');

const items = [
  // Sine wave - Low frequency, high amplitude (CPU usage pattern)
  {
    id: 'cpu-usage',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      'cpu-usage',
      startTime,
      endTime,
      50, // points
      25, // amplitude
      1.5, // frequency (1.5 cycles over 4 hours)
      0, // phase
      50 // offset (centers around 50%)
    ),
    style: {
      strokeColor: '#007bff',
      strokeWidth: 2,
      fillColor: 'rgba(0, 123, 255, 0.15)',
    },
    interpolation: 'linear',
    label: { text: 'CPU Usage % (sin)', position: 'top' as const },
  } as CurveItem,

  // Cosine wave - Medium frequency, medium amplitude (Memory pattern)
  {
    id: 'memory-usage',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      'memory-usage',
      startTime,
      endTime,
      40, // points
      15, // amplitude
      2, // frequency (2 cycles)
      0, // phase
      65, // offset (centers around 65%)
      'cos'
    ),
    style: {
      strokeColor: '#28a745',
      strokeWidth: 2.5,
      fillColor: 'rgba(40, 167, 69, 0.1)',
    },
    interpolation: 'linear',
    label: { text: 'Memory % (cos)', position: 'bottom' as const },
  } as CurveItem,

  // High frequency sine - Network throughput spikes
  {
    id: 'network-throughput',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      'network-throughput',
      startTime,
      endTime,
      80, // more points for high frequency
      20, // amplitude
      4, // frequency (4 cycles - high frequency)
      Math.PI / 4, // phase shift
      35 // offset
    ),
    style: {
      strokeColor: '#fd7e14',
      strokeWidth: 1.5,
      strokeDasharray: '4,2',
    },
    interpolation: 'linear',
    label: { text: 'Network MB/s (sin, high freq)', position: 'top' as const },
  } as CurveItem,

  // Phase-shifted cosine - Disk I/O with smooth curves
  {
    id: 'disk-io',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      'disk-io',
      startTime,
      endTime,
      60, // points
      18, // amplitude
      1, // frequency (1 cycle)
      Math.PI / 2, // 90-degree phase shift
      45, // offset
      'cos'
    ),
    style: {
      strokeColor: '#6f42c1',
      strokeWidth: 2,
      fillColor: 'rgba(111, 66, 193, 0.2)',
    },
    interpolation: 'basis',
    label: { text: 'Disk I/O % (cos, phase shift)', position: 'bottom' as const },
  } as CurveItem,

  // Double frequency sine - Temperature oscillations
  {
    id: 'temperature',
    type: 'curve' as const,
    laneId: 'metrics',
    dataPoints: generateMathCurve(
      'temperature',
      startTime,
      endTime,
      70, // points
      12, // amplitude
      3, // frequency (3 cycles)
      Math.PI / 6, // 30-degree phase shift
      30 // offset
    ),
    style: {
      strokeColor: '#dc3545',
      strokeWidth: 2,
      fillColor: 'rgba(220, 53, 69, 0.1)',
    },
    interpolation: 'linear',
    label: { text: 'Temperature °C (sin, 3x freq)', position: 'top' as const },
  } as CurveItem,

  // Various event types with different markers
  {
    id: 'critical-error',
    type: 'event' as const,
    laneId: 'events',
    time: new Date('2024-01-01T01:15:00Z'),
    style: {
      markerType: 'triangle' as const,
      color: '#dc3545',
      size: 8,
    },
    label: { text: 'Critical Error', position: 'top' as const },
  } as EventItem,

  {
    id: 'warning-alert',
    type: 'event' as const,
    laneId: 'events',
    time: new Date('2024-01-01T02:45:00Z'),
    style: {
      markerType: 'square' as const,
      color: '#ffc107',
      size: 6,
    },
    label: { text: 'Warning', position: 'top' as const },
  } as EventItem,

  {
    id: 'info-notification',
    type: 'event' as const,
    laneId: 'events',
    time: new Date('2024-01-01T03:20:00Z'),
    style: {
      markerType: 'circle' as const,
      color: '#17a2b8',
      size: 5,
    },
    label: { text: 'Info', position: 'top' as const },
  } as EventItem,

  {
    id: 'success-checkpoint',
    type: 'event' as const,
    laneId: 'events',
    time: new Date('2024-01-01T03:45:00Z'),
    style: {
      markerType: 'circle' as const,
      color: '#28a745',
      size: 7,
    },
    label: { text: 'Success', position: 'top' as const },
  } as EventItem,

  // Deployment and maintenance time ranges
  {
    id: 'deployment-1',
    type: 'time-range' as const,
    laneId: 'deployments',
    startTime: new Date('2024-01-01T02:00:00Z'),
    endTime: new Date('2024-01-01T02:15:00Z'),
    style: {
      backgroundColor: '#28a745',
      opacity: 0.8,
    },
    label: { text: 'v2.1.0 Deploy', position: 'inline' as const },
  } as TimeRangeItem,

  {
    id: 'maintenance-window',
    type: 'time-range' as const,
    laneId: 'deployments',
    startTime: new Date('2024-01-01T03:30:00Z'),
    endTime: new Date('2024-01-01T04:00:00Z'),
    style: {
      backgroundColor: '#6c757d',
      opacity: 0.6,
    },
    label: { text: 'Maintenance', position: 'inline' as const },
  } as TimeRangeItem,
];

const initialTimeRange: TimeRange = {
  start: new Date('2024-01-01T00:00:00Z'),
  end: new Date('2024-01-01T04:00:00Z'),
};

function App() {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [hoveredItem, setHoveredItem] = React.useState<any>(null);

  const handleViewChange = (newTimeRange: TimeRange) => {
    console.log('View changed:', newTimeRange);
  };

  const handleItemClick = (item: any, event: React.MouseEvent) => {
    console.log('Item clicked:', item);
    setSelectedItem(item);
  };

  const handleItemHover = (item: any, event: React.MouseEvent) => {
    console.log('Item hovered:', item);
    setHoveredItem(item);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PowerTimeline Development</h1>
      <p>This is a development environment for the PowerTimeline component.</p>
      
      <div style={{ marginTop: '20px', border: '1px solid #ccc' }}>
        <PowerTimeline
          lanes={lanes}
          items={items}
          initialTimeRange={initialTimeRange}
          onViewChange={handleViewChange}
          onItemClick={handleItemClick}
          onItemHover={handleItemHover}
          width={800}
          height={300}
          bufferZone={0.5}
          ariaLabel="System performance timeline"
        />
      </div>
      
      {/* Item Info Panel */}
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        gap: '20px',
        minHeight: '200px'
      }}>
        {/* Selected Item Panel */}
        <div style={{ 
          flex: 1, 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '16px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>Selected Item</h3>
          {selectedItem ? (
            <ItemDetails item={selectedItem} />
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Click on any timeline item to see its details
            </p>
          )}
        </div>

        {/* Hovered Item Panel */}
        <div style={{ 
          flex: 1, 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '16px',
          backgroundColor: '#fff'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>Hovered Item</h3>
          {hoveredItem ? (
            <ItemDetails item={hoveredItem} />
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Hover over any timeline item to see its details
            </p>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Try interacting with the timeline:</p>
        <ul>
          <li>Click and drag to pan</li>
          <li>Use mouse wheel to zoom</li>
          <li>Click on items to see details in the info panel</li>
          <li>Hover over items for quick preview</li>
          <li>Use keyboard navigation (arrow keys, +/- for zoom)</li>
        </ul>
      </div>
    </div>
  );
}

// Component to display item details
function ItemDetails({ item }: { item: any }) {
  const formatTime = (time: Date) => {
    return time.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderItemSpecificDetails = () => {
    switch (item.type) {
      case 'curve':
        return (
          <>
            <div><strong>Data Points:</strong> {item.dataPoints?.length || 0}</div>
            <div><strong>Interpolation:</strong> {item.interpolation || 'linear'}</div>
            {item.dataPoints && item.dataPoints.length > 0 && (
              <>
                <div><strong>Value Range:</strong> {Math.min(...item.dataPoints.map((p: any) => p.value)).toFixed(2)} - {Math.max(...item.dataPoints.map((p: any) => p.value)).toFixed(2)}</div>
                <div><strong>Time Span:</strong> {formatTime(item.dataPoints[0].time)} to {formatTime(item.dataPoints[item.dataPoints.length - 1].time)}</div>
              </>
            )}
          </>
        );
      
      case 'event':
        return (
          <>
            <div><strong>Time:</strong> {formatTime(item.time)}</div>
            <div><strong>Marker Type:</strong> {item.style?.markerType || 'circle'}</div>
            <div><strong>Color:</strong> <span style={{ 
              display: 'inline-block', 
              width: '16px', 
              height: '16px', 
              backgroundColor: item.style?.color || '#000',
              border: '1px solid #ccc',
              borderRadius: '2px',
              verticalAlign: 'middle',
              marginLeft: '8px'
            }}></span> {item.style?.color || '#000'}</div>
            <div><strong>Size:</strong> {item.style?.size || 8}px</div>
          </>
        );
      
      case 'time-range':
        const duration = item.endTime.getTime() - item.startTime.getTime();
        const durationStr = duration < 60000 ? `${Math.round(duration/1000)}s` : 
                           duration < 3600000 ? `${Math.round(duration/60000)}m` : 
                           `${Math.round(duration/3600000)}h`;
        return (
          <>
            <div><strong>Start Time:</strong> {formatTime(item.startTime)}</div>
            <div><strong>End Time:</strong> {formatTime(item.endTime)}</div>
            <div><strong>Duration:</strong> {durationStr}</div>
            <div><strong>Background:</strong> <span style={{ 
              display: 'inline-block', 
              width: '16px', 
              height: '16px', 
              backgroundColor: item.style?.backgroundColor || '#000',
              border: '1px solid #ccc',
              borderRadius: '2px',
              verticalAlign: 'middle',
              marginLeft: '8px'
            }}></span> {item.style?.backgroundColor || '#000'}</div>
            <div><strong>Opacity:</strong> {item.style?.opacity || 1}</div>
            {item.stackLevel !== undefined && (
              <div><strong>Stack Level:</strong> {item.stackLevel}</div>
            )}
          </>
        );
      
      default:
        return <div>Unknown item type</div>;
    }
  };

  return (
    <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
      <div style={{ marginBottom: '12px' }}>
        <div><strong>ID:</strong> {item.id}</div>
        <div><strong>Type:</strong> <span style={{ 
          backgroundColor: item.type === 'curve' ? '#e3f2fd' : 
                          item.type === 'event' ? '#fff3e0' : '#e8f5e8',
          color: item.type === 'curve' ? '#1976d2' : 
                 item.type === 'event' ? '#f57c00' : '#388e3c',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>{item.type}</span></div>
        <div><strong>Lane:</strong> {item.laneId}</div>
        {item.label && (
          <div><strong>Label:</strong> {item.label.text}</div>
        )}
      </div>
      
      <div style={{ borderTop: '1px solid #eee', paddingTop: '12px' }}>
        {renderItemSpecificDetails()}
      </div>
      
      {item.metadata && (
        <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '12px' }}>
          <div><strong>Metadata:</strong></div>
          <pre style={{ 
            fontSize: '12px', 
            backgroundColor: '#f5f5f5', 
            padding: '8px', 
            borderRadius: '4px',
            margin: '4px 0 0 0',
            overflow: 'auto'
          }}>
            {JSON.stringify(item.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Add some basic styles
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .power-timeline {
    font-family: inherit;
  }
  
  .timeline-lane {
    border-bottom: 1px solid #eee;
  }
  
  .curve-item:hover .curve-line {
    stroke-width: 3;
  }
  
  .event-item:hover .event-marker {
    stroke-width: 3;
  }
  
  .time-range-item:hover .time-range-rect {
    stroke-width: 2;
  }
`;
document.head.appendChild(style);

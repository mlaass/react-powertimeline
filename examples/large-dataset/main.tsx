/**
 * Large Dataset Performance Example
 * 
 * Demonstrates PowerTimeline performance with large datasets and virtualization.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Performance monitoring
class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;

  startMonitoring(callback: (stats: any) => void) {
    const monitor = () => {
      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        callback({
          fps: this.fps,
          memory: this.getMemoryUsage(),
        });
      }
      
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024);
    }
    return 0;
  }
}

// Helper function to generate sin/cos curves
function generateMathCurve(
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

// Data generator for large datasets
function generateLargeDataset(itemCount: number) {
  const lanes: Lane[] = [
    { id: 'sensors', height: 80, label: 'Sensor Data' },
    { id: 'events', height: 60, label: 'System Events' },
    { id: 'processes', height: 100, label: 'Process Metrics' },
    { id: 'network', height: 70, label: 'Network Activity' },
    { id: 'alerts', height: 50, label: 'Alerts & Warnings' },
  ];

  const items: (CurveItem | EventItem | TimeRangeItem)[] = [];
  const startTime = new Date('2024-01-01T00:00:00Z');
  const timeSpan = 24 * 60 * 60 * 1000; // 24 hours

  for (let i = 0; i < itemCount; i++) {
    const progress = i / itemCount;
    const time = new Date(startTime.getTime() + progress * timeSpan);
    const laneId = lanes[i % lanes.length].id;
    
    if (i % 4 === 0) {
      // Generate mathematical curve items (25%)
      const curveStartTime = time;
      const curveEndTime = new Date(time.getTime() + 600000); // 10 minutes
      
      // Vary the mathematical parameters for diversity
      const amplitude = 20 + Math.random() * 30; // 20-50
      const frequency = 0.5 + Math.random() * 3; // 0.5-3.5 cycles
      const phase = Math.random() * 2 * Math.PI; // Random phase
      const offset = 30 + Math.random() * 40; // 30-70 offset
      const mathType = Math.random() > 0.5 ? 'sin' : 'cos';
      
      const dataPoints = generateMathCurve(
        curveStartTime,
        curveEndTime,
        15, // points per curve
        amplitude,
        frequency,
        phase,
        offset,
        mathType
      );
      
      items.push({
        id: `curve-${i}`,
        type: 'curve',
        laneId,
        dataPoints,
        style: {
          strokeColor: `hsl(${(i * 137.5) % 360}, 70%, 50%)`,
          strokeWidth: 1 + Math.random() * 2,
        },
      } as CurveItem);
    } else if (i % 4 === 1) {
      // Generate event items (25%)
      const eventTypes = ['info', 'warning', 'error', 'success'];
      const eventType = eventTypes[i % eventTypes.length];
      const colors = { info: '#17a2b8', warning: '#ffc107', error: '#dc3545', success: '#28a745' };
      
      items.push({
        id: `event-${i}`,
        type: 'event',
        laneId,
        time,
        style: {
          markerType: 'circle',
          color: colors[eventType as keyof typeof colors],
          size: 4 + Math.random() * 6,
        },
        metadata: { type: eventType, severity: Math.floor(Math.random() * 5) },
      } as EventItem);
    } else {
      // Generate time range items (50%)
      const duration = 60000 + Math.random() * 1800000; // 1-30 minutes
      const endTime = new Date(time.getTime() + duration);
      
      items.push({
        id: `range-${i}`,
        type: 'time-range',
        laneId,
        startTime: time,
        endTime,
        style: {
          backgroundColor: `hsla(${(i * 137.5) % 360}, 60%, 60%, 0.6)`,
        },
        metadata: { 
          category: ['process', 'task', 'operation', 'maintenance'][i % 4],
          priority: Math.floor(Math.random() * 3),
        },
      } as TimeRangeItem);
    }
  }

  const timeRange: TimeRange = {
    start: startTime,
    end: new Date(startTime.getTime() + timeSpan),
  };

  return { lanes, items, timeRange };
}

function LargeDatasetExample() {
  const [itemCount, setItemCount] = React.useState(10000);
  const [virtualizationEnabled, setVirtualizationEnabled] = React.useState(true);
  const [bufferZone, setBufferZone] = React.useState(0.5);
  const [data, setData] = React.useState(() => generateLargeDataset(itemCount));
  const [stats, setStats] = React.useState({
    renderTime: 0,
    visibleItems: 0,
    fps: 60,
    memory: 0,
  });
  
  const performanceMonitor = React.useRef(new PerformanceMonitor());

  React.useEffect(() => {
    performanceMonitor.current.startMonitoring((perfStats) => {
      setStats(prev => ({ ...prev, ...perfStats }));
    });
  }, []);

  const regenerateData = React.useCallback(() => {
    const startTime = performance.now();
    const newData = generateLargeDataset(itemCount);
    const renderTime = performance.now() - startTime;
    
    setData(newData);
    setStats(prev => ({ ...prev, renderTime: Math.round(renderTime) }));
  }, [itemCount]);

  const handleViewChange = React.useCallback((timeRange: TimeRange) => {
    // Calculate visible items (approximation)
    const visibleItems = data.items.filter(item => {
      if (item.type === 'event') {
        return item.time >= timeRange.start && item.time <= timeRange.end;
      } else if (item.type === 'time-range') {
        return item.startTime <= timeRange.end && item.endTime >= timeRange.start;
      } else if (item.type === 'curve') {
        return item.dataPoints.some(point => 
          point.time >= timeRange.start && point.time <= timeRange.end
        );
      }
      return false;
    }).length;
    
    setStats(prev => ({ ...prev, visibleItems }));
  }, [data.items]);

  // Setup UI controls
  React.useEffect(() => {
    const datasetSizeSelect = document.getElementById('dataset-size') as HTMLSelectElement;
    const virtualizationToggle = document.getElementById('virtualization-toggle') as HTMLButtonElement;
    const bufferZoneSlider = document.getElementById('buffer-zone') as HTMLInputElement;
    const bufferValueSpan = document.getElementById('buffer-value') as HTMLSpanElement;
    const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement;

    const updateStats = () => {
      const itemCountEl = document.getElementById('item-count');
      const renderTimeEl = document.getElementById('render-time');
      const visibleItemsEl = document.getElementById('visible-items');
      const memoryEl = document.getElementById('memory-usage');
      const fpsEl = document.getElementById('fps');

      if (itemCountEl) itemCountEl.textContent = `Items: ${data.items.length.toLocaleString()}`;
      if (renderTimeEl) {
        renderTimeEl.textContent = `Render: ${stats.renderTime}ms`;
        renderTimeEl.className = `stat ${stats.renderTime < 100 ? 'good' : stats.renderTime < 500 ? 'warning' : 'danger'}`;
      }
      if (visibleItemsEl) visibleItemsEl.textContent = `Visible: ${stats.visibleItems}`;
      if (memoryEl) {
        memoryEl.textContent = `Memory: ${stats.memory}MB`;
        memoryEl.className = `stat ${stats.memory < 50 ? 'good' : stats.memory < 100 ? 'warning' : 'danger'}`;
      }
      if (fpsEl) {
        fpsEl.textContent = `FPS: ${stats.fps}`;
        fpsEl.className = `stat ${stats.fps >= 55 ? 'good' : stats.fps >= 30 ? 'warning' : 'danger'}`;
      }
    };

    updateStats();

    if (datasetSizeSelect) {
      datasetSizeSelect.addEventListener('change', (e) => {
        setItemCount(parseInt((e.target as HTMLSelectElement).value));
      });
    }

    if (virtualizationToggle) {
      virtualizationToggle.addEventListener('click', () => {
        setVirtualizationEnabled(prev => {
          const newValue = !prev;
          virtualizationToggle.textContent = newValue ? 'Enabled' : 'Disabled';
          virtualizationToggle.className = newValue ? 'active' : '';
          return newValue;
        });
      });
    }

    if (bufferZoneSlider && bufferValueSpan) {
      bufferZoneSlider.addEventListener('input', (e) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setBufferZone(value);
        bufferValueSpan.textContent = value.toString();
      });
    }

    if (regenerateButton) {
      regenerateButton.addEventListener('click', regenerateData);
    }

    return updateStats;
  }, [data.items.length, stats, regenerateData]);

  React.useEffect(() => {
    regenerateData();
  }, [itemCount]);

  return (
    <PowerTimeline
      lanes={data.lanes}
      items={data.items}
      initialTimeRange={data.timeRange}
      onViewChange={handleViewChange}
      width={1200}
      height={400}
      bufferZone={virtualizationEnabled ? bufferZone : undefined}
      ariaLabel={`Large dataset timeline with ${data.items.length} items`}
    />
  );
}

ReactDOM.createRoot(document.getElementById('timeline-root')!).render(
  <React.StrictMode>
    <LargeDatasetExample />
  </React.StrictMode>
);

/**
 * Interactive Features Example
 * 
 * Demonstrates all interactive capabilities of PowerTimeline.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

function InteractiveFeaturesDemo() {
  const [lanes] = React.useState<Lane[]>([
    { id: 'events', height: 60, label: '🎯 System Events' },
    { id: 'metrics', height: 100, label: '📊 Performance' },
    { id: 'processes', height: 80, label: '⚙️ Background Tasks' },
  ]);

  const [items, setItems] = React.useState<(CurveItem | EventItem | TimeRangeItem)[]>([
    {
      id: 'startup',
      type: 'event',
      laneId: 'events',
      time: new Date('2024-01-01T09:00:00Z'),
      style: { markerType: 'circle', color: '#28a745', size: 10 },
      label: { text: 'System Start', position: 'top' },
    },
    {
      id: 'performance-curve',
      type: 'curve',
      laneId: 'metrics',
      dataPoints: Array.from({ length: 20 }, (_, i) => ({
        time: new Date('2024-01-01T09:00:00Z').getTime() + i * 300000,
        value: 30 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
      })).map(p => ({ time: new Date(p.time), value: p.value })),
      style: { strokeColor: '#007bff', strokeWidth: 2 },
      label: { text: 'CPU Usage', position: 'top' },
    },
    {
      id: 'backup-task',
      type: 'time-range',
      laneId: 'processes',
      startTime: new Date('2024-01-01T10:00:00Z'),
      endTime: new Date('2024-01-01T10:30:00Z'),
      style: { backgroundColor: '#17a2b8', opacity: 0.7 },
      label: { text: 'Database Backup', position: 'inline' },
    },
  ]);

  const [currentTimeRange, setCurrentTimeRange] = React.useState<TimeRange>({
    start: new Date('2024-01-01T08:30:00Z'),
    end: new Date('2024-01-01T15:30:00Z'),
  });

  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [realtimeMode, setRealtimeMode] = React.useState(false);
  const [interactionLog, setInteractionLog] = React.useState<string[]>(['Timeline initialized...']);

  const logInteraction = React.useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setInteractionLog(prev => [...prev.slice(-9), `[${timestamp}] ${message}`]);
  }, []);

  const handleViewChange = React.useCallback((newTimeRange: TimeRange) => {
    setCurrentTimeRange(newTimeRange);
    logInteraction(`View changed: ${newTimeRange.start.toLocaleTimeString()} - ${newTimeRange.end.toLocaleTimeString()}`);
  }, [logInteraction]);

  const handleItemClick = React.useCallback((item: any, event: React.MouseEvent) => {
    setSelectedItem(item);
    logInteraction(`Clicked ${item.type} item: ${item.id}`);
  }, [logInteraction]);

  const handleItemHover = React.useCallback((item: any, event: React.MouseEvent) => {
    logInteraction(`Hovering over ${item.type}: ${item.id}`);
  }, [logInteraction]);

  // Real-time data simulation
  React.useEffect(() => {
    if (!realtimeMode) return;

    const interval = setInterval(() => {
      const now = new Date();
      const newEvent: EventItem = {
        id: `realtime-${Date.now()}`,
        type: 'event',
        laneId: 'events',
        time: now,
        style: { 
          markerType: 'circle', 
          color: '#ffc107', 
          size: 6 + Math.random() * 4 
        },
        label: { text: 'Live Event', position: 'top' },
      };

      setItems(prev => [...prev, newEvent]);
      logInteraction(`Added real-time event: ${newEvent.id}`);
    }, 2000);

    return () => clearInterval(interval);
  }, [realtimeMode, logInteraction]);

  // Setup UI controls
  React.useEffect(() => {
    const updateTimeDisplay = () => {
      const timeDisplay = document.getElementById('current-time-range');
      if (timeDisplay) {
        timeDisplay.textContent = `${currentTimeRange.start.toLocaleTimeString()} - ${currentTimeRange.end.toLocaleTimeString()}`;
      }
    };

    const updateSelectionInfo = () => {
      const selectionInfo = document.getElementById('selection-info');
      if (selectionInfo) {
        if (selectedItem) {
          selectionInfo.className = 'selection-info';
          selectionInfo.innerHTML = `
            <strong>Selected: ${selectedItem.type.toUpperCase()}</strong><br>
            ID: ${selectedItem.id}<br>
            Lane: ${selectedItem.laneId}<br>
            ${selectedItem.label ? `Label: ${selectedItem.label.text}<br>` : ''}
            ${selectedItem.time ? `Time: ${selectedItem.time.toLocaleString()}` : ''}
            ${selectedItem.startTime ? `Duration: ${selectedItem.startTime.toLocaleString()} - ${selectedItem.endTime.toLocaleString()}` : ''}
          `;
        } else {
          selectionInfo.className = 'selection-info empty';
          selectionInfo.innerHTML = '<strong>No item selected</strong> - Click on any timeline item to see details';
        }
      }
    };

    const updateInteractionLog = () => {
      const logElement = document.getElementById('interaction-log');
      if (logElement) {
        logElement.innerHTML = interactionLog.map(log => `<div>${log}</div>`).join('');
        logElement.scrollTop = logElement.scrollHeight;
      }
    };

    updateTimeDisplay();
    updateSelectionInfo();
    updateInteractionLog();

    // Control button handlers
    const setupButton = (id: string, handler: () => void) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener('click', handler);
      }
    };

    setupButton('zoom-in', () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const center = new Date((currentTimeRange.start.getTime() + currentTimeRange.end.getTime()) / 2);
      const newDuration = duration * 0.7;
      setCurrentTimeRange({
        start: new Date(center.getTime() - newDuration / 2),
        end: new Date(center.getTime() + newDuration / 2),
      });
      logInteraction('Zoomed in');
    });

    setupButton('zoom-out', () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const center = new Date((currentTimeRange.start.getTime() + currentTimeRange.end.getTime()) / 2);
      const newDuration = duration * 1.5;
      setCurrentTimeRange({
        start: new Date(center.getTime() - newDuration / 2),
        end: new Date(center.getTime() + newDuration / 2),
      });
      logInteraction('Zoomed out');
    });

    setupButton('pan-left', () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const panAmount = duration * 0.2;
      setCurrentTimeRange({
        start: new Date(currentTimeRange.start.getTime() - panAmount),
        end: new Date(currentTimeRange.end.getTime() - panAmount),
      });
      logInteraction('Panned left');
    });

    setupButton('pan-right', () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const panAmount = duration * 0.2;
      setCurrentTimeRange({
        start: new Date(currentTimeRange.start.getTime() + panAmount),
        end: new Date(currentTimeRange.end.getTime() + panAmount),
      });
      logInteraction('Panned right');
    });

    setupButton('add-random-event', () => {
      const randomTime = new Date(
        currentTimeRange.start.getTime() + 
        Math.random() * (currentTimeRange.end.getTime() - currentTimeRange.start.getTime())
      );
      const colors = ['#dc3545', '#ffc107', '#28a745', '#17a2b8'];
      const newEvent: EventItem = {
        id: `event-${Date.now()}`,
        type: 'event',
        laneId: 'events',
        time: randomTime,
        style: {
          markerType: 'circle',
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 8,
        },
        label: { text: `Event ${items.length + 1}`, position: 'top' },
      };
      setItems(prev => [...prev, newEvent]);
      logInteraction(`Added random event: ${newEvent.id}`);
    });

    setupButton('simulate-realtime', () => {
      setRealtimeMode(prev => {
        const newMode = !prev;
        const button = document.getElementById('simulate-realtime');
        if (button) {
          button.textContent = newMode ? 'Stop Real-time' : 'Real-time Mode';
          button.classList.toggle('active', newMode);
        }
        logInteraction(newMode ? 'Started real-time mode' : 'Stopped real-time mode');
        return newMode;
      });
    });

    setupButton('clear-selection', () => {
      setSelectedItem(null);
      logInteraction('Cleared selection');
    });

    setupButton('clear-log', () => {
      setInteractionLog(['Log cleared...']);
    });

  }, [currentTimeRange, selectedItem, interactionLog, items.length, logInteraction]);

  return (
    <PowerTimeline
      lanes={lanes}
      items={items}
      initialTimeRange={initialTimeRange}
      onViewChange={handleViewChange}
      onItemClick={handleItemClick}
      onItemHover={handleItemHover}
      width={900}
      height={300}
      ariaLabel="Interactive timeline demonstration with full feature set"
    />
  );
}

ReactDOM.createRoot(document.getElementById('timeline-root')!).render(
  <React.StrictMode>
    <InteractiveFeaturesDemo />
  </React.StrictMode>
);

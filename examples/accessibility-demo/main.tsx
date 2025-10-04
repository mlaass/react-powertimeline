/**
 * Accessibility Demo Example
 * 
 * Demonstrates PowerTimeline's accessibility features and WCAG compliance.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PowerTimeline } from '../../src';
import type { Lane, CurveItem, EventItem, TimeRangeItem, TimeRange } from '../../src/types';

// Accessible timeline data with comprehensive labeling
const lanes: Lane[] = [
  {
    id: 'alerts',
    height: 60,
    label: 'System Alerts',
    style: { backgroundColor: '#fff3cd' },
  },
  {
    id: 'performance',
    height: 100,
    label: 'Performance Metrics',
    style: { backgroundColor: '#d1ecf1' },
  },
  {
    id: 'operations',
    height: 80,
    label: 'Operations',
    style: { backgroundColor: '#d4edda' },
  },
];

const items: (CurveItem | EventItem | TimeRangeItem)[] = [
  // Critical system alerts
  {
    id: 'critical-alert-1',
    type: 'event',
    laneId: 'alerts',
    time: new Date('2024-01-01T09:15:00Z'),
    style: { markerType: 'triangle', color: '#dc3545', size: 12 },
    label: { text: 'Critical: Database Connection Lost', position: 'top' },
    metadata: {
      severity: 'critical',
      description: 'Primary database connection failed at 9:15 AM',
      ariaLabel: 'Critical alert: Database connection lost at 9:15 AM, severity critical',
    },
  },
  {
    id: 'warning-alert-1',
    type: 'event',
    laneId: 'alerts',
    time: new Date('2024-01-01T11:30:00Z'),
    style: { markerType: 'square', color: '#ffc107', size: 10 },
    label: { text: 'Warning: High Memory Usage', position: 'top' },
    metadata: {
      severity: 'warning',
      description: 'Memory usage exceeded 80% threshold',
      ariaLabel: 'Warning alert: High memory usage at 11:30 AM, memory exceeded 80% threshold',
    },
  },
  {
    id: 'info-alert-1',
    type: 'event',
    laneId: 'alerts',
    time: new Date('2024-01-01T14:45:00Z'),
    style: { markerType: 'circle', color: '#17a2b8', size: 8 },
    label: { text: 'Info: Backup Completed', position: 'top' },
    metadata: {
      severity: 'info',
      description: 'Daily backup process completed successfully',
      ariaLabel: 'Information: Daily backup completed successfully at 2:45 PM',
    },
  },

  // Performance metrics curve
  {
    id: 'cpu-performance',
    type: 'curve',
    laneId: 'performance',
    dataPoints: [
      { time: new Date('2024-01-01T09:00:00Z'), value: 25 },
      { time: new Date('2024-01-01T09:15:00Z'), value: 85 }, // Spike during alert
      { time: new Date('2024-01-01T09:30:00Z'), value: 90 },
      { time: new Date('2024-01-01T10:00:00Z'), value: 70 },
      { time: new Date('2024-01-01T10:30:00Z'), value: 45 },
      { time: new Date('2024-01-01T11:00:00Z'), value: 55 },
      { time: new Date('2024-01-01T11:30:00Z'), value: 82 }, // High during warning
      { time: new Date('2024-01-01T12:00:00Z'), value: 60 },
      { time: new Date('2024-01-01T12:30:00Z'), value: 40 },
      { time: new Date('2024-01-01T13:00:00Z'), value: 35 },
      { time: new Date('2024-01-01T13:30:00Z'), value: 30 },
      { time: new Date('2024-01-01T14:00:00Z'), value: 28 },
      { time: new Date('2024-01-01T14:30:00Z'), value: 25 },
      { time: new Date('2024-01-01T15:00:00Z'), value: 22 },
    ],
    style: {
      strokeColor: '#007bff',
      strokeWidth: 3,
      fillColor: 'rgba(0, 123, 255, 0.2)',
    },
    label: { text: 'CPU Usage Percentage', position: 'top' },
    metadata: {
      description: 'CPU usage percentage over time showing system performance',
      ariaLabel: 'CPU usage performance curve from 9 AM to 3 PM, showing spikes during alert periods',
      unit: 'percentage',
      range: '0-100%',
    },
  },

  // Operational time ranges
  {
    id: 'maintenance-window',
    type: 'time-range',
    laneId: 'operations',
    startTime: new Date('2024-01-01T10:00:00Z'),
    endTime: new Date('2024-01-01T10:30:00Z'),
    style: {
      backgroundColor: '#6f42c1',
      opacity: 0.8,
    },
    label: { text: 'Scheduled Maintenance', position: 'inline' },
    metadata: {
      description: 'Scheduled system maintenance window',
      ariaLabel: 'Scheduled maintenance from 10:00 AM to 10:30 AM, duration 30 minutes',
      type: 'maintenance',
      impact: 'minimal',
    },
  },
  {
    id: 'backup-operation',
    type: 'time-range',
    laneId: 'operations',
    startTime: new Date('2024-01-01T14:30:00Z'),
    endTime: new Date('2024-01-01T14:45:00Z'),
    style: {
      backgroundColor: '#28a745',
      opacity: 0.8,
    },
    label: { text: 'Database Backup', position: 'inline' },
    metadata: {
      description: 'Automated database backup process',
      ariaLabel: 'Database backup operation from 2:30 PM to 2:45 PM, completed successfully',
      type: 'backup',
      status: 'completed',
    },
  },
  {
    id: 'deployment-window',
    type: 'time-range',
    laneId: 'operations',
    startTime: new Date('2024-01-01T12:00:00Z'),
    endTime: new Date('2024-01-01T12:15:00Z'),
    style: {
      backgroundColor: '#fd7e14',
      opacity: 0.8,
    },
    label: { text: 'Application Deployment', position: 'inline' },
    metadata: {
      description: 'Application version 2.1.0 deployment',
      ariaLabel: 'Application deployment from 12:00 PM to 12:15 PM, version 2.1.0',
      type: 'deployment',
      version: '2.1.0',
    },
  },
];

const initialTimeRange: TimeRange = {
  start: new Date('2024-01-01T08:30:00Z'),
  end: new Date('2024-01-01T15:30:00Z'),
};

function AccessibilityDemo() {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [announceChanges, setAnnounceChanges] = React.useState(true);
  const [currentTimeRange, setCurrentTimeRange] = React.useState<TimeRange>(initialTimeRange);

  // Live region for announcements
  const liveRegionRef = React.useRef<HTMLDivElement>(null);

  const announceToScreenReader = React.useCallback((message: string) => {
    if (announceChanges && liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
    }
  }, [announceChanges]);

  const handleViewChange = React.useCallback((newTimeRange: TimeRange) => {
    setCurrentTimeRange(newTimeRange);
    
    const startTime = newTimeRange.start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
    const endTime = newTimeRange.end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
    
    announceToScreenReader(`Timeline view changed to ${startTime} through ${endTime}`);
  }, [announceToScreenReader]);

  const handleItemClick = React.useCallback((item: any, event: React.MouseEvent) => {
    setSelectedItem(item);
    
    const itemDescription = item.metadata?.ariaLabel || 
      `${item.type} item ${item.id} in ${item.laneId} lane`;
    
    announceToScreenReader(`Selected ${itemDescription}`);
  }, [announceToScreenReader]);

  const handleItemHover = React.useCallback((item: any, event: React.MouseEvent) => {
    if (announceChanges) {
      const itemDescription = item.metadata?.ariaLabel || 
        `${item.type} item ${item.id}`;
      
      announceToScreenReader(`Hovering over ${itemDescription}`);
    }
  }, [announceChanges]);

  // Setup accessibility controls
  React.useEffect(() => {
    const contrastToggle = document.getElementById('contrast-toggle') as HTMLInputElement;
    const largeTextToggle = document.getElementById('large-text-toggle') as HTMLInputElement;
    const reducedMotionToggle = document.getElementById('reduced-motion-toggle') as HTMLInputElement;
    const announceToggle = document.getElementById('announce-changes') as HTMLInputElement;
    const testScreenReaderBtn = document.getElementById('test-screen-reader') as HTMLButtonElement;
    const liveRegion = document.getElementById('live-region') as HTMLDivElement;

    if (liveRegion) {
      liveRegionRef.current = liveRegion;
    }

    if (contrastToggle) {
      contrastToggle.addEventListener('change', (e) => {
        const container = document.querySelector('.container');
        if (container) {
          container.classList.toggle('high-contrast', (e.target as HTMLInputElement).checked);
        }
      });
    }

    if (largeTextToggle) {
      largeTextToggle.addEventListener('change', (e) => {
        document.body.classList.toggle('large-text', (e.target as HTMLInputElement).checked);
      });
    }

    if (reducedMotionToggle) {
      reducedMotionToggle.addEventListener('change', (e) => {
        document.body.classList.toggle('reduced-motion', (e.target as HTMLInputElement).checked);
      });
    }

    if (announceToggle) {
      announceToggle.addEventListener('change', (e) => {
        setAnnounceChanges((e.target as HTMLInputElement).checked);
      });
    }

    if (testScreenReaderBtn) {
      testScreenReaderBtn.addEventListener('click', () => {
        announceToScreenReader(
          'Screen reader test: PowerTimeline is fully accessible with keyboard navigation, ' +
          'ARIA labels, and live region announcements. Use arrow keys to navigate and ' +
          'space to select items.'
        );
      });
    }
  }, [announceToScreenReader]);

  return (
    <div>
      <PowerTimeline
        lanes={lanes}
        items={items}
        initialTimeRange={currentTimeRange}
        onViewChange={handleViewChange}
        onItemClick={handleItemClick}
        onItemHover={handleItemHover}
        width={1000}
        height={300}
        ariaLabel="Accessible system monitoring timeline showing alerts, performance metrics, and operations"
      />
      
      {selectedItem && (
        <div 
          style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            border: '2px solid #007bff',
          }}
          role="region"
          aria-label="Selected item details"
        >
          <h4 style={{ margin: '0 0 8px 0' }}>Selected Item Details</h4>
          <p><strong>ID:</strong> {selectedItem.id}</p>
          <p><strong>Type:</strong> {selectedItem.type}</p>
          <p><strong>Lane:</strong> {selectedItem.laneId}</p>
          {selectedItem.label && (
            <p><strong>Label:</strong> {selectedItem.label.text}</p>
          )}
          {selectedItem.metadata?.description && (
            <p><strong>Description:</strong> {selectedItem.metadata.description}</p>
          )}
          {selectedItem.metadata?.severity && (
            <p><strong>Severity:</strong> {selectedItem.metadata.severity}</p>
          )}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('timeline-root')!).render(
  <React.StrictMode>
    <AccessibilityDemo />
  </React.StrictMode>
);

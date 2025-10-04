/**
 * PowerTimeline Component
 * 
 * Main timeline component that orchestrates lanes, items, virtualization,
 * pan/zoom interactions, and accessibility features.
 */

import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { select } from 'd3-selection';
import type { PowerTimelineProps, PowerTimelineRef, TimeRange } from './PowerTimeline.types';
import { Lane } from '../Lane';
import { TimelineAxis } from '../TimelineAxis';
import { useTimeScale } from '../../hooks/useTimeScale';
import { useVirtualizationWithPerformance } from '../../hooks/useVirtualization';
import { useD3Zoom } from '../../hooks/useD3Zoom';
import { 
  generateTimelineAriaDescription,
  createKeyboardNavigationHandler,
  ScreenReaderAnnouncer,
  FocusManager 
} from '../../utils/accessibility';

export const PowerTimeline = forwardRef<PowerTimelineRef, PowerTimelineProps>(({
  lanes,
  items,
  initialTimeRange,
  onViewChange,
  onItemClick,
  onItemHover,
  width,
  height,
  bufferZone = 0.5,
  className,
  style,
  ariaLabel,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTimeRange, setCurrentTimeRange] = useState<TimeRange>(initialTimeRange);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const [focusManager, setFocusManager] = useState<FocusManager | null>(null);
  const [announcer, setAnnouncer] = useState<ScreenReaderAnnouncer | null>(null);

  // Create time scale
  const timeScale = useTimeScale(currentTimeRange, [0, width]);

  // Setup virtualization
  const { virtualizationState, performanceMetrics, itemsByLane } = useVirtualizationWithPerformance(
    items,
    currentTimeRange,
    bufferZone
  );

  // Setup pan/zoom behavior
  const {
    currentTimeRange: zoomTimeRange,
    zoomBehavior,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomToFit,
  } = useD3Zoom(
    initialTimeRange,
    handleViewChange,
    width,
    {
      enableTouch: true,
      enableWheel: true,
      enableDrag: true,
    }
  );

  // Apply zoom behavior to container
  useEffect(() => {
    if (containerRef.current && zoomBehavior) {
      const container = select(containerRef.current);
      container.call(zoomBehavior);
    }
  }, [zoomBehavior]);

  // Handle view changes
  function handleViewChange(newTimeRange: TimeRange) {
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
    announcer?.announceTimeRangeChange(newTimeRange);
  }

  // Handle item interactions
  const handleItemClick = useCallback((item: any, event: React.MouseEvent) => {
    setSelectedItemId(item.id);
    onItemClick?.(item, event);
    announcer?.announceItemSelection(item);
  }, [onItemClick, announcer]);

  const handleItemHover = useCallback((item: any, event: React.MouseEvent) => {
    onItemHover?.(item, event);
  }, [onItemHover]);

  // Keyboard navigation
  const handleKeyDown = createKeyboardNavigationHandler({
    onPanLeft: () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const panAmount = duration * 0.1; // Pan by 10% of current range
      const newRange = {
        start: new Date(currentTimeRange.start.getTime() - panAmount),
        end: new Date(currentTimeRange.end.getTime() - panAmount),
      };
      handleViewChange(newRange);
    },
    onPanRight: () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const panAmount = duration * 0.1;
      const newRange = {
        start: new Date(currentTimeRange.start.getTime() + panAmount),
        end: new Date(currentTimeRange.end.getTime() + panAmount),
      };
      handleViewChange(newRange);
    },
    onZoomIn: () => zoomIn?.(),
    onZoomOut: () => zoomOut?.(),
    onResetZoom: () => resetZoom?.(),
    onSelectNextItem: () => {
      focusManager?.focusNext();
    },
    onSelectPreviousItem: () => {
      focusManager?.focusPrevious();
    },
    onActivateSelectedItem: () => {
      const focusedElement = focusManager?.getCurrentFocusedElement();
      if (focusedElement) {
        focusedElement.click();
      }
    },
  });

  // Initialize accessibility helpers
  useEffect(() => {
    if (containerRef.current) {
      const fm = new FocusManager(containerRef.current);
      const sa = new ScreenReaderAnnouncer(containerRef.current);
      setFocusManager(fm);
      setAnnouncer(sa);

      return () => {
        sa.destroy();
      };
    }
  }, []);

  // Update focus manager when items change
  useEffect(() => {
    focusManager?.updateFocusableElements();
  }, [virtualizationState.visibleItems, focusManager]);

  // Imperative API
  useImperativeHandle(ref, () => ({
    getTimeRange: () => currentTimeRange,
    setTimeRange: (timeRange: TimeRange) => {
      handleViewChange(timeRange);
    },
    zoomToFit: () => {
      if (items.length === 0) return;
      
      // Calculate time range that encompasses all items
      let minTime = new Date();
      let maxTime = new Date();
      
      items.forEach(item => {
        switch (item.type) {
          case 'event':
            if (item.time < minTime) minTime = item.time;
            if (item.time > maxTime) maxTime = item.time;
            break;
          case 'time-range':
            if (item.startTime < minTime) minTime = item.startTime;
            if (item.endTime > maxTime) maxTime = item.endTime;
            break;
          case 'curve':
            item.dataPoints.forEach(point => {
              if (point.time < minTime) minTime = point.time;
              if (point.time > maxTime) maxTime = point.time;
            });
            break;
        }
      });
      
      zoomToFit?.({ start: minTime, end: maxTime });
    },
    getViewport: () => ({
      timeRange: currentTimeRange,
      pixelRange: [0, width],
      bufferZone,
      visibleItems: virtualizationState.visibleItems,
    }),
  }), [currentTimeRange, width, bufferZone, virtualizationState.visibleItems, items, zoomToFit]);

  // Calculate total height needed
  const totalHeight = lanes.reduce((sum, lane) => sum + lane.height, 0);
  const axisHeight = 40;

  // Generate accessibility description
  const ariaDescription = generateTimelineAriaDescription(lanes, items, currentTimeRange);

  return (
    <div
      ref={containerRef}
      data-testid="power-timeline"
      className={`power-timeline ${className || ''}`}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        border: '1px solid #ddd',
        ...style,
      }}
      role="application"
      aria-label={ariaLabel || 'Interactive timeline'}
      aria-description={ariaDescription}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-total-items={virtualizationState.totalItems}
      data-rendered-items={virtualizationState.renderCount}
    >
      {/* Performance warning */}
      {!performanceMetrics.renderCountOk && (
        <div
          className="performance-warning"
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            padding: '4px 8px',
            fontSize: '12px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          ⚠️ Performance: {virtualizationState.renderCount} items rendered
        </div>
      )}

      {/* Lanes container */}
      <div
        className="lanes-container"
        style={{
          position: 'relative',
          width: '100%',
          height: `${totalHeight}px`,
          overflow: 'hidden',
        }}
      >
        {lanes.map((lane) => {
          const laneItems = itemsByLane.get(lane.id) || [];
          return (
            <Lane
              key={lane.id}
              {...lane}
              items={laneItems}
              timeScale={timeScale}
              viewport={virtualizationState}
              onItemClick={handleItemClick}
              onItemHover={handleItemHover}
            />
          );
        })}
      </div>

      {/* Timeline axis */}
      <TimelineAxis
        timeRange={currentTimeRange}
        width={width}
        height={axisHeight}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />

      {/* Tooltip container */}
      <div
        id="timeline-tooltip"
        className="timeline-tooltip"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000,
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
    </div>
  );
});

PowerTimeline.displayName = 'PowerTimeline';

export default PowerTimeline;

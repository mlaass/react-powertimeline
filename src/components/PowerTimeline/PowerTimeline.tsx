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
import { Cursor } from '../Cursor';
import { useTimeScale, useReferenceTimeScale } from '../../hooks/useTimeScale';
import { useVirtualizationWithPerformance } from '../../hooks/useVirtualization';
import { useD3Zoom } from '../../hooks/useD3Zoom';
import { useTransform } from '../../hooks/useTransform';
import { 
  generateTimelineAriaDescription,
  createKeyboardNavigationHandler,
  ScreenReaderAnnouncer,
  FocusManager 
} from '../../utils/accessibility';
import { groupItemsByLane } from '../../utils/virtualization';

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
  const [cursor, setCursor] = useState<{ visible: boolean; x: number }>({
    visible: false,
    x: 0,
  });

  // Reference time range - updates only on zoom, not on pan
  // This allows smooth O(1) panning while accepting O(n) recalculation on zoom
  const [referenceTimeRange, setReferenceTimeRange] = useState<TimeRange>(initialTimeRange);

  // Detect zoom vs pan by checking if duration changed
  const lastDurationRef = useRef<number>(
    initialTimeRange.end.getTime() - initialTimeRange.start.getTime()
  );

  useEffect(() => {
    const currentDuration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
    const lastDuration = lastDurationRef.current;

    // If duration changed significantly (>1ms to avoid floating point issues), it's a zoom
    if (Math.abs(currentDuration - lastDuration) > 1) {
      // Zoom detected - update reference range to trigger item recalculation
      setReferenceTimeRange(currentTimeRange);
      lastDurationRef.current = currentDuration;
    }
    // If only position changed (same duration), it's a pan - keep reference range
  }, [currentTimeRange]);

  // Create time scale from reference range (static during pan, updates on zoom)
  const timeScale = useReferenceTimeScale(referenceTimeRange, [0, width]);

  // Calculate pan transform from reference to current view
  // This provides smooth O(1) panning via translate-only transform
  const viewTransform = useTransform(referenceTimeRange, currentTimeRange, width);

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

  // Handle timeline mouse interactions for cursor
  const handleTimelineMouseMove = useCallback((event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      setCursor({
        visible: true,
        x: mouseX
      });
    }
  }, []);

  const handleTimelineMouseLeave = useCallback(() => {
    setCursor({
      visible: false,
      x: 0
    });
  }, []);

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
        onMouseMove={handleTimelineMouseMove}
        onMouseLeave={handleTimelineMouseLeave}
      >
        {lanes.map((lane) => {
          const laneItems = (itemsByLane.get(lane.id) || []).map(item => ({
            ...item,
            isSelected: selectedItemId === item.id
          }));
          return (
            <Lane
              key={lane.id}
              {...lane}
              items={laneItems}
              timeScale={timeScale}
              viewTransform={viewTransform}
              viewport={virtualizationState}
              onItemClick={handleItemClick}
              onItemHover={handleItemHover}
            />
          );
        })}
        
        {/* Vertical cursor */}
        {cursor.visible && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <Cursor
              visible={cursor.visible}
              x={cursor.x}
              height={totalHeight}
              style={{
                color: '#007bff',
                width: 1,
                opacity: 0.8,
                dashArray: '3,3'
              }}
            />
          </svg>
        )}
      </div>

      {/* Timeline axis */}
      <TimelineAxis
        timeRange={referenceTimeRange}
        currentTimeRange={currentTimeRange}
        viewTransform={viewTransform}
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

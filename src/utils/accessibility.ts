/**
 * Accessibility Utilities
 * 
 * Utilities for implementing WCAG 2.1 AA compliant accessibility features
 * in the PowerTimeline component.
 */

import type { Item, Lane, TimeRange, CurveItem, EventItem, TimeRangeItem } from '../types';

/**
 * Generates accessible labels for timeline items
 */
export function generateItemAriaLabel(item: Item): string {
  const baseLabel = item.label?.text || `Item ${item.id}`;

  switch (item.type) {
    case 'curve': {
      const curveItem = item as CurveItem;
      const pointCount = curveItem.dataPoints.length;
      return `${baseLabel}, curve with ${pointCount} data points`;
    }

    case 'event': {
      const eventItem = item as EventItem;
      const eventTime = eventItem.time.toLocaleString();
      return `${baseLabel}, event at ${eventTime}`;
    }

    case 'time-range': {
      const rangeItem = item as TimeRangeItem;
      const startTime = rangeItem.startTime.toLocaleString();
      const endTime = rangeItem.endTime.toLocaleString();
      const duration = formatDuration(rangeItem.endTime.getTime() - rangeItem.startTime.getTime());
      return `${baseLabel}, time range from ${startTime} to ${endTime}, duration ${duration}`;
    }

    default:
      return baseLabel;
  }
}

/**
 * Generates accessible labels for lanes
 */
export function generateLaneAriaLabel(lane: Lane, itemCount: number): string {
  const baseLabel = lane.label || `Lane ${lane.id}`;
  return `${baseLabel}, contains ${itemCount} items`;
}

/**
 * Generates accessible description for the timeline
 */
export function generateTimelineAriaDescription(
  lanes: Lane[],
  items: Item[],
  timeRange: TimeRange
): string {
  const laneCount = lanes.length;
  const itemCount = items.length;
  const startTime = timeRange.start.toLocaleString();
  const endTime = timeRange.end.toLocaleString();
  
  return `Timeline with ${laneCount} lanes and ${itemCount} items, showing data from ${startTime} to ${endTime}. Use arrow keys to navigate, plus and minus keys to zoom.`;
}

/**
 * Formats duration in a human-readable way
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }
}

/**
 * Keyboard navigation handler
 */
export interface KeyboardNavigationOptions {
  onPanLeft: () => void;
  onPanRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onSelectNextItem: () => void;
  onSelectPreviousItem: () => void;
  onActivateSelectedItem: () => void;
}

export function createKeyboardNavigationHandler(
  options: KeyboardNavigationOptions
): (event: React.KeyboardEvent) => void {
  return (event: React.KeyboardEvent) => {
    // Prevent default behavior for handled keys
    const handledKeys = [
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      '+', '=', '-', '_', '0', 'Home', 'End', 'Enter', ' '
    ];
    
    if (handledKeys.includes(event.key)) {
      event.preventDefault();
    }
    
    switch (event.key) {
      case 'ArrowLeft':
        if (event.shiftKey) {
          options.onSelectPreviousItem();
        } else {
          options.onPanLeft();
        }
        break;
      
      case 'ArrowRight':
        if (event.shiftKey) {
          options.onSelectNextItem();
        } else {
          options.onPanRight();
        }
        break;
      
      case 'ArrowUp':
        options.onSelectPreviousItem();
        break;
      
      case 'ArrowDown':
        options.onSelectNextItem();
        break;
      
      case '+':
      case '=':
        options.onZoomIn();
        break;
      
      case '-':
      case '_':
        options.onZoomOut();
        break;
      
      case '0':
      case 'Home':
        options.onResetZoom();
        break;
      
      case 'Enter':
      case ' ':
        options.onActivateSelectedItem();
        break;
    }
  };
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex = -1;
  
  constructor(private container: HTMLElement) {
    this.updateFocusableElements();
  }
  
  updateFocusableElements(): void {
    const selector = [
      '[tabindex]:not([tabindex="-1"])',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[role="button"]:not([aria-disabled="true"])',
    ].join(', ');
    
    this.focusableElements = Array.from(
      this.container.querySelectorAll(selector)
    ) as HTMLElement[];
  }
  
  focusNext(): boolean {
    if (this.focusableElements.length === 0) return false;
    
    this.currentFocusIndex = (this.currentFocusIndex + 1) % this.focusableElements.length;
    this.focusableElements[this.currentFocusIndex].focus();
    return true;
  }
  
  focusPrevious(): boolean {
    if (this.focusableElements.length === 0) return false;
    
    this.currentFocusIndex = this.currentFocusIndex <= 0 
      ? this.focusableElements.length - 1 
      : this.currentFocusIndex - 1;
    this.focusableElements[this.currentFocusIndex].focus();
    return true;
  }
  
  focusFirst(): boolean {
    if (this.focusableElements.length === 0) return false;
    
    this.currentFocusIndex = 0;
    this.focusableElements[0].focus();
    return true;
  }
  
  getCurrentFocusedElement(): HTMLElement | null {
    return this.currentFocusIndex >= 0 
      ? this.focusableElements[this.currentFocusIndex] 
      : null;
  }
}

/**
 * Screen reader announcements
 */
export class ScreenReaderAnnouncer {
  private liveRegion: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.liveRegion = this.createLiveRegion();
    container.appendChild(this.liveRegion);
  }
  
  private createLiveRegion(): HTMLElement {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    return liveRegion;
  }
  
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;
    
    // Clear after announcement to allow repeated announcements
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
  }
  
  announceTimeRangeChange(timeRange: TimeRange): void {
    const startTime = timeRange.start.toLocaleString();
    const endTime = timeRange.end.toLocaleString();
    this.announce(`Timeline view changed to show data from ${startTime} to ${endTime}`);
  }
  
  announceItemSelection(item: Item): void {
    const label = generateItemAriaLabel(item);
    this.announce(`Selected ${label}`);
  }
  
  announceZoomChange(zoomLevel: string): void {
    this.announce(`Zoom level changed to ${zoomLevel}`);
  }
  
  destroy(): void {
    if (this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
  }
}

/**
 * Color contrast utilities
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want a more robust color parsing library
  const getLuminance = (color: string): number => {
    // This is a simplified version - you'd want proper color parsing
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0.5;
    
    const [r, g, b] = rgb.map(c => {
      const val = parseInt(c) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export function meetsWCAGContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

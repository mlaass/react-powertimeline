import { Item, Lane, TimeRange } from '../types';

/**
 * Generates accessible labels for timeline items
 */
export declare function generateItemAriaLabel(item: Item): string;
/**
 * Generates accessible labels for lanes
 */
export declare function generateLaneAriaLabel(lane: Lane, itemCount: number): string;
/**
 * Generates accessible description for the timeline
 */
export declare function generateTimelineAriaDescription(lanes: Lane[], items: Item[], timeRange: TimeRange): string;
/**
 * Formats duration in a human-readable way
 */
export declare function formatDuration(milliseconds: number): string;
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
export declare function createKeyboardNavigationHandler(options: KeyboardNavigationOptions): (event: React.KeyboardEvent) => void;
/**
 * Focus management utilities
 */
export declare class FocusManager {
    private container;
    private focusableElements;
    private currentFocusIndex;
    constructor(container: HTMLElement);
    updateFocusableElements(): void;
    focusNext(): boolean;
    focusPrevious(): boolean;
    focusFirst(): boolean;
    getCurrentFocusedElement(): HTMLElement | null;
}
/**
 * Screen reader announcements
 */
export declare class ScreenReaderAnnouncer {
    private liveRegion;
    constructor(container: HTMLElement);
    private createLiveRegion;
    announce(message: string, priority?: 'polite' | 'assertive'): void;
    announceTimeRangeChange(timeRange: TimeRange): void;
    announceItemSelection(item: Item): void;
    announceZoomChange(zoomLevel: string): void;
    destroy(): void;
}
/**
 * Color contrast utilities
 */
export declare function getContrastRatio(color1: string, color2: string): number;
export declare function meetsWCAGContrast(foreground: string, background: string, level?: 'AA' | 'AAA'): boolean;
//# sourceMappingURL=accessibility.d.ts.map
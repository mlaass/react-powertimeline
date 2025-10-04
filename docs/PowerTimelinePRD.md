# **PowerTimeline Component: Technical Design & Implementation Plan**

| Field | Value |
| :---- | :---- |
| **Status** | Draft |
| **Version** | 1.0 |
| **Date** | October 3, 2025 |

### **1\. Overview**

This document outlines the technical architecture and implementation plan for the **PowerTimeline** React component. This component is a high-performance, interactive, and general-purpose tool for visualizing multi-layered, time-series data. It is designed to be highly configurable, supporting dynamic data loading and a responsive user experience on both desktop and mobile platforms. The core challenge is rendering potentially large datasets on an "infinite" zoomable and pannable canvas while maintaining fluid performance.

### **2\. Goals and Non-Goals**

#### **2.1. Goals (v1.0)**

* Create a reusable React component for displaying data on a timeline.
* Support horizontal panning (scrolling) and zooming (mouse wheel, pinch-to-zoom).
* Architect for multiple, individually configurable "lanes."
* Natively render three distinct data types: **curves** (line charts), point-in-time **events**, and **time ranges** (bars).
* Ensure all rendered data items can be interactive (support onClick and onHover events).
* Implement a callback mechanism (onViewChange) to enable dynamic, on-demand data fetching as the user navigates the timeline.
* Deliver a fully responsive UI that works seamlessly with both mouse and touch inputs.

#### **2.2. Non-Goals (for v1.0)**

* Vertical scrolling of lanes (all lanes will be visible within the component's height).
* In-component data aggregation (e.g., summarizing data at high zoom levels). This is the responsibility of the parent application.
* Advanced annotations or user-editable items.
* Support for non-linear time scales (e.g., logarithmic).

### **3\. Technical Stack & Key Decisions**

#### **3.1. Core Technologies**

* **React:** For component structure, state management, and lifecycle hooks.
* **SVG:** For rendering the visualization. SVG provides scalable, crisp vector graphics that are ideal for this use case and allows for easy DOM-based event handling on individual shapes.
* **D3.js:** For data visualization calculations and DOM manipulation *within* the SVG canvas.

#### **3.2. Decision: Use D3.js**

While it's possible to build this with React and SVG alone, D3.js is the optimal tool for the job. It is not being used as a charting library, but as a powerful visualization toolkit that solves several complex problems for us:

1. **Time Scales (d3.scaleTime):** D3 provides robust time scale functions that map a time domain (e.g., \[Jan 1, Dec 31\]) to a pixel range (e.g., \[0, 800px\]). This is fundamental for positioning items and is automatically handled during zoom/pan operations.
2. **Axis Generation (d3.axisBottom):** D3 can generate a complete, labeled time axis with tick marks at appropriate intervals (e.g., showing months, then days, then hours as you zoom in). Recreating this logic would be significant work.
3. **Shape Generation (d3.line, d3.area):** D3's shape generators are perfect for creating the complex SVG path data required for curves and filled areas based on an array of data points.
4. **Zoom & Pan Logic (d3.zoom):** D3 has a built-in, highly-configurable zoom behavior that can be attached to an SVG element. It seamlessly handles mouse wheel, drag, and touch events, and provides the updated scale transformations needed to re-render the view.

**Integration Strategy:** We will use a standard React \+ D3 pattern. React will manage the component's state (e.g., the current visible time range) and props. A useRef hook will provide a stable reference to the main SVG element. Inside a useEffect hook, D3 will be used to manipulate the children of this SVG element, binding data and applying transformations. React renders the container, D3 renders the content.

### **4\. Architecture and Component Breakdown**

The PowerTimeline will be composed of several sub-components to keep the concerns separated.

1. **\<PowerTimeline /\> (Main Container):**
   * **Responsibility:** The primary entry point. Manages the core state, including the current time scale (xScale). Initializes the D3 zoom behavior and attaches it to the main SVG element. Renders the lanes and passes down the necessary data and scales.
   * **Hooks:** useState for time range, useRef for the SVG container, useEffect to initialize D3 zoom and respond to data changes.
2. **\<TimelineAxis /\>:**
   * **Responsibility:** Renders the time axis at the bottom (or top) of the timeline.
   * **Implementation:** Uses d3.axisBottom and a useEffect hook that re-renders the axis whenever the xScale prop changes.
3. **\<Lane /\>:**
   * **Responsibility:** A container for all items within a single lane. Sets the background color and renders the items passed to it.
   * **Implementation:** Maps over its items prop and renders the appropriate item component for each.
4. **Item Renderer Components (\<CurveItem /\>, \<EventItem /\>, \<TimeRangeItem /\>):**
   * **Responsibility:** These are the workhorses that render the actual data. Each component is specialized for its data type.
   * **Implementation:**
     * **CurveItem:** Uses d3.line() to compute the d attribute for an SVG \<path\> element based on its data points and the current xScale.
     * **EventItem:** Renders a \<line\>, \<circle\>, or other symbol at the correct x position calculated from the xScale.
     * **TimeRangeItem:** Renders a \<rect\> element with its x and width attributes calculated from the start/end times and the xScale.

### **5\. Data Flow & State Management**

1. **Initialization:** The parent application renders \<PowerTimeline /\>, passing in the initialTimeRange, lanes, and items props.
2. **D3 Setup:** The component's useEffect hook initializes d3.zoom and sets the initial time scale based on initialTimeRange.
3. **Rendering:** Components render using the initial scale.
4. **User Interaction (Pan/Zoom):**
   * The user interacts with the SVG canvas.
   * The D3 zoom handler fires, calculating a new transformation.
   * The zoom event handler updates the component's xScale state.
   * The component re-renders itself and all children with the new scale.
5. **Dynamic Data Loading:**
   * The D3 zoom event handler also calls the onViewChange prop with the new visible time domain.
   * The parent application receives this, fetches new data for that range if needed, and updates the items prop passed to \<PowerTimeline /\>.
   * The component re-renders with the new data.

### **6\. API Definition (Props)**

The proposed API from the PRD remains valid and will serve as the contract for the component.

// Main Component Props
interface PowerTimelineProps {
  lanes: Lane\[\];
  items: Array\<CurveItem | EventItem | TimeRangeItem\>;
  initialTimeRange: { start: Date; end: Date; };
  onViewChange: (newTimeRange: { start: Date; end: Date; }) \=\> void;
  onItemClick?: (item: Item) \=\> void;
  onItemHover?: (item: Item) \=\> void;
  width: number; // Component width (from parent)
  height: number; // Component height (from parent)
}

// Data Structure Definitions
interface Lane {
  id: string | number;
  height: number;
  style?: React.CSSProperties;
}

interface Item {
  id: string | number;
  laneId: string | number;
  label?: { text: string; position: 'top' | 'bottom' | 'inline'; };
}

interface CurveItem extends Item {
  type: 'curve';
  dataPoints: { time: Date; value: number; }\[\];
  style: {
    strokeColor: string;
    strokeWidth?: number;
    fillColor?: string; // Optional: for area chart style
  };
}

interface EventItem extends Item {
  type: 'event';
  time: Date;
  style: {
    markerType: 'line' | 'circle' | 'custom\_svg';
    color: string;
  };
}

interface TimeRangeItem extends Item {
  type: 'time-range';
  startTime: Date;
  endTime: Date;
  style: {
    backgroundColor: string;
  };
}

### **7\. Risks and Open Questions**

1. **Performance:** Rendering a very high density of SVG nodes can be slow.
   * **Mitigation:** We must implement virtualization. Only items within the visible viewport (plus a buffer) should be rendered to the DOM. We can perform this filtering before the render pass.
2. **Label Collision:** With many events or ranges close together, labels may overlap.
   * **Open Question:** What is the desired behavior for v1.0? We may need to implement a simple collision detection algorithm or defer this feature. For v1, we may simply render all labels and accept potential overlap.
3. **Item Stacking Logic:** How should overlapping TimeRangeItems in the same lane be handled?
   * **Proposal:** Implement a simple stacking algorithm that positions overlapping items vertically within their lane's horizontal space. This will require pre-processing the items for each lane.
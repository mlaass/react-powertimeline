import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock SVG methods that D3 uses
Object.defineProperty(SVGElement.prototype, 'getBBox', {
  writable: true,
  value: () => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }),
});

Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
  writable: true,
  value: () => 100,
});

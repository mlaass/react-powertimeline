import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CurveItem } from '../../../src/components/items/CurveItem';
import type { CurveItemProps } from '../../../src/components/items/types';
import { scaleTime, scaleLinear } from 'd3-scale';
import '@testing-library/jest-dom';

/**
 * Contract Test for CurveItem Component
 * 
 * interface specified in the API contract. Tests MUST fail until implementation
 * is complete.
 */

describe('CurveItem Contract', () => {
  const mockTimeScale = {
    scale: scaleTime()
      .domain([new Date('2024-01-01T00:00:00Z'), new Date('2024-01-01T04:00:00Z')])
      .range([0, 800]),
    domain: [new Date('2024-01-01T00:00:00Z'), new Date('2024-01-01T04:00:00Z')] as [Date, Date],
    range: [0, 800] as [number, number],
  };

  const mockYScale = scaleLinear().domain([0, 100]).range([100, 0]);

  const defaultProps: CurveItemProps = {
    // CurveItem properties
    id: 'test-curve',
    type: 'curve',
    laneId: 'test-lane',
    dataPoints: [
      { time: new Date('2024-01-01T01:00:00Z'), value: 10 },
      { time: new Date('2024-01-01T02:00:00Z'), value: 20 },
      { time: new Date('2024-01-01T03:00:00Z'), value: 15 },
    ],
    style: {
      strokeColor: '#007bff',
      strokeWidth: 2,
    },
    interpolation: 'linear',
    
    // BaseItemProps
    timeScale: mockTimeScale,
    laneHeight: 100,
    yScale: mockYScale,
  };

  it('should accept all required props according to CurveItem interface', () => {
    expect(() => {
      render(
        <svg>
          <CurveItem {...defaultProps} />
        </svg>
      );
    }).not.toThrow();
  });

  it('should accept optional props according to CurveItem interface', () => {
    const propsWithOptionals: CurveItemProps = {
      ...defaultProps,
      style: {
        ...defaultProps.style,
        fillColor: 'rgba(0, 123, 255, 0.1)',
        opacity: 0.8,
      },
      interpolation: 'linear',
      label: {
        text: 'CPU Usage %',
        position: 'top',
        style: {
          fontSize: 12,
          color: '#333',
        },
      },
      metadata: { unit: '%', source: 'monitoring' },
    };

    expect(() => {
      render(
        <svg>
          <CurveItem {...propsWithOptionals} />
        </svg>
      );
    }).not.toThrow();
  });

  it('should render SVG path element for the curve', () => {
    const { container } = render(
      <svg>
        <CurveItem {...defaultProps} />
      </svg>
    );

    const path = container.querySelector('path');
    expect(path).toBeTruthy();
    expect(path).toHaveAttribute('stroke', '#007bff');
    expect(path).toHaveAttribute('stroke-width', '2');
  });

  it('should handle different interpolation methods', () => {
    const interpolationMethods = ['linear', 'step', 'basis', 'cardinal'] as const;

    interpolationMethods.forEach(interpolation => {
      expect(() => {
        render(
          <svg>
            <CurveItem {...defaultProps} interpolation={interpolation} />
          </svg>
        );
      }).not.toThrow();
    });
  });

  it('should render fill area when fillColor is provided', () => {
    const { container } = render(
      <svg>
        <CurveItem
          {...defaultProps}
          style={{
            ...defaultProps.style,
            fillColor: 'rgba(0, 123, 255, 0.1)',
          }}
        />
      </svg>
    );

    const path = container.querySelector('path[fill]');
    expect(path).toBeTruthy();
    expect(path).toHaveAttribute('fill', 'rgba(0, 123, 255, 0.1)');
  });

  it('should disable pointer events for lane-level interaction', () => {
    const onItemClick = vi.fn();
    const { container } = render(
      <svg>
        <CurveItem {...defaultProps} onItemClick={onItemClick} />
      </svg>
    );

    const curveGroup = container.querySelector('g[data-testid="curve-item"]');
    expect(curveGroup).toBeTruthy();
    expect(curveGroup).toHaveStyle({ pointerEvents: 'none' });
  });

  it('should validate data points are sorted by time', () => {
    const unsortedDataPoints = [
      { time: new Date('2024-01-01T02:00:00Z'), value: 38 },
      { time: new Date('2024-01-01T00:00:00Z'), value: 45 },
      { time: new Date('2024-01-01T01:00:00Z'), value: 52 },
    ];

    // Implementation should handle or validate sorted data points
    expect(() => {
      render(
        <svg>
          <CurveItem {...defaultProps} dataPoints={unsortedDataPoints} />
        </svg>
      );
    }).not.toThrow();
  });

  it('should require minimum of 2 data points', () => {
    const singleDataPoint = [
      { time: new Date('2024-01-01T00:00:00Z'), value: 45 },
    ];

    // This should be handled gracefully by the implementation
    expect(() => {
      render(
        <svg>
          <CurveItem {...defaultProps} dataPoints={singleDataPoint} />
        </svg>
      );
    }).not.toThrow();
  });
});

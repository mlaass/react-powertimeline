/**
 * Bars, circles and paths must not animate their geometry: Chrome treats
 * rect x/width, circle cx/r and path d as CSS properties, so `transition: all`
 * made them glide 200ms behind the axis on every zoom step.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimeRangeItem } from '../../../src/components/items/TimeRangeItem';
import { EventItem } from '../../../src/components/items/EventItem';
import { createTimeScale } from '../../../src/utils/timeScale';

const timeScale = createTimeScale({ start: new Date(0), end: new Date(1000) }, [0, 100]);

describe('item geometry is not CSS-transitioned', () => {
  it('time range rect', () => {
    const { container } = render(
      <svg>
        <TimeRangeItem id="a" type="time-range" laneId="l" startTime={new Date(100)} endTime={new Date(500)}
          style={{ backgroundColor: '#000' }} timeScale={timeScale} laneHeight={40} />
      </svg>,
    );
    const rect = container.querySelector('rect.time-range-rect') as SVGRectElement;
    expect(rect.style.transition).not.toMatch(/\ball\b/);
  });

  it('event circle', () => {
    const { container } = render(
      <svg>
        <EventItem id="b" type="event" laneId="l" time={new Date(300)}
          style={{ markerType: 'circle', color: '#000' }} timeScale={timeScale} laneHeight={40} />
      </svg>,
    );
    const circle = container.querySelector('circle.event-marker') as SVGCircleElement;
    expect(circle.style.transition).not.toMatch(/\ball\b/);
  });
});

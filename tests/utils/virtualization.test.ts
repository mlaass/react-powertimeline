/**
 * Unit Tests for Virtualization Utilities
 */

import { describe, it, expect } from 'vitest';
import { groupItemsByLane } from '../../src/utils/virtualization';
import type { TimeRange } from '../../src/types';

describe('Virtualization Utilities', () => {
  const timeRange: TimeRange = {
    start: new Date('2024-01-01T00:00:00Z'),
    end: new Date('2024-01-01T04:00:00Z'),
  };

  const testItems = [
    {
      id: 'event-1',
      type: 'event' as const,
      laneId: 'lane-1',
      time: new Date('2024-01-01T01:00:00Z'),
    },
    {
      id: 'event-2', 
      type: 'event' as const,
      laneId: 'lane-2',
      time: new Date('2024-01-01T02:00:00Z'),
    },
    {
      id: 'range-1',
      type: 'time-range' as const,
      laneId: 'lane-1',
      startTime: new Date('2024-01-01T00:30:00Z'),
      endTime: new Date('2024-01-01T01:30:00Z'),
    },
  ];

  describe('groupItemsByLane', () => {
    it('should group items by lane ID', () => {
      const grouped = groupItemsByLane(testItems);
      
      expect(grouped['lane-1']).toHaveLength(2);
      expect(grouped['lane-2']).toHaveLength(1);
      expect(grouped['lane-1'][0].id).toBe('event-1');
      expect(grouped['lane-1'][1].id).toBe('range-1');
      expect(grouped['lane-2'][0].id).toBe('event-2');
    });

    it('should handle empty items array', () => {
      const grouped = groupItemsByLane([]);
      expect(Object.keys(grouped)).toHaveLength(0);
    });

    it('should handle single item', () => {
      const grouped = groupItemsByLane([testItems[0]]);
      expect(Object.keys(grouped)).toHaveLength(1);
      expect(grouped['lane-1']).toHaveLength(1);
    });
  });
});

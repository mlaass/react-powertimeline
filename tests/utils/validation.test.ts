/**
 * Unit Tests for Validation Utilities
 * 
 * Tests data validation functions for timeline items and configurations.
 */

import { describe, it, expect } from 'vitest';

// Mock validation utilities (these would be implemented in src/utils/validation.ts)
const validateTimeRange = (timeRange: any) => {
  if (!timeRange || typeof timeRange !== 'object') {
    return { valid: false, error: 'TimeRange must be an object' };
  }
  
  if (!(timeRange.start instanceof Date) || !(timeRange.end instanceof Date)) {
    return { valid: false, error: 'TimeRange start and end must be Date objects' };
  }
  
  if (timeRange.start >= timeRange.end) {
    return { valid: false, error: 'TimeRange start must be before end' };
  }
  
  return { valid: true };
};

const validateLane = (lane: any) => {
  if (!lane || typeof lane !== 'object') {
    return { valid: false, error: 'Lane must be an object' };
  }
  
  if (!lane.id || typeof lane.id !== 'string') {
    return { valid: false, error: 'Lane must have a string id' };
  }
  
  if (typeof lane.height !== 'number' || lane.height <= 0) {
    return { valid: false, error: 'Lane height must be a positive number' };
  }
  
  return { valid: true };
};

const validateItem = (item: any) => {
  if (!item || typeof item !== 'object') {
    return { valid: false, error: 'Item must be an object' };
  }
  
  if (!item.id || typeof item.id !== 'string') {
    return { valid: false, error: 'Item must have a string id' };
  }
  
  if (!item.type || !['curve', 'event', 'time-range'].includes(item.type)) {
    return { valid: false, error: 'Item must have a valid type' };
  }
  
  if (!item.laneId || typeof item.laneId !== 'string') {
    return { valid: false, error: 'Item must have a string laneId' };
  }
  
  // Type-specific validation
  switch (item.type) {
    case 'curve':
      if (!Array.isArray(item.dataPoints) || item.dataPoints.length < 2) {
        return { valid: false, error: 'CurveItem must have at least 2 data points' };
      }
      for (const point of item.dataPoints) {
        if (!(point.time instanceof Date) || typeof point.value !== 'number') {
          return { valid: false, error: 'CurveItem data points must have Date time and number value' };
        }
      }
      break;
      
    case 'event':
      if (!(item.time instanceof Date)) {
        return { valid: false, error: 'EventItem must have a Date time' };
      }
      break;
      
    case 'time-range':
      if (!(item.startTime instanceof Date) || !(item.endTime instanceof Date)) {
        return { valid: false, error: 'TimeRangeItem must have Date startTime and endTime' };
      }
      if (item.startTime >= item.endTime) {
        return { valid: false, error: 'TimeRangeItem startTime must be before endTime' };
      }
      break;
  }
  
  return { valid: true };
};

const validateDataset = (lanes: any[], items: any[]) => {
  if (!Array.isArray(lanes) || lanes.length === 0) {
    return { valid: false, error: 'Must provide at least one lane' };
  }
  
  if (!Array.isArray(items)) {
    return { valid: false, error: 'Items must be an array' };
  }
  
  // Validate all lanes
  for (const lane of lanes) {
    const laneResult = validateLane(lane);
    if (!laneResult.valid) {
      return laneResult;
    }
  }
  
  // Check for duplicate lane IDs
  const laneIds = lanes.map(lane => lane.id);
  const uniqueLaneIds = new Set(laneIds);
  if (laneIds.length !== uniqueLaneIds.size) {
    return { valid: false, error: 'Lane IDs must be unique' };
  }
  
  // Validate all items
  for (const item of items) {
    const itemResult = validateItem(item);
    if (!itemResult.valid) {
      return itemResult;
    }
    
    // Check if item's laneId exists
    if (!laneIds.includes(item.laneId)) {
      return { valid: false, error: `Item ${item.id} references non-existent lane ${item.laneId}` };
    }
  }
  
  // Check for duplicate item IDs
  const itemIds = items.map(item => item.id);
  const uniqueItemIds = new Set(itemIds);
  if (itemIds.length !== uniqueItemIds.size) {
    return { valid: false, error: 'Item IDs must be unique' };
  }
  
  return { valid: true };
};

describe('Validation Utilities', () => {
  describe('validateTimeRange', () => {
    it('should validate valid time range', () => {
      const timeRange = {
        start: new Date('2024-01-01T00:00:00Z'),
        end: new Date('2024-01-01T04:00:00Z'),
      };
      
      const result = validateTimeRange(timeRange);
      expect(result.valid).toBe(true);
    });
    
    it('should reject null or undefined time range', () => {
      expect(validateTimeRange(null).valid).toBe(false);
      expect(validateTimeRange(undefined).valid).toBe(false);
    });
    
    it('should reject time range with invalid dates', () => {
      const timeRange = {
        start: '2024-01-01',
        end: '2024-01-02',
      };
      
      const result = validateTimeRange(timeRange);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Date objects');
    });
    
    it('should reject time range where start >= end', () => {
      const timeRange = {
        start: new Date('2024-01-01T04:00:00Z'),
        end: new Date('2024-01-01T00:00:00Z'),
      };
      
      const result = validateTimeRange(timeRange);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('start must be before end');
    });
  });
  
  describe('validateLane', () => {
    it('should validate valid lane', () => {
      const lane = {
        id: 'test-lane',
        height: 100,
        label: 'Test Lane',
      };
      
      const result = validateLane(lane);
      expect(result.valid).toBe(true);
    });
    
    it('should reject lane without id', () => {
      const lane = { height: 100 };
      
      const result = validateLane(lane);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('string id');
    });
    
    it('should reject lane with invalid height', () => {
      const lane = { id: 'test', height: -10 };
      
      const result = validateLane(lane);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('positive number');
    });
  });
  
  describe('validateItem', () => {
    it('should validate valid curve item', () => {
      const item = {
        id: 'curve-1',
        type: 'curve',
        laneId: 'lane-1',
        dataPoints: [
          { time: new Date('2024-01-01T00:00:00Z'), value: 10 },
          { time: new Date('2024-01-01T01:00:00Z'), value: 20 },
        ],
      };
      
      const result = validateItem(item);
      expect(result.valid).toBe(true);
    });
    
    it('should validate valid event item', () => {
      const item = {
        id: 'event-1',
        type: 'event',
        laneId: 'lane-1',
        time: new Date('2024-01-01T00:00:00Z'),
      };
      
      const result = validateItem(item);
      expect(result.valid).toBe(true);
    });
    
    it('should validate valid time range item', () => {
      const item = {
        id: 'range-1',
        type: 'time-range',
        laneId: 'lane-1',
        startTime: new Date('2024-01-01T00:00:00Z'),
        endTime: new Date('2024-01-01T01:00:00Z'),
      };
      
      const result = validateItem(item);
      expect(result.valid).toBe(true);
    });
    
    it('should reject curve item with insufficient data points', () => {
      const item = {
        id: 'curve-1',
        type: 'curve',
        laneId: 'lane-1',
        dataPoints: [{ time: new Date(), value: 10 }],
      };
      
      const result = validateItem(item);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('at least 2 data points');
    });
    
    it('should reject item with invalid type', () => {
      const item = {
        id: 'invalid-1',
        type: 'invalid-type',
        laneId: 'lane-1',
      };
      
      const result = validateItem(item);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('valid type');
    });
  });
  
  describe('validateDataset', () => {
    const validLanes = [
      { id: 'lane-1', height: 100, label: 'Lane 1' },
      { id: 'lane-2', height: 80, label: 'Lane 2' },
    ];
    
    const validItems = [
      {
        id: 'event-1',
        type: 'event',
        laneId: 'lane-1',
        time: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: 'range-1',
        type: 'time-range',
        laneId: 'lane-2',
        startTime: new Date('2024-01-01T00:00:00Z'),
        endTime: new Date('2024-01-01T01:00:00Z'),
      },
    ];
    
    it('should validate valid dataset', () => {
      const result = validateDataset(validLanes, validItems);
      expect(result.valid).toBe(true);
    });
    
    it('should reject empty lanes array', () => {
      const result = validateDataset([], validItems);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('at least one lane');
    });
    
    it('should reject duplicate lane IDs', () => {
      const duplicateLanes = [
        { id: 'lane-1', height: 100 },
        { id: 'lane-1', height: 80 },
      ];
      
      const result = validateDataset(duplicateLanes, []);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('unique');
    });
    
    it('should reject duplicate item IDs', () => {
      const duplicateItems = [
        { id: 'item-1', type: 'event', laneId: 'lane-1', time: new Date() },
        { id: 'item-1', type: 'event', laneId: 'lane-1', time: new Date() },
      ];
      
      const result = validateDataset(validLanes, duplicateItems);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('unique');
    });
    
    it('should reject item with non-existent lane reference', () => {
      const invalidItems = [
        {
          id: 'event-1',
          type: 'event',
          laneId: 'non-existent-lane',
          time: new Date(),
        },
      ];
      
      const result = validateDataset(validLanes, invalidItems);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('non-existent lane');
    });
  });
});

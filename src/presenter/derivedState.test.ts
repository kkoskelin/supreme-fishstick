import { mockSwimRecord } from '../fixtures/mockFilter';

import { nameFilter, secondsToTime } from './derivedState';

describe('derived state functions', () => {
  describe('nameFilter generator', () => {
    it('returns function that returns true if swimmerName is undefined', () => {
      const generatedFilter = nameFilter(undefined);
      const result = generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
  });
  describe('secondsToTime', () => {
    it('converts zero seconds to a properly-formatted string.', () => {
      const result = secondsToTime(0);
      expect(result).toBe('0:00');
    });
    it('converts 60 to 1:00', () => {
      expect(secondsToTime(60)).toBe('1:00');
    });
    it('converts 99 to 1:39', () => {
      expect(secondsToTime(99)).toBe('1:39');
    });
  });
});

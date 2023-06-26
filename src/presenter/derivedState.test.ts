import {
  filteredRankings,
  hasSearchParameters,
  nameFilter,
  secondsToTime,
  timeToSeconds,
} from './derivedState';
import { mockSwimRecord } from '../fixtures/mockFilter';
import { state } from './state';

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
      expect(result).toBe('0:00.00');
    });
    it('converts 60 to 1:00.00', () => {
      expect(secondsToTime(60)).toBe('1:00.00');
    });
    it('converts 99 to 1:39', () => {
      expect(secondsToTime(99)).toBe('1:39.00');
    });
    it('converts 32.12 to 0:32.12', () => {
      expect(secondsToTime(32.12)).toBe('0:32.12');
    });
  });
  describe('filteredRankings', () => {
    it('filters by matching a last name', () => {
      state.recordFilter = { swimmerName: mockSwimRecord.lastName };
      state.swimData = [mockSwimRecord];
      const filtered = filteredRankings(state);
      expect(filtered).toEqual([mockSwimRecord]);
    });
    it('filters out all unmatched records', () => {
      state.recordFilter = { swimmerName: 'NO-SUCH-NAME' };
      state.swimData = [mockSwimRecord];
      const filtered = filteredRankings(state);
      expect(filtered).toEqual([]);
    });
  });
  describe('timeToSeconds', () => {
    it('correctly converts 32.12 from string to decimal', () => {
      const time = '32.12';
      const result = timeToSeconds(time);
      expect(result).toEqual(32.12);
    });
  });
  describe('hasSearchParameters', () => {
    it('returns true if recordFilter has key/value pairs', () => {
      state.recordFilter = { swimmerName: 'Gehrig' };
      expect(hasSearchParameters(state)).toBeTruthy();
    });
    it('returns false if recordFilter has no key/value pairs', () => {
      state.recordFilter = {};
      expect(hasSearchParameters(state)).toBeFalsy();
    });
  });
});

import {
  filteredRankings,
  hasSearchParameters,
  nameFilter,
  teamFilter,
  strokeFilter,
  genderFilter,
  distanceFilter,
  yearFilter,
  ageFilter,
  getBestTimesPerEvent,
  secondsToTime,
  timeToSeconds,
} from './derivedState';
import { mockSwimRecord } from '../fixtures/mockData';
import { state } from './state';

describe('derived state functions', () => {
  describe('nameFilter generator', () => {
    it('returns function that returns true if swimmerName is undefined', () => {
      const generatedFilter = nameFilter(undefined);
      const result = generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
  });
  describe('teamFilter', () => {
    it('returns true if team matches', () => {
      const generatedFilter = teamFilter(mockSwimRecord.team);
      const result = generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if team does not match', () => {
      const generatedFilter = teamFilter('NO-SUCH-TEAM');
      const result = generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('strokeFilter', () => {
    it('returns true if stroke matches', () => {
      const generatedFilter = strokeFilter(mockSwimRecord.stroke);
      const result = generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if stroke does not match', () => {
      const generatedFilter = strokeFilter('NO-SUCH-STROKE');
      const result = generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
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
    it('returns all records if record filter is empty', () => {
      state.recordFilter = {};
      state.swimData = [mockSwimRecord];
      const filtered = filteredRankings(state);
      expect(filtered).toEqual([mockSwimRecord]);
    });
  });
  describe('timeToSeconds', () => {
    it('correctly converts 32.12 from string to decimal', () => {
      const time = '32.12';
      const result = timeToSeconds(time);
      expect(result).toEqual(32.12);
    });
    it('correctly converts values over a minute from string to decimal', () => {
      const time = '1:02.20';
      const result = timeToSeconds(time);
      expect(result).toEqual(62.2);
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

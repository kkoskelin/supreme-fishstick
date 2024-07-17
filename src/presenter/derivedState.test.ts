import {
  ageClassFilter,
  filteredRankings,
  hasSearchParameters,
  nameFilter,
  teamFilter,
  strokeFilter,
  genderFilter,
  distanceFilter,
  yearFilter,
  getBestTimesPerEvent,
  secondsToTime,
  timeToSeconds,
} from './derivedState';
import { EVENTS_BY_STROKE } from '../data/events';
import { mockSwimRecord } from '../fixtures/mockData';
import { state } from './state';

describe('derived state functions', () => {
  describe('ageClassFilter', () => {
    it('returns true if age is within range', () => {
      const generatedFilter = ageClassFilter('8 & U');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if age is outside range', () => {
      const generatedFilter = ageClassFilter('11-12');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('nameFilter generator', () => {
    it('returns function that returns true if swimmerName is undefined', () => {
      const generatedFilter = nameFilter(undefined);
      expect(generatedFilter).toBeFalsy();
    });
    it('returns function that returns true if swimmerName substring is a match', () => {
      const generatedFilter = nameFilter('Kenny');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns function that returns false if swimmerName substring is not a match', () => {
      const generatedFilter = nameFilter('NO-SUCH-NAME');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('distanceFilter', () => {
    it('returns true if distance matches', () => {
      const generatedFilter = distanceFilter('25M');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if distance does not match', () => {
      const generatedFilter = distanceFilter('100M');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('genderFilter', () => {
    it('returns true if gender matches', () => {
      const generatedFilter = genderFilter('Boys');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if gender does not match', () => {
      const generatedFilter = genderFilter('Girls');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('getBestTimesPerEvent', () => {
    it('returns the fastest time for each event', () => {
      const swimData = [
        { ...mockSwimRecord, event: 1, convertedTime: 100 },
        { ...mockSwimRecord, event: 1, convertedTime: 200 },
        { ...mockSwimRecord, event: 2, convertedTime: 200 },
      ];
      const result = getBestTimesPerEvent(swimData);
      expect(result).toEqual([
        { ...mockSwimRecord, event: 1, convertedTime: 100 },
        { ...mockSwimRecord, event: 2, convertedTime: 200 },
      ]);
    });
  });

  describe('yearFilter', () => {
    it('returns true if date is within range', () => {
      const generatedFilter = yearFilter('2023');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if date is outside range', () => {
      const generatedFilter = yearFilter('2024');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('teamFilter', () => {
    it('returns true if team matches', () => {
      const generatedFilter = teamFilter(mockSwimRecord.team);
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if team does not match', () => {
      const generatedFilter = teamFilter('NO-SUCH-TEAM');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeFalsy();
    });
  });
  describe('strokeFilter', () => {
    it('returns true if stroke matches', () => {
      const generatedFilter = strokeFilter('Free');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
      expect(result).toBeTruthy();
    });
    it('returns false if stroke does not match', () => {
      const generatedFilter = strokeFilter('Fly');
      const result = generatedFilter && generatedFilter({ ...mockSwimRecord });
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
    it('converts 32.02 to 0:32.02', () => {
      expect(secondsToTime(32.02)).toBe('0:32.02');
    });
  });
  describe('filteredRankings', () => {
    it('filters by matching a last name', () => {
      state.recordFilter = { swimmerName: mockSwimRecord.displayName };
      state.swimData = [mockSwimRecord];
      const filtered = filteredRankings(state);
      expect(filtered).toMatchObject([mockSwimRecord]);
    });
    it('filters out all unmatched records', () => {
      state.recordFilter = { swimmerName: 'NO-SUCH-NAME' };
      state.swimData = [mockSwimRecord];
      const filtered = filteredRankings(state);
      expect(filtered).toMatchObject([]);
    });
    it('returns all records if record filter is empty', () => {
      state.recordFilter = {};
      state.swimData = [mockSwimRecord];
      const filtered = filteredRankings(state);
      expect(filtered).toMatchObject([mockSwimRecord]);
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

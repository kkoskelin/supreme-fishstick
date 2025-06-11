import { FormattedSwimRecord } from '../types/FormattedSwimRecord';
import { RawSwimRecord } from '../types/RawSwimRecord';
import {
  getBestTimesPerEvent,
  hasSearchParameters,
  rawAgeClassFilter,
  rawDistanceFilter,
  rawGenderFilter,
  rawStrokeFilter,
  rawTeamFilter,
  rawYearFilter,
  secondsToTime,
  timeToSeconds,
  transformRecord,
} from './derivedState';
import { mockSwimRecord } from '../fixtures/mockData';
import { state } from './state';

describe('derived state functions', () => {
  describe('raw swim record filters', () => {
    const mockRawSwimRecord: RawSwimRecord = [
      8,
      16.71,
      '2024-06-08',
      'Gehrig, Louisa',
      11,
      1,
      'G',
      1,
    ];
    describe('rawTeamFilter', () => {
      it('rawTeamFilter returns true on match', () => {
        const generatedFilter = rawTeamFilter('Spring Green');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeTruthy();
      });
      it('rawTeamFilter returns false on mismatch', () => {
        const generatedFilter = rawTeamFilter('Baraboo');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeFalsy();
      });
    });
    describe('rawStrokeFilter', () => {
      it('rawStrokeFilter returns true on match', () => {
        const generatedFilter = rawStrokeFilter('Free');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeTruthy();
      });
      it('rawStrokeFilter returns false on mismatch', () => {
        const generatedFilter = rawStrokeFilter('Fly');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeFalsy();
      });
    });
    describe('rawGenderFilter', () => {
      it('rawGenderFilter returns true on match', () => {
        const generatedFilter = rawGenderFilter('Girls');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeTruthy();
      });
      it('rawGenderFilter returns false on mismatch', () => {
        const generatedFilter = rawGenderFilter('Boys');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeFalsy();
      });
    });
    describe('rawDistanceFilter', () => {
      it('rawDistanceFilter returns true on match', () => {
        const generatedFilter = rawDistanceFilter('25M');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeTruthy();
      });
      it('rawDistanceFilter returns false on mismatch', () => {
        const generatedFilter = rawDistanceFilter('50M');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeFalsy();
      });
    });
    describe('rawAgeClassFilter', () => {
      it('rawAgeClassFilter returns true on match', () => {
        const generatedFilter = rawAgeClassFilter('8 & U');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeTruthy();
      });
      it('rawAgeClassFilter returns false on mismatch', () => {
        const generatedFilter = rawAgeClassFilter('11-12');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeFalsy();
      });
    });
    describe('rawYearFilter', () => {
      it('rawYearFilter returns true on match', () => {
        const generatedFilter = rawYearFilter('2024');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeTruthy();
      });
      it('rawYearFilter returns false on mismatch', () => {
        const generatedFilter = rawYearFilter('2023');
        const result = generatedFilter && generatedFilter(mockRawSwimRecord);
        expect(result).toBeFalsy();
      });
    });
  });
  describe('transformRecord', () => {
    it('transforms a raw swim record into a swim record', () => {
      const rawSwimRecord: RawSwimRecord = [
        8,
        16.71,
        '2024-06-08',
        'Gehrig, Lou',
        11,
        1,
        'G',
        1,
      ];
      const result = transformRecord(rawSwimRecord);
      expect(result).toMatchObject({
        age: 8,
        convertedTime: 16.71,
        date: '2024-06-08',
        displayName: 'Gehrig, Lou',
        event: 11,
        place: 1,
        team: 'Spring Green',
        weekNumber: 1,
      });
    });
  });

  describe('getBestTimesPerEvent', () => {
    it('returns the fastest time for each event', () => {
      const swimData: FormattedSwimRecord[] = [
        {
          ...mockSwimRecord,
          convertedTime: 100,
          event: 1,
          formattedDate: '',
          formattedEvent: '',
          formattedTime: '',
        },
        {
          ...mockSwimRecord,
          convertedTime: 200,
          event: 2,
          formattedDate: '',
          formattedEvent: '',
          formattedTime: '',
        },
        {
          ...mockSwimRecord,
          convertedTime: 300,
          event: 1,
          formattedDate: '',
          formattedEvent: '',
          formattedTime: '',
        },
      ];
      const result = getBestTimesPerEvent(swimData);
      expect(result).toMatchObject([
        { ...mockSwimRecord, convertedTime: 100, event: 1 },
        { ...mockSwimRecord, convertedTime: 200, event: 2 },
      ]);
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
  // describe('filteredRankings', () => {
  //   it('filters by matching a last name', () => {
  //     state.recordFilter = { swimmerName: mockSwimRecord.displayName };
  //     state.swimData = [mockSwimRecord];
  //     const filtered = filteredRankings(state);
  //     expect(filtered).toMatchObject([mockSwimRecord]);
  //   });
  //   it('filters out all unmatched records', () => {
  //     state.recordFilter = { swimmerName: 'NO-SUCH-NAME' };
  //     state.swimData = [mockSwimRecord];
  //     const filtered = filteredRankings(state);
  //     expect(filtered).toMatchObject([]);
  //   });
  //   it('returns all records if record filter is empty', () => {
  //     state.recordFilter = {};
  //     state.swimData = [mockSwimRecord];
  //     const filtered = filteredRankings(state);
  //     expect(filtered).toMatchObject([mockSwimRecord]);
  //   });
  // });
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

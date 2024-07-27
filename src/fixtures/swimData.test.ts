import { RawSwimRecord } from '../types/RawSwimRecord';
import { findMostRecentDate } from './swimData';

describe('swimData', () => {
  describe('findMostRecentDate', () => {
    it('should return the most recent date', () => {
      const data: RawSwimRecord[] = [
        [8, 16.71, '2024-06-08', 'Robinson, Margaret', 11, 1, 'G', 1],
        [8, 16.92, '2019-06-29', 'Roenneburg, Ellie', 11, 1, 'C', 4],
        [8, 16.93, '2023-07-08', 'Danzinger, Emmalyn', 11, 1, 'C', 5],
        [8, 16.48, '2024-07-10', 'Banchikova, Alissa', 11, 1, 'W', 3],
        [8, 16.99, '2024-06-15', 'Robinson, Margaret', 11, 1, 'G', 2],
        [8, 17.06, '2024-06-15', 'Banchikova, Alissa', 11, 1, 'W', 2],
      ];
      const result: string = findMostRecentDate(data);
      expect(result).toBe('2024-07-10');
    });
  });
});

import { RecordFilter } from '../types/RecordFilter';
import { SwimRecord } from '../types/SwimRecord';

export const mockFilter: RecordFilter = {
  ageMax: 11,
  ageMin: 9,
  distance: '100 Meter',
  gender: 'Boys',
  stroke: 'Back',
  swimmerName: 'Smith',
};

export const mockSwimRecord: SwimRecord = {
  age: 11,
  convertedTime: 200,
  date: '2023-06-02',
  displayName: 'Kenny Malone',
  event: 13,
  exhibition: false,
  firstName: 'Kenny',
  lastName: 'Malone',
  league: 'NPR',
  place: undefined,
  team: 'Planet Money',
  time: 200,
  weekNumber: 2,
};

import { RecordFilter } from '../types/RecordFilter';
import { SwimRecord } from '../types/SwimRecord';

export const mockFilter: RecordFilter = {
  ageMax: '11',
  ageMin: '9',
  distance: '100M',
  gender: 'Boys',
  stroke: 'Back',
  swimmerName: 'Smith',
};

export const mockSwimRecord: SwimRecord = {
  age: 11,
  convertedTime: 200,
  date: '2023-06-02',
  displayName: 'Malone, Kenny',
  event: 12,
  exhibition: false,
  place: undefined,
  team: 'Planet Money',
  weekNumber: 2,
};

export const generateSwimRecordId = ({
  date,
  displayName,
  event,
}: SwimRecord): string => {
  const compositeKey = `${event}_${displayName}_${date}`;
  return compositeKey;
};

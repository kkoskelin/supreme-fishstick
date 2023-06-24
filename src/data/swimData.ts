import { SwimRecord } from '../types/SwimRecord';
import data from './swim.json';

type RawRecord = Record<string, string | number>;

const timeToSeconds = (time: string): number => {
  const parts: string[] = time.split(':');
  if (parts.length == 1) {
    return +parts;
  }
  return +parts[0] * 60 + +parts[1];
};

const formatRecord = (row: RawRecord): SwimRecord => ({
  age: +row['Age'],
  convertedTime: timeToSeconds(row['Converted Time'] as string),
  date: row['Date'] as string,
  displayName: `${row['Last Name'] as string}, ${row['First Name'] as string}`,
  event: row['Event'] as number,
  exhibition: (row['EXH'] as string) == 'EXH',
  firstName: row['First Name'] as string,
  lastName: row['Last Name'] as string,
  league: row['League'] as string,
  place: isNaN(+row['Place']) ? undefined : +row['Place'],
  team: row['Team'] as string,
  time: timeToSeconds(row['Time'] as string),
  weekNumber: +row['Week Number'],
});

export const swimData = (data as RawRecord[])
  .map(formatRecord)
  .sort((a, b) => a.time - b.time);

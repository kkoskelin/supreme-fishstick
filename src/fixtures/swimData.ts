import data from './swimData.json';
import { SwimRecord } from '../types/SwimRecord';
import { TeamKeyMap } from '../types/Team';

type RawRecord = (string | number | null)[];
const rawData = data as RawRecord[];

function sortByEventThenTime(a: SwimRecord, b: SwimRecord) {
  if (a.event < b.event) return -1;
  if (a.event > b.event) return 1;
  return a.convertedTime - b.convertedTime;
};

export const swimData: SwimRecord[] = rawData.map(transformRecord).sort(sortByEventThenTime);

function greatestDateReducer(acc: string, record: SwimRecord) {
  return String(record.date).localeCompare(acc) > 0 ? record.date : acc;
};

export const latestSwimRecordDate = swimData.reduce(greatestDateReducer, '0');
const allNames = swimData.map((record) => record.displayName);
export const swimmerNames = Array.from(new Set(allNames)).sort();

function transformRecord(record: RawRecord): SwimRecord {
  const [
    age,
    convertedTime,
    date,
    displayName,
    event,
    place,
    team,
    weekNumber,
  ]: RawRecord = record;
  const swimRecord = {
    age,
    convertedTime,
    date,
    displayName,
    event,
    exhibition: place == 0,
    place,
    team: TeamKeyMap[team as string],
    weekNumber,
  };
  return swimRecord as SwimRecord;
}

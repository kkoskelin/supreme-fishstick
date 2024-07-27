import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';
import data from './swimData.json';

const rawData = data as RawSwimRecord[];

function greatestDateReducer(acc: string, record: RawSwimRecord): string {
  return String(record[SwimRecordIndex.DATE]).localeCompare(acc) > 0
    ? record[SwimRecordIndex.DATE]
    : acc;
}

export function findMostRecentDate(swimData: RawSwimRecord[]): string {
  const latestSwimRecord = swimData.reduce(greatestDateReducer, '0');
  return latestSwimRecord;
}

export function getLatestSwimRecordAndNamesAndData() {
  const latestSwimRecordDate = rawData.reduce(greatestDateReducer, '0');
  const allNames = rawData.map(record => record[SwimRecordIndex.DISPLAY_NAME]);
  const swimmerNames = Array.from(new Set(allNames)).sort();

  return {
    latestSwimRecordDate,
    rawData,
    swimmerNames,
  };
}

import { Distance } from '../types/Distance';
import {
  EVENTS_BY_DISTANCE,
  EVENTS_BY_GENDER,
  EVENTS_BY_STROKE,
} from '../data/events';
import { Gender } from '../types/Gender';
import { State } from '../types/State';
import { Stroke } from '../types/Stroke';
import { SwimRecord } from '../types/SwimRecord';
import { derived } from 'overmind';

export const timeToSeconds = (time: string): number => {
  const parts: string[] = time.split(':');
  if (parts.length == 1) {
    return +parts;
  }
  return +parts[0] * 60 + +parts[1];
};

export const secondsToTime = (inputSeconds = 0): string => {
  const minutes = Math.floor(inputSeconds / 60);
  const seconds = Math.floor(inputSeconds - minutes * 60);
  const fraction = Math.round((inputSeconds - minutes * 60 - seconds) * 100)
    .toString()
    .padEnd(2, '0');
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${fraction}`;
};

export const teamFilter = (team?: string) => {
  if (team) {
    const teamRegex = new RegExp(team, 'i');
    return (record: SwimRecord) => teamRegex.test(record.team);
  } else {
    return undefined;
  }
};

export const nameFilter = (name?: string) => {
  if (name) {
    const nameRegex = new RegExp(name, 'i');
    return (record: SwimRecord) => nameRegex.test(record.displayName);
  } else {
    return undefined;
  }
};

export const strokeFilter = (stroke?: Stroke) =>
  stroke != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_STROKE[stroke].includes(record.event.toString())
    : undefined;

export const genderFilter = (gender?: Gender) =>
  gender != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_GENDER[gender].includes(record.event.toString())
    : undefined;

export const distanceFilter = (distance?: Distance) =>
  distance != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_DISTANCE[distance].includes(record.event.toString())
    : undefined;

export const yearFilter =
  (beginYear?: string, endYear?: string) => (record: SwimRecord) => {
    return (
      (beginYear ? `${beginYear}-01-01}` <= record.date : true) &&
      (endYear ? `${endYear}-12-31` >= record.date : true)
    );
  };

export const ageFilter =
  (ageMin?: string, ageMax?: string) => (record: SwimRecord) => {
    if (ageMin && record.age < +ageMin) {
      return false;
    }
    if (ageMax && record.age > +ageMax) {
      return false;
    }
    return true;
  };

export const getBestTimesPerEvent = (records: SwimRecord[]): SwimRecord[] => {
  const bestTimes: { [key: string]: SwimRecord } = {};
  records.forEach((record) => {
    const key = record.event;
    const time: number = +record.convertedTime!;
    if (!bestTimes[key] || record.convertedTime! < bestTimes[key].convertedTime!) {
      bestTimes[key] = record;
    }
  });
  return Object.values(bestTimes);
};

// Function to combine multiple filter predicates into a single predicate, ignoring undefined filters
function combineFilters<T>(...filters: Array<((record: T) => boolean) | undefined>): (record: T) => boolean {
  // Filter out any undefined filters
  const definedFilters = filters.filter((filter): filter is (record: T) => boolean => filter !== undefined);

  return (record: T) => {
    return definedFilters.every(filter => filter(record));
  };
}

export const filteredRankings = (state: State): SwimRecord[] => {
  const { recordFilter, swimData } = state;
  const combinedFilter = combineFilters(
    teamFilter(recordFilter.team),
    nameFilter(recordFilter.swimmerName),
    strokeFilter(recordFilter.stroke),
    distanceFilter(recordFilter.distance),
    genderFilter(recordFilter.gender),
    yearFilter(recordFilter.beginYear, recordFilter.endYear),
    ageFilter(recordFilter.ageMin, recordFilter.ageMax)
  );

  const filteredRecords = swimData.filter(combinedFilter) || [];
  return getBestTimesPerEvent(filteredRecords);
};

export const hasSearchParameters = (state: State): boolean => {
  return Object.keys(state.recordFilter).length > 0;
};

export const derivedState = {
  filteredRankings: derived(filteredRankings),
  hasSearchParameters: derived(hasSearchParameters),
};

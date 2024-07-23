import { Distance } from '../types/Distance';
import {
  EVENTS_BY_AGE_CLASS,
  EVENTS_BY_DISTANCE,
  EVENTS_BY_GENDER,
  EVENTS_BY_STROKE,
  EVENT_MAP,
} from '../data/events';
import { AgeClass } from '../types/Age';
import { Gender } from '../types/Gender';
import { State } from '../types/State';
import { Stroke } from '../types/Stroke';
import { SwimRecord } from '../types/SwimRecord';
import { derived } from 'overmind';
import { FormattedSwimRecord } from '../types/FormattedSwimRecord';

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
    .padStart(2, '0');
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

export const ageClassFilter = (ageClass?: AgeClass) =>
  ageClass != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_AGE_CLASS[ageClass].includes(record.event.toString())
    : undefined;

export const yearFilter =
  (year?: string) =>
    year != undefined ?
      ((record: SwimRecord) => record.date.startsWith(year)) : undefined;

export const getBestTimesPerEvent = (records: SwimRecord[], perSwimmer: boolean = false): SwimRecord[] => {
  const bestTimes: { [key: string]: SwimRecord } = {};
  records.forEach((record) => {
    const key = perSwimmer ? record.event : `${record.event}-${record.displayName}`;
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

export const filteredRankings = (state: State): FormattedSwimRecord[] => {
  const { recordFilter, swimData } = state;
  const combinedFilter = combineFilters(
    ageClassFilter(recordFilter.ageClass),
    distanceFilter(recordFilter.distance),
    genderFilter(recordFilter.gender),
    nameFilter(recordFilter.swimmerName),
    strokeFilter(recordFilter.stroke),
    teamFilter(recordFilter.team),
    yearFilter(recordFilter.year),
  );

  let filteredRecords = swimData.filter(combinedFilter) || [];

  if (recordFilter.bestTimesPerEvent || recordFilter.bestTimesPerSwimmer) {
    filteredRecords = getBestTimesPerEvent(filteredRecords, state.recordFilter.bestTimesPerSwimmer);
  }
  return filteredRecords.map(formatSwimRecord);
};

export const formatSwimRecord = (record: SwimRecord): FormattedSwimRecord => {
  return {
    ...record,
    formattedEvent: `${EVENT_MAP[record.event].gender} ${EVENT_MAP[record.event].ageClass} ${EVENT_MAP[record.event].distance} ${EVENT_MAP[record.event].stroke}`,
    formattedDate: new Date(`${record.date}T12:00`).toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    formattedTime: secondsToTime(record.convertedTime),
  };
};

export const hasSearchParameters = (state: State): boolean => {
  return Object.keys(state.recordFilter).length > 0;
};

export const derivedState = {
  filteredRankings: derived(filteredRankings),
  hasSearchParameters: derived(hasSearchParameters),
};

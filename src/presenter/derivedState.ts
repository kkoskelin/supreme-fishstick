import { AgeClass } from '../types/Age';
import { Distance } from '../types/Distance';
import {
  EVENTS_BY_AGE_CLASS,
  EVENTS_BY_DISTANCE,
  EVENTS_BY_GENDER,
  EVENTS_BY_STROKE,
  EVENT_MAP,
} from '../data/events';
import { FormattedSwimRecord } from '../types/FormattedSwimRecord';
import { Gender } from '../types/Gender';
import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';
import { State } from '../types/State';
import { Stroke } from '../types/Stroke';
import { SwimRecord } from '../types/SwimRecord';
import { TeamKeyMap } from '../types/Team';
import { derived } from 'overmind';
import { memoize } from 'lodash';

export const timeToSeconds = (time: string): number => {
  const parts: string[] = time.split(':');
  if (parts.length == 1) {
    return +parts;
  }
  return +parts[0] * 60 + +parts[1];
};

export const secondsToTime = memoize((inputSeconds = 0): string => {
  const minutes = Math.floor(inputSeconds / 60);
  const seconds = Math.floor(inputSeconds - minutes * 60);
  const fraction = Math.round((inputSeconds - minutes * 60 - seconds) * 100)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${fraction}`;
});


export const rawTeamFilter = (team?: string) => {
  if (team) {
    const teamRegex = new RegExp(team, 'i');
    return (record: RawSwimRecord) =>
      teamRegex.test(TeamKeyMap[record[SwimRecordIndex.TEAM]]);
  } else {
    return undefined;
  }
};

export const rawNameFilter = (name?: string) => {
  if (name) {
    const nameRegex = new RegExp(name, 'i');
    return (record: RawSwimRecord) =>
      nameRegex.test(record[SwimRecordIndex.DISPLAY_NAME]);
  } else {
    return undefined;
  }
};

export const rawStrokeFilter = (stroke?: Stroke) =>
  stroke != undefined
    ? (record: RawSwimRecord) =>
      EVENTS_BY_STROKE[stroke].includes(
        record[SwimRecordIndex.EVENT].toString(),
      )
    : undefined;

export const rawGenderFilter = (gender?: Gender) =>
  gender != undefined
    ? (record: RawSwimRecord) =>
      EVENTS_BY_GENDER[gender].includes(
        record[SwimRecordIndex.EVENT].toString(),
      )
    : undefined;

export const rawDistanceFilter = (distance?: Distance) =>
  distance != undefined
    ? (record: RawSwimRecord) =>
      EVENTS_BY_DISTANCE[distance].includes(
        record[SwimRecordIndex.EVENT].toString(),
      )
    : undefined;

export const rawAgeClassFilter = (ageClass?: AgeClass) =>
  ageClass != undefined
    ? (record: RawSwimRecord) =>
      EVENTS_BY_AGE_CLASS[ageClass].includes(
        record[SwimRecordIndex.EVENT].toString(),
      )
    : undefined;

export const rawYearFilter = (year?: string) =>
  year != undefined
    ? (record: RawSwimRecord) => record[SwimRecordIndex.DATE].startsWith(year)
    : undefined;

export const getBestTimesPerEvent = (
  records: FormattedSwimRecord[],
  perSwimmer: boolean = false,
): FormattedSwimRecord[] => {
  const bestTimes: { [key: string]: FormattedSwimRecord } = {};
  records.forEach(record => {
    const key = perSwimmer
      ? record.event
      : `${record.event}-${record.displayName}`;
    if (
      !bestTimes[key] ||
      record.convertedTime < bestTimes[key].convertedTime
    ) {
      bestTimes[key] = record;
    }
  });
  return Object.values(bestTimes);
};

// Function to combine multiple filter predicates into a single predicate, ignoring undefined filters
function combineFilters<T>(
  ...filters: Array<((record: T) => boolean) | undefined>
): (record: T) => boolean {
  // Filter out any undefined filters
  const definedFilters = filters.filter(
    (filter): filter is (record: T) => boolean => filter !== undefined,
  );

  return (record: T) => {
    return definedFilters.every(filter => filter(record));
  };
}

export const formatSwimRecord = (record: SwimRecord): FormattedSwimRecord => {
  return {
    ...record,
    formattedDate: new Date(`${record.date}T12:00`).toLocaleDateString(
      'en-US',
      {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      },
    ),
    formattedEvent: `${EVENT_MAP[record.event].gender} ${EVENT_MAP[record.event].ageClass} ${EVENT_MAP[record.event].distance} ${EVENT_MAP[record.event].stroke}`,
    formattedTime: secondsToTime(record.convertedTime),
  };
};

export const transformRecord = (record: RawSwimRecord): FormattedSwimRecord => {
  const [
    age,
    convertedTime,
    date,
    displayName,
    event,
    place,
    team,
    weekNumber,
  ] = record;
  const swimRecord: FormattedSwimRecord = {
    age,
    convertedTime,
    date,
    displayName,
    event,
    exhibition: place == 0,
    formattedDate: formatDate(date),
    formattedEvent: formatEvent(event),
    formattedTime: secondsToTime(convertedTime),
    place,
    team: TeamKeyMap[team],
    weekNumber,
  };
  return swimRecord;
};

export const hasSearchParameters = (state: State): boolean => {
  return Object.keys(state.recordFilter).length > 0;
};

function formatEvent(event: number): string {
  return `${EVENT_MAP[event].gender} ${EVENT_MAP[event].ageClass} ${EVENT_MAP[event].distance} ${EVENT_MAP[event].stroke}`;
}

const formatDate = memoize((date: string): string => {
  return new Date(`${date}T12:00`).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
});

export const filteredSwimRecords = (state: State): FormattedSwimRecord[] => {
  const { recordFilter } = state;

  const combinedFilter = combineFilters(
    rawAgeClassFilter(state.recordFilter.ageClass),
    rawDistanceFilter(state.recordFilter.distance),
    rawGenderFilter(state.recordFilter.gender),
    rawNameFilter(state.recordFilter.swimmerName),
    rawStrokeFilter(state.recordFilter.stroke),
    rawTeamFilter(state.recordFilter.team),
    rawYearFilter(state.recordFilter.year),
  );

  let filteredRecords = state.rawSwimData
    .filter(combinedFilter)
    .map(transformRecord);
  if (recordFilter.bestTimesPerEvent || recordFilter.bestTimesPerSwimmer) {
    filteredRecords = getBestTimesPerEvent(
      filteredRecords,
      state.recordFilter.bestTimesPerSwimmer,
    );
  }
  return filteredRecords;
};

export const derivedState = {
  filteredSwimRecords: derived(filteredSwimRecords),
  hasSearchParameters: derived(hasSearchParameters),
};

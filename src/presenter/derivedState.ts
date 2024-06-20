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

const trueFilter = () => true;

export const teamFilter = (team?: string) => {
  if (team) {
    const teamRegex = new RegExp(team, 'i');
    return (record: SwimRecord) => teamRegex.test(record.team);
  } else {
    return trueFilter;
  }
};

export const nameFilter = (name?: string) => {
  if (name) {
    const nameRegex = new RegExp(name, 'i');
    return (record: SwimRecord) => nameRegex.test(record.displayName);
  } else {
    return trueFilter;
  }
};

export const strokeFilter = (stroke?: Stroke) =>
  stroke != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_STROKE[stroke].includes(record.event.toString())
    : trueFilter;

export const genderFilter = (gender?: Gender) =>
  gender != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_GENDER[gender].includes(record.event.toString())
    : trueFilter;

export const distanceFilter = (distance?: Distance) =>
  distance != undefined
    ? (record: SwimRecord) =>
      EVENTS_BY_DISTANCE[distance].includes(record.event.toString())
    : trueFilter;

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

export const filteredRankings = (state: State): SwimRecord[] => {
  const { recordFilter, swimData } = state;
  const filteredRecords =
    swimData
      .filter(teamFilter(recordFilter.team))
      .filter(nameFilter(recordFilter.swimmerName))
      .filter(strokeFilter(recordFilter.stroke))
      .filter(distanceFilter(recordFilter.distance))
      .filter(genderFilter(recordFilter.gender))
      .filter(yearFilter(recordFilter.beginYear, recordFilter.endYear))
      .filter(ageFilter(recordFilter.ageMin, recordFilter.ageMax)) || [];
  return filteredRecords;
};

export const hasSearchParameters = (state: State): boolean => {
  return Object.keys(state.recordFilter).length > 0;
};

export const derivedState = {
  filteredRankings: derived(filteredRankings),
  hasSearchParameters: derived(hasSearchParameters),
};

import { State } from '../types/State';
import { SwimRecord } from '../types/SwimRecord';
import { derived } from 'overmind';

export const isLoggedIn = (state: State): boolean => Boolean(state.currentPage);
export const secondsToTime = (inputSeconds: number): string => {
  const minutes = Math.floor(inputSeconds / 60);
  const seconds = inputSeconds - minutes * 60;
  const paddedSeconds = seconds.toString().padStart(2, '0');
  const time = `${minutes}:${paddedSeconds}`;
  return time;
};

export const nameFilter = (name: string) =>
  name != undefined
    ? (record: SwimRecord) => record.displayName.includes(name)
    : () => true;

export const filteredRankings = (state: State): SwimRecord[] => {
  const { recordFilter } = state;
  const filteredRecords = state.swimData.filter(
    nameFilter(recordFilter.swimmerName),
  );

  return filteredRecords;
};

export const derivedState = {
  filteredRankings: derived(filteredRankings),
  isLoggedIn: derived(isLoggedIn),
};

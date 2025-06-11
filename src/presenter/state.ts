import { State } from '../types/State';
import { derivedState } from './derivedState';

const currentYear = new Date().getFullYear();
const lastContiguousYear = 2021;
const years = Array.from(
  { length: currentYear - lastContiguousYear + 1 },
  (_, i) => (currentYear - i).toString(),
);
// no year 2020 due to COVID-19 pandemic cancellations
years.push('2019');

export const state: State = {
  currentPage: 'Loading',
  form: {
    recordFilter: {},
  },
  latestSwimRecordDate: '...',
  rawSwimData: [],
  recordFilter: {},
  swimSeasonYears: years,
  swimmerNames: [],
  ...derivedState,
};

import { State } from '../types/State';
import { derivedState } from './derivedState';
import { latestSwimRecordDate, swimData, swimmerNames } from '../fixtures/swimData';

export const state: State = {
  currentPage: '',
  form: {
    recordFilter: {
      team: 'Sun Prairie',
    }
  },
  latestSwimRecordDate,
  recordFilter: {},
  swimData,
  swimmerNames,
  ...derivedState,
};

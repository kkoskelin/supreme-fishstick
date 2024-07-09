import { State } from '../types/State';
import { derivedState } from './derivedState';
import { latestSwimRecordDate, swimData, swimmerNames } from '../fixtures/swimData';

export const state: State = {
  currentPage: '',
  form: {
    recordFilter: {
    }
  },
  recordFilter: {},
  latestSwimRecordDate,
  swimData,
  swimmerNames,
  ...derivedState,
};

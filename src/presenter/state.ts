import { State } from '../types/State';
import { derivedState } from './derivedState';

export const state: State = {
  currentPage: 'Loading',
  form: {
    recordFilter: {},
  },
  latestSwimRecordDate: '...',
  recordFilter: {},
  swimData: [],
  swimmerNames: [],
  ...derivedState,
};

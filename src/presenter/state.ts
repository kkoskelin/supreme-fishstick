import { State } from '../types/State';
import { derivedState } from './derivedState';
import swimData from '../fixtures/swimData.json';
import { SwimRecord } from '../types/SwimRecord';

export const state: State = {
  currentPage: '',
  form: { recordFilter: {} },
  recordFilter: {},
  swimData: swimData as SwimRecord[],
  ...derivedState,
};

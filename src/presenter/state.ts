import { State } from '../types/State';
import { derivedState } from './derivedState';

export const state: State = {
  currentPage: '',
  form: { recordFilter: {} },
  recordFilter: {},
  swimData: [],
  ...derivedState,
};

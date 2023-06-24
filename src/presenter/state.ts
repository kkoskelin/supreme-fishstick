import { State } from '../types/State';
import { derivedState } from './derivedState';
import { swimData } from '../data/swimData';

export const state: State = {
  currentPage: '',
  form: { recordFilter: {} },
  recordFilter: {},
  swimData,
  ...derivedState,
};

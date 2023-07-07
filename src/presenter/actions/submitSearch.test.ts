import { RecordFilter } from '../../types/RecordFilter';
import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('submitSearch', () => {
  it('clears the state recordFilter if the form recordFilter is empty', () => {
    state.form.recordFilter = {};
    state.recordFilter = { ageMin: '7' };
    actions.submitSearch();
    expect(state.recordFilter).toEqual({});
  });
  it('sets defined values into the state record filter', () => {
    const filterValues: RecordFilter = { ageMin: '9', gender: 'Boys' };
    state.form.recordFilter = { ...filterValues };
    state.recordFilter = { ageMin: '7' };
    actions.submitSearch();
    expect(state.recordFilter).toEqual(filterValues);
  });
  it('does not set undefined values into the state record filter', () => {
    state.form.recordFilter = {
      ageMax: undefined,
      ageMin: '9',
      gender: 'Boys',
    };
    state.recordFilter = { ageMin: '7' };
    actions.submitSearch();
    expect(state.recordFilter).toEqual({
      ageMin: '9',
      gender: 'Boys',
    });
    expect(Object.keys(state.recordFilter).length).toBe(2);
  });
});

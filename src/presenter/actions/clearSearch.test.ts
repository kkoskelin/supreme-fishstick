import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('clearSearch', () => {
  it('resets the search form and the applied record filter', () => {
    state.recordFilter = { ageMin: '2' };
    state.form.recordFilter = { ageMin: '9' };
    actions.clearSearch();
    expect(state.recordFilter.ageMin).toBeUndefined();
    expect(state.form.recordFilter.ageMin).toBeUndefined();
  });
});

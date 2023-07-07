import { RecordFilter } from '../../types/RecordFilter';
import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('updateFilter', () => {
  it('sets the form recordFilter with the provided argument', () => {
    state.form.recordFilter = { ageMin: '7' };
    const filterValues: RecordFilter = { ageMin: '9', gender: 'Boys' };
    actions.updateFilter(filterValues);
    expect(state.form.recordFilter).toEqual(filterValues);
  });
});

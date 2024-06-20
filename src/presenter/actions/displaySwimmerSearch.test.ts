import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('displaySwimmerSearch', () => {
  it('sets current page to SwimmerSearch', () => {
    state.currentPage = 'Loading';
    actions.displaySwimmerSearch();
    expect(state.currentPage).toBe('SwimmerSearch');
  });
});

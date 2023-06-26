import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('displayRankings', () => {
  it('sets current page to Rankings from Loading page', () => {
    actions.displayLoading();
    expect(state.currentPage).toBe('Loading');
    actions.displayRankings();
    expect(state.currentPage).toBe('Rankings');
  });
});

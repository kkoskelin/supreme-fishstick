import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('displayLoading', () => {
  it('sets current page to Loading page', () => {
    expect(state.currentPage).not.toBe('Loading');
    actions.displayLoading();
    expect(state.currentPage).toBe('Loading');
  });
});

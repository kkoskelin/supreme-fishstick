import { overmindApp } from '../presenter';

const { actions, state } = overmindApp;

describe('displaySplash', () => {
  it('sets current page to Splash from Loading page', () => {
    actions.displayLoading();
    expect(state.currentPage).toBe('Loading');
    actions.displaySplash();
    expect(state.currentPage).toBe('Splash');
  });
});

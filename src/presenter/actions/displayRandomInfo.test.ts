import { overmindApp } from '../presenter';

const { actions, effects, state } = overmindApp;

describe('displayRandomInfo', () => {
  beforeAll(() => {
    jest.spyOn(effects, 'getRandomInfo');
  });

  it('sets current page to Splash from Loading page', async () => {
    expect(state.currentPage).toBe('Splash');
    await actions.displayRandomInfo();
    expect(effects.getRandomInfo).toHaveBeenCalled();
    expect(state.currentPage).toBe('RandomInfo');
  });
});

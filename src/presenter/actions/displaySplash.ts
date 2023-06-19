import { Context } from '../presenter';

export const displaySplash = (context: Context) => {
  context.state.currentPage = 'Splash';
};

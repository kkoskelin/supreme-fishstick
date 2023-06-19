import { Context } from '../presenter';

export const displayRandomInfo = async (context: Context) => {
  context.state.currentPage = 'Loading';
  context.state.randomInfo = await context.effects.getRandomInfo();
  context.state.currentPage = 'RandomInfo';
};

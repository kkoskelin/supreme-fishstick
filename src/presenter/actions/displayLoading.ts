import { Context } from '../presenter';

export const displayLoading = (context: Context) => {
  context.state.currentPage = 'Loading';
};

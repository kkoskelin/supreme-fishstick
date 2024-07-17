import { Context } from '../presenter';

export const displaySwimmerSearch = (context: Context) => {
  // load most recently-applied filters into the form.
  context.state.form.recordFilter = {
    ...context.state.recordFilter,
    year: '2024',
  };
  context.state.currentPage = 'SwimmerSearch';
};

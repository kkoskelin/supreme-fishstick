import { Context } from '../presenter';

export const displaySwimmerSearch = (context: Context) => {
  // load most recently-applied filters into the form.
  context.state.form.recordFilter = {
    ...context.state.recordFilter, ...{
      beginYear: '2024',
      endYear: '2024',
    }
  };
  context.state.currentPage = 'SwimmerSearch';
};

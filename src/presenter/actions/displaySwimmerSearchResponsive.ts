import { Context } from '../presenter';

export const displaySwimmerSearchResponsive = (context: Context) => {
  // load most recently-applied filters into the form.
  context.state.form.recordFilter = { ...context.state.recordFilter };
  context.state.currentPage = 'SwimmerSearchResponsive';
};

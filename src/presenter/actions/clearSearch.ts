import { Context } from '../presenter';

export const clearSearch = (context: Context) => {
  context.state.form.recordFilter = {};
  context.state.recordFilter = {};
};

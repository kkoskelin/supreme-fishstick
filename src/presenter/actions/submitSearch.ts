import { Context } from '../presenter';

export const submitSearch = (context: Context) => {
  context.state.recordFilter = { ...context.state.form.recordFilter };
};

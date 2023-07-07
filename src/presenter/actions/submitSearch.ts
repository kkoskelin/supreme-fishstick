import { Context } from '../presenter';
import { isUndefined, omitBy } from 'lodash';

export const submitSearch = (context: Context) => {
  context.state.recordFilter = omitBy(
    context.state.form.recordFilter,
    isUndefined,
  );
};

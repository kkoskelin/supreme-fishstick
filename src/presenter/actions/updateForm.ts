import { Context } from '../presenter';
import { RecordFilter } from '../../types/RecordFilter';

export const updateFilter = (context: Context, recordFilter: RecordFilter) => {
  context.state.form.recordFilter = recordFilter;
};

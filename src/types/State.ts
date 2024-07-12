import { Form } from '../types/Form';
import { RecordFilter } from '../types/RecordFilter';
import { SwimRecord } from '../types/SwimRecord';
import { FormattedSwimRecord } from './FormattedSwimRecord';

export type State = {
  currentPage: string;
  form: Form;
  latestSwimRecordDate: string;
  recordFilter: RecordFilter;
  swimData: SwimRecord[];
  swimmerNames: string[];
  filteredRankings: FormattedSwimRecord[];
  hasSearchParameters: boolean;
};
